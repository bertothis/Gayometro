"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Gauge from "@/components/Gauge";
import SlideInDonazione from "@/components/donations/SlideInDonazione";
import { incrementaValutazioni } from "@/lib/donations-client";
import { SLUG_FRASE_DONAZIONI } from "@/lib/frase-donazioni";
import type { RispostaValuta } from "@/lib/types";

type Fase =
  | { tipo: "attesa" }
  | { tipo: "invio" }
  | { tipo: "risultato"; frase: Extract<RispostaValuta, { stato: "ok" }>["frase"] }
  | { tipo: "rifiuto"; messaggio: string }
  | { tipo: "errore"; messaggio: string };

function preferisceMenoMovimento(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function GayometroForm() {
  const [testo, setTesto] = useState("");
  const [fase, setFase] = useState<Fase>({ tipo: "attesa" });
  const [percentAnimato, setPercentAnimato] = useState(0);
  const [popupDue, setPopupDue] = useState(false);
  const [popupGotcha, setPopupGotcha] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  /* Conteggio della lancetta: parte da zero e frena sul verdetto */
  function animaVerso(target: number) {
    cancelAnimationFrame(rafRef.current);
    if (preferisceMenoMovimento()) {
      setPercentAnimato(target);
      return;
    }
    const durata = 1400;
    const inizio = performance.now();
    const passo = (adesso: number) => {
      const t = Math.min(1, (adesso - inizio) / durata);
      const eased = 1 - Math.pow(1 - t, 3);
      setPercentAnimato(Math.round(target * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(passo);
    };
    rafRef.current = requestAnimationFrame(passo);
  }

  async function invia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (fase.tipo === "invio") return;
    const honeypot = new FormData(e.currentTarget).get("sito_web");
    setFase({ tipo: "invio" });
    setPercentAnimato(0);

    try {
      const risposta = await fetch("/api/valuta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frase: testo, sito_web: honeypot }),
      });
      const dati = (await risposta.json()) as RispostaValuta;

      if (dati.stato === "ok") {
        setFase({ tipo: "risultato", frase: dati.frase });
        animaVerso(dati.frase.percent);
        const conteggio = incrementaValutazioni();
        /* Le due popup non devono mai sovrapporsi sulla stessa misurazione */
        if (dati.frase.slug === SLUG_FRASE_DONAZIONI) {
          setPopupGotcha(true);
        } else if (conteggio >= 2) {
          setPopupDue(true);
        }
      } else if (dati.stato === "rifiutata") {
        setFase({ tipo: "rifiuto", messaggio: dati.messaggio });
      } else {
        setFase({ tipo: "errore", messaggio: dati.messaggio });
      }
    } catch {
      setFase({
        tipo: "errore",
        messaggio: "Il Gayometro si è surriscaldato, riprova tra poco.",
      });
    }
  }

  function ricomincia() {
    setTesto("");
    setFase({ tipo: "attesa" });
    setPercentAnimato(0);
  }

  const testoWhatsApp =
    fase.tipo === "risultato"
      ? encodeURIComponent(
          `"${fase.frase.original}" è gay al ${fase.frase.percent}%. Verdetto del Gayometro: ${fase.frase.verdict}. ${
            typeof window !== "undefined"
              ? `${window.location.origin}/frase/${fase.frase.slug}`
              : ""
          }`
        )
      : "";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={invia} className="flex flex-col gap-3">
        <label htmlFor="frase" className="font-bold uppercase tracking-wider text-sm">
          Cosa misuriamo oggi?
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="frase"
            name="frase"
            type="text"
            value={testo}
            onChange={(e) => setTesto(e.target.value)}
            minLength={3}
            maxLength={120}
            required
            placeholder="bere la birra al limone"
            className="input-brut flex-1"
            disabled={fase.tipo === "invio"}
          />
          {/* Honeypot anti bot: un umano non lo vede e non lo compila */}
          <input
            type="text"
            name="sito_web"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <button type="submit" className="btn" disabled={fase.tipo === "invio"}>
            {fase.tipo === "invio" ? "Misurazione..." : "Misura"}
          </button>
        </div>
        <p className="text-xs text-ink/60">
          {testo.length}/120 caratteri. Comportamenti, oggetti e abitudini: mai
          persone reali.
        </p>
      </form>

      {fase.tipo === "invio" && (
        <div className="card flex flex-col items-center gap-3 px-6 py-8">
          <Gauge percent={50} className="w-48 animate-pulse motion-reduce:animate-none" />
          <p className="pixel-label text-sm">Strumenti in calibrazione...</p>
        </div>
      )}

      {fase.tipo === "risultato" && (
        <div className="card flex flex-col items-center gap-4 px-6 py-8 text-center">
          <p className="text-sm italic text-ink/70">
            &ldquo;{fase.frase.original}&rdquo;
          </p>
          <Gauge percent={percentAnimato} smooth={false} className="w-56 sm:w-64" />
          <p
            className={`pixel-label text-6xl font-bold ${
              fase.frase.percent >= 50 ? "text-rust" : "text-ink"
            }`}
            aria-live="polite"
          >
            {percentAnimato}%
          </p>
          <p className="font-display text-2xl font-black italic">
            {fase.frase.verdict}
          </p>
          <p className="max-w-prose">{fase.frase.motivation}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link href={`/frase/${fase.frase.slug}`} className="btn">
              Commenta il verdetto
            </Link>
            <a
              href={`https://wa.me/?text=${testoWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-paper"
            >
              Condividi su WhatsApp
            </a>
            <button type="button" onClick={ricomincia} className="btn btn-paper">
              Misura un&rsquo;altra
            </button>
          </div>
        </div>
      )}

      {fase.tipo === "rifiuto" && (
        <div className="card flex flex-col gap-2 border-rust px-6 py-6">
          <p className="font-display text-xl font-black">Verdetto non emesso</p>
          <p>{fase.messaggio}</p>
          <button type="button" onClick={ricomincia} className="btn mt-2 self-start">
            Riprova
          </button>
        </div>
      )}

      {fase.tipo === "errore" && (
        <div className="card flex flex-col gap-2 px-6 py-6">
          <p>{fase.messaggio}</p>
          <button type="button" onClick={ricomincia} className="btn mt-2 self-start">
            Riprova
          </button>
        </div>
      )}

      {popupDue && (
        <SlideInDonazione
          touchpoint="dopoDueValutazioni"
          ritardoMs={1500}
          titolo="Tu e il tuo bro, due misurazioni dopo"
          testo="Hai scoperto quanto tu e il tuo bro siete gay? Perfetto: se vuoi supportare questo progetto puoi farlo qui sotto. Dicono che chi non lo fa sia gay all’83%."
        />
      )}
      {popupGotcha && (
        <SlideInDonazione
          touchpoint="fraseSegreta"
          ritardoMs={3000}
          titolo="Visto? Forse non dovresti far parte di questo 83%"
          testo="Il Gayometro ha già la sentenza pronta per chi non contribuisce. Cambia statistica quando vuoi."
          testoBottone="Tirami fuori dall’83%"
        />
      )}
    </div>
  );
}
