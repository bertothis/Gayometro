# Gayometro

Piattaforma satirica in italiano che misura, con falsissima precisione
scientifica, quanto è gay un comportamento, un oggetto o un'abitudine.
Il bersaglio comico non sono mai le persone omosessuali: è l'assurdità
di misurare la mascolinità delle cose, e l'ansia da maschio alfa di chi
gioca.

Tre funzionalità:

1. **Gayometro**: scrivi una frase, ricevi percentuale, verdetto e
   motivazione generati dall'AI. Stessa frase, stesso risultato, per sempre.
2. **Bacheca**: le classifiche pubbliche delle 10 frasi più gay e delle
   10 meno gay; ogni frase ha la sua pagina con thread di commenti aperto
   a chiunque, con nickname libero. L'archivio completo vive nel pannello
   admin nascosto.
3. **Quiz "Quanto sei gay?"**: 20 domande pescate da un pool di 120,
   risultato animato e immagine condivisibile. Zero chiamate AI, costo zero.

Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4, Supabase
(Postgres, piano free), API Anthropic via `@anthropic-ai/sdk`, deploy su
Vercel (piano free), Vercel Analytics cookieless.

---

## Setup locale passo passo

Requisiti: Node.js 20 o superiore, npm, un account
[Supabase](https://supabase.com) e uno
[Anthropic Console](https://console.anthropic.com) con credito attivo.

```bash
git clone https://github.com/bertothis/gayometro.git
cd gayometro
npm install
cp .env.example .env.local
# compila .env.local come descritto sotto
npm run dev
```

Il sito è su [http://localhost:3000](http://localhost:3000).

## Creazione del progetto Supabase ed esecuzione della migration

1. Su [supabase.com](https://supabase.com) crea un nuovo progetto (piano
   free). Scegli una password del database e conservala: serve anche per
   i backup.
2. **Attiva pg_cron**: dashboard del progetto, `Database > Extensions`,
   cerca `pg_cron` e abilitala. Serve alla pulizia automatica dei dati
   antispam, che è promessa nell'informativa privacy.
3. Apri `SQL Editor > New query`, incolla l'intero contenuto di
   `supabase/migration.sql` e premi Run. Crea tabelle, indici, funzione
   di rate limiting, Row Level Security e il job notturno di pulizia.
4. Recupera le credenziali da `Impostazioni progetto > API`
   (o `Settings > API keys`):
   - `Project URL` → variabile `SUPABASE_URL`
   - chiave `service_role` (segreta!) → `SUPABASE_SERVICE_ROLE_KEY`

La service role key bypassa la Row Level Security e vive solo lato
server: mai nel browser, mai committata.

## Variabili d'ambiente

| Variabile | Obbligatoria | Descrizione |
|---|---|---|
| `ANTHROPIC_API_KEY` | sì | Chiave API da console.anthropic.com |
| `AI_MODEL` | no | Default `claude-haiku-4-5`, il più economico. Per testare un modello superiore sulla qualità comica basta cambiare questo valore |
| `SUPABASE_URL` | sì | URL del progetto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | sì | Chiave service role (segreta) |
| `IP_HASH_SALT` | sì | Stringa lunga casuale qualsiasi: sala l'hash degli IP per l'antispam |
| `ADMIN_GATE_SECRET` | sì | Rivela il form di login di `/admin` al posto del 404. Generata con `npm run admin:setup` |
| `ADMIN_SESSION_SECRET` | sì | Firma il cookie di sessione dopo il login. Generata con `npm run admin:setup` |
| `ADMIN_EMAIL` | sì | Email dell'unico amministratore. Generata con `npm run admin:setup` |
| `ADMIN_PASSWORD_HASH` | sì | Hash bcrypt della password, codificato in base64. Generato con `npm run admin:setup` |
| `ADMIN_TOTP_SECRET` | sì | Segreto per il codice a 6 cifre (Google Authenticator, Authy...). Generato con `npm run admin:setup` |
| `QUIZ_GATE` | no | `off` in v1. Predisposizione del futuro sblocco quiz (sezione paywall) |
| `NEXT_PUBLIC_DONATION_URL` | no | Link esterno donazioni (Ko-fi, PayPal.me...). Se vuoto, nessun touchpoint donazioni appare |
| `NEXT_PUBLIC_SITE_URL` | sì | URL pubblico del sito (in locale `http://localhost:3000`), usato da metadata e card OG |
| `NEXT_PUBLIC_CONTACT_EMAIL` | no | Email mostrata in `/info` per segnalazioni e richieste di rimozione |

## Batteria di taratura del motore AI

Prima di andare online, verifica che il modello tenga il registro comico:

```bash
npm run taratura
```

Esegue 30 frasi di test (attese alte, attese basse, attesi rifiuti,
borderline con marchi) e scrive le tabelle dei risultati in
`taratura.md`. L'elenco delle frasi vive in `scripts/taratura.ts`.

## Donazioni: popup di benvenuto, banner statici e frase seminata

Oltre ai tre touchpoint originari (interstitial pre risultato del quiz,
slide-in 10 secondi dopo il risultato, modale dopo il download
dell'immagine), il sito ha:

- **Popup di benvenuto** (`components/WelcomeModal.tsx`): il primo popup
  visto da chiunque arrivi sul sito, un disclaimer sul tono satirico senza
  nessuna richiesta di donazione. Compare una volta per sessione e non fa
  parte del sistema donazioni: resta attivo anche se
  `NEXT_PUBLIC_DONATION_URL` è vuota.
- **Banner statici** (`components/donations/BannerDonazione.tsx`): in home
  prima di "Ultime misurazioni" e in fondo al risultato del quiz. A
  differenza dei popup non hanno nessuna logica di frequenza e non si
  spengono mai per chi ha già donato: restano visibili finché c'è un link
  di donazione configurato, punto. Un click sopprime comunque i popup per
  30 giorni, solo i banner restano sempre lì.
- **Popup dopo due misurazioni**: compare dopo la seconda valutazione
  Gayometro della sessione (il contatore riparte ad ogni sessione).
- **Popup della frase seminata**: quando qualcuno genera esattamente la
  frase "chi non supporta questo sito" (percentuale fissa all'83%),
  compare un popup dedicato 3 secondi dopo, con link diretto alla
  donazione.

I due nuovi popup seguono le stesse regole di frequenza degli originari
(vedi `lib/donations-client.ts`): una volta a sessione, mai per chi è già
segnato come supporter, sospesi dopo due chiusure senza click nella
stessa sessione. Tutti e cinque i touchpoint di donazione (non il popup
di benvenuto, che è un caso a parte) si spengono singolarmente da
`donations.config.ts`.

Per seminare la frase dedicata nel database:

```bash
npm run seed:donazioni
```

Script idempotente (`scripts/seed-frase-donazioni.ts`): crea la frase se
manca, altrimenti aggiorna percentuale, verdetto e motivazione della riga
esistente, più il primo commento firmato "Il Gayometro". Lo slug atteso
dal popup lato client vive in `lib/frase-donazioni.ts`: se cambi il testo
della frase nello script, aggiorna anche quella costante.

## Deploy su Vercel

1. Importa il repository su [vercel.com](https://vercel.com) (piano
   Hobby). Framework rilevato automaticamente: Next.js.
2. In `Settings > Environment Variables` inserisci tutte le variabili
   della tabella sopra. `NEXT_PUBLIC_SITE_URL` va valorizzata con il
   dominio di produzione (per esempio `https://gayometro.vercel.app`).
3. Deploy. Vercel Analytics si attiva da `Analytics` nella dashboard del
   progetto, zero configurazione.

**Nota sul piano Hobby**: è dichiarato per uso personale non
commerciale. Il link di donazione esterno è una zona grigia generalmente
tollerata; il giorno in cui `QUIZ_GATE` passa a `on` con pagamenti reali
il progetto diventa commerciale e serve il passaggio al piano Pro.

**Nota su Vercel Analytics**: il piano Hobby include 50.000 eventi al
mese, poi la raccolta si ferma fino al ciclo successivo, senza
possibilità di comprare eventi extra. Un picco virale li esaurisce in
fretta: non si rompe nulla, si perdono solo dati di misurazione.

## Keep-alive di Supabase (obbligatorio sul piano free)

Il piano free di Supabase mette in pausa i progetti dopo 7 giorni di
bassa attività, con cold start di circa 30 secondi al risveglio. Il
repository include `.github/workflows/keep-alive.yml`, una GitHub Action
che chiama `/api/keep-alive` una volta al giorno.

Per attivarla: su GitHub, `Settings > Secrets and variables > Actions >
Variables > New repository variable`, nome `KEEP_ALIVE_URL`, valore
l'URL completo della route in produzione, per esempio:

```
https://gayometro.vercel.app/api/keep-alive
```

Puoi verificarla subito da `Actions > Keep-alive Supabase > Run workflow`.

## Backup periodico con pg_dump

Il piano free di Supabase non ha retention di backup: fattelo da solo,
ogni tanto. Dalla dashboard, `Impostazioni progetto > Database`, copia la
connection string (URI), poi:

```bash
pg_dump "postgresql://postgres:[PASSWORD]@db.[PROGETTO].supabase.co:5432/postgres" \
  --no-owner --no-privileges -f backup-gayometro-$(date +%F).sql
```

Serve il client `pg_dump` installato (su Mac: `brew install libpq`).
Conserva i file da qualche parte di sicuro: per ripristinare basta
eseguire il file sql su un progetto nuovo.

## Pannello admin nascosto (/admin)

L'accesso ha due livelli indipendenti. Il primo e' solo offuscamento
(nasconde l'esistenza della pagina); il secondo e' la vera sicurezza
(password + autenticazione a due fattori).

- **Genera le credenziali** (una volta sola): `npm run admin:setup`.
  Ti chiede email e password, poi stampa cinque righe da incollare in
  `.env.local` (e nelle env di Vercel al deploy) e un QR code da
  scansionare con Google Authenticator, Authy, 1Password o un'app TOTP
  qualsiasi.
- **Primo accesso**: visita `https://tuo-dominio/admin?entra=ADMIN_GATE_SECRET`
  (il valore stampato dallo script). Il sito scambia la chiave con un
  cookie httpOnly di un anno e ripulisce l'URL: da lì in poi `/admin`
  mostra un vero form di login invece del 404. Chi non conosce questo
  link non sa nemmeno che la pagina esiste.
- **Login**: email + password + codice a 6 cifre dall'app authenticator.
  Sessione valida 7 giorni, verificata lato server ad ogni richiesta (non
  solo affidata alla scadenza del cookie). "Esci" chiude la sessione
  senza dimenticare il link segreto.
- **Se perdi l'accesso** all'app authenticator: rilancia
  `npm run admin:setup`, aggiorna le variabili nelle env di Vercel e
  rifai il deploy. Non c'è un flusso di recupero via email: è un
  progetto con un solo amministratore.
- **Tentativi di login** limitati dal rate limiting (8 per coppia
  IP+cookie tecnico, 20 per IP, ogni ora).
- **Cosa contiene**: l'archivio completo delle frasi (Recenti, Più gay,
  Meno gay, ricerca, paginazione) e tutti i commenti del sito, flaggati
  inclusi.
- **Comandi per frase**: correggere la percentuale a mano, far rivalutare
  la frase dal motore col prompt attuale (aggiorna anche il commento
  ufficiale del Gayometro), nasconderla o ripristinarla, eliminarla per
  sempre (alla prossima richiesta verrà rivalutata da zero).
- **Comandi per commento**: nascondere, ripristinare, eliminare.
- Tieni il link segreto per te, ma non è la vera protezione: anche se
  girasse, chi lo trova vede solo un form di login che senza password e
  codice TOTP non porta da nessuna parte. Se vuoi comunque cambiarlo,
  rilancia `npm run admin:setup` (rigenera anche le altre credenziali)
  e aggiorna le env.

## Moderazione manuale dalla dashboard Supabase (alternativa)

Tutto resta moderabile anche dal `Table Editor` di Supabase:

- **Frase da nascondere**: tabella `phrases`, trova la riga, metti
  `flagged = true`. Sparisce da home, bacheca e pagina dedicata, e non
  riemerge nemmeno dalla cache del Gayometro: chi la reinvia riceve un
  rifiuto neutro senza contenuti.
- **Commento da nascondere**: tabella `comments`, `flagged = true`.
- **Frase rifiutata per errore dall'AI**: tabella `rejected_phrases`,
  cancella la riga con l'hash corrispondente: al prossimo invio la frase
  verrà rivalutata da zero.

## Modificare domande del quiz e blocklist

- **Domande**: `lib/quiz-questions.ts`, pool di 120 con pesi da -2 a +2
  per opzione (ogni sessione ne pesca 20). Le fasce di risultato sono in
  `lib/quiz-bands.ts`. Dopo la modifica: commit e deploy, nessun altro
  passaggio.
- **Blocklist**: `lib/blocklist.ts`, divisa tra forme esatte e radici.
  Contiene solo termini inequivocabili: le parole ambigue (finocchio,
  sega...) le giudica l'AI col contesto, per non bloccare frasi legittime.
- **Prompt del motore**: `lib/ai.ts`, incluse la taratura di riferimento
  e le regole di sicurezza. Dopo ogni modifica rilancia `npm run taratura`.
- **Touchpoint donazioni**: `donations.config.ts`, cinque boolean. Dettagli
  nella sezione "Donazioni: popup di benvenuto, banner statici e frase
  seminata" più sotto.

## Costi

- Ogni frase **nuova** costa una singola chiamata al modello. Con il
  default `claude-haiku-4-5` (prezzi verificati sulla documentazione
  ufficiale Anthropic: 1 $ per milione di token in input, 5 $ in output)
  una valutazione da ~700 token in ingresso e ~150 in uscita costa circa
  0,15 centesimi di dollaro: con un dollaro si valutano circa 700 frasi
  mai viste.
- Le frasi **ripetute** costano zero (cache su database), e grazie a
  `rejected_phrases` anche i rifiuti ripetuti costano zero.
- Il **quiz** non usa AI: costo zero.
- La **moderazione commenti** costa come una valutazione (una chiamata
  per commento nuovo).
- Supabase free + Vercel free coprono tutto all'inizio. Riverifica i
  prezzi correnti su
  [platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing)
  prima del deploy.

## Checklist di test manuale

- [ ] Frase nuova: percentuale, verdetto e motivazione con animazione
- [ ] Stessa frase ripetuta: stesso identico risultato (dalla cache)
- [ ] Due invii simultanei della stessa frase nuova: nessun errore,
      stesso risultato per entrambi
- [ ] Frase con nome proprio di persona ("Marco Rossi che beve il
      mojito"): rifiuto dall'AI
- [ ] Frase con marchio ("guidare la Fiat Panda"): accettata
- [ ] Frase con termine in blocklist: rifiuto immediato senza chiamata AI
- [ ] Frase rifiutata reinviata: risponde dalla cache `rejected_phrases`,
      nessuna nuova chiamata AI
- [ ] Frase flaggata a mano su Supabase e poi reinviata: rifiuto neutro,
      nessun contenuto restituito
- [ ] Commento normale: pubblicato col primo commento AI già nel thread
- [ ] Commento con insulto: rifiutato con messaggio leggero
- [ ] Rate limit: oltre 30 valutazioni in un'ora scatta il messaggio di
      pausa
- [ ] Quiz completo da mobile: 20 domande, barra di avanzamento,
      risultato animato
- [ ] Pannello admin: /admin risponde 404 senza il cookie del gate,
      `?entra=` rivela il login, credenziali sbagliate rifiutate, login
      con password + TOTP corretti funziona, "Esci" torna al login (non
      al 404), rivalutazione e correzione percentuale funzionano
- [ ] Immagine risultato scaricata e condivisa su WhatsApp con anteprima
      OG corretta
- [ ] `/api/keep-alive` risponde 200
- [ ] Donazioni: interstitial pre risultato con proseguimento immediato,
      slide-in dopo 10 secondi, modale post download
- [ ] Donazioni: dopo un click sul link di donazione, nessun touchpoint
      per 30 giorni
- [ ] Donazioni: dopo due chiusure nella stessa sessione, il terzo
      touchpoint non appare
- [ ] Popup di benvenuto: compare al primo arrivo sul sito, non si
      ripresenta nella stessa sessione, nessuna richiesta di donazione
- [ ] Banner statico in home e in fondo al risultato del quiz: visibile
      con `NEXT_PUBLIC_DONATION_URL` configurata, resta visibile anche
      dopo aver cliccato un link di donazione
- [ ] Popup dopo la seconda misurazione Gayometro della sessione (non
      dopo la prima)
- [ ] Dopo `npm run seed:donazioni`: la frase "chi non supporta questo
      sito" risponde 83% e apre il popup dedicato 3 secondi dopo

## Struttura del progetto

```
app/                  pagine e API route (App Router)
components/           componenti React, inclusi i pixel doodle e il gauge
lib/                  motore AI, db, moderazione, rate limit, quiz
supabase/             migration SQL da eseguire nella dashboard
scripts/              taratura (npm run taratura), seed donazioni (npm run seed:donazioni)
                      e credenziali admin (npm run admin:setup)
assets/fonts/         woff per le immagini OG (licenza SIL OFL)
donations.config.ts   interruttori dei touchpoint donazioni
```

## Note di sicurezza e privacy

- Row Level Security attiva su tutte le tabelle senza policy pubbliche:
  l'anon key non può leggere né scrivere nulla.
- Degli IP si salva solo un hash con salt, cancellato dopo 30 giorni da
  un job pg_cron. Delle frasi rifiutate si salva solo l'hash, mai il testo.
- Rate limiting largo, pensato per il CGNAT degli operatori mobili
  italiani: coppia hash IP + cookie tecnico anonimo, con tetto di
  sicurezza sul solo IP.
- La chiave API Anthropic vive solo nelle env del server, mai nel bundle
  client.
- Pannello admin a due livelli: un link segreto nasconde l'esistenza
  della pagina, password + TOTP a due fattori proteggono l'accesso vero.
  Vedi "Pannello admin nascosto" sopra.
