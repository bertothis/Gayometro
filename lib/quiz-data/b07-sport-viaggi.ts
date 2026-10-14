import { q, qd, type DomandaGrezza } from "./tipi";

/* Blocco 7: sport, motori, viaggi, tempo libero */
export const B07: DomandaGrezza[] = [
  qd("Il calcio per te:", [
    [
      "Curva, sciarpa e trasferte, sempre, anche sotto la neve",
      -2,
      "Fai le trasferte sotto la neve: l’autostrada ti conosce per nome.",
    ],
    ["Lo guardo al bar con gli amici, e urlo all’arbitro", -1],
    ["Lo guardo per stare in compagnia, con un tifo blando", 1],
    [
      "Apprezzo soprattutto l’eleganza di certi giocatori, e la loro rifinitura sulla fascia",
      2,
      "Apprezzi l’eleganza dei giocatori: guardi il calcio come un critico di moda.",
    ],
    ["Lo seguo se gioca la nazionale, altrimenti c’è un film", 0],
  ]),
  q("Lo sport con gli amici:", [
    ["Ghisa e basta: muscoli, sudore e nessuna parola", -2],
    ["Una corsa in solitaria la domenica, per non parlare con nessuno", -1],
    ["Calcetto il martedì, una tradizione intoccabile", 1],
    [
      "Padel con il completino coordinato e la borraccia abbinata",
      2,
      "Giochi a padel con il completino coordinato: sei l’unico a sudare con il dress code.",
    ],
  ]),
  q("Su due ruote:", [
    [
      "Moto grossa con la marmitta aperta: il rumore, da solo, parla per me",
      -2,
      "Hai la marmitta aperta per farti sentire: dentro di te c’è un silenzio che spaventa.",
    ],
    ["Un motorino per andare al lavoro, con il casco allacciato male", -1],
    ["Una bici da corsa, con la tuta aderente e il casco aerodinamico", 1],
    [
      "Una bici vintage con il cestino e i fiori finti, e un pic-nic in tasca",
      2,
      "Hai il cestino e i fiori finti sulla bici: sei un quadro di Monet con le gomme.",
    ],
  ]),
  qd("La tua macchina ideale:", [
    [
      "Un pickup diesel: più alto è, meglio è",
      -2,
      "Vuoi il pickup più alto possibile: ci arrivi a fatica, e la tua dignità resta a terra.",
    ],
    ["Una 500 color pastello, con il fiocco se potessi", 1],
    [
      "Una decappottabile per portare i capelli al vento, anche a gennaio",
      2,
      "Guideresti la decappottabile anche a gennaio: i tuoi capelli vogliono vivere, il tuo raffreddore meno.",
    ],
    ["Una che parte, e che non mi faccia domande", 0],
  ]),
  q("Lavare la macchina:", [
    ["Ci pensa la pioggia, funziona sempre", -2],
    ["Con l’idropulitrice la domenica, un rito sacro tra amici", -1],
    ["Un lavaggio veloce ogni tanto, quando mi guardano i vicini", 1],
    [
      "Interni profumati alla vaniglia, specchietti lucidi e un deodorante a forma di albero",
      2,
      "Hai l’auto profumata alla vaniglia: il tuo abitacolo è un salone di bellezza con le ruote.",
    ],
  ]),
  q("La musica in macchina:", [
    ["Classic rock, e le discussioni finiscono qui", -2],
    ["La radio, quello che passa il convento, senza opinioni", -1],
    ["Un podcast di true crime, mi rilassa", 0],
    [
      "Playlist curate per stato d’animo e stagione, con il testo a portata di sing-along",
      2,
      "Playlist per ogni stato d’animo e stagione: la tua radio ha un’agenda più fitta della tua.",
    ],
  ]),
  q("La tua domenica ideale:", [
    ["Motori e fango, dall’alba al tramonto", -2],
    ["Divano e campionato dalla mattina alla sera", -1],
    ["Un mercatino vintage e una mostra, con calma", 1],
    [
      "Una passeggiata culturale con l’audioguida scaricata, e un tè a metà",
      2,
      "Scarichi l’audioguida per una passeggiata di domenica: sei un turista a casa tua.",
    ],
  ]),
  q("Il mare per te:", [
    ["Pesca all’alba, in silenzio, con la canna in mano e la solitudine dentro", -2],
    ["Uno scoglio libero e un panino, essenziale e senza fronzoli", -1],
    ["Uno stabilimento con l’ombrellone fisso da anni", 1],
    [
      "Un beach club con il lettino prenotato, la musica lounge e un cocktail per ogni ora",
      2,
      "Lettino prenotato e cocktail a orario: la tua estate ha un’agenda più fitta del tuo lavoro.",
    ],
  ]),
  q("In spiaggia stendi:", [
    ["Niente, sabbia diretta sulla pelle, come un guerriero", -2],
    ["Il telo della squadra, sbiadito ma glorioso", -1],
    ["Un telo normale, va bene tutto", 1],
    [
      "Un telo coordinato al costume, con la borsa da mare abbinata",
      2,
      "Hai il telo coordinato al costume: persino la sabbia ti tratta con rispetto.",
    ],
  ]),
  q("Un falò in spiaggia:", [
    ["Chitarra e cori da stadio fino a tardi", -2],
    ["Ci sto, senza troppe pretese, e porto le birre", -1],
    ["Coperte e chiacchiere, un’atmosfera giusta", 1],
    [
      "Coperte, lucine e una playlist studiata in anticipo per ogni ora della notte",
      2,
      "Hai la playlist studiata per ogni ora del falò: il fuoco si sente un po’ sorvegliato.",
    ],
  ]),
  q("La montagna per te:", [
    ["Una ferrata all’alba, in silenzio, con uno zaino che pesa quanto un orgoglio", -2],
    ["Un rifugio, la grappa e la briscola fino a tardi", -1],
    ["Una passeggiata tranquilla e un panorama da fotografare", 1],
    [
      "Una baita instagrammabile con il plaid e la cioccolata calda",
      2,
      "Vai in montagna per la baita instagrammabile: le cime ti guardano con una certa pena.",
    ],
  ]),
  qd("Il campeggio:", [
    [
      "Tenda, coltello e fuoco acceso senza accendino",
      -2,
      "Accendi il fuoco senza accendino: ti consideri un eroe, ma gli scout ti guardano storto.",
    ],
    ["Una tenda normale, il minimo indispensabile", -1],
    ["Mai dormito fuori, e va bene così", 0],
    [
      "Il glamping con le lucine, il materasso vero e una colazione in veranda",
      2,
      "Fai il glamping con le lucine: il campeggio, per te, è un hotel con la zanzariera.",
    ],
  ]),
  q("Un weekend libero:", [
    ["Garage e motori, tutto il weekend, e la scusa dei lavori", -2],
    ["Divano e console, senza uscire, né per respirare", -1],
    ["Qualche giro in città, con un caffè e il senso di colpa del divano", 1],
    [
      "Una cittadina europea con l’itinerario salvato nelle note e il piano B",
      2,
      "Itinerario nelle note con il piano B: il weekend ha una tabella di marcia e tu una crisi alle porte.",
    ],
  ]),
  q("Il gruppo del fantacalcio:", [
    ["Ne gestisco tre, con un foglio Excel dedicato", -2],
    ["Ci sto, e seguo distratto", -1],
    ["L’ho silenziato nel 2021 e non ho rimpianti", 1],
    [
      "Non ne ho mai fatto parte, per scelta, e con un certo orgoglio",
      2,
      "Non fai il fantacalcio per scelta: nel gruppo, ti chiamano “quello che ha una vita”.",
    ],
  ]),
  qd("Il karaoke:", [
    [
      "Mai: piuttosto esco a fumare, e fumo anche se non fumo",
      -2,
      "Fuggi dal karaoke fumando anche se non fumi: il tuo coraggio ha un limite di decibel.",
    ],
    ["Solo cori da stadio, dopo la terza birra", -1],
    ["Una canzone a testa, mi adeguo al gruppo", 1],
    [
      "Ho una canzone firmata, con la gestualità e il cambio luci mentale",
      2,
      "Hai una canzone firmata per il karaoke: il tuo debutto ha avuto più prove di un musical.",
    ],
    ["Mi scappa un coro al momento giusto, poi sparisco", 0],
  ]),
  q("Lo yoga:", [
    ["Roba per gente con troppo tempo da perdere", -2],
    ["Solo stretching dopo la partita, e solo il polpaccio", -1],
    ["Ci ho provato una volta, e non ho ritrovato il corpo", 1],
    [
      "Ci vado ogni settimana, ho il tappetino e un mantra che non dico a nessuno",
      2,
      "Hai un mantra segreto: lo sussurri solo quando nessuno ti sente, e quando ti sente il vicino.",
    ],
  ]),
  q("Correre:", [
    ["Solo se mi inseguono", -2],
    ["Una volta all’anno per la maratona, a piedi, in fondo", -1],
    ["Due volte a settimana, con le cuffie e un obiettivo", 1],
    [
      "Con l’orologio che calcola il recupero, il battito e il riposo, e un’app dedicata",
      2,
      "Corri con l’orologio che calcola il recupero: il tuo cuore ha un contabile.",
    ],
  ]),
  q("Una serata di giochi:", [
    ["Poker e sigari, tra uomini, con il fumo e la parola data", -2],
    ["Carte e birre, senza tante regole", -1],
    ["Un gioco da tavolo con un po’ di strategia", 1],
    [
      "Un gioco cooperativo con un regolamento di cinquanta pagine e un ruolo per ciascuno",
      2,
      "Regolamento di cinquanta pagine letto prima della serata: il tuo gioco ha più clausole di un contratto.",
    ],
  ]),
  q("I videogiochi:", [
    ["Solo sparatutto, con le cuffie, e il microfono per insultare", -2],
    ["Un classico di calcio, con un amico, per litigare bene", -1],
    ["Qualcosa di avventura, con una storia così bella da farmi commuovere", 1],
    [
      "Un gioco di costruzione con la casa dei sogni, il giardino e le tende abbinate",
      2,
      "Passi le ore ad arredare la casa dei sogni in un videogioco: sei un architetto senza cantiere.",
    ],
  ]),
  q("La pesca:", [
    ["All’alba, con la canna e il silenzio, per tre ore di niente", -2],
    ["Una volta ogni tanto, con un amico, per la birra", -1],
    ["Non ci vado, ma tratto il pesce fresco con rispetto da ambasciatore", 1],
    [
      "Mi piace l’idea, però liberare il pesce con un discorso di scuse",
      2,
      "Chiedi scusa al pesce prima di liberarlo: nel fiume ormai ti conoscono.",
    ],
  ]),
  q("La valigia per un weekend:", [
    ["Uno zaino con una maglietta di ricambio e una confezione di patatine", -2],
    ["Una borsa grande, tutto a caso, e poi si vede", -1],
    ["Una valigia piccola, ordinata, con quello che serve", 1],
    [
      "Una valigia con i cubi organizzatori, una lista spuntata e un piano B per ogni outfit",
      2,
      "Cubi organizzatori e lista spuntata: il tuo weekend non conosce l’improvvisazione.",
    ],
  ]),
  qd("La vacanza ideale:", [
    [
      "Un viaggio in moto con un amico, la cartina e tre giorni senza lavarsi",
      -2,
      "Ti vanti di tre giorni senza lavarti: la moto, dopo quarantott’ore, cerca un altro proprietario.",
    ],
    ["Un villaggio con il buffet e la piscina, e le gare di bocce", -1],
    ["Una città d’arte con un hotel centrale", 1],
    [
      "Un ritiro benessere con le sedute di meditazione, i bagni di suoni e il tè di benvenuto",
      2,
      "Fai il ritiro benessere con il bagno di suoni: ti rilassi tanto che dimentichi di essere in ferie.",
    ],
    ["Dove costa meno, con una piscina e un pizzico di fortuna", 0],
  ]),
  q("Una crociera:", [
    ["Un incubo galleggiante, con un buffet infinito e gli scherzi dell’animatore", -2],
    ["Mi sembra un modo caro per mangiare tanto", -1],
    ["Ci andrei, con un balcone sul mare", 1],
    [
      "Ci vado ogni anno, e ho una cabina preferita con vista",
      2,
      "Hai la cabina preferita sulla nave: il tuo scoglio, ormai, è galleggiante e con la colazione inclusa.",
    ],
  ]),
  q("Le foto in vacanza:", [
    ["Una, davanti al monumento, e un dito sull’obiettivo", -2],
    ["Qualcuna con gli amici, mosse, ma piene di vita", -1],
    ["Una raccolta di paesaggi, senza persone", 1],
    [
      "Ho un fotografo di fiducia, un drone e una playlist per il video del viaggio",
      2,
      "Hai un drone per il video del viaggio: la tua vacanza ha un reparto produzione.",
    ],
  ]),
  q("Il tuo aereo ha due ore di ritardo:", [
    ["Faccio il casino al banco, finché non mi rimborsano un panino", -2],
    ["Mi siedo con una birra e aspetto, rassegnato", -1],
    ["Leggo un libro e prendo un caffè: l’attesa è un dono e io lo scarto lentamente", 1],
    [
      "Apro la mia lista di attività per i ritardi e comincio con la meditazione",
      2,
      "Hai una lista di attività per i ritardi aerei: l’attesa, per te, è un programma di benessere.",
    ],
  ]),
  q("Il fai da te:", [
    ["Mi basta un martello: se non funziona, ne uso uno più grande", -2],
    ["Chiamo un amico che ha il trapano, e gli porto la birra", -1],
    ["Ci provo con un tutorial, e a volte ci riesco", 1],
    [
      "Ho una cassetta degli attrezzi con i colori coordinati e un grembiule in pelle",
      2,
      "Cassetta degli attrezzi coordinata al grembiule: il tuo garage sembra un set.",
    ],
  ]),
  q("L’orto sul balcone:", [
    ["Non esiste: il verde è per i prati e per chi ha tempo", -2],
    ["Un basilico che muore a luglio, ogni volta, di sete", -1],
    ["Qualche erba aromatica, e un pomodoro che resiste", 1],
    [
      "Un orto verticale con un impianto di irrigazione e un registro dei raccolti",
      2,
      "Tieni un registro dei raccolti dell’orto sul balcone: il tuo basilico ha una cartella clinica.",
    ],
  ]),
  q("Un museo, la domenica pomeriggio:", [
    ["Mi annoio dopo tre minuti, e cerco la panchina", -2],
    ["Mi fermo a guardare qualcosa che mi colpisce, poi vado al bar", -1],
    ["Passo un’ora, leggo i cartelli e mi sento meglio", 1],
    [
      "Prendo l’audioguida, il catalogo e rimango fino alla chiusura, con un commento ad alta voce",
      2,
      "Commenti i quadri ad alta voce: il custode si è già segnato il tuo nome.",
    ],
  ]),
];
