"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BannerDonazione from "@/components/donations/BannerDonazione";
import {
  puoMostrare,
  segnaChiusura,
  segnaMostrato,
  segnaSupporter,
  urlDonazione,
} from "@/lib/donations-client";
import {
  battutaDuello,
  percentualeConArticolo,
  provocazione,
  provocazioneDuello,
} from "@/lib/quiz-sfida";

/*
  Animazione risultato (sezione 6.2 del brief): la barra parte lenta e
  accelera in modo brutale fino al punteggio, easing da partenza di
  Formula 1, poi la percentuale sbatte in scena con l'ombra dura.
  Con prefers-reduced-motion si va dritti al risultato.
*/

function preferisceMenoMovimento(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function ResultReveal({
  id,
  score,
  titolo,
  righe,
  battute,
  rivale,
}: {
  id: string;
  score: number;
  titolo: string;
  righe: string[];
  /* Battute sulle risposte date dal giocatore (vuote per i quiz vecchi) */
  battute: string[];
  /* Risultato dell'amico da battere, se si arriva da una sfida */
  rivale: { id: string; score: number; titolo: string } | null;
}) {
  const [barra, setBarra] = useState(0);
  const [svelato, setSvelato] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const [modaleDownload, setModaleDownload] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (preferisceMenoMovimento()) {
      rafRef.current = requestAnimationFrame(() => {
        setBarra(score);
        setSvelato(true);
      });
      return () => cancelAnimationFrame(rafRef.current);
    }
    const durata = 1800;
    const inizio = performance.now();
    const passo = (adesso: number) => {
      const t = Math.min(1, (adesso - inizio) / durata);
      const eased = t * t * t; // partenza lenta, accelerazione brutale
      setBarra(score * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(passo);
      } else {
        setSvelato(true);
      }
    };
    rafRef.current = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(rafRef.current);
  }, [score]);

  /* Slide-in donazione: 10 secondi dopo che il risultato e' visibile */
  useEffect(() => {
    if (!svelato) return;
    const timer = setTimeout(() => {
      if (puoMostrare("slideIn")) {
        segnaMostrato("slideIn");
        setSlideIn(true);
      }
    }, 10_000);
    return () => clearTimeout(timer);
  }, [svelato]);

  async function scaricaImmagine() {
    try {
      const risposta = await fetch(`/api/og/quiz/${id}`);
      if (!risposta.ok) throw new Error("immagine non disponibile");
      const blob = await risposta.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `gayometro-quiz-${score}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      /* Modale post download: a download gia' avviato */
      if (puoMostrare("postDownload")) {
        segnaMostrato("postDownload");
        setModaleDownload(true);
      }
    } catch {
      window.open(`/api/og/quiz/${id}`, "_blank");
    }
  }

  /* Il link condiviso porta alla pagina risultato: anteprima OG col punteggio
     e pulsante "Batti il mio X%" per chi lo riceve */
  const urlRisultato =
    typeof window !== "undefined"
      ? `${window.location.origin}/quiz/r/${id}`
      : "";
  const testoWhatsApp = encodeURIComponent(
    rivale
      ? provocazioneDuello(score, rivale.score, urlRisultato)
      : provocazione(score, titolo, urlRisultato)
  );

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
      <p className="pixel-label text-xs uppercase text-rust">
        Referto ufficiale
      </p>

      {/* Barra stile griglia di partenza */}
      <div className="w-full">
        <div className="h-10 w-full border-2 border-ink bg-card shadow-hard">
          <div
            className={`h-full ${score >= 50 ? "bg-rust" : "bg-lime"}`}
            style={{ width: `${barra}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-ink/50">
          <span className="pixel-label">0</span>
          <span className="pixel-label">100</span>
        </div>
      </div>

      {svelato && (
        <>
          <p
            className={`anima-slam pixel-label text-7xl font-bold sm:text-8xl ${
              score >= 50 ? "text-rust" : "text-ink"
            }`}
          >
            {score}%
          </p>
          <h1 className="font-display text-3xl font-black italic sm:text-4xl">
            {titolo}
          </h1>
          <ul className="flex flex-col gap-2 text-lg">
            {righe.map((riga, i) => (
              <li key={i}>{riga}</li>
            ))}
          </ul>

          {battute.length > 0 && (
            <div className="card w-full px-5 py-5 text-left">
              <p className="pixel-label text-xs uppercase text-rust">
                Le tue risposte parlano chiaro
              </p>
              <ul className="mt-2 flex flex-col gap-2">
                {battute.map((battuta, i) => (
                  <li key={i} className="italic">
                    {battuta}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {rivale && (
            <div className="card w-full px-5 py-6">
              <p className="pixel-label text-xs uppercase text-rust">
                Il duello
              </p>
              <div className="mt-3 flex items-end justify-center gap-6">
                <div className="flex flex-col items-center">
                  <span className="pixel-label text-5xl font-bold text-rust">
                    {score}%
                  </span>
                  <span className="text-sm font-bold uppercase">Tu</span>
                </div>
                <span className="pb-6 font-display text-2xl font-black italic">
                  contro
                </span>
                <div className="flex flex-col items-center">
                  <span className="pixel-label text-5xl font-bold text-ink">
                    {rivale.score}%
                  </span>
                  <span className="text-sm font-bold uppercase">Lui</span>
                </div>
              </div>
              <p className="mt-3 font-display text-xl font-black italic">
                {battutaDuello(score, rivale.score)}
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={scaricaImmagine} className="btn">
              Scarica immagine
            </button>
            <a
              href={`https://wa.me/?text=${testoWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-paper"
            >
              Condividi su WhatsApp
            </a>
          </div>

          <div className="card mt-4 flex w-full flex-col items-center gap-3 px-6 py-6">
            <p className="font-display text-xl font-black">
              Pensi di poter fare di più?
            </p>
            <p className="text-sm">
              Batti {percentualeConArticolo(score)} e dimostra che la lancetta ha torto. Chi lo
              riceve da te ha le stesse armi: scegli bene a chi mandarlo.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={`/quiz/gioca?sfida=${id}`} className="btn">
                Batti il mio {score}%
              </Link>
              <Link href="/" className="btn btn-paper">
                Vai al Gayometro
              </Link>
            </div>
          </div>

          <div className="w-full">
            <BannerDonazione
              titolo="Il verdetto ti ha segnato? Restituisci il favore"
              testo="Il quiz è gratis, il server no. Se il risultato meritava uno screenshot, merita anche un contributo."
            />
          </div>
        </>
      )}

      {/* Slide-in donazione: non bloccante, X ben visibile */}
      {slideIn && (
        <aside className="anima-slide-in fixed bottom-4 right-4 z-40 w-80 max-w-[calc(100vw-2rem)]">
          <div className="card relative px-5 py-5 text-left">
            <button
              type="button"
              aria-label="Chiudi"
              onClick={() => {
                segnaChiusura();
                setSlideIn(false);
              }}
              className="absolute right-2 top-2 flex size-8 items-center justify-center border-2 border-ink bg-card font-bold shadow-hard-sm"
            >
              X
            </button>
            <p className="font-display text-lg font-black">
              La lancetta gira a birra
            </p>
            <p className="mt-1 text-sm">
              Il Gayometro è gratis e senza pubblicità. Se ti ha fatto ridere,
              il creatore accetta volentieri una media.
            </p>
            <a
              href={urlDonazione()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                segnaSupporter();
                setSlideIn(false);
              }}
              className="btn mt-3"
            >
              Offrimi una birra
            </a>
          </div>
        </aside>
      )}

      {/* Modale post download */}
      {modaleDownload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="card flex w-full max-w-sm flex-col items-center gap-4 px-6 py-8">
            <p className="font-display text-2xl font-black">
              L&rsquo;immagine è tua, gratis.
            </p>
            <p>Se ti ha fatto ridere, una birra al creatore.</p>
            <a
              href={urlDonazione()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                segnaSupporter();
                setModaleDownload(false);
              }}
              className="btn w-full"
            >
              Offrimi una birra
            </a>
            <button
              type="button"
              onClick={() => {
                segnaChiusura();
                setModaleDownload(false);
              }}
              className="btn btn-paper w-full"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
