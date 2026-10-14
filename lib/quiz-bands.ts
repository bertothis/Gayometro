/*
  Le dieci fasce di risultato del quiz, con titoli comici e blocchi di
  profilo pre-scritti. Registro 1.1: si ride dell'ansia da mascolinita'
  e dei comportamenti di chi gioca, mai delle persone omosessuali.
  Ogni fascia ha cinque righe: il risultato ne mostra tre, ruotando per
  punteggio, piu' le battute personalizzate sulle risposte date.
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
    max: 9,
    titolo: "Un blocco di granito con la patente",
    righe: [
      "Il tuo profumo è l'olio del motore e la tua skincare è il vento in faccia: gli specchi ti guardano con rispetto e un filo di paura.",
      "Hai la sensibilità di una gru da cantiere e la leggerezza di un cinghiale a un matrimonio.",
      "Il Gayometro ti ha sfiorato con due dita e ha ritirato la mano: scotta di testosterone e di qualcosa che non vuoi chiamare per nome.",
      "Tutti hanno una parte morbida, tu l'hai murata e ci hai messo sopra una griglia da barbecue.",
      "Consiglio medico: un tinto de verano a settimana, con la cannuccia di carta, per prevenire un'esplosione di rabbia.",
    ],
  },
  {
    min: 10,
    max: 19,
    titolo: "Cemento armato con ansia da prestazione",
    righe: [
      "Percentuale da caserma: stretta di mano che frantuma falangi e profumo ufficiale eau de benzina.",
      "La tua skincare è il vento contro, il tuo aperitivo è una presa di corrente.",
      "Nessuno è così etero senza impegnarsi tantissimo, e l'impegno insospettisce parecchio il Gayometro.",
      "Ti sei costruito una corazza così spessa che, per dire ti voglio bene a un amico, hai bisogno di un martello pneumatico.",
      "Concediti un cocktail con l'ombrellino, ogni tanto: la lancetta ha giurato di non dirlo a nessuno.",
    ],
  },
  {
    min: 20,
    max: 29,
    titolo: "Etero da cantiere con qualche spiffero",
    righe: [
      "Fondamenta solide da bar sport, ma la lancetta ha registrato vibrazioni sospette tra la seconda e la terza birra.",
      "Ogni tanto ordini il cocktail col fiore convinto che nessuno se ne accorga: il Gayometro se n'è accorto, e il barista pure.",
      "La playlist segreta con le ballad ti tradisce a ogni semaforo rosso.",
      "Diagnosi: struttura portante intatta, infissi da rivedere, e un cuore che ha il doppio vetro.",
      "Sei un duro con le tue paure, e un tenerone con le tue ciabatte: il Gayometro si commuove, con discrezione.",
    ],
  },
  {
    min: 30,
    max: 39,
    titolo: "Maschio alfa con la crema idratante nascosta",
    righe: [
      "Davanti agli amici parli di motori, davanti allo specchio di siero: il Gayometro ha le prove, e una pazienza infinita.",
      "Dici di non curarti dell'aspetto, ma la tua barba ha un fornitore e il tuo orgoglio una polizza.",
      "Hai un lato morbido, e ogni tanto lo sfoggi con la scusa che è un regalo.",
      "Il tuo bagno ha tre prodotti nascosti dietro il detersivo: hanno un nome e sono più dignitosi di te.",
      "Sei etero con riserva di verifica: la lancetta si è messa seduta, ha preso un tè e ti sta osservando.",
    ],
  },
  {
    min: 40,
    max: 49,
    titolo: "Zona grigia da aperitivo",
    righe: [
      "Equilibrio perfetto: birra media nella mano destra, candela profumata nel carrello.",
      "Sai dire tannico e sai accendere un barbecue: il Gayometro è confuso, affascinato e ha ordinato un amaro.",
      "Sei l'amico che tutti vogliono al tavolo, e nessuno sa dire perché ti metta così a proprio agio.",
      "Verdetto tecnico: bilanciato pericolosamente, come uno spritz fatto bene da un barista nervoso.",
      "Nessuna certezza, solo un sospetto che cresce: la lancetta ondeggia e fa il tifo per tutti.",
    ],
  },
  {
    min: 50,
    max: 59,
    titolo: "Equilibrista del bar sport",
    righe: [
      "Cammini sul filo tra la fiorentina e il matcha latte, e non sei mai caduto: un talento circense sprecato.",
      "Dici di essere flessibile: i tuoi pantaloni, almeno, lo sono, e li stiri anche.",
      "Hai gusto, hai un po' di cuore e un sacco di scuse: il Gayometro ammira la tua organizzazione.",
      "Il tuo tavolo preferito è quello vicino al bagno, perché da lì si vede tutto e nessuno ti nota.",
      "Sei un doppio gioco ben riuscito: il tuo cugino etero ti chiede consigli sulla barba e tu glieli dai con un sorriso.",
    ],
  },
  {
    min: 60,
    max: 69,
    titolo: "Minaccia per l'eteronormatività del bar sport",
    righe: [
      "Percentuale importante: risvoltino calibrato, sopracciglia in ordine e opinioni ferme sui bicchieri da gin.",
      "Al fantacalcio hai messo il muto, al brunch hai messo la sveglia.",
      "Il Gayometro rileva gusto e autostima: una combinazione devastante per il tavolo del bar.",
      "I tuoi vocali durano cinque minuti e sono, obiettivamente, i migliori del gruppo.",
      "I tuoi amici dicono di non capire come fai: tu fai un sorriso, versi il tè e li tieni sotto scacco.",
    ],
  },
  {
    min: 70,
    max: 79,
    titolo: "Ambasciatore del risvoltino",
    righe: [
      "Sei il motivo per cui il barista di fiducia ha imparato a fare gli spritz e a tacere.",
      "Dai consigli di stile a gente che non te li ha chiesti, e quelli, di solito, ringraziano.",
      "Hai una candela per ogni stato d'animo e una playlist per ogni stagione: il Gayometro ha perso il conto e le certezze.",
      "Se esiste una giuria del buon gusto, ti ha già mandato un invito: il tuo outfit fa il resto.",
      "Il tuo gruppo di amici ti ama e ti teme: nessuno ha il coraggio di fotografarti la cena senza il tuo permesso.",
    ],
  },
  {
    min: 80,
    max: 89,
    titolo: "Direttore creativo del gruppo WhatsApp",
    righe: [
      "Organizzi, consigli, correggi e impagini: i tuoi amici hanno smesso di decidere da soli nel 2019.",
      "Quando entri in una stanza, la luce si sistema, la musica si abbassa e qualcuno si scusa per l'outfit.",
      "Hai un piano B per il piano B, una scorta di fazzoletti e un'opinione sul beige: sei un ecosistema.",
      "Il Gayometro ti ha dato il massimo del rispetto, e ha cambiato anche il suo profilo per sembrarti meno inadeguato.",
      "Se la serenità fosse un oggetto, lo sceglieresti con il rivestimento in lino e la giusta temperatura di colore.",
    ],
  },
  {
    min: 90,
    max: 100,
    titolo: "Icona, altro che percentuale",
    righe: [
      "La lancetta ha chiesto un autografo e poi si è seduta a guardare, con un cuscino.",
      "Vivi con la precisione di un colore stagione e la potenza narrativa di un vocale da cinque minuti.",
      "Il quiz è tuo, il bar è tuo, la scena è tua: gli altri sono comparse ben vestite grazie ai tuoi consigli.",
      "Hai una routine in sette passaggi, un ordine nel frigorifero e una moodboard per le emozioni: sei un'istituzione con la crema.",
      "Il Gayometro si inchina e si concede, per festeggiare, un tinto de verano con il ghiaccio a cubo unico.",
    ],
  },
];

export function fasciaPerScore(score: number): FasciaQuiz {
  const fascia = FASCE.find((f) => score >= f.min && score <= f.max);
  return fascia ?? FASCE[FASCE.length - 1];
}

/* Tre righe su cinque, ruotando in modo deterministico col punteggio */
export function righePerScore(score: number, quante = 3): string[] {
  const { righe } = fasciaPerScore(score);
  const inizio = score % righe.length;
  return Array.from({ length: quante }, (_, i) => righe[(inizio + i) % righe.length]);
}
