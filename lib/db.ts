import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/*
  Client Supabase con service role key: vive SOLO lato server.
  Inizializzazione pigra cosi' la build non richiede le env.
*/
let client: SupabaseClient | null = null;

export function getDb(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Config mancante: servono SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
  }

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
