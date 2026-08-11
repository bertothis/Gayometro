import Anthropic from "@anthropic-ai/sdk";

/*
  UNICO modulo che parla col provider AI. L'interfaccia esposta
  (valutaFrase, moderaCommento) e' neutra: un eventuale cambio di
  fornitore in futuro richiede la modifica di questo solo file.

  Da usare SOLO lato server (API route o script): mai dal browser.
*/

export type EsitoValutazione = {
  allowed: boolean;
  percent: number;
  verdict: string;
  motivation: string;
  rejection_message: string;
};

export type EsitoModerazioneCommento = {
  allowed: boolean;
  reason: string;
};

/* Errore tecnico del motore: le API lo traducono in un messaggio simpatico */
export class ErroreMotoreAI extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ErroreMotoreAI";
  }
}

const MODELLO_DEFAULT = "claude-haiku-4-5";

function nomeModello(): string {
  return process.env.AI_MODEL?.trim() || MODELLO_DEFAULT;
}

/*
  Le famiglie di modelli Anthropic piu' recenti (Opus 4.7+, Opus 5,
  Sonnet 5, Fable, Mythos) rifiutano il parametro temperature con un 400:
  lo inviamo solo ai modelli che lo supportano, cosi' cambiare AI_MODEL
  via env non rompe nulla.
*/
function supportaTemperature(modello: string): boolean {
  return !/^claude-(opus-4-[78]|opus-5|sonnet-5|fable|mythos)/.test(modello);
}

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (client) return client;
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new ErroreMotoreAI(
      "Config mancante: serve ANTHROPIC_API_KEY in .env.local"
    );
  }
  client = new Anthropic();
  return client;
}

/*
  Prompt di sistema della valutazione (sezione 4.3 del brief).
  Il formato di output e' garantito dagli structured outputs, ma le
  regole sui campi restano qui perche' definiscono la semantica.
*/
const SYSTEM_VALUTAZIONE = `Sei il motore del Gayometro, un sito satirico italiano. Data una frase che
descrive un comportamento, un oggetto o un'abitudine, restituisci un giudizio
comico su "quanto è gay" secondo la logica volutamente assurda degli
stereotipi da bar tra amici etero.

REGISTRO: la battuta non è mai contro le persone omosessuali. Il bersaglio è
l'ansia da mascolinità e l'assurdità del misurare queste cose. Tono sicuro di
sé, percentuali con falsa precisione (73%, 81%, mai numeri tondi se puoi),
motivazioni brevi e fulminanti.

REGOLE DI SICUREZZA, NON NEGOZIABILI:
- Rifiuta frasi con nomi propri o riferimenti a persone reali o identificabili.
- Rifiuta slur, insulti, riferimenti a minori, violenza, contenuti sessuali espliciti.
- Rifiuta frasi che attaccano gruppi di persone invece di descrivere comportamenti od oggetti.
- Se rifiuti: allowed=false e scrivi un rejection_message leggero, per esempio
  "Il Gayometro misura i comportamenti, non le persone. Riprova con un'abitudine."

CAMPI DELL'OUTPUT:
- allowed: true se la frase è valutabile, false se va rifiutata
- percent: intero 0-100 (se allowed=false metti 0)
- verdict: etichetta comica, massimo 6 parole (vuota se rifiuti)
- motivation: 2 o 3 frasi, massimo 280 caratteri, in italiano, mai trattini lunghi (vuota se rifiuti)
- rejection_message: solo se rifiuti, in tono leggero (vuota se accetti)

TARATURA DI RIFERIMENTO:
- "fumare la sigaretta elettronica" -> circa 80
- "fumare le sigarette slim" -> più alto delle sigarette normali
- "fumare le sigarette normali" -> basso
- "bere la birra al limone" -> alto
- "bere whisky liscio" -> basso
- "profumo floreale e fruttato" -> alto
- "profumo cupo e legnoso" -> basso`;

/*
  Prompt della moderazione commenti: stesso spirito, versione solo
  moderazione (sezione 5 del brief). Temperatura 0: serve coerenza.
*/
const SYSTEM_MODERAZIONE = `Sei il moderatore della bacheca del Gayometro, un sito satirico italiano
dove la gente commenta verdetti comici su "quanto è gay" un comportamento.
Lo spirito da bar è benvenuto: battute, sfottò bonari sul comportamento,
"confermo" e "contesto" accesi vanno benissimo.

Rifiuta SOLO commenti che violano queste regole:
- nomi propri o riferimenti a persone reali o identificabili
- slur o insulti gravi rivolti a persone o gruppi
- riferimenti a minori, violenza, contenuti sessuali espliciti
- attacchi a gruppi di persone (l'umorismo del sito non deride nessuno)
- spam evidente o link promozionali

CAMPI DELL'OUTPUT:
- allowed: true se il commento è pubblicabile
- reason: se rifiuti, il motivo in una frase breve e leggera (vuota se accetti)`;

const SCHEMA_VALUTAZIONE = {
  type: "object",
  properties: {
    allowed: { type: "boolean" },
    percent: { type: "integer" },
    verdict: { type: "string" },
    motivation: { type: "string" },
    rejection_message: { type: "string" },
  },
  required: ["allowed", "percent", "verdict", "motivation", "rejection_message"],
  additionalProperties: false,
} as const;

const SCHEMA_MODERAZIONE = {
  type: "object",
  properties: {
    allowed: { type: "boolean" },
    reason: { type: "string" },
  },
  required: ["allowed", "reason"],
  additionalProperties: false,
} as const;

/* Niente trattini lunghi da nessuna parte: regola assoluta del sito */
function senzaTrattiniLunghi(testo: string): string {
  return testo.replace(/\s*[—–]\s*/g, ", ").replace(/,\s*,/g, ",");
}

function testoDaRisposta(risposta: Anthropic.Message): string {
  const blocco = risposta.content.find((b) => b.type === "text");
  if (!blocco || blocco.type !== "text" || !blocco.text.trim()) {
    throw new Error("risposta senza testo");
  }
  return blocco.text;
}

async function chiamaConJson<T>(opts: {
  system: string;
  user: string;
  schema: Record<string, unknown>;
  temperature: number;
  valida: (dati: unknown) => T;
}): Promise<T> {
  const modello = nomeModello();
  const richiesta: Anthropic.MessageCreateParamsNonStreaming = {
    model: modello,
    max_tokens: 300,
    system: opts.system,
    messages: [{ role: "user", content: opts.user }],
    output_config: {
      format: { type: "json_schema", schema: opts.schema },
    },
    ...(supportaTemperature(modello) ? { temperature: opts.temperature } : {}),
  };

  /* Un tentativo piu' un retry: se il modello inciampa sul formato
     (raro con gli structured outputs) si riprova una volta sola. */
  let ultimoErrore: unknown;
  for (let tentativo = 0; tentativo < 2; tentativo++) {
    try {
      const risposta = await getClient().messages.create(richiesta);
      if (risposta.stop_reason === "refusal") {
        throw new Error("il modello ha rifiutato la richiesta");
      }
      const dati: unknown = JSON.parse(testoDaRisposta(risposta));
      return opts.valida(dati);
    } catch (err) {
      ultimoErrore = err;
      /* Errori di configurazione: inutile riprovare */
      if (err instanceof ErroreMotoreAI) throw err;
      if (err instanceof Anthropic.APIError && err.status === 401) {
        throw new ErroreMotoreAI("chiave API non valida");
      }
    }
  }
  throw new ErroreMotoreAI(
    `il modello non ha prodotto un output valido: ${String(ultimoErrore)}`
  );
}

function comeStringa(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function valutaFrase(
  fraseOriginale: string,
  opzioni: { sospettoNomeProprio?: boolean } = {}
): Promise<EsitoValutazione> {
  const nota = opzioni.sospettoNomeProprio
    ? "\nNota: la frase potrebbe contenere un nome proprio di persona, applica le regole di sicurezza con particolare attenzione (i marchi e i nomi non di persona restano valutabili)."
    : "";

  return chiamaConJson<EsitoValutazione>({
    system: SYSTEM_VALUTAZIONE,
    user: `Frase da valutare: "${fraseOriginale}"${nota}`,
    schema: SCHEMA_VALUTAZIONE,
    temperature: 0.4,
    valida: (dati) => {
      const d = dati as Record<string, unknown>;
      if (typeof d.allowed !== "boolean" || typeof d.percent !== "number") {
        throw new Error("campi mancanti nella valutazione");
      }
      const allowed = d.allowed;
      const percent = Math.max(0, Math.min(100, Math.round(d.percent)));
      const verdict = senzaTrattiniLunghi(comeStringa(d.verdict)).slice(0, 60);
      const motivation = senzaTrattiniLunghi(comeStringa(d.motivation)).slice(
        0,
        280
      );
      const rejection = senzaTrattiniLunghi(
        comeStringa(d.rejection_message)
      ).slice(0, 200);

      if (allowed && (!verdict || !motivation)) {
        throw new Error("valutazione accettata ma senza verdetto o motivazione");
      }
      if (!allowed && !rejection) {
        throw new Error("rifiuto senza rejection_message");
      }
      return {
        allowed,
        percent,
        verdict,
        motivation,
        rejection_message: rejection,
      };
    },
  });
}

export async function moderaCommento(
  testo: string
): Promise<EsitoModerazioneCommento> {
  return chiamaConJson<EsitoModerazioneCommento>({
    system: SYSTEM_MODERAZIONE,
    user: `Commento da moderare: "${testo}"`,
    schema: SCHEMA_MODERAZIONE,
    temperature: 0,
    valida: (dati) => {
      const d = dati as Record<string, unknown>;
      if (typeof d.allowed !== "boolean") {
        throw new Error("campo allowed mancante nella moderazione");
      }
      return {
        allowed: d.allowed,
        reason: senzaTrattiniLunghi(comeStringa(d.reason)).slice(0, 200),
      };
    },
  });
}
