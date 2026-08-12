import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResultReveal from "@/components/ResultReveal";
import { getDb } from "@/lib/db";
import { fasciaPerScore } from "@/lib/quiz-bands";
import type { QuizSessionRow } from "@/lib/types";

export const dynamic = "force-dynamic";

/*
  Pagina risultato pubblica e condivisibile: chi riceve il link vede il
  punteggio dell'amico e il bottone per fare il quiz a sua volta.
  Questo e' il motore virale del sito (sezione 6.2 del brief).
*/

const FORMA_UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function caricaSessione(id: string): Promise<QuizSessionRow | null> {
  if (!FORMA_UUID.test(id)) return null;
  try {
    const { data, error } = await getDb()
      .from("quiz_sessions")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data as QuizSessionRow | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const sessione = await caricaSessione(id);
  if (!sessione) return { title: "Risultato non trovato" };
  const titolo = `Gay al ${sessione.score}%: ${sessione.band_title}`;
  return {
    title: titolo,
    description:
      "Risultato ufficiale del quiz del Gayometro. Fai il quiz anche tu e confronta la percentuale.",
    openGraph: {
      title: titolo,
      description: "Quindici domande, verdetto inappellabile.",
      images: [`/api/og/quiz/${id}`],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function PaginaRisultato({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sessione = await caricaSessione(id);
  if (!sessione) notFound();

  const fascia = fasciaPerScore(sessione.score);

  return (
    <ResultReveal
      id={sessione.id}
      score={sessione.score}
      titolo={sessione.band_title}
      righe={fascia.righe}
    />
  );
}
