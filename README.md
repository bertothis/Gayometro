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
| `ADMIN_SECRET` | sì | Chiave del pannello nascosto `/admin` (minimo 8 caratteri, consigliata lunga e casuale) |
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

Il pannello del titolare non ha login né link: per chiunque non abbia il
cookie risponde 404, come una pagina inesistente.

- **Primo accesso**: visita `https://tuo-dominio/admin?chiave=ADMIN_SECRET`
  (il valore impostato nella env). Il sito scambia la chiave con un cookie
  httpOnly di 30 giorni e ripulisce l'URL: da lì in poi basta `/admin`.
- **Cosa contiene**: l'archivio completo delle frasi (Recenti, Più gay,
  Meno gay, ricerca, paginazione) e tutti i commenti del sito, flaggati
  inclusi.
- **Comandi per frase**: correggere la percentuale a mano, far rivalutare
  la frase dal motore col prompt attuale (aggiorna anche il commento
  ufficiale del Gayometro), nasconderla o ripristinarla, eliminarla per
  sempre (alla prossima richiesta verrà rivalutata da zero).
- **Comandi per commento**: nascondere, ripristinare, eliminare.
- Tienilo per te: chi conosce la chiave entra. Se la chiave gira, cambiala
  nella env e rientra con la nuova.

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
- **Touchpoint donazioni**: `donations.config.ts`, tre boolean.

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
- [ ] Pannello admin: /admin risponde 404 senza cookie, entra con
      ?chiave=, rivalutazione e correzione percentuale funzionano
- [ ] Immagine risultato scaricata e condivisa su WhatsApp con anteprima
      OG corretta
- [ ] `/api/keep-alive` risponde 200
- [ ] Donazioni: interstitial pre risultato con proseguimento immediato,
      slide-in dopo 10 secondi, modale post download
- [ ] Donazioni: dopo un click sul link di donazione, nessun touchpoint
      per 30 giorni
- [ ] Donazioni: dopo due chiusure nella stessa sessione, il terzo
      touchpoint non appare

## Struttura del progetto

```
app/                  pagine e API route (App Router)
components/           componenti React, inclusi i pixel doodle e il gauge
lib/                  motore AI, db, moderazione, rate limit, quiz
supabase/             migration SQL da eseguire nella dashboard
scripts/              batteria di taratura (npm run taratura)
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
