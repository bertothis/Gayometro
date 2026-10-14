/*
  Blocklist locale: filtro di protezione che scatta PRIMA della chiamata AI
  (sezione 4.4 del brief). Contiene solo termini inequivocabili: slur,
  insulti gravi, sesso esplicito, riferimenti a minori e violenza sessuale.

  Le parole ambigue restano fuori apposta e le giudica l'AI col contesto:
  "finocchio" e' anche un ortaggio, "sega" un attrezzo, "scopare" si fa
  anche col pavimento, "checca" e' un diminutivo di Francesca.

  La decisione contestuale (nomi propri, attacchi a gruppi, doppi sensi)
  spetta al modello, che ha le regole di sicurezza nel prompt di sistema.
*/

/* Parole bloccate nella forma esatta (token interi, testo normalizzato) */
const PAROLE_ESATTE = new Set<string>([
  // slur omofobi in italiano
  "frocio",
  "froci",
  "frocia",
  "frocie",
  "frocione",
  "frocioni",
  "ricchione",
  "ricchioni",
  "ricchiona",
  "culattone",
  "culattoni",
  "busone",
  "busoni",
  // slur razzisti in italiano (forme esatte per evitare falsi positivi
  // tipo "negromante")
  "negro",
  "negra",
  "negri",
  "negre",
  "zingaro",
  "zingara",
  "zingari",
  "zingare",
  "mongoloide",
  "mongoloidi",
  // sesso esplicito, forme inequivocabili
  "pompino",
  "pompini",
  "ditalino",
  "ditalini",
  "inculare",
  "inculata",
  "inculato",
  "inculati",
  // slur e insulti gravi in inglese
  "faggot",
  "faggots",
  "fag",
  "fags",
  "tranny",
  "trannies",
  "cunt",
  "cunts",
  "kike",
  // "spic" resta fuori: collide con l'espressione italiana "spic e span"
]);

/* Radici bloccate: catturano intere famiglie di parole */
const PREFISSI = [
  "pedofil", // pedofilo, pedofilia...
  "pedoporno", // pedopornografia...
  "stupr", // stupro, stuprare, stupratore...
  "sborr", // sborra, sborrare, sborrata...
  "nigg", // nigger, nigga...
  "retard", // retard, retarded (in inglese e' uno slur)
];

/*
  Riceve la frase GIA' normalizzata (minuscole, spazi collassati) e dice
  se contiene termini vietati. Tokenizza su tutto cio' che non e' lettera
  o cifra, accenti inclusi tra le lettere.
*/
export function contieneTermineVietato(testoNormalizzato: string): boolean {
  const token = testoNormalizzato.split(/[^a-z0-9àèéìòùáíóúäöüçñ]+/u);
  for (const t of token) {
    if (!t) continue;
    if (PAROLE_ESATTE.has(t)) return true;
    for (const prefisso of PREFISSI) {
      if (t.startsWith(prefisso)) return true;
    }
  }
  return false;
}
