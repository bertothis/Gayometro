"use client";

import { segnaSupporter, urlDonazione } from "@/lib/donations-client";

/*
  Banner statico e non chiudibile (estensione sezione 9 del brief): a
  differenza dei popup non ha nessuna logica di frequenza, ne' si spegne
  per chi ha gia' donato. Sparisce solo senza un link di donazione
  configurato. Usato in home e a fine quiz, con copy diversa per contesto.
  urlDonazione() legge una env NEXT_PUBLIC_*, inlineata da Next.js allo
  stesso modo lato server e lato client: nessun rischio di hydration
  mismatch nel leggerla direttamente nel render.
*/
export default function BannerDonazione({
  titolo = "Il Gayometro vive di offerte, non di pubblicità",
  testo = "Nessun banner molesto, nessun tracciamento assurdo: solo un server che qualcuno deve pagare. Se una misurazione ti ha strappato una risata, contribuisci a mandare in rovina la reputazione di qualche altro comportamento innocente.",
  testoBottone = "Voglio che questo sito diventi famoso",
}: {
  titolo?: string;
  testo?: string;
  testoBottone?: string;
}) {
  const url = urlDonazione();
  if (!url) return null;

  return (
    <section className="card flex flex-col gap-4 bg-sage px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-display text-2xl font-black">{titolo}</h2>
        <p className="mt-1 max-w-prose">{testo}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={segnaSupporter}
        className="btn btn-paper shrink-0 self-start text-base sm:self-center"
      >
        {testoBottone}
      </a>
    </section>
  );
}
