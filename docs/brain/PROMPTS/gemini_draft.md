# Prompt Gemini — First Draft (v1.0)

## Input

- `[NEWS_DATA]` (JSON da Perplexity)
- `[TOPIC]`
- `[CATEGORY]`
- `[KEYWORD_PRIMARY]`

## Prompt

Scrivi un articolo **2.500+ parole** su **[TOPIC]** per categoria **[CATEGORY]**.
Keyword primaria: **[KEYWORD_PRIMARY]**.
Usa come base le news: `[NEWS_DATA]`.

Requisiti:

- H1 con titolo accattivante (numero/superlativo/urgenza “etica”).
- Hook iniziale breve (max 150 parole, paragrafi corti).
- Sezioni obbligatorie:
  - Contesto attuale
  - Approfondimento tecnico (con esempi pratici / snippet se rilevante)
  - Implicazioni pratiche (marketer/developer/aziende)
  - Tool e risorse (3–5 tool + link)
  - Conclusione + 2 CTA
- Inserire **2–3 citazioni** (con link fonte) e non inventare dati.
- Inserire **1–2 descrizioni immagine** per uso Nanobana (hero + diagramma mid).
- Mettere in **bold** concetti chiave dove utile.

Output: markdown pulito.

Struttura:

---INIZIO OUTPUT---

# [HEADLINE]

## Apertura Hook

## Il Contesto Attuale

## Come Funziona (Approfondimento Tecnico)

## Implicazioni Pratiche

## Tool e Risorse

## Conclusione e CTA

## Meta Suggestions

- Title SEO (60–65 chars):
- Meta description (150–160 chars):
- Keywords LSI (5–8):
- Internal link anchors (3 idee):

---FINE OUTPUT---


