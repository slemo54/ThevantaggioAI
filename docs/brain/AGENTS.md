# Multi‑Agent Playbook — IlVantaggioAI.it

Questo documento definisce **come lavorano più agenti** sul progetto senza perdere contesto.

## Regole operative (sempre)

- **Single source of truth**: aggiornare i file in `docs/brain/` quando cambia comportamento/assunzioni.
- **Decisioni importanti → ADR**: creare/aggiornare `docs/brain/ADR/xxxx-*.md`.
- **Conventional commits**: `feat:`, `fix:`, `docs:`, `chore:`.
- **Stop‑the‑line**: se un sotto‑step rompe qualcosa, si ripristina stato funzionante prima di proseguire.

### Vincolo deploy (specifico progetto)

Se vengono modificati file in:

- `public/*.php`
- `api/*.php`
- `assets/js/*.js`
- `assets/css/*.css`

allora è obbligatorio:

1. upload via FTP su SiteGround
2. rilettura del file remoto per confermare che la versione live è aggiornata

## Ruoli (agent lanes)

### Agent: Infra / Orchestrator

- Scelte architetturali (Make vs runner codice), idempotenza, retry, DLQ
- DB/state model, storage assets, secrets management
- Contratti tra step e validazioni

### Agent: Research (News Intelligence)

- Query strategy, normalizzazione output Perplexity
- Relevance scoring, dedupe, freshness policy

### Agent: Content (Draft)

- Prompt Gemini, struttura articolo, citazioni e qualità “technical‑but‑accessible”
- Placeholder immagini + code snippets quando rilevanti

### Agent: SEO / Editor

- Prompt GPT: humanization, keyword placement, meta, schema JSON‑LD
- Internal linking strategy e heuristics

### Agent: Brand / Visual

- Prompt Nanobana, palette, style, consistenza visual
- Alt text rules e naming convention assets

### Agent: CMS / Publishing

- WordPress REST: mapping campi, categorie/tag, featured image
- Yoast/RankMath meta update, verifiche post‑publish

### Agent: QA / Observability

- Test strategy (unit vs integration), fixtures
- Logging/metrics, alerting, report giornaliero

## Handoff protocol (quando un agente finisce un task)

Ogni handoff deve includere:

- **Cosa è cambiato** (1–3 bullet)
- **Artefatti aggiornati** (file modificati)
- **Decisioni prese** (link ADR) o **decisioni aperte**
- **Come verificare** (checklist breve)
- **Next step** (massimo 3)

## Come evitare conflitti

- Un agente “possiede” un epic alla volta (vedi `ROADMAP.md`).
- Se serve cambiare un contratto dati, si fa prima un ADR e si avvisa gli altri epic owner.


