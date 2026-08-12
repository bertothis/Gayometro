"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { DomandaServita } from "@/lib/quiz-questions";
import type { RispostaQuiz } from "@/lib/types";
import {
  puoMostrare,
  segnaChiusura,
  segnaMostrato,
  segnaSupporter,
  urlDonazione,
} from "@/lib/donations-client";

type Risposta = { domanda: string; opzione: string };
type Stato = "gioco" | "interstitial" | "calcolo" | "errore";

export default function QuizPlayer({
  domande,
}: {
  domande: DomandaServita[];
}) {
  const router = useRouter();
  const [indice, setIndice] = useState(0);
  const [risposte, setRisposte] = useState<Risposta[]>([]);
  const [stato, setStato] = useState<Stato>("gioco");
  const richiestaRef = useRef<Promise<string> | null>(null);

  /* Il POST parte subito dopo l'ultima risposta: mentre l'utente guarda
     l'interstitial il punteggio e' gia' in viaggio */
  function avviaCalcolo(tutte: Risposta[]) {
    richiestaRef.current = fetch("/api/quiz/risultato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ risposte: tutte }),
    })
      .then(async (r) => {
        const dati = (await r.json()) as RispostaQuiz;
        if (dati.stato !== "ok") throw new Error(dati.messaggio);
        return dati.id;
      });
  }

  async function vaiAlRisultato() {
    setStato("calcolo");
    try {
      const id = await richiestaRef.current;
      if (!id) throw new Error("risultato mancante");
      router.push(`/quiz/r/${id}`);
    } catch {
      setStato("errore");
    }
  }

  function rispondi(opzioneId: string) {
    if (stato !== "gioco") return;
    const nuova = [...risposte, { domanda: domande[indice].id, opzione: opzioneId }];
    setRisposte(nuova);

    if (indice + 1 < domande.length) {
      setIndice(indice + 1);
      return;
    }

    avviaCalcolo(nuova);
    if (puoMostrare("interstitial")) {
      segnaMostrato("interstitial");
      setStato("interstitial");
    } else {
      void vaiAlRisultato();
    }
  }

  function riprova() {
    avviaCalcolo(risposte);
    void vaiAlRisultato();
  }

  if (stato === "interstitial") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-paper p-4">
        <div className="card flex w-full max-w-md flex-col items-center gap-5 px-6 py-10 text-center">
          <p className="pixel-label text-xs uppercase text-rust">
            Elaborazione completata
          </p>
          <h2 className="font-display text-3xl font-black">
            Il verdetto è pronto.
          </h2>
          <p>
            Il Gayometro nel frattempo accetta birre: tengono la lancetta
            lubrificata e il sito gratuito.
          </p>
          {/* Due bottoni di PARI evidenza, proseguo cliccabile subito:
              niente countdown, niente dark pattern */}
          <div className="flex w-full flex-col gap-3">
            <a
              href={urlDonazione()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => segnaSupporter()}
              className="btn w-full"
            >
              Offrimi una birra
            </a>
            <button
              type="button"
              onClick={() => {
                segnaChiusura();
                void vaiAlRisultato();
              }}
              className="btn btn-paper w-full"
            >
              Vai al risultato
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stato === "calcolo") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <p className="pixel-label animate-pulse text-lg motion-reduce:animate-none">
          Calcolo in corso...
        </p>
        <p className="text-sm text-ink/70">
          L&rsquo;algoritmo sta pesando le tue risposte con la bilancia di
          precisione.
        </p>
      </div>
    );
  }

  if (stato === "errore") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <p className="font-display text-2xl font-black">
          Il Gayometro si è surriscaldato
        </p>
        <p>Il risultato non è arrivato. Le tue risposte però sono salve: riprova.</p>
        <button type="button" onClick={riprova} className="btn">
          Riprova il calcolo
        </button>
      </div>
    );
  }

  const domanda = domande[indice];

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="pixel-label text-sm">
            domanda {indice + 1} di {domande.length}
          </p>
          <p className="pixel-label text-sm text-ink/60">
            {Math.round((indice / domande.length) * 100)}%
          </p>
        </div>
        {/* Barra di avanzamento a blocchi pixel */}
        <div
          className="flex gap-1"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={domande.length}
          aria-valuenow={indice}
          aria-label="Avanzamento del quiz"
        >
          {domande.map((_, i) => (
            <div
              key={i}
              className={`h-3 flex-1 border-2 border-ink ${
                i < indice ? "bg-lime" : "bg-card"
              }`}
            />
          ))}
        </div>
      </div>

      <h1 className="font-display text-3xl font-black leading-tight sm:text-4xl">
        {domanda.testo}
      </h1>

      <div className="flex flex-col gap-3">
        {domanda.opzioni.map((opzione) => (
          <button
            key={opzione.id}
            type="button"
            onClick={() => rispondi(opzione.id)}
            className="card px-5 py-4 text-left text-lg transition-transform duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-lime hover:shadow-hard-sm motion-reduce:transition-none"
          >
            {opzione.testo}
          </button>
        ))}
      </div>
    </div>
  );
}
