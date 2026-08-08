/* Machine-materialized draft. Human review may edit string values. */

import type { SharedMessages } from "../messages";

export const messages = {
    "navigation": {
        "about": "Über",
        "blog": "Blog",
        "catalog": "Katalog",
        "home": "Steam Engine-Startseite",
        "primary": "Primäre Navigation",
        "calculators": "Rechnernavigation",
        "language": "Sprache",
        "languageFilter": "Sprachen filtern",
        "noLanguageMatches": "Keine Sprachen gefunden."
    },
    "theme": {
        "switchToLight": "Wechseln Sie in den Lichtmodus",
        "switchToDark": "Wechseln Sie in den Dunkelmodus"
    },
    "footer": {
        "purgeCache": "Cache leeren",
        "translationDraft": "Diese Übersetzung wurde maschinell erstellt und wartet auf eine menschliche Überprüfung.",
        "suggestCorrection": "Schlagen Sie eine Korrektur vor"
    },
    "error": {
        "title": "Der Rechner konnte nicht aktualisiert werden",
        "cancel": "Abbrechen",
        "reset": "Zurücksetzen",
        "hideDetails": "Details ausblenden",
        "viewDetails": "Details anzeigen",
        "retry": "Versuchen Sie es noch einmal",
        "retrying": "Erneuter Versuch…"
    },
    "calculatorHeader": {
        "oldVersionNote": "Sie finden die alte Version dieses Rechners",
        "oldVersionLinkLabel": "hier"
    },
    "calculatorVisibility": {
        "label": "Sichtbarkeit des Rechners",
        "ariaLabel": (...args: unknown[]) => {
        let output = "Sichtbarkeit des Rechners für __SE_ARG_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "shown": "Angezeigt",
        "hidden": "Versteckt"
    },
    "catalogManager": {
        "manage": (...args: unknown[]) => {
        let output = "__se_arg_0__ verwalten";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "shared": (...args: unknown[]) => {
        let output = "freigegebener __se_arg_0__-Katalog";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "close": (...args: unknown[]) => {
        let output = "Schließen Sie den __se_arg_0__-Manager";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "choose": (...args: unknown[]) => {
        let output = "Wählen Sie sichtbare integrierte Funktionen oder erstellen Sie __se_arg_0__, das in diesem Browser gespeichert ist.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "builtIn": (...args: unknown[]) => {
        let output = "Integriertes __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "visibility": (...args: unknown[]) => {
        let output = "Sichtbarkeitsänderungen werden sofort gespeichert. Versteckte __se_arg_0__ bleiben zum Klonen verfügbar.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "filterBuiltIns": "Integrierte Filter",
        "custom": (...args: unknown[]) => {
        let output = "Benutzerdefiniert __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "newCustom": (...args: unknown[]) => {
        let output = "Neue benutzerdefinierte __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "noneYet": (...args: unknown[]) => {
        let output = "Noch kein benutzerdefiniertes __se_arg_0__.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "clone": "Klonen",
        "edit": "Bearbeiten",
        "delete": "Löschen",
        "confirmDelete": "Bestätigen Sie das Löschen",
        "cancel": "Abbrechen",
        "confirmReset": "Bestätigen Sie das Zurücksetzen",
        "resetSaved": (...args: unknown[]) => {
        let output = "Gespeicherte __se_arg_0__-Daten zurücksetzen";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "resetSavedMessage": "Dadurch werden nur die gespeicherten Daten entfernt. Weitermachen?",
        "savedReset": (...args: unknown[]) => {
        let output = "Gespeicherte __se_arg_0__-Daten wurden zurückgesetzt.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "usedBy": (...args: unknown[]) => {
        let output = "__SE_ARG_0__ kann nicht gelöscht werden; Es wird von __SE_ARG_1__ verwendet.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        output = output.replaceAll("__SE_ARG_1__", String(args[1] ?? ""));
        output = output.replaceAll("__se_arg_1__", String(args[1] ?? ""));
        return output;
    },
        "deleted": (...args: unknown[]) => {
        let output = "__SE_ARG_0__ wurde gelöscht.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    }
    },
    "catalogEditor": {
        "editCustom": (...args: unknown[]) => {
        let output = "Benutzerdefiniertes __se_arg_0__ bearbeiten";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "newCustom": (...args: unknown[]) => {
        let output = "Neue benutzerdefinierte __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "clone": (...args: unknown[]) => {
        let output = "Klonen Sie __SE_ARG_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "properties": (...args: unknown[]) => {
        let output = "__SE_ARG_0__ Eigenschaften";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "save": (...args: unknown[]) => {
        let output = "Speichern __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "saved": (...args: unknown[]) => {
        let output = "__SE_ARG_0__ gespeichert.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "cancel": "Abbrechen",
        "name": "Name",
        "manufacturer": "Hersteller",
        "model": "Modell",
        "variant": "Variante",
        "optional": "Optional",
        "unknown": "Unbekannt",
        "batteryAccess": "Zugang zur Batterie",
        "removableCell": "Abnehmbare Zelle",
        "integratedMod": "Im Mod integriert",
        "formFactor": "Formfaktor",
        "selectFormFactor": "Wählen Sie einen Formfaktor",
        "notApplicable": "Nicht anwendbar",
        "cylindrical": "Zylindrisch",
        "prismatic": "Prismatisch",
        "sizeCode": "Größencode",
        "nominalDiameter": "Nenndurchmesser (mm)",
        "nominalLength": "Nennlänge (mm)",
        "terminalStyle": "Terminal-Stil",
        "flatTop": "Flache Oberseite",
        "buttonTop": "Oberteil mit Knöpfen",
        "length": "Länge (mm)",
        "width": "Breite (mm)",
        "thickness": "Dicke (mm)",
        "protectedStatus": "Geschützter Status",
        "protectedCell": "Geschützt",
        "unprotectedCell": "Ungeschützt",
        "wrapperColor": "Farbe des Umschlags",
        "markings": "Markierungen",
        "ratedCapacity": "Nennkapazität (mAh)",
        "continuousCurrent": "Dauerentladestrom (A)",
        "continuousC": "Kontinuierliche Entladung C-Bewertung",
        "nominalVoltage": "Nennspannung (V)",
        "safetyWarning": "Sicherheitswarnung",
        "dataNote": "Datennotiz",
        "batteryHelp": "Geben Sie mindestens einen kontinuierlichen Entladegrenzwert ein. Integrierte Akkus sind interne Mod-Packs, daher sind keine eigenständigen Zellenabmessungen erforderlich. Die Abmessungen der herausnehmbaren Zelle sind nominal; Benutzen Sie die Anmerkungen für die gemessenen Abmessungen im Verkaufszustand. Wenn beide Abflussgrenzwerte festgelegt sind, verwendet der Rechner weiterhin den sichereren abgeleiteten Grenzwert, wenn sie erheblich voneinander abweichen.",
        "resistivity": "Spezifischer Widerstand (Ω mm²/m)",
        "heatCapacity": "Wärmekapazität (J/g·K)",
        "density": "Dichte (g/cm³)",
        "temperatureModel": "Temperaturmodell",
        "noTemperatureData": "Keine Temperaturdaten",
        "tcrPerDegree": "TCR (pro °C)",
        "temperature": "Temperatur (°C)",
        "resistanceFactor": "Widerstandsfaktor",
        "removeTfrPoint": "TFR-Punkt entfernen",
        "addTfrPoint": "TFR-Punkt hinzufügen",
        "normalizationHelp": "Beim Speichern wird die Kurve sortiert, die 20 °C-Referenz eingefügt oder abgeleitet und alle Faktoren normalisiert.",
        "normalizationInterpolated": "Der 20 °C-Punkt wurde interpoliert und die Kurve normalisiert.",
        "normalizationExtrapolated": "Der 20 °C-Punkt wurde extrapoliert und die Kurve normalisiert.",
        "normalizationExisting": "Die TFR-Kurve wurde bei 20 °C normalisiert.",
        "basedOnPreset": "Basierend auf der Voreinstellung",
        "none": "Keine",
        "maxOutputVoltage": "Maximale Ausgangsspannung (V)",
        "maxOutputPower": "Maximale Ausgangsleistung (W)",
        "maxOutputCurrent": "Maximaler Ausgangsstrom (A)",
        "minAtomizerResistance": "Mindestwiderstand des Zerstäubers (Ω)",
        "maxAtomizerResistance": "Maximaler Zerstäuberwiderstand (Ω)"
    },
    "home": {
        "intro": "Steam Engine ist eine Suite praktischer Rechner zum Bauen von Spulen, zum Überprüfen des Batterieverbrauchs, zum Mischen von E-Liquid und zum Verstehen der Zahlen hinter Ihrem Setup.",
        "toolkit": "Das Toolkit",
        "chooseCalculator": "Wählen Sie einen Taschenrechner",
        "blogEyebrow": "Bleiben Sie auf dem Laufenden",
        "blogTitle": "Steam Engine-Blog",
        "blogDescription": "Updates und Rechnertipps finden Sie im Steam Engine-Blog.",
        "catalogEyebrow": "Referenzbibliothek",
        "catalogTitle": "Entdecken Sie den Katalog",
        "catalogDescription": "Lernen Sie die Konzepte kennen und informieren Sie sich über die von Steam Engine verwendeten Materialien, Batterien, Mods und Platinen.",
        "tools": {
            "ohm": {
                "label": "Ohmsches Gesetz",
                "description": "Berechnen Sie Widerstand, Spannung, Strom und Leistung mit Joule-Heizung."
            },
            "coil": {
                "label": "Wicklung berechnen",
                "description": "Planen Sie wiederaufbaubare Verdampferwicklungen und untersuchen Sie deren elektrisches Verhalten."
            },
            "wirewiz": {
                "label": "Draht-Assistent",
                "description": "Kombinieren Sie verschiedene Drähte, um eine Spule und deren Temperaturkurve zu formen."
            },
            "batt": {
                "label": "Akkuverbrauch",
                "description": "Sehen Sie Strom- und Leistungsverbrauch eines akkubetriebenen Geräts."
            },
            "modrange": {
                "label": "Mod-Bereich",
                "description": "Finden Sie den nützlichen Widerstandsbereich für einen regulierten Mod."
            },
            "juice": {
                "label": "Liquid mischen",
                "description": "Mischen Sie ein Rezept entsprechend Ihrer angestrebten Nikotinstärke und Ihrem VG/PG-Verhältnis."
            },
            "converter": {
                "label": "Konvertieren",
                "description": "Konvertieren Sie zwischen Millimetern, Zoll, Zollbruchteilen und Drahtstärken."
            },
            "old": {
                "label": "Legacy-Site",
                "description": "Die alten Versionen der Rechner finden Sie hier."
            }
        }
    },
    "ohm": {
        "eyebrow": "Rechner für das Ohmsche Gesetz",
        "title": "Ohmsches Gesetz",
        "descriptionBeforeOhm": "Das ist einfach",
        "descriptionBetweenLaws": "und",
        "descriptionAfterLaws": "Taschenrechner.",
        "values": "Werte",
        "lock": "Sperren",
        "reset": "Zurücksetzen",
        "simpleLocks": "Einfache Schlösser",
        "showDetailedLocks": "Detaillierte Schlösser anzeigen",
        "hideDetailedLocks": "Detaillierte Sperren ausblenden",
        "detailedLocks": "Detaillierte Schlösser",
        "adjusting": (...args: unknown[]) => {
        let output = "Beim Anpassen von __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "help": "Was Sie konstant halten müssen, während Sie andere Werte anpassen.",
        "about": "Über diesen Rechner",
        "aboutText": "Sie können jeden Wert ändern. Die anderen Werte werden sofort aktualisiert. Werte können gesperrt werden, sodass sie sich nicht ändern, wenn Sie einen anderen Wert anpassen.",
        "serviceUnavailable": "Der Rechnerdienst ist nicht verfügbar.",
        "defaultsRestored": "Die Standardeinstellungen wurden wiederhergestellt.",
        "fields": {
            "resistance": "Widerstand",
            "voltage": "Spannung",
            "current": "Aktuell",
            "power": "Macht"
        },
        "lockSummary": (...args: unknown[]) => {
        let output = "Durch Ändern von __SE_ARG_0__ bleibt __se_arg_1__ konstant.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        output = output.replaceAll("__SE_ARG_1__", String(args[1] ?? ""));
        output = output.replaceAll("__se_arg_1__", String(args[1] ?? ""));
        return output;
    }
    },
    "encyclopedia": {
        "kicker": "Referenz zur Dampfmaschine",
        "title": "Katalog",
        "lead": "Durchsuchen Sie die Konzepte, Materialien, Batterien, Mods und Steuerplatinen hinter den Taschenrechnern.",
        "entriesLabel": (...args: unknown[]) => {
        let output = "__SE_ARG_0__ Einträge";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "browserLabel": "Katalogeinträge",
        "searchLabel": "Enzyklopädieeinträge durchsuchen",
        "searchPlaceholder": "Suchen Sie nach Namen, Modellen oder Aliasnamen",
        "filtersLabel": "Enzyklopädieeinträge filtern",
        "all": "Alle",
        "openEntry": "Eintrag öffnen",
        "noMatches": "Zu dieser Suche passen keine Einträge.",
        "browseCategory": (...args: unknown[]) => {
        let output = "Durchsuchen Sie __SE_ARG_0__ (__SE_ARG_1__ Einträge)";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        output = output.replaceAll("__SE_ARG_1__", String(args[1] ?? ""));
        output = output.replaceAll("__se_arg_1__", String(args[1] ?? ""));
        return output;
    },
        "categoryLabels": {
            "concepts": "Konzepte",
            "batteries": "Batterien",
            "materials": "Materialien",
            "mods": "Mods und Boards"
        },
        "categoryDescriptions": {
            "concepts": "Die Prinzipien hinter den Rechnern und ihre Ergebnisse.",
            "batteries": "Zellen, Akkus und integrierte Stromquellen.",
            "materials": "Widerstandsdraht und Temperaturkontrollmaterialien.",
            "mods": "Geregelte Geräte und Steuerplatinenprofile."
        }
    },
    "encyclopediaDetail": {
        "breadcrumb": "Semmelbrösel",
        "categoryLabels": {
            "concepts": "Konzepte",
            "batteries": "Batterien",
            "materials": "Materialien",
            "mods": "Mods"
        },
        "additionalInformation": "Zusätzliche Informationen",
        "aliases": "Aliase",
        "marketIntroduction": "Markteinführung",
        "introduced": (...args: unknown[]) => {
        let output = "Eingeführt __SE_ARG_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "introducedBetween": (...args: unknown[]) => {
        let output = "Eingeführt zwischen __SE_ARG_0__ und __SE_ARG_1__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        output = output.replaceAll("__SE_ARG_1__", String(args[1] ?? ""));
        output = output.replaceAll("__se_arg_1__", String(args[1] ?? ""));
        return output;
    },
        "introducedNoEarlier": (...args: unknown[]) => {
        let output = "Eingeführt frühestens am __SE_ARG_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "availableBy": (...args: unknown[]) => {
        let output = "Verfügbar ab __SE_ARG_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "unknown": "Unbekannt",
        "relatedEntry": "Verwandter Eintrag",
        "sourceBackedMaterial": "Quellengestützte Materialaufzeichnung",
        "sourceBackedEntity": "Quellgestützter Entitätsdatensatz",
        "researchSummary": "Forschungszusammenfassung",
        "noResearchSummary": "Für diesen Eintrag ist keine Forschungszusammenfassung verfügbar.",
        "evidenceNotes": "Beweisnotizen",
        "source": "Quelle",
        "sources": "Quellen",
        "noSources": "Für diesen Eintrag sind keine Quellen verfügbar.",
        "noSourceBackedRecord": "Für diesen Eintrag ist kein quellengestützter Forschungsbericht verfügbar.",
        "property": "Eigentum",
        "properties": "Eigenschaften",
        "value": "Wert",
        "unit": "Unit",
        "additionalPropertyNotes": "Zusätzliche Eigenschaftshinweise",
        "unknownPropertyValue": "Der Katalog legt für diese Eigenschaft keinen Wert fest.",
        "appearance": "Aussehen",
        "loadingPowerCurve": "Ladeleistungskurve",
        "temperatureResistanceCurve": "Temperaturwiderstandskurve",
        "temperature": "Temperatur",
        "relativeResistance": "Relativer Widerstand",
        "extrapolatedCurve": "Werte außerhalb der angegebenen Punkte werden nur für das Diagramm linear extrapoliert.",
        "loadingTemperatureCurve": "Temperaturkurve laden…",
        "normalizedCurve": (...args: unknown[]) => {
        let output = "Die Katalogkurve ist auf R/R20 normalisiert. Normalisierungsmethode: __SE_ARG_0__.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "loadingResearchRecord": "Forschungsdatensatz wird geladen…",
        "independentTestReview": "Unabhängiger Test und Bewertung",
        "reviewed": (...args: unknown[]) => {
        let output = "Bewertet __SE_ARG_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "limitation": "Einschränkung",
        "evidenceDate": "Beweisdatum",
        "confidence": "Vertrauen",
        "date": "Datum",
        "relation": "Beziehung",
        "lifecycleEvidence": "Lebenszyklusnachweise",
        "recordStatus": "Aufnahmestatus",
        "identityStability": "Identitätsstabilität",
        "lastUpdated": "Zuletzt aktualisiert",
        "researchSources": "Forschungsquellen",
        "deviceSafetyNotes": "Gerätespezifische Sicherheitshinweise",
        "safety": "Sicherheit",
        "catalogImplication": "Katalogimplikation",
        "noBatterySafety": "Für diesen Eintrag ist kein batteriespezifischer Sicherheitshinweis hinterlegt.",
        "batteryInternal": "Bei diesem Akku handelt es sich um einen internen Akku im Gerät und nicht um eine vom Benutzer austauschbare Zelle.",
        "batteryRemovable": "Dabei handelt es sich um eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
        "continuousDischargeCurrent": (...args: unknown[]) => {
        let output = "Im Katalog ist eine Dauerentladungsleistung von __SE_ARG_0__ A aufgeführt.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "continuousDischargeC": (...args: unknown[]) => {
        let output = "Im Katalog ist eine Dauerentladungsleistung von __SE_ARG_0__ C aufgeführt.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "noContinuousDischarge": "Eine Dauerentladungsleistung ist im Katalog nicht festgelegt.",
        "rewrapExplanation": "Das Etikett wird als Umverpackungsmarke behandelt; Der zugrunde liegende Zellhersteller wird aus dem Wrapper nicht übernommen.",
        "oldBatteryWarning": "Dies ist ein altes Batteriemodell und wird wahrscheinlich durch geeignetere Modelle ersetzt.",
        "unknownBatteryIntroductionNotice": "Das Datum der Markteinführung dieser Zelle ist unbekannt, sodass ihr Alter und die Frage, ob sie ersetzt wurde, nicht bestimmt werden können.",
        "unknownChemistry": "Der Forschungsbericht legt für diesen Eintrag keine chemische Bezeichnung fest.",
        "unknownAuthenticitySummary": "Die Aufzeichnung enthält keine ausführlichere Authentizitätszusammenfassung.",
        "nonRemovableBatteryProfile": "Dieser Mod verfügt über ein nicht entfernbares Batterieprofil:",
        "basedOnBoardProfile": "Dieses Geräteprofil basiert auf dem Board-Profil:",
        "builtIntoModProfile": "Dieses Batterieprofil ist in das Mod-Profil integriert:",
        "appliesTo": "Gilt für",
        "status": "Status",
        "authenticityAssessment": "Echtheitsbewertung",
        "noAuthenticityAssessment": "Es wurde keine eintragsspezifische Echtheitsbewertung erfasst.",
        "catalogNote": "Katalognotiz",
        "chemistry": "Chemie",
        "batteryAccess": "Zugang zur Batterie",
        "integratedInMod": "Im Mod integriert",
        "protection": "Schutz",
        "protectedCell": "Geschützte Zelle.",
        "unprotectedCell": "Ungeschützte Zelle.",
        "brand": "Marke",
        "manufacturer": "Hersteller",
        "nominalVoltage": "Nennspannung",
        "wrapperColor": "Farbe des Umschlags",
        "markings": "Markierungen",
        "noDefinedCurve": (...args: unknown[]) => {
        let output = "Dieses Material hat keine definierten TFR-Kurvenpunkte. Sein TCR beträgt __SE_ARG_0__ pro °C.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "noUsableResistanceRange": "Aus den Kataloggrenzen lässt sich kein nutzbarer Widerstandsbereich errechnen.",
        "modBoardCatalog": "Mod-Board- und Gerätekatalog",
        "batteryCatalog": "Batteriekatalog",
        "materialCatalog": "Katalog für Spulenmaterialien",
        "overview": "Übersicht",
        "inVaping": "Beim Dampfen",
        "materialSpecificLimitations": "Materialspezifische Einschränkungen",
        "secondaryProperties": "Sekundäre Eigenschaften",
        "noMaterialSources": "Für dieses Material sind keine Quellen verfügbar.",
        "basedOnArticle": "Basierend auf dem Steam Engine-Wissensdatenbankartikel",
        "seeAlso": "Siehe auch",
        "wikipedia": "Wikipedia",
        "propertyLabels": {
            "formFactor": "Formfaktor",
            "dimensions": "Abmessungen",
            "ratedCapacity": "Nennkapazität",
            "continuousDischarge": "Kontinuierliche Entladungsleistung",
            "maximumPower": "Maximale Leistung",
            "maximumVoltage": "Maximale Spannung",
            "maximumCurrent": "Maximaler Strom",
            "resistanceRange": "Widerstandsbereich",
            "boardController": "Vorstand/Controller",
            "resistivity": "Elektrischer Widerstand bei 20 °C",
            "temperatureModel": "Temperaturmodell",
            "fullResistanceCurve": "Volle Widerstandskurve",
            "temperatureCoefficient": "Temperaturkoeffizient",
            "specificHeatCapacity": "Spezifische Wärmekapazität",
            "maximumRecommendedTemperature": "Maximal empfohlene Dampftemperatur",
            "density": "Dichte",
            "meltingPoint": "Schmelzpunkt"
        }
    }
};
