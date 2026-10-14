import { createHash, randomBytes } from "crypto";

/*
  Normalizzazione della frase per il match esatto in cache:
  minuscole, trim, spazi multipli collassati, punteggiatura finale
  rimossa, accenti mantenuti (sezione 4.1 del brief).
*/
export function normalizzaFrase(input: string): string {
  return input
    .normalize("NFC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[\s.,;:!?…]+$/u, "")
    .trim();
}

export function sha256Hex(testo: string): string {
  return createHash("sha256").update(testo, "utf8").digest("hex");
}

/*
  Slug leggibile: solo ascii, parole separate da trattino semplice,
  massimo 60 caratteri. La collisione si gestisce a livello di insert
  aggiungendo un suffisso casuale corto.
*/
export function slugify(normalized: string): string {
  const ascii = normalized
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const tagliato = ascii.slice(0, 60).replace(/-+$/g, "");
  return tagliato || "frase";
}

export function suffissoCasuale(lunghezza = 4): string {
  const alfabeto = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = randomBytes(lunghezza);
  let out = "";
  for (let i = 0; i < lunghezza; i++) {
    out += alfabeto[bytes[i] % alfabeto.length];
  }
  return out;
}
