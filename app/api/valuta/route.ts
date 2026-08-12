import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import {
  normalizzaFrase,
  sha256Hex,
  slugify,
  suffissoCasuale,
} from "@/lib/normalize";
import {
  bloccataDaBlocklist,
  possibileNomeProprio,
  honeypotCompilato,
  MESSAGGIO_RIFIUTO_BLOCKLIST,
} from "@/lib/moderation";
import { valutaFrase, ErroreMotoreAI } from "@/lib/ai";
import { azioneConsentita } from "@/lib/rate-limit";
import type { FraseRow, RispostaValuta } from "@/lib/types";

/*
  Pipeline della sezione 4.1 del brief:
  validazione -> rate limit -> cache frasi -> cache rifiuti ->
  blocklist locale -> AI (moderazione + valutazione insieme) ->
  salvataggio con gestione della race condition -> primo commento AI.
*/

const MESSAGGIO_FLAGGED = "Questa frase non è disponibile sul Gayometro.";
const MESSAGGIO_SURRISCALDATO =
  "Il Gayometro si è surriscaldato, riprova tra poco.";
const MESSAGGIO_RATE_LIMIT =
  "Piano coi verdetti: troppe misurazioni in un'ora. Il Gayometro deve raffreddarsi, riprova più tardi.";

function ok(frase: FraseRow): NextResponse<RispostaValuta> {
  return NextResponse.json({
    stato: "ok",
    frase: {
      slug: frase.slug,
      original: frase.original,
      percent: frase.percent,
      verdict: frase.verdict,
      motivation: frase.motivation,
    },
  });
}

function rifiutata(messaggio: string): NextResponse<RispostaValuta> {
  return NextResponse.json({ stato: "rifiutata", messaggio });
}

function errore(
  messaggio: string,
  status: number
): NextResponse<RispostaValuta> {
  return NextResponse.json({ stato: "errore", messaggio }, { status });
}

async function cercaFrase(normalized: string): Promise<FraseRow | null> {
  const { data, error } = await getDb()
    .from("phrases")
    .select("*")
    .eq("normalized", normalized)
    .maybeSingle();
  if (error) throw error;
  return data as FraseRow | null;
}

/*
  Salva la frase gestendo due conflitti sull'indice unique:
  - normalized: race con un altro utente che ha inviato la stessa frase
    nello stesso momento, si rilegge e si restituisce il suo risultato
  - slug: collisione tra frasi diverse, si riprova con suffisso casuale
*/
async function salvaFrase(dati: {
  normalized: string;
  original: string;
  percent: number;
  verdict: string;
  motivation: string;
}): Promise<{ frase: FraseRow; creataOra: boolean }> {
  const base = slugify(dati.normalized);
  for (let tentativo = 0; tentativo < 4; tentativo++) {
    const slug =
      tentativo === 0 ? base : `${base.slice(0, 55)}-${suffissoCasuale()}`;
    const { data, error } = await getDb()
      .from("phrases")
      .insert({ ...dati, slug })
      .select()
      .single();
    if (!error) return { frase: data as FraseRow, creataOra: true };

    if (error.code === "23505") {
      const race = await cercaFrase(dati.normalized);
      if (race) return { frase: race, creataOra: false };
      continue; // era una collisione di slug: riprova col suffisso
    }
    throw error;
  }
  throw new Error("impossibile generare uno slug libero");
}

async function salvaRifiuto(normalized: string, messaggio: string) {
  const { error } = await getDb()
    .from("rejected_phrases")
    .upsert(
      { normalized_hash: sha256Hex(normalized), rejection_message: messaggio },
      { onConflict: "normalized_hash", ignoreDuplicates: true }
    );
  if (error) console.error("salvataggio rifiuto fallito", error);
}

export async function POST(req: NextRequest) {
  let body: { frase?: unknown; sito_web?: unknown };
  try {
    body = await req.json();
  } catch {
    return errore("Richiesta non valida.", 400);
  }

  /* Honeypot: il campo nascosto compilato smaschera i bot */
  if (honeypotCompilato(body.sito_web)) {
    return rifiutata(MESSAGGIO_FLAGGED);
  }

  const original =
    typeof body.frase === "string" ? body.frase.replace(/\s+/g, " ").trim() : "";
  const normalized = normalizzaFrase(original);
  if (original.length < 3 || original.length > 120 || normalized.length < 3) {
    return errore(
      "La frase deve avere tra 3 e 120 caratteri. Il Gayometro è preciso, mica prolisso.",
      400
    );
  }

  try {
    if (!(await azioneConsentita(req, "valuta"))) {
      return errore(MESSAGGIO_RATE_LIMIT, 429);
    }

    /* 1. Cache delle frasi gia' valutate: determinismo e costo zero */
    const esistente = await cercaFrase(normalized);
    if (esistente) {
      if (esistente.flagged) return rifiutata(MESSAGGIO_FLAGGED);
      return ok(esistente);
    }

    /* 2. Cache dei rifiuti: la stessa frase abusiva non costa piu' nulla */
    const { data: rifiuto, error: erroreRifiuto } = await getDb()
      .from("rejected_phrases")
      .select("rejection_message")
      .eq("normalized_hash", sha256Hex(normalized))
      .maybeSingle();
    if (erroreRifiuto) throw erroreRifiuto;
    if (rifiuto) return rifiutata(rifiuto.rejection_message);

    /* 3. Blocklist locale: rifiuto senza chiamata AI */
    if (bloccataDaBlocklist(normalized)) {
      await salvaRifiuto(normalized, MESSAGGIO_RIFIUTO_BLOCKLIST);
      return rifiutata(MESSAGGIO_RIFIUTO_BLOCKLIST);
    }

    /* 4. Una sola chiamata AI: moderazione e valutazione insieme */
    const esito = await valutaFrase(original, {
      sospettoNomeProprio: possibileNomeProprio(original),
    });

    if (!esito.allowed) {
      const messaggio =
        esito.rejection_message ||
        "Il Gayometro misura i comportamenti, non le persone. Riprova con un'abitudine.";
      await salvaRifiuto(normalized, messaggio);
      return rifiutata(messaggio);
    }

    /* 5. Salvataggio con race condition gestita */
    const { frase, creataOra } = await salvaFrase({
      normalized,
      original,
      percent: esito.percent,
      verdict: esito.verdict,
      motivation: esito.motivation,
    });

    if (frase.flagged) return rifiutata(MESSAGGIO_FLAGGED);

    /* 6. Primo commento del thread: la motivazione firmata dal Gayometro.
       Solo chi ha creato davvero la riga lo inserisce, mai due volte. */
    if (creataOra) {
      const { error: erroreCommento } = await getDb().from("comments").insert({
        phrase_id: frase.id,
        nickname: "Il Gayometro",
        body: frase.motivation,
        is_ai: true,
      });
      if (erroreCommento) {
        console.error("primo commento non inserito", erroreCommento);
      }
    }

    return ok(frase);
  } catch (err) {
    if (err instanceof ErroreMotoreAI) {
      console.error("motore AI in errore", err.message);
      return errore(MESSAGGIO_SURRISCALDATO, 503);
    }
    console.error("valutazione fallita", err);
    return errore(MESSAGGIO_SURRISCALDATO, 500);
  }
}
