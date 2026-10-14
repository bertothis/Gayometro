import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { fasciaPerScore } from "@/lib/quiz-bands";
import { calcolaEsito, type RispostaData } from "@/lib/quiz-scoring";
import { azioneConsentita } from "@/lib/rate-limit";
import type { RispostaQuiz } from "@/lib/types";

/*
  Punteggio calcolato SOLO lato server (sezione 6.1 del brief): il client
  invia gli id delle domande servite e delle opzioni scelte, il server
  valida che siano 20 domande esistenti e distinte con opzioni valide e
  ricalcola pesi, calibrazione e battute dai dati propri, mai da valori
  inviati dal client (vedi lib/quiz-scoring.ts).
*/

const DOMANDE_RICHIESTE = 20;

function errore(messaggio: string, status: number): NextResponse<RispostaQuiz> {
  return NextResponse.json({ stato: "errore", messaggio }, { status });
}

/* Colonna inesistente: il database non ha ancora l'aggiornamento
   highlights (supabase/aggiornamenti), il quiz funziona lo stesso.
   Postgres risponde 42703, PostgREST (Supabase) PGRST204. */
function colonnaMancante(err: { code?: string; message?: string } | null) {
  return (
    err !== null &&
    (err.code === "42703" ||
      err.code === "PGRST204" ||
      /highlights/.test(err.message ?? ""))
  );
}

export async function POST(req: NextRequest) {
  let body: { risposte?: unknown };
  try {
    body = await req.json();
  } catch {
    return errore("Richiesta non valida.", 400);
  }

  if (!Array.isArray(body.risposte) || body.risposte.length !== DOMANDE_RICHIESTE) {
    return errore(`Servono esattamente ${DOMANDE_RICHIESTE} risposte.`, 400);
  }

  const risposte: RispostaData[] = [];
  const visti = new Set<string>();
  for (const voce of body.risposte) {
    if (
      typeof voce !== "object" ||
      voce === null ||
      typeof (voce as Record<string, unknown>).domanda !== "string" ||
      typeof (voce as Record<string, unknown>).opzione !== "string"
    ) {
      return errore("Formato delle risposte non valido.", 400);
    }
    const domanda = (voce as Record<string, string>).domanda;
    const opzione = (voce as Record<string, string>).opzione;
    if (visti.has(domanda)) {
      return errore("Domande duplicate nelle risposte.", 400);
    }
    visti.add(domanda);
    risposte.push({ domanda, opzione });
  }

  const esito = calcolaEsito(risposte);
  if (!esito) return errore("Domanda o opzione non valida.", 400);

  try {
    if (!(await azioneConsentita(req, "quiz"))) {
      return errore(
        "Troppi quiz in un'ora: anche l'autoanalisi ha bisogno di pause.",
        429
      );
    }

    const fascia = fasciaPerScore(esito.score);
    const db = getDb();
    let { data, error } = await db
      .from("quiz_sessions")
      .insert({
        score: esito.score,
        band_title: fascia.titolo,
        highlights: esito.battute,
      })
      .select("id")
      .single();

    if (colonnaMancante(error)) {
      ({ data, error } = await db
        .from("quiz_sessions")
        .insert({ score: esito.score, band_title: fascia.titolo })
        .select("id")
        .single());
    }
    if (error) throw error;

    return NextResponse.json({
      stato: "ok",
      id: (data as { id: string }).id,
    } satisfies RispostaQuiz);
  } catch (err) {
    console.error("salvataggio quiz fallito", err);
    return errore("Il Gayometro si è surriscaldato, riprova tra poco.", 500);
  }
}
