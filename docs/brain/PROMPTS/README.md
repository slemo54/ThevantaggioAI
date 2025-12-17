# Prompt Library — regole e versioning

Questa cartella contiene i prompt canonici per la pipeline:

- Perplexity (news intelligence)
- Gemini (draft lungo)
- GPT (humanization + SEO + schema)
- Nanobana (immagini)
- Template di esecuzione articolo

## Regole

- I prompt sono **codice**: versionarli e testarli (almeno con “golden samples” quando possibile).
- Ogni modifica che cambia output/struttura → aggiornare versione nel file e creare ADR se impatta pipeline.
- Variabili standard:
  - `[TOPIC]`
  - `[CATEGORY]` ∈ `AI_per_Marketing | AI_per_WebDev | AI_per_Aziende`
  - `[KEYWORD_PRIMARY]`
  - `[DATE]`
  - `[AUTHOR]`

## Contratto output finale (must)

Vedi `../CONTEXT_PACK.md` → `ArticleReady`.


