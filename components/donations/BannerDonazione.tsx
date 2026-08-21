"use client";

import { useEffect, useRef, useState } from "react";
import {
  donazioniAttive,
  segnaSupporter,
  urlDonazione,
} from "@/lib/donations-client";

/*
  Banner statico e non chiudibile (estensione sezione 9 del brief): a
  differenza degli slide-in non ha logica di frequenza a sessione, sparisce
  solo se manca il link di donazione o l'utente e' gia' segnato come
  supporter. Usato in home e a fine quiz, con copy diversa per contesto.
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
  const [attiva, setAttiva] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(() => setAttiva(donazioniAttive()));
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (!attiva) return null;

  return (
    <section className="card flex flex-col gap-4 bg-sage px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-display text-2xl font-black">{titolo}</h2>
        <p className="mt-1 max-w-prose">{testo}</p>
      </div>
      <a
        href={urlDonazione()}
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
