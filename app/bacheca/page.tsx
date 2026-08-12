import type { Metadata } from "next";
import Link from "next/link";
import PhraseCard from "@/components/PhraseCard";
import { getDb } from "@/lib/db";
import type { FraseRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bacheca delle misurazioni",
  description:
    "Tutte le frasi passate sotto la lancetta del Gayometro: le più recenti, le più gay, le meno gay.",
};

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
  try {
    let query = getDb().from("phrases").select("*").eq("flagged", false);

    if (opts.ricerca) {
      /* Ricerca testuale semplice, v1: nessun full-text */
      query = query.ilike("original", `%${opts.ricerca}%`);
    }

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
    /* Si chiede una riga in piu' del necessario per sapere se esiste
       una pagina successiva senza una count aggiuntiva */
    const { data, error } = await query.range(da, da + PER_PAGINA);
    if (error) throw error;
    const righe = (data as FraseRow[]) ?? [];
    return {
      frasi: righe.slice(0, PER_PAGINA),
      cePaginaDopo: righe.length > PER_PAGINA,
    };
  } catch {
    return { frasi: [], cePaginaDopo: false };
  }
}

function urlBacheca(tab: ChiaveTab, ricerca: string, pagina: number): string {
  const parametri = new URLSearchParams();
  if (tab !== "recenti") parametri.set("tab", tab);
  if (ricerca) parametri.set("q", ricerca);
  if (pagina > 1) parametri.set("pagina", String(pagina));
  const coda = parametri.toString();
  return coda ? `/bacheca?${coda}` : "/bacheca";
}

export default async function Bacheca({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; q?: string; pagina?: string }>;
}) {
  const parametri = await searchParams;
  const tab: ChiaveTab = TAB.some((t) => t.chiave === parametri.tab)
    ? (parametri.tab as ChiaveTab)
    : "recenti";
  const ricerca = (parametri.q ?? "").slice(0, 120).trim();
  const pagina = Math.max(1, Number.parseInt(parametri.pagina ?? "1", 10) || 1);

  const { frasi, cePaginaDopo } = await caricaFrasi({ tab, ricerca, pagina });

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-4xl font-black tracking-tight">
          La bacheca
        </h1>
        <p className="max-w-prose">
          Ogni verdetto è pubblico e definitivo, ma il dibattimento è sempre
          aperto: entra in una frase e dì la tua.
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="flex gap-2" aria-label="Ordinamento">
          {TAB.map((t) => (
            <Link
              key={t.chiave}
              href={urlBacheca(t.chiave, ricerca, 1)}
              aria-current={tab === t.chiave ? "page" : undefined}
              className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-bold uppercase tracking-wider ${
                tab === t.chiave ? "bg-lime shadow-hard-sm" : "bg-card"
              }`}
            >
              {t.etichetta}
            </Link>
          ))}
        </nav>

        <form action="/bacheca" method="get" className="flex gap-2">
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

      {frasi.length === 0 ? (
        <div className="card px-6 py-8">
          <p className="font-display text-xl font-black">
            {ricerca ? "Nessun verdetto trovato" : "Bacheca ancora vuota"}
          </p>
          <p className="mt-1">
            {ricerca
              ? "Nessuna misurazione corrisponde alla ricerca. Prova con altre parole, o misura tu la frase dalla home."
              : "Il registro aspetta la prima misurazione: vai alla home e inaugura la lancetta."}
          </p>
          <Link href="/" className="btn mt-4">
            Vai al Gayometro
          </Link>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {frasi.map((f) => (
            <PhraseCard key={f.id} frase={f} />
          ))}
        </div>
      )}

      {(pagina > 1 || cePaginaDopo) && (
        <nav className="flex items-center justify-center gap-4" aria-label="Pagine">
          {pagina > 1 ? (
            <Link href={urlBacheca(tab, ricerca, pagina - 1)} className="btn btn-paper">
              Indietro
            </Link>
          ) : (
            <span />
          )}
          <span className="pixel-label text-sm">pagina {pagina}</span>
          {cePaginaDopo && (
            <Link href={urlBacheca(tab, ricerca, pagina + 1)} className="btn btn-paper">
              Avanti
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
