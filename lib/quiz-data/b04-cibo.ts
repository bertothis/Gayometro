import { q, qd, type DomandaGrezza } from "./tipi";

/* Blocco 4: cibo, ristoranti, cucina */
export const B04: DomandaGrezza[] = [
  q("Al ristorante di pesce ordini:", [
    [
      "Fritto misto, e non se ne parla più",
      -2,
      "Fritto misto a occhi chiusi: il pesce ha già scritto il testamento.",
    ],
    ["Il crudo, con domande competenti al cameriere", 1],
    [
      "Il tris di crudi con abbinamento al calice a parte",
      2,
      "Hai ordinato il tris di crudi con l’abbinamento a parte: il cameriere ti ha fatto un inchino.",
    ],
    ["Quello che prende il mio amico, e poi gli rubo metà piatto", 0],
  ]),
  qd("La carne:", [
    [
      "Fiorentina al sangue, e la discussione finisce qui",
      -2,
      "Fiorentina al sangue come un rito: la mucca ha almeno un funerale dignitoso.",
    ],
    ["Tagliata con rucola e scaglie, cottura al punto che dico io", 1],
    [
      "Tartare condita al tavolo con un agrume che nemmeno conosco",
      2,
      "Fai condire la tartare al tavolo: il cameriere ti chiama “professore”, ma per educazione.",
    ],
    ["Quella del panino, senza pensarci troppo", 0],
  ]),
  q("Il sushi:", [
    [
      "Non lo mangio: roba cruda, non siamo mica orsi",
      -2,
      "Dici che il sushi è roba cruda: un orso, con questo, ti avrebbe già battezzato.",
    ],
    ["All you can eat, a quantità, a gara con gli amici", -1],
    ["Alla carta, dopo aver letto il menù con la serietà di un contratto", 1],
    [
      "Omakase: mi fido dello chef, e lo guardo negli occhi mentre taglia",
      2,
      "Hai preso l’omakase e guardi lo chef negli occhi: uno di voi due si sente osservato, e non sei tu.",
    ],
  ]),
  q("Il dolce a fine cena:", [
    ["Mai: un amaro e via, che il dolce è per i deboli", -2],
    ["Un morso dal dolce di un altro, e basta", -1],
    ["Un tiramisù da dividere, un cucchiaio a testa", 1],
    [
      "Il dolce al piatto con la quenelle, fotografato prima del primo boccone",
      2,
      "Fotografi la quenelle prima di mangiarla: il dolce aspetta e si scioglie di rabbia.",
    ],
  ]),
  q("Il gelato:", [
    ["Non mangio gelato: sono astemio del dolce, e anche di molto altro", -2],
    ["Una coppetta con due gusti nuovi, perché la routine è nemica", 1],
    [
      "Pistacchio, e lo degusto ad alta voce come un critico sotto effetto",
      2,
      "Degusti il gelato al pistacchio ad alta voce come un critico: la gelateria registra la recensione.",
    ],
  ]),
  q("Il pranzo della domenica dalla nonna:", [
    [
      "Tre primi, due arrosti e poi mi lamento di essere gonfio",
      -2,
      "Tre primi e due arrosti, poi la lamentela: la nonna ti ama e intanto conta le posate.",
    ],
    ["Mangio tutto e dormo sul divano come un trofeo", -1],
    ["Aiuto a sparecchiare e ascolto le storie di famiglia", 1],
    [
      "Le chiedo la ricetta e la scrivo sul mio quaderno delle ricette",
      2,
      "Scrivi le ricette della nonna sul tuo quaderno: lei ti ha già inserito nel testamento.",
    ],
  ]),
  q("Colazione:", [
    [
      "Caffè al bancone, in piedi, tre minuti",
      -2,
      "Fai colazione in tre minuti in piedi: sei l’unico che sa tutto del bancone e niente di sé.",
    ],
    ["Salto la colazione: digiuno intermittente, questione di disciplina", 0],
    [
      "Pancakes fotografati con luce naturale, prima che il burro si sciolga",
      2,
      "Fotografi i pancake con luce naturale: il burro sa di essere in posa e si scioglie di dignità.",
    ],
  ]),
  q("L’avocado toast:", [
    ["Una cosa da gente con troppo tempo e troppo poco senso", -2],
    ["Una volta l’ho provato, ma l’ho dimenticato", -1],
    ["Lo preparo ogni tanto, e dico che sono “nel mood”", 1],
    [
      "Lo faccio ogni weekend, con l’uovo in camicia, e lo fotografo",
      2,
      "Avocado toast ogni weekend con l’uovo in camicia: la domenica ha perso ogni mistero.",
    ],
  ]),
  qd("Sagra o brunch?", [
    [
      "Sagra del cinghiale, piatto di plastica e stuzzicadenti",
      -2,
      "Scegli la sagra del cinghiale col piatto di plastica: il tuo brunch ha le zanne.",
    ],
    ["Entrambi, con pari dignità, ma solo se pago poco", 0],
    ["Brunch ogni tanto, con avocado, ma solo se si può prenotare", 1],
    [
      "Brunch con la mimosa, tavolo prenotato in anticipo e foto di gruppo",
      2,
      "Brunch con mimosa e foto di gruppo: la tua domenica ha un RSVP.",
    ],
  ]),
  q("Il cameriere sbaglia l’ordine:", [
    [
      "Parte la scenata, e punto sul principio",
      -2,
      "Fai la scenata per un ordine sbagliato: tutta la sala conosce il tuo nome, e il tuo principio.",
    ],
    ["Pazienza, mangio quello che arriva", -1],
    ["Lo faccio notare senza drammi, con un sorriso", 1],
    [
      "Lo segnalo con garbo chirurgico, e gli lascio anche un consiglio per migliorare",
      2,
      "Dai consigli al cameriere per migliorare: ormai è stato promosso a tuo malgrado.",
    ],
  ]),
  q("Ordinare per il tavolo:", [
    ["Ognuno per sé: la libertà individuale prima di tutto", -2],
    ["Una guardata al menù e basta, non lo studio nemmeno", -1],
    ["Consiglio un piatto se me lo chiedono, con la sicurezza di un sommelier", 1],
    [
      "Prendo io la regia: condivisione e assaggi per tutti, e guai a chi tocca il mio",
      2,
      "Smisti gli assaggi come un generale: i tuoi amici mangiano a turni e ti chiamano “chef”, con paura.",
    ],
  ]),
  q("Come scegli il ristorante:", [
    ["Il primo aperto, senza troppe domande", -2],
    ["Chiedo in giro, e vado dove vanno gli altri", -1],
    ["Leggo tre recensioni e decido, con l’aria di un critico di cucina", 1],
    [
      "Recensioni, menù studiato e prenotazione con anticipo, per avere il tavolo giusto",
      2,
      "Studi il menù due settimane prima: il ristorante ha un fascicolo su di te.",
    ],
  ]),
  q("La piadina perfetta:", [
    ["Salsiccia e cipolla: la tradizione", -2],
    ["Prosciutto e formaggio, senza troppe storie", -1],
    ["Verdure grigliate, perché a me piace stupire", 1],
    [
      "Crudo, squacquerone e rucola con il balsamico a filo, come da manuale",
      2,
      "Balsamico a filo sulla piadina: sei l’unico a sapere quanto sia sottile un filo.",
    ],
  ]),
  qd("Al barbecue tu sei quello che:", [
    [
      "Comanda la griglia, e guai a chi si avvicina",
      -2,
      "Comandi la griglia e allontani gli altri: il barbecue è una cosa seria, e tu sei un po’ meno.",
    ],
    ["Gira le salsicce, ruolo secondario ma onorevole", -1],
    ["Mangia e ringrazia, ospite modello", 0],
    [
      "Porta l’hummus, le verdure marinate e un consiglio sulla salute",
      2,
      "Porti l’hummus al barbecue come una pace da firmare: il fuoco, per rispetto, si abbassa.",
    ],
  ]),
  q("Le spezie in cucina:", [
    ["Sale e pepe: la lista finisce qui", -2],
    ["Un po’ di origano, e se è scaduto, pazienza", -1],
    ["Un discreto assortimento, che uso con la sicurezza di un alchimista", 1],
    [
      "Uno scaffale dedicato con le etichette scritte a mano, in ordine alfabetico",
      2,
      "Spezie in ordine alfabetico: il tuo cumino ha più disciplina di te.",
    ],
  ]),
  q("Cucinare per qualcuno che ti piace:", [
    ["Pasta al burro, che è sicura e non fallisce mai", -2],
    ["Ordino una pizza e dico che è un piano B", -1],
    ["Un primo che conosco bene e una bottiglia buona", 1],
    [
      "Tre portate, candele, playlist dedicata e un piano B per il piano B",
      2,
      "Prepari tre portate e un piano B per il piano B: la serata ha più copioni di un teatro.",
    ],
  ]),
  q("La pizza:", [
    ["Con la forchetta e il coltello? Mi offende", -2],
    ["A pezzi, con le mani, piegata a libro, come si deve", -1],
    ["Con il coltello e la forchetta, sono una persona civile", 1],
    [
      "Prima la fotografo, poi la divido in otto spicchi perfetti con il tagliapizza personale",
      2,
      "Hai il tuo tagliapizza personale: te lo porti in borsa come un cagnolino.",
    ],
  ]),
  q("L’ananas sulla pizza:", [
    [
      "Un reato da codice penale, con l’ergastolo",
      -2,
      "Chiedi l’ergastolo per l’ananas: la frutta non ha mai avuto un nemico così motivato.",
    ],
    ["Non la ordino, ma non faccio il giudice", -1],
    ["Una volta l’ho provata, mi è piaciuta e l’ho detto, scatenando un processo", 1],
    [
      "È la mia preferita, e l’ordino anche per gli altri, per salvarli",
      2,
      "Ordini la pizza all’ananas per tutti: sei il missionario della frutta sul formaggio.",
    ],
  ]),
  q("A cena viene un amico vegano:", [
    [
      "Gli faccio un panino con la mortadella: sono ospitale a modo mio",
      -2,
      "Offri la mortadella a un vegano: il tuo concetto di ospitalità ha le zanne.",
    ],
    ["Gli compro delle patatine e mi sento generoso", -1],
    ["Preparo qualcosa di vegetale, con attenzione", 1],
    [
      "Cucino un menù vegano completo, con il dolce, e poi ci faccio un post",
      2,
      "Menù vegano completo e poi un post: la verdura ha trovato la sua influencer.",
    ],
  ]),
  q("L’insalata:", [
    ["Cibo per i conigli, e io sono un cacciatore", -2],
    ["Un contorno che non mangio mai", -1],
    ["Un’insalata come piatto unico, ogni tanto, per la linea", 1],
    [
      "Una poke bowl con sette ingredienti disposti a spicchi, tutti riconoscibili",
      2,
      "Disponi la poke bowl a spicchi: il pranzo ha un layout e tu un ego.",
    ],
  ]),
  q("Apparecchiare la tavola per gli ospiti:", [
    [
      "Il tavolo è un tavolo, ognuno si arrangia con le sue posate",
      -2,
      "Dici che ognuno si arrangia con le posate: i tuoi ospiti fanno la fila per la forchetta.",
    ],
    ["Una tovaglia normale, se capita, dei piatti in porcellana", -1],
    ["Tovaglioli di stoffa e qualche fiore, per l’atmosfera", 1],
    [
      "Segnaposto scritti a mano e candele che si abbinano alla tovaglia e all’umore",
      2,
      "Segnaposto scritti a mano: la tua cena è un matrimonio da un’ora.",
    ],
  ]),
  q("Le foto al cibo:", [
    ["Mangio e basta: la foto è un insulto al piatto", -2],
    ["Una ogni tanto, per ricordo", -1],
    ["Se il piatto è venuto bene, una foto e un secondo di orgoglio", 1],
    [
      "Sempre, e il piatto aspetta finché non ho trovato l’angolazione giusta",
      2,
      "Il piatto aspetta l’angolazione giusta: al cibo non resta che raffreddarsi.",
    ],
  ]),
  q("Il pane:", [
    ["Bianco, morbido, in un sacchetto di carta, e in fretta", -2],
    ["Quello integrale, perché mi hanno detto che fa bene", -1],
    ["Il pane del forno sotto casa, ogni mattina, e conosco il nome del fornaio", 1],
    [
      "Faccio il lievito madre in casa, e gli ho dato un nome: si chiama Ivan",
      2,
      "Il tuo lievito madre ha un nome: è la relazione più stabile che hai.",
    ],
  ]),
  q("Il tagliere di formaggi:", [
    ["Un taglio unico, quello che costa meno, e la discussione chiusa", -2],
    ["Un classico: pecorino e parmigiano, senza marmellate", -1],
    ["Tre formaggi con una marmellata di fichi", 1],
    [
      "Sei formaggi in ordine di stagionatura, con il miele di castagno e le noci caramellate",
      2,
      "Formaggi in ordine di stagionatura: il tuo tagliere ha una gerarchia militare.",
    ],
  ]),
  q("La cena a lume di candela:", [
    ["Per risparmiare la corrente, ma solo se manca davvero", -2],
    ["Una candela, ma se si spegne la rimetto a posto in fretta", -1],
    ["Con la musica di sottofondo e due candele, per l’atmosfera", 1],
    [
      "Con le candele profumate, i petali sul tavolo e il playlist dei Lo-Fi",
      2,
      "Petali sul tavolo per cena: il tuo appartamento ha più atmosfera di una cattedrale.",
    ],
  ]),
  q("In cucina sei:", [
    ["Quello che mangia e non lava niente", -2],
    ["Il lavapiatti, che almeno serve", -1],
    ["Il cuoco, con un paio di assistenti e un grembiule che dico di non aver scelto", 1],
    [
      "Lo chef che comanda la cucina, con il grembiule coordinato alla tovaglia",
      2,
      "Grembiule coordinato alla tovaglia: la tua cucina ha un’uniforme.",
    ],
  ]),
  q("Il tuo frigorifero:", [
    [
      "Birra, una salsa scaduta, e un limone che prega",
      -2,
      "Nel tuo frigorifero c’è un limone che prega: nemmeno lui ci spera più.",
    ],
    ["Quello che ho comprato la settimana scorsa e ho dimenticato", -1],
    ["Pieno di cose fresche, e una dispensa organizzata", 1],
    [
      "Contenitori trasparenti con le etichette e la data di scadenza, in file perfette",
      2,
      "Etichette e date di scadenza: il frigorifero ha l’ordine che manca al resto della tua vita.",
    ],
  ]),
  q("Il kebab alle tre di notte:", [
    ["Doppia carne, salsa piccante e la sensazione di essere un re", -2],
    ["Un classico con l’insalata, perché mi tengo in forma", -1],
    ["Lo prendo con le posate: il mio kebab ha una dignità", 1],
    [
      "Ho preparato un pasto da casa e lo mangio con eleganza, alla stessa ora",
      2,
      "Un pasto pianificato alle tre di notte: il tuo stomaco ha un contratto.",
    ],
  ]),
  q("La cena di Natale:", [
    ["Mangio tutto, e mi lamento di ogni pietanza", -2],
    ["Mangio il giusto, e poi dormo sul divano", -1],
    ["Aiuto in cucina e mi faccio un nome con il dolce", 1],
    [
      "Pianifico il menù tre mesi prima, con prove generali e una cartellina per le ricette",
      2,
      "Menù di Natale pianificato a settembre: la tua famiglia ha un amministratore delegato.",
    ],
  ]),
];
