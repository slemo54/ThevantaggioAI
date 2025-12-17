import type { Category } from "./types";

export type NewsItem = {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  summary: string;
};

export type Draft = {
  title: string;
  slug: string;
  excerpt: string;
  metaDesc: string;
  keywords: string[];
  contentHtml: string;
  schemaJsonLd: unknown;
};

export async function fetchNews(input: {
  category: Category;
  dryRun: boolean;
}): Promise<NewsItem[]> {
  if (input.dryRun) {
    const nowIso = new Date().toISOString();
    return [
      {
        title: `DryRun news (${input.category})`,
        url: "https://example.com/dry-run",
        source: "dry-run",
        publishedAt: nowIso,
        summary: "Placeholder news item per testare la pipeline senza chiamate esterne.",
      },
    ];
  }

  // TODO: integrazione Perplexity (richiede API key + client HTTP + normalizzazione)
  throw new Error("fetchNews not implemented (missing provider config)");
}

export async function generateDraft(input: {
  category: Category;
  news: NewsItem[];
  keywordPrimary: string;
  dryRun: boolean;
}): Promise<Draft> {
  if (input.dryRun) {
    const slug = `test-runner-${input.category.toLowerCase()}-${Date.now()}`;
    const title = `Test pipeline (${input.category}) — IlVantaggioAI.it`;
    return {
      slug,
      title,
      excerpt: "Bozza di test generata dal runner (dry-run).",
      metaDesc:
        "Bozza di test del runner IlVantaggioAI.it per validare SEO Bot, quality gates e publish flow end-to-end.",
      keywords: [input.keywordPrimary, "runner", "seo bot"],
      contentHtml:
        "<h1>Test pipeline</h1><h2>Contesto</h2><p>Contenuto di prova per audit.</p><h2>Dettagli</h2><p>Keyword test.</p><h2>CTA</h2><p>Iscriviti alla newsletter.</p>",
      schemaJsonLd: {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: title,
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
      },
    };
  }

  // TODO: integrazione Gemini (draft lungo con citazioni)
  throw new Error("generateDraft not implemented (missing provider config)");
}

export async function optimizeDraft(input: {
  draft: Draft;
  dryRun: boolean;
}): Promise<Draft> {
  if (input.dryRun) {
    return input.draft;
  }
  // TODO: integrazione OpenAI (umanizzazione + meta + schema)
  throw new Error("optimizeDraft not implemented (missing provider config)");
}

export async function generateImages(input: {
  draft: Draft;
  dryRun: boolean;
}): Promise<{ heroUrl?: string; midUrl?: string; socialUrl?: string }> {
  if (input.dryRun) {
    return {};
  }
  // TODO: integrazione Nanobana (asset URLs + alt text)
  throw new Error("generateImages not implemented (missing provider config)");
}


