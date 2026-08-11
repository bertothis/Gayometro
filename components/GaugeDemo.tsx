"use client";

import { useEffect, useState } from "react";
import Gauge from "@/components/Gauge";

/*
  Anteprima animata del misuratore per la home: cicla qualche verdetto
  di esempio in attesa che l'utente scriva la sua frase.
*/
const DEMO: Array<{ percent: number; label: string }> = [
  { percent: 81, label: "fumare la sigaretta elettronica" },
  { percent: 12, label: "bere whisky liscio" },
  { percent: 74, label: "bere la birra al limone" },
  { percent: 23, label: "profumo cupo e legnoso" },
];

export default function GaugeDemo() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % DEMO.length), 2600);
    return () => clearInterval(id);
  }, []);

  const item = DEMO[i];

  return (
    <div className="flex flex-col items-center gap-3">
      <Gauge percent={item.percent} className="w-56 sm:w-64" />
      <p className="pixel-label text-3xl font-bold" aria-live="polite">
        {item.percent}%
      </p>
      <p className="text-sm italic text-ink/70">&ldquo;{item.label}&rdquo;</p>
    </div>
  );
}
