# ADR 0001 — Assunzioni iniziali pipeline

## Stato

Superato (vedi ADR 0002)

## Contesto

Serve una pipeline affidabile e idempotente per generare e pubblicare contenuti su IlVantaggioAI.it.

## Decisione (assunzioni V1)

- Questa ADR è stata sostituita da ADR 0002 (pivot: Next.js + runner in codice; Make fallback; no WordPress).

## Conseguenze

- Serve definire contratti dati e quality gates di pubblicazione.
- Serve gestire dedupe e idempotenza cross-step.


