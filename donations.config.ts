/*
  Interruttori dei tre touchpoint di donazione (sezione 9.1 del brief).
  Ognuno si attiva o spegne singolarmente. Il link di donazione arriva
  dalla env NEXT_PUBLIC_DONATION_URL: se manca, nessun touchpoint appare.
*/
export const DONAZIONI = {
  interstitial: true, // schermata pre risultato del quiz
  slideIn: true, // card non bloccante 10 secondi dopo il risultato
  postDownload: true, // modale dopo il download dell'immagine
} as const;

export type Touchpoint = keyof typeof DONAZIONI;
