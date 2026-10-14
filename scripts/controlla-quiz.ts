/*
  Controlli automatici sul banco domande del quiz (npm run quiz:controlla).
  Non giudica se una battuta fa ridere: quello resta a una rilettura umana.
  Verifica struttura, pesi, lunghezze, trattini lunghi, duplicati e parole
  che il registro del sito non ammette.
*/
import { DOMANDE } from "../lib/quiz-questions";

const MAX_OPZIONE = 118;
const MAX_BATTUTA = 105;
const MAX_DOMANDA = 90;
const VIETATE = [
  /\bfrocio\b/i, /\bfinocchio\b/i, /\bcheck+a\b/i, /\bricchione\b/i,
  /\bfemminuccia\b/i, /\bnegro\b/i, /\bzingar/i, /\bhandicappat/i,
  /\bpedofil/i, /\bstupr/i, /\bsuicid/i,
];
const problemi: string[] = [];
const segnala = (id: string, msg: string) => problemi.push(`${id}: ${msg}`);

const testiVisti = new Map<string, string>();
const domandeViste = new Map<string, string>();
let opzioni = 0, battute = 0, decisive = 0;
const perNumeroOpzioni: Record<number, number> = {};
const perPeso: Record<string, number> = {};

for (const d of DOMANDE) {
  const t = d.testo.toLowerCase();
  if (domandeViste.has(t)) segnala(d.id, `domanda duplicata di ${domandeViste.get(t)}`);
  domandeViste.set(t, d.id);
  if (d.testo.length > MAX_DOMANDA) segnala(d.id, `domanda lunga (${d.testo.length})`);
  if (/\b(ultima|chiusura|prima domanda|seconda domanda)\b/i.test(d.testo))
    segnala(d.id, "domanda posizionale (l'ordine e' casuale)");
  if (d.decisiva) decisive++;
  perNumeroOpzioni[d.opzioni.length] = (perNumeroOpzioni[d.opzioni.length] || 0) + 1;
  if (d.opzioni.length < 3 || d.opzioni.length > 5)
    segnala(d.id, `numero di opzioni ${d.opzioni.length}`);

  const pesi = d.opzioni.map((o) => o.peso);
  if (Math.min(...pesi) > -1) segnala(d.id, "nessuna opzione negativa");
  if (Math.max(...pesi) < 1) segnala(d.id, "nessuna opzione positiva");
  if (Math.max(...pesi) - Math.min(...pesi) < 3) segnala(d.id, "spread dei pesi < 3");
  if (new Set(pesi).size !== pesi.length && pesi.length <= 4)
    segnala(d.id, "pesi ripetuti");
  if (!d.opzioni.some((o) => Math.abs(o.peso) === 2)) segnala(d.id, "nessun estremo (+-2)");

  for (const o of d.opzioni) {
    opzioni++;
    perPeso[o.peso] = (perPeso[o.peso] || 0) + 1;
    if (!Number.isInteger(o.peso) || o.peso < -2 || o.peso > 2)
      segnala(d.id, `peso fuori scala: ${o.peso}`);
    if (o.testo.length > MAX_OPZIONE) segnala(d.id, `opzione lunga (${o.testo.length}): ${o.testo}`);
    const k = o.testo.toLowerCase();
    if (testiVisti.has(k)) segnala(d.id, `opzione duplicata (${testiVisti.get(k)}): ${o.testo}`);
    testiVisti.set(k, d.id);
    for (const campo of [o.testo, o.battuta ?? ""]) {
      if (/[—–]/.test(campo)) segnala(d.id, `trattino lungo: ${campo}`);
      if (/ - /.test(campo)) segnala(d.id, `trattino usato come pausa: ${campo}`);
      if (/\s{2,}/.test(campo)) segnala(d.id, `spazi doppi: ${campo}`);
      for (const re of VIETATE) if (re.test(campo)) segnala(d.id, `parola vietata ${re}: ${campo}`);
    }
    if (o.battuta) {
      battute++;
      if (o.battuta.length > MAX_BATTUTA) segnala(d.id, `battuta lunga (${o.battuta.length}): ${o.battuta}`);
      if (Math.abs(o.peso) < 2) segnala(d.id, `battuta su opzione non estrema: ${o.battuta}`);
    }
  }
}
for (const d of DOMANDE) {
  if (d.testo.length > MAX_DOMANDA) continue;
}
const ids = new Set(DOMANDE.map((d) => d.id));
if (ids.size !== DOMANDE.length) segnala("*", "id duplicati");

console.log(`Domande: ${DOMANDE.length} | decisive: ${decisive} | opzioni: ${opzioni} | battute: ${battute}`);
console.log("Opzioni per domanda:", perNumeroOpzioni);
console.log("Pesi:", perPeso);
console.log(problemi.length ? `\n${problemi.length} PROBLEMI:\n` + problemi.join("\n") : "\nNessun problema rilevato.");
process.exitCode = problemi.length ? 1 : 0;
