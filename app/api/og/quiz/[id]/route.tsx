import { ImageResponse } from "next/og";
import { getDb } from "@/lib/db";
import { fontOG, urlSito, OG } from "@/lib/og";
import type { QuizSessionRow } from "@/lib/types";

export const dynamic = "force-dynamic";

const FORMA_UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!FORMA_UUID.test(id)) {
    return new Response("Risultato non trovato", { status: 404 });
  }

  let sessione: QuizSessionRow | null = null;
  try {
    const { data, error } = await getDb()
      .from("quiz_sessions")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    sessione = data as QuizSessionRow | null;
  } catch {
    return new Response("Immagine non disponibile", { status: 500 });
  }
  if (!sessione) return new Response("Risultato non trovato", { status: 404 });

  const colore = sessione.score >= 50 ? OG.rust : OG.ink;

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
              fontSize: 30,
              color: OG.ink,
            }}
          >
            <div style={{ display: "flex", width: 20, height: 20, backgroundColor: OG.rust }} />
            QUIZ DEL GAYOMETRO
            <div style={{ display: "flex", width: 20, height: 20, backgroundColor: OG.rust }} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: "Inter",
                fontSize: 30,
                color: OG.ink,
                opacity: 0.7,
              }}
            >
              Quanto sei gay? Risultato:
            </div>
            <div
              style={{
                fontFamily: "Silkscreen",
                fontSize: 210,
                lineHeight: 1,
                color: colore,
              }}
            >
              {sessione.score}%
            </div>
            <div
              style={{
                fontFamily: "Fraunces",
                fontSize: 46,
                color: OG.ink,
                textAlign: "center",
                maxWidth: 1000,
              }}
            >
              {sessione.band_title}
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
            <BarraPixel percent={sessione.score} />
            <div
              style={{
                fontFamily: "Inter",
                fontSize: 22,
                color: OG.ink,
                opacity: 0.6,
              }}
            >
              fai il quiz anche tu · {urlSito()}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: OG.larghezza, height: OG.altezza, fonts: fontOG() }
  );
}
