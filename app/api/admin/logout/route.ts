import { NextResponse } from "next/server";
import { COOKIE_SESSION } from "@/lib/admin";

/* Cancella solo la sessione: il cookie del gate resta, per non dover
   riscoprire il link segreto solo per rifare il login. */
export async function POST() {
  const res = NextResponse.json({ stato: "ok" });
  res.cookies.set(COOKIE_SESSION, "", { path: "/", maxAge: 0 });
  return res;
}
