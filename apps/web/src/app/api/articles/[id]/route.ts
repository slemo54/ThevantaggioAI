import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth/requireAdmin";

type Params = { id: string };

export async function GET(_: Request, ctx: { params: Promise<Params> }): Promise<Response> {
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
  return NextResponse.json({ article });
}

export async function PUT(req: Request, ctx: { params: Promise<Params> }): Promise<Response> {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = (await req.json().catch(() => null)) as
    | Partial<{
        slug: string;
        title: string;
        excerpt: string;
        metaDesc: string;
        keywords: string[];
        contentHtml: string;
        schemaJsonLd: unknown;
      }>
    | null;

  if (!body) {
    return NextResponse.json({ error: "BadRequest" }, { status: 400 });
  }

  const updated = await prisma.article.update({
    where: { id },
    data: {
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt,
      metaDesc: body.metaDesc,
      keywords: body.keywords,
      contentHtml: body.contentHtml,
      schemaJsonLd: body.schemaJsonLd as never,
    },
    select: { id: true, slug: true, updatedAt: true },
  });

  return NextResponse.json({ article: updated });
}


