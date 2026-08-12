/*
  Pool delle 120 domande del quiz "Quanto sei gay?".
  Ogni sessione ne pesca 20 a caso. Zero chiamate AI: costi zero.

  Registro comico della sezione 1.1: il bersaglio è l'ansia da maschio
  alfa e l'assurdità di misurare queste cose, mai le persone omosessuali.
  Da qui le inversioni volute: nella logica assurda del bar, prudenza,
  gusto e intelligenza emotiva fanno salire la percentuale.

  I pesi vanno da -2 a +2 e restano SOLO lato server: il client riceve
  domande e opzioni senza pesi, il punteggio si calcola in /api/quiz/risultato.
*/

export type OpzioneQuiz = { id: string; testo: string; peso: number };
export type DomandaQuiz = { id: string; testo: string; opzioni: OpzioneQuiz[] };

function d(
  id: string,
  testo: string,
  opzioni: Array<[string, number]>
): DomandaQuiz {
  return {
    id,
    testo,
    opzioni: opzioni.map(([t, peso], i) => ({
      id: String.fromCharCode(97 + i),
      testo: t,
      peso,
    })),
  };
}

export const DOMANDE: DomandaQuiz[] = [
  d("q01", "Bevi anche se poi devi guidare?", [
    ["Sì, reggo benissimo", -2],
    ["No, se guido non bevo", 2],
    ["Mi faccio venire a prendere", 1],
  ]),
  d("q02", "Birra media o tinto de verano?", [
    ["Media, sempre e comunque", -1],
    ["Tinto de verano, ovviamente", 2],
  ]),
  d("q03", "Fumi le sigarette normali o le slim?", [
    ["Normali, senza filtro se possibile", -1],
    ["Slim, eleganti", 2],
    ["Non fumo, ci tengo al fiato", 1],
  ]),
  d("q04", "Il tuo rapporto col profumo:", [
    ["Il deodorante è già un lusso", -2],
    ["Cupo e legnoso, da boscaiolo pensieroso", 0],
    ["Floreale e fruttato, una nuvola che entra prima di me", 2],
  ]),
  d("q05", "Skincare?", [
    ["Acqua, sapone e fortuna", -2],
    ["Una crema idratante, una sola", 1],
    ["Routine in sette passaggi, ordine rigoroso", 2],
  ]),
  d("q06", "Aperitivo ideale:", [
    ["Patatine sfuse e birra media", -1],
    ["Spritz con oliva", 1],
    ["Tagliere selezionato e calice di bollicine", 2],
  ]),
  d("q07", "In palestra:", [
    ["Solo ghisa e grugniti", -2],
    ["Pilates, e ho pure il tappetino mio", 2],
    ["Non vado, cammino", 0],
  ]),
  d("q08", "I vocali su WhatsApp:", [
    ["Mai, se è importante chiamo", -1],
    ["Da cinque minuti, con premessa e colpi di scena", 2],
    ["Rispondo con le emoji", 0],
  ]),
  d("q09", "La tua macchina ideale:", [
    ["Pickup diesel, più alto è meglio è", -2],
    ["500 color pastello", 2],
    ["Station wagon onesta", 0],
  ]),
  d("q10", "Karaoke:", [
    ["Mai, piuttosto esco", -2],
    ["Solo cori da stadio, e solo dopo la terza birra", -1],
    ["Ho una canzone firmata, con gestualità studiata", 2],
  ]),
  d("q11", "Al ristorante di pesce ordini:", [
    ["Fritto misto e non se ne parli più", -1],
    ["Il crudo, con domande competenti al cameriere", 2],
  ]),
  d("q12", "La barba:", [
    ["Quando capita, dove capita", -1],
    ["Regolata al millimetro, con olio da barba", 2],
    ["Baffo curato e consapevole", 1],
  ]),
  d("q13", "Il caffè:", [
    ["Nero bollente, senza zucchero, in piedi", -2],
    ["Macchiato con precisione da orologiaio", 1],
    ["Matcha latte con disegnino sulla schiuma", 2],
  ]),
  d("q14", "La musica in macchina:", [
    ["Radio, quello che passa", -1],
    ["Classic rock e basta discussioni", -2],
    ["Playlist curate per stato d'animo e stagione", 2],
  ]),
  d("q15", "Le sopracciglia:", [
    ["Cosa dovrei farci, scusa?", -2],
    ["Una sistemata ogni tanto", 1],
    ["Appuntamento fisso, non si discute", 2],
  ]),
  d("q16", "Il calcio per te:", [
    ["Curva, sciarpa e trasferte", -2],
    ["Lo guardo per stare in compagnia", 0],
    ["Apprezzo soprattutto l'eleganza di certi giocatori", 2],
  ]),
  d("q17", "Quando fa freddo:", [
    ["Felpa e basta, il freddo è mentale", -2],
    ["Cappotto cammello e sciarpa annodata come si deve", 2],
  ]),
  d("q18", "Al barbecue tu sei quello che:", [
    ["Comanda la griglia, e guai a chi si avvicina", -2],
    ["Porta l'hummus e le verdure marinate", 2],
    ["Mangia e ringrazia", 0],
  ]),
  d("q19", "Le candele profumate:", [
    ["Uno spreco di soldi", -2],
    ["Ne ho una per stanza, con nomi tipo Tramonto a Positano", 2],
    ["Solo quando salta la corrente", -1],
  ]),
  d("q20", "I selfie:", [
    ["Mai fatto uno", -1],
    ["Solo di gruppo, in fondo", 0],
    ["Conosco il mio lato migliore e la mia luce", 2],
  ]),
  d("q21", "Il tuo bicchiere al bar:", [
    ["Whisky liscio", -2],
    ["Gin tonic col cetriolo", 1],
    ["Il cocktail col fiore commestibile", 2],
  ]),
  d("q22", "Piante in casa:", [
    ["Sopravvive solo il cactus, a stento", -1],
    ["Ho un ficus e ha un nome", 2],
  ]),
  d("q23", "Vestito per un matrimonio:", [
    ["L'abito del diploma, entra ancora", -2],
    ["Qualcosa di adeguato, deciso la settimana prima", 0],
    ["Outfit costruito con settimane di anticipo e moodboard", 2],
  ]),
  d("q24", "I tuoi jeans:", [
    ["Larghi, da lavoro", -1],
    ["Slim con risvoltino calibrato", 2],
    ["Quelli che trovo puliti", 0],
  ]),
  d("q25", "La crema solare:", [
    ["Mai messa, mi tempro", -2],
    ["Cinquanta più, anche a novembre", 2],
    ["Solo dopo la scottatura", -1],
  ]),
  d("q26", "Sagra o brunch?", [
    ["Sagra del cinghiale", -1],
    ["Brunch con avocado e mimosa", 2],
    ["Entrambi, con pari dignità", 1],
  ]),
  d("q27", "Il sushi:", [
    ["Non lo mangio, roba cruda", -2],
    ["All you can eat, a quantità", 0],
    ["Omakase: si ordina fidandosi dello chef", 2],
  ]),
  d("q28", "Le serie tv:", [
    ["Solo documentari di guerra", -2],
    ["Ho pianto per una serie e lo dico", 2],
    ["Guardo quello che capita", 0],
  ]),
  d("q29", "Il taglio di capelli:", [
    ["Macchinetta a casa, numero due", -2],
    ["Barbiere di fiducia ogni tre settimane", 2],
    ["Quando serve", 0],
  ]),
  d("q30", "Lo spritz:", [
    ["Mai, roba da turisti", -2],
    ["Aperol, il classico", 1],
    ["Hugo con menta fresca", 2],
  ]),
  d("q31", "Il vino:", [
    ["Quello sfuso del contadino", -1],
    ["So dire tannico con disinvoltura", 2],
    ["Bianco ghiacciato d'estate", 1],
  ]),
  d("q32", "La tua emoji più usata:", [
    ["Il pollice in su", -2],
    ["La faccina che piange dal ridere", 0],
    ["Cuoricini, coordinati per colore", 2],
  ]),
  d("q33", "Per portare le tue cose:", [
    ["Zaino tecnico da quaranta litri, sempre", -1],
    ["Tote bag di una libreria indipendente", 2],
    ["Tasche, e che bastino", -2],
  ]),
  d("q34", "Casa tua è:", [
    ["Un campo base", -2],
    ["Arredata con intenzione e luci calde", 2],
    ["Ikea di default", 0],
  ]),
  d("q35", "Occhiali da sole:", [
    ["Quelli del benzinaio, funzionano", -1],
    ["Scelti in base alla forma del viso", 2],
  ]),
  d("q36", "Domenica ideale:", [
    ["Motori e fango", -2],
    ["Mercatino vintage e una mostra", 2],
    ["Divano e campionato", -1],
  ]),
  d("q37", "Stirare:", [
    ["Non stiro, si stende da sola", -2],
    ["Stiro con la riga precisa", 1],
    ["Vaporizzatore portatile, altro pianeta", 2],
  ]),
  d("q38", "Un analcolico al bar:", [
    ["Mai sia", -2],
    ["Se guido, volentieri", 2],
    ["Solo se guarnito come si deve", 1],
  ]),
  d("q39", "Quando un amico è triste:", [
    ["Pacca sulla spalla e cambio discorso", -2],
    ["Ne parliamo davvero, anche a lungo", 2],
    ["Lo porto a bere", 0],
  ]),
  d("q40", "I fiori:", [
    ["Si comprano solo per scusarsi", -2],
    ["Li compro anche per me", 2],
    ["Solo a San Valentino", 0],
  ]),
  d("q41", "Il mare per te:", [
    ["Pesca all'alba, in silenzio", -2],
    ["Beach club col lettino prenotato", 2],
    ["Scoglio libero e panino", 0],
  ]),
  d("q42", "Le scarpe che indossi ora:", [
    ["Da lavoro o da trekking", -2],
    ["Sneaker bianche immacolate", 2],
    ["Le prime che ho trovato", 0],
  ]),
  d("q43", "La carne:", [
    ["Fiorentina al sangue, punto", -2],
    ["Tartare con condimento agrumato", 2],
    ["Pollo, senza pretese", 0],
  ]),
  d("q44", "Maschera viso:", [
    ["Non so nemmeno cosa sia", -2],
    ["Provata una volta, per curiosità", 1],
    ["Il mercoledì sera è sacro", 2],
  ]),
  d("q45", "Sport con gli amici:", [
    ["Ghisa e basta", -1],
    ["Padel col completino coordinato", 2],
    ["Corsa in solitaria", 0],
  ]),
  d("q46", "Le tue unghie:", [
    ["Tronchesino da elettricista", -2],
    ["Curate, lima inclusa", 2],
    ["Quando si spezzano", -1],
  ]),
  d("q47", "Color salvia e verde militare:", [
    ["È tutto verde", -2],
    ["Li distinguo al volo, e anche l'eucalipto", 2],
  ]),
  d("q48", "Su due ruote:", [
    ["Moto grossa, marmitta piena", -2],
    ["Bici vintage col cestino", 2],
    ["Monopattino in prestito", 0],
  ]),
  d("q49", "Il tuo brindisi:", [
    ["Alla salute, e giù", -1],
    ["Discorso commosso con contatto visivo", 2],
  ]),
  d("q50", "Colazione:", [
    ["Caffè al bancone, in piedi", -1],
    ["Pancakes fotografati con luce naturale", 2],
    ["Salto, digiuno intermittente", 0],
  ]),
  d("q51", "Tatuaggi:", [
    ["Tribale, dal 2003", -1],
    ["Minimal fine line con significato profondo", 2],
    ["Nessuno, temo gli aghi e lo ammetto", 1],
  ]),
  d("q52", "Come pieghi le magliette:", [
    ["Appallottolate nel cassetto", -2],
    ["Metodo verticale, cassetti fotografabili", 2],
    ["Le appendo tutte", 1],
  ]),
  d("q53", "San Valentino:", [
    ["Ricorrenza commerciale", -1],
    ["Prenoto con un mese di anticipo", 2],
  ]),
  d("q54", "Serata perfetta:", [
    ["Poker e sigari", -2],
    ["Cena etnica e cocktail bar nascosto", 2],
    ["Birra e partita", -1],
  ]),
  d("q55", "La tua doccia dura:", [
    ["Quattro minuti, acqua fredda", -2],
    ["Un podcast intero, scrub incluso", 2],
  ]),
  d("q56", "Conosci il tuo colore stagione?", [
    ["Il mio cosa?", -1],
    ["Sono un autunno profondo, grazie", 2],
  ]),
  d("q57", "Piangere a un film:", [
    ["Non piango ai film", -2],
    ["Piango e poi cito la scena per mesi", 2],
    ["Lacrimuccia negata con decisione", 0],
  ]),
  d("q58", "Il dolce al ristorante:", [
    ["Mai, amaro e via", -2],
    ["Tiramisù da condividere", 1],
    ["Dolce al piatto con la quenelle", 2],
  ]),
  d("q59", "Il gruppo del fantacalcio:", [
    ["Ne gestisco tre", -2],
    ["Ci sto per le battute", 0],
    ["L'ho silenziato nel 2021", 1],
  ]),
  d("q60", "Ultima: quanto pensi di essere gay?", [
    ["Zero, garantito al cento per cento", -2],
    ["Boh, sono qui per scoprirlo", 1],
    ["Le percentuali le decide il Gayometro", 2],
  ]),
  d("q61", "Il caffè al ginseng:", [
    ["Un insulto alla moka", -1],
    ["Tazza grande, e godo", 2],
  ]),
  d("q62", "In spiaggia stendi:", [
    ["Il telo della squadra", -1],
    ["Telo coordinato col costume", 2],
    ["Niente, sabbia diretta", -2],
  ]),
  d("q63", "Quando canti in macchina da solo:", [
    ["Non canto nemmeno da solo", -2],
    ["Canto e faccio pure le seconde voci", 2],
  ]),
  d("q64", "La borraccia:", [
    ["Bottiglietta del super riusata da mesi", -1],
    ["Pastello, con gli adesivi", 2],
    ["Bevo quando capita, dove capita", -2],
  ]),
  d("q65", "Ti fanno un complimento:", [
    ["Cambio discorso, imbarazzo totale", -1],
    ["Ringrazio e rilancio con un complimento mirato", 2],
  ]),
  d("q66", "La tua foto profilo:", [
    ["La stessa dal 2016", -2],
    ["Aggiornata a ogni stagione, con direzione creativa", 2],
    ["Non ho foto profilo", -1],
  ]),
  d("q67", "Ikea con gli amici:", [
    ["Entro, prendo i tasselli, esco", -1],
    ["È una gita: polpette, reparto candele, lista desideri", 2],
  ]),
  d("q68", "Gli stivaletti chelsea:", [
    ["Cosa sono?", -2],
    ["Ne ho due paia, ovvio", 2],
  ]),
  d("q69", "La montagna per te:", [
    ["Ferrata all'alba, in silenzio", -2],
    ["Baita instagrammabile con plaid", 2],
    ["Rifugio, grappa e briscola", -1],
  ]),
  d("q70", "Lo schermo del tuo telefono:", [
    ["Crepato da mesi, funziona uguale", -2],
    ["Pellicola perfetta e cover coordinata", 2],
  ]),
  d("q71", "Compleanno di un amico:", [
    ["Bonifico e pacca sulla spalla", -1],
    ["Regalo pensato con mesi di anticipo e biglietto scritto a mano", 2],
  ]),
  d("q72", "Lo smalto:", [
    ["Manco morto", -2],
    ["Trasparente rinforzante, e allora?", 2],
    ["Una volta, per scommessa", 1],
  ]),
  d("q73", "La piadina perfetta:", [
    ["Salsiccia e cipolla", -1],
    ["Crudo, squacquerone e rucola con balsamico a filo", 2],
  ]),
  d("q74", "Serie doppiata o in lingua?", [
    ["Doppiata, non pago per leggere", -1],
    ["Lingua originale, ovviamente", 2],
  ]),
  d("q75", "Le ciabatte:", [
    ["Di gomma da mare, tutto l'anno", -2],
    ["Pantofole di casa, anche per gli ospiti", 1],
    ["Mule di design", 2],
  ]),
  d("q76", "Un weekend libero:", [
    ["Garage e motori", -2],
    ["Cittadina europea con itinerario salvato nelle note", 2],
    ["Divano e console", -1],
  ]),
  d("q77", "Il cameriere sbaglia l'ordine:", [
    ["Pazienza, mangio quello che arriva", 0],
    ["Lo segnalo con garbo chirurgico", 2],
    ["Parte la scenata", -2],
  ]),
  d("q78", "I tuoi calzini:", [
    ["Bianchi da tennis, con tutto", -2],
    ["Fantasia, coordinati all'outfit", 2],
    ["Neri e basta", 0],
  ]),
  d("q79", "Festa a tema:", [
    ["Non mi travesto, mai", -2],
    ["Arrivo con l'outfit più curato della serata", 2],
  ]),
  d("q80", "Lo yoga:", [
    ["Roba per gente che ha tempo", -2],
    ["Ci vado e ho il mio tappetino", 2],
    ["Solo stretching dopo la partita", 0],
  ]),
  d("q81", "Fine cena:", [
    ["Amaro, sempre amaro", -1],
    ["Bollicine, brindisi e foto di gruppo", 2],
  ]),
  d("q82", "Playlist condivise:", [
    ["Mai fatta una", -1],
    ["Ne curo tre, con dedizione", 2],
  ]),
  d("q83", "Quando piove forte:", [
    ["Cappuccio e via", -2],
    ["Ombrello serio e scarpe salvate a ogni costo", 2],
  ]),
  d("q84", "Casa nuova di un amico:", [
    ["Porto le birre", 0],
    ["Porto una pianta col biglietto", 2],
    ["Non porto niente, ci mancherebbe", -2],
  ]),
  d("q85", "Il tuo Spotify Wrapped:", [
    ["Non lo condivido, fatti miei", -1],
    ["Lo impagino e lo commento pubblicamente", 2],
  ]),
  d("q86", "Giacca per l'autunno:", [
    ["Giaccone da lavoro", -2],
    ["Trench", 2],
    ["Bomber vintage", 1],
  ]),
  d("q87", "Il gelato:", [
    ["Cono, due gusti, classici", 0],
    ["Coppetta pistacchio con degustazione critica", 2],
    ["Non mangio gelato", -2],
  ]),
  d("q88", "Differenza tra écru e panna:", [
    ["Non esiste e sto bene così", -2],
    ["Esiste eccome, e c'è anche l'avorio", 2],
  ]),
  d("q89", "Falò in spiaggia:", [
    ["Chitarra e cori da stadio", -1],
    ["Coperte, lucine e playlist studiata", 2],
  ]),
  d("q90", "Il barbiere ti propone un trattamento nuovo:", [
    ["No, taglio e basta", -1],
    ["Dimmi tutto, sono curioso", 2],
  ]),
  d("q91", "L'assaggio del vino al ristorante:", [
    ["Mi imbarazza, saltiamo", -1],
    ["Roteo il calice e annuisco da sommelier", 2],
  ]),
  d("q92", "La borsa della palestra:", [
    ["Busta del supermercato", -2],
    ["Borsone tecnico con scomparto scarpe", 1],
    ["Borsa dedicata, beauty incluso", 2],
  ]),
  d("q93", "Piangere a un matrimonio:", [
    ["Mai successo", -2],
    ["A ogni discorso", 2],
    ["Solo di nascosto", 1],
  ]),
  d("q94", "L'acqua al bar:", [
    ["Naturale, che domande", -1],
    ["Frizzante, vivace", 1],
    ["Con ghiaccio e fetta di limone anche a gennaio", 2],
  ]),
  d("q95", "Le tue storie Instagram:", [
    ["Non esisto sui social", -1],
    ["Tramonti con font scelto a mano", 2],
    ["Repost di meme", 0],
  ]),
  d("q96", "Un amico chiede un parere sull'outfit:", [
    ["Boh, uguale", -2],
    ["Consulenza completa con alternative", 2],
  ]),
  d("q97", "Il ghiaccio nei drink:", [
    ["Quello del congelatore, a caso", -1],
    ["Cubo grande singolo, come nei bar seri", 2],
  ]),
  d("q98", "Le tovagliette all'americana:", [
    ["Si mangia sul tavolo", -2],
    ["Coordinate ai piatti", 2],
  ]),
  d("q99", "Ordinare per il tavolo:", [
    ["Ognuno per sé", -1],
    ["Prendo io la regia: condivisione e assaggi per tutti", 2],
  ]),
  d("q100", "Stirare una camicia:", [
    ["Non so e non voglio imparare", -2],
    ["Colletto e polsini perfetti", 2],
    ["La porto in lavanderia", 1],
  ]),
  d("q101", "Il campeggio:", [
    ["Tenda, coltello, fuoco", -2],
    ["Glamping con lucine", 2],
    ["Mai dormito fuori", 0],
  ]),
  d("q102", "Auguri di compleanno in chat:", [
    ["Auguri, punto", -2],
    ["Messaggio personalizzato con ricordo ed emoji scelte", 2],
  ]),
  d("q103", "Un pomeriggio ai saldi:", [
    ["Incubo, aspetto fuori", -2],
    ["Strategia, lista e percorso studiato", 2],
  ]),
  d("q104", "Il tuo toast:", [
    ["Prosciutto e formaggio, e via", -1],
    ["Avocado con uovo in camicia", 2],
  ]),
  d("q105", "Coreografie:", [
    ["Non ne conosco manco una", -1],
    ["Ne so una a memoria e ai matrimoni parte da sola", 2],
  ]),
  d("q106", "Le lucine in camera:", [
    ["Roba da adolescenti", -1],
    ["Calde, dimmerabili, atmosfera", 2],
  ]),
  d("q107", "Come scegli il ristorante:", [
    ["Il primo aperto", -2],
    ["Recensioni, menu studiato, prenotazione", 2],
  ]),
  d("q108", "La tazza della colazione:", [
    ["Una vale l'altra", -1],
    ["Ho LA tazza, e guai a chi la tocca", 2],
  ]),
  d("q109", "I mercatini di Natale:", [
    ["Ressa e vin brulé sopravvalutato", -1],
    ["Itinerario, programma e cioccolata calda", 2],
  ]),
  d("q110", "La raccolta differenziata:", [
    ["Più o meno", -1],
    ["Rigore svizzero e contenitori etichettati", 2],
  ]),
  d("q111", "Musica in allenamento:", [
    ["No: solo ferro e respiro", -2],
    ["Playlist pump con transizioni curate", 2],
  ]),
  d("q112", "La tua firma:", [
    ["Uno scarabocchio veloce", -1],
    ["Studiata, con svolazzo finale", 2],
  ]),
  d("q113", "I pancake:", [
    ["Colazione da bar, non cucino", -1],
    ["Pila perfetta e sciroppo, foto di rito", 2],
  ]),
  d("q114", "Gli occhiali da vista:", [
    ["Li evito finché posso", -1],
    ["Montatura scelta come accessorio", 2],
  ]),
  d("q115", "Lavare la macchina:", [
    ["Ci pensa la pioggia", -1],
    ["Idropulitrice domenicale, rito sacro", -2],
    ["Interni profumati alla vaniglia e specchietti lucidi", 2],
  ]),
  d("q116", "Un ballo lento:", [
    ["Mi siedo e aspetto che passi", -2],
    ["Guido io, con eleganza", 2],
  ]),
  d("q117", "Le spezie in cucina:", [
    ["Sale e pepe, fine della lista", -2],
    ["Scaffale dedicato con etichette scritte bene", 2],
  ]),
  d("q118", "La tua agenda:", [
    ["Tutto a memoria", -1],
    ["Planner con colori per categoria", 2],
  ]),
  d("q119", "Il pigiama:", [
    ["Boxer e maglietta sformata", -1],
    ["Completo coordinato, anche d'estate", 2],
  ]),
  d("q120", "Chiusura: consiglieresti questo quiz agli amici?", [
    ["No, e cancello pure la cronologia", -2],
    ["Già girato nel gruppo, con sfida aperta", 2],
    ["Solo a chi può reggere il confronto", 1],
  ]),
];

const INDICE = new Map(DOMANDE.map((domanda) => [domanda.id, domanda]));

export function domandaPerId(id: string): DomandaQuiz | undefined {
  return INDICE.get(id);
}

/* Versione senza pesi da mandare al client */
export type DomandaServita = {
  id: string;
  testo: string;
  opzioni: Array<{ id: string; testo: string }>;
};

export function pescaDomande(quante = 20): DomandaServita[] {
  const mazzo = [...DOMANDE];
  for (let i = mazzo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mazzo[i], mazzo[j]] = [mazzo[j], mazzo[i]];
  }
  return mazzo.slice(0, quante).map((domanda) => ({
    id: domanda.id,
    testo: domanda.testo,
    opzioni: domanda.opzioni.map(({ id, testo }) => ({ id, testo })),
  }));
}
