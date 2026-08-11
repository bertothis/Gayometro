import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

/*
  Route anti letargo: il piano free di Supabase mette in pausa i progetti
  dopo 7 giorni di bassa attivita'. Una GitHub Action schedulata chiama
  questa route una volta al giorno (vedi .github/workflows/keep-alive.yml).
*/
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { error } = await getDb().from("phrases").select("id").limit(1);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("keep-alive fallito", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
