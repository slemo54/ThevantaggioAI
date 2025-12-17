# Context Pack (LLM / agent bootstrap) — IlVantaggioAI.it

Incolla questo file come contesto iniziale per qualunque agente che lavori sul progetto.

## Identità & Brand

- **Nome**: IlVantaggioAI.it
- **Tagline**: “Il vantaggio concreto dell’AI”
- **Tono**: tecnico ma accessibile, giovane/dinamico, “click-bait etico” (urgenza/FOMO senza esagerare o inventare)
- **Pubblico**: developer, marketer, imprenditori, professionisti tech
- **Lingua**: **Italiano di default**

## Categorie pilastro (taxonomy)

1. **AI per Marketing**
2. **AI per Web Development**
3. **AI per Aziende**

## Regole contenuto (editoriali)

- **Headlines**: titoli accattivanti con numeri/superlativi/urgenza (senza claim falsi)
- **Hook iniziale**: primo paragrafo max 2–3 righe (attenzione immediata)
- **Struttura**: H2/H3 progressivi, liste puntate, citazioni, CTA
- **Lunghezza target**: 1.800–2.500 parole (draft anche 2.500+)
- **Keyword primaria**: 3–5 occorrenze, in H1, almeno 2 H2, distribuzione naturale
- **LSI keywords**: naturali, non keyword stuffing
- **Freshness**: fonti/news entro 7–14 giorni max (target 7)
- **Linking**: 3–5 link interni, 2–3 esterni autorevoli
- **CTA**: minimo 2 CTA (inizio/metà/fine)
- **Fact-check light**: niente dati inventati; se incerti usare marker `[VERIFICA PERPLEXITY]`

## Regole SEO (output)

- **Meta description**: 150–160 caratteri, keyword + beneficio
- **Slug**: lowercase, hyphen, 4–5 parole, keyword all’inizio
- **Schema**: `NewsArticle` JSON-LD con `datePublished`, `dateModified`, `image`
- **Immagini**: hero min 1200×630 + alt text descrittivo (keyword se naturale)

## Workflow (alto livello)

1. **Perplexity**: ricerca 5 news top su topic/categoria con fonti e trend
2. **Gemini**: prima bozza lunga e strutturata (2.500+ parole)
3. **GPT**: umanizzazione + SEO hardening + schema + meta + link interni
4. **Nanobana**: immagini (hero + mid + opzionale social)
5. **WordPress**: pubblicazione via REST API con meta SEO e featured image
6. **Post‑publish**: Search Console submit, analytics event, social, newsletter, Slack

## Contratti dati (oggetti principali)

### NewsCandidate (minimo)

- `title_original`
- `source`
- `published_at` (ISO)
- `url`
- `summary_150w`
- `why_it_matters`
- `keywords` (array)
- `angles` (array)
- `relevance_score` (0–100, se disponibile)

### ArticleReady (output canonico)

```json
{
  "title": "...",
  "slug": "...",
  "excerpt": "...",
  "meta_description": "...",
  "keywords": ["..."],
  "content_html": "...",
  "featured_image_prompt": "...",
  "schema_json_ld": {},
  "internal_links": [{ "anchor": "...", "url": "..." }],
  "cta_sections": ["...", "..."],
  "seo_score": "85-100",
  "publish_time": "2025-12-15T11:00:00+01:00",
  "author_byline": "Marco Cosetek"
}
```

## Assunzioni implementative (da confermare)

- Orchestrazione: **Make/Integromat**
- Stato pipeline: **Postgres** (es. Supabase) con tabelle: `news_candidates`, `article_queue`, `drafts`, `articles_ready`, `media_assets`
- CMS: **WordPress** via REST API

Se cambia una di queste assunzioni, creare un ADR e aggiornare `ARCHITECTURE.md` + `INTEGRATIONS.md`.


