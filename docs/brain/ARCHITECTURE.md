# Architettura — IlVantaggioAI.it Autoblogger AI

## Executive summary

Sistema di generazione e pubblicazione articoli basato su pipeline a step:
**News → Draft → Editing+SEO → Immagini → WordPress → Post‑publish**.

## Componenti

- **Orchestratore primario**: runner in codice (Node/TypeScript) con scheduling e quality gates
- **Fallback**: Make/Integromat (manual override / recovery / scenari ridotti)
- **News intelligence**: Perplexity (ricerca + trend + fonti)
- **Draft**: Gemini (articolo lungo strutturato)
- **Editing/SEO**: GPT (umanizzazione + meta + schema + internal links)
- **Immagini**: Nanobana (hero/mid/social)
- **Web app**: Next.js (React) per rendering contenuti + eventuale UI admin
- **Content store**: da decidere (DB Postgres consigliato) o file-based (MDX/JSON)

## Flusso (sequenza)

1. **Trigger**: scheduler giornaliero (es. 11:00 CET) o 2–3 volte/settimana
2. **Perplexity**: genera 5 `NewsCandidate` per `[TOPIC]` o per categoria
3. **Normalizzazione**: parser → `NewsCandidate` canonico + dedupe
4. **Selezione**: scoring + filtro (auto) + eventuale manual override
5. **Gemini**: produce `ArticleDraft` (markdown + placeholders + citazioni)
6. **GPT**: produce `ArticleReady` (HTML + meta + schema + links + prompt immagini)
7. **Nanobana**: produce `MediaAsset[]` (URL + alt + prompt + dimensioni)
8. **WordPress**: crea/aggiorna post e media; set featured image; aggiorna meta SEO
8. **Publish (Next.js)**: salva contenuto in store + marca come published + rigenera/invalidazione cache se necessario
9. **Post‑publish**: indexing (GSC), social, newsletter, Slack

## Stati pipeline (state machine)

Stati consigliati:

- `news_fetched`
- `queued`
- `drafting`
- `optimizing`
- `imaging`
- `publishing`
- `published`
- `failed` (con `failed_step` + `retry_after`)

## Idempotenza (requisito)

Ogni step deve poter essere rilanciato senza duplicare:

- **News**: dedupe per `url` (primario) + hash titolo+fonte+data (fallback)
- **Draft**: 1 bozza attiva per `candidate_id`
- **Publishing**: usare `idempotency_key` (es. `article_id`) per non creare doppioni
- **Media**: naming deterministico per asset (es. `article_id/hero.png`)

## Failure modes & recovery

- **Rate limits** (Perplexity/Gemini/OpenAI/Nanobana/WP): backoff + retry
- **Fonti non verificabili**: marcare `[VERIFICA PERPLEXITY]` e bloccare publish se policy “hard”
- **Errori immagini**: pubblicare senza social tile (degradazione controllata)
 - **Provider down**: usare Make come percorso fallback per esecuzioni controllate

## Configurazione (da non hardcodare)

- API keys e token: solo via secrets (Make vault / env / secret manager)
- Policy: freshness window, min link counts, auto‑publish flag, categorie/tags mapping

## Decisioni aperte

Vedi `ROADMAP.md` (Decisioni bloccanti) + ADR (pivot in ADR 0002).


