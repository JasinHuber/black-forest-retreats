/**
 * Einwilligungs-Status für nicht zwingend erforderliche Inhalte Dritter.
 * Aktuell betrifft das ausschließlich die OpenStreetMap-Karte (Übermittlung der
 * IP-Adresse an einen Drittanbieter). Technisch notwendige Cookies (Sprache)
 * brauchen keine Einwilligung und werden hier nicht gesteuert.
 *
 * "all"       = externe Inhalte (Karte) erlaubt
 * "essential" = nur notwendige Funktionen, keine externen Inhalte
 */
export type Consent = "all" | "essential";

const KEY = "bfr-consent";
export const CONSENT_EVENT = "bfr-consent-change";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(KEY);
    return v === "all" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent): void {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* localStorage nicht verfügbar — Auswahl gilt dann nur für diese Sitzung */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  }
}
