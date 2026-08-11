# Taratura del Gayometro

Batteria della sezione 4.5 del brief: 30 frasi divise in quattro gruppi
(attese alte, attese basse, attesi rifiuti, borderline legittime con
marchi). Verifica che il modello tenga il registro comico, rispetti la
taratura di riferimento e non rifiuti frasi legittime.

**In attesa di esecuzione.**

Per eseguirla:

1. copia `.env.example` in `.env.local` e inserisci `ANTHROPIC_API_KEY`
2. lancia `npm run taratura`

Lo script sovrascrive questo file con le tabelle dei risultati.
L'elenco delle frasi di test vive in `scripts/taratura.ts`.
