import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { cookieAdminValido, COOKIE_ADMIN } from "@/lib/admin";

/*
  Azioni del pannello admin sui commenti. Per chi non ha il cookie la
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

  let body: { id?: unknown; azione?: unknown };
  try {
    body = await req.json();
  } catch {
    return errore("Richiesta non valida.", 400);
  }

  const id = typeof body.id === "string" ? body.id : "";
  const azione = typeof body.azione === "string" ? body.azione : "";
  if (!id) return errore("Manca l'id del commento.", 400);

  try {
    const db = getDb();

    if (azione === "flag" || azione === "unflag") {
      const { error } = await db
        .from("comments")
        .update({ flagged: azione === "flag" })
        .eq("id", id);
      if (error) throw error;
      return NextResponse.json({ stato: "ok" } satisfies Esito);
    }

    if (azione === "elimina") {
      const { error } = await db.from("comments").delete().eq("id", id);
      if (error) throw error;
      return NextResponse.json({ stato: "ok" } satisfies Esito);
    }

    return errore("Azione sconosciuta.", 400);
  } catch (err) {
    console.error("azione admin commenti fallita", err);
    return errore("Operazione fallita, guarda i log.", 500);
  }
}
