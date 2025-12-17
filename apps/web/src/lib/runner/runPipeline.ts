import { prisma } from "@/lib/prisma";
import { auditSeo } from "@/lib/seo/audit";
import type { RunnerConfig } from "./types";
import { fetchNews, generateDraft, generateImages, optimizeDraft } from "./steps";

type RunResult = {
  articleId: string;
  status: "DRAFT_CREATED" | "PUBLISHED" | "DRY_RUN";
  auditScore: number;
  auditIssues: number;
};

async function logEvent(input: {
  entityType: string;
  entityId: string;
  step: string;
  status: string;
  errorCode?: string;
  errorDetail?: string;
}) {
  await prisma.pipelineEvent.create({
    data: {
      entityType: input.entityType,
      entityId: input.entityId,
      step: input.step,
      status: input.status,
      errorCode: input.errorCode,
      errorDetail: input.errorDetail,
    },
  });
}

export async function runPipeline(cfg: RunnerConfig): Promise<RunResult> {
  // V1: pipeline step-based. In assenza di provider config, funziona in dryRun con placeholder.

  const keywordPrimary = cfg.category === "AI_per_Marketing"
    ? "AI per marketing"
    : cfg.category === "AI_per_WebDev"
      ? "AI per web development"
      : "AI per aziende";

  let news;
  try {
    news = await fetchNews({ category: cfg.category, dryRun: cfg.dryRun });
  } catch (e) {
    // nessun entityId ancora: logghiamo su una riga dedicata “global run” usando uuid temp
    const runId = crypto.randomUUID();
    await logEvent({
      entityType: "run",
      entityId: runId,
      step: "fetch_news",
      status: "failed",
      errorCode: "FetchNewsFailed",
      errorDetail: e instanceof Error ? e.message : String(e),
    });
    throw e;
  }

  let draft;
  try {
    draft = await generateDraft({ category: cfg.category, news, keywordPrimary, dryRun: cfg.dryRun });
  } catch (e) {
    const runId = crypto.randomUUID();
    await logEvent({
      entityType: "run",
      entityId: runId,
      step: "generate_draft",
      status: "failed",
      errorCode: "GenerateDraftFailed",
      errorDetail: e instanceof Error ? e.message : String(e),
    });
    throw e;
  }

  let optimized;
  try {
    optimized = await optimizeDraft({ draft, dryRun: cfg.dryRun });
  } catch (e) {
    const runId = crypto.randomUUID();
    await logEvent({
      entityType: "run",
      entityId: runId,
      step: "optimize",
      status: "failed",
      errorCode: "OptimizeFailed",
      errorDetail: e instanceof Error ? e.message : String(e),
    });
    throw e;
  }

  // immagini non bloccanti in V1 (degradazione controllata)
  try {
    await generateImages({ draft: optimized, dryRun: cfg.dryRun });
  } catch (e) {
    const runId = crypto.randomUUID();
    await logEvent({
      entityType: "run",
      entityId: runId,
      step: "images",
      status: "failed",
      errorCode: "ImagesFailed",
      errorDetail: e instanceof Error ? e.message : String(e),
    });
  }

  const article = await prisma.article.create({
    data: {
      slug: optimized.slug,
      title: optimized.title,
      excerpt: optimized.excerpt,
      metaDesc: optimized.metaDesc,
      keywords: optimized.keywords,
      contentHtml: optimized.contentHtml,
      schemaJsonLd: optimized.schemaJsonLd as never,
    },
    select: { id: true, title: true, slug: true, metaDesc: true, keywords: true, contentHtml: true, schemaJsonLd: true },
  });

  await logEvent({ entityType: "article", entityId: article.id, step: "persist_draft", status: "succeeded" });

  const audit = auditSeo({
    title: article.title,
    metaDesc: article.metaDesc,
    keywordPrimary: article.keywords[0] ?? "",
    slug: article.slug,
    contentHtml: article.contentHtml,
    schemaJsonLd: article.schemaJsonLd,
  });

  await logEvent({
    entityType: "article",
    entityId: article.id,
    step: "seo_audit",
    status: audit.issues.some((i) => i.severity === "error") ? "failed" : "succeeded",
    errorCode: audit.issues.some((i) => i.severity === "error") ? "SeoGateFailed" : undefined,
    errorDetail: audit.issues.some((i) => i.severity === "error") ? JSON.stringify(audit.issues) : undefined,
  });

  if (cfg.dryRun) {
    return { articleId: article.id, status: "DRY_RUN", auditScore: audit.score, auditIssues: audit.issues.length };
  }

  if (audit.issues.some((i) => i.severity === "error")) {
    return { articleId: article.id, status: "DRAFT_CREATED", auditScore: audit.score, auditIssues: audit.issues.length };
  }

  await prisma.article.update({ where: { id: article.id }, data: { status: "PUBLISHED", publishedAt: new Date() } });
  await logEvent({ entityType: "article", entityId: article.id, step: "publish", status: "succeeded" });

  return { articleId: article.id, status: "PUBLISHED", auditScore: audit.score, auditIssues: audit.issues.length };
}


