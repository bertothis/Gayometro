import { q, qd, type DomandaGrezza } from "./tipi";

/* Blocco 6: sentimenti, amicizie, relazioni, famiglia */
export const B06: DomandaGrezza[] = [
  qd("Quando un amico è triste:", [
    [
      "Pacca sulla spalla e cambio discorso: la tristezza è contagiosa",
      -2,
      "Cambi discorso appena un amico è triste: sei un rubinetto emotivo, ma con la guarnizione rotta.",
    ],
    ["Lo porto a bere: risolve tutto, o almeno lo rimanda", -1],
    ["Ne parliamo un po’, poi vediamo cosa si può fare", 1],
    [
      "Ne parliamo davvero, anche a lungo, occhi negli occhi, e gli preparo un tè",
      2,
      "Fissi un amico triste negli occhi e gli prepari un tè: lui voleva solo una pizza.",
    ],
    ["Gli mando un meme e spero che basti", 0],
  ]),
  q("Piangere a un film:", [
    [
      "Non piango ai film, punto fermo, nemmeno a quello del cane",
      -2,
      "Dici di non piangere nemmeno al film del cane: il cane, dal cielo, ti ha già segnalato.",
    ],
    ["Una lacrimuccia negata con decisione e una tosse di copertura", -1],
    ["Un po’, se proprio è tragico, e senza dirlo a nessuno", 1],
    [
      "Piango, e poi cito la scena per settimane, anche a lavoro",
      2,
      "Citi per settimane la scena che ti ha fatto piangere: la tua collega ha chiesto il trasferimento.",
    ],
  ]),
  q("Piangere a un matrimonio:", [
    ["Mai successo, e non succederà, firmato in presenza di un notaio", -2],
    ["Solo di nascosto, con gli occhiali da sole d’ordinanza", -1],
    ["Una lacrima al ballo degli sposi, poi do la colpa al polline", 1],
    [
      "A ogni discorso, con il fazzoletto sempre pronto, e un secondo di scorta",
      2,
      "Hai il fazzoletto di scorta per i discorsi: sei l’unico che ha previsto il piano B delle lacrime.",
    ],
  ]),
  q("Il compleanno di un amico:", [
    [
      "Bonifico e pacca sulla spalla, con tre mesi di ritardo",
      -2,
      "Fai gli auguri con un bonifico: il tuo affetto ha l’IBAN, e il tuo amico lo ha capito.",
    ],
    ["Una birra e un abbraccio con le spalle", -1],
    ["Un regalo scelto con un minimo di cura", 1],
    [
      "Un regalo pensato con mesi di anticipo, con un biglietto scritto a mano e un bouquet",
      2,
      "Regali pensati mesi prima, biglietto scritto a mano: i tuoi amici si sentono in debito a vita.",
    ],
    ["Mi ricordo il giorno dopo e faccio finta di niente", 0],
  ]),
  q("Gli auguri di compleanno in chat:", [
    ["“Auguri”, punto, e l’emoji, se avanza tempo", -2],
    ["Un messaggio un po’ più lungo del solito, con una battuta", -1],
    ["Un messaggio personale, con un ricordo condiviso", 1],
    [
      "Un tema, tre paragrafi, un ricordo dettagliato e una colonna sonora allegata",
      2,
      "Auguri lunghi come un tema: il festeggiato ha bisogno di tre ore per leggerli.",
    ],
  ]),
  q("Casa nuova di un amico, cosa porti:", [
    ["Niente: ci mancherebbe altro, vengo io e basta", -2],
    ["Le birre, semplice ed efficace", -1],
    ["Qualcosa di carino, scelto con più cura di quanto ammetterò", 1],
    [
      "Una piantina con il biglietto scritto a mano e un piccolo oggetto per il bagno",
      2,
      "Porti una pianta e un oggetto per il bagno: arrivi più preparato del padrone di casa.",
    ],
  ]),
  q("Ti fanno un complimento:", [
    [
      "Cambio discorso, con un imbarazzo da emergenza nazionale",
      -2,
      "Cambi discorso a ogni complimento: ti hanno detto “bella camicia” e hai parlato di calcio per mezz’ora.",
    ],
    ["Rispondo con una battuta, per non sentirmi in colpa", -1],
    ["Ringrazio con un sorriso, come una persona sana", 1],
    [
      "Ringrazio e rilancio con un complimento mirato, e mi appunto la risposta",
      2,
      "Ricambi ogni complimento con il rilancio: i tuoi amici si scambiano complimenti come in una borsa valori.",
    ],
  ]),
  q("Un amico ti chiede un parere sul suo outfit:", [
    ["Boh, uguale, va bene tutto, sono pantaloni", -2],
    ["Un consiglio sincero, senza giri di parole", -1],
    ["Un parere ragionato, con una proposta di alternativa", 1],
    [
      "Una consulenza completa: alternative, accessori e un piano di acquisti per il mese",
      2,
      "Consulenza completa con piano acquisti: il tuo amico ha capito che deve cambiare tutto.",
    ],
  ]),
  qd("San Valentino:", [
    [
      "Ricorrenza commerciale: non ci casco, e lo dico a tutti",
      -2,
      "Dici che San Valentino è commerciale: il fiorista, di notte, piange per te.",
    ],
    ["Una cena normale, senza esagerare", -1],
    ["Prenoto un mese prima e compro i fiori", 1],
    [
      "Prenoto un mese prima, organizzo una sorpresa a tema e faccio un video con i ricordi",
      2,
      "Sorpresa a tema con il video dei ricordi: San Valentino è il tuo secondo lavoro.",
    ],
    ["Dimentico, ma ho una scusa pronta", 0],
  ]),
  q("Il primo appuntamento ideale:", [
    ["Una birra veloce, per capire se vale la pena", -2],
    ["Una pizza, con una partita in sottofondo", -1],
    ["Un aperitivo in un locale carino, con lo sguardo tranquillo che ho provato allo specchio", 1],
    [
      "Una mostra, una cena e una passeggiata finale con un finale scritto",
      2,
      "Un finale scritto per il primo appuntamento: l’altra persona è solo un personaggio.",
    ],
  ]),
  q("Dopo un appuntamento, il messaggio:", [
    ["Aspetto tre giorni, per non sembrare disperato", -2],
    ["Scrivo l’indomani, con un’emoji e una riga distratta", -1],
    ["Scrivo la sera stessa, senza giochetti: sono troppo adulto per i giochetti", 1],
    [
      "Scrivo un messaggio con un ricordo della serata e un invito per il secondo appuntamento, già pianificato",
      2,
      "Mandi l’invito per il secondo appuntamento già pianificato: sei un organizzatore di destini.",
    ],
  ]),
  q("Il tuo ex:", [
    ["Non ne parlo: è un capitolo chiuso e murato", -2],
    ["Ne parlo solo quando bevo, e mi pento", -1],
    ["Ne parlo con serenità, come un adulto", 1],
    [
      "Siamo amici, ci scriviamo ogni settimana e lo aiuto a scegliere i regali",
      2,
      "Scegli i regali per il tuo ex: un assistente personale, senza stipendio e senza gratitudine.",
    ],
  ]),
  q("I fiori:", [
    ["Si comprano solo per scusarsi di qualcosa", -2],
    ["Li compro a San Valentino, per dovere, in stazione", -1],
    ["Li porto quando vado a cena da qualcuno", 1],
    [
      "Li compro anche per me, ogni settimana, e li metto nel vaso giusto",
      2,
      "Ti compri i fiori ogni settimana: sei il tuo primo ammiratore e anche l’unico.",
    ],
  ]),
  qd("Ti lasciano:", [
    [
      "Faccio finta di niente, esco con gli amici, e parlo di calcio per un mese",
      -2,
      "Parli di calcio per un mese dopo una rottura: sei una pentola a pressione con una squadra del cuore.",
    ],
    ["Mi sfogo con una birra, poi passa", -1],
    ["Ne parlo con un amico, mi dispiaccio e vado avanti", 1],
    [
      "Faccio una playlist apposta, scrivo un lungo messaggio e non lo invio",
      2,
      "Playlist per la rottura e messaggio mai inviato: la cartella bozze è più drammatica di un romanzo.",
    ],
  ]),
  q("Dire “ti voglio bene” a un amico:", [
    ["Mai, a meno che non siamo in guerra", -2],
    ["Solo se sono sbronzo, e poi non ricordo", -1],
    ["Ogni tanto, quando ci tengo a farglielo sapere", 1],
    [
      "Spesso, e finisco i messaggi con un cuore, a ogni occasione",
      2,
      "Chiudi ogni messaggio con “ti voglio bene”: i tuoi amici lo ricevono come una firma.",
    ],
  ]),
  q("Gli abbracci tra amici:", [
    ["Una stretta di mano, e una pacca sulla schiena che rompe una costola", -2],
    ["Un abbraccio veloce, a spalle ferme", -1],
    ["Un abbraccio vero, ogni tanto", 1],
    [
      "Un abbraccio lungo, con la mano sulla schiena e un “ci sono”",
      2,
      "Abbracci gli amici con la mano sulla schiena e un “ci sono”: sembri uno che vende assicurazioni emotive.",
    ],
  ]),
  q("Dopo un litigio con un amico:", [
    ["Aspetto che sia lui a scrivere, e lo faccio per l’onore", -2],
    ["Faccio passare qualche giorno e riparto come se niente fosse", -1],
    ["Lo chiamo e ne parliamo, tranquillamente", 1],
    [
      "Gli scrivo una lettera, e gli faccio trovare un regalo per scusarmi anche di cose che non ho fatto",
      2,
      "Chiedi scusa anche per cose che non hai fatto: la tua coscienza ha un’agenzia di recupero crediti.",
    ],
  ]),
  q("La telefonata a tua madre:", [
    ["Una a settimana, di cinque minuti, e la maggior parte sono monosillabi", -2],
    ["Quando serve, o quando mi chiama lei, tre volte", -1],
    ["Una al giorno, di dieci minuti, parlando del più e del meno", 1],
    [
      "Più volte al giorno, con le foto del pranzo e un resoconto dettagliato della digestione",
      2,
      "Mandi a tua madre le foto del pranzo e il resoconto della digestione: è la sua serie preferita.",
    ],
  ]),
  q("Parlare dei tuoi sentimenti:", [
    [
      "Non ne ho, o li tengo in un cassetto con il lucchetto",
      -2,
      "Dici di non avere sentimenti: li tieni in un cassetto col lucchetto e hai perso la chiave.",
    ],
    ["Se proprio devo, ne parlo con il barista", -1],
    ["Ne parlo con gli amici più vicini, quando serve", 1],
    [
      "Ne parlo con chiunque, e li racconto con dettagli, metafore e musica di sottofondo",
      2,
      "Racconti i tuoi sentimenti a chiunque con le metafore: sei un cantautore senza il disco.",
    ],
  ]),
  q("La terapia:", [
    ["Roba per chi non ha amici, e io ho una cugina", -2],
    ["Ci ho pensato, ma costa troppo e io sto bene", -1],
    ["Ci vado, e ne parlo con orgoglio, perché è come andare dal dentista", 1],
    [
      "Ci vado due volte a settimana e ho un diario con i sogni del terapeuta",
      2,
      "Hai il diario dei sogni: il tuo terapeuta, ormai, ha una cartella spessa come un’enciclopedia.",
    ],
  ]),
  q("Consigli sentimentali agli amici:", [
    ["Mollala, e passa oltre: il resto è teoria", -2],
    ["Non so, io non mi intendo di cuore, mi intendo di motori", -1],
    ["Ascolto, e poi dico quello che penso con dolcezza", 1],
    [
      "Faccio un’analisi completa: attaccamenti, schemi e un piano d’azione in quattro punti",
      2,
      "Piano d’azione in quattro punti sull’amore: hai la laurea in cuori e nessun cliente soddisfatto.",
    ],
  ]),
  q("Un amico ti confida un segreto:", [
    ["Lo dimentico subito: ho il disco rigido pieno", -2],
    ["Lo tengo per me, e solo se mi pagano, lo racconto", -1],
    ["Lo custodisco come un notaio: nessuno lo saprà, nemmeno sotto tortura", 1],
    [
      "Lo custodisco, e gli scrivo una mail per ringraziarlo della fiducia, con una citazione",
      2,
      "Ringrazi un amico per un segreto con una mail e una citazione: lui voleva solo uno sfogo.",
    ],
  ]),
  q("Il testimone di nozze di un amico:", [
    ["Faccio un discorso di tre frasi, due sono battute sull’alcol", -2],
    ["Mi limito a organizzare l’addio al celibato, con le cose giuste", -1],
    ["Un discorso sentito e una battuta ben dosata", 1],
    [
      "Un discorso di dieci minuti con slide, ricordi d’infanzia e una canzone cantata",
      2,
      "Discorso con slide e canzone cantata: gli sposi ti guardano come un uragano.",
    ],
  ]),
  qd("L’addio al celibato di un amico, tu organizzi:", [
    [
      "Una notte in una località a caso, con un budget minimo e una grigliata",
      -2,
      "Organizzi l’addio al celibato in una località a caso con una grigliata: sei un tour operator del caos.",
    ],
    ["Una cena e una serata in giro, senza programmi", -1],
    ["Un weekend con una cena, una gita e un gioco", 1],
    [
      "Un weekend in una spa con le candele, il tè e una serata di giochi di società",
      2,
      "Organizzi l’addio al celibato in una spa con le candele: lo sposo si è commosso, il suo gruppo meno.",
    ],
  ]),
  q("Il tuo migliore amico ti descrive come:", [
    ["Uno che non parla mai, ma quando lo fa, offende qualcuno", -2],
    ["Un tipo a posto, senza troppi problemi", -1],
    ["Uno che ascolta, e ci sa fare con i guai degli altri", 1],
    [
      "Il genitore del gruppo: tiene tutti insieme, ricorda i compleanni e sa i numeri di tutti",
      2,
      "Sei il genitore del gruppo che ricorda tutti i compleanni: ti manca solo il carrello della spesa.",
    ],
  ]),
  q("Un ballo lento:", [
    ["Mi siedo e aspetto che passi, come un temporale", -2],
    ["Faccio finta di cercare qualcosa al bancone", -1],
    ["Me la cavo, e conto i passi sorridendo come un professionista", 1],
    [
      "Guido io, con eleganza, e faccio anche i giri difficili",
      2,
      "Guidi il ballo lento con i giri difficili: la tua partner ha scoperto di essere seconda.",
    ],
  ]),
  q("Le coreografie:", [
    ["Non ne conosco manco una, e per fortuna", -2],
    ["Qualche passo a caso, tanto nessuno guarda", -1],
    ["Una la conosco vagamente, e basta il ritmo", 1],
    [
      "Ne so una a memoria, e ai matrimoni mi parte da sola",
      2,
      "Ai matrimoni ti parte una coreografia da sola: il tuo corpo ha un repertorio di cui non sai nulla.",
    ],
  ]),
  q("Il tuo oroscopo:", [
    ["Roba da cartomanti e da gente con troppo tempo, non ci credo", -2],
    ["Lo leggo, ma solo per ridere", -1],
    ["Lo leggo ogni mattina, ma non ci credo davvero", 1],
    [
      "Conosco il mio ascendente, la mia luna e quello dei miei ex, con le incompatibilità",
      2,
      "Conosci l’ascendente dei tuoi ex: hai un fascicolo astrale con le prove.",
    ],
  ]),
  q("Una lite in famiglia, a pranzo di Natale:", [
    ["Alzo la voce più di tutti, e poi dico di non aver mai litigato", -2],
    ["Mangio in silenzio e prego che passi presto", -1],
    ["Faccio da mediatore, con calma e tanti sorrisi", 1],
    [
      "Propongo una seduta di mediazione, con i fogli e un facilitatore, per parlare dei sentimenti",
      2,
      "Proponi una seduta di mediazione a Natale: la nonna ti ha dato la fetta di dolce più piccola.",
    ],
  ]),
];
