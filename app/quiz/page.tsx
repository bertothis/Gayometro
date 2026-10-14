import type { Metadata } from "next";
import Link from "next/link";
import { Boccale, Fiamma, Stellina } from "@/components/pixel/doodles";

export const metadata: Metadata = {
  title: "Quiz: quanto sei gay?",
  description:
    "Venti domande ironiche, un algoritmo spietato, una percentuale definitiva. Il quiz del Gayometro.",
};

export default function IntroQuiz() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <header className="flex flex-col gap-4 text-center">
        <p className="pixel-label text-xs uppercase text-rust">
          Autoanalisi certificata
        </p>
        <h1 className="font-display text-5xl font-black tracking-tight">
          Quanto sei <em className="text-rust">gay</em>?
        </h1>
        <p className="text-lg">
          Venti domande pescate a caso da un archivio scientificamente
          discutibile. Alla fine: percentuale esatta, fascia di appartenenza e
          immagine da sventolare nel gruppo.
        </p>
      </header>

      <section className="card flex flex-col gap-3 px-6 py-6">
        <h2 className="font-display text-2xl font-black">Le regole</h2>
        <ul className="flex flex-col gap-2">
          <li>1. Rispondi d&rsquo;istinto: la lancetta sente le esitazioni.</li>
          <li>2. Non esistono risposte giuste, solo risposte definitive.</li>
          <li>
            3. Il risultato è inappellabile e condivisibile: scegli tu se è una
            minaccia o una promessa.
          </li>
          <li>
            4. È tutta satira: misuriamo l&rsquo;assurdità di misurare, non le
            persone.
          </li>
        </ul>
      </section>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 text-ink/80">
          <Boccale className="w-8" />
          <Stellina className="w-5 text-rust" />
          <Fiamma className="w-7" />
        </div>
        <Link href="/quiz/gioca" className="btn text-base">
          Inizia il quiz
        </Link>
        <p className="text-xs text-ink/60">
          Gratis, anonimo, venti domande. Nessuna registrazione.
        </p>
      </div>
    </div>
  );
}
