import "server-only";
import { createHash, createHmac, timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";
import { TOTP, Secret } from "otpauth";

/*
  Accesso al pannello nascosto /admin, in due livelli indipendenti.

  Livello 1, GATE: un link con ?entra=ADMIN_GATE_SECRET (il proxy
  scambia il parametro con un cookie httpOnly di un anno) rivela il form
  di login al posto del 404. E' solo offuscamento, non e' la sicurezza
  vera: chi non conosce il link non sa nemmeno che esiste un login.
  Lo stesso hash viene calcolato qui (runtime Node, per la pagina) e nel
  proxy (runtime edge, per lo scambio della chiave).

  Livello 2, SESSIONE: la sicurezza vera. Email + password + codice TOTP
  a 6 cifre (Google Authenticator, Authy, 1Password...), verificati SOLO
  in una route Node (mai nel proxy edge: bcrypt e TOTP non ci vivono
  bene). Login riuscito -> token di sessione firmato con scadenza dentro
  il payload, controllata ad ogni richiesta lato server: un cookie
  copiato a mano non basta a ignorare la scadenza.

  Nessuna tabella utenti: un solo amministratore, credenziali in env.
  Genera le tue con `npm run admin:setup`.
*/

export const COOKIE_GATE = "gm_admin_gate";
export const COOKIE_SESSION = "gm_admin_session";

export const DURATA_GATE_SECONDI = 60 * 60 * 24 * 365; // 1 anno: solo offuscamento
export const DURATA_SESSIONE_SECONDI = 60 * 60 * 24 * 7; // 7 giorni: sessione vera

function sha256Hex(testo: string): string {
  return createHash("sha256").update(testo, "utf8").digest("hex");
}

function confrontoSicuro(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export function tokenGateAtteso(): string | null {
  const segreto = process.env.ADMIN_GATE_SECRET;
  if (!segreto || segreto.length < 12) return null;
  return sha256Hex(`gm-gate|${segreto}`);
}

export function cookieGateValido(valore: string | undefined): boolean {
  const atteso = tokenGateAtteso();
  return Boolean(atteso && valore && confrontoSicuro(valore, atteso));
}

export function emailCorretta(email: string): boolean {
  const attesa = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(attesa && email.trim().toLowerCase() === attesa);
}

/*
  ADMIN_PASSWORD_HASH e' l'hash bcrypt codificato in base64, non in chiaro:
  un hash bcrypt e' pieno di simboli "$" (es. $2b$12$...) e il loader delle
  env di Next.js fa espansione di variabili in stile shell su "$NOME",
  troncando silenziosamente il valore. Il base64 evita il problema del
  tutto, invece di doversi ricordare di escapare ogni "$" a mano.
*/
export function passwordCorretta(password: string): Promise<boolean> {
  const codificato = process.env.ADMIN_PASSWORD_HASH;
  if (!codificato || !password) return Promise.resolve(false);
  let hash: string;
  try {
    hash = Buffer.from(codificato, "base64").toString("utf8");
  } catch {
    return Promise.resolve(false);
  }
  return bcrypt.compare(password, hash);
}

export function codiceTotpCorretto(codice: string): boolean {
  const segreto = process.env.ADMIN_TOTP_SECRET;
  const pulito = codice.trim();
  if (!segreto || !/^\d{6}$/.test(pulito)) return false;
  const totp = new TOTP({
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: Secret.fromBase32(segreto),
  });
  /* window:1 tollera uno sfasamento di 30s tra orologio del server e del telefono */
  return totp.validate({ token: pulito, window: 1 }) !== null;
}

function chiaveSessione(): string {
  const segreto = process.env.ADMIN_SESSION_SECRET;
  if (!segreto || segreto.length < 16) {
    throw new Error(
      "Config mancante: serve ADMIN_SESSION_SECRET in .env.local (npm run admin:setup)"
    );
  }
  return segreto;
}

export function creaTokenSessione(): string {
  const scadenza = Date.now() + DURATA_SESSIONE_SECONDI * 1000;
  const payload = Buffer.from(JSON.stringify({ exp: scadenza })).toString(
    "base64url"
  );
  const firma = createHmac("sha256", chiaveSessione())
    .update(payload)
    .digest("base64url");
  return `${payload}.${firma}`;
}

export function tokenSessioneValido(valore: string | undefined): boolean {
  if (!valore) return false;
  const [payload, firma] = valore.split(".");
  if (!payload || !firma) return false;

  let firmaAttesa: string;
  try {
    firmaAttesa = createHmac("sha256", chiaveSessione())
      .update(payload)
      .digest("base64url");
  } catch {
    return false;
  }
  if (!confrontoSicuro(firma, firmaAttesa)) return false;

  try {
    const dati = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof dati.exp === "number" && Date.now() < dati.exp;
  } catch {
    return false;
  }
}
