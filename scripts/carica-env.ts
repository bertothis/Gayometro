/*
  Carica .env.local in process.env al momento dell'import.
  Va importato PRIMA di ogni altro modulo del progetto: in ESM gli
  import sono valutati in ordine, quindi questo garantisce che le env
  esistano prima che qualsiasi altro modulo venga inizializzato.
  Mini parser senza dipendenze: le variabili gia' presenti vincono.
*/
import { existsSync, readFileSync } from "fs";
import path from "path";

const percorso = path.join(process.cwd(), ".env.local");

if (existsSync(percorso)) {
  for (const riga of readFileSync(percorso, "utf8").split("\n")) {
    const pulita = riga.trim();
    if (!pulita || pulita.startsWith("#")) continue;
    const uguale = pulita.indexOf("=");
    if (uguale === -1) continue;
    const chiave = pulita.slice(0, uguale).trim();
    const valore = pulita
      .slice(uguale + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (!(chiave in process.env)) process.env[chiave] = valore;
  }
}
