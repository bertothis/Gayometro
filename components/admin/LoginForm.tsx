"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/*
  Form di login del pannello, visibile solo a chi ha gia' il cookie del
  gate (senza, /admin resta 404). La vera verifica di email, password e
  TOTP avviene server-side in /api/admin/login.
*/
export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codice, setCodice] = useState("");
  const [inCorso, setInCorso] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);

  async function invia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inCorso) return;
    setInCorso(true);
    setErrore(null);
    try {
      const risposta = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, codice }),
      });
      const dati = (await risposta.json()) as {
        stato: string;
        messaggio?: string;
      };
      if (dati.stato === "ok") {
        router.refresh();
      } else {
        setErrore(dati.messaggio ?? "Credenziali non valide.");
        setCodice("");
      }
    } catch {
      setErrore("Login fallito, riprova.");
    } finally {
      setInCorso(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 py-16">
      <header className="flex flex-col gap-2 text-center">
        <p className="pixel-label text-xs uppercase text-rust">
          Area riservata al titolare
        </p>
        <h1 className="font-display text-3xl font-black">Accesso</h1>
      </header>

      <form onSubmit={invia} className="card flex flex-col gap-4 px-6 py-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
            className="input-brut"
            disabled={inCorso}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-bold uppercase tracking-wider">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="input-brut"
            disabled={inCorso}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="codice" className="text-sm font-bold uppercase tracking-wider">
            Codice a 6 cifre
          </label>
          <input
            id="codice"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={codice}
            onChange={(e) => setCodice(e.target.value.replace(/\D/g, ""))}
            autoComplete="one-time-code"
            required
            className="input-brut tracking-[0.3em]"
            disabled={inCorso}
          />
        </div>

        {errore && <p className="text-sm font-bold text-rust">{errore}</p>}

        <button type="submit" className="btn mt-2" disabled={inCorso}>
          {inCorso ? "Verifica..." : "Entra"}
        </button>
      </form>
    </div>
  );
}
