# Data Model — oggetti, tabelle e vincoli

Questo documento definisce i **contratti dati** canonici. Se cambiano, aggiornare qui e creare ADR.

## Oggetti canonici (domain)

### NewsCandidate

- `id` (UUID)
- `topic` (string)
- `category` (enum)
- `title_original` (string)
- `source` (string)
- `published_at` (ISO datetime)
- `url` (string)
- `summary_150w` (string)
- `why_it_matters` (string)
- `keywords` (string[])
- `angles` (string[])
- `relevance_score` (0–100, opzionale)
- `created_at` (ISO)

Vincoli:

- unique(`url`) se presente
- fallback unique(hash(`title_original|source|published_at`))

### ArticleQueueItem

- `id` (UUID)
- `candidate_id` (UUID)
- `status` (enum)
- `selected_by` (`auto` | `manual`)
- `priority` (int)
- `scheduled_for` (ISO, opzionale)
- `created_at`
- `updated_at`

### ArticleDraft

- `id` (UUID)
- `queue_item_id` (UUID)
- `draft_markdown` (string)
- `citations` ({title, url, source, published_at}[])
- `image_placeholders` ({slot, description}[])
- `created_at`
- `updated_at`

### ArticleReady

Vedi `CONTEXT_PACK.md` (contratto output finale).

Campi aggiuntivi consigliati:

- `fact_check_flags` (string[])
- `quality_gates` ({name, pass, details}[])

### MediaAsset

- `id` (UUID)
- `article_ready_id` (UUID)
- `kind` (`hero` | `mid` | `social`)
- `width` (int)
- `height` (int)
- `prompt` (string)
- `url` (string)
- `alt_text` (string)
- `created_at`

## Schema DB (Postgres consigliato)

Tabelle:

- `news_candidates`
- `article_queue`
- `drafts`
- `articles_ready`
- `media_assets`
- `pipeline_events` (log step)

### pipeline_events (osservabilità minima)

- `id` UUID
- `entity_type` (`candidate` | `article`)
- `entity_id` UUID
- `step` (string)
- `status` (`started` | `succeeded` | `failed`)
- `error_code` (string, nullable)
- `error_detail` (text, nullable)
- `cost_estimate_usd` (numeric, nullable)
- `latency_ms` (int, nullable)
- `created_at`

## Dedupe & idempotency keys

- `news_candidates.url` unique
- `articles_ready.slug` unique (se deterministico)
- `wordpress_post_id` salvato su `articles_ready` e usato per update (non create)


