/*
  Semina la frase civetta del touchpoint "gotcha" delle donazioni
  (estensione sezione 9 del brief): "chi non supporta questo sito", con un
  83% fisso che deve restare coerente con la copy dei popup lato client
  (vedi lib/frase-donazioni.ts e components/GayometroForm.tsx).

  Idempotente: rilanciarlo aggiorna percent/verdict/motivation della riga
  gia' esistente invece di duplicarla.

  Uso:  npm run seed:donazioni
  Requisiti: SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY in .env.local
*/

import "./carica-env";
import { createClient } from "@supabase/supabase-js";
import { normalizzaFrase, slugify } from "../lib/normalize";
import { SLUG_FRASE_DONAZIONI } from "../lib/frase-donazioni";
import type { FraseRow } from "../lib/types";

/*
  Client Supabase dedicato allo script: lib/db.ts e' protetto da
  "server-only" per impedire che la service role key finisca mai in un
  bundle client di Next.js. Questo script gira fuori da Next (via tsx),
  quindi quel guard lo farebbe fallire subito all'import: qui si crea un
  client equivalente senza passare da li'.
*/
function getDb() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Config mancante: servono SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const FRASE_ORIGINALE = "chi non supporta questo sito";
const PERCENT = 83;
const VERDICT = "Il tirchio non etero del gruppo";
const MOTIVATION =
  "Chi legge il verdetto e sparisce senza lasciare due euro sta facendo la cosa meno etero della sua giornata. Il Gayometro non obbliga nessuno, ma tiene il conto: ottantatré per cento è già una cortesia.";

async function main() {
  console.log(`\nSemina della frase "${FRASE_ORIGINALE}"...\n`);

  const normalized = normalizzaFrase(FRASE_ORIGINALE);
  const slugCalcolato = slugify(normalized);
  if (slugCalcolato !== SLUG_FRASE_DONAZIONI) {
    console.error(
      `ERRORE: slugify("${FRASE_ORIGINALE}") produce "${slugCalcolato}", ma ` +
        `lib/frase-donazioni.ts dichiara "${SLUG_FRASE_DONAZIONI}". Il popup ` +
        `"gotcha" del form si basa su questa costante: allinea i due valori ` +
        `prima di rilanciare lo script.\n`
    );
    process.exit(1);
  }

  const { data: esistente, error: erroreLettura } = await getDb()
    .from("phrases")
    .select("*")
    .eq("normalized", normalized)
    .maybeSingle();
  if (erroreLettura) throw erroreLettura;

  let frase: FraseRow;
  if (esistente) {
    const { data, error } = await getDb()
      .from("phrases")
      .update({
        percent: PERCENT,
        verdict: VERDICT,
        motivation: MOTIVATION,
        flagged: false,
      })
      .eq("id", esistente.id)
      .select()
      .single();
    if (error) throw error;
    frase = data as FraseRow;
    console.log(
      `Frase gia' presente (slug: ${frase.slug}): percentuale e testi aggiornati.`
    );
  } else {
    const { data, error } = await getDb()
      .from("phrases")
      .insert({
        normalized,
        original: FRASE_ORIGINALE,
        slug: SLUG_FRASE_DONAZIONI,
        percent: PERCENT,
        verdict: VERDICT,
        motivation: MOTIVATION,
      })
      .select()
      .single();
    if (error) throw error;
    frase = data as FraseRow;
    console.log(`Frase creata con slug: ${frase.slug}`);
  }

  const { data: commentoEsistente, error: erroreCommento } = await getDb()
    .from("comments")
    .select("id")
    .eq("phrase_id", frase.id)
    .eq("is_ai", true)
    .maybeSingle();
  if (erroreCommento) throw erroreCommento;

  if (!commentoEsistente) {
    const { error } = await getDb().from("comments").insert({
      phrase_id: frase.id,
      nickname: "Il Gayometro",
      body: frase.motivation,
      is_ai: true,
    });
    if (error) throw error;
    console.log("Primo commento AI inserito.");
  } else {
    console.log("Primo commento AI gia' presente, nessuna modifica.");
  }

  console.log(`\nFatto. Verifica su /frase/${frase.slug}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
