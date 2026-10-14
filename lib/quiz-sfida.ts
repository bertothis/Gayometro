/*
  Testi della sfida tra amici: messaggio di condivisione provocatorio e
  battuta del duello. Puro testo, nessuna dipendenza: lo usano sia i
  componenti client che le pagine server. Si ride dei comportamenti e
  dell'orgoglio da bar, mai delle persone omosessuali.
*/

const FORMA_UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/* "il 67%" ma "l'81%", "l'8%", "l'11%", "l'1%": l'articolo segue il suono */
export function percentualeConArticolo(score: number): string {
  const apostrofo = score === 1 || score === 8 || score === 11 || (score >= 80 && score <= 89);
  return apostrofo ? `l'${score}%` : `il ${score}%`;
}

export function idSfidaValido(valore: unknown): valore is string {
  return typeof valore === "string" && FORMA_UUID.test(valore);
}

/* Messaggio WhatsApp: tre registri a seconda del punteggio, due varianti ciascuno */
export function provocazione(score: number, titolo: string, url: string): string {
  const v = score % 2;
  if (score >= 70) {
    return [
      `Gayometro: ${score}%, "${titolo}". Batti il mio ${score}%, stronzo. ${url}`,
      `Il Gayometro mi ha dato ${score}%. Tu non ci arrivi nemmeno col risvoltino. Dimostralo, stronzo: ${url}`,
    ][v];
  }
  if (score >= 30) {
    return [
      `${score}% al Gayometro: "${titolo}". Scommetto che sei più gay di me. Dimostralo, stronzo: ${url}`,
      `Il Gayometro dice ${score}%. Fai il quiz e vediamo chi mente meglio: ${url}`,
    ][v];
  }
  return [
    `Solo ${score}% al Gayometro: "${titolo}". Fai il quiz e poi parliamo di chi ha più cemento nelle vene, stronzo: ${url}`,
    `${score}% al Gayometro, cemento armato. Scommetto che il tuo è più alto: ti aspetto, stronzo. ${url}`,
  ][v];
}

/* Messaggio quando si e' appena giocata una sfida e si rilancia */
export function provocazioneDuello(
  tuo: number,
  suo: number,
  url: string
): string {
  if (tuo > suo) {
    return `Ti ho battuto: ${tuo}% contro il tuo ${suo}%. Più gay di te, e con onore, stronzo. Rivincita: ${url}`;
  }
  if (tuo < suo) {
    return `Hai vinto tu: ${suo}% contro il mio ${tuo}%. Voglio la rivincita, stronzo: ${url}`;
  }
  return `${tuo}% a testa: pareggio perfetto, il che spiega tante cose della nostra amicizia. Rivincita: ${url}`;
}

export type EsitoDuello = "demolito" | "vinto" | "misura" | "pari" | "perso-misura" | "perso" | "umiliato";

export function esitoDuello(tuo: number, suo: number): EsitoDuello {
  const diff = tuo - suo;
  if (diff >= 25) return "demolito";
  if (diff >= 10) return "vinto";
  if (diff >= 1) return "misura";
  if (diff === 0) return "pari";
  if (diff >= -9) return "perso-misura";
  if (diff >= -24) return "perso";
  return "umiliato";
}

const BATTUTE_DUELLO: Record<EsitoDuello, string[]> = {
  demolito: [
    "L'hai demolito: tutto quel cemento, e crolla al primo siero.",
    "Vittoria schiacciante: lui ha fatto il quiz, tu hai fatto la storia.",
  ],
  vinto: [
    "Hai vinto per distacco: il trofeo è una candela profumata, e te la sei meritata.",
    "Più gay di lui, e con stile: la lancetta ha applaudito, lui ha chiesto la rivincita.",
  ],
  misura: [
    "Vittoria di misura: la lancetta ha dovuto controllare due volte, ma sei tu.",
    "Per un soffio, ma conta: se lo ricorderà ogni volta che ordina uno spritz.",
  ],
  pari: [
    "Pareggio perfetto: siete gay uguale, e questo spiega molte cose della vostra amicizia.",
    "Stesso identico punteggio: o vi siete copiati, o siete destinati a un brunch a due.",
  ],
  "perso-misura": [
    "Sconfitta di misura: lui è più gay di te per un capello, e lo sa benissimo.",
    "Hai perso per un soffio: la prossima volta ordina il cocktail col fiore e vinci.",
  ],
  perso: [
    "Hai perso: lui è più gay di te, e almeno ha il buongusto di non dirlo ad alta voce.",
    "Sconfitta netta: la tua mascolinità ha vinto la battaglia e perso la dignità.",
  ],
  umiliato: [
    "Umiliazione totale: lui gioca in un altro campionato, tu stai ancora cercando le scarpe da ginnastica.",
    "Lui è di un'altra categoria. Tu sei un blocco di cemento con tanta buona volontà.",
  ],
};

export function battutaDuello(tuo: number, suo: number): string {
  const lista = BATTUTE_DUELLO[esitoDuello(tuo, suo)];
  return lista[(tuo + suo) % lista.length];
}
