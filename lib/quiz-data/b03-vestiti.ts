import { q, qd, type DomandaGrezza } from "./tipi";

/* Blocco 3: vestiti, scarpe, accessori */
export const B03: DomandaGrezza[] = [
  qd("I tuoi jeans:", [
    [
      "Larghi, da lavoro, con la toppa sul ginocchio che non è moda",
      -2,
      "Porti i jeans con la toppa sul ginocchio: quella non è moda, è sopravvivenza.",
    ],
    ["Quelli che trovo puliti, e se non lo sono, li annuso", -1],
    ["Slim con il risvoltino calibrato al millimetro", 1],
    [
      "Strappati nei punti giusti, studiati a tavolino da un reparto marketing",
      2,
      "Hai pagato qualcuno per strappare i tuoi jeans: la rovina, ormai, ha un listino prezzi.",
    ],
    ["Ne ho tre paia identici, perché pensare è faticoso", 0],
  ]),
  q("Le scarpe che hai ai piedi in questo momento:", [
    [
      "Scarponi da lavoro, con la punta d’acciaio e la dignità arrugginita",
      -2,
      "Punta d’acciaio anche per il pane: il tuo alluce teme un’invasione.",
    ],
    ["Le prime che ho trovato nell’armadio", -1],
    ["Sneaker comode, di quelle che dicono “non mi interessa” a voce molto alta", 1],
    [
      "Sneaker bianche immacolate, pulite con il fazzoletto prima di uscire",
      2,
      "Pulisci le sneaker bianche col fazzoletto: la suola ti guarda con occhi da cucciolo.",
    ],
    ["Quelle che mi ha regalato mia madre, con amore e senza gusto", 0],
  ]),
  qd("Il cappotto per l’inverno:", [
    [
      "Felpa e basta: il freddo è un’opinione e io la rifiuto",
      -2,
      "Dici che il freddo è un’opinione: la tua tosse, ogni gennaio, ha un parere diverso.",
    ],
    ["Un piumino nero come tutti gli altri, perché non voglio pensare", -1],
    ["Un cappotto cammello con la sciarpa annodata come si deve", 1],
    [
      "Piumino oversize con la sciarpa coordinata: un manifesto dell’inverno",
      2,
      "Sciarpa coordinata al piumino: sei la copertina di un catalogo, ma con il raffreddore.",
    ],
  ]),
  q("I calzini:", [
    [
      "Bianchi da tennis, con tutto, anche con i sandali",
      -2,
      "Calzini bianchi coi sandali: non è un look, è una dichiarazione di guerra al buon gusto.",
    ],
    ["Fantasia ogni tanto: un gatto, una banana, un piccolo atto di ribellione", 1],
    [
      "Fantasia, coordinati con l’outfit del giorno e con l’umore",
      2,
      "Calzini coordinati all’umore: i tuoi piedi comunicano più di te.",
    ],
  ]),
  q("Il pigiama:", [
    [
      "Boxer e una maglietta sformata, comodità prima di tutto",
      -2,
      "Boxer e maglietta sformata: stai dormendo da solo, e si vede.",
    ],
    ["La tuta vecchia, ci dormo da anni, la lavo ogni morte di papa", -1],
    ["Un pigiama normale, decente, di quelli che ti regalano a Natale", 1],
    [
      "Completo coordinato in seta, anche d’estate, con le babbucce abbinate",
      2,
      "Pigiama di seta e babbucce abbinate: dormi con più classe di un ricevimento.",
    ],
  ]),
  qd("Vestito per un matrimonio:", [
    [
      "L’abito del diploma: entra ancora, quasi",
      -2,
      "L’abito del diploma al matrimonio: ti entra ancora, ma solo per spirito di rivalsa.",
    ],
    ["Un vestito nuovo, ma niente di troppo elaborato", 0],
    [
      "Outfit costruito con settimane di anticipo e una moodboard dedicata",
      2,
      "Hai una moodboard per l’outfit: gli sposi sono la tua seconda priorità.",
    ],
  ]),
  q("La sciarpa:", [
    ["Una sciarpa a righe del Natale del ’98, mai lavata", -2],
    ["Ne ho una nera, la uso se proprio gela", -1],
    ["Un nodo alla francese, perché ci tengo", 1],
    [
      "Ne ho sei in lana, cachemire e seta e le alterno come i giorni del mese",
      2,
      "Sei sciarpe in tre materiali: il tuo collo viaggia meglio di te.",
    ],
  ]),
  q("Il cappello:", [
    ["Quello del cantiere, che serve ad altro ma lo porto ovunque", -2],
    ["Un berretto con una squadra sopra, la stessa dal 2009", -1],
    ["Un berretto neutro, senza loghi: il mio gusto è un segreto professionale", 1],
    [
      "Un cappello di feltro con la tesa larga, perché sono un personaggio",
      2,
      "Hai il cappello di feltro a tesa larga: entri nelle stanze con la regia già pronta.",
    ],
  ]),
  q("Per portare le tue cose:", [
    ["Tasche, e che bastino", -2],
    ["Zaino tecnico da quaranta litri, sempre, anche per andare al bar", -1],
    ["Una borsa a tracolla, con un posto per le mentine, i cerotti e un piccolo segreto", 1],
    [
      "Una tote bag di una libreria indipendente con dentro un libro che non leggo",
      2,
      "Tote bag di libreria con un libro mai letto: l’estetica ti riesce meglio della lettura.",
    ],
  ]),
  q("La tua biancheria intima:", [
    [
      "Dieci boxer uguali, comprati in un unico pacco da supermercato",
      -2,
      "Hai dieci boxer uguali comprati insieme: la tua intimità è un acquisto di gruppo.",
    ],
    ["Quello che capita, purché sia pulito", -1],
    ["Qualche marca decente, scelta con la cura di un abito da sera", 1],
    [
      "Colori e fantasie in rotazione, scelti con cura per ogni giorno",
      2,
      "Biancheria scelta per ogni giorno: nessuno la vede, ma tu ti senti in regola.",
    ],
  ]),
  q("Verde salvia e verde militare:", [
    ["È tutto verde, che vuoi da me", -2],
    ["Sono diversi, ma non saprei spiegare come", -1],
    ["Li distinguo e li abbino con criterio", 1],
    [
      "Li distinguo al volo, e riconosco anche l’eucalipto dal verde bosco",
      2,
      "Riconosci l’eucalipto dal verde bosco: la tua vista ha un diploma in botanica.",
    ],
  ]),
  q("Il tuo armadio:", [
    [
      "Un mucchio sulla sedia, con una scala di priorità incomprensibile",
      -2,
      "Usi la sedia come armadio: i vestiti ti scrivono e tu non leggi mai.",
    ],
    ["Una pila nel cassetto e qualche gruccia, ognuno trova un suo posto", -1],
    ["Diviso per tipo, con le grucce dello stesso colore perché sono una persona seria", 1],
    [
      "Ordinato per colore, sfumatura e stagione, con le grucce tutte uguali",
      2,
      "Armadio ordinato per sfumatura: per te il caos è un reato.",
    ],
  ]),
  q("Gli stivaletti chelsea:", [
    ["Che cosa sono, scusa?", -2],
    ["Sono per quelli che vanno a cena in centro", -1],
    ["Ne ho un paio, presi in saldo e difesi come un trofeo", 1],
    [
      "Ne ho tre paia, uno per ogni stagione e uno per il mio senso del dovere",
      2,
      "Tre paia di chelsea: nessuno te li ha chiesti e tu li hai già ammortizzati.",
    ],
  ]),
  q("La camicia:", [
    [
      "Fuori dai pantaloni, come la libertà esige",
      -2,
      "Porti la camicia fuori: i tuoi pantaloni ti guardano con una tenerezza imbarazzante.",
    ],
    ["Dentro, ma solo per le occasioni solenni", -1],
    ["Dentro, ben stirata, con il colletto aperto", 1],
    [
      "Dentro, con il bottone del colletto allacciato anche d’estate",
      2,
      "Allacci il bottone del colletto anche d’estate: il tuo collo ha una disciplina da collegio.",
    ],
  ]),
  q("Un pomeriggio ai saldi:", [
    [
      "Incubo, aspetto fuori con le buste degli altri",
      -2,
      "Aspetti fuori con le buste degli altri: sei un attaccapanni con le gambe.",
    ],
    ["Entro, prendo il necessario ed esco", -1],
    ["Mi aggiro con calma, provo tre cose e ne compro una, con soddisfazione", 1],
    [
      "Strategia, lista e percorso studiato in anticipo con le tappe",
      2,
      "Hai una strategia per i saldi: il tuo carrello ha un piano di battaglia.",
    ],
  ]),
  q("Come pieghi le magliette:", [
    [
      "Le appallottolo nel cassetto: si stirano da sole, col tempo",
      -2,
      "Appallottoli le magliette nel cassetto: stai aspettando un miracolo che dura da anni.",
    ],
    ["Le appendo tutte, anche le t-shirt, e non so perché", -1],
    ["Piegate in pila, con la manica che sporge come la mia dignità", 1],
    [
      "Metodo verticale alla giapponese, con cassetti fotografabili",
      2,
      "Pieghi le magliette in verticale: i tuoi cassetti sono più fotogenici dei tuoi parenti.",
    ],
  ]),
  q("Stirare:", [
    ["Non stiro: i vestiti si stirano addosso", -2],
    ["Stiro il minimo indispensabile, con la rabbia", -1],
    ["Stiro con la riga precisa, e ne vado fiero", 1],
    [
      "Ho il vaporizzatore portatile e lo uso in treno, davanti a testimoni",
      2,
      "Hai il vaporizzatore portatile e lo usi in treno: il vagone ha riso, ma non troppo.",
    ],
  ]),
  q("Il costume da bagno:", [
    [
      "Pantaloncini larghi fino al ginocchio, quelli di quando facevo il militare",
      -2,
      "Costume fino al ginocchio: il mare ti guarda con compassione.",
    ],
    ["Un boxer qualsiasi, comprato in sconto", -1],
    ["Un modello nuovo ogni anno, perché la spiaggia è un red carpet", 1],
    [
      "Uno per ogni spiaggia, con la borsa e il telo abbinati",
      2,
      "Un costume per ogni spiaggia: la tua valigia ha più vestiti di un presidente.",
    ],
  ]),
  q("Il tuo colore stagione:", [
    ["Il mio cosa, scusa?", -2],
    ["Ne ho sentito parlare, ma credevo fosse una battuta", -1],
    ["Più o meno: qualcosa sui toni caldi", 1],
    [
      "Sono un autunno profondo, e l’ho fatto controllare da una professionista",
      2,
      "Sei un autunno profondo certificato: finalmente un giudice ti ha dato ragione.",
    ],
  ]),
  q("Le ciabatte:", [
    [
      "Di gomma da mare, tutto l’anno, anche a Natale",
      -2,
      "Metti le ciabatte di gomma a Natale: le tue dita hanno fatto testamento.",
    ],
    ["Quelle da casa, basic, comprate al mercato", -1],
    ["Pantofole di casa, anche per gli ospiti", 1],
    [
      "Mule di design, anche solo per buttare la spazzatura",
      2,
      "Mule di design per buttare la spazzatura: il condominio assiste a una sfilata quotidiana.",
    ],
  ]),
  q("Festa a tema, devi travestirti:", [
    [
      "Non mi travesto, mai, per principio, e glielo spiego a tutti",
      -2,
      "Hai spiegato a tutti perché non ti travesti: la festa è finita presto, per fortuna.",
    ],
    ["Un accessorio minimo, giusto per dire", -1],
    ["Un costume curato, con un po’ d’impegno e un accessorio a sorpresa", 1],
    [
      "Arrivo con il costume più curato della serata, anche con gli effetti speciali",
      2,
      "Costume con effetti speciali: la festa è tua, gli altri sono comparse.",
    ],
  ]),
  q("Il maglione di Natale:", [
    ["Non lo metto nemmeno sotto minaccia", -2],
    ["Uno brutto, regalato dalla zia, lo uso solo il venticinque", -1],
    ["Uno bello, in lana, con la renna discreta", 1],
    [
      "Ne ho tre, uno con le luci e uno con la musica integrata",
      2,
      "Hai un maglione di Natale con la musica integrata: il tuo Natale ha più colonne sonore di un film.",
    ],
  ]),
  q("I pantaloncini corti, a luglio:", [
    ["Corti, cortissimi, con le gambe al vento e l’orgoglio in tasca", -2],
    ["Alle ginocchia, sono un uomo serio", -1],
    ["Un bermuda in lino, che respiro e mi sento in pace", 1],
    [
      "Un bermuda in lino stropicciato studiato, che sembra spontaneo ma non lo è",
      2,
      "Lino stropicciato studiato per sembrare spontaneo: anche il disordine, da te, ha un progetto.",
    ],
  ]),
  q("I gioielli:", [
    [
      "Nessuno, a parte la catenina del nonno, che non tolgo dal ’97",
      -2,
      "Porti la catenina del nonno dal ’97: ormai ha più esperienza di te.",
    ],
    ["La fede e basta, con un anello accessorio", -1],
    ["Un anello e un bracciale discreti, che sembrano casuali e non lo sono", 1],
    [
      "Una collana, due anelli, un bracciale e il mio orecchino che parla da sé",
      2,
      "Gli orecchini sono tre e parlano più di te.",
    ],
  ]),
  q("La cintura:", [
    ["Una sola, di cuoio, con la fibbia grande come un piatto", -2],
    ["Una cintura sottile, che si abbina bene alle scarpe", 1],
    [
      "Ne ho cinque, e le scarpe devono essere dello stesso tono",
      2,
      "Abbini la cintura alle scarpe: persino i pantaloni sono stati addestrati.",
    ],
  ]),
  q("Come ti stanno i vestiti?", [
    ["Larghi, che il vento mi renda libero", -2],
    ["Della mia taglia, perché i miei vestiti non devono sembrare un prestito", 1],
    [
      "Su misura: il sarto sa già come mi chiamo",
      2,
      "Il sarto sa come ti chiami: stai tenendo in piedi la sua attività con le tue misure.",
    ],
  ]),
  q("Il tuo logo preferito:", [
    ["Quello grande di una squadra, sul petto, con il nome del giocatore", -2],
    ["Quello della marca sportiva, ben visibile", -1],
    ["Nessun logo: l’eleganza è silenziosa", 1],
    [
      "Un piccolo ricamo che solo i cultori riconoscono, per distinguersi dai mortali",
      2,
      "Porti il piccolo ricamo da intenditore: sei convinto che solo tu e la tua sarta lo capiate.",
    ],
  ]),
  q("Un cena importante, il tempo per prepararti:", [
    [
      "Dieci minuti, di cui cinque a cercare le chiavi",
      -2,
      "Ti prepari in dieci minuti per una cena importante: i tuoi ospiti si chiedono se ti hanno già visto.",
    ],
    ["Mezz’ora, con doccia veloce e profumo a caso", -1],
    ["Un’ora, e arrivo con cinque minuti d’anticipo come un diplomatico", 1],
    [
      "Due ore, tre cambi d’abito e una consultazione con un amico",
      2,
      "Ti prepari per due ore con tre cambi: l’ospite ha già finito l’antipasto, e tu non sei ancora arrivato.",
    ],
  ]),
  q("Il mercatino vintage:", [
    ["Roba vecchia: se è vecchia, è già stata di qualcuno e non la voglio", -2],
    ["Ci passo con gli amici, ma compro solo una birra", -1],
    ["Un giro per curiosità, e qualcosa di bello lo trovo", 1],
    [
      "Ho la mia bancarella di fiducia, e mi conosce per nome",
      2,
      "Hai la bancarella di fiducia al mercatino: il tuo gusto è più stagionato di un formaggio.",
    ],
  ]),
  q("Il tuo look del lunedì mattina:", [
    ["Quello di domenica, tanto è tutto uguale", -2],
    ["Felpa, jeans e rassegnazione", -1],
    ["Qualcosa di semplice ma ordinato, che sia una promessa", 1],
    [
      "Un outfit pensato la domenica sera, con l’idea di dominare la settimana",
      2,
      "L’outfit del lunedì pianificato la domenica sera: la tua settimana ha una sceneggiatura.",
    ],
  ]),
];
