# Security & Secrets

## Principi

- Mai committare API keys, token, password.
- Separare ambienti: dev/staging/prod.
- Minimo privilegio per token WordPress e API di terze parti.

## Secrets management (V1)

- Make/Integromat: usare vault/secret store integrato.
- Se runner in codice: `.env` solo in locale + `.env.example` senza valori.

## WordPress

- Preferire credenziali dedicate (Application Password / user tecnico).
- Limitare capability al minimo (create/edit posts + upload media).

## Logging

- Non loggare contenuti completi se contengono dati sensibili.
- Loggare: step, entity_id, status, latency, error_code.

## Compliance (nota)

Se si aggiungono email/newsletter, gestire consenso e GDPR (fuori scope tecnico qui, ma da tracciare).


