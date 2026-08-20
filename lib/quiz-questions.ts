/*
  Pool delle 120 domande del quiz "Quanto sei gay?".
  Ogni sessione ne pesca 20 a caso. Zero chiamate AI: costi zero.
  Ogni domanda ha tra 3 e 5 opzioni: il numero varia domanda per domanda,
  in base a quante sfumature comiche regge il tema.

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
    ["Sì, reggo come un toro, guido lo stesso", -2],
    ["Una va bene, la seconda la salto", -1],
    ["Mi faccio venire a prendere, il fegato è sacro", 1],
    ["Se guido non bevo nemmeno l'acqua tonica, per principio", 2],
  ]),
  d("q02", "Birra media o tinto de verano?", [
    ["Media, litri, dritto al bancone", -2],
    ["Tinto de verano, senza vergogna", 1],
    ["Sangria fatta in casa, frutta tagliata a coltello", 2],
  ]),
  d("q03", "Fumi le sigarette normali o le slim?", [
    ["Normali, senza filtro, tosse compresa", -2],
    ["Normali col filtro, sono mica un animale", -1],
    ["Non fumo, ci tengo al fiato", 0],
    ["Slim, sottili ed eleganti", 1],
    ["Sigaretta elettronica al gusto di frutti rossi", 2],
  ]),
  d("q04", "Il tuo rapporto col profumo:", [
    ["Il deodorante è già uno sforzo", -2],
    ["Uno spruzzo di quello di papà, tanto basta", -1],
    ["Cupo e legnoso, da boscaiolo pensieroso", 0],
    ["Ne ho tre, uno per occasione", 1],
    ["Floreale e fruttato, una nuvola che entra prima di me", 2],
  ]),
  d("q05", "Skincare?", [
    ["Acqua, sapone e tanta fortuna", -2],
    ["Una crema idratante, presa al super", 0],
    ["Routine in tre passaggi, minimo sindacale", 1],
    ["Routine in sette passaggi, ordine militare", 2],
  ]),
  d("q06", "Aperitivo ideale:", [
    ["Patatine sfuse e birra media", -2],
    ["Spritz con l'oliva, semplice ed efficace", 0],
    ["Tagliere selezionato con abbinamenti studiati", 1],
    ["Calice di bollicine e chiacchiere sul terroir", 2],
  ]),
  d("q07", "In palestra:", [
    ["Solo ghisa e grugniti, il resto è tempo perso", -2],
    ["Non vado, cammino e mi basta", -1],
    ["Crossfit, mi piace soffrire in compagnia", 1],
    ["Pilates, e ho pure il tappetino mio col nome ricamato", 2],
  ]),
  d("q08", "I vocali su WhatsApp:", [
    ["Mai, se è importante chiamo", -2],
    ["Rispondo con le emoji, risparmio fiato", -1],
    ["Corti e al punto, zero fronzoli", 1],
    ["Da cinque minuti, con premessa, colpo di scena e morale finale", 2],
  ]),
  d("q09", "La tua macchina ideale:", [
    ["Pickup diesel, più alto è meglio è", -2],
    ["Station wagon onesta, fa il suo lavoro", -1],
    ["500 color pastello, col fiocco se potessi", 1],
    ["Decappottabile per portare i capelli al vento anche a gennaio", 2],
  ]),
  d("q10", "Karaoke:", [
    ["Mai, piuttosto esco a fumare", -2],
    ["Solo cori da stadio, e solo dopo la terza birra", -1],
    ["Una canzone a testa, mi adeguo", 0],
    ["Ho una canzone firmata, con gestualità e cambio luci mentale", 2],
  ]),
  d("q11", "Al ristorante di pesce ordini:", [
    ["Fritto misto e non se ne parli più", -2],
    ["Spaghetti alle vongole, sul sicuro", -1],
    ["Il crudo, con domande competenti al cameriere", 1],
    ["Tris di crudi con abbinamento vini a parte", 2],
  ]),
  d("q12", "La barba:", [
    ["Rasata a zero, meno pensieri", -2],
    ["Quando capita, dove capita", -1],
    ["Baffo curato e consapevole", 1],
    ["Regolata al millimetro, con olio da barba dedicato", 2],
  ]),
  d("q13", "Il caffè:", [
    ["Nero bollente, senza zucchero, in piedi al bancone", -2],
    ["Macchiato, il classico", -1],
    ["Espresso doppio per svegliarmi davvero", 0],
    ["Macchiato con precisione da orologiaio svizzero", 1],
    ["Matcha latte con disegnino sulla schiuma", 2],
  ]),
  d("q14", "La musica in macchina:", [
    ["Classic rock e basta discussioni", -2],
    ["Radio, quello che passa il convento", -1],
    ["Podcast di true crime, mi rilassa", 0],
    ["Playlist curate per stato d'animo e stagione", 2],
  ]),
  d("q15", "Le sopracciglia:", [
    ["Cosa dovrei farci, scusa?", -2],
    ["Le taglio con le forbicine se sono troppo lunghe", -1],
    ["Una sistemata ogni tanto, dal barbiere", 1],
    ["Appuntamento fisso, non si discute", 2],
  ]),
  d("q16", "Il calcio per te:", [
    ["Curva, sciarpa e trasferte, sempre", -2],
    ["Lo guardo al bar con gli amici", -1],
    ["Lo guardo per stare in compagnia, tifo blando", 0],
    ["Apprezzo soprattutto l'eleganza di certi giocatori", 2],
  ]),
  d("q17", "Quando fa freddo:", [
    ["Felpa e basta, il freddo è mentale", -2],
    ["Cappotto cammello e sciarpa annodata come si deve", 1],
    ["Piumino oversize con sciarpa coordinata, statement invernale", 2],
  ]),
  d("q18", "Al barbecue tu sei quello che:", [
    ["Comanda la griglia, e guai a chi si avvicina", -2],
    ["Gira le salsicce, ruolo secondario", -1],
    ["Mangia e ringrazia, ospite modello", 0],
    ["Porta l'hummus e le verdure marinate", 2],
  ]),
  d("q19", "Le candele profumate:", [
    ["Uno spreco di soldi, punto", -2],
    ["Solo quando salta la corrente", -1],
    ["Un paio in salotto, per l'atmosfera", 1],
    ["Ne ho una per stanza, con nomi tipo Tramonto a Positano", 2],
  ]),
  d("q20", "I selfie:", [
    ["Mai fatto uno in vita mia", -2],
    ["Solo di gruppo, in fondo, mai da protagonista", -1],
    ["Ogni tanto, se la luce è buona", 1],
    ["Conosco il mio lato migliore e la mia luce naturale", 2],
  ]),
  d("q21", "Il tuo bicchiere al bar:", [
    ["Whisky liscio, senza ghiaccio, senza pietà", -2],
    ["Birra, la vita è già complicata", -1],
    ["Gin tonic col cetriolo", 1],
    ["Il cocktail col fiore commestibile e la schiuma d'autore", 2],
  ]),
  d("q22", "Piante in casa:", [
    ["Sopravvive solo il cactus, a stento", -2],
    ["Una pianta finta, che almeno non muore", -1],
    ["Ho un ficus e ha un nome", 1],
    ["Serra da appartamento con orario di irrigazione", 2],
  ]),
  d("q23", "Vestito per un matrimonio:", [
    ["L'abito del diploma, entra ancora, quasi", -2],
    ["Qualcosa di adeguato, deciso la settimana prima", -1],
    ["Vestito nuovo, ma niente di troppo elaborato", 0],
    ["Outfit costruito con settimane di anticipo e moodboard", 1],
    ["Ho già chiesto al sarto una modifica su misura", 2],
  ]),
  d("q24", "I tuoi jeans:", [
    ["Larghi, da lavoro, comodi e basta", -2],
    ["Quelli che trovo puliti", -1],
    ["Slim con risvoltino calibrato al millimetro", 1],
    ["Strappati nei punti giusti, studiati a tavolino", 2],
  ]),
  d("q25", "La crema solare:", [
    ["Mai messa, mi tempro come i nostri avi", -2],
    ["Solo dopo la scottatura, tipo pompieri", -1],
    ["Fattore trenta, se me la ricordo", 1],
    ["Cinquanta più, anche a novembre, anche in ufficio", 2],
  ]),
  d("q26", "Sagra o brunch?", [
    ["Sagra del cinghiale, plastica e stuzzicadenti", -2],
    ["Entrambi, con pari dignità", 0],
    ["Brunch con avocado toast", 1],
    ["Brunch con avocado e mimosa, tavolo prenotato", 2],
  ]),
  d("q27", "Il sushi:", [
    ["Non lo mangio, roba cruda, no grazie", -2],
    ["All you can eat, a quantità, gara con gli amici", -1],
    ["Menu alla carta, scelgo con criterio", 1],
    ["Omakase, mi fido dello chef a scatola chiusa", 2],
  ]),
  d("q28", "Le serie tv:", [
    ["Solo documentari di guerra e motori", -2],
    ["Guardo quello che capita, senza fissarmi", -1],
    ["Ho pianto per una serie e lo ammetto pubblicamente", 1],
    ["Ho un podcast di approfondimento sulla serie che sto guardando", 2],
  ]),
  d("q29", "Il taglio di capelli:", [
    ["Macchinetta a casa, numero due, fine della storia", -2],
    ["Quando serve, senza troppa fissa", -1],
    ["Barbiere di fiducia ogni tre settimane", 1],
    ["Ho il numero privato del mio hair stylist", 2],
  ]),
  d("q30", "Lo spritz:", [
    ["Mai, roba da turisti in centro", -2],
    ["Aperol, il classico, senza fronzoli", -1],
    ["Campari, per chi ha fatto un po' di gavetta", 0],
    ["Hugo con menta fresca colta da me", 2],
  ]),
  d("q31", "Il vino:", [
    ["Quello sfuso del contadino, in damigiana", -2],
    ["Il primo della lista, tanto son tutti uguali", -1],
    ["So dire tannico con disinvoltura", 1],
    ["Bianco ghiacciato d'estate, con annata precisa", 2],
  ]),
  d("q32", "La tua emoji più usata:", [
    ["Il pollice in su, e via", -2],
    ["La faccina che piange dal ridere", -1],
    ["Le mani che pregano, per ogni occasione", 0],
    ["Cuoricini, coordinati per colore col messaggio", 2],
  ]),
  d("q33", "Per portare le tue cose:", [
    ["Tasche, e che bastino", -2],
    ["Zaino tecnico da quaranta litri, sempre", -1],
    ["Borsa a tracolla, praticità prima di tutto", 1],
    ["Tote bag di una libreria indipendente", 2],
  ]),
  d("q34", "Casa tua è:", [
    ["Un campo base, letto e basta", -2],
    ["Ikea di default, funzionale", -1],
    ["Un po' arredata, senza strafare", 0],
    ["Arredata con un minimo di gusto", 1],
    ["Arredata con intenzione, luci calde e mood board", 2],
  ]),
  d("q35", "Occhiali da sole:", [
    ["Quelli del benzinaio, funzionano lo stesso", -2],
    ["Scelti in base alla forma del viso", 1],
    ["Collezione per stagione e outfit", 2],
  ]),
  d("q36", "Domenica ideale:", [
    ["Motori e fango, tutto il giorno", -2],
    ["Divano e campionato dalla mattina alla sera", -1],
    ["Mercatino vintage e una mostra", 1],
    ["Passeggiata culturale con audioguida scaricata", 2],
  ]),
  d("q37", "Stirare:", [
    ["Non stiro, si stende da sola", -2],
    ["Stiro il minimo indispensabile", -1],
    ["Stiro con la riga precisa, orgoglio personale", 1],
    ["Vaporizzatore portatile, altro pianeta", 2],
  ]),
  d("q38", "Un analcolico al bar:", [
    ["Mai sia, che discorsi", -2],
    ["Se guido, volentieri, ma controvoglia", -1],
    ["Solo se guarnito come si deve", 1],
    ["Lo ordino anche senza guidare, mi piace il rituale", 2],
  ]),
  d("q39", "Quando un amico è triste:", [
    ["Pacca sulla spalla e cambio discorso", -2],
    ["Lo porto a bere, risolve tutto", -1],
    ["Ne parliamo un po', poi vediamo", 1],
    ["Ne parliamo davvero, anche a lungo, occhi negli occhi", 2],
  ]),
  d("q40", "I fiori:", [
    ["Si comprano solo per scusarsi di qualcosa", -2],
    ["Solo a San Valentino, per dovere", -1],
    ["Li porto quando vado a cena da qualcuno", 1],
    ["Li compro anche per me, ogni settimana", 2],
  ]),
  d("q41", "Il mare per te:", [
    ["Pesca all'alba, in silenzio, canna in mano", -2],
    ["Scoglio libero e panino, essenziale", -1],
    ["Stabilimento con ombrellone fisso da anni", 1],
    ["Beach club col lettino prenotato e musica lounge", 2],
  ]),
  d("q42", "Le scarpe che indossi ora:", [
    ["Da lavoro o da trekking, robuste", -2],
    ["Le prime che ho trovato nell'armadio", -1],
    ["Sneaker comode, niente di che", 1],
    ["Sneaker bianche immacolate, pulite col fazzoletto", 2],
  ]),
  d("q43", "La carne:", [
    ["Fiorentina al sangue, e non se ne parla", -2],
    ["Pollo alla griglia, senza pretese", -1],
    ["Tagliata con rucola e scaglie", 1],
    ["Tartare con condimento agrumato, montata al tavolo", 2],
  ]),
  d("q44", "Maschera viso:", [
    ["Non so nemmeno cosa sia", -2],
    ["Provata una volta, per curiosità", -1],
    ["Un paio di prodotti skincare base", 0],
    ["Ogni tanto, quando la pelle protesta", 1],
    ["Il mercoledì sera è sacro, con musica di sottofondo", 2],
  ]),
  d("q45", "Sport con gli amici:", [
    ["Ghisa e basta, muscoli e sudore", -2],
    ["Corsa in solitaria la domenica", -1],
    ["Calcetto il martedì, tradizione intoccabile", 1],
    ["Padel col completino coordinato", 2],
  ]),
  d("q46", "Le tue unghie:", [
    ["Tronchesino da elettricista, all'occorrenza", -2],
    ["Quando si spezzano, le sistemo alla bell'e meglio", -1],
    ["Curate, lima sempre in tasca", 1],
    ["Manicure mensile, cuticole perfette", 2],
  ]),
  d("q47", "Color salvia e verde militare:", [
    ["È tutto verde, che vuoi da me", -2],
    ["So che sono diversi ma non saprei spiegare", -1],
    ["Li distinguo, li abbino con criterio", 1],
    ["Li distinguo al volo, e anche l'eucalipto dal verde bosco", 2],
  ]),
  d("q48", "Su due ruote:", [
    ["Moto grossa, marmitta piena, rumore garantito", -2],
    ["Motorino per andare al lavoro", -1],
    ["Bici da corsa, tuta aderente inclusa", 1],
    ["Bici vintage col cestino e i fiori finti", 2],
  ]),
  d("q49", "Il tuo brindisi:", [
    ["Alla salute, e giù, veloce", -2],
    ["Discorso preparato, con una battuta studiata", 1],
    ["Discorso commosso con contatto visivo e pausa drammatica", 2],
  ]),
  d("q50", "Colazione:", [
    ["Caffè al bancone, in piedi, tre minuti", -2],
    ["Cornetto e cappuccino, il classico", -1],
    ["Salto, digiuno intermittente, questione di disciplina", 0],
    ["Pancakes fotografati con luce naturale prima di mangiarli", 2],
  ]),
  d("q51", "Tatuaggi:", [
    ["Tribale sul bicipite, dal duemilatré", -2],
    ["Nessuno, temo gli aghi e lo ammetto", -1],
    ["Uno piccolo, nascosto, con un significato", 1],
    ["Minimal fine line con significato profondo, il secondo di una serie", 2],
  ]),
  d("q52", "Come pieghi le magliette:", [
    ["Appallottolate nel cassetto, tanto si stirano da sole", -2],
    ["Le appendo tutte, anche le t-shirt", -1],
    ["Piegate normali, in pila", 1],
    ["Metodo verticale alla giapponese, cassetti fotografabili", 2],
  ]),
  d("q53", "San Valentino:", [
    ["Ricorrenza commerciale, non ci casco", -2],
    ["Una cena normale, senza esagerare", -1],
    ["Prenoto con un mese di anticipo", 1],
    ["Prenoto con un mese di anticipo e organizzo una sorpresa a tema", 2],
  ]),
  d("q54", "Serata perfetta:", [
    ["Poker e sigari, tra uomini", -2],
    ["Birra e partita, sul divano", -1],
    ["Aperitivo con gli amici, via di mezzo", 0],
    ["Cena fuori, niente di che", 1],
    ["Cena etnica e cocktail bar nascosto dietro una libreria", 2],
  ]),
  d("q55", "La tua doccia dura:", [
    ["Quattro minuti, acqua fredda, dentro e fuori", -2],
    ["Un podcast intero, con scrub ogni tanto", 1],
    ["Un podcast intero, scrub incluso, canto compreso", 2],
  ]),
  d("q56", "Conosci il tuo colore stagione?", [
    ["Il mio cosa, scusa?", -2],
    ["Ne ho sentito parlare, boh", -1],
    ["Più o meno, qualcosa sui toni caldi", 1],
    ["Sono un autunno profondo, grazie, l'ho fatto controllare", 2],
  ]),
  d("q57", "Piangere a un film:", [
    ["Non piango ai film, punto fermo", -2],
    ["Lacrimuccia negata con decisione, tosse di copertura", -1],
    ["Un po', se proprio è tragico", 1],
    ["Piango e poi cito la scena per settimane", 2],
  ]),
  d("q58", "Il dolce al ristorante:", [
    ["Mai, amaro e via, punto", -2],
    ["Un morso da quello di qualcun altro, tanto basta", -1],
    ["Tiramisù da condividere, un cucchiaio a testa", 1],
    ["Dolce al piatto con la quenelle fotografata prima", 2],
  ]),
  d("q59", "Il gruppo del fantacalcio:", [
    ["Ne gestisco tre, con foglio excel dedicato", -2],
    ["Ci sto, seguo distratto", -1],
    ["L'ho silenziato nel 2021 e non ho rimpianti", 1],
    ["Non ne ho mai fatto parte per scelta", 2],
  ]),
  d("q60", "Ultima: quanto pensi di essere gay?", [
    ["Zero, garantito al cento per cento, firmato e timbrato", -2],
    ["Un po', il minimo sindacale", -1],
    ["Boh, sono qui per scoprirlo", 1],
    ["Le percentuali le decide il Gayometro, io mi fido", 2],
  ]),
  d("q61", "Il caffè al ginseng:", [
    ["Un insulto alla moka di mia nonna", -2],
    ["Ogni tanto, per cambiare", 1],
    ["Tazza grande, e godo senza vergogna", 2],
  ]),
  d("q62", "In spiaggia stendi:", [
    ["Niente, sabbia diretta sulla pelle", -2],
    ["Il telo della squadra, sbiadito ma glorioso", -1],
    ["Un telo normale, va bene tutto", 1],
    ["Telo coordinato al costume, con borsa da mare abbinata", 2],
  ]),
  d("q63", "Quando canti in macchina da solo:", [
    ["Non canto nemmeno da solo, che vergogna", -2],
    ["Canticchio piano, giusto il ritornello", -1],
    ["Canto forte, finestrini chiusi", 1],
    ["Canto e faccio pure le seconde voci", 2],
  ]),
  d("q64", "La borraccia:", [
    ["Bevo quando capita, dove capita", -2],
    ["Bottiglietta del super riusata da mesi", -1],
    ["Una borraccia normale, funziona", 1],
    ["Pastello, con gli adesivi e il nome inciso", 2],
  ]),
  d("q65", "Ti fanno un complimento:", [
    ["Cambio discorso, imbarazzo totale", -2],
    ["Ringrazio con un sorriso", 1],
    ["Ringrazio e rilancio con un complimento mirato", 2],
  ]),
  d("q66", "La tua foto profilo:", [
    ["La stessa dal 2016, funziona ancora", -2],
    ["Non ho foto profilo, iniziale del nome", -1],
    ["Cambiata ogni tanto, senza troppa cura", 1],
    ["Aggiornata a ogni stagione, con direzione creativa", 2],
  ]),
  d("q67", "Ikea con gli amici:", [
    ["Entro, prendo i tasselli, esco", -2],
    ["Un giro tranquillo, senza impazzire", -1],
    ["Il giro classico, mobili più un po' di decor", 0],
    ["Faccio anche il reparto illuminazione", 1],
    ["È una gita: polpette, candele, lista desideri condivisa", 2],
  ]),
  d("q68", "Gli stivaletti chelsea:", [
    ["Cosa sono, scusa?", -2],
    ["Ne ho un paio, presi in saldo", 1],
    ["Ne ho due paia, uno per stagione", 2],
  ]),
  d("q69", "La montagna per te:", [
    ["Ferrata all'alba, in silenzio, zaino pesante", -2],
    ["Rifugio, grappa e briscola fino a tardi", -1],
    ["Passeggiata tranquilla e panorama", 1],
    ["Baita instagrammabile con plaid e cioccolata calda", 2],
  ]),
  d("q70", "Lo schermo del tuo telefono:", [
    ["Crepato da mesi, funziona uguale", -2],
    ["Una crepa piccola, ci convivo", -1],
    ["Pellicola normale, niente di speciale", 1],
    ["Pellicola perfetta e cover coordinata al mese", 2],
  ]),
  d("q71", "Compleanno di un amico:", [
    ["Bonifico e pacca sulla spalla", -2],
    ["Un regalo scelto con un minimo di cura", 1],
    ["Regalo pensato con mesi di anticipo e biglietto scritto a mano", 2],
  ]),
  d("q72", "Lo smalto:", [
    ["Manco morto, roba non mia", -2],
    ["Una volta, per scommessa persa", -1],
    ["Trasparente, giusto per lucidare", 1],
    ["Trasparente rinforzante, con cambio settimanale", 2],
  ]),
  d("q73", "La piadina perfetta:", [
    ["Salsiccia e cipolla, tradizione", -2],
    ["Verdure grigliate, per variare", 1],
    ["Crudo, squacquerone e rucola con balsamico a filo", 2],
  ]),
  d("q74", "Serie doppiata o in lingua?", [
    ["Doppiata, non pago per leggere i sottotitoli", -2],
    ["Dipende dalla serie, sono flessibile", -1],
    ["Lingua originale con sottotitoli", 1],
    ["Lingua originale, ovviamente, sennò perde tutto", 2],
  ]),
  d("q75", "Le ciabatte:", [
    ["Di gomma da mare, tutto l'anno, anche a Natale", -2],
    ["Da casa, quelle basic", -1],
    ["Pantofole di casa, anche per gli ospiti", 1],
    ["Mule di design, anche solo per buttare la spazzatura", 2],
  ]),
  d("q76", "Un weekend libero:", [
    ["Garage e motori, tutto il weekend", -2],
    ["Divano e console, senza uscire", -1],
    ["Qualche giro in città, tranquillo", 1],
    ["Cittadina europea con itinerario salvato nelle note", 2],
  ]),
  d("q77", "Il cameriere sbaglia l'ordine:", [
    ["Parte la scenata, punto sul principio", -2],
    ["Pazienza, mangio quello che arriva", -1],
    ["Lo faccio notare senza drammi", 1],
    ["Lo segnalo con garbo chirurgico e sorriso", 2],
  ]),
  d("q78", "I tuoi calzini:", [
    ["Bianchi da tennis, con tutto, sempre", -2],
    ["Neri e basta, uguali tutti", -1],
    ["Un po' di fantasia ogni tanto", 1],
    ["Fantasia, coordinati all'outfit del giorno", 2],
  ]),
  d("q79", "Festa a tema:", [
    ["Non mi travesto, mai, questione di principio", -2],
    ["Un accessorio minimo, giusto per dire", -1],
    ["Un trucco leggero, giusto per esserci", 0],
    ["Mi impegno un po', costume decente", 1],
    ["Arrivo con l'outfit più curato della serata", 2],
  ]),
  d("q80", "Lo yoga:", [
    ["Roba per gente che ha tempo da perdere", -2],
    ["Solo stretching dopo la partita", -1],
    ["Ci ho provato una volta, mai più", 1],
    ["Ci vado e ho il mio tappetino personale", 2],
  ]),
  d("q81", "Fine cena:", [
    ["Amaro, sempre amaro, digestivo serio", -2],
    ["Un digestivo leggero, giusto per accompagnare", 1],
    ["Bollicine, brindisi finale e foto di gruppo", 2],
  ]),
  d("q82", "Playlist condivise:", [
    ["Mai fatta una, ognuno ascolti il suo", -2],
    ["Una, buttata giù veloce", -1],
    ["Un paio, aggiornate ogni tanto", 1],
    ["Ne curo tre, con copertina e titolo studiati", 2],
  ]),
  d("q83", "Quando piove forte:", [
    ["Cappuccio e via, non è certo zucchero", -2],
    ["Ombrello decente, tengo alle scarpe", 1],
    ["Ombrello serio e scarpe salvate a ogni costo", 2],
  ]),
  d("q84", "Casa nuova di un amico:", [
    ["Non porto niente, ci mancherebbe altro", -2],
    ["Porto le birre, semplice ed efficace", -1],
    ["Porto qualcosa di carino, senza esagerare", 1],
    ["Porto una pianta col biglietto scritto a mano", 2],
  ]),
  d("q85", "Il tuo Spotify Wrapped:", [
    ["Non lo guardo nemmeno, fatti miei", -2],
    ["Lo guardo e basta, non lo condivido", -1],
    ["Lo mostro solo al mio migliore amico", 0],
    ["Lo condivido nelle storie, uno screenshot", 1],
    ["Lo impagino e lo commento pubblicamente, artista per artista", 2],
  ]),
  d("q86", "Giacca per l'autunno:", [
    ["Giaccone da lavoro, robusto", -2],
    ["Bomber vintage, ci sta sempre", -1],
    ["Giacca normale, non ci penso troppo", 1],
    ["Trench, con cintura annodata come si deve", 2],
  ]),
  d("q87", "Il gelato:", [
    ["Non mangio gelato, sono astemio del dolce", -2],
    ["Cono, due gusti, i classici", -1],
    ["Coppetta, un paio di gusti nuovi", 1],
    ["Coppetta pistacchio con degustazione critica ad alta voce", 2],
  ]),
  d("q88", "Differenza tra écru e panna:", [
    ["Non esiste e sto benissimo così", -2],
    ["Mai sentite entrambe le parole", -1],
    ["Esiste eccome, e c'è anche l'avorio nel mezzo", 2],
  ]),
  d("q89", "Falò in spiaggia:", [
    ["Chitarra e cori da stadio fino a tardi", -2],
    ["Ci sto, senza troppe pretese", -1],
    ["Coperte e chiacchiere, atmosfera giusta", 1],
    ["Coperte, lucine e playlist studiata in anticipo", 2],
  ]),
  d("q90", "Il barbiere ti propone un trattamento nuovo:", [
    ["No, taglio e via, non aggiungere costi", -2],
    ["Perché no, ascolto", 1],
    ["Dimmi tutto, sono curioso, provo sempre", 2],
  ]),
  d("q91", "L'assaggio del vino al ristorante:", [
    ["Mi imbarazza, saltiamo direttamente", -2],
    ["Un cenno veloce e si versa", -1],
    ["Do un'occhiata al colore, giusto quello", 1],
    ["Roteo il calice e annuisco da sommelier", 2],
  ]),
  d("q92", "La borsa della palestra:", [
    ["Busta del supermercato, funziona", -2],
    ["Zaino qualsiasi, quello che trovo", -1],
    ["Borsone tecnico con scomparto scarpe", 1],
    ["Borsa dedicata, beauty da allenamento incluso", 2],
  ]),
  d("q93", "Piangere a un matrimonio:", [
    ["Mai successo, e non succederà", -2],
    ["Solo di nascosto, occhiali da sole d'ordinanza", -1],
    ["Un po', durante il ballo", 1],
    ["A ogni discorso, fazzoletto sempre pronto", 2],
  ]),
  d("q94", "L'acqua al bar:", [
    ["Naturale, che domande", -2],
    ["Quella che portano, non specifico", -1],
    ["Frizzante, vivace", 1],
    ["Con ghiaccio e fetta di limone anche a gennaio", 2],
  ]),
  d("q95", "Le tue storie Instagram:", [
    ["Non esisto sui social, punto", -2],
    ["Repost di meme, contenuto riciclato", -1],
    ["Qualche foto ogni tanto, senza pensarci", 1],
    ["Tramonti con font scelto a mano e musica giusta", 2],
  ]),
  d("q96", "Un amico chiede un parere sull'outfit:", [
    ["Boh, uguale, va bene tutto", -2],
    ["Do un consiglio sincero", 1],
    ["Consulenza completa con alternative e accessori", 2],
  ]),
  d("q97", "Il ghiaccio nei drink:", [
    ["Quello del congelatore, a caso, spezzato a mano", -2],
    ["Ghiaccio normale, non ci faccio caso", -1],
    ["Preferisco quello del bar, più pulito", 1],
    ["Cubo grande singolo, come nei bar seri", 2],
  ]),
  d("q98", "Le tovagliette all'americana:", [
    ["Si mangia sul tavolo, senza fronzoli", -2],
    ["Una tovaglia normale, se capita", -1],
    ["Coordinate ai piatti, cambiate a rotazione", 2],
  ]),
  d("q99", "Ordinare per il tavolo:", [
    ["Ognuno per sé, libertà individuale", -2],
    ["Do un'occhiata al menu e basta", -1],
    ["Suggerisco un piatto e basta", 0],
    ["Consiglio qualcosa se me lo chiedono", 1],
    ["Prendo io la regia: condivisione e assaggi per tutti", 2],
  ]),
  d("q100", "Stirare una camicia:", [
    ["Non so e non voglio imparare", -2],
    ["La porto in lavanderia, risolto", -1],
    ["Me la cavo, risultato accettabile", 1],
    ["Colletto e polsini perfetti, orgoglio della casa", 2],
  ]),
  d("q101", "Il campeggio:", [
    ["Tenda, coltello, fuoco acceso senza accendino", -2],
    ["Tenda normale, il minimo indispensabile", -1],
    ["Mai dormito fuori, e va bene così", 0],
    ["Glamping con lucine e materasso vero", 2],
  ]),
  d("q102", "Auguri di compleanno in chat:", [
    ["Auguri, punto, emoji facoltativa", -2],
    ["Un messaggio un po' più lungo del solito", 1],
    ["Messaggio personalizzato con ricordo ed emoji scelte", 2],
  ]),
  d("q103", "Un pomeriggio ai saldi:", [
    ["Incubo, aspetto fuori con le buste", -2],
    ["Entro, prendo, esco", -1],
    ["Do un'occhiata, senza fretta", 1],
    ["Strategia, lista e percorso studiato in anticipo", 2],
  ]),
  d("q104", "Il tuo toast:", [
    ["Prosciutto e formaggio, e via, classico", -2],
    ["Qualcosa di un po' più curato", 1],
    ["Avocado con uovo in camicia, fotografato prima", 2],
  ]),
  d("q105", "Coreografie:", [
    ["Non ne conosco manco una, e per fortuna", -2],
    ["Qualche passo a caso, tanto nessuno guarda", -1],
    ["Una la conosco vagamente", 1],
    ["Ne so una a memoria e ai matrimoni parte da sola", 2],
  ]),
  d("q106", "Le lucine in camera:", [
    ["Roba da adolescenti, non fanno per me", -2],
    ["Un po' d'atmosfera non guasta", 1],
    ["Calde, dimmerabili, con telecomando dedicato", 2],
  ]),
  d("q107", "Come scegli il ristorante:", [
    ["Il primo aperto, senza troppe domande", -2],
    ["Chiedo in giro, senza approfondire", -1],
    ["Guardo le foto su Google, decido lì", 0],
    ["Do un'occhiata alle recensioni", 1],
    ["Recensioni, menu studiato, prenotazione con anticipo", 2],
  ]),
  d("q108", "La tazza della colazione:", [
    ["Una vale l'altra, non ci penso", -2],
    ["Ho la mia tazza, ma condivido", 1],
    ["Ho LA tazza, e guai a chi la tocca", 2],
  ]),
  d("q109", "I mercatini di Natale:", [
    ["Ressa e vin brulé sopravvalutato", -2],
    ["Ci passo, senza fermarmi troppo", -1],
    ["Un giro con calma, mi piace l'atmosfera", 1],
    ["Itinerario, programma e cioccolata calda ogni tappa", 2],
  ]),
  d("q110", "La raccolta differenziata:", [
    ["Più o meno, faccio quel che posso", -2],
    ["Abbastanza attento, con qualche errore", 1],
    ["Rigore svizzero e contenitori etichettati a mano", 2],
  ]),
  d("q111", "Musica in allenamento:", [
    ["No, solo ferro e respiro, silenzio assoluto", -2],
    ["Qualcosa di generico, non ci penso", -1],
    ["Playlist decente, va bene", 1],
    ["Playlist pump con transizioni curate ad hoc", 2],
  ]),
  d("q112", "La tua firma:", [
    ["Uno scarabocchio veloce, illeggibile", -2],
    ["Ci ho lavorato un po', ha un suo stile", 1],
    ["Studiata, con svolazzo finale, quasi un logo", 2],
  ]),
  d("q113", "I pancake:", [
    ["Colazione da bar, non cucino, punto", -2],
    ["Li compro già pronti, funzionano", -1],
    ["Li faccio ogni tanto, ricetta base", 1],
    ["Pila perfetta e sciroppo, foto di rito prima di mangiare", 2],
  ]),
  d("q114", "Gli occhiali da vista:", [
    ["Li evito finché posso, tengo duro", -2],
    ["Ne ho un paio decente", 1],
    ["Montatura scelta come accessorio, cambio a stagione", 2],
  ]),
  d("q115", "Lavare la macchina:", [
    ["Ci pensa la pioggia, funziona sempre", -2],
    ["Idropulitrice domenicale, rito sacro tra amici", -1],
    ["Un lavaggio veloce ogni tanto", 1],
    ["Interni profumati alla vaniglia e specchietti lucidi", 2],
  ]),
  d("q116", "Un ballo lento:", [
    ["Mi siedo e aspetto che passi", -2],
    ["Me la cavo, senza strafare", 1],
    ["Guido io, con eleganza, anche i giri difficili", 2],
  ]),
  d("q117", "Le spezie in cucina:", [
    ["Sale e pepe, fine della lista", -2],
    ["Qualche spezia base, origano e poco altro", -1],
    ["Un discreto assortimento, uso quello che c'è", 1],
    ["Scaffale dedicato con etichette scritte a mano", 2],
  ]),
  d("q118", "La tua agenda:", [
    ["Tutto a memoria, funziona da sempre", -2],
    ["Promemoria sul telefono, il minimo", -1],
    ["Note sparse sul telefono, disordinate", 0],
    ["Agenda cartacea, uso base", 1],
    ["Planner con colori per categoria e adesivi a tema", 2],
  ]),
  d("q119", "Il pigiama:", [
    ["Boxer e maglietta sformata, comodità prima di tutto", -2],
    ["Tuta vecchia, ci dormo da anni", -1],
    ["Un pigiama normale, decente", 1],
    ["Completo coordinato, anche d'estate", 2],
  ]),
  d("q120", "Chiusura: consiglieresti questo quiz agli amici?", [
    ["No, e cancello pure la cronologia", -2],
    ["Forse, se me lo chiedono direttamente", -1],
    ["Solo a chi può reggere il confronto", 1],
    ["Già girato nel gruppo, con sfida aperta e classifica", 2],
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
