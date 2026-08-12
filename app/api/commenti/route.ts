import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { normalizzaFrase } from "@/lib/normalize";
import {
  bloccataDaBlocklist,
  honeypotCompilato,
  MESSAGGIO_RIFIUTO_COMMENTO,
} from "@/lib/moderation";
import { moderaCommento, ErroreMotoreAI } from "@/lib/ai";
import { azioneConsentita } from "@/lib/rate-limit";
import type { CommentoRow, RispostaCommento } from "@/lib/types";

/*
  Moderazione commenti (sezione 5 del brief): blocklist locale, poi una
  chiamata AI in versione solo moderazione a temperatura 0. Se rifiutato,
  messaggio leggero e nessun salvataggio.
*/

const STANCE_VALIDE = new Set(["confermo", "contesto"]);

function rifiutato(messaggio: string): NextResponse<RispostaCommento> {
  return NextResponse.json({ stato: "rifiutato", messaggio });
}

function errore(
  messaggio: string,
  status: number
): NextResponse<RispostaCommento> {
  return NextResponse.json({ stato: "errore", messaggio }, { status });
}

export async function POST(req: NextRequest) {
  let body: {
    phrase_id?: unknown;
    nickname?: unknown;
    body?: unknown;
    stance?: unknown;
    sito_web?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return errore("Richiesta non valida.", 400);
  }

  if (honeypotCompilato(body.sito_web)) {
    return rifiutato(MESSAGGIO_RIFIUTO_COMMENTO);
  }

  const phraseId = typeof body.phrase_id === "string" ? body.phrase_id : "";
  const nickname =
    typeof body.nickname === "string"
      ? body.nickname.replace(/\s+/g, " ").trim()
      : "";
  const testo =
    typeof body.body === "string" ? body.body.replace(/\s+/g, " ").trim() : "";
  const stance =
    typeof body.stance === "string" && STANCE_VALIDE.has(body.stance)
      ? (body.stance as "confermo" | "contesto")
      : null;

  if (!phraseId || nickname.length < 2 || nickname.length > 20) {
    return errore("Serve un nickname tra 2 e 20 caratteri.", 400);
  }
  if (testo.length < 2 || testo.length > 280) {
    return errore("Il commento deve avere tra 2 e 280 caratteri.", 400);
  }
  if (nickname.toLowerCase() === "il gayometro") {
    return errore("Quel nickname è del titolare. Scegline un altro.", 400);
  }

  try {
    if (!(await azioneConsentita(req, "commento"))) {
      return errore(
        "Troppi commenti in un'ora: il dibattimento riprende più tardi.",
        429
      );
    }

    /* La frase deve esistere e non essere stata moderata via dashboard */
    const { data: frase, error: erroreFrase } = await getDb()
      .from("phrases")
      .select("id, flagged")
      .eq("id", phraseId)
      .maybeSingle();
    if (erroreFrase) throw erroreFrase;
    if (!frase || frase.flagged) {
      return errore("Questa frase non accetta commenti.", 404);
    }

    /* Blocklist locale su nickname e testo, senza chiamata AI */
    if (
      bloccataDaBlocklist(normalizzaFrase(`${nickname} ${testo}`))
    ) {
      return rifiutato(MESSAGGIO_RIFIUTO_COMMENTO);
    }

    /* Moderazione AI: nickname e testo insieme, cosi' giudica tutto */
    const esito = await moderaCommento(`${nickname}: ${testo}`);
    if (!esito.allowed) {
      return rifiutato(
        esito.reason
          ? `${MESSAGGIO_RIFIUTO_COMMENTO} (${esito.reason})`
          : MESSAGGIO_RIFIUTO_COMMENTO
      );
    }

    const { data: commento, error: erroreInsert } = await getDb()
      .from("comments")
      .insert({ phrase_id: phraseId, nickname, body: testo, stance })
      .select()
      .single();
    if (erroreInsert) throw erroreInsert;

    return NextResponse.json({
      stato: "ok",
      commento: commento as CommentoRow,
    } satisfies RispostaCommento);
  } catch (err) {
    if (err instanceof ErroreMotoreAI) {
      console.error("moderazione AI in errore", err.message);
      return errore("Il Gayometro si è surriscaldato, riprova tra poco.", 503);
    }
    console.error("commento fallito", err);
    return errore("Il Gayometro si è surriscaldato, riprova tra poco.", 500);
  }
}
