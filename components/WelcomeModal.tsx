"use client";

import { useEffect, useRef, useState } from "react";

const CHIAVE_BENVENUTO = "gm_benvenuto_visto";

/*
  Primo popup visto da chiunque arrivi sul sito: chiarisce il tono satirico
  prima di tutto il resto, senza alcuna richiesta di donazione. Un solo
  pulsante, non si ripresenta nella stessa sessione (sessionStorage).
*/
export default function WelcomeModal() {
  const [visibile, setVisibile] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (window.sessionStorage.getItem(CHIAVE_BENVENUTO)) return;
    rafRef.current = requestAnimationFrame(() => setVisibile(true));
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function chiudi() {
    window.sessionStorage.setItem(CHIAVE_BENVENUTO, "1");
    setVisibile(false);
  }

  if (!visibile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titolo-benvenuto"
        className="card flex w-full max-w-md flex-col items-center gap-4 px-6 py-8 text-center"
      >
        <p className="pixel-label text-xs uppercase text-rust">
          Prima di entrare
        </p>
        <h2 id="titolo-benvenuto" className="font-display text-2xl font-black">
          Qui non si misura nessuno sul serio
        </h2>
        <p className="text-sm">
          Il Gayometro prende in giro l&rsquo;ansia da mascolinità, mai le
          persone gay. Percentuali finte e verdetti finti su abitudini e
          oggetti, mai su persone reali. Usalo per ridere con il gruppo, non
          per fare sul serio.
        </p>
        <button type="button" onClick={chiudi} className="btn mt-2 w-full">
          Ho capito, lasciami prendere ora per il culo il mio bro
        </button>
      </div>
    </div>
  );
}
