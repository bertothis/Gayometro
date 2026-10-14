import { q, qd, type DomandaGrezza } from "./tipi";

/* Blocco 2: corpo, cura, aspetto */
export const B02: DomandaGrezza[] = [
  qd("La tua skincare:", [
    [
      "Acqua, sapone di Marsiglia e tanta fortuna",
      -2,
      "Ti lavi la faccia col sapone del bucato: la tua pelle ha subito più torture di un prigioniero.",
    ],
    ["Una crema idratante presa al supermercato, in saldo", -1],
    ["Detergente, siero e crema: tre passaggi, senza scuse", 1],
    [
      "Routine in sette passaggi, con luce rossa e rullo di giada",
      2,
      "Hai una routine in sette passaggi: la tua pelle ha un orario d’ufficio più rigido del tuo.",
    ],
    ["Mi lavo la faccia quando passo davanti a un lavandino", 0],
  ]),
  qd("Il tuo profumo:", [
    [
      "Il deodorante è già uno sforzo, non mi toccare",
      -2,
      "Consideri il deodorante uno sforzo: chi ti abbraccia lo fa per coraggio.",
    ],
    ["Uno spruzzo di quello di papà: tanto basta", -1],
    ["Cupo e legnoso, da boscaiolo con un passato", 0],
    [
      "Floreale e fruttato: una nuvola che entra prima di me",
      2,
      "Entri nelle stanze dopo la tua scia floreale: il tuo profumo ha già salutato tutti.",
    ],
  ]),
  qd("La barba:", [
    [
      "Rasata a zero, meno pensieri per tutti",
      -2,
      "Ti rasi a zero per risparmiare pensieri: sul viso hai la stessa cura che metti nelle password.",
    ],
    ["Cresce da sola: io non la ostacolo né la sostengo", -1],
    ["Corta e curata, con la forbicina del barbiere", 1],
    [
      "Regolata al millimetro, con l’olio dedicato e il pettine di legno",
      2,
      "Hai un olio da barba e un pettine di legno: la tua faccia ha un ufficio acquisti.",
    ],
  ]),
  q("Le sopracciglia:", [
    ["Cosa dovrei farci, scusa?", -2],
    ["Se si allungano, taglio con le forbici da cucina", -1],
    ["Una sistemata dal barbiere ogni tanto", 1],
    [
      "Appuntamento fisso ogni due settimane, non si discute",
      2,
      "Hai l’appuntamento fisso per le sopracciglia: il tuo sguardo è più curato di tutta la tua vita sociale.",
    ],
  ]),
  q("Le tue unghie:", [
    [
      "Le taglio col tronchesino da elettricista",
      -2,
      "Tagli le unghie col tronchesino da elettricista: la tua manicure ha il voltaggio sbagliato.",
    ],
    ["Quando si spezzano, le sistemo alla bell’e meglio", -1],
    ["Curate, con la lima sempre in tasca", 1],
    [
      "Manicure mensile con le cuticole perfette e una crema dedicata",
      2,
      "Cuticole perfette ogni mese: le tue mani hanno un curriculum migliore del tuo.",
    ],
  ]),
  qd("Il taglio di capelli:", [
    [
      "Macchinetta in bagno, numero due, fine della storia",
      -2,
      "Ti tagli i capelli in bagno col numero due: lo specchio ti guarda con una pena infinita.",
    ],
    ["Dal barbiere sotto casa, quando me lo ricordo", -1],
    ["Dal barbiere di fiducia ogni tre settimane, mai un giorno di ritardo", 1],
    [
      "Ho il numero privato del mio hair stylist e mi richiama",
      2,
      "Hai il numero privato del tuo hair stylist: lui ha il tuo cuore e la tua carta di credito.",
    ],
    ["Mi taglia mia madre, con affetto e una tazza in testa", 0],
  ]),
  q("I primi capelli bianchi:", [
    [
      "Che bianchi? Sono riflessi del sole, e chi dice il contrario mente",
      -2,
      "Dici che i capelli bianchi sono riflessi del sole: al buio, però, il sole si è già dimesso.",
    ],
    ["Li lascio: mi danno l’aria del lupo di mare", -1],
    ["Un po’ di colore, ma senza dirlo a nessuno", 1],
    [
      "Prenoto la colorazione e scelgo la tonalità con un campione e una playlist",
      2,
      "Scegli la tonalità con un campione e una playlist: il tuo tempo ha una colonna sonora in tinta.",
    ],
  ]),
  q("La crema solare:", [
    [
      "Mai messa: mi tempro come i nostri avi",
      -2,
      "Non metti mai la crema solare: a quarant’anni avrai la faccia di una borsa da lavoro.",
    ],
    ["Solo dopo la scottatura, come i pompieri", -1],
    ["Fattore trenta, se me la ricordo", 1],
    [
      "Cinquanta più, anche a novembre, anche in ufficio",
      2,
      "Metti il fattore cinquanta in ufficio a novembre: il sole ti riconosce, ti saluta e cambia strada.",
    ],
  ]),
  q("I peli:", [
    ["Liberi, come natura comanda", -2],
    ["Taglio il minimo quando mi dà fastidio", -1],
    ["Una regolata ogni tanto, giusto per la forma", 1],
    [
      "Ceretta fissa, scrub e idratazione: la mia pelle è un lavoro a tempo pieno",
      2,
      "Hai la ceretta fissa e lo scrub in agenda: la tua pelle è il progetto più serio della tua vita.",
    ],
  ]),
  qd("La maschera viso:", [
    [
      "Non so nemmeno cosa sia, ma già mi fa ridere",
      -2,
      "Hai riso della maschera viso senza sapere cos’è: un pioniere dell’ignoranza spavalda.",
    ],
    ["L’ho provata una volta, per una scommessa persa", -1],
    ["Ogni tanto, quando la pelle protesta", 1],
    [
      "Il mercoledì sera è sacro: maschera, tè e musica di sottofondo",
      2,
      "Il mercoledì sera hai maschera e tè: la tua pelle ha un appuntamento più stabile di una relazione.",
    ],
  ]),
  q("Tatuaggi:", [
    [
      "Un tribale sul bicipite, dal duemilatré",
      -2,
      "Hai un tribale sul bicipite: per te i primi anni Duemila non sono mai finiti.",
    ],
    ["Nessuno: temo gli aghi e lo ammetto con dignità", -1],
    ["Uno piccolo e nascosto, con un significato personale", 1],
    [
      "Minimal fine line con un significato profondo, il secondo di una serie",
      2,
      "Hai un tatuaggio minimal dal significato profondo: ne parli più di quanto ti sia costato.",
    ],
  ]),
  q("I denti:", [
    ["Funzionano, che vuoi di più?", -2],
    ["Li lavo due volte al giorno, e basta", -1],
    ["Filo interdentale e collutorio, una volta al giorno", 1],
    [
      "Sbiancamento ogni sei mesi e spazzolino elettrico con tre testine",
      2,
      "Hai tre testine per lo spazzolino elettrico: il tuo sorriso ha una manutenzione da cappella gentilizia.",
    ],
  ]),
  qd("In palestra:", [
    [
      "Solo ghisa e grugniti, il resto è tempo perso",
      -2,
      "Grugnisci con i pesi: gli altri soci ti scansano come si scansa un cinghiale.",
    ],
    ["Non ci vado: cammino e mi basta", -1],
    ["Crossfit: mi piace soffrire in compagnia", 1],
    [
      "Pilates, e ho il tappetino mio col nome ricamato",
      2,
      "Hai il tappetino col nome ricamato: la tua palestra ti tiene il posto come un ristorante stellato.",
    ],
    ["Ho l’abbonamento, e l’abbonamento ha me: non ci incontriamo mai", 0],
  ]),
  q("L’abbronzatura:", [
    [
      "Sul tetto, con l’olio di oliva, come un arrosto",
      -2,
      "Ti abbronzi con l’olio di oliva sul tetto: gli arrosti hanno più cura di te.",
    ],
    ["Quel che viene viene: io non disturbo il sole", -1],
    ["Un po’ di colore in estate, senza esagerare", 1],
    [
      "Autoabbronzante calibrato sul tono della pelle: la natura non basta",
      2,
      "Usi l’autoabbronzante calibrato: anche il sole, vedendoti, prende appunti.",
    ],
  ]),
  q("La doccia:", [
    [
      "Quattro minuti, acqua fredda, dentro e fuori",
      -2,
      "Fai la doccia fredda in quattro minuti: lo scaldabagno non ti ha mai conosciuto.",
    ],
    ["Un quarto d’ora, con un podcast in sottofondo", 1],
    [
      "Quaranta minuti, tre prodotti e un concerto a squarciagola",
      2,
      "Ti fai la doccia per quaranta minuti col concerto: l’acqua calda ti paga l’affitto.",
    ],
    ["Dipende dall’umore: il mio umore ha il rubinetto", 0],
  ]),
  q("Il deodorante:", [
    ["Quello della palestra, uno spruzzo ogni tre giorni", -2],
    ["Uno senza alluminio, perché mi informo", 1],
    [
      "Il mio ha un nome in francese e una candela abbinata",
      2,
      "Hai il deodorante in francese con la candela abbinata: la tua ascella ha più stile di un’agenzia di moda.",
    ],
  ]),
  q("Le labbra screpolate:", [
    ["Passeranno da sole, o si staccheranno insieme alla faccia", -2],
    ["Un po’ di burro cacao, ma solo di nascosto", -1],
    ["Burro cacao sempre in tasca: non vivo senza", 1],
    [
      "Ne ho cinque in cinque borse, con cinque gusti diversi",
      2,
      "Hai cinque burrocacao in cinque borse: le tue labbra hanno un guardaroba migliore del tuo.",
    ],
  ]),
  q("Gli occhiali da sole:", [
    [
      "Quelli del benzinaio: funzionano lo stesso",
      -2,
      "Porti gli occhiali del benzinaio: il sole ti vede e si sente fuori luogo.",
    ],
    ["Scelti in base alla forma del viso", 1],
    ["Una collezione per stagione e per outfit", 2],
  ]),
  q("Ti regalano una giornata alla spa:", [
    [
      "La rivendo, come un oggetto di scambio",
      -2,
      "Hai rivenduto la giornata alla spa: la tua pelle ti ha scritto una lettera d’addio.",
    ],
    ["Ci vado, ma solo per la sauna e la birra dopo", -1],
    ["Ci vado e provo almeno un massaggio", 1],
    [
      "Prendo tutto: fango, sali, scrub e il massaggio ai sassi caldi",
      2,
      "Alla spa hai preso tutto, anche il fango: la tua pelle è più felice di te.",
    ],
  ]),
  q("Il barbiere ti propone un trattamento nuovo:", [
    ["No, taglio e via: non aggiungere costi", -2],
    ["Ascolto, ma so già che dirò di no", -1],
    ["Dimmi di più: sono curioso", 1],
    [
      "Prendo il pacchetto completo, anche la parte che non ho capito",
      2,
      "Hai preso il pacchetto senza capire cos’era: il barbiere ti usa come testimonial.",
    ],
    ["Dico di sì e poi non capisco cosa mi abbia fatto", 0],
  ]),
  q("Quanto tempo passi davanti allo specchio la mattina?", [
    [
      "Il tempo di lavarmi i denti, poi via",
      -2,
      "Passi trenta secondi davanti allo specchio: lui ti guarda e scuote il cornicione.",
    ],
    ["Dieci minuti, come una persona civile", 1],
    [
      "Venti minuti tra posa, luce e controllo del profilo sinistro",
      2,
      "Controlli il profilo sinistro per venti minuti: lo specchio ormai ti dà del tu.",
    ],
  ]),
  q("Per i capelli, un prodotto da styling:", [
    ["Acqua, e che sia fredda", -2],
    ["Un po’ di gel, ma solo la domenica", -1],
    ["Cera, quanto basta per tenere la piega", 1],
    [
      "Tre prodotti, un diffusore e fiducia nei miei ricci",
      2,
      "Hai tre prodotti e un diffusore per i capelli: il tuo bagno ha più impianti di un laboratorio.",
    ],
  ]),
  q("Gli integratori:", [
    [
      "Proteine in polvere, tre misurini, frullate con rabbia",
      -2,
      "Frulli le proteine con rabbia: il frullatore ha pregato di essere un tostapane.",
    ],
    ["Mangio normale: gli integratori sono un trucco", -1],
    ["Una multivitaminica al giorno, per sentirmi un adulto con un piano", 1],
    [
      "Ho un organizer da sette giorni con tutti i miei integratori in fila",
      2,
      "Hai l’organizer settimanale per gli integratori: il comodino ha più ordine di un ufficio postale.",
    ],
  ]),
  q("La bilancia:", [
    ["Non ce l’ho: il mio corpo è una verità senza numeri", -2],
    ["Ogni tanto, quando mi ricordo", -1],
    ["Una volta a settimana, sempre alla stessa ora", 1],
    [
      "Ne ho una smart che mi manda il report con un grafico",
      2,
      "Hai una bilancia che ti manda il report con il grafico: nemmeno i tuoi cari ti fanno il resoconto.",
    ],
  ]),
  q("La pedicure:", [
    ["Non esiste: i piedi sono fatti per camminare", -2],
    ["Taglio le unghie ogni tanto, a casa, e fine", -1],
    ["Una volta all’anno, per Natale", 1],
    [
      "Pedicure ogni mese: i miei piedi sono trattati meglio del mio cuore",
      2,
      "Fai la pedicure ogni mese: i tuoi piedi hanno più cura della tua vita sentimentale.",
    ],
  ]),
  q("Lo smalto:", [
    ["Manco morto, roba non mia", -2],
    ["L’ho messo una volta, per una scommessa persa", -1],
    ["Trasparente, giusto per lucidare", 1],
    [
      "Trasparente rinforzante, che cambio ogni settimana secondo una mia routine",
      2,
      "Cambi lo smalto ogni settimana con una routine: le tue unghie ormai fanno il rendiconto trimestrale.",
    ],
  ]),
  q("Quando sudi in ufficio:", [
    [
      "Non sudo: ho il sangue di ghiaccio e il cuore di pietra",
      -2,
      "Dici di non sudare mai: il tuo cuore di pietra ha un’umidità sospetta.",
    ],
    ["Mi asciugo col braccio e vado avanti", -1],
    ["Un fazzoletto in tasca e un sorriso di scuse sempre pronto", 1],
    [
      "Ho un cambio camicia e una salvietta profumata nel cassetto",
      2,
      "Hai il cambio camicia nel cassetto: il tuo ufficio è un camerino con la scrivania.",
    ],
  ]),
  q("L’orologio al polso:", [
    ["Non ne porto: mi stringe il polso e la libertà", -2],
    ["Uno sportivo che segna tutto, anche i battiti", -1],
    ["Uno classico, col cinturino di pelle", 1],
    [
      "Ne ho tre, per tre umori, e li cambio secondo il vento",
      2,
      "Hai un orologio per ogni umore: il tuo polso ha un guardaroba da gentiluomo vittoriano.",
    ],
  ]),
  q("Come cammini quando entri in una stanza:", [
    ["Pesto e deciso: il pavimento deve sapere chi sono", -2],
    ["Sciolto, con le spalle morbide e l’aria di chi ha già vinto", 1],
    [
      "So esattamente come camminare: ci ho lavorato",
      2,
      "Hai un’entrata in scena studiata: il parquet apre un canale esclusivo per te.",
    ],
  ]),
  q("La tua foto da documenti:", [
    ["Una a caso: tanto non mi guarda nessuno", -2],
    ["Una scattata in cabina, con la faccia di chi sta per essere arrestato", -1],
    ["Un ritratto in studio, col fotografo che mi chiama “maestro”", 1],
    [
      "L’ho rifatta tre volte, finché l’espressione non era perfetta",
      2,
      "Hai rifatto la foto tessera tre volte per l’espressione: l’anagrafe ha un fascicolo su di te.",
    ],
  ]),
  q("Il tuo bagno, quanti prodotti ci sono?", [
    ["Un sapone, un rasoio e uno spazzolino che condivido col tubo", -2],
    ["Due o tre, di cui uno è della mia ex", -1],
    ["Una mensola ordinata, e uno scaffale segreto che non mostro a nessuno", 1],
    [
      "Un intero scaffale con le etichette rivolte in avanti, per ordine di utilizzo",
      2,
      "Hai le etichette dei prodotti tutte rivolte in avanti: persino il tuo bagno ti dà del lei.",
    ],
  ]),
];
