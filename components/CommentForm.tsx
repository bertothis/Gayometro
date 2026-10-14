"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { RispostaCommento } from "@/lib/types";

type Stance = "confermo" | "contesto" | null;

export default function CommentForm({ phraseId }: { phraseId: string }) {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [testo, setTesto] = useState("");
  const [stance, setStance] = useState<Stance>(null);
  const [inInvio, setInInvio] = useState(false);
  const [messaggio, setMessaggio] = useState<string | null>(null);

  async function invia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inInvio) return;
    const honeypot = new FormData(e.currentTarget).get("sito_web");
    setInInvio(true);
    setMessaggio(null);

    try {
      const risposta = await fetch("/api/commenti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phrase_id: phraseId,
          nickname,
          body: testo,
          stance,
          sito_web: honeypot,
        }),
      });
      const dati = (await risposta.json()) as RispostaCommento;

      if (dati.stato === "ok") {
        setTesto("");
        setStance(null);
        router.refresh();
      } else {
        setMessaggio(dati.messaggio);
      }
    } catch {
      setMessaggio("Il Gayometro si è surriscaldato, riprova tra poco.");
    } finally {
      setInInvio(false);
    }
  }

  function bottoneStance(valore: Exclude<Stance, null>, etichetta: string) {
    const attivo = stance === valore;
    return (
      <button
        type="button"
        onClick={() => setStance(attivo ? null : valore)}
        aria-pressed={attivo}
        className={`rounded-full border-2 border-ink px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
          attivo
            ? valore === "confermo"
              ? "bg-lime"
              : "bg-rust text-paper"
            : "bg-card"
        }`}
      >
        {etichetta}
      </button>
    );
  }

  return (
    <form onSubmit={invia} className="card flex flex-col gap-3 px-5 py-5">
      <p className="font-display text-xl font-black">Controbatti o rincara</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={20}
          minLength={2}
          required
          placeholder="Il tuo nickname"
          className="input-brut sm:max-w-52"
          disabled={inInvio}
        />
        <div className="flex items-center gap-2">
          {bottoneStance("confermo", "Confermo")}
          {bottoneStance("contesto", "Contesto")}
        </div>
      </div>
      <textarea
        value={testo}
        onChange={(e) => setTesto(e.target.value)}
        maxLength={280}
        minLength={2}
        required
        rows={3}
        placeholder="La tua perizia tecnica, massimo 280 caratteri"
        className="input-brut resize-none"
        disabled={inInvio}
      />
      {/* Honeypot anti bot */}
      <input
        type="text"
        name="sito_web"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-ink/60">{testo.length}/280</p>
        <button type="submit" className="btn" disabled={inInvio}>
          {inInvio ? "Deposito agli atti..." : "Pubblica"}
        </button>
      </div>
      {messaggio && <p className="text-sm font-bold text-rust">{messaggio}</p>}
    </form>
  );
}
