# Strategia Test — unit vs integration

Obiettivo: qualità e regressioni basse senza rallentare la velocità.

## Principi

- **TDD** dove possibile per logiche pure (scoring, validazioni, trasformazioni).
- **Unit** per funzioni pure: veloci, deterministiche, senza DB né network.
- **Integration** per tutto ciò che chiama API/DB/WordPress: mock limitato, preferire sandbox/staging.
- **Golden samples** per prompt/output: snapshot di input→output normalizzato.

## Cosa testare (V1)

### Unit tests (pure)

- `slugify` + regole max 4–5 parole
- validazione meta description (150–160 chars)
- keyword placement checks (H1/H2/body)
- scoring function news (weights e dedupe)
- normalizzatore Perplexity JSON → `NewsCandidate`

### Integration tests

- Perplexity call + parsing (con fixture registrata se non disponibile)
- WordPress:
  - create post
  - update post by slug/id
  - upload media + set featured image
  - set category/tags
  - set meta SEO (dipende plugin)
- (Opzionale) Nanobana: solo “smoke” se API consente

## Separation of concerns

- Le funzioni pure devono vivere in moduli separati e testati unitariamente.
- I moduli “IO” (API/DB) devono essere sottili, con boundary chiari.

## Environment

- Staging WP consigliato per integration (evitare inquinamento produzione).
- Secrets mai nei test; usare env vars e vault.


