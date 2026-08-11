import { NextResponse, type NextRequest } from "next/server";

/*
  Cookie tecnico anonimo per l'antispam (gm_cid): identificatore casuale,
  non di profilazione, generato al primo accesso. Serve al rate limiting
  per distinguere utenti dietro CGNAT che condividono lo stesso IP.
*/
export function middleware(req: NextRequest) {
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
