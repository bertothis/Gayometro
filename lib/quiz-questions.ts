import { B01 } from "./quiz-data/b01-bere";
import { B02 } from "./quiz-data/b02-corpo";
import { B03 } from "./quiz-data/b03-vestiti";
import { B04 } from "./quiz-data/b04-cibo";
import { B05 } from "./quiz-data/b05-casa-social";
import { B06 } from "./quiz-data/b06-relazioni";
import { B07 } from "./quiz-data/b07-sport-viaggi";
import { B08 } from "./quiz-data/b08-pop-assurdi";
import { B09 } from "./quiz-data/b09-extra";
import type { DomandaGrezza } from "./quiz-data/tipi";

/*
  Banco delle domande del quiz "Quanto sei gay?". Ogni partita ne pesca 20
  a caso. Zero chiamate AI: costi zero.

  Registro comico (sezione 1.1 del brief): il bersaglio e' l'ansia da
  maschio alfa e l'assurdita' di misurare queste cose, mai le persone
  omosessuali. Nella logica assurda del bar, prudenza, gusto e cura
  alzano la percentuale; stoicismo e trascuratezza la abbassano.

  I pesi (-2..+2) restano SOLO lato server: il client riceve domande e
  opzioni senza pesi, il punteggio si calcola in /api/quiz/risultato.
  Le domande "decisive" (qd) pesano il doppio. Le battute servono al
  risultato per rimandare indietro al giocatore le sue risposte piu' nette.

  Gli id si assegnano per posizione: aggiungi nuovi blocchi IN CODA e non
  riordinare, o cambia il prefisso (le partite in corso con id vecchi
  falliscono con "Domanda sconosciuta" invece di essere pesate male).
*/

const PREFISSO_ID = "n";

export type OpzioneQuiz = {
  id: string;
  testo: string;
  peso: number;
  battuta?: string;
};

export type DomandaQuiz = {
  id: string;
  testo: string;
  opzioni: OpzioneQuiz[];
  decisiva: boolean;
};

const BLOCCHI: DomandaGrezza[][] = [B01, B02, B03, B04, B05, B06, B07, B08, B09];

export const DOMANDE: DomandaQuiz[] = BLOCCHI.flat().map((domanda, i) => ({
  id: `${PREFISSO_ID}${String(i + 1).padStart(3, "0")}`,
  testo: domanda.testo,
  decisiva: domanda.decisiva,
  opzioni: domanda.opzioni.map(([testo, peso, battuta], j) => ({
    id: String.fromCharCode(97 + j),
    testo,
    peso,
    battuta,
  })),
}));

const INDICE = new Map(DOMANDE.map((domanda) => [domanda.id, domanda]));

export function domandaPerId(id: string): DomandaQuiz | undefined {
  return INDICE.get(id);
}

/* Quanto pesa la domanda nel punteggio: le decisive contano il doppio */
export function moltiplicatore(domanda: DomandaQuiz): number {
  return domanda.decisiva ? 2 : 1;
}

/* Versione senza pesi da mandare al client */
export type DomandaServita = {
  id: string;
  testo: string;
  opzioni: Array<{ id: string; testo: string }>;
};

function mescola<T>(elementi: T[]): T[] {
  const copia = [...elementi];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/*
  Pesca le domande e mescola anche l'ordine delle opzioni: senza, la
  risposta "macho" stava sempre in cima e la "curata" in fondo, quindi
  barare era banale. Gli id delle opzioni restano legati al testo.
*/
export function pescaDomande(quante = 20): DomandaServita[] {
  return mescola(DOMANDE)
    .slice(0, quante)
    .map((domanda) => ({
      id: domanda.id,
      testo: domanda.testo,
      opzioni: mescola(domanda.opzioni).map(({ id, testo }) => ({ id, testo })),
    }));
}
