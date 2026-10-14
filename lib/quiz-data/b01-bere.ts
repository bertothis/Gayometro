import { q, qd, type DomandaGrezza } from "./tipi";

/* Blocco 1: bere, bar, locali, aperitivo */
export const B01: DomandaGrezza[] = [
  qd("Tre birre in corpo e le chiavi della macchina in mano:", [
    [
      "Guido io: il fegato è un muscolo, il codice della strada un consiglio",
      -2,
      "Guidi dopo tre birre per principio: il tuo fegato è un eroe, la tua assicurazione una vittima.",
    ],
    ["Aspetto mezz’ora e guido, la scienza esagera", -1],
    ["Chiamo qualcuno e ammetto di non reggere, da uomo maturo", 1],
    [
      "Dopo un bicchiere non guido nemmeno il carrello della spesa",
      2,
      "Non guidi nemmeno il carrello dopo un bicchiere: i tuoi amici ti usano come autista e come bersaglio.",
    ],
  ]),
  q("La birra, scelta rapida:", [
    [
      "Media chiara alla spina, e nessuno mi parli finché non finisce",
      -2,
      "Birra alla spina e sguardo da cane da guardia: il tavolo ti vuole bene, ma da lontano.",
    ],
    ["Una bionda in bottiglia, sono un tipo semplice", -1],
    ["La più economica: la birra è un mezzo, non un fine", 0],
    ["Un’artigianale con un nome impronunciabile e note di agrumi", 1],
    [
      "Quella al limone, e lo dico ad alta voce",
      2,
      "Birra al limone ad alta voce: almeno sei coerente, il che spaventa i tuoi amici.",
    ],
  ]),
  qd("Il tuo drink al bar:", [
    [
      "Whisky liscio, senza ghiaccio e senza discorsi",
      -2,
      "Whisky liscio: il barista ti serve con la cautela di chi maneggia una granata.",
    ],
    ["Una birra: i cocktail sono per quelli con la camicia stirata", -1],
    ["Gin tonic col cetriolo e la scorza d’arancia, grazie", 1],
    [
      "Quello col fiore commestibile: me lo merito",
      2,
      "Hai ordinato il cocktail col fiore commestibile: la guarnizione ha più dignità di tutto il tavolo.",
    ],
    ["Quello che c’è in offerta, e lo chiamo istinto", 0],
  ]),
  q("Lo spritz, secondo te:", [
    [
      "Roba da turisti con le infradito e la crema solare",
      -2,
      "Disprezzi lo spritz, ma quest’estate l’hai bevuto di nascosto almeno due volte.",
    ],
    ["Un Aperol, il classico, con l’oliva che non mangio mai", -1],
    ["Un Campari, perché almeno ha carattere", 1],
    [
      "Hugo con la menta fresca, sennò non è serata",
      2,
      "Hugo con la menta: il tuo aperitivo ha più note floreali di un matrimonio in Toscana.",
    ],
    ["Lo bevo se me lo offrono, e lo commento male", 0],
  ]),
  q("Birra media o tinto de verano?", [
    [
      "Media, e se la servono col limone me ne vado",
      -2,
      "Rifiuti il limone nella birra con l’energia di chi ha qualcosa da dimostrare.",
    ],
    ["Tinto de verano, e lo dico senza abbassare la voce", 1],
    [
      "Sangria fatta in casa, con la frutta tagliata col coltello buono",
      2,
      "Fai la sangria in casa: la tua estate ha un fornitore di frutta e un ufficio stampa.",
    ],
  ]),
  q("Il vino, a cena:", [
    [
      "Sfuso, in damigiana, di un cugino che “ha la vigna”",
      -2,
      "Vino sfuso del cugino: il tuo fegato ha un’ala in cantina e il cugino un monumento.",
    ],
    ["Un bianco fermo, scelto con la serietà di un notaio", 1],
    [
      "Lo faccio roteare e dico “note di sottobosco” senza ridere",
      2,
      "Hai detto “note di sottobosco” a voce alta: il sommelier ti ha già adottato.",
    ],
    ["Quello che sceglie il mio amico: io annuisco", 0],
  ]),
  q("Il ghiaccio nel bicchiere:", [
    [
      "Quello del freezer, spaccato a mano con l’orgoglio di un fabbro",
      -2,
      "Spacchi il ghiaccio a mano come un fabbro: il cubetto ha già sporto denuncia.",
    ],
    ["Quello del bar: il mio, a casa, sa di surgelato e di rimpianti", 1],
    [
      "Un unico cubo gigante: il ghiaccio piccolo mi offende",
      2,
      "Pretendi il cubo di ghiaccio gigante: il tuo whisky ha più assistenza di un malato in clinica.",
    ],
  ]),
  q("Il barista ti propone un analcolico:", [
    [
      "Mai sia, ho un’immagine da difendere",
      -2,
      "Hai rifiutato l’analcolico per difendere l’immagine: nessuno ti guardava, ma tu sì.",
    ],
    ["Solo se guido, e con la faccia di uno in lutto", -1],
    ["Se è guarnito come si deve, volentieri", 1],
    [
      "Lo ordino anche senza guidare: mi piace il rituale",
      2,
      "Bevi analcolico anche senza guidare: il tuo fegato ti ha già mandato dei fiori.",
    ],
  ]),
  qd("Cocktail bar segreto dietro una libreria, ti chiedono la password:", [
    [
      "Se serve una password, io entro dalla porta di servizio",
      -2,
      "Preferisci la porta di servizio alla password: sei l’unico che entra nel locale segreto per sbaglio.",
    ],
    ["Ci vado, ma mi lamento del prezzo per tutta la sera", -1],
    ["Curioso, ci provo una volta e poi lo racconto a tutti", 1],
    [
      "Ce l’ho già salvata nelle note, ovviamente",
      2,
      "Hai la password del locale segreto nelle note: ormai il segreto lo conoscono tutti tranne il locale.",
    ],
  ]),
  q("Il tuo brindisi:", [
    [
      "“Salute” e giù, che il bicchiere si scalda",
      -2,
      "Brindi in cinque secondi: tempo sufficiente per cominciare a parlare di motori.",
    ],
    ["Una frase fatta, la stessa da dieci anni", -1],
    ["Quello che diceva mio nonno, con la mano sul cuore", 0],
    ["Un discorsetto preparato con una battuta studiata", 1],
    [
      "Discorso commosso, contatto visivo e pausa drammatica",
      2,
      "Brindi con la pausa drammatica: in fondo al tavolo qualcuno ha chiesto se fosse un funerale.",
    ],
  ]),
  q("Il caffè:", [
    [
      "Nero, bollente, in piedi al bancone, tre secondi",
      -2,
      "Bevi il caffè in tre secondi in piedi: persino la moka si sente giudicata.",
    ],
    ["Un macchiato, il classico", -1],
    ["Un caffè d’orzo, perché ho fatto pace con me stesso", 1],
    [
      "Matcha latte col disegnino sulla schiuma, e lo fotografo",
      2,
      "Fotografi il disegnino sulla schiuma prima di bere: il caffè freddo è il prezzo dell’arte.",
    ],
    ["Quello della macchinetta, che sa di rassegnazione", 0],
  ]),
  qd("Dopo la quinta birra tu diventi:", [
    [
      "Quello che sfida a braccio di ferro chiunque respiri",
      -2,
      "Dopo cinque birre sfidi tutti a braccio di ferro: il tavolo ti tiene d’occhio come un vulcano.",
    ],
    ["Quello che si addormenta sul divano di un altro", -1],
    ["Quello che racconta l’infanzia a sconosciuti, con dovizia di particolari", 1],
    [
      "Quello che piange abbracciato a un amico e gli dice “ti voglio bene” ogni quattro minuti",
      2,
      "Dopo cinque birre dici “ti voglio bene” ogni quattro minuti: l’indomani mandi un bouquet di scuse.",
    ],
  ]),
  q("Fine cena, il digestivo:", [
    [
      "Amaro, sempre amaro, nero come la mia anima",
      -2,
      "Chiedi l’amaro nero come la tua anima: il cameriere sorride e abbassa la mancia di un euro.",
    ],
    ["Un limoncello, ma lo bevo in due sorsi per non farmi vedere", -1],
    ["Una grappa morbida, per accompagnare la chiacchiera", 1],
    [
      "Bollicine, brindisi finale e foto di gruppo con la luce giusta",
      2,
      "Fai le bollicine e la foto di gruppo con la luce giusta: lo staff ti odia, il tuo feed ti adora.",
    ],
  ]),
  q("La cannuccia:", [
    ["Bevo dal bordo, come un cristiano", -2],
    ["Quella di carta, così salvo il pianeta e rovino il drink", 1],
    [
      "Ho la mia di bambù, con la custodia dedicata",
      2,
      "Hai una cannuccia personale con la custodia: il tuo ecosistema ha più garanzie del tuo conto in banca.",
    ],
  ]),
  q("Freccette, biliardino o biliardo con gli amici:", [
    [
      "Sono nato per dominare qualsiasi gioco con un’asta o una pallina",
      -2,
      "Domini ogni gioco con una pallina, perdi e ti fai pagare lo stesso: un genio incompreso.",
    ],
    ["Gioco solo se in palio c’è qualcosa da bere", -1],
    ["Gioco per stare in compagnia: il risultato è l’ultimo dei problemi", 1],
    [
      "Guardo dal bordo con un Hugo e faccio il tifo per tutti",
      2,
      "Fai il tifo per tutti con un Hugo in mano: sei la mascotte che nessuno ha chiesto.",
    ],
  ]),
  q("Il tuo locale ideale:", [
    ["Un bar fumoso con la tv sul calcio e un barista che non parla", -2],
    ["Un pub con la musica alta e la birra alla spina", -1],
    ["Un wine bar con le luci basse e i taglieri", 1],
    [
      "Un locale coi cuscini sul pavimento e le candele alla vaniglia",
      2,
      "Scegli il locale coi cuscini a terra: ormai sei più comodo di un gatto di razza.",
    ],
  ]),
  q("I bicchieri di casa tua:", [
    ["Tre: uno rotto, uno sporco, uno mio", -2],
    ["Una dozzina uguale, comprata nello stesso pacco", -1],
    ["Un servizio completo, con qualche vittima inevitabile", 1],
    [
      "Ne ho sei tipi diversi e li lavo a parte, come se avessero un’anima",
      2,
      "Lavi sei tipi di bicchieri a parte: la tua credenza ha più ruoli di una sitcom.",
    ],
  ]),
  q("Il tè:", [
    [
      "Il tè è acqua sporca, e io non bevo acqua sporca",
      -2,
      "Chiami il tè acqua sporca, poi alle quattro del pomeriggio ti prepari quello allo zenzero.",
    ],
    ["Una bustina, ma solo se mia madre minaccia di portare la tisana", -1],
    ["Una teiera, qualche foglia e un po’ di pazienza", 1],
    ["Cerimonia del tè con tre varietà e la musica di sottofondo", 2],
  ]),
  q("Come ordini al bancone:", [
    [
      "Urlo l’ordinazione sopra la folla: il barista capisce",
      -2,
      "Urli l’ordine sopra la folla: il barista ti ha già dato il drink peggiore, ma con rispetto.",
    ],
    ["Alzo due dita e aspetto: il mondo mi deve qualcosa", -1],
    ["Mi metto in coda e cerco il contatto visivo, educatamente", 1],
    [
      "Aspetto che mi notino e poi chiedo un parere sul menù",
      2,
      "Chiedi un parere al barista sul menù: lui, dentro di sé, cerca già una scusa per andarsene.",
    ],
  ]),
  q("La mancia al bar:", [
    ["Mai, ho già pagato il drink", -2],
    ["Lascio sempre qualcosa: mi fa sentire una brava persona", 1],
    [
      "Il dieci per cento e un biglietto con un complimento",
      2,
      "Lasci la mancia con il biglietto di complimenti: il barista lo ha appeso in cucina, piangendo.",
    ],
  ]),
  q("Il whisky:", [
    [
      "Liscio, come un uomo, come un pugno",
      -2,
      "Dici che il whisky va bevuto “come un pugno”: la metafora più fragile del tavolo.",
    ],
    ["Con la cola, perché sono pragmatico", 0],
    ["Con una goccia d’acqua, giusto per ammorbidire", 1],
    [
      "In un cocktail con miele e limone, per la gola",
      2,
      "Metti miele e limone nel whisky: una ricetta della nonna con la patente da barman.",
    ],
  ]),
  q("Il gin tonic perfetto:", [
    ["Quello che costa meno: tanto sono tutti uguali", -2],
    ["Gin, tonica, ghiaccio e non rompetemi le scatole", -1],
    ["Con il cetriolo e un rametto di rosmarino", 1],
    [
      "Con petali di rosa, bacche di ginepro e una citazione sul bicchiere",
      2,
      "Gin tonic con petali e citazione: il bicchiere ha più personalità del tuo ultimo ex.",
    ],
  ]),
  q("Tutti ordinano birra. Tu:", [
    [
      "Birra, ovviamente, con un’aria di sfida",
      -2,
      "Ordini la birra con l’aria di sfida: nessuno ti ha sfidato, ma tu eri già pronto.",
    ],
    ["Una cola, perché domani lavoro", -1],
    ["Un tè freddo alla pesca, e non me ne vergogno", 1],
    [
      "Un frullato di frutti rossi col ghiaccio tritato",
      2,
      "Ordini il frullato mentre tutti bevono birra: sei il coraggio che il tavolo non sapeva di avere.",
    ],
  ]),
  q("L’enoteca ti consiglia un vino a sorpresa:", [
    [
      "Dammi quello che costa meno e non fare domande",
      -2,
      "Chiedi il vino che costa meno senza domande: l’enotecaro ormai ti riconosce dall’andatura.",
    ],
    ["Prendo quello che conosco già: non mi fido dei consigli", -1],
    ["Ascolto con attenzione, poi decido io", 1],
    [
      "Ne prendo due e mi faccio spiegare l’abbinamento col formaggio",
      2,
      "Ti fai spiegare l’abbinamento col formaggio: in cantina ormai ti aspettano con una poltrona.",
    ],
  ]),
  q("Il cocktail con la schiuma:", [
    ["La schiuma è un trucco per farti pagare di più", -2],
    ["Si beve e la schiuma resta sul labbro, come un baffo di vittoria", -1],
    ["Mi piace, la schiuma ha un suo perché", 1],
    [
      "È la parte migliore: la tocco col cucchiaino e sospiro",
      2,
      "Tocchi la schiuma col cucchiaino e sospiri: tra le tue qualità, la pazienza è la meno sospetta.",
    ],
  ]),
  qd("A una festa, dove ti trovi di solito:", [
    [
      "Accanto ai superalcolici, a controllare chi tocca cosa",
      -2,
      "Presidi il tavolo dei superalcolici come un cane da guardia: gli amici ti temono e ti ringraziano.",
    ],
    ["Sul balcone a fumare con gli altri che non vogliono parlare", -1],
    ["In cucina a chiacchierare con la padrona di casa", 1],
    [
      "Sul divano, a dare consigli di vita a tre sconosciuti",
      2,
      "Dai consigli di vita a sconosciuti sul divano: hai più clienti di uno psicologo.",
    ],
  ]),
  q("L’ultimo bicchiere della serata:", [
    ["Una sambuca con la mosca, per tradizione", -2],
    ["Un amaro, per chiudere con decoro", -1],
    ["Un caffè, perché voglio tornare a casa con la testa dritta", 1],
    [
      "Acqua e limone, con la promessa di ricominciare la dieta",
      2,
      "Chiudi la serata con acqua e limone e giuri di ricominciare la dieta: il tuo coraggio commuove.",
    ],
  ]),
  q("Il locale è pieno e non c’è un tavolo libero:", [
    ["Mi appoggio al muro e mi godo la sofferenza", -2],
    ["Aspetto in piedi, ma lo faccio notare a tutti", -1],
    ["Chiedo con calma al personale e un modo si trova", 1],
    [
      "Cambio locale: la mia serata non si improvvisa",
      2,
      "Cambi locale perché la serata non si improvvisa: il tuo piano B ha già le luci calde.",
    ],
  ]),
  q("Il barista ti conosce per nome:", [
    ["Non so nemmeno se ha un nome: ordino e basta", -2],
    ["Sì, ma io lo chiamo “capo” e lui mi chiama “bello”", -1],
    ["Sì, e so anche come si chiamano i suoi figli", 1],
    [
      "Sì, gli ho regalato una pianta per il locale e mi ha scritto un biglietto",
      2,
      "Hai regalato una pianta al barista: lui ha pianto, il locale ora è meno spoglio e tu meno solo.",
    ],
  ]),
  q("La pausa caffè con i colleghi:", [
    [
      "Quindici secondi in piedi, senza parlare di niente",
      -2,
      "Fai la pausa caffè in quindici secondi in piedi: i colleghi sospettano che tu sia una macchina.",
    ],
    ["Cinque minuti per parlare di calcio e di chi è stato licenziato", -1],
    ["Mezz’ora, con la sedia e il racconto del fine settimana", 1],
    [
      "Il mio caffè lo preparo con il filtro personale, e ne offro un assaggio a tutti con una spiegazione",
      2,
      "Offri il caffè col filtro personale e una spiegazione: i colleghi bevono, annuiscono e aspettano la fine.",
    ],
  ]),
  q("Lo spuntino al bar con gli amici:", [
    ["Patatine e noccioline, finché non finiscono", -2],
    ["Un panino imbottito, con la salsa che cola", -1],
    ["Olive, taralli e una piccola selezione di sottoli, con moderazione", 1],
    [
      "Un trittico di finger food, ognuno con il suo abbinamento",
      2,
      "Chiedi l’abbinamento allo stuzzichino: il tuo aperitivo ha un sommelier personale.",
    ],
  ]),
];
