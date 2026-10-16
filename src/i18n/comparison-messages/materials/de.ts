import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "Materialien vergleichen",
    description: "Vergleiche zwei Materialien aus dem Steam-Engine-Katalog nebeneinander.",
    chooseMaterial: "Material auswählen",
    firstMaterial: "Erstes Material",
    secondMaterial: "Zweites Material",
    swap: "Materialien tauschen",
    identity: "Identität",
    name: "Name",
    electricalProperties: "Elektrische Eigenschaften",
    temperatureBehavior: "Temperaturverhalten",
    physicalProperties: "Physikalische Eigenschaften",
    temperatureControlProfile: "Temperaturregelprofil",
    profileAvailable: "Katalogprofil verfügbar",
    profileUnavailable: "Kein Katalogprofil",
    thermalConductivity: "Wärmeleitfähigkeit",
    invalidSelection: "Ein in diesem geteilten Link angegebenes Material wurde im Katalog nicht gefunden.",
    sameSelection: "Auf beiden Seiten wurde dasselbe Material ausgewählt.",
    capabilityDiffers:
        "Nur eines der ausgewählten Materialien hat ein Temperaturregelprofil im Katalog. Prüfe die " +
        "Geräteunterstützung und verwende das Profil für das genaue Material.",
    noSafetyNote: "Für diesen Eintrag ist kein materialspezifischer Sicherheitshinweis verzeichnet.",
};
