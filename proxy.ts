import { NextResponse, type NextRequest } from "next/server";

/*
  Due compiti:
  1. Cookie tecnico anonimo gm_cid per l'antispam (rate limiting dietro
     CGNAT): identificatore casuale, non di profilazione.
  2. Ingresso del pannello nascosto: /admin?chiave=ADMIN_SECRET scambia
     la chiave con un cookie httpOnly di 30 giorni e ripulisce l'URL.
     Con chiave assente o sbagliata non succede nulla: la pagina /admin
     rispondera' 404 come una pagina inesistente.
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

export async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin") {
    const chiave = req.nextUrl.searchParams.get("chiave");
    const segreto = process.env.ADMIN_SECRET;
    if (chiave && segreto && segreto.length >= 8 && chiave === segreto) {
      const url = req.nextUrl.clone();
      url.searchParams.delete("chiave");
      const res = NextResponse.redirect(url);
      res.cookies.set("gm_admin", await sha256Hex(`gm-admin|${segreto}`), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
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
