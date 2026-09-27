import { NextResponse, type NextRequest } from "next/server";

/*
  Due compiti:
  1. Cookie tecnico anonimo gm_cid per l'antispam (rate limiting dietro
     CGNAT): identificatore casuale, non di profilazione.
  2. Ingresso del pannello nascosto: /admin?entra=ADMIN_GATE_SECRET scambia
     la chiave con un cookie httpOnly di un anno e ripulisce l'URL. Questo
     e' solo il livello di offuscamento (rivela il form di login al posto
     del 404): la sicurezza vera e' email + password + TOTP, verificati
     nella route /api/admin/login (vedi lib/admin.ts). Con chiave assente
     o sbagliata non succede nulla: /admin rispondera' 404.
*/

async function sha256Hex(testo: string): Promise<string> {
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(testo)
  );
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin") {
    const chiave = req.nextUrl.searchParams.get("entra");
    const segreto = process.env.ADMIN_GATE_SECRET;
    if (chiave && segreto && segreto.length >= 12 && chiave === segreto) {
      const url = req.nextUrl.clone();
      url.searchParams.delete("entra");
      const res = NextResponse.redirect(url);
      res.cookies.set("gm_admin_gate", await sha256Hex(`gm-gate|${segreto}`), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
      return res;
    }
  }

  const res = NextResponse.next();

  if (!req.cookies.get("gm_cid")) {
    res.cookies.set("gm_cid", crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  return res;
}

export const config = {
  // Solo le pagine: esclude asset statici, immagini OG e file con estensione
  matcher: ["/((?!_next|api/|favicon\\.ico|.*\\..*).*)"],
};
