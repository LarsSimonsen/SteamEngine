import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./tr";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    optimalResistance: "Direnç seçimi için rehber",
    medianResistance: "Akım/gerilim sınırlarının kesişimi",
    median: "Akım/gerilim sınırlarının kesişimi",
    sweetSpot: "Üst aralığın orta noktası",
    at: "Güç:",
    currentLimitRequires: "akım sınırında gerekli gerilim:",
    voltageLimitRequires: "gerilim sınırında gerekli akım:",
    adjustedGraph: "Yapılandırılan maksimum güç, kaydedilen diğer sınırlarla kullanılabilir bir direnç "
        + "aralığı sağlamıyor. Bu grafikte kullanılan azaltılmış üst sınır:",
    watt: "W",
    ampere: "A",
};
