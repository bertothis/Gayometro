/*
  Le cinque fasce di risultato del quiz, con titoli comici e blocchi
  di profilo pre-scritti (sezione 6.1 del brief). Registro 1.1: si ride
  dell'ansia da mascolinità, mai delle persone.
*/

export type FasciaQuiz = {
  min: number;
  max: number;
  titolo: string;
  righe: string[];
};

export const FASCE: FasciaQuiz[] = [
  {
    min: 0,
    max: 19,
    titolo: "Cemento armato con ansia da prestazione",
    righe: [
      "Percentuale da caserma: stretta di mano che frantuma falangi e profumo ufficiale eau de benzina.",
      "La tua skincare è il vento contro, il tuo aperitivo è una presa di corrente.",
      "Però attento: nessuno è così etero senza impegnarsi tantissimo, e l'impegno insospettisce il Gayometro.",
      "Concediti un tinto de verano ogni tanto: la lancetta ha giurato di non dirlo a nessuno.",
    ],
  },
  {
    min: 20,
    max: 39,
    titolo: "Etero da cantiere con spifferi",
    righe: [
      "Fondamenta solide da bar sport, ma la lancetta ha registrato vibrazioni sospette.",
      "Ogni tanto ordini il cocktail col fiore convinto che nessuno se ne accorga: il Gayometro se n'è accorto.",
      "La playlist segreta con le ballad ti tradisce ogni singola volta.",
      "Diagnosi: struttura portante intatta, infissi da rivedere.",
    ],
  },
  {
    min: 40,
    max: 59,
    titolo: "Zona grigia da aperitivo",
    righe: [
      "Equilibrio perfetto: birra media nella mano destra, candela profumata nel carrello.",
      "Sai dire tannico e sai accendere un barbecue: il Gayometro è confuso e affascinato.",
      "Sei l'amico che tutti vogliono al tavolo, e la lancetta ondeggia applaudendo.",
      "Verdetto tecnico: bilanciato pericolosamente, come lo spritz perfetto.",
    ],
  },
  {
    min: 60,
    max: 79,
    titolo: "Minaccia per l'eteronormatività del bar sport",
    righe: [
      "Percentuale importante: risvoltino calibrato, sopracciglia in ordine e opinioni ferme sui bicchieri da gin.",
      "Al fantacalcio hai messo il muto, al brunch hai messo la sveglia.",
      "Il Gayometro rileva gusto e autostima: combinazione devastante per il tavolo del bar.",
      "I tuoi vocali durano cinque minuti e sono, obiettivamente, i migliori del gruppo.",
    ],
  },
  {
    min: 80,
    max: 100,
    titolo: "Icona, altro che percentuale",
    righe: [
      "La lancetta ha chiesto un autografo e poi si è seduta a guardare.",
      "Vivi con la precisione di un colore stagione e la potenza narrativa di un vocale da cinque minuti.",
      "Il quiz è tuo, il bar è tuo, la scena è tua: gli altri sono comparse ben vestite grazie ai tuoi consigli.",
      "Il Gayometro si inchina e si concede, per festeggiare, un tinto de verano.",
    ],
  },
];

export function fasciaPerScore(score: number): FasciaQuiz {
  const fascia = FASCE.find((f) => score >= f.min && score <= f.max);
  return fascia ?? FASCE[FASCE.length - 1];
}
