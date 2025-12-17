# Project Brain — IlVantaggioAI.it Autoblogger AI

Questo è il **single source of truth** del progetto. Se un agente ha dubbi, parte da qui.

## Lettura consigliata (ordine)

1. `CONTEXT_PACK.md` — contesto compatto “copiaincolla” per agenti/LLM
2. `ROADMAP.md` — cosa stiamo costruendo, in che ordine, con criteri di accettazione
3. `ARCHITECTURE.md` + `DATA_MODEL.md` — come funziona e quali contratti dati
4. `PROMPTS/` — prompt library versionata (Perplexity/Gemini/GPT/Nanobana)
5. `INTEGRATIONS.md` — API, auth, rate limits, failure modes
6. `RUNBOOKS.md` — operatività (retry, re-run, incident, manual override)

## Regole del “cervello”

- **Canonico**: ciò che è scritto qui è “vero” finché non viene aggiornato qui.
- **No duplicati**: se un’informazione è in un file canonico, gli altri file devono linkare (non ricopiare).
- **Ogni decisione importante → ADR**: creare/aggiornare un file in `ADR/`.
- **Ogni modifica di prompt → bump versione** nel file prompt e nota in ADR (se cambia comportamento).

## File canonici

- `CONTEXT_PACK.md`
- `ROADMAP.md`
- `ARCHITECTURE.md`
- `DATA_MODEL.md`
- `INTEGRATIONS.md`
- `AGENTS.md`
- `TEST_STRATEGY.md`
- `SECURITY.md`
- `RUNBOOKS.md`
- `GLOSSARY.md`

## Stato repo (nota tecnica)

Nel workspace corrente **non ci sono ancora file applicativi**: questo repo parte come “brain-first”.
Quando aggiungeremo codice e automazioni, aggiorneremo qui i link e la struttura.

## Open questions (da chiudere presto)

Vedi `ROADMAP.md` → sezione “Decisioni bloccanti”.


