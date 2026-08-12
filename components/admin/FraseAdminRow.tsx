"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FraseRow } from "@/lib/types";

/* Riga di una frase nel pannello admin, con tutti i comandi */
export default function FraseAdminRow({ frase }: { frase: FraseRow }) {
  const router = useRouter();
  const [percent, setPercent] = useState(String(frase.percent));
  const [inCorso, setInCorso] = useState(false);
  const [messaggio, setMessaggio] = useState<string | null>(null);

  async function esegui(azione: string, extra: Record<string, unknown> = {}) {
    if (inCorso) return;
    setInCorso(true);
    setMessaggio(null);
    try {
      const risposta = await fetch("/api/admin/frasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: frase.id, azione, ...extra }),
      });
      const dati = (await risposta.json()) as {
        stato: string;
        messaggio?: string;
      };
      if (dati.stato === "ok") {
        router.refresh();
      } else {
        setMessaggio(dati.messaggio ?? "Operazione fallita.");
      }
    } catch {
      setMessaggio("Operazione fallita, riprova.");
    } finally {
      setInCorso(false);
    }
  }

  return (
    <li
      className={`card flex flex-col gap-3 px-5 py-4 ${
        frase.flagged ? "opacity-60" : ""
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/frase/${frase.slug}`}
            className="font-bold underline-offset-4 hover:underline"
          >
            &ldquo;{frase.original}&rdquo;
          </Link>
          <p className="text-sm italic text-ink/70">
            {frase.verdict}
            {frase.flagged && (
              <span className="pixel-label ml-2 rounded-sm bg-rust px-1.5 py-0.5 text-[10px] uppercase text-paper">
                Flaggata
              </span>
            )}
          </p>
        </div>
        <span
          className={`pixel-label shrink-0 text-2xl font-bold ${
            frase.percent >= 50 ? "text-rust" : "text-ink"
          }`}
        >
          {frase.percent}%
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
          Percentuale
          <input
            type="number"
            min={0}
            max={100}
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            className="input-brut w-20 px-2 py-1 text-sm shadow-hard-sm"
            disabled={inCorso}
          />
        </label>
        <button
          type="button"
          className="btn px-3 py-1.5 text-xs"
          disabled={inCorso}
          onClick={() => esegui("percent", { percent: Number(percent) })}
        >
          Salva %
        </button>
        <button
          type="button"
          className="btn btn-paper px-3 py-1.5 text-xs"
          disabled={inCorso}
          onClick={() => {
            if (confirm("Rivalutare la frase con il prompt attuale? Percentuale, verdetto e motivazione verranno riscritti dall'AI.")) {
              void esegui("rivaluta");
            }
          }}
        >
          Rivaluta con l&rsquo;AI
        </button>
        <button
          type="button"
          className="btn btn-paper px-3 py-1.5 text-xs"
          disabled={inCorso}
          onClick={() => esegui(frase.flagged ? "unflag" : "flag")}
        >
          {frase.flagged ? "Ripristina" : "Nascondi"}
        </button>
        <button
          type="button"
          className="btn btn-rust px-3 py-1.5 text-xs"
          disabled={inCorso}
          onClick={() => {
            if (confirm("Eliminare per sempre la frase e i suoi commenti? Potra' essere rivalutata da zero al prossimo invio.")) {
              void esegui("elimina");
            }
          }}
        >
          Elimina
        </button>
        {inCorso && <span className="pixel-label text-xs">...</span>}
      </div>
      {messaggio && <p className="text-sm font-bold text-rust">{messaggio}</p>}
    </li>
  );
}
