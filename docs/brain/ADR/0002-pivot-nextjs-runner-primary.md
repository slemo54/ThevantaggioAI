# ADR 0002 — Pivot: Next.js/React (no WordPress), runner primary, Make fallback

## Stato

Accettato

## Contesto

Il progetto richiede uno stack moderno e controllabile end‑to‑end, senza dipendere da WordPress.
Serve anche una pipeline affidabile con possibilità di fallback manuale/low‑code.

## Decisione

- **CMS/UI**: Next.js (React) come piattaforma principale di pubblicazione e rendering contenuti.
- **Orchestrazione primaria**: **runner in codice** (Node/TypeScript) che esegue la pipeline e applica quality gates.
- **Fallback**: Make/Integromat usato come percorso alternativo (manual override / recovery / scenari ridotti).
- **SEO**: introdurre un **SEO Bot/Audit** come quality gate (prima del publish).

## Conseguenze

- Serve definire un content store (DB vs file) e un modello di pubblicazione (draft/publish).
- La parte “Publishing” diventa: scrittura nel content store + invalidazione cache/build (se necessario).
- Il SEO Bot diventa parte integrante della pipeline e anche un tool “on demand” per auditing.


