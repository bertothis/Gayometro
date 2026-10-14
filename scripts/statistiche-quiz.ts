/*
  Distribuzione reale dei risultati del quiz (npm run quiz:statistiche).
  Dopo il lancio serve a capire se la calibrazione regge: con la scala
  stirata, ogni fascia dovrebbe avere una quota simile di giocatori. Se
  troppe persone finiscono in poche fasce, ritara scripts/calibra-quiz.ts
  (LIVELLI e SIGMA) e rilancia npm run quiz:calibra.
*/
import "./carica-env";
import { createClient } from "@supabase/supabase-js";
import { FASCE } from "../lib/quiz-bands";

/* lib/db.ts e' "server-only" e fuori da Next fallirebbe: client dedicato */
async function main() {
  const url = process.env.SUPABASE_URL;
  const chiave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !chiave) throw new Error("Servono SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY in .env.local");
  const db = createClient(url, chiave, { auth: { persistSession: false } });
  const { data, error } = await db.from("quiz_sessions").select("score");
  if (error) throw error;
  const punteggi = (data ?? []).map((r) => r.score as number);
  if (punteggi.length === 0) {
    console.log("Nessun quiz ancora giocato.");
    return;
  }
  console.log(`Quiz giocati: ${punteggi.length}\n`);
  for (const f of FASCE) {
    const n = punteggi.filter((s) => s >= f.min && s <= f.max).length;
    const quota = (n / punteggi.length) * 100;
    console.log(
      `${String(f.min).padStart(3)}-${String(f.max).padEnd(3)} ${"#".repeat(Math.round(quota / 2)).padEnd(26)} ${quota.toFixed(1).padStart(5)}%  ${f.titolo}`
    );
  }
  const media = punteggi.reduce((a, b) => a + b, 0) / punteggi.length;
  console.log(`\nMedia: ${media.toFixed(1)} (con distribuzione uniforme dovrebbe stare vicino a 50)`);
}

main().catch((err) => {
  console.error("Errore:", err);
  process.exitCode = 1;
});
