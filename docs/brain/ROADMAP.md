# Roadmap — IlVantaggioAI.it Autoblogger AI

Questa roadmap scompone il piano in **epic → milestone → task** con dipendenze e criteri di accettazione. È pensata per lavoro **multi‑agente** (vedi `AGENTS.md`).

## Obiettivo

Produrre e pubblicare 2–3 articoli/settimana con pipeline automatizzata:
**News → Draft → Editing+SEO → Immagini → WordPress → Distribuzione**.

## Decisioni bloccanti (da chiudere presto)

1. **Content store**: DB (Postgres consigliato) vs file-based (MDX/JSON).
2. **Pubblicazione**: auto‑publish vs “draft + approvazione”.
3. **Lingua**: IT only vs IT+EN (hreflang e duplicazione pipeline).
4. **Storage immagini**: local/static vs S3/Vercel Blob.
5. **Deploy strategy**: SSR/ISR + cache invalidation (Vercel recommended) vs full SSR.

> Ogni scelta va registrata in `ADR/` e riflessa in `ARCHITECTURE.md` + `INTEGRATIONS.md`.

## Definition of Done (per qualunque milestone)

- **Contratti**: input/output rispettano `CONTEXT_PACK.md` (e/o JSON schema quando introdotti)
- **Idempotenza**: re-run non duplica contenuti né pubblicazioni
- **Error handling**: retry/backoff + dead-letter (o equivalente in Make)
- **Testing**:
  - unit test per logiche pure (scoring, slug, validators)
  - integration test per chiamate API (WP/Perplexity/OpenAI/etc)
- **Documentazione**: aggiornato il Project Brain (minimo: `ROADMAP.md` + file toccati)

## Milestone (ordine consigliato)

### M0 — Project Brain (documentazione canonica)

- Output: struttura `docs/brain/` completa e navigabile

### M1 — Contratti & Data Model

- Definire oggetti canonici: `NewsCandidate`, `ArticleDraft`, `ArticleReady`, `MediaAsset`
- Definire schema DB (o alternativa WP) + stati + vincoli (dedupe)
- Definire “event log” minimo per osservabilità (anche in Make)

### M2 — News Intelligence (Perplexity)

- Ingestion: query per categoria/topic + output JSON normalizzato
- Dedupe per URL/title hash + freshness window
- Scoring e selezione (auto + possibilità manual override)

### M3 — Draft Generator (Gemini)

- Prompt draft lungo 2.500+ parole con struttura H2/H3
- Persistenza bozza + placeholder per immagini + citazioni

### M4 — SEO & Editing (GPT)

- Humanization + SEO hardening + schema JSON‑LD + meta
- Validazioni: keyword placement, link counts, markers `[VERIFICA PERPLEXITY]`

### M5 — Image Pipeline (Nanobana)

- Generazione hero/mid/social con palette brand
- Alt text + prompt storage + mapping assets↔article

### M6 — Publishing (WordPress REST)

### M6 — Publishing (Next.js Content Store)

- Persistenza contenuto (draft/publish) in DB o file store
- Routing: pagina articolo per slug + meta + schema + OG tags
- Idempotenza: update by slug/id e non duplicare

### M7 — Post‑Publish (Distribuzione)

- Search Console submit
- Social (Buffer/Hootsuite o API dirette)
- Newsletter (Mailchimp/ConvertKit)
- Slack notification

### M8 — Osservabilità & Quality Gates

- Metriche: tempo pipeline, fallimenti per step, costi stimati, SEO score
- Alerting: errori ripetuti, rate limit, publishing fail
- Dashboard (anche solo log strutturati + report giornaliero)

### M9 — Brand & Pagine statiche (About/Logo/Styleguide)

- About page contenuti (già bozza) + aggiornamenti periodici
- Logo/branding prompt + asset pack
- Linee guida editoriali “E‑E‑A‑T”

## Epic Breakdown (per lavoro parallelo)

### E1 — Data & Contracts (Agent: Infra/QA)

- [ ] Disegnare JSON schema minimi (NewsCandidate/ArticleReady)
- [ ] Proporre scelta DB + ADR
- [ ] Definire stati (queued/drafting/optimizing/imaging/publishing/published/failed)

### E2 — Perplexity News (Agent: Research/Infra)

- [ ] Prompt + parser normalizzato
- [ ] Scoring function (unit test)
- [ ] Dedupe policy e finestre temporali

### E3 — Gemini Draft (Agent: Content/Infra)

- [ ] Prompt + regole citazioni + placeholders immagini
- [ ] Validatore struttura (H2/H3, hook, CTA)

### E4 — GPT Optimization (Agent: SEO/Content)

- [ ] Prompt SEO + schema generator + internal links suggestions
- [ ] Validatore keyword placement + meta length

### E5 — Nanobana Images (Agent: Brand/Content)

- [ ] Prompt immagini (hero/mid/social) + palette
- [ ] Naming convention asset + alt text rules

### E6 — WordPress Publishing (Agent: CMS/Infra)

### E6 — Next.js Publishing (Agent: Web/Infra)

- [ ] Content store (DB/file) + API di publish
- [ ] Routing per slug + sitemap + robots + OG + schema
- [ ] Strategy per categorie/tag + canonical URL

### E7 — Post‑Publish (Agent: Growth/Infra)

- [ ] GSC submit + retry
- [ ] Social/Newsletter/Slack


