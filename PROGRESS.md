# Stato di avanzamento, Gayometro

Questo file esiste per una sola ragione: permettere di riprendere il lavoro
da qualsiasi computer, con qualsiasi account Claude, senza dover ricostruire
il contesto da zero leggendo i commit o incollando vecchie conversazioni.
Va aggiornato ad ogni sessione di lavoro rilevante, non solo letto.

## Dove vive il progetto

- Repository: `bertothis/Gayometro`
- Branch di lavoro attivo: `claude/gayometro-platform-yb52if`
  (non `main`: `main` è ancora fermo al commit iniziale, il branch di lavoro
  non è mai stato mergiato)
- Non esiste una pull request aperta per questo branch al momento della
  stesura di questa nota

## Come riprendere da un computer nuovo

1. Clona il repository e fai checkout di `claude/gayometro-platform-yb52if`
   (non del branch che una sessione Claude Code ti assegna di default: se è
   vuoto, sposta il lavoro lì solo dopo conferma esplicita di chi ti dà le
   istruzioni).
2. `npm install`.
3. Copia `.env.example` in `.env.local` e compila i valori (Supabase,
   Anthropic, salt, segreto admin, link donazioni). Questi valori NON sono
   mai nel repository, per scelta di sicurezza: vanno recuperati da chi
   possiede gli account Supabase e Anthropic, oppure impostati come
   variabili d'ambiente persistenti nelle impostazioni dell'ambiente cloud
   se lavori in un container Claude Code Remote (altrimenti ogni nuova
   sessione riparte senza, perché il container precedente viene distrutto).
4. `npm run build` per verificare che tutto compili prima di toccare altro.
5. Leggi la checklist di test manuale in fondo al `README.md`: al momento
   nessuna voce risulta verificata con dati reali, solo il codice esiste.

## Fasi completate (dal commit iniziale ad oggi)

1. Scaffolding Next.js, design system neobrutalista, componenti pixel
2. Migration Supabase, client db, normalizzazione frasi, rate limit,
   keep-alive
3. Motore AI (`lib/ai.ts`), blocklist, moderazione locale, batteria di
   taratura (`taratura.md`)
4. API `/api/valuta` completa, form con conteggio animato, pagina frase,
   OG immagine frase
5. Bacheca con tab (Recenti, Più gay, Meno gay), ricerca, paginazione,
   thread commenti e relativa API
6. Quiz completo, pagina risultato condivisibile, modulo donazioni
   (interstitial, slide-in, modale)
7. Pagina `/info`, README completo, email di contatto, prezzi del modello
   verificati
8. Iterazioni successive: taratura più coraggiosa, quiz in evidenza in
   home, pannello admin nascosto (`/admin`), bacheca a classifiche, pool
   quiz esteso a 120 domande (20 per sessione), copy più irriverente
9. Popup di benvenuto, sistema di donazioni esteso (popup dopo la seconda
   misurazione, popup dedicato sulla frase "chi non supporta questo sito"),
   script di seed
10. Banner statici di donazione (home e fine quiz) resi sempre visibili:
    non si sopprimono più per chi ha già donato, a differenza dei popup
    che continuano a rispettare il flag supporter di 30 giorni

## Aperti, da verificare o decidere

- Checklist di test manuale nel README: da eseguire con credenziali reali,
  nessuna voce confermata
- Nessuna pull request creata per questo branch verso `main`
- Dominio definitivo non ancora deciso (placeholder in uso)
- Deploy su Vercel non ancora effettuato da questa sessione

## Registro sessioni

### 2026-09-27

- Sessione ripartita da zero context: nessuna memoria della conversazione
  precedente, ricostruito lo stato leggendo il repository e la
  conversazione incollata dall'utente
- Individuato il branch reale `claude/gayometro-platform-yb52if` su
  origin (17 commit, tutte le fasi sopra), diverso dal branch vuoto
  assegnato di default alla sessione
- `npm install`, verificato che `npm run build` e `npm run lint` fossero
  puliti
- Risolte tutte le vulnerabilità di `npm audit` (0 rimaste): `js-yaml` e
  `sharp` con `npm audit fix`, Next.js aggiornato da 16.3.0 a 16.3.6
  (correggeva una RCE critica non autenticata) aggiornando manualmente
  `package.json` (era pinnato in modo esatto, fuori dal range che
  `audit fix` normale copre) e allineato `eslint-config-next` alla stessa
  versione
- Rimossa la deprecazione Next.js 16.3 sulla convenzione `middleware`:
  rinominato `middleware.ts` in `proxy.ts`, funzione esportata rinominata
  da `middleware` a `proxy`, aggiornati i commenti in `lib/admin.ts` che
  la citavano
- Creato questo file `PROGRESS.md`
- Confermato che le credenziali Supabase e Anthropic non erano perse per
  errore, ma non erano mai state salvate in un posto persistente tra
  sessioni: da configurare come variabili d'ambiente dell'ambiente cloud
  se si vuole evitare di reinserirle ogni volta
- Prossimo passo concordato: valutare insieme se e come eseguire la
  checklist di test manuale con credenziali reali
