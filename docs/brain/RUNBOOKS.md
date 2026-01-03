# Runbooks — operazioni e incident response (V1)

## Re-run sicuro (idempotente)

Prima di rilanciare uno step:

- verificare `status` + `failed_step`
- verificare che esista una `idempotency_key` (es. `article_id`)
- verificare dedupe su WordPress (slug o `wordpress_post_id`)

## Failure patterns & azioni

### Perplexity fallisce / output incompleto

- retry con backoff
- ridurre query (più specifica) oppure cambiare categoria
- se fonti scarse → fallback a ricerca per keyword primaria

### Draft Gemini “debole” / non strutturato

- applicare quality gate: presenza H2/H3, hook, CTA, citazioni
- se fallisce → rigenerare con prompt più vincolante

### GPT: marker `[VERIFICA PERPLEXITY]` presente

- policy consigliata: **non pubblicare** finché non risolto
- azione: rilanciare Perplexity su claim specifico o rimuovere claim

### Nanobana fallisce

- degradazione: pubblicare senza social tile (solo hero)
- se hero manca: pubblicare con placeholder e pianificare update

### WordPress publish fallisce

- controllare auth/scopes
- cercare post per slug: se esiste, fare update (non create)
- se media upload fallisce: pubblicare senza featured image e fare patch successiva

## Checklist giornaliera

- pipeline success rate
- articoli pubblicati vs pianificati
- errori ricorrenti per step
- freshness window rispettata

## Vercel Cron (runner)

## Deploy Vercel (monorepo)

Questo repo è un monorepo: la Next.js app vive in `apps/web`.
Su Vercel devi impostare **Project Settings → Root Directory = `apps/web`** (non via `vercel.json`, perché `rootDirectory` non è supportata nello schema).

Endpoint canonico:

- `POST /api/cron/run`
- Header richiesto: `x-cron-secret: <CRON_SECRET>`

Note:

- Se mancano provider config/keys, il runner fallirà sugli step non implementati (Perplexity/Gemini/OpenAI/Nanobana).
- In recovery puoi usare `POST /api/internal/run` con lo stesso header per forzare `dryRun=true` e validare che DB + SEO gate + logging funzionino.


