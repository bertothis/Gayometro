import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gauge from "@/components/Gauge";
import CommentForm from "@/components/CommentForm";
import { getDb } from "@/lib/db";
import type { CommentoRow, FraseRow } from "@/lib/types";

export const dynamic = "force-dynamic";

async function caricaFrase(slug: string): Promise<FraseRow | null> {
  try {
    const { data, error } = await getDb()
      .from("phrases")
      .select("*")
      .eq("slug", slug)
      .eq("flagged", false)
      .maybeSingle();
    if (error) throw error;
    return data as FraseRow | null;
  } catch {
    return null;
  }
}

async function caricaCommenti(phraseId: string): Promise<CommentoRow[]> {
  try {
    const { data, error } = await getDb()
      .from("comments")
      .select("*")
      .eq("phrase_id", phraseId)
      .eq("flagged", false)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data as CommentoRow[]) ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const frase = await caricaFrase(slug);
  if (!frase) return { title: "Frase non trovata" };
  const titolo = `"${frase.original}" è gay al ${frase.percent}%`;
  return {
    title: titolo,
    description: frase.motivation,
    openGraph: {
      title: titolo,
      description: frase.verdict,
      images: [`/api/og/frase/${frase.slug}`],
    },
    twitter: { card: "summary_large_image" },
  };
}

function dataLeggibile(iso: string): string {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PaginaFrase({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const frase = await caricaFrase(slug);
  if (!frase) notFound();

  const commenti = await caricaCommenti(frase.id);
  const testoWhatsApp = encodeURIComponent(
    `"${frase.original}" è gay al ${frase.percent}%. Verdetto del Gayometro: ${frase.verdict}.`
  );

  return (
    <div className="flex flex-col gap-10">
      <section className="card flex flex-col items-center gap-4 px-6 py-8 text-center">
        <p className="text-lg italic text-ink/80">&ldquo;{frase.original}&rdquo;</p>
        <Gauge percent={frase.percent} smooth={false} className="w-56 sm:w-64" />
        <p
          className={`pixel-label text-6xl font-bold ${
            frase.percent >= 50 ? "text-rust" : "text-ink"
          }`}
        >
          {frase.percent}%
        </p>
        <p className="font-display text-3xl font-black italic">{frase.verdict}</p>
        <p className="text-xs uppercase tracking-wider text-ink/60">
          Verdetto emesso il {dataLeggibile(frase.created_at)}
        </p>
        <a
          href={`https://wa.me/?text=${testoWhatsApp}%20${encodeURIComponent(
            `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/frase/${frase.slug}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-paper"
        >
          Condividi su WhatsApp
        </a>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-2xl font-black">
          Il dibattimento ({commenti.length})
        </h2>
        <ul className="flex flex-col gap-3">
          {commenti.map((c) => (
            <li
              key={c.id}
              className={`card px-5 py-4 ${c.is_ai ? "border-rust" : ""}`}
            >
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="font-bold">
                  {c.is_ai ? "Il Gayometro" : c.nickname}
                </span>
                {c.is_ai && (
                  <span className="pixel-label rounded-sm bg-lime px-1.5 py-0.5 text-[10px] uppercase">
                    Verdetto ufficiale
                  </span>
                )}
                {c.stance && (
                  <span
                    className={`rounded-full border-2 border-ink px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                      c.stance === "confermo" ? "bg-lime" : "bg-rust text-paper"
                    }`}
                  >
                    {c.stance}
                  </span>
                )}
              </div>
              <p>{c.body}</p>
            </li>
          ))}
        </ul>
        <CommentForm phraseId={frase.id} />
      </section>
    </div>
  );
}
