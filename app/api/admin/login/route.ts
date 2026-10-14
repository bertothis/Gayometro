import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import {
  COOKIE_GATE,
  COOKIE_SESSION,
  DURATA_SESSIONE_SECONDI,
  cookieGateValido,
  codiceTotpCorretto,
  creaTokenSessione,
  emailCorretta,
  passwordCorretta,
} from "@/lib/admin";
import { azioneConsentita } from "@/lib/rate-limit";

/*
  Livello 2 del login admin: email + password + codice TOTP, verificati
  qui (runtime Node). Senza il cookie del gate la route risponde 404,
  come /admin: non basta trovare l'endpoint per poterlo bersagliare.
*/

type Esito = { stato: "ok" } | { stato: "errore"; messaggio: string };

export async function POST(req: NextRequest) {
  const negozio = await cookies();
  if (!cookieGateValido(negozio.get(COOKIE_GATE)?.value)) {
    return new NextResponse(null, { status: 404 });
  }

  if (!(await azioneConsentita(req, "loginAdmin"))) {
    return NextResponse.json(
      { stato: "errore", messaggio: "Troppi tentativi, riprova tra un'ora." } satisfies Esito,
      { status: 429 }
    );
  }

  let body: { email?: unknown; password?: unknown; codice?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { stato: "errore", messaggio: "Richiesta non valida." } satisfies Esito,
      { status: 400 }
    );
  }

  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";
  const codice = typeof body.codice === "string" ? body.codice : "";

  /* Le tre verifiche corrono sempre tutte: niente uscite anticipate che
     potrebbero far indovinare quale campo era sbagliato dai tempi di risposta */
  const [emailOk, passwordOk] = await Promise.all([
    Promise.resolve(emailCorretta(email)),
    passwordCorretta(password),
  ]);
  const totpOk = codiceTotpCorretto(codice);

  if (!emailOk || !passwordOk || !totpOk) {
    return NextResponse.json(
      { stato: "errore", messaggio: "Credenziali non valide." } satisfies Esito,
      { status: 401 }
    );
  }

  const res = NextResponse.json({ stato: "ok" } satisfies Esito);
  res.cookies.set(COOKIE_SESSION, creaTokenSessione(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: DURATA_SESSIONE_SECONDI,
    path: "/",
  });
  return res;
}
