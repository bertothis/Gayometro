import Link from "next/link";
import GayometroForm from "@/components/GayometroForm";
import PhraseCard from "@/components/PhraseCard";
import { getDb } from "@/lib/db";
import type { FraseRow } from "@/lib/types";
import {
  Boccale,
  Fiamma,
  Profumo,
  Sigaretta,
  Stellina,
} from "@/components/pixel/doodles";

export const dynamic = "force-dynamic";

async function ultimeFrasi(): Promise<FraseRow[]> {
  try {
    const { data, error } = await getDb()
      .from("phrases")
      .select("*")
      .eq("flagged", false)
      .order("created_at", { ascending: false })
      .limit(6);
    if (error) throw error;
    return (data as FraseRow[]) ?? [];
  } catch {
    /* Database non configurato o irraggiungibile: la home vive lo stesso */
    return [];
  }
}

export default async function Home() {
  const frasi = await ultimeFrasi();

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-5">
        <p className="pixel-label text-xs uppercase text-rust">
          Precisione certificata 73%
        </p>
        <h1 className="font-display text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
          Quanto è <em className="text-rust">gay</em>?
        </h1>
        <p className="max-w-prose text-lg">
          Scrivi un comportamento, un oggetto, un&rsquo;abitudine. Il Gayometro
          emette il verdetto: percentuale esatta, motivazione fulminante, zero
          possibilità di ricorso.
        </p>
        <div className="flex items-center gap-4 text-ink/80">
          <Sigaretta className="w-10" />
          <Boccale className="w-8" />
          <Profumo className="w-8" />
          <Fiamma className="w-7" />
          <Stellina className="w-5 text-rust" />
        </div>
      </section>

      <section className="card px-6 py-6 sm:px-8 sm:py-8">
        <GayometroForm />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-black">
            Ultime misurazioni
          </h2>
          <Link
            href="/bacheca"
            className="text-sm font-bold uppercase tracking-wider underline underline-offset-4"
          >
            Tutta la bacheca
          </Link>
        </div>
        {frasi.length === 0 ? (
          <div className="card px-6 py-6">
            <p>
              Il registro è ancora immacolato: nessuna misurazione agli atti.
              Scrivi la prima frase qui sopra e passa alla storia.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {frasi.map((f) => (
              <PhraseCard key={f.id} frase={f} />
            ))}
          </div>
        )}
      </section>

      <section className="card flex flex-col items-start gap-3 px-6 py-6">
        <h2 className="font-display text-2xl font-black">
          Quanto sei gay <em>tu</em>?
        </h2>
        <p className="max-w-prose">
          Quindici domande, un algoritmo spietato, un risultato da incorniciare
          o da nascondere. Il quiz è gratuito, la verità non ha prezzo.
        </p>
        <Link href="/quiz" className="btn">
          Fai il quiz
        </Link>
      </section>
    </div>
  );
}
