import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./tr";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    batteryPresets: "Hücre ön ayarı",
    cellSelection: "Hücre seçimi",
    batteryIntro: "Paketin tamamında kullanılan hücreyi seçin veya aşağıya hücre başına değerleri girin.",
    batteryPreset: "Hücre ön ayarı",
    batteryValues: "Hücre ve pil paketi",
    batteryConfiguration: "Pil yapılandırması",
    singleCell: "1S — Tek hücre",
    customConfiguration: "Özel yapılandırma",
    cellsInSeries: "Seri bağlı hücreler",
    parallelStrings: "Paralel kollar",
    cells: "hücre",
    cell: "hücre",
    matchedCells: "Aynı yaş ve durumda olan, birbirinin aynısı ve eşleştirilmiş hücreler kullanın. "
        + "Akım paylaşımı ideal kabul edilir; paketin sınırını en zayıf hücre belirler.",
    pack: "Pil paketi",
    currentPerCell: "Hücre başına tahmini akım",
    enterValue: "Şu alan için bir değer girin:",
    caution: "Kalan akım payı %20'den az.",
};
