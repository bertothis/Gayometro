import { createHash } from "crypto";
import type { NextRequest } from "next/server";
import { getDb } from "@/lib/db";

/*
  Rate limiting su Postgres (sezione 8 del brief). Limiti larghi perche'
  gli operatori mobili italiani usano CGNAT e molti utenti legittimi
  condividono lo stesso IP pubblico. Il limite scatta sulla coppia
  hash IP + cookie tecnico, con un tetto piu' alto sul solo IP.
*/
export const LIMITI = {
  valuta: { coppia: 30, ip: 150 },
  commento: { coppia: 10, ip: 50 },
  quiz: { coppia: 60, ip: 240 },
} as const;

export type Azione = keyof typeof LIMITI;

export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "";
  return createHash("sha256").update(`${salt}:${ip}`, "utf8").digest("hex");
}

export function ipDaRichiesta(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "0.0.0.0";
}

export function clientIdDaRichiesta(req: NextRequest): string {
  return req.cookies.get("gm_cid")?.value ?? "";
}

/*
  Ritorna true se l'azione e' consentita. In caso di errore infrastrutturale
  lascia passare (fail open): meglio qualche richiesta in piu' che bloccare
  utenti veri durante un picco.
*/
export async function azioneConsentita(
  req: NextRequest,
  azione: Azione
): Promise<boolean> {
  const limiti = LIMITI[azione];
  try {
    const { data, error } = await getDb().rpc("check_rate_limit", {
      p_ip_hash: hashIp(ipDaRichiesta(req)),
      p_client_id: clientIdDaRichiesta(req),
      p_action: azione,
      p_pair_limit: limiti.coppia,
      p_ip_limit: limiti.ip,
    });
    if (error) throw error;
    return data === true;
  } catch (err) {
    console.error("rate limit non verificabile, lascio passare", err);
    return true;
  }
}
