import type { Metadata } from "next";
import Link from "next/link";
import PhraseCard from "@/components/PhraseCard";
import { getDb } from "@/lib/db";
import type { FraseRow } from "@/lib/types";
import { Boccale, Fiamma } from "@/components/pixel/doodles";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bacheca: le classifiche ufficiali",
  description:
    "Le 10 frasi più gay e le 10 meno gay mai passate sotto la lancetta del Gayometro.",
};

/*
  Bacheca pubblica in versione classifica: solo le 10 frasi più gay e le
  10 meno gay. L'archivio completo con ricerca e ordinamenti vive nel
  pannello di amministrazione.
*/

async function classifiche(): Promise<{
  piuGay: FraseRow[];
  menoGay: FraseRow[];
}> {
  try {
    const { data: alte, error: errAlte } = await getDb()
      .from("phrases")
      .select("*")
      .eq("flagged", false)
      .order("percent", { ascending: false })
      .order("created_at", { ascending: true })
      .limit(10);
    if (errAlte) throw errAlte;
    const piuGay = (alte as FraseRow[]) ?? [];

    let query = getDb()
      .from("phrases")
      .select("*")
      .eq("flagged", false)
      .order("percent", { ascending: true })
      .order("created_at", { ascending: true })
      .limit(10);
    /* Con poche frasi in archivio le due classifiche si sovrapporrebbero:
       la seconda esclude le frasi gia' sul podio della prima */
    if (piuGay.length > 0) {
      query = query.not(
        "id",
        "in",
        `(${piuGay.map((f) => `"${f.id}"`).join(",")})`
      );
    }
    const { data: basse, error: errBasse } = await query;
    if (errBasse) throw errBasse;

    return { piuGay, menoGay: (basse as FraseRow[]) ?? [] };
  } catch {
    return { piuGay: [], menoGay: [] };
  }
}

function Classifica({
  titolo,
  sottotitolo,
  frasi,
  doodle,
}: {
  titolo: string;
  sottotitolo: string;
  frasi: FraseRow[];
  doodle: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {doodle}
        <div>
          <h2 className="font-display text-2xl font-black">{titolo}</h2>
          <p className="text-sm text-ink/70">{sottotitolo}</p>
        </div>
      </div>
      {frasi.length === 0 ? (
        <div className="card px-5 py-5">
          <p>Classifica ancora vuota: la lancetta aspetta candidati.</p>
        </div>
      ) : (
        <ol className="flex flex-col gap-3">
          {frasi.map((f, i) => (
            <li key={f.id} className="flex items-center gap-3">
              <span className="pixel-label w-8 shrink-0 text-right text-lg text-ink/50">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <PhraseCard frase={f} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default async function Bacheca() {
  const { piuGay, menoGay } = await classifiche();

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-4xl font-black tracking-tight">
          Le classifiche ufficiali
        </h1>
        <p className="max-w-prose">
          Il meglio e il meglio dall&rsquo;altro lato della lancetta. Ogni
          verdetto è definitivo, ma il dibattimento nei commenti è sempre
          aperto: entra in una frase e dì la tua.
        </p>
        <Link href="/" className="btn mt-2">
          Misura una frase
        </Link>
      </header>

      <div className="grid gap-10 lg:grid-cols-2">
        <Classifica
          titolo="Le 10 più gay"
          sottotitolo="Il podio che nessuno ammette di voler scalare"
          frasi={piuGay}
          doodle={<Fiamma className="w-8 shrink-0" />}
        />
        <Classifica
          titolo="Le 10 meno gay"
          sottotitolo="Cemento armato certificato dalla lancetta"
          frasi={menoGay}
          doodle={<Boccale className="w-9 shrink-0" />}
        />
      </div>
    </div>
  );
}
