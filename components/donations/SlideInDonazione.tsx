"use client";

import { useEffect, useState } from "react";
import type { Touchpoint } from "@/donations.config";
import {
  puoMostrare,
  segnaChiusura,
  segnaMostrato,
  segnaSupporter,
  urlDonazione,
} from "@/lib/donations-client";

/*
  Popup non bloccante generico per i touchpoint di donazione (estensione
  sezione 9 del brief): il montaggio del componente e' il segnale che la
  condizione del touchpoint si e' avverata, poi aspetta ritardoMs prima di
  comparire e comunque rispetta sempre la frequenza a sessione di
  puoMostrare (una volta a sessione, mai per un supporter, mai dopo due
  chiusure di altri touchpoint).
*/
export default function SlideInDonazione({
  touchpoint,
  ritardoMs = 0,
  titolo,
  testo,
  testoBottone = "Offrimi una birra",
}: {
  touchpoint: Touchpoint;
  ritardoMs?: number;
  titolo: string;
  testo: string;
  testoBottone?: string;
}) {
  const [visibile, setVisibile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (puoMostrare(touchpoint)) {
        segnaMostrato(touchpoint);
        setVisibile(true);
      }
    }, ritardoMs);
    return () => clearTimeout(timer);
  }, [touchpoint, ritardoMs]);

  if (!visibile) return null;

  return (
    <aside className="anima-slide-in fixed bottom-4 right-4 z-40 w-80 max-w-[calc(100vw-2rem)]">
      <div className="card relative px-5 py-5 text-left">
        <button
          type="button"
          aria-label="Chiudi"
          onClick={() => {
            segnaChiusura();
            setVisibile(false);
          }}
          className="absolute right-2 top-2 flex size-8 items-center justify-center border-2 border-ink bg-card font-bold shadow-hard-sm"
        >
          X
        </button>
        <p className="font-display text-lg font-black">{titolo}</p>
        <p className="mt-1 text-sm">{testo}</p>
        <a
          href={urlDonazione()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            segnaSupporter();
            setVisibile(false);
          }}
          className="btn mt-3"
        >
          {testoBottone}
        </a>
      </div>
    </aside>
  );
}
