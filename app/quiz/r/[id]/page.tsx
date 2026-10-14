import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResultReveal from "@/components/ResultReveal";
import { getDb } from "@/lib/db";
import { righePerScore } from "@/lib/quiz-bands";
import { idSfidaValido } from "@/lib/quiz-sfida";
import type { QuizSessionRow } from "@/lib/types";

export const dynamic = "force-dynamic";

/*
  Pagina risultato pubblica e condivisibile: chi riceve il link vede il
  punteggio dell'amico e il bottone per batterlo. Con ?sfida=ID mostra
  anche il duello tra i due risultati. Questo e' il motore virale del
  sito (sezione 6.2 del brief).
*/

async function caricaSessione(id: string): Promise<QuizSessionRow | null> {
  if (!idSfidaValido(id)) return null;
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
    description: `Il Gayometro ha emesso il verdetto: ${sessione.score}%. Batti il mio risultato, se hai il coraggio.`,
    openGraph: {
      title: titolo,
      description: `Batti il mio ${sessione.score}%. Venti domande, verdetto inappellabile.`,
      images: [`/api/og/quiz/${id}`],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function PaginaRisultato({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sfida?: string }>;
}) {
  const { id } = await params;
  const { sfida } = await searchParams;
  const sessione = await caricaSessione(id);
  if (!sessione) notFound();

  const rivale =
    idSfidaValido(sfida) && sfida !== id ? await caricaSessione(sfida) : null;

  return (
    <ResultReveal
      id={sessione.id}
      score={sessione.score}
      titolo={sessione.band_title}
      righe={righePerScore(sessione.score)}
      battute={sessione.highlights ?? []}
      rivale={
        rivale
          ? { id: rivale.id, score: rivale.score, titolo: rivale.band_title }
          : null
      }
    />
  );
}
