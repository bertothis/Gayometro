import type { Metadata } from "next";
import Link from "next/link";
import QuizPlayer from "@/components/QuizPlayer";
import { pescaDomande } from "@/lib/quiz-questions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Quiz in corso",
  description: "Quindici domande, una lancetta, nessuna via di fuga.",
};

/*
  Unico punto di ingresso del quiz, controllato dalla feature flag
  QUIZ_GATE (sezione 9.3 del brief). Default off: si gioca subito.
  Se un domani passa a on, qui apparira' la pagina di sblocco.
*/
export default function Gioca() {
  if (process.env.QUIZ_GATE === "on") {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <h1 className="font-display text-4xl font-black">Accesso riservato</h1>
        <p>
          Il quiz è momentaneamente dietro una porta chiusa. Lo sblocco arriva
          a breve: torna tra poco.
        </p>
        <Link href="/quiz" className="btn">
          Torna all&rsquo;ingresso
        </Link>
      </div>
    );
  }

  /* Le 15 domande sono pescate lato server, senza pesi */
  return <QuizPlayer domande={pescaDomande(15)} />;
}
