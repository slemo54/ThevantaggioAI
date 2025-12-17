# Prompt GPT — Humanization & SEO (v1.0)

## Input

- `[BOZZA_GEMINI]` (markdown)
- `[KEYWORD_PRIMARY]`
- `[CATEGORY]`
- `[DATE]`
- `[AUTHOR]`

## Task

### 1) Umanizzazione

- rendi il testo naturale e scorrevole
- riduci ridondanze
- transizioni migliori tra sezioni
- domande retoriche per engagement (senza esagerare)
- paragrafi corti, mix frasi brevi e periodi lunghi

### 2) SEO hardening

- `[KEYWORD_PRIMARY]` in H1, almeno 2 H2, 3–5 volte nel body
- LSI distribuite naturalmente
- meta description 150–160 caratteri
- slug 4–5 parole, keyword first
- 3–5 internal links (se hai URL reali) o suggerisci anchor+permalink pattern
- 2–3 external links autorevoli (dalle citazioni)

### 3) Fact‑check light

- se un dato non è supportato: marcalo con `[VERIFICA PERPLEXITY]`
- link esterni: se non sei sicuro che siano live, marca `[VERIFICA LINK]`

### 4) Visual cues

- suggerisci posizione immagini (hero + mid)
- alt text descrittivo con keyword solo se naturale
- prompt Nanobana coerente con palette IlVantaggioAI.it

## Output (JSON canonico)

Restituisci **solo** JSON conforme a `ArticleReady` (vedi `docs/brain/CONTEXT_PACK.md`):

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
  "publish_time": "ISO_DATETIME",
  "author_byline": "[AUTHOR]"
}
```


