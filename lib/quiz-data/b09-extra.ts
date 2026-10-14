import { q, qd, type DomandaGrezza } from "./tipi";

/* Blocco 9: scenari quotidiani e piccoli drammi */
export const B09: DomandaGrezza[] = [
  q("In fila alla cassa, davanti a te una signora conta le monetine:", [
    [
      "Sbuffo così forte che mi sentono dal reparto surgelati",
      -2,
      "Sbuffi come una locomotiva davanti a una signora con le monetine: la fila ti ha già condannato.",
    ],
    ["Guardo l’orologio e il telefono, in alternanza", -1],
    ["Le sorrido e aspetto, perché prima o poi tocca a tutti", 1],
    [
      "La aiuto a contare le monetine e le racconto la mia giornata",
      2,
      "Aiuti la signora a contare e le racconti la giornata: lei ha pagato in fretta, per scappare.",
    ],
  ]),
  qd("Il tuo animale domestico:", [
    [
      "Un cane da guardia che si chiama Rambo e non si fa accarezzare",
      -2,
      "Il tuo cane si chiama Rambo e non si fa accarezzare: ha preso il carattere dal suo padrone.",
    ],
    ["Un gatto: non chiede niente e non disturba", -1],
    ["Non ho animali, ma parlo con le piante come fossero cuccioli", 0],
    ["Gli parlo come a una persona, con tono dolce e gesti lenti", 1],
    [
      "Ha un guardaroba, un profilo Instagram e una festa di compleanno a tema",
      2,
      "Il tuo animale ha un guardaroba e una festa a tema: mangia crocchette ma vive meglio di te.",
    ],
  ]),
  q("La sveglia al mattino:", [
    [
      "Mi alzo al primo squillo come un soldato e odio chi dorme",
      -2,
      "Ti alzi al primo squillo e odi chi dorme: per te la domenica è un’offesa personale.",
    ],
    ["Cinque snooze, poi la vergogna", -1],
    ["Una sveglia dolce col suono delle onde", 1],
    [
      "Luce progressiva e playlist del buongiorno che ho studiato",
      2,
      "La tua sveglia ha una playlist studiata: ti svegli meglio del sole, che ci prova da milioni di anni.",
    ],
  ]),
  q("Un amico ti chiede di aiutarlo a traslocare:", [
    [
      "Porto io il frigo, da solo, per far vedere come si fa",
      -2,
      "Porti il frigo da solo per farti vedere: la tua schiena ti manda già la parcella.",
    ],
    ["Vengo, ma solo per la pizza finale", -1],
    ["Porto cartoni e scotch e imballo con cura", 1],
    [
      "Imballo la sua vita in scatole etichettate per stanza e per umore",
      2,
      "Etichetti le scatole per stanza e per umore: il tuo amico si trasferisce meglio di come viveva.",
    ],
  ]),
  q("Un regalo di Natale che non ti piace:", [
    ["Lo dico subito: “Che cos’è questa roba?”", -2],
    ["Sorrido e lo rivendo online la settimana dopo", -1],
    ["Ringrazio con grazia e lo metto in un cassetto", 1],
    [
      "Ringrazio, lo uso subito e mando una foto con scritto “ti penso”",
      2,
      "Usi subito il regalo che non ti piace e mandi la foto: sei un santo con un fondo di bugia.",
    ],
  ]),
  q("Cantiere sotto casa, alle sette del mattino:", [
    [
      "Esco in canottiera e li copro di insulti, poi chiedo se serve una mano",
      -2,
      "Esci in canottiera a insultare gli operai: poi aiuti, perché il rispetto vince sempre sul rumore.",
    ],
    ["Faccio finta di niente e mi lamento sui social", -1],
    ["Metto i tappi e un po’ di musica rilassante", 1],
    [
      "Porto loro un caffè e un biglietto con i miei ringraziamenti per il lavoro",
      2,
      "Porti il caffè agli operai con il biglietto di ringraziamento: loro ti hanno già dedicato un canto.",
    ],
  ]),
  q("Il tuo ultimo acquisto online inutile:", [
    [
      "Un attrezzo da cantiere che non userò mai, ma ci voleva",
      -2,
      "Hai comprato l’attrezzo da cantiere che non userai mai: il garage ora ha un trofeo in più.",
    ],
    ["Un gadget per la macchina, con luci incorporate", -1],
    ["Un’altra candela, perché le altre sono già mie amiche", 1],
    [
      "Un diffusore di aromi con app e abbonamento mensile",
      2,
      "Hai l’app per gestire gli aromi e un abbonamento mensile: il tuo salotto ha un servizio clienti.",
    ],
  ]),
];
