import { readFileSync } from "fs";
import path from "path";

/*
  Risorse condivise per le immagini OG generate con ImageResponse.
  I woff vivono nel repo (assets/fonts) e sono inclusi nel bundle
  serverless via outputFileTracingIncludes in next.config.ts.
*/

export const OG = {
  larghezza: 1200,
  altezza: 630,
  paper: "#faf4e6",
  card: "#fffbf0",
  ink: "#1c2418",
  lime: "#c8f04b",
  rust: "#c4502e",
} as const;

let cache: { name: string; data: Buffer; weight: 600 | 700; style: "normal" }[] | null =
  null;

export function fontOG() {
  if (cache) return cache;
  const dir = path.join(process.cwd(), "assets", "fonts");
  cache = [
    {
      name: "Silkscreen",
      data: readFileSync(path.join(dir, "silkscreen-latin-700-normal.woff")),
      weight: 700,
      style: "normal",
    },
    {
      name: "Fraunces",
      data: readFileSync(path.join(dir, "fraunces-latin-700-normal.woff")),
      weight: 700,
      style: "normal",
    },
    {
      name: "Inter",
      data: readFileSync(path.join(dir, "inter-latin-600-normal.woff")),
      weight: 600,
      style: "normal",
    },
  ];
  return cache;
}

/* Sito senza dominio definitivo: l'URL mostrato sulle card arriva dall'env */
export function urlSito(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "") || "gayometro";
}
