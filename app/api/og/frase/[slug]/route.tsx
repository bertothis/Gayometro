import { ImageResponse } from "next/og";
import { getDb } from "@/lib/db";
import { fontOG, urlSito, OG } from "@/lib/og";
import type { FraseRow } from "@/lib/types";

export const dynamic = "force-dynamic";

/* Barra pixel: 20 blocchi, i pieni seguono la percentuale */
function BarraPixel({ percent }: { percent: number }) {
  const pieni = Math.round(percent / 5);
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          style={{
            width: 34,
            height: 34,
            border: `4px solid ${OG.ink}`,
            backgroundColor:
              i < pieni ? (i >= 12 ? OG.rust : OG.lime) : OG.card,
          }}
        />
      ))}
    </div>
  );
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  let frase: FraseRow | null = null;
  try {
    const { data, error } = await getDb()
      .from("phrases")
      .select("*")
      .eq("slug", slug)
      .eq("flagged", false)
      .maybeSingle();
    if (error) throw error;
    frase = data as FraseRow | null;
  } catch {
    return new Response("Immagine non disponibile", { status: 500 });
  }
  if (!frase) return new Response("Frase non trovata", { status: 404 });

  const colorePercent = frase.percent >= 50 ? OG.rust : OG.ink;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: OG.ink,
          padding: 16,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: OG.paper,
            border: `6px solid ${OG.ink}`,
            padding: "44px 60px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontFamily: "Silkscreen",
              fontSize: 34,
              color: OG.ink,
            }}
          >
            <div style={{ display: "flex", width: 22, height: 22, backgroundColor: OG.rust }} />
            GAYOMETRO
            <div style={{ display: "flex", width: 22, height: 22, backgroundColor: OG.rust }} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                fontFamily: "Silkscreen",
                fontSize: 190,
                lineHeight: 1,
                color: colorePercent,
              }}
            >
              {frase.percent}%
            </div>
            <div
              style={{
                fontFamily: "Fraunces",
                fontSize: 44,
                color: OG.ink,
                textAlign: "center",
                maxWidth: 1000,
              }}
            >
              &ldquo;{frase.original}&rdquo;
            </div>
            <div
              style={{
                fontFamily: "Inter",
                fontSize: 28,
                color: OG.ink,
                opacity: 0.75,
              }}
            >
              {frase.verdict}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 18,
            }}
          >
            <BarraPixel percent={frase.percent} />
            <div
              style={{
                fontFamily: "Inter",
                fontSize: 22,
                color: OG.ink,
                opacity: 0.6,
              }}
            >
              misurazione ufficiale · {urlSito()}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: OG.larghezza, height: OG.altezza, fonts: fontOG() }
  );
}
