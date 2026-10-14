/*
  Tipi e costruttori del banco domande del quiz.

  Ogni opzione e' [testo, peso, battuta?]. Il peso va da -2 a +2 secondo la
  logica assurda del bar: stoicismo e trascuratezza abbassano, cura, gusto
  ed espansivita' alzano. La battuta e' la riga cattiva che il risultato
  puo' rimandare indietro al giocatore ("hai scelto X: ..."): solo sulle
  opzioni estreme, sempre in seconda persona, mai contro persone reali o
  contro le persone omosessuali. Il bersaglio e' il comportamento.

  qd() segna una domanda "decisiva": pesa il doppio nel punteggio.
*/

export type OpzioneGrezza = [testo: string, peso: number, battuta?: string];

export type DomandaGrezza = {
  testo: string;
  opzioni: OpzioneGrezza[];
  decisiva: boolean;
};

export function q(testo: string, opzioni: OpzioneGrezza[]): DomandaGrezza {
  return { testo, opzioni, decisiva: false };
}

export function qd(testo: string, opzioni: OpzioneGrezza[]): DomandaGrezza {
  return { testo, opzioni, decisiva: true };
}
