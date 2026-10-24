import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "Plateforme",
    powerLimits: "Limites de puissance",
    atomizerRange: "Plage de l'atomiseur",
    category: "Catégorie",
    batteryConfiguration: "Configuration des accus",
    baseProfile: "Profil de base",
    invalidSelection: "Un mod ou une carte indiqué par ce lien partagé est introuvable dans le catalogue.",
    sameSelection: "Vous avez sélectionné le même mod ou la même carte des deux côtés.",
    platformDiffers:
        "Ces entrées diffèrent par leur catégorie ou leur configuration d'accus. Vérifiez " +
        "que la comparaison correspond à l'usage prévu.",
    platformUnknown:
        "Certains détails de la plateforme sont inconnus ; la compatibilité des catégories et " +
        "des configurations de batteries ne peut pas être entièrement comparée.",
    noSafetyFindings: "Aucun constat de sécurité propre à cette entrée n'est enregistré.",
    chooseMod: "Choisissez un mod ou une carte",
    firstMod: "Sélectionner le mod/la carte A",
    secondMod: "Sélectionner le mod/la carte B",
    swap: "Permuter les mods/cartes",
};
