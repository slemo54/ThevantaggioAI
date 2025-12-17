export type SeoIssue = {
  code:
    | "META_DESC_LENGTH"
    | "KEYWORD_MISSING"
    | "H2_TOO_FEW"
    | "H1_MISSING"
    | "CTA_MISSING"
    | "WORD_COUNT_LOW"
    | "SLUG_INVALID"
    | "SCHEMA_MISSING"
    | "INTERNAL_LINKS_TOO_FEW"
    | "EXTERNAL_LINKS_TOO_FEW";
  message: string;
  severity: "warn" | "error";
};

export type SeoAuditResult = {
  score: number; // 0..100
  issues: SeoIssue[];
};

type AuditInput = {
  title: string;
  metaDesc: string;
  keywordPrimary: string;
  slug?: string;
  contentHtml: string;
  schemaJsonLd?: unknown;
  siteHost?: string; // es. "ilvantaggioai.it"
};

function countMatches(haystack: string, needle: string): number {
  if (!needle.trim()) return 0;
  const re = new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  return (haystack.match(re) ?? []).length;
}

function countTag(contentHtml: string, tag: string): number {
  const re = new RegExp(`<${tag}(\\s|>)`, "gi");
  return (contentHtml.match(re) ?? []).length;
}

function stripHtml(contentHtml: string): string {
  return contentHtml
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

function looksLikeSlug(slug: string): boolean {
  // lowercase, numeri e hyphen; 2-6 segmenti (4-5 target)
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return false;
  const parts = slug.split("-").filter(Boolean);
  return parts.length >= 2 && parts.length <= 6;
}

function hasCtaCue(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("iscriviti") ||
    lower.includes("newsletter") ||
    lower.includes("scarica") ||
    lower.includes("scopri") ||
    lower.includes("prova") ||
    lower.includes("contattami") ||
    lower.includes("contatti")
  );
}

function countLinks(contentHtml: string): { internal: number; external: number } {
  const hrefRe = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let internal = 0;
  let external = 0;
  let match: RegExpExecArray | null;
  while ((match = hrefRe.exec(contentHtml))) {
    const href = match[1] ?? "";
    if (href.startsWith("/")) internal += 1;
    else if (href.startsWith("http://") || href.startsWith("https://")) external += 1;
  }
  return { internal, external };
}

export function auditSeo(input: AuditInput): SeoAuditResult {
  const issues: SeoIssue[] = [];

  const h1Count = countTag(input.contentHtml, "h1");
  if (h1Count < 1) {
    issues.push({
      code: "H1_MISSING",
      severity: "error",
      message: "Manca un H1 nel content HTML.",
    });
  }

  const metaLen = input.metaDesc.trim().length;
  if (metaLen < 150 || metaLen > 160) {
    issues.push({
      code: "META_DESC_LENGTH",
      severity: "warn",
      message: `Meta description fuori range: ${metaLen} caratteri (target 150–160).`,
    });
  }

  const keyword = input.keywordPrimary.trim();
  const keywordInTitle = countMatches(input.title, keyword) > 0;
  const keywordInBody = countMatches(input.contentHtml, keyword);
  if (!keywordInTitle || keywordInBody < 3) {
    issues.push({
      code: "KEYWORD_MISSING",
      severity: "error",
      message: `Keyword primaria non posizionata correttamente (title=${keywordInTitle ? "ok" : "no"}, body=${keywordInBody} occorrenze, target >= 3).`,
    });
  }

  const h2Count = countTag(input.contentHtml, "h2");
  if (h2Count < 3) {
    issues.push({
      code: "H2_TOO_FEW",
      severity: "warn",
      message: `Pochi H2: ${h2Count} (target >= 3).`,
    });
  }

  const text = stripHtml(input.contentHtml);
  const wordCount = countWords(text);
  if (wordCount < 1200) {
    issues.push({
      code: "WORD_COUNT_LOW",
      severity: "warn",
      message: `Word count basso: ${wordCount} (target >= 1800, minimo consigliato 1200).`,
    });
  }

  if (input.slug && !looksLikeSlug(input.slug)) {
    issues.push({
      code: "SLUG_INVALID",
      severity: "warn",
      message: `Slug non conforme: "${input.slug}" (lowercase + hyphen, 4–5 parole target).`,
    });
  }

  if (!input.schemaJsonLd) {
    issues.push({
      code: "SCHEMA_MISSING",
      severity: "warn",
      message: "Schema JSON-LD mancante (NewsArticle consigliato).",
    });
  }

  if (!hasCtaCue(text)) {
    issues.push({
      code: "CTA_MISSING",
      severity: "warn",
      message: "CTA non rilevata (es. newsletter/iscriviti/scopri/scarica).",
    });
  }

  const links = countLinks(input.contentHtml);
  if (links.internal < 3) {
    issues.push({
      code: "INTERNAL_LINKS_TOO_FEW",
      severity: "warn",
      message: `Link interni insufficienti: ${links.internal} (target 3–5).`,
    });
  }
  if (links.external < 2) {
    issues.push({
      code: "EXTERNAL_LINKS_TOO_FEW",
      severity: "warn",
      message: `Link esterni autorevoli insufficienti: ${links.external} (target 2–3).`,
    });
  }

  // scoring semplice: parte da 100 e penalizza
  const penalty = issues.reduce((acc, it) => acc + (it.severity === "error" ? 20 : 8), 0);
  const score = Math.max(0, Math.min(100, 100 - penalty));

  return { score, issues };
}


