import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import FraseAdminRow from "@/components/admin/FraseAdminRow";
import CommentoAdminRow, {
  type CommentoAdmin,
} from "@/components/admin/CommentoAdminRow";
import { cookieAdminValido, COOKIE_ADMIN } from "@/lib/admin";
import { getDb } from "@/lib/db";
import type { FraseRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sala macchine",
  robots: { index: false, follow: false },
};

/*
  Pannello nascosto del proprietario. Senza il cookie ottenuto con la
  chiave segreta (vedi lib/admin.ts) la pagina risponde 404: per il resto
  del mondo non esiste. Qui vivono l'archivio completo delle frasi con i
  comandi di taratura e la moderazione di tutti i commenti.
*/

const PER_PAGINA = 20;

const TAB = [
  { chiave: "recenti", etichetta: "Recenti" },
  { chiave: "piu-gay", etichetta: "Più gay" },
  { chiave: "meno-gay", etichetta: "Meno gay" },
] as const;

type ChiaveTab = (typeof TAB)[number]["chiave"];

async function caricaFrasi(opts: {
  tab: ChiaveTab;
  ricerca: string;
  pagina: number;
}): Promise<{ frasi: FraseRow[]; cePaginaDopo: boolean }> {
  let query = getDb().from("phrases").select("*");
  if (opts.ricerca) query = query.ilike("original", `%${opts.ricerca}%`);

  if (opts.tab === "piu-gay") {
    query = query
      .order("percent", { ascending: false })
      .order("created_at", { ascending: false });
  } else if (opts.tab === "meno-gay") {
    query = query
      .order("percent", { ascending: true })
      .order("created_at", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const da = (opts.pagina - 1) * PER_PAGINA;
  const { data, error } = await query.range(da, da + PER_PAGINA);
  if (error) throw error;
  const righe = (data as FraseRow[]) ?? [];
  return {
    frasi: righe.slice(0, PER_PAGINA),
    cePaginaDopo: righe.length > PER_PAGINA,
  };
}

type CommentoConFrase = {
  id: string;
  nickname: string;
  body: string;
  stance: "confermo" | "contesto" | null;
  is_ai: boolean;
  flagged: boolean;
  created_at: string;
  phrases: { slug: string; original: string } | null;
};

async function caricaCommenti(pagina: number): Promise<{
  commenti: CommentoAdmin[];
  cePaginaDopo: boolean;
}> {
  const da = (pagina - 1) * PER_PAGINA;
  const { data, error } = await getDb()
    .from("comments")
    .select("id, nickname, body, stance, is_ai, flagged, created_at, phrases(slug, original)")
    .order("created_at", { ascending: false })
    .range(da, da + PER_PAGINA);
  if (error) throw error;
  const righe = (data as unknown as CommentoConFrase[]) ?? [];
  return {
    commenti: righe.slice(0, PER_PAGINA).map((c) => ({
      id: c.id,
      nickname: c.nickname,
      body: c.body,
      stance: c.stance,
      is_ai: c.is_ai,
      flagged: c.flagged,
      created_at: c.created_at,
      fraseSlug: c.phrases?.slug ?? null,
      fraseOriginal: c.phrases?.original ?? null,
    })),
    cePaginaDopo: righe.length > PER_PAGINA,
  };
}

function urlAdmin(parametri: {
  tab: ChiaveTab;
  q: string;
  pagina: number;
  pc: number;
}): string {
  const p = new URLSearchParams();
  if (parametri.tab !== "recenti") p.set("tab", parametri.tab);
  if (parametri.q) p.set("q", parametri.q);
  if (parametri.pagina > 1) p.set("pagina", String(parametri.pagina));
  if (parametri.pc > 1) p.set("pc", String(parametri.pc));
  const coda = p.toString();
  return coda ? `/admin?${coda}` : "/admin";
}

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{
    tab?: string;
    q?: string;
    pagina?: string;
    pc?: string;
  }>;
}) {
  const negozio = await cookies();
  if (!cookieAdminValido(negozio.get(COOKIE_ADMIN)?.value)) {
    notFound();
  }

  const parametri = await searchParams;
  const tab: ChiaveTab = TAB.some((t) => t.chiave === parametri.tab)
    ? (parametri.tab as ChiaveTab)
    : "recenti";
  const ricerca = (parametri.q ?? "").slice(0, 120).trim();
  const pagina = Math.max(1, Number.parseInt(parametri.pagina ?? "1", 10) || 1);
  const paginaCommenti = Math.max(
    1,
    Number.parseInt(parametri.pc ?? "1", 10) || 1
  );

  let frasi: FraseRow[] = [];
  let cePaginaDopo = false;
  let commenti: CommentoAdmin[] = [];
  let ceCommentiDopo = false;
  let erroreDb: string | null = null;
  try {
    ({ frasi, cePaginaDopo } = await caricaFrasi({ tab, ricerca, pagina }));
    ({ commenti, cePaginaDopo: ceCommentiDopo } =
      await caricaCommenti(paginaCommenti));
  } catch (err) {
    console.error("caricamento admin fallito", err);
    erroreDb =
      "Database non raggiungibile: controlla le variabili d'ambiente di Supabase.";
  }

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <p className="pixel-label text-xs uppercase text-rust">
          Area riservata al titolare
        </p>
        <h1 className="font-display text-4xl font-black tracking-tight">
          Sala macchine
        </h1>
        <p className="max-w-prose">
          Archivio completo e moderazione. Da qui puoi correggere una
          percentuale a mano, far rivalutare una frase dal motore aggiornato,
          nascondere o eliminare frasi e commenti.
        </p>
      </header>

      {erroreDb && (
        <div className="card border-rust px-6 py-5">
          <p className="font-bold text-rust">{erroreDb}</p>
        </div>
      )}

      <section className="flex flex-col gap-4" id="frasi">
        <h2 className="font-display text-2xl font-black">
          Tutte le frasi
        </h2>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex gap-2" aria-label="Ordinamento">
            {TAB.map((t) => (
              <Link
                key={t.chiave}
                href={urlAdmin({ tab: t.chiave, q: ricerca, pagina: 1, pc: paginaCommenti })}
                aria-current={tab === t.chiave ? "page" : undefined}
                className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-bold uppercase tracking-wider ${
                  tab === t.chiave ? "bg-lime shadow-hard-sm" : "bg-card"
                }`}
              >
                {t.etichetta}
              </Link>
            ))}
          </nav>
          <form action="/admin" method="get" className="flex gap-2">
            {tab !== "recenti" && <input type="hidden" name="tab" value={tab} />}
            <input
              type="search"
              name="q"
              defaultValue={ricerca}
              placeholder="Cerca una frase"
              className="input-brut max-w-56 py-2 shadow-hard-sm"
            />
            <button type="submit" className="btn px-4 py-2">
              Cerca
            </button>
          </form>
        </div>

        {frasi.length === 0 && !erroreDb ? (
          <div className="card px-6 py-6">
            <p>Nessuna frase {ricerca ? "trovata con questa ricerca" : "in archivio"}.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {frasi.map((f) => (
              <FraseAdminRow key={f.id} frase={f} />
            ))}
          </ul>
        )}

        {(pagina > 1 || cePaginaDopo) && (
          <nav className="flex items-center justify-center gap-4" aria-label="Pagine frasi">
            {pagina > 1 ? (
              <Link
                href={urlAdmin({ tab, q: ricerca, pagina: pagina - 1, pc: paginaCommenti })}
                className="btn btn-paper"
              >
                Indietro
              </Link>
            ) : (
              <span />
            )}
            <span className="pixel-label text-sm">pagina {pagina}</span>
            {cePaginaDopo && (
              <Link
                href={urlAdmin({ tab, q: ricerca, pagina: pagina + 1, pc: paginaCommenti })}
                className="btn btn-paper"
              >
                Avanti
              </Link>
            )}
          </nav>
        )}
      </section>

      <section className="flex flex-col gap-4" id="commenti">
        <h2 className="font-display text-2xl font-black">
          Tutti i commenti
        </h2>
        {commenti.length === 0 && !erroreDb ? (
          <div className="card px-6 py-6">
            <p>Nessun commento agli atti.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {commenti.map((c) => (
              <CommentoAdminRow key={c.id} commento={c} />
            ))}
          </ul>
        )}

        {(paginaCommenti > 1 || ceCommentiDopo) && (
          <nav className="flex items-center justify-center gap-4" aria-label="Pagine commenti">
            {paginaCommenti > 1 ? (
              <Link
                href={`${urlAdmin({ tab, q: ricerca, pagina, pc: paginaCommenti - 1 })}#commenti`}
                className="btn btn-paper"
              >
                Indietro
              </Link>
            ) : (
              <span />
            )}
            <span className="pixel-label text-sm">pagina {paginaCommenti}</span>
            {ceCommentiDopo && (
              <Link
                href={`${urlAdmin({ tab, q: ricerca, pagina, pc: paginaCommenti + 1 })}#commenti`}
                className="btn btn-paper"
              >
                Avanti
              </Link>
            )}
          </nav>
        )}
      </section>
    </div>
  );
}
