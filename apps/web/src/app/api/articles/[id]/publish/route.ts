import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth/requireAdmin";
import { auditSeo } from "@/lib/seo/audit";

type Params = { id: string };

export async function POST(_: Request, ctx: { params: Promise<Params> }): Promise<Response> {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) {
    return NextResponse.json({ error: "NotFound" }, { status: 404 });
  }

  const audit = auditSeo({
    title: article.title,
    metaDesc: article.metaDesc,
    keywordPrimary: (article.keywords[0] ?? "").toString(),
    slug: article.slug,
    contentHtml: article.contentHtml,
    schemaJsonLd: article.schemaJsonLd,
  });

  const blocking = audit.issues.filter((i) => i.severity === "error");
  if (blocking.length > 0) {
    return NextResponse.json({ error: "SeoGateFailed", audit }, { status: 422 });
  }

  const updated = await prisma.article.update({
    where: { id },
    data: { status: "PUBLISHED", publishedAt: new Date() },
    select: { id: true, slug: true, status: true, publishedAt: true },
  });

  return NextResponse.json({ article: updated, audit });
}


