import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth/requireAdmin";

export async function POST(req: Request): Promise<Response> {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as
    | {
        slug?: string;
        title?: string;
        excerpt?: string;
        metaDesc?: string;
        keywords?: string[];
        contentHtml?: string;
        schemaJsonLd?: unknown;
      }
    | null;

  if (
    !body?.slug ||
    !body?.title ||
    !body?.excerpt ||
    !body?.metaDesc ||
    !body?.keywords ||
    !body?.contentHtml ||
    !body?.schemaJsonLd
  ) {
    return NextResponse.json({ error: "BadRequest" }, { status: 400 });
  }

  const article = await prisma.article.create({
    data: {
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt,
      metaDesc: body.metaDesc,
      keywords: body.keywords,
      contentHtml: body.contentHtml,
      schemaJsonLd: body.schemaJsonLd as never,
    },
    select: { id: true, slug: true },
  });

  return NextResponse.json({ article });
}


