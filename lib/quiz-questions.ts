/*
  Pool delle 60 domande del quiz "Quanto sei gay?" (sezione 6 del brief).
  Ogni sessione ne pesca 15 a caso. Zero chiamate AI: costi zero.

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

export function pescaDomande(quante = 15): DomandaServita[] {
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
