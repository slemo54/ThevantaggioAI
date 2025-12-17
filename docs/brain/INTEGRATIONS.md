# Integrazioni — API, auth, rate limit, note operative

## Perplexity API (News Intelligence)

- **Uso**: ricerca news recenti (7 giorni target), trend, angle editoriali
- **Output richiesto**: JSON normalizzato (vedi `PROMPTS/perplexity_news.md`)
- **Rischi**:
  - fonti non autorevoli → whitelist/score per sorgente
  - link rotti → validazione HEAD/GET (se possibile) o marker `[VERIFICA]`

## Gemini (Draft)

- **Uso**: bozza lunga (2.500+ parole), struttura H2/H3, citazioni, placeholders immagini
- **Rischi**: hallucination su numeri/dati → obbligo citazioni + marker verifica

## OpenAI / GPT (Editing + SEO)

- **Uso**: umanizzazione, SEO hardening, schema JSON-LD, meta, internal links
- **Rischi**: eccesso di “creative writing” → policy: claim solo se supportati da fonti

## Nanobana (Images)

- **Uso**: generazione hero/mid/social tile con palette brand
- **Output**: URL asset + alt text + prompt archiviato
- **Rischi**: testo nell’immagine illeggibile → preferire overlay minimale

## Next.js (Publishing / Web App)

- **Uso**: rendering articoli, pagine categoria/tag, meta SEO + schema, sitemap/robots
- **Scelte da finalizzare**:
  - content store (DB vs file)
  - deploy e caching (ISR/SSR) + invalidation
  - admin UI e auth (se necessaria)

## Make/Integromat (Fallback)

Uso previsto: **fallback** e **manual override** quando il runner in codice è in errore o quando si vuole eseguire solo un sotto-step.

Scenario minimo consigliato (V1):

- Trigger manuale da dashboard Make
- Step 1: chiamare `POST /api/internal/run` con header `x-cron-secret`
- Step 2: leggere risposta (articleId, status, audit) e notificare Slack

Quando usarlo:

- incident recovery (rate limit / provider down)
- rigenerazione di un singolo step (es. solo audit o solo publish) — da introdurre come endpoint dedicato in V2

## Google Search API (Keyword/SERP) — opzionale V1

- **Uso**: validare keyword e SERP intent prima del draft
- **Nota**: introdurla dopo che pipeline base è stabile (M8/M2 avanzato)

## Google Search Console API (Indexing)

- **Uso**: submit URL dopo publish
- **Rischi**: quota e permessi proprietà → verificare ownership

## Mailchimp / ConvertKit (Newsletter)

- **Uso**: invio newsletter + tracking UTM
- **Rischi**: double-send → idempotency per campaign id

## Slack (Notifiche)

- **Uso**: notifica step completati/errori

## Secrets & config

Vedi `SECURITY.md`.


