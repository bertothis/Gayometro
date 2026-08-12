import "server-only";
import { createHash } from "crypto";

/*
  Accesso al pannello nascosto /admin.

  Niente pagina di login, niente bottoni: si entra UNA volta con
  /admin?chiave=ADMIN_SECRET (il middleware scambia la chiave con un
  cookie httpOnly di 30 giorni) e da li' in poi basta visitare /admin.
  Per chiunque altro la pagina risponde 404, indistinguibile da una
  pagina inesistente.

  Il cookie contiene l'hash del segreto, non il segreto: lo stesso hash
  viene calcolato qui (runtime Node) e nel middleware (runtime edge).
*/

export const COOKIE_ADMIN = "gm_admin";

export function tokenAdminAtteso(): string | null {
  const segreto = process.env.ADMIN_SECRET;
  if (!segreto || segreto.length < 8) return null;
  return createHash("sha256").update(`gm-admin|${segreto}`, "utf8").digest("hex");
}

export function cookieAdminValido(valore: string | undefined): boolean {
  const atteso = tokenAdminAtteso();
  return Boolean(atteso && valore && valore === atteso);
}
