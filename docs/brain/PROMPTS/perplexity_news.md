# Prompt Perplexity — News Intelligence (v1.0)

## Input variabili

- `[TOPIC]`
- `[CATEGORY]` ∈ `AI_per_Marketing | AI_per_WebDev | AI_per_Aziende`
- `[DATE_RANGE_DAYS]` (default 7)

## Prompt

Task: Estrai le **5 notizie più rilevanti** su **[TOPIC]** degli ultimi **[DATE_RANGE_DAYS]** giorni, con fonti affidabili.

Per ogni news, fornisci:

1. Titolo originale
2. Fonte (publisher)
3. Data pubblicazione (ISO)
4. URL
5. Riassunto ~150 parole (fattuale)
6. Perché è importante per IlVantaggioAI.it (impatto su developer/marketer/aziende)
7. Keywords / trend associati (array)
8. Angoli editoriali possibili (array)
9. (Se possibile) un relevance score 0–100

Criteri:

- sviluppi **nuovi e concreti**
- fonti autorevoli (es. TechCrunch, VentureBeat, The Verge, GitHub, blog ufficiali, paper/benchmark)
- evitare speculazioni non supportate

Output: **JSON** valido e strutturato come segue:

```json
{
  "topic": "[TOPIC]",
  "category": "[CATEGORY]",
  "generated_at": "ISO_DATETIME",
  "items": [
    {
      "title_original": "...",
      "source": "...",
      "published_at": "ISO_DATETIME",
      "url": "https://...",
      "summary_150w": "...",
      "why_it_matters": "...",
      "keywords": ["..."],
      "angles": ["..."],
      "relevance_score": 0
    }
  ]
}
```


