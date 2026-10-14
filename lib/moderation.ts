import { contieneTermineVietato } from "@/lib/blocklist";

/*
  Moderazione locale, prima dell'AI (sezione 4.4 del brief).
*/

export const MESSAGGIO_RIFIUTO_BLOCKLIST =
  "Il Gayometro misura i comportamenti, non gli insulti. Riprova con un'abitudine.";

export const MESSAGGIO_RIFIUTO_COMMENTO =
  "Questo commento non passa il controllo qualita' del bar. Riprova con piu' stile.";

export function bloccataDaBlocklist(testoNormalizzato: string): boolean {
  return contieneTermineVietato(testoNormalizzato);
}

/*
  Regex che intercetta pattern tipo "Nome Cognome" con iniziali maiuscole
  nella frase ORIGINALE. ATTENZIONE: non e' un rifiuto automatico, produce
  falsi positivi garantiti su marchi e nomi non di persona ("Fiat Panda",
  "Gin Tonic", "Pinguini Tattici Nucleari") e falsi negativi su chi scrive
  minuscolo. E' solo un segnale: se scatta, la chiamata AI riceve una nota
  di attenzione e la decisione finale spetta al modello (sezione 4.4).
*/
export function possibileNomeProprio(fraseOriginale: string): boolean {
  return /(?:^|[^\p{L}])\p{Lu}\p{Ll}+\s+\p{Lu}\p{Ll}+(?:$|[^\p{L}])/u.test(
    fraseOriginale
  );
}

/*
  Honeypot anti bot: campo nascosto nel form. Un umano lo lascia vuoto,
  un bot che compila tutto lo riempie.
*/
export function honeypotCompilato(valore: unknown): boolean {
  return typeof valore === "string" && valore.trim().length > 0;
}
