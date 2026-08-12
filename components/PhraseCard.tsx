import Link from "next/link";
import type { FraseRow } from "@/lib/types";

/* Card compatta di una frase valutata, per home e bacheca */
export default function PhraseCard({
  frase,
}: {
  frase: Pick<FraseRow, "slug" | "original" | "percent" | "verdict">;
}) {
  return (
    <Link
      href={`/frase/${frase.slug}`}
      className="card flex items-center justify-between gap-4 px-5 py-4 transition-transform duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm motion-reduce:transition-none"
    >
      <div className="min-w-0">
        <p className="truncate font-bold">&ldquo;{frase.original}&rdquo;</p>
        <p className="truncate text-sm italic text-ink/70">{frase.verdict}</p>
      </div>
      <span
        className={`pixel-label shrink-0 text-2xl font-bold ${
          frase.percent >= 50 ? "text-rust" : "text-ink"
        }`}
      >
        {frase.percent}%
      </span>
    </Link>
  );
}
