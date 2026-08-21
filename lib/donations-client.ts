import { DONAZIONI, type Touchpoint } from "@/donations.config";

/*
  Regole di frequenza dei touchpoint (sezione 9.2 del brief), lato client:
  - ogni touchpoint appare al massimo una volta per sessione (sessionStorage)
  - un click sul link di donazione imposta un flag supporter per 30 giorni
    e sopprime tutto (localStorage)
  - dopo due chiusure senza click nella stessa sessione, il terzo
    touchpoint non viene mostrato
*/

const CHIAVE_SUPPORTER = "gm_supporter_fino_a";
const CHIAVE_CHIUSURE = "gm_don_chiusure";
const CHIAVE_VALUTAZIONI = "gm_don_valutazioni";
const chiaveMostrato = (t: Touchpoint) => `gm_don_mostrato_${t}`;

export function urlDonazione(): string {
  return process.env.NEXT_PUBLIC_DONATION_URL ?? "";
}

function inBrowser(): boolean {
  return typeof window !== "undefined";
}

function eSupporter(): boolean {
  if (!inBrowser()) return false;
  const finoA = Number(window.localStorage.getItem(CHIAVE_SUPPORTER) ?? 0);
  return Number.isFinite(finoA) && finoA > Date.now();
}

function chiusure(): number {
  if (!inBrowser()) return 0;
  return Number(window.sessionStorage.getItem(CHIAVE_CHIUSURE) ?? 0) || 0;
}

export function puoMostrare(touchpoint: Touchpoint): boolean {
  if (!inBrowser()) return false;
  if (!DONAZIONI[touchpoint] || !urlDonazione()) return false;
  if (eSupporter()) return false;
  if (window.sessionStorage.getItem(chiaveMostrato(touchpoint))) return false;
  if (chiusure() >= 2) return false;
  return true;
}

/*
  Contatore delle valutazioni Gayometro nella sessione corrente, usato per
  il popup che arriva dopo la seconda misurazione. Riparte ad ogni sessione.
*/
export function incrementaValutazioni(): number {
  if (!inBrowser()) return 0;
  const nuovo =
    (Number(window.sessionStorage.getItem(CHIAVE_VALUTAZIONI) ?? 0) || 0) + 1;
  window.sessionStorage.setItem(CHIAVE_VALUTAZIONI, String(nuovo));
  return nuovo;
}

export function segnaMostrato(touchpoint: Touchpoint) {
  if (!inBrowser()) return;
  window.sessionStorage.setItem(chiaveMostrato(touchpoint), "1");
}

export function segnaChiusura() {
  if (!inBrowser()) return;
  window.sessionStorage.setItem(CHIAVE_CHIUSURE, String(chiusure() + 1));
}

export function segnaSupporter() {
  if (!inBrowser()) return;
  const trentaGiorni = 30 * 24 * 60 * 60 * 1000;
  window.localStorage.setItem(
    CHIAVE_SUPPORTER,
    String(Date.now() + trentaGiorni)
  );
}
