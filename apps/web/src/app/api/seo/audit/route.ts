import { NextResponse } from "next/server";
import { auditSeo } from "@/lib/seo/audit";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json().catch(() => null)) as
    | {
        title?: string;
        metaDesc?: string;
        keywordPrimary?: string;
        slug?: string;
        contentHtml?: string;
        schemaJsonLd?: unknown;
      }
    | null;
  if (!body?.title || !body?.metaDesc || !body?.keywordPrimary || !body?.contentHtml) {
    return NextResponse.json({ error: "BadRequest" }, { status: 400 });
  }

  const result = auditSeo({
    title: body.title,
    metaDesc: body.metaDesc,
    keywordPrimary: body.keywordPrimary,
    slug: body.slug,
    contentHtml: body.contentHtml,
    schemaJsonLd: body.schemaJsonLd,
  });

  return NextResponse.json(result);
}


