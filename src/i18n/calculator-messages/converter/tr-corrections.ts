import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./tr";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    inputUnit: "Giriş birimi",
    outputUnit: "Çıkış birimi",
    americanWireGauge: "Amerikan tel ölçü sistemi",
    needleGauge: "BWG (iğne kalınlık ölçüsü)",
    standardWireGauge: "Standart tel ölçü sistemi",
    precisionHelp: "Hassasiyet sayısal sonuçlar için geçerlidir. Tel ölçüsü tabloları yayımlanmış "
        + "değerlerini korur.",
};
