import { q, qd, type DomandaGrezza } from "./tipi";

/* Blocco 8: cultura pop, musica, scenari assurdi, domande meta */
export const B08: DomandaGrezza[] = [
  qd("Le serie tv:", [
    [
      "Solo documentari di guerra e di motori, con la voce fuori campo",
      -2,
      "Guardi solo documentari di guerra: nemmeno il telecomando ti guarda negli occhi.",
    ],
    ["Guardo quello che capita, senza fissarmi", -1],
    ["Ho pianto per una serie, e lo ammetto pubblicamente", 1],
    [
      "Ho un podcast di approfondimento sulla serie che sto guardando",
      2,
      "Ascolti un podcast per capire la serie che guardi: hai bisogno di un traduttore per i sentimenti.",
    ],
    ["Quella che guarda il mio amico: a volte capisco la trama", 0],
  ]),
  q("Serie doppiata o in lingua originale?", [
    ["Doppiata, non pago per leggere i sottotitoli", -2],
    ["Dipende dalla serie, sono flessibile", -1],
    ["In lingua originale con i sottotitoli", 1],
    [
      "In lingua originale, ovviamente, sennò perde tutto, e lo dico a chi non me lo ha chiesto",
      2,
      "Dici a tutti che il doppiaggio rovina tutto: il tuo inglese è un passaporto per l’antipatia.",
    ],
  ]),
  q("Al cinema, cosa guardi:", [
    ["Azione, esplosioni e un eroe che non sa dire più di tre parole", -2],
    ["Una commedia con un paio di battute che ricordo a memoria", -1],
    ["Un film d’autore, con un sottotitolo e un finale aperto", 1],
    [
      "Una storia d’amore in costume, con il pianto garantito e il fazzoletto in tasca",
      2,
      "Piangi alle storie d’amore in costume col fazzoletto pronto: sei polvere da sparo di dolcezza.",
    ],
  ]),
  q("I libri:", [
    ["L’ultimo l’ho letto a scuola, e l’ho odiato", -2],
    ["Un manuale di motori, ogni tanto, con le figure", -1],
    ["Un romanzo ogni mese, per rilassarmi", 1],
    [
      "Ne leggo tre insieme, li annoto con post-it colorati e li fotografo sul comodino",
      2,
      "Fotografi i libri sul comodino con i post-it: la tua libreria ha una carriera da influencer.",
    ],
  ]),
  q("I podcast:", [
    ["Mai, mi parlano addosso per un’ora e non dicono niente", -2],
    ["Un podcast di calcio, per sapere chi ha ragione", -1],
    ["Uno di true crime, mi rilassa davvero", 1],
    [
      "Ne ascolto cinque, tengo il conto delle puntate e consiglio il migliore a tutti",
      2,
      "Tieni il conto delle puntate dei podcast: il tuo telefono ha più voci in testa di un coro.",
    ],
  ]),
  q("Un concerto:", [
    ["Sotto il palco, a urlare, e senza voce per tre giorni", -2],
    ["Dietro, con una birra, perché la musica si sente anche da lì", -1],
    ["Sugli spalti, seduto, per godermelo", 1],
    [
      "In prima fila, con un cartello scritto a mano e una canzone che conosco a memoria",
      2,
      "Hai un cartello scritto a mano per il concerto: l’artista ti ha visto e ha un po’ di paura.",
    ],
  ]),
  qd("La musica che ascolti di nascosto:", [
    [
      "Nessuna: quello che ascolto lo ascolto a testa alta",
      -2,
      "Dici di non avere musica segreta: lo streaming ha il tuo storico e lo conserva con cura.",
    ],
    ["Qualche ballad, ma solo in macchina e a finestrini chiusi", -1],
    ["Un po’ di pop, quando sono da solo e nessuno sente", 1],
    [
      "Tutta la discografia di una cantante pop, e ho il vinile in salotto, con la dedica",
      2,
      "Il vinile del tuo idolo pop in salotto: gli ospiti fanno i complimenti a denti stretti.",
    ],
  ]),
  q("Una canzone che ti parte da sola:", [
    ["Un coro da stadio, e mi viene voglia di litigare", -2],
    ["Un classico rock che conosco a memoria", -1],
    ["Una ballata italiana, con il cuore in mano", 1],
    [
      "Un pezzo dance, con la coreografia che conosco bene e che faccio ovunque",
      2,
      "Ti parte la coreografia ovunque: il supermercato ti riserva già uno spazio.",
    ],
  ]),
  q("Quando canti in macchina, da solo:", [
    ["Non canto nemmeno da solo, che vergogna", -2],
    ["Canticchio piano, giusto il ritornello", -1],
    ["Canto forte, con i finestrini chiusi", 1],
    [
      "Canto, faccio anche le seconde voci e guardo gli altri automobilisti con aria da performance",
      2,
      "Fai le seconde voci in macchina davanti agli altri automobilisti: ormai la tua auto ha il palco.",
    ],
  ]),
  q("L’opera lirica:", [
    ["Una cosa lunga, con gente che urla in costume", -2],
    ["Ci sono andato una volta, e ho dormito con dignità", -1],
    ["Mi piace, ma solo le arie più famose", 1],
    [
      "Ho l’abbonamento in loggione e un binocolo con il nome inciso",
      2,
      "Hai un binocolo da teatro con il nome inciso: il loggione ti riconosce dal profumo.",
    ],
  ]),
  q("I reality show:", [
    ["Roba da gente che non ha un televisore migliore", -2],
    ["Li guardo di nascosto, e poi dico di non averli visti", -1],
    ["Li guardo con gli amici, per ridere", 1],
    [
      "Ho un gruppo WhatsApp dedicato, con i commenti puntata per puntata",
      2,
      "Un gruppo WhatsApp per commentare il reality: il tuo telefono vibra come un tribunale.",
    ],
  ]),
  q("Il tuo film di Natale:", [
    ["Un film d’azione, perché il Natale è un campo di battaglia", -2],
    ["Un cinepanettone, per tradizione e per fatalismo", -1],
    ["Un classico in bianco e nero, con una tazza fumante", 1],
    [
      "Una commedia romantica natalizia con la neve finta e il caminetto, ogni anno, più volte",
      2,
      "Riguardi la commedia romantica di Natale più volte a stagione: conosci le battute prima degli attori.",
    ],
  ]),
  q("Il cartone Disney preferito:", [
    ["Quello con gli animali che combattono, e la musica epica", -2],
    ["Uno qualsiasi, ma mi vergogno a dirlo", -1],
    ["Un classico, con le canzoni che so cantare", 1],
    [
      "Una principessa, e conosco tutte le canzoni, compresi i cori e le seconde voci",
      2,
      "Conosci le canzoni delle principesse con i cori: ormai Disney ti ha dato la cittadinanza.",
    ],
  ]),
  q("Un meme da mandare agli amici:", [
    ["Uno con la scritta in maiuscolo e un animale arrabbiato", -2],
    ["Uno di calcio, che solo noi capiamo", -1],
    ["Uno con un’ironia che coglie, ma senza esagerare", 1],
    [
      "Uno personalizzato, creato da me con i loro volti, e ci rimango male se non ridono",
      2,
      "Crei i meme con le facce degli amici e ci resti male se non ridono: sei un artista incompreso.",
    ],
  ]),
  q("Le citazioni dei film:", [
    ["Non le uso, non ricordo mai le battute giuste", -2],
    ["Le dico quando c’è un amico che le capisce", -1],
    ["Le uso ogni tanto, quando sono ispirato", 1],
    [
      "Parlo per citazioni, e se qualcuno non capisce, lo guardo come se fosse un errore culturale",
      2,
      "Parli per citazioni e disprezzi chi non le coglie: la tua conversazione ha l’aria di un esame.",
    ],
  ]),
  q("Ti regalano un libro di poesie:", [
    ["Lo uso per alzare il monitor del computer", -2],
    ["Lo ringrazio e lo metto in uno scaffale in alto", -1],
    ["Ne leggo qualcuna, con attenzione", 1],
    [
      "Lo leggo in una notte, e ne copio un verso sul diario per averlo sempre",
      2,
      "Copi i versi sul diario: il poeta, in cambio, ti avrebbe voluto come lettore unico.",
    ],
  ]),
  q("Una mostra d’arte contemporanea:", [
    ["Quello lo potevo fare anch’io, e lo dico ad alta voce davanti all’autore", -2],
    ["Mi sento in imbarazzo, e vado a cercare il bar", -1],
    ["Mi fermo, leggo la targhetta e provo a capire", 1],
    [
      "Faccio un commento profondo ad alta voce, per farmi sentire, e cito un filosofo",
      2,
      "Commenti l’arte ad alta voce citando filosofi: per questo le gallerie hanno i guardiani.",
    ],
  ]),
  q("Il tuo superpotere:", [
    ["Una forza sovrumana, per sollevare cose che non servono", -2],
    ["Diventare invisibile, per non parlare con nessuno", -1],
    ["Leggere nel pensiero, per capire cosa pensano di me", 1],
    [
      "Sapere sempre cosa indossare e a che ora è meglio andare via",
      2,
      "Il tuo superpotere è sapere cosa indossare: sei un supereroe del guardaroba.",
    ],
    ["Addormentarmi ovunque, in qualsiasi posizione", 0],
  ]),
  q("Se fossi un animale:", [
    ["Un leone, che comanda e dorme tutto il giorno", -2],
    ["Un orso, che mangia, dorme e non ha tempo per nessuno", -1],
    ["Un gatto, curioso e indipendente, con un’aria da conoscitore", 1],
    [
      "Un pavone, con la coda in mostra, e un angolo di luce che mi spetta",
      2,
      "Ti sei scelto il pavone come animale simbolo: la coda, almeno, è coordinata.",
    ],
  ]),
  q("Se fossi un cocktail:", [
    ["Un whisky liscio, che non si spiega e non si scusa", -2],
    ["Una birra, per tutti i giorni e per tutte le stagioni", -1],
    ["Un gin tonic, elegante ma accessibile", 1],
    [
      "Un cocktail con la schiuma, il fiore e un nome in francese, che non si può ordinare senza un parere",
      2,
      "Vorresti essere un cocktail con il nome in francese: ti basta essere il fiore sul bicchiere.",
    ],
  ]),
  q("Un’isola deserta: cosa porti?", [
    ["Un coltello, un fuoco e nessuno dei miei amici", -2],
    ["Una birra infinita, e la partita per l’eternità", -1],
    ["Un libro, un amico e una crema solare", 1],
    [
      "Un kit di skincare, una playlist e la persona giusta con cui condividerle",
      2,
      "Porti la skincare sull’isola deserta: la tua pelle è pronta anche per il naufragio.",
    ],
  ]),
  q("L’apocalisse zombie: il tuo ruolo:", [
    ["Quello che spacca teste e non fa domande", -2],
    ["Quello che resta nel bunker con le scorte, e non parla", -1],
    ["Quello che organizza il gruppo e divide i turni", 1],
    [
      "Quello che organizza anche i momenti di svago, le feste e la sistemazione dei cuscini",
      2,
      "Organizzi le feste durante l’apocalisse: gli zombie ballano sulla tua playlist.",
    ],
  ]),
  q("Se vincessi alla lotteria:", [
    ["Una macchina enorme, e una moto, e un viaggio in Messico con gli amici", -2],
    ["Pagherei i debiti e mi comprerei una casa grande", -1],
    ["Un po’ di viaggi, e una casa con un giardino", 1],
    [
      "Un attico, un guardaroba su misura e un assistente personale per la mia agenda",
      2,
      "Un assistente per la tua agenda: le tue giornate hanno già un ufficio stampa.",
    ],
  ]),
  q("Tra dieci anni, dove ti vedi?", [
    ["Dove sono adesso, ma più forte e con meno capelli", -2],
    ["In una casa mia, con un cane e una birra in frigo", -1],
    ["In una vita serena, con le persone che amo", 1],
    [
      "In una casa con il giardino, una cucina enorme e una libreria che si vede dalla strada",
      2,
      "Ti immagini con la libreria che si vede dalla strada: ormai pensi di essere un monumento.",
    ],
  ]),
  q("Il tormentone estivo:", [
    ["Quello più rumoroso, a volume alto, dalla macchina", -2],
    ["Quello che passa ovunque, e lo canto senza accorgermene", -1],
    ["Uno che ho scoperto prima degli altri, e lo dico in giro", 1],
    [
      "Uno che ho scoperto quattro anni fa, e lo ascolto da sempre, e nessuno lo conosce",
      2,
      "Hai scoperto il tormentone prima di tutti: tra le tue qualità, la più insopportabile è la puntualità.",
    ],
  ]),
  qd("Onestamente, quanto pensi di essere gay?", [
    [
      "Zero, garantito al cento per cento, firmato e timbrato",
      -2,
      "Hai detto zero, firmato e timbrato: la fermezza è già un sospetto, e nessuno te l’ha chiesta.",
    ],
    ["Un po’, il minimo sindacale", -1],
    ["Boh, sono qui per scoprirlo", 1],
    [
      "Le percentuali le decide il Gayometro, io mi fido",
      2,
      "Hai delegato la tua identità a una lancetta pixelata: almeno sei una persona onesta.",
    ],
    ["Il giusto, come un vino ben bilanciato", 0],
  ]),
  q("Consiglieresti questo quiz ai tuoi amici?", [
    ["No, e cancello anche la cronologia", -2],
    ["Forse, se me lo chiedono direttamente", -1],
    ["Solo a chi può reggere il confronto", 1],
    [
      "Già girato nel gruppo, con la sfida aperta e la classifica pronta",
      2,
      "Hai già girato il quiz con la classifica pronta: il commissario di una gara che nessuno ha chiesto.",
    ],
  ]),
];
