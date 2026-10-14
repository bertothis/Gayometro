import { CALIBRAZIONE } from "./quiz-calibration";
import { domandaPerId, moltiplicatore } from "./quiz-questions";

/*
  Calcolo del punteggio del quiz, SOLO lato server (e negli script di
  simulazione). Funzioni pure: stessi input, stesso risultato.

  Passi:
  1. punteggio grezzo: somma pesata (le domande decisive pesano il doppio)
     normalizzata tra il minimo e il massimo possibili delle domande servite;
  2. calibrazione: con venti domande i pesi si compensano e quasi tutti
     finirebbero a meta' scala. La tabella (npm run quiz:calibra) rimappa il
     grezzo sulla distribuzione reale dei giocatori, cosi' le dieci fasce
     escono con frequenza simile;
  3. falsa precisione: mai numeri tondi, 67% e non 70%.
*/

export type RispostaData = { domanda: string; opzione: string };

export type Esito = {
  score: number;
  grezzo: number;
  battute: string[];
};

/* Hash deterministico delle risposte, per falsa precisione e spareggi */
export function hashRisposte(risposte: RispostaData[]): number {
  const testo = risposte
    .map((r) => `${r.domanda}:${r.opzione}`)
    .sort()
    .join("|");
  let h = 5381;
  for (let i = 0; i < testo.length; i++) {
    h = (h * 33) ^ testo.charCodeAt(i);
  }
  return h >>> 0;
}

export function calibra(grezzo: number): number {
  const x = Math.max(0, Math.min(100, grezzo));
  const basso = Math.floor(x);
  const alto = Math.min(100, basso + 1);
  const t = x - basso;
  return CALIBRAZIONE[basso] * (1 - t) + CALIBRAZIONE[alto] * t;
}

export function conFalsaPrecisione(score: number, seme: number): number {
  let s = Math.max(1, Math.min(99, Math.round(score)));
  if (s % 5 === 0) {
    const scarto = 1 + (seme % 4);
    s += (seme >> 3) % 2 === 0 ? -scarto : scarto;
    s = Math.max(1, Math.min(99, s));
    if (s % 5 === 0) s += 1;
  }
  return s;
}

/*
  Scelta delle battute da rimandare al giocatore: le risposte con la
  battuta piu' "pesante" (estremo, e doppio se la domanda e' decisiva),
  senza ripetere la stessa domanda. A parita' decide l'hash.
*/
/*
  Formule di ripiego per chi risponde soprattutto con le opzioni "di mezzo",
  che non hanno una battuta scritta: il Gayometro cita comunque la risposta.
*/
const FORMULE = [
  (o: string) => `Hai risposto “${o}”: la lancetta ha avuto un sussulto e poi ha finto di niente.`,
  (o: string) => `“${o}”: il Gayometro lo ha messo a verbale con un sopracciglio alzato.`,
  (o: string) => `Hai scelto “${o}” senza esitare: i tuoi amici lo sapevano già.`,
  (o: string) => `“${o}”: una risposta che dice tutto, e il Gayometro ha preso appunti.`,
];

function pulisci(testo: string): string {
  return testo.replace(/[.!?:;,\s]+$/, "");
}

/*
  Scelta delle battute da rimandare al giocatore: le risposte con la
  battuta piu' "pesante" (estremo, e doppio se la domanda e' decisiva),
  senza ripetere la stessa domanda. A parita' decide l'hash. Se le battute
  scritte non bastano, si completa con le formule di ripiego sulle altre
  risposte piu' nette.
*/
function sceltaBattute(risposte: RispostaData[], quante: number): string[] {
  const seme = hashRisposte(risposte);
  const scritte: Array<{ battuta: string; forza: number }> = [];
  const ripiego: Array<{ testo: string; forza: number }> = [];
  risposte.forEach((r, i) => {
    const domanda = domandaPerId(r.domanda);
    const opzione = domanda?.opzioni.find((o) => o.id === r.opzione);
    if (!domanda || !opzione) return;
    const spareggio = ((seme >> (i % 16)) & 1) * 0.1 + (i % 7) * 0.01;
    const forza = Math.abs(opzione.peso) * moltiplicatore(domanda) + spareggio;
    if (opzione.battuta) scritte.push({ battuta: opzione.battuta, forza });
    else ripiego.push({ testo: opzione.testo, forza });
  });
  const scelte = scritte
    .sort((a, b) => b.forza - a.forza)
    .slice(0, quante)
    .map((c) => c.battuta);
  const mancanti = quante - scelte.length;
  if (mancanti > 0) {
    ripiego
      .sort((a, b) => b.forza - a.forza)
      .slice(0, mancanti)
      .forEach((c, i) => {
        const formula = FORMULE[(seme + i) % FORMULE.length];
        scelte.push(formula(pulisci(c.testo)));
      });
  }
  return scelte;
}

export function punteggioGrezzo(risposte: RispostaData[]): number | null {
  let somma = 0;
  let minimo = 0;
  let massimo = 0;
  for (const r of risposte) {
    const domanda = domandaPerId(r.domanda);
    const opzione = domanda?.opzioni.find((o) => o.id === r.opzione);
    if (!domanda || !opzione) return null;
    const m = moltiplicatore(domanda);
    const pesi = domanda.opzioni.map((o) => o.peso * m);
    somma += opzione.peso * m;
    minimo += Math.min(...pesi);
    massimo += Math.max(...pesi);
  }
  return massimo === minimo ? 50 : ((somma - minimo) / (massimo - minimo)) * 100;
}

export function calcolaEsito(risposte: RispostaData[]): Esito | null {
  const grezzo = punteggioGrezzo(risposte);
  if (grezzo === null) return null;
  const score = conFalsaPrecisione(calibra(grezzo), hashRisposte(risposte));
  return { score, grezzo, battute: sceltaBattute(risposte, 2) };
}
