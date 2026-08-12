import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { domandaPerId } from "@/lib/quiz-questions";
import { fasciaPerScore } from "@/lib/quiz-bands";
import { azioneConsentita } from "@/lib/rate-limit";
import type { RispostaQuiz } from "@/lib/types";

/*
  Punteggio calcolato SOLO lato server (sezione 6.1 del brief): il client
  invia gli id delle domande servite e delle opzioni scelte, il server
  valida che siano 15 domande esistenti e distinte con opzioni valide e
  ricalcola i pesi dai dati propri, mai da valori inviati dal client.
*/

const DOMANDE_RICHIESTE = 15;

function errore(messaggio: string, status: number): NextResponse<RispostaQuiz> {
  return NextResponse.json({ stato: "errore", messaggio }, { status });
}

/* Hash deterministico delle risposte, per la falsa precisione */
function hashRisposte(risposte: Array<{ domanda: string; opzione: string }>) {
  const testo = risposte
    .map((r) => `${r.domanda}:${r.opzione}`)
    .sort()
    .join("|");
  let h = 5381;
  for (let i = 0; i < testo.length; i++) {
    h = (h * 33) ^ testo.charCodeAt(i);
  }
  return h >>> 0;
}

export async function POST(req: NextRequest) {
  let body: { risposte?: unknown };
  try {
    body = await req.json();
  } catch {
    return errore("Richiesta non valida.", 400);
  }

  if (!Array.isArray(body.risposte) || body.risposte.length !== DOMANDE_RICHIESTE) {
    return errore("Servono esattamente 15 risposte.", 400);
  }

  const risposte: Array<{ domanda: string; opzione: string }> = [];
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

  /* Ricalcolo dei pesi dai dati lato server */
  let somma = 0;
  let minimo = 0;
  let massimo = 0;
  for (const r of risposte) {
    const domanda = domandaPerId(r.domanda);
    if (!domanda) return errore("Domanda sconosciuta.", 400);
    const opzione = domanda.opzioni.find((o) => o.id === r.opzione);
    if (!opzione) return errore("Opzione non valida.", 400);
    const pesi = domanda.opzioni.map((o) => o.peso);
    somma += opzione.peso;
    minimo += Math.min(...pesi);
    massimo += Math.max(...pesi);
  }

  let score =
    massimo === minimo
      ? 50
      : Math.round(((somma - minimo) / (massimo - minimo)) * 100);

  /* Falsa precisione: mai numeri tondi. 67%, non 70%. */
  if (score % 5 === 0) {
    const h = hashRisposte(risposte);
    const scarto = 1 + (h % 4);
    score += (h >> 3) % 2 === 0 ? -scarto : scarto;
    score = Math.max(1, Math.min(99, score));
    if (score % 5 === 0) score += 1;
  }

  try {
    if (!(await azioneConsentita(req, "quiz"))) {
      return errore(
        "Troppi quiz in un'ora: anche l'autoanalisi ha bisogno di pause.",
        429
      );
    }

    const fascia = fasciaPerScore(score);
    const { data, error } = await getDb()
      .from("quiz_sessions")
      .insert({ score, band_title: fascia.titolo })
      .select("id")
      .single();
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
