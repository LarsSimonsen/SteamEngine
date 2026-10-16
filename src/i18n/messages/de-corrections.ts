import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./de";

const catalogNouns: Readonly<Record<string, string>> = {
    material: "Material", materials: "Materialien",
    battery: "Akku", batteries: "Akkus",
    mod: "Mod", mods: "Mods",
};

const localizeCatalogNoun = (noun: string): string => catalogNouns[noun.toLowerCase()] ?? noun;

const capitalizeElectricalLabels = (labels: string): string => labels.replace(
    /\b(widerstand|spannung|strom|leistung)\b/g,
    (label) => label.charAt(0).toUpperCase() + label.slice(1),
);

export const messages: SharedMessages = {
    ...draftMessages,
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        breadcrumb: "Brotkrümelnavigation",
        loadingPowerCurve: "Leistungskurve wird geladen",
        reviewed: (date) => `Geprüft am ${date}`,
        evidenceDate: "Stand der Nachweise",
        recordStatus: "Datensatzstatus",
        catalogImplication: "Bedeutung für den Katalog",
        wrapperColor: "Farbe der Ummantelung",
        continuousDischargeCurrent: (arg0) => "Im Katalog ist ein Dauerentladestrom von "
            + arg0
            + " A angegeben.",
        continuousDischargeC: (arg0) => "Im Katalog ist eine Dauerentladerate von "
            + arg0
            + " C angegeben.",
        noContinuousDischarge: "Eine Dauerentladegrenze ist im Katalog nicht festgelegt.",
        propertyLabels: {
            ...draftMessages.encyclopediaDetail.propertyLabels,
            continuousDischarge: "Dauerentladegrenze",
            resistivity: "Spezifischer elektrischer Widerstand bei 20 °C",
        },
    },
    ohm: {
        ...draftMessages.ohm,
        fields: {
            ...draftMessages.ohm.fields,
            current: "Strom",
            power: "Leistung",
        },
        simpleLocks: "Einfache Sperren",
        showDetailedLocks: "Detaillierte Sperren anzeigen",
        detailedLocks: "Detaillierte Sperren",
        descriptionBeforeOhm: "Die Zusammenhänge",
        descriptionAfterLaws: "bilden die Grundlage dieses einfachen Rechners.",
        joulesLawLinkLabel: "Joulesches Gesetz",
        lockSummary: (adjusted, locked) => "Durch Ändern von " + capitalizeElectricalLabels(adjusted)
            + " bleibt " + locked + " konstant.",
    },
    catalogManager: {
        ...draftMessages.catalogManager,
        filterBuiltIns: "Vorgegebene Einträge filtern",
        choose: (arg0) => "Wählen Sie sichtbare vorgegebene Einträge oder erstellen Sie "
            + localizeCatalogNoun(arg0)
            + ", die in diesem Browser gespeichert werden.",
        builtIn: (arg0) => "Vorgegeben: "
            + localizeCatalogNoun(arg0),
        custom: (arg0) => "Benutzerdefiniert: "
            + localizeCatalogNoun(arg0),
        newCustom: (arg0) => "Neuer benutzerdefinierter Eintrag: "
            + localizeCatalogNoun(arg0),
        noneYet: (arg0) => "Noch keine benutzerdefinierten Einträge: "
            + localizeCatalogNoun(arg0)
            + ".",
        shared: (arg0) => "gemeinsamer "
            + localizeCatalogNoun(arg0)
            + "-Katalog",
        customItemsDescription: (arg0) => "Benutzerdefinierte "
            + localizeCatalogNoun(arg0)
            + " werden in den Auswahllisten der Rechner immer angezeigt.",
        manage: (arg0) => localizeCatalogNoun(arg0)
            + " verwalten",
        close: (arg0) => "Schließen Sie den "
            + localizeCatalogNoun(arg0)
            + "-Manager",
        visibility: (arg0) => "Sichtbarkeitsänderungen werden sofort gespeichert. Versteckte "
            + localizeCatalogNoun(arg0)
            + " bleiben zum Klonen verfügbar.",
        resetSaved: (arg0) => "Gespeicherte "
            + localizeCatalogNoun(arg0)
            + "-Daten zurücksetzen",
        savedReset: (arg0) => "Gespeicherte "
            + localizeCatalogNoun(arg0)
            + "-Daten wurden zurückgesetzt.",
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        editCustom: (arg0) => "Benutzerdefinierten Eintrag bearbeiten: "
            + localizeCatalogNoun(arg0),
        newCustom: (arg0) => "Neuer benutzerdefinierter Eintrag: "
            + localizeCatalogNoun(arg0),
        properties: (arg0) => "Eigenschaften: "
            + localizeCatalogNoun(arg0),
        save: (arg0) => localizeCatalogNoun(arg0)
            + " speichern",
        buttonTop: "Erhöhter Pluspol (Button Top)",
        terminalStyle: "Kontaktform",
        wrapperColor: "Farbe der Ummantelung",
        continuousC: "C-Rate bei Dauerentladung",
        sizeCodePlaceholder: "Optional, z. B. 18650",
        wrapperColorPlaceholder: "Optionale Farbbeschreibung",
        markingsPlaceholder: "Optional; eine Aufschrift pro Zeile",
        currentWithCRatingPlaceholder: "Optional bei Angabe der C-Rate",
        cRatingWithCurrentPlaceholder: "Optional bei Angabe des Stroms",
        batteryHelp: "Geben Sie mindestens einen kontinuierlichen Entladegrenzwert ein. Integrierte "
            + "Akkus sind interne Mod-Packs, daher sind keine eigenständigen "
            + "Zellenabmessungen erforderlich. Die Abmessungen der herausnehmbaren Zelle sind "
            + "nominal; Benutzen Sie die Anmerkungen für die gemessenen Abmessungen im "
            + "Verkaufszustand. Wenn beide Entladegrenzwerte festgelegt sind, verwendet der "
            + "Rechner weiterhin den sichereren abgeleiteten Grenzwert, wenn sie erheblich "
            + "voneinander abweichen.",
        saved: (arg0) => localizeCatalogNoun(arg0)
            + " gespeichert.",
    },
};
