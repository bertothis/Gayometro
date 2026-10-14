/*
  Calibrazione del punteggio del quiz (npm run quiz:calibra).

  Con venti domande a pesi simmetrici le risposte si compensano: quasi tutti
  finiscono a meta' scala e le fasce estreme, le piu' condivisibili, non
  escono mai. Qui simuliamo migliaia di giocatori sul banco domande reale,
  costruiamo la distribuzione del punteggio grezzo e scriviamo in
  lib/quiz-calibration.ts la tabella che la rimappa in modo uniforme:
  ogni decimo di scala (cioe' ogni fascia) diventa ugualmente probabile.

  Il giocatore simulato ha un tratto latente t (quanto e' "curato") e una
  coerenza k (quanto le risposte seguono il tratto). Le risposte sono
  estratte con probabilita' proporzionale a exp(k * t * peso). Si mescolano
  tre livelli di coerenza per non tarare tutto su un solo tipo di giocatore.
  Va rilanciato ogni volta che cambiano domande o pesi.
*/
import { writeFileSync } from "node:fs";
import { DOMANDE, moltiplicatore } from "../lib/quiz-questions";

function prng(seme: number) {
  return () => {
    seme |= 0;
    seme = (seme + 0x6d2b79f5) | 0;
    let t = Math.imul(seme ^ (seme >>> 15), 1 | seme);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(r: () => number) {
  return Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r());
}

function simula(partite: number, k: number, sigma: number, r: () => number): number[] {
  const grezzi: number[] = [];
  for (let n = 0; n < partite; n++) {
    const t = gauss(r) * sigma;
    const mazzo = [...DOMANDE];
    for (let i = mazzo.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [mazzo[i], mazzo[j]] = [mazzo[j], mazzo[i]];
    }
    let somma = 0, minimo = 0, massimo = 0;
    for (const d of mazzo.slice(0, 20)) {
      const m = moltiplicatore(d);
      const pesi = d.opzioni.map((o) => o.peso * m);
      const w = d.opzioni.map((o) => Math.exp(k * t * o.peso));
      const tot = w.reduce((a, b) => a + b, 0);
      let x = r() * tot, scelta = 0;
      for (let i = 0; i < w.length; i++) { x -= w[i]; if (x <= 0) { scelta = i; break; } }
      somma += pesi[scelta];
      minimo += Math.min(...pesi);
      massimo += Math.max(...pesi);
    }
    grezzi.push(((somma - minimo) / (massimo - minimo)) * 100);
  }
  return grezzi;
}

const SIGMA = 1.1;
const LIVELLI = [0.35, 0.65, 0.95];
const N = 120_000;

const r = prng(20261014);
const tutti = LIVELLI.flatMap((k) => simula(N, k, SIGMA, r)).sort((a, b) => a - b);

/* CDF empirica campionata a 0..100, poi resa monotona e liscia */
const tabella: number[] = [];
let puntatore = 0;
for (let x = 0; x <= 100; x++) {
  while (puntatore < tutti.length && tutti[puntatore] <= x + 0.5) puntatore++;
  tabella.push((puntatore / tutti.length) * 100);
}
for (let i = 1; i < tabella.length; i++) tabella[i] = Math.max(tabella[i], tabella[i - 1]);
const liscia = tabella.map((_, i) => {
  const a = Math.max(0, i - 2), b = Math.min(100, i + 2);
  let s = 0;
  for (let j = a; j <= b; j++) s += tabella[j];
  return s / (b - a + 1);
});
const finale = liscia.map((v, i) => Math.round(Math.max(i > 0 ? 0 : 0.5, Math.min(99.5, v)) * 100) / 100);

writeFileSync(
  "lib/quiz-calibration.ts",
  `/*
  File generato da \`npm run quiz:calibra\`: non modificarlo a mano.
  Indice = punteggio grezzo (0..100), valore = punteggio finale.
  Generato su ${DOMANDE.length} domande (${DOMANDE.filter((d) => d.decisiva).length} decisive).
*/
export const CALIBRAZIONE: number[] = ${JSON.stringify(finale)};
`
);

/* Verifica: distribuzione per fascia con diverse coerenze del giocatore */
function fascia(x: number) {
  const t = finale[Math.max(0, Math.min(100, Math.round(x)))];
  return Math.min(9, Math.floor(t / 10));
}
console.log(`Banco: ${DOMANDE.length} domande. Tabella scritta in lib/quiz-calibration.ts\n`);
console.log("Distribuzione per fascia (% dei giocatori), 10 fasce da 10 punti:");
for (const [nome, k, sigma] of [
  ["casuale (k=0)", 0, 1],
  ["incoerente (k=0.3)", 0.3, SIGMA],
  ["medio (k=0.7)", 0.7, SIGMA],
  ["coerente (k=1.2)", 1.2, SIGMA],
  ["estremo (k=2)", 2, SIGMA],
] as const) {
  const g = simula(30_000, k, sigma, prng(7 + Math.round(k * 10)));
  const bins = new Array(10).fill(0);
  g.forEach((x) => bins[fascia(x)]++);
  console.log(
    nome.padEnd(20),
    bins.map((b) => ((b / g.length) * 100).toFixed(0).padStart(3)).join(" ")
  );
}
