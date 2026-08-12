"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type CommentoAdmin = {
  id: string;
  nickname: string;
  body: string;
  stance: "confermo" | "contesto" | null;
  is_ai: boolean;
  flagged: boolean;
  created_at: string;
  fraseSlug: string | null;
  fraseOriginal: string | null;
};

/* Riga di un commento nel pannello admin */
export default function CommentoAdminRow({
  commento,
}: {
  commento: CommentoAdmin;
}) {
  const router = useRouter();
  const [inCorso, setInCorso] = useState(false);
  const [messaggio, setMessaggio] = useState<string | null>(null);

  async function esegui(azione: string) {
    if (inCorso) return;
    setInCorso(true);
    setMessaggio(null);
    try {
      const risposta = await fetch("/api/admin/commenti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: commento.id, azione }),
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
      className={`card flex flex-col gap-2 px-5 py-4 ${
        commento.flagged ? "opacity-60" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-bold">
          {commento.is_ai ? "Il Gayometro" : commento.nickname}
        </span>
        {commento.is_ai && (
          <span className="pixel-label rounded-sm bg-lime px-1.5 py-0.5 text-[10px] uppercase">
            AI
          </span>
        )}
        {commento.stance && (
          <span className="rounded-full border-2 border-ink px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider">
            {commento.stance}
          </span>
        )}
        {commento.flagged && (
          <span className="pixel-label rounded-sm bg-rust px-1.5 py-0.5 text-[10px] uppercase text-paper">
            Flaggato
          </span>
        )}
        {commento.fraseSlug && (
          <Link
            href={`/frase/${commento.fraseSlug}`}
            className="text-ink/60 underline-offset-4 hover:underline"
          >
            su &ldquo;{commento.fraseOriginal}&rdquo;
          </Link>
        )}
      </div>
      <p>{commento.body}</p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="btn btn-paper px-3 py-1.5 text-xs"
          disabled={inCorso}
          onClick={() => esegui(commento.flagged ? "unflag" : "flag")}
        >
          {commento.flagged ? "Ripristina" : "Nascondi"}
        </button>
        <button
          type="button"
          className="btn btn-rust px-3 py-1.5 text-xs"
          disabled={inCorso}
          onClick={() => {
            if (confirm("Eliminare per sempre questo commento?")) {
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
