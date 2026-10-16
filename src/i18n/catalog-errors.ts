import type { Locale } from "./locales";
import finnish from "./catalog-errors/fi.json";

// Adapt legacy domain diagnostics at the presentation boundary without changing stored data.
export const catalogErrorFor = (locale: Locale, message: string): string => {
    if (locale !== "fi") return message;
    const entry = Object.values(finnish).find((item) => item.en === message);
    if (entry) return entry.fi;
    const saved = /^Saved custom (?:battery|material|mod) is invalid: (.+)$/s.exec(message);
    if (saved) return `Tallennetun oman kohteen tiedot ovat virheelliset: ${catalogErrorFor(locale, saved[1])}`;
    return "Toiminto epäonnistui. Tarkista syötetyt tiedot ja selaimen tallennustilan saatavuus.";
};
