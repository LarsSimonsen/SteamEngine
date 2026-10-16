import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "Platforma",
    powerLimits: "Limity mocy",
    atomizerRange: "Zakres atomizera",
    category: "Kategoria",
    batteryConfiguration: "Konfiguracja akumulatora",
    baseProfile: "Profil bazowy",
    invalidSelection: "Nie znaleziono w katalogu moda ani płytki wskazanej przez ten udostępniony link.",
    sameSelection: "Po obu stronach wybrano ten sam mod lub płytkę.",
    platformDiffers:
        "Te wpisy różnią się kategorią lub konfiguracją akumulatora. Sprawdź, czy " +
        "porównanie odpowiada zamierzonemu zastosowaniu.",
    platformUnknown:
        "Niektóre dane platformy są nieznane, dlatego nie można w pełni porównać zgodności " +
        "kategorii i konfiguracji akumulatora.",
    noSafetyFindings: "Nie odnotowano ustaleń dotyczących bezpieczeństwa właściwych dla tego wpisu.",
};
