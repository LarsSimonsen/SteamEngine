/* Machine-materialized draft. Human review may edit string values. */

import type { CalculatorRouteMessages } from "../../calculator-messages";

export const messages: CalculatorRouteMessages = {
    "eyebrow": "Calculateur de sécurité de la batterie",
    "title": "Consommation de la batterie",
    "description": "Estimez la puissance fournie à l’atomiseur, la consommation de la batterie et la marge de "
        + "courant disponible pour les mods régulés et non régulés.",
    "manage": "Gérer les batteries",
    "reset": "Réinitialiser",
    "calculating": "Calcul en cours…",
    "device": "Appareil",
    "operatingMode": "Mode de fonctionnement",
    "powerRegulated": "Mod régulé en puissance",
    "voltageRegulated": "Mod régulé en tension",
    "currentRegulated": "Courant régulé",
    "bypass": "Bypass",
    "notVerified": "non vérifié",
    "unregulated": "Mod non régulé",
    "atomizerResistance": "Résistance de l'atomiseur",
    "outputPower": "Puissance de sortie",
    "outputVoltage": "Tension de sortie",
    "efficiency": "Rendement",
    "batteryPresets": "Préréglage de cellule",
    "cellSelection": "Sélection de la cellule",
    "batteryIntro": "Choisissez le modèle de cellule utilisé dans toute la batterie, ou saisissez les valeurs par "
        + "cellule ci-dessous.",
    "batteryPreset": "Préréglage de cellule",
    "customValues": "Valeurs personnalisées",
    "detailsBattery": "Détails sur cette batterie",
    "customBattery": "Batterie personnalisée",
    "selectPreset": "Sélectionnez un préréglage ici",
    "batteryValues": "Cellule et batterie",
    "batteryConfiguration": "Configuration de la batterie",
    "singleCell": "1S — Une seule cellule",
    "customConfiguration": "Configuration personnalisée",
    "cellsInSeries": "Cellules en série",
    "parallelStrings": "Branches en parallèle",
    "cells": "cellules",
    "cell": "cellule",
    "matchedCells": "Utilisez des cellules identiques et appairées, de même âge et dans le même état. La "
        + "répartition du courant est idéalisée ; la cellule la plus faible limite la batterie.",
    "batteryVoltage": "Tension de la batterie",
    "cellVoltageNearCutoff": "Tension de la cellule près du seuil de coupure",
    "regulatedVoltageHelp": "Utilisez la tension par cellule sous charge près du seuil de coupure du mod. 3,2 V est " +
        "un point de départ prudent ; utilisez les spécifications de l'appareil lorsqu'elles sont disponibles.",
    "unregulatedVoltageHelp": "Utilisez la tension de la batterie complètement chargée pour le cas où le courant est " +
        "le plus élevé. Ne comptez pas la chute de tension comme marge de sécurité.",
    "voltage": "Tension",
    "capacity": "Capacité",
    "maximumCurrent": "Courant maximal",
    "cRating": "Taux de décharge C",
    "nominalVoltage": "Tension nominale",
    "batteryHelp": "La tension nominale et la capacité déterminent l'énergie stockée estimée et la durée de fonctionnement continue. Elles n'affectent pas la limite de courant.",
    "results": "Résultats",
    "enterValue": "Entrez une valeur pour",
    resultsUseLastValidValues: "Les résultats utilisent la dernière valeur valide.",
    "atomizerOutput": "Puissance fournie à l’atomiseur",
    "batteryDrain": "Consommation de la batterie",
   "batterySafety": "Sécurité de la batterie",
    "pack": "Batterie assemblée",
    "currentPerCell": "Courant estimé par cellule",
    "effectiveMaximumCurrent": "Courant maximum effectif",
    "currentHeadroom": "Marge de courant",
    "estimatedRuntime": "Autonomie estimée",
    "nominalEnergy": "Énergie nominale",
    "continuousRuntime": "Autonomie en fonctionnement continu",
    "safe": "La consommation estimée se situe dans la limite effective de la batterie.",
    "caution": "Il reste moins de 20 % de marge de courant.",
    "danger": "La consommation estimée dépasse la limite effective de la batterie.",
    "runtimeHelp": "Cette estimation idéalisée suppose une alimentation continue à la puissance calculée de la "
        + "batterie. L’autonomie réelle varie selon la tension de coupure, la chute de tension sous charge, l’âge "
        + "des cellules, la consommation propre de l’appareil et l’utilisation intermittente.",
    "voltageLabel": "Tension",
    "currentLabel": "Courant",
    "powerLabel": "Puissance"
};
Object.assign(messages, {
    deviceBatterySetup: "Configuration de batterie de l’appareil",
    boardInputProfile: "Profil d’entrée de la carte",
});
