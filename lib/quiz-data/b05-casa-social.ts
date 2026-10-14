import { q, qd, type DomandaGrezza } from "./tipi";

/* Blocco 5: casa, oggetti, telefono, social */
export const B05: DomandaGrezza[] = [
  qd("Casa tua è:", [
    [
      "Un campo base: un letto, un frigo e la tendenza a non pensarci",
      -2,
      "Chiami casa tua un campo base: i tuoi ospiti entrano con l’antitetanica.",
    ],
    ["Arredata dall’Ikea, per fretta e per rassegnazione", -1],
    ["Arredata con un minimo di gusto, ma senza ansia", 1],
    [
      "Arredata con intenzione, con luci calde, texture e una moodboard dedicata",
      2,
      "Hai arredato casa con una moodboard: ogni cuscino è stato interrogato e ha ammesso tutto.",
    ],
    ["Un po’ mia e un po’ di mia madre, che viene a sistemare", 0],
  ]),
  q("Le piante in casa:", [
    ["Sopravvive solo il cactus, a stento e per puro spregio", -2],
    ["Una pianta finta, che almeno non muore", -1],
    ["Un ficus con il nome, e un po’ di senso di colpa", 1],
    [
      "Una serra da appartamento, con un calendario dell’irrigazione e un impianto di luci",
      2,
      "Calendario d’irrigazione per le piante: la serra ha un orario più regolare dei tuoi amici.",
    ],
  ]),
  q("Le candele profumate:", [
    [
      "Uno spreco di soldi, e il fuoco è per i focolari",
      -2,
      "Dici che le candele sono uno spreco: poi ne annusi una al mercato e ti commuovi.",
    ],
    ["Le uso solo quando salta la corrente", -1],
    ["Un paio in salotto, accese solo quando ho ospiti da impressionare", 1],
    [
      "Una per ogni stanza, con nomi tipo “Tramonto a Positano”",
      2,
      "Hai una candela per stanza con il nome di una località: la tua casa ha una vacanza fissa.",
    ],
  ]),
  q("Le lucine in camera:", [
    ["Roba da adolescenti, non fanno per me", -2],
    ["Una lampadina nuda, che ci vede abbastanza", -1],
    ["Un po’ d’atmosfera non guasta, soprattutto d’inverno", 1],
    [
      "Calde, dimmerabili, con il telecomando e una scena per ogni umore",
      2,
      "Hai le lucine con il telecomando e le scene per l’umore: la tua camera ha più stati d’animo di te.",
    ],
  ]),
  q("L’Ikea con gli amici:", [
    ["Entro, prendo i tasselli ed esco, senza guardare nessuno", -2],
    ["Un giro tranquillo, senza impazzire", -1],
    ["Il giro classico: mobili, qualcosa di decor, le polpette", 1],
    [
      "È una gita: polpette, candele, lista dei desideri condivisa e un piano B",
      2,
      "L’Ikea è una gita: ne esci con la lista dei desideri e tre candele.",
    ],
  ]),
  q("Il tuo divano:", [
    ["Quello della nonna, con la fodera di plastica, intatto dal ’85", -2],
    ["Un divano comodo, con il plaid e il cuscino giusto", 1],
    [
      "Un divano modulare con i cuscini in velluto e un plaid per ogni stagione",
      2,
      "Hai un plaid per ogni stagione: il tuo divano ha più guardaroba di molti uomini.",
    ],
  ]),
  q("Gli asciugamani in bagno:", [
    ["Quello che ho, lo scambio quando si strappa", -2],
    ["Una pila di spugne grigie, dello stesso colore, per non pensare", -1],
    ["Un set coordinato, in colori neutri, perché il caos mi disorienta", 1],
    [
      "Ne ho di tre misure, in cotone egiziano, e li piego con il logo in vista",
      2,
      "Cotone egiziano col logo in vista: gli ospiti non osano toccarlo, e tu li guardi commosso.",
    ],
  ]),
  q("Il letto, al mattino:", [
    [
      "Lo lascio com’è: tanto stasera lo rifaccio",
      -2,
      "Lasci il letto com’è: dorme già da solo, anche senza di te.",
    ],
    ["Tiro su il piumone e lo chiamo rifatto", -1],
    ["Lo rifaccio, perché mi mette in ordine anche la giornata", 1],
    [
      "Lo rifaccio con gli angoli a busta, i cuscini in fila e un plaid piegato ai piedi",
      2,
      "Rifai il letto con gli angoli a busta come in un hotel: sei l’unico a dormire in un set.",
    ],
  ]),
  q("La tazza della colazione:", [
    ["Una vale l’altra, non ci penso", -2],
    ["Ho la mia tazza, ma la condivido senza rancore", 1],
    [
      "Ho LA tazza, e guai a chi la tocca",
      2,
      "Hai LA tazza: se una persona ti spezza il cuore, almeno la tazza non ti tradirà.",
    ],
  ]),
  q("La raccolta differenziata:", [
    ["Più o meno, faccio quel che posso, con qualche errore", -2],
    ["Ci provo, ma mi confondo con la plastica", -1],
    ["Abbastanza attento: sbaglio solo col tetrapak e mi rimprovero", 1],
    [
      "Rigore svizzero, i contenitori etichettati a mano e una tabella appesa in cucina",
      2,
      "Contenitori etichettati a mano: la spazzatura ha una gerarchia, e tu sei il papa.",
    ],
  ]),
  q("Le pulizie di casa:", [
    ["Una volta al mese, e solo se arriva qualcuno", -2],
    ["Una passata al pavimento ogni tanto, se mi ricordo", -1],
    ["Una volta a settimana, con la musica e un po’ di sudore", 1],
    [
      "Con un programma settimanale, i guanti coordinati e una playlist d’epoca",
      2,
      "Guanti coordinati per le pulizie: la polvere, a casa tua, ha un dress code.",
    ],
  ]),
  q("Lo schermo del tuo telefono:", [
    ["Crepato da mesi, e funziona uguale, anzi meglio", -2],
    ["Una crepa piccola, ci convivo", -1],
    ["Con la pellicola, perché sono un adulto con un piano", 1],
    [
      "Pellicola perfetta e cover coordinata al mese in corso",
      2,
      "Cambi la cover del telefono ogni mese: il tuo cellulare ha più stagioni di una serie tv.",
    ],
  ]),
  q("La foto profilo:", [
    ["La stessa dal 2016: funziona ancora, e poi chi mi guarda", -2],
    ["Non ho la foto: ho solo l’iniziale del nome", -1],
    ["Cambiata ogni tanto, senza troppa cura", 1],
    [
      "Aggiornata a ogni stagione, con direzione creativa e un fotografo amico",
      2,
      "Aggiorni la foto profilo a ogni stagione con un fotografo: sei il tuo ufficio stampa.",
    ],
  ]),
  q("Le tue storie su Instagram:", [
    ["Non esisto sui social: se mi cerchi, vieni a casa", -2],
    ["Faccio il repost dei meme, il contenuto è quello degli altri", -1],
    ["Qualche foto ogni tanto, senza pensarci", 1],
    [
      "Tramonti con il font scelto a mano e la musica giusta in sottofondo",
      2,
      "Metti il tramonto con il font scelto a mano: il sole, per fortuna, non chiede i diritti.",
    ],
  ]),
  q("La tua emoji più usata:", [
    ["Il pollice in su, e via, che il tempo è denaro", -2],
    ["La faccina che piange dal ridere, ad ogni battuta", -1],
    ["Le mani che pregano, per ogni occasione", 0],
    [
      "I cuoricini, coordinati per colore al messaggio",
      2,
      "Cuoricini coordinati al colore del messaggio: anche l’emoji ti deve un ringraziamento.",
    ],
  ]),
  qd("I vocali su WhatsApp:", [
    [
      "Mai: se è importante, chiamo, e se è importante poco, non scrivo",
      -2,
      "Dici che i vocali non esistono: nessuno ti manda più messaggi, hanno paura della risposta.",
    ],
    ["Rispondo con le emoji, risparmio fiato", -1],
    ["Corti e al punto, senza fronzoli", 1],
    [
      "Da cinque minuti, con premessa, colpo di scena e morale finale",
      2,
      "Vocali da cinque minuti con la morale finale: sei un podcast con un solo ascoltatore, che non ascolta.",
    ],
    ["Li ascolto a velocità doppia, per non perdere tempo", 0],
  ]),
  q("Il tuo Spotify Wrapped:", [
    ["Non lo guardo nemmeno: i fatti miei restano miei", -2],
    ["Lo guardo e basta, senza condividerlo", -1],
    ["Lo mostro solo al mio migliore amico, per una risata", 0],
    [
      "Lo impagino e lo commento pubblicamente, artista per artista",
      2,
      "Commenti il Wrapped artista per artista: sei un critico musicale che nessuno ha assunto.",
    ],
  ]),
  q("Le playlist condivise:", [
    ["Mai fatta una: ognuno ascolti la sua", -2],
    ["Una, buttata giù in fretta e furia", -1],
    ["Un paio, aggiornate ogni tanto, con qualche amico", 1],
    [
      "Ne curo tre, con la copertina e il titolo studiati",
      2,
      "Playlist con la copertina studiata: le tue canzoni hanno un ufficio stampa.",
    ],
  ]),
  q("Il telefono in silenzioso:", [
    ["Sempre acceso a tutto volume, e con la suoneria che rimbomba", -2],
    ["In vibrazione, perché sono mica un animale", -1],
    ["In silenzioso, con qualche eccezione per i miei cari", 1],
    [
      "In modalità non disturbare, con una lista di eccezioni calibrata al minuto",
      2,
      "Eccezioni calibrate al minuto per il non disturbare: persino il silenzio ha un regolamento.",
    ],
  ]),
  qd("I selfie:", [
    [
      "Mai fatto uno in vita mia",
      -2,
      "Dici di non aver mai fatto un selfie: anche lo specchio sa che la tua galleria ne è piena.",
    ],
    ["Solo di gruppo, in fondo, mai da protagonista", -1],
    ["Ogni tanto, se la luce è buona", 1],
    [
      "Conosco il mio lato migliore e la mia luce naturale, e li cerco in ogni stanza",
      2,
      "Conosci il tuo lato migliore e lo cerchi in ogni stanza: un fotografo con un solo modello.",
    ],
  ]),
  q("Lo sfondo del telefono:", [
    ["Quello di fabbrica, che non lo cambio nemmeno morto", -2],
    ["Una macchina o un motorino, di quelli che vorrei", -1],
    ["Un paesaggio, perché mi rilassa", 1],
    [
      "Una foto di me che sorrido, con un filtro che mi dà un tono più dorato",
      2,
      "La tua faccia sullo sfondo del telefono: ogni volta che lo sblocchi, ti saluti da solo.",
    ],
  ]),
  q("Le app di benessere sul tuo telefono:", [
    ["Nessuna: il benessere è una scusa per vendermi qualcosa", -2],
    ["Un contapassi che non uso mai", -1],
    ["Una di meditazione, che apro quando sono in crisi", 1],
    [
      "Cinque: sonno, respiro, cicli, idratazione e un diario della gratitudine",
      2,
      "Un’app per il respiro e una per l’idratazione: sei sano, ma il telefono ti segue più di tutti.",
    ],
  ]),
  q("La tua agenda:", [
    ["Tutto a memoria: funziona da sempre, tranne quando non funziona", -2],
    ["Un promemoria sul telefono, il minimo indispensabile", -1],
    ["Un’agenda cartacea, con una penna che non presto a nessuno", 1],
    [
      "Un planner con i colori per categoria e gli adesivi a tema",
      2,
      "Adesivi a tema sull’agenda: pianifichi persino il tempo libero con l’estetica di un cartone.",
    ],
  ]),
  q("Il portafoglio:", [
    ["Una tasca dei jeans con un elastico, che sembra una sorpresa", -2],
    ["Un portafoglio di pelle consumata, con le ricevute del 2018", -1],
    ["Un portafoglio sottile, con le carte in ordine", 1],
    [
      "Un cardholder minimal con l’iniziale incisa e una carta per ogni occasione",
      2,
      "Iniziale incisa sul cardholder: i tuoi soldi hanno un indirizzo e un nome.",
    ],
  ]),
  q("Le cuffie:", [
    ["Quelle del telefono, a filo, aggrovigliate dal 2017", -2],
    ["Un paio economico, che regge fino a quando si rompe", -1],
    ["Le cuffie senza fili, e la paura costante di perderne una", 1],
    [
      "Cuffie con cancellazione del rumore, perché non voglio sentire né il mondo né i problemi",
      2,
      "Cancellazione del rumore attiva: non senti il mondo, e nemmeno i tuoi sensi di colpa.",
    ],
  ]),
  q("Nelle mail, la tua firma:", [
    ["Nessuna: un “saluti” e passa la paura", -2],
    ["Un “cordiali saluti” standard, senza un nome di battesimo", -1],
    ["Nome, cognome, ruolo e un “cordialmente” su cui rifletto moltissimo", 1],
    [
      "Un logo, una citazione e un “inviato da un dispositivo con un sentimento”",
      2,
      "Una citazione nella firma della mail: il tuo contabile ha chiesto una pausa.",
    ],
  ]),
  q("Nelle chat di gruppo, tu sei:", [
    ["Quello che manda un meme e sparisce per tre giorni", -2],
    ["Quello che legge tutto e non risponde mai", -1],
    ["Quello che risponde, con una battuta ogni tanto", 1],
    [
      "Quello che organizza tutto, manda i promemoria e rimanda i pollici",
      2,
      "Organizzi tutto nel gruppo e mandi i promemoria: sei la segreteria che nessuno ha assunto.",
    ],
  ]),
  q("Una videochiamata di lavoro:", [
    ["Con la camera spenta, in pigiama, e la fiducia nella voce", -2],
    ["Con la camera accesa, ma dietro ho una pila di panni", -1],
    ["Con lo sfondo sfocato, per essere decente", 1],
    [
      "Con lo scaffale in ordine, una pianta in vista e la luce giusta, come in un set",
      2,
      "Hai uno scaffale in ordine per le videochiamate: è l’unica cosa vera che ti rappresenta.",
    ],
  ]),
];
