# Template esecuzione articolo (v1.0)

Compila e lancia gli step in sequenza.

## Input

- TOPIC: `[TOPIC]`
- CATEGORY: `[AI_per_Marketing | AI_per_WebDev | AI_per_Aziende]`
- PRIMARY_KEYWORD: `[KEYWORD_PRIMARY]`
- TARGET_AUDIENCE: `developer | marketer | founder`
- DATE: `[DATE]`

## STEP 1 — Perplexity

Usa `perplexity_news.md` con:

- `[TOPIC]`
- `[CATEGORY]`
- `[DATE_RANGE_DAYS]=7`

Output atteso: JSON con `items[]`.

## STEP 2 — Gemini

Usa `gemini_draft.md` con:

- `[NEWS_DATA]=output step 1`
- `[TOPIC]`, `[CATEGORY]`, `[KEYWORD_PRIMARY]`

Output atteso: markdown articolo lungo + “Meta Suggestions”.

## STEP 3 — GPT

Usa `gpt_editing_seo.md` con:

- `[BOZZA_GEMINI]=output step 2`
- `[KEYWORD_PRIMARY]`, `[CATEGORY]`, `[DATE]`, `[AUTHOR]`

Output atteso: JSON `ArticleReady`.

## STEP 4 — Nanobana

Usa `nanobana_images.md` con:

- `[TOPIC]`, `[CATEGORY]`, `[KEY_CONCEPT]`, `[KEYWORD_PRIMARY]`, `[SPECIFIC_VISUAL_FROM_ARTICLE]`

Output atteso: URLs + alt text + mapping asset kind.

## STEP 5 — Publish (WordPress)

- create/update post by slug
- set category/tags
- upload media + set featured image
- set meta SEO (Yoast/RankMath: dipende decisione)

## Quality gates (prima di publish)

- no `[VERIFICA PERPLEXITY]` (a meno policy permissiva)
- meta description 150–160 chars
- keyword placement ok
- almeno 2 CTA


