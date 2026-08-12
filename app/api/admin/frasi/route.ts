import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { cookieAdminValido, COOKIE_ADMIN } from "@/lib/admin";
import { valutaFrase, ErroreMotoreAI } from "@/lib/ai";
import { possibileNomeProprio } from "@/lib/moderation";
import type { FraseRow } from "@/lib/types";

/*
  Azioni del pannello admin sulle frasi. Per chi non ha il cookie la
  route risponde 404, come se non esistesse.
*/

type Esito = { stato: "ok" } | { stato: "errore"; messaggio: string };

function errore(messaggio: string, status: number): NextResponse<Esito> {
  return NextResponse.json({ stato: "errore", messaggio }, { status });
}

export async function POST(req: NextRequest) {
  if (!cookieAdminValido(req.cookies.get(COOKIE_ADMIN)?.value)) {
    return new NextResponse(null, { status: 404 });
  }

  let body: { id?: unknown; azione?: unknown; percent?: unknown };
  try {
    body = await req.json();
  } catch {
    return errore("Richiesta non valida.", 400);
  }

  const id = typeof body.id === "string" ? body.id : "";
  const azione = typeof body.azione === "string" ? body.azione : "";
  if (!id) return errore("Manca l'id della frase.", 400);

  try {
    const db = getDb();

    if (azione === "flag" || azione === "unflag") {
      const { error } = await db
        .from("phrases")
        .update({ flagged: azione === "flag" })
        .eq("id", id);
      if (error) throw error;
      return NextResponse.json({ stato: "ok" } satisfies Esito);
    }

    if (azione === "elimina") {
      const { error } = await db.from("phrases").delete().eq("id", id);
      if (error) throw error;
      return NextResponse.json({ stato: "ok" } satisfies Esito);
    }

    if (azione === "percent") {
      const percent =
        typeof body.percent === "number" ? Math.round(body.percent) : NaN;
      if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
        return errore("La percentuale deve stare tra 0 e 100.", 400);
      }
      const { error } = await db
        .from("phrases")
        .update({ percent })
        .eq("id", id);
      if (error) throw error;
      return NextResponse.json({ stato: "ok" } satisfies Esito);
    }

    if (azione === "rivaluta") {
      const { data, error } = await db
        .from("phrases")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      const frase = data as FraseRow | null;
      if (!frase) return errore("Frase non trovata.", 404);

      const esito = await valutaFrase(frase.original, {
        sospettoNomeProprio: possibileNomeProprio(frase.original),
      });
      if (!esito.allowed) {
        return errore(
          `Col prompt attuale l'AI la rifiuterebbe: "${esito.rejection_message}". Valuta flag o eliminazione.`,
          409
        );
      }

      const { error: errAggiorna } = await db
        .from("phrases")
        .update({
          percent: esito.percent,
          verdict: esito.verdict,
          motivation: esito.motivation,
        })
        .eq("id", id);
      if (errAggiorna) throw errAggiorna;

      /* Aggiorna anche il commento ufficiale del Gayometro nel thread */
      const { error: errCommento } = await db
        .from("comments")
        .update({ body: esito.motivation })
        .eq("phrase_id", id)
        .eq("is_ai", true);
      if (errCommento) console.error("commento AI non aggiornato", errCommento);

      return NextResponse.json({ stato: "ok" } satisfies Esito);
    }

    return errore("Azione sconosciuta.", 400);
  } catch (err) {
    if (err instanceof ErroreMotoreAI) {
      return errore(`Motore AI in errore: ${err.message}`, 503);
    }
    console.error("azione admin frasi fallita", err);
    return errore("Operazione fallita, guarda i log.", 500);
  }
}
