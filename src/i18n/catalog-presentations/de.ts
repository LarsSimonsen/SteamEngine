/* Machine-materialized draft. Human review may edit string values. */

import type { CatalogPresentationSet } from "../catalog-presentations";
import { batteryPresentationsFor, type BatteryTextDictionary } from "../battery-presentation-text";
import { modPresentationsFor, type ModTextDictionary } from "../mod-presentation-text";
import { materialPresentationsFor, type MaterialTextDictionary } from "../material-presentation-text";

export const batteryTexts: BatteryTextDictionary = {
    "battery.summary.removable":
        "Eine herausnehmbare, wiederaufladbare Zelle für kompatible Geräte.",
    "battery.summary.integrated": "Ein interner Akku im Gerät statt einer vom Benutzer austauschbaren Zelle.",
    "battery.note.approvedResearch": "Am 2026-08-13 genehmigt; siehe den zugehörigen Forschungsdatensatz.",
    "battery.note.capacityBelowLabel": "Die tatsächliche Kapazität ist geringer als auf dem Etikett angegeben.",
    "battery.note.battery-71.evidence": "20 A kontinuierlicher Wert; Pulswerte werden nicht verwendet.",
    "battery.note.battery-77.evidence":
        "20 A konservativer, unabhängiger Vergleichswert; die genaue "
        + "Verpackung und Produktionsrevision bleiben relevant.",
    "battery.note.battery-78.evidence":
        "15 A konservativer Wert aus Tests des genauen Modells; die "
        + "geprüfte, mit CCC gekennzeichnete Revision bleibt relevant.",
    "battery.note.battery-79.evidence":
        "45 A unabhängiger Dauerentladewert für die getestete Tabless-Revision; keine "
        + "Pulswerte als Ersatz verwenden.",
    "battery.note.battery-80.evidence":
        "36 A tatsächlicher kontinuierlicher Wert; der Wert von 56 A ist "
        + "temperaturbegrenzt.",
    "battery.note.battery-81.evidence":
        "40 A konservativer Wert; die getesteten Zellen schienen "
        + "Vorserienprodukte zu sein und hatten kein CCC-Logo.",
    "battery.note.battery-82.evidence":
        "13 A empfohlener Dauerwert; 16,8 A ist ein absolutes "
        + "Maximum, das nicht für eine lange Lebensdauer vorgesehen ist.",
    "battery.note.battery-83.evidence":
        "40 A konservativer Wert; 70 A ist temperaturbegrenzt, und die "
        + "getesteten Proben stammten aus der Vorserie.",
    "battery.note.battery-84.evidence": "40 A Vergleichswert für die Produktionszelle; 70 A erfordern Temperaturregelung.",
    "battery.note.battery-85.evidence":
        "40 A Wert für die genaue Verpackung; 70 A sind auf 60 °C begrenzt "
        + "und wurden als EVE-40PL-Rewrap getestet.",
    "battery.note.battery-86.evidence":
        "19 A konservativer Wert; die genau getesteten Proben schienen "
        + "Vorserienprodukte zu sein und hatten keine CCC-Kennzeichnung.",
    "battery.note.battery-87.evidence":
        "40 A konservativer Wert; 90 A ist temperaturbegrenzt, und die getesteten Zellen "
        + "schienen Vorserienprodukte zu sein.",
    "battery.note.battery-88.evidence":
        "40 A konservativer Wert; 60 A ist temperaturbegrenzt, und die "
        + "Produktionskontinuität bleibt ungeklärt.",
    "battery.note.battery-89.evidence":
        "40 A konservativer Wert; die getesteten Proben hatten eine "
        + "uneinheitliche Kapazität und keine CCC-/CE-Kennzeichnung.",
    "battery.note.battery-90.evidence":
        "13 A konservativer Wert; die genau getesteten Proben schienen "
        + "Vorserienprodukte zu sein und hatten keine CCC-Kennzeichnung.",
    "battery.note.battery-91.evidence":
        "30 A vom Tester geschätzter kontinuierlicher Wert; Reliances "
        + "Maximum von 50 A ist temperaturbegrenzt.",
    "battery.note.battery-92.evidence":
        "20 A kontinuierlicher Wert aus zwei geprüften produktionsbezogenen "
        + "Chargen; 30 A ist temperaturbegrenzt.",
    "battery.note.battery-93.evidence":
        "12 A kontinuierlich; 20 A sind nur Impulsbetrieb. Die genau "
        + "getestete Verpackung ist als SA110 / INR18650/40 verzeichnet.",
    "battery.note.battery-94.evidence":
        "20 A Wert für die genaue Verpackung; der Tester empfiehlt "
        + "unter 15 A kontinuierlich. Vapehuset gibt im Titel 25 A an, "
        + "und spätere Rewrap-Quellen oder Verpackungsrevisionen können "
        + "abweichen.",
    "battery.note.battery-95.evidence":
        "30 A Wert für das genaue Modell; es handelt sich um ein "
        + "Rewrap, und spätere Verpackungsrevisionen oder zugrunde "
        + "liegende Quellen können abweichen.",
    "battery.note.battery-96.evidence":
        "30 A Wert für die genaue Fünfbein-Revision; Vierbein- und spätere "
        + "Revisionen mit derselben Verpackung unterscheiden sich wesentlich "
        + "und dürfen dieses Profil nicht übernehmen.",
    "battery.safety.lowDrain": "Akku mit geringer Strombelastbarkeit; nicht zum Dampfen geeignet.",
};

export const materialTexts: MaterialTextDictionary = {
    "material.profile": (displayName) => "Katalogprofil für " + displayName + ".",
    "material.safety.verifiedProfile":
        "Verwende ein überprüftes Materialprofil und beachte die "
        + "Temperatur- und Betriebsgrenzen des Geräts.",
};
export const modTexts: ModTextDictionary = {
    "mod.profile.regulated": (displayName) => "Profil für ein geregeltes Dampfgerät oder eine Steuerplatine: "
        + displayName + ".",
    "mod.preset-9.profile":
        "Billet Box Rev. 3a mit perlgestrahlter, glänzend "
        + "eloxierter Aluminiumoberfläche; eingeführt im Mai 2014.",
    "mod.preset-10.profile":
        "Ein Cloupor 30-W-Gerät, das einen Klon-Chipsatz im "
        + "DNA30-Stil eines Drittanbieters verwendet, kein "
        + "authentisches Evolv DNA-30D-Board.",
    "mod.preset-231.profile":
        "Dual-21700-geregelter Mod mit 18650-Adaptern; VAPORESSO "
        + "bewertet es mit 220 W; Beim Test wurden 208 W, 8,979 V und "
        + "39 A gemessen.",
    "mod.preset-234.profile":
        "Dual-18650 regulierter Mod; VAPORESSO bewertet es mit 220 "
        + "W; Beim Test wurden 215 W, 9,08 V und 37 A gemessen.",
    "mod.preset-235.profile":
        "Geregelter Mod mit integriertem Akku und einer Nennleistung von 100 W; beim Test "
        + "wurden 101 W, 29 A und mindestens 7,97 V gemessen.",
    "mod.preset-236.profile":
        "Single-18650 regulierter Mod mit AS Chip 4.0; Das "
        + "Herstellerprofil beträgt 100 W, 7,5 V, 32 A, 0,1–3 Ω.",
    "mod.preset-237.profile":
        "Einzelzellen-21700/18650-Adapter-Mod; Eleaf gibt 100 W, 9 "
        + "V, 0,05–3,5 Ω an; Tests ergaben 30 A.",
    "mod.preset-238.profile":
        "Einzelzelliger regulierter Squonk-Mod für 21700-, 20700- "
        + "oder angepasste 18650-Zellen mit einem konservativen "
        + "Profil von 95 W, 6 V, 34 A.",
};

export const presentations = {
    "concepts": {
        "concept-ohms-law": {
            "displayName": "Ohmsches Gesetz",
            "description": "Das Ohmsche Gesetz verbindet Spannung, Strom und Widerstand in einem Stromkreis.",
            "summary": "Die Beziehung zwischen Spannung, Strom und Widerstand.",
            "sections": [
                {
                    "id": "relationship",
                    "title": "Die Beziehung",
                    "paragraphs": [
                        "Die Grundbeziehung ist immer dann nützlich, wenn der Widerstand einer Komponente annähernd konstant ist."
                    ],
                    "formulas": [
                        {
                            "expression": "V = I × R"
                        }
                    ],
                    "bullets": [
                        "V ist die Spannung, gemessen in Volt (V).",
                        "I ist der Strom, gemessen in Ampere oder Ampere (A).",
                        "R ist der Widerstand, gemessen in Ohm (\\u03a9)."
                    ]
                },
                {
                    "id": "rearranged-formulas",
                    "title": "Formeln neu angeordnet",
                    "paragraphs": [
                        "Verwenden Sie die Version, die den Wert, den Sie suchen möchten, links einfügt:"
                    ],
                    "formulas": [
                        {
                            "expression": "I = V / R"
                        },
                        {
                            "expression": "R = V / I"
                        }
                    ],
                    "bullets": [
                        "Eine Erhöhung der Spannung erhöht den Strom, wenn der Widerstand gleich bleibt.",
                        "Ein zunehmender Widerstand verringert den Strom, wenn die Spannung gleich bleibt.",
                        "Ein Widerstand von Null \\u03a9 ist ein idealer Kurzschluss und muss separat behandelt werden."
                    ]
                },
                {
                    "id": "worked-examples",
                    "title": "Ausgearbeitete Beispiele",
                    "examples": [
                        {
                            "title": "Aktuelles finden",
                            "setup": "Eine 4,2-V-Quelle ist an eine Last von 1,0 \\u03a9 angeschlossen.",
                            "formulas": [
                                "I = 4,2 V / 1,0 \\u03a9 = 4,2 A"
                            ],
                            "conclusion": "Der Laststrom beträgt 4,2 A."
                        },
                        {
                            "title": "Finden Sie Widerstand",
                            "setup": "An einem Stromkreis liegen 12 V an und er verbraucht 2 A.",
                            "formulas": [
                                "R = 12 V / 2 A = 6 \\u03a9"
                            ],
                            "conclusion": "Der Stromkreiswiderstand beträgt 6 \\u03a9."
                        },
                        {
                            "title": "Spannung finden",
                            "setup": "Ein Strom von 0,5 A fließt durch einen Widerstand von 10 \\u03a9.",
                            "formulas": [
                                "V = 0,5 A × 10 Ω = 5 V"
                            ],
                            "conclusion": "Die Spannung beträgt 5 V."
                        }
                    ]
                },
                {
                    "id": "electrical-power",
                    "title": "Elektrische Energie",
                    "formulas": [
                        {
                            "expression": "P = V × I = I^2 × R = V^2 / R"
                        }
                    ],
                    "paragraphs": [
                        "Das Ohmsche Gesetz verbindet sich mit der Leistungsbeziehung P = V × I. Die Leistung P wird in Watt (W) gemessen. Bei einer 4,2-V-Quelle und einer 1,0-Ω-Last beträgt die ideale Leistung 17,64 W. Die Komponente benötigt genügend Wärmekapazität und Spielraum, um die entstehende Wärme sicher abzuleiten."
                    ]
                },
                {
                    "id": "unit-conversions",
                    "title": "Einheitenumrechnungen",
                    "paragraphs": [
                        "Halten Sie die Einheiten vor der Berechnung konsistent:"
                    ],
                    "bullets": [
                        "1 k\\u03a9 = 1.000 \\u03a9",
                        "1 M\\u03a9 = 1.000.000 \\u03a9",
                        "1 mA = 0,001 A",
                        "1 W = 1.000 mW"
                    ]
                },
                {
                    "id": "limits",
                    "title": "Grenzen des Modells",
                    "paragraphs": [
                        "Das Ohmsche Gesetz ist ein idealisiertes Modell. Reale Komponenten können nicht ohmsch sein: Ihr Widerstand kann sich je nach Temperatur, Spannung, Strom, Frequenz oder Betriebszustand ändern. Für Reihen- und Parallelnetzwerke verwenden Sie die Kirchhoffschen Gesetze zusammen mit dem Ohmschen Gesetz."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Ohm%27s_law"
        },
        "concept-joule-heating": {
            "displayName": "Joulesche Erwärmung",
            "description": "Joulesche Erwärmung beschreibt die Umwandlung elektrischer Energie in Wärme, wenn Strom durch einen Widerstand fließt.",
            "summary": "Wie elektrischer Strom Widerstand in Wärme umwandelt.",
            "sections": [
                {
                    "id": "heating-power",
                    "title": "Heizleistung",
                    "paragraphs": [
                        "Die elektrische Heizleistung beträgt:"
                    ],
                    "formulas": [
                        {
                            "expression": "P = V × I"
                        },
                        {
                            "expression": "P = I^2 × R"
                        },
                        {
                            "expression": "P = V^2 / R"
                        }
                    ],
                    "bullets": [
                        "P ist die Leistung in Watt (W).",
                        "V ist die Spannung in Volt (V).",
                        "I gibt den Strom in Ampere (A) an."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Ausgearbeitetes Beispiel",
                    "examples": [
                        {
                            "title": "Eine ohmsche Last",
                            "setup": "Eine 0,8 \\u03a9-Spule trägt 3 A.",
                            "formulas": [
                                "P = I^2 × R = 3^2 × 0,8 = 7,2 W",
                                "E = P × t = 7,2 W × 10 s = 72 J"
                            ],
                            "conclusion": "Die Spule wandelt Energie mit 7,2 Joule pro Sekunde oder 72 J über 10 Sekunden in Wärme um."
                        }
                    ]
                },
                {
                    "id": "what-affects-heating",
                    "title": "Was beeinflusst die Erwärmung?",
                    "bullets": [
                        "Bei konstantem Widerstand ergibt eine Verdoppelung des Stroms eine vierfache Heizleistung.",
                        "Bei konstantem Strom verdoppelt die Widerstandsverdoppelung die Heizleistung.",
                        "Bei konstanter Spannung erhöht die Verringerung des Widerstands die Heizleistung.",
                        "Die Wärmeübertragung auf Luft, Flüssigkeit und Hardware bestimmt die tatsächliche Temperatur."
                    ],
                    "paragraphs": [
                        "Elektrische Leistung ist eine Energieübertragungsrate, keine Temperatur. Wärmekapazität und Wärmefluss bestimmen, wie diese Energie die Temperatur verändert und wie schnell sie die Oberfläche verlässt."
                    ]
                },
                {
                    "id": "practical-checks",
                    "title": "Praktische Kontrollen",
                    "paragraphs": [
                        "Überprüfen Sie, ob Komponenten, Anschlüsse und Isolierung den erwarteten Strom und die erwartete Leistung bewältigen können. Sorgen Sie für ausreichend Spielraum, da sich reale Komponenten ungleichmäßig erwärmen können und sich der Widerstand mit der Temperatur ändern kann. Auch für Batterien und Netzteile gelten Dauerstrombegrenzungen."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Joule_heating"
        },
        "concept-kirchhoffs-laws": {
            "displayName": "Kirchhoffs Gesetze",
            "description": "Die Strom- und Spannungsgesetze von Kirchhoff beschreiben die Erhaltung an Schaltungsknoten und um geschlossene Schleifen.",
            "summary": "Wie sich Strom und Spannung in verbundenen Stromkreisen verhalten.",
            "sections": [
                {
                    "id": "circuit-terms",
                    "title": "Schaltungsbedingungen",
                    "paragraphs": [
                        "Die Grundbegriffe erleichtern das Nachdenken über einen Schaltplan:"
                    ],
                    "bullets": [
                        "Ein Knoten ist eine Reihe von Leitern, die ohne eine dazwischen liegende Komponente verbunden sind.",
                        "Ein Zweig ist ein aktueller Pfad zwischen zwei Knoten.",
                        "Eine Schleife ist ein geschlossener Pfad, der zu seinem Ausgangspunkt zurückkehrt.",
                        "Bei einer Reihenschaltung gibt es nur einen Strompfad durch die Komponenten.",
                        "Eine Parallelverbindung verbindet Zweige mit denselben zwei Knoten."
                    ]
                },
                {
                    "id": "current-law",
                    "title": "Kirchhoffs aktuelles Gesetz",
                    "formulas": [
                        {
                            "expression": "Σ I = 0"
                        },
                        {
                            "expression": "Σ I_in = Σ I_out"
                        }
                    ],
                    "paragraphs": [
                        "Wenn 8 A in einen Knoten eintreten und ein Zweig 3 A wegträgt, müssen die übrigen Zweige zusammen 5 A wegtragen. Wählen Sie vor der Lösung die aktuelle Richtung aus; Ein negatives Ergebnis bedeutet, dass der tatsächliche Strom entgegen der angenommenen Richtung fließt."
                    ]
                },
                {
                    "id": "series-and-parallel",
                    "title": "Reihen- und Parallelschaltungen",
                    "formulas": [
                        {
                            "expression": "I_total = I_1 = I_2 = ..."
                        },
                        {
                            "expression": "R_total = R_1 + R_2 + ..."
                        },
                        {
                            "expression": "I_total = I_1 + I_2 + ..."
                        },
                        {
                            "expression": "1 / R_total = 1 / R_1 + 1 / R_2 + ..."
                        }
                    ],
                    "examples": [
                        {
                            "title": "Vorwiderstände",
                            "setup": "Zwei 0,20 \\u03a9 Widerstände in Reihe sind an 8,0 V angeschlossen.",
                            "formulas": [
                                "R_total = 0,40 \\u03a9",
                                "I = 8,0 V / 0,40 Ω = 20 A"
                            ],
                            "conclusion": "Durch beide Widerstände fließen die gleichen 20 A."
                        },
                        {
                            "title": "Parallelwiderstände",
                            "setup": "Zwei gleiche 0,40 \\u03a9 Zweige sind an 4,0 V angeschlossen.",
                            "formulas": [
                                "R_total = 0,20 \\u03a9",
                                "I_total = 4,0 V / 0,20 Ω = 20 A"
                            ],
                            "conclusion": "Bei gleichem Zweigwiderstand führt jeder Zweig 10 A."
                        }
                    ]
                },
                {
                    "id": "voltage-law",
                    "title": "Kirchhoffs Spannungsgesetz",
                    "formulas": [
                        {
                            "expression": "Σ V = 0"
                        },
                        {
                            "expression": "+8,0 V – V_1 – V_2 = 0"
                        },
                        {
                            "expression": "V_total = V_1 = V_2 = ... (Parallelzweige)"
                        }
                    ],
                    "paragraphs": [
                        "Die algebraische Summe der Spannungsanstiege und -abfälle in einem geschlossenen Regelkreis ist Null. Wählen Sie eine Schleifenrichtung und halten Sie die Polaritäten konsistent. Eine Richtungsumkehr ändert die Vorzeichen, nicht die physikalische Lösung. Ein größerer Serienwiderstand hat einen größeren Spannungsabfall zur Folge, da durch alle Serienkomponenten der gleiche Strom fließt."
                    ]
                },
                {
                    "id": "cells",
                    "title": "Zellen in Reihe und parallel",
                    "formulas": [
                        {
                            "expression": "V_pack = V_1 + V_2 + ... (Reihe)"
                        },
                        {
                            "expression": "C_pack = C_1 + C_2 + ... (parallel)"
                        }
                    ],
                    "bullets": [
                        "In Reihe geschaltete Zellen erhöhen die Spannung, während die Amperestundenkapazität die einer gleichen Zelle bleibt.",
                        "Parallel geschaltete Zellen behalten die gleiche Spannung bei, während sich Kapazität und verfügbarer Strom ungefähr addieren.",
                        "Die Stromaufteilung hängt vom Innenwiderstand, den Kontakten, der Verkabelung und den Schaltern ab.",
                        "Das serielle Lithium-Ionen-Laden erfordert eine Überwachung auf Zellebene und einen entsprechenden Ausgleich oder Schutz."
                    ]
                },
                {
                    "id": "solving-and-limits",
                    "title": "Lösen realer Schaltkreise",
                    "bullets": [
                        "Markieren Sie Knotenspannungen, Zweigströme und angenommene Stromrichtungen.",
                        "Wenden Sie KCL auf unabhängige Knoten und KVL auf unabhängige Schleifen an.",
                        "Setzen Sie Widerstandsspannung und -strom mit V = I × R in Beziehung.",
                        "Lösen Sie die simultanen Gleichungen und überprüfen Sie die Leistungsbilanz."
                    ],
                    "paragraphs": [
                        "In einem vereinfachten Modell können Zelleninnenwiderstand, Kontaktwiderstand, Wandlereffizienz, Temperatureffekte, Übergangsverhalten, Schutzschaltungen und Komponententoleranzen weggelassen werden. Berücksichtigen Sie jedes unterlassene Verhalten, das sich wesentlich auf einen Hochstromkreis auswirkt."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Kirchhoff%27s_circuit_laws"
        },
        "concept-temperature-coefficient-of-resistance": {
            "displayName": "Temperaturkoeffizient des Widerstands (TCR)",
            "description": "Der Temperaturkoeffizient des Widerstands gibt an, wie sich der Widerstand ändert, wenn sich ein Material erwärmt oder abkühlt.",
            "summary": "Wie sich der Widerstand eines Materials mit der Temperatur ändert.",
            "sections": [
                {
                    "id": "linear-model",
                    "title": "Das lineare Modell",
                    "paragraphs": [
                        "Für eine kleine oder mäßige Temperaturänderung verwenden Sie die Beziehung erster Ordnung:"
                    ],
                    "formulas": [
                        {
                            "expression": "R_T = R_0 [1 + \\u03b1 (T - T_0)]"
                        }
                    ],
                    "bullets": [
                        "R_0 ist der Widerstand bei der Referenztemperatur T_0.",
                        "R_T ist der geschätzte Widerstand bei der Temperatur T.",
                        "\\u03b1 ist der Temperaturkoeffizient des Materials, ausgedrückt in 1/°C oder ppm/°C.",
                        "Die Temperaturen müssen für die Differenz T - T_0 dieselbe Skala und dieselben Einheiten verwenden."
                    ]
                },
                {
                    "id": "positive-and-negative",
                    "title": "Positiver und negativer TCR",
                    "bullets": [
                        "Ein positiver TCR bedeutet, dass der Widerstand mit steigender Temperatur zunimmt; Viele Metalle verhalten sich so.",
                        "Ein negativer TCR bedeutet, dass der Widerstand mit steigender Temperatur abnimmt.",
                        "Ein TCR nahe Null bedeutet, dass sich der Widerstand über den angegebenen Bereich kaum ändert.",
                        "Das Vorzeichen des Koeffizienten ist wichtig; Das Ersetzen eines negativen Werts durch seinen absoluten Wert kehrt die Vorhersage um."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Ausgearbeitetes Beispiel",
                    "examples": [
                        {
                            "title": "Ein hitziger Widerstand",
                            "setup": "Bei 20 °C ist ein Widerstand von 1,00 \\u03a9 spezifiziert, mit einem TCR von 400 ppm/\\u00fc.",
                            "formulas": [
                                "\\u03b1 = 400 × 10^-6 / \\u00b0C = 0,0004 / \\u00b0C",
                                "\\u0394T = 100 - 20 = 80 °C",
                                "R_T = 1,00 [1 + 0,0004 × 80] = 1,032 \\u03a9"
                            ],
                            "conclusion": "Der geschätzte Widerstand beträgt 1,032 \\u03a9, etwa 3,2 % über seinem Wert bei 20 °C."
                        }
                    ]
                },
                {
                    "id": "power-and-limits",
                    "title": "TCR, Leistung und praktische Grenzen",
                    "formulas": [
                        {
                            "expression": "I = V / R"
                        },
                        {
                            "expression": "P = V^2 / R = I^2 × R"
                        }
                    ],
                    "paragraphs": [
                        "Bei einem positiven TCR-Widerstand, der mit konstanter Spannung betrieben wird, erhöht eine steigende Temperatur den Widerstand und verringert tendenziell den Strom. Bei einer Konstantstromquelle erhöht die gleiche Widerstandserhöhung die Leistung.",
                        "Der TCR eines Herstellers gilt normalerweise für einen angegebenen Temperatur- und Widerstandsbereich. Temperaturgradienten, Materialveränderungen, Kontakte, mechanische Belastung und Selbsterwärmung können dazu führen, dass ein tatsächliches Ergebnis von der Schätzung erster Ordnung abweicht."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Temperature_coefficient_of_resistance"
        },
        "concept-trigonometry": {
            "displayName": "Trigonometrie",
            "description": "Die Trigonometrie setzt Winkel und Längen in Beziehung und ist nützlich für Vektoren, Phasenbeziehungen und Wellenformen.",
            "summary": "Beziehungen zwischen Winkeln und Seiten von Dreiecken.",
            "sections": [
                {
                    "id": "right-triangles",
                    "title": "Rechtwinklige Dreiecke",
                    "paragraphs": [
                        "Bezogen auf einen Winkel θ liegt ihm die gegenüberliegende Seite gegenüber, die benachbarte Seite berührt ihn mit Ausnahme der Hypotenuse und die Hypotenuse liegt dem rechten Winkel gegenüber. SOH-CAH-TOA ist eine Gedächtnisstütze: Der Sinus liegt gegenüber der Hypotenuse, der Kosinus liegt gegenüber der Hypotenuse und der Tangens gegenüber der Ankathete."
                    ],
                    "formulas": [
                        {
                            "expression": "sin(θ) = Gegenteil / Hypotenuse"
                        },
                        {
                            "expression": "cos(θ) = Ankathete / Hypotenuse"
                        },
                        {
                            "expression": "tan(θ) = gegenüber / angrenzend"
                        }
                    ]
                },
                {
                    "id": "finding-sides-and-angles",
                    "title": "Unbekannte Seiten und Winkel finden",
                    "examples": [
                        {
                            "title": "Finden Sie eine Seite",
                            "setup": "Eine Hypotenuse von 10 cm trifft auf einen Winkel von 30°.",
                            "formulas": [
                                "gegenüber = 10 × sin(30°) = 5 cm",
                                "angrenzend = 10 × cos(30°) ≈ 8,66 cm"
                            ],
                            "conclusion": "Verwenden Sie eine inverse trigonometrische Funktion, wenn die Seitenlängen bekannt sind."
                        }
                    ],
                    "formulas": [
                        {
                            "expression": "θ = sin^-1(Gegenkathete / Hypotenuse)"
                        },
                        {
                            "expression": "θ = cos^-1(Antenkathete / Hypotenuse)"
                        },
                        {
                            "expression": "θ = tan^-1(gegenüber / angrenzend)"
                        }
                    ]
                },
                {
                    "id": "degrees-and-radians",
                    "title": "Grad und Bogenmaß",
                    "formulas": [
                        {
                            "expression": "180° = π Bogenmaß"
                        },
                        {
                            "expression": "θ_rad = θ_deg × π / 180"
                        }
                    ],
                    "paragraphs": [
                        "Ein Taschenrechner muss sich im richtigen Winkelmodus befinden. Die Verwendung des Gradmodus für einen Bogenmaßwert oder umgekehrt führt zu einem anderen Ergebnis. Ein vollständiger Zyklus beträgt 360° oder 2π im Bogenmaß."
                    ]
                },
                {
                    "id": "waveforms-and-identities",
                    "title": "Wellenformen und nützliche Identitäten",
                    "formulas": [
                        {
                            "expression": "x(t) = A × sin(2πft + φ)"
                        },
                        {
                            "expression": "ω = 2πf"
                        },
                        {
                            "expression": "sin^2(θ) + cos^2(θ) = 1"
                        },
                        {
                            "expression": "a^2 + b^2 = c^2"
                        }
                    ],
                    "bullets": [
                        "A ist die Amplitude, f ist die Frequenz in Hertz, t ist die Zeit in Sekunden und φ ist der Phasenwinkel.",
                        "Die Winkelfrequenz ω wird im Bogenmaß pro Sekunde gemessen.",
                        "Behalten Sie das Vorzeichen und den Quadranten bei, wenn Richtung oder Phase wichtig sind."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Trigonometry"
        },
        "concept-heat-capacity": {
            "displayName": "Wärmekapazität",
            "description": "Die Wärmekapazität verbindet übertragene Energie mit der Temperaturänderung eines Objekts oder Materials.",
            "summary": "Wie viel Energie benötigt ein Objekt, um die Temperatur zu ändern?",
            "sections": [
                {
                    "id": "basic-relationships",
                    "title": "Grundlegende Beziehungen",
                    "formulas": [
                        {
                            "expression": "C = Q / ΔT"
                        },
                        {
                            "expression": "Q = m × c × ΔT"
                        }
                    ],
                    "bullets": [
                        "C ist die Wärmekapazität in J/K oder J/°C.",
                        "Q ist die übertragene Wärmeenergie in Joule (J).",
                        "m ist die Masse in Kilogramm und c ist die spezifische Wärmekapazität in J/(kg·K).",
                        "Ein Temperaturunterschied von 1 K ist genauso groß wie ein Unterschied von 1 °C."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Ausgearbeitetes Beispiel",
                    "examples": [
                        {
                            "title": "Heizungswasser",
                            "setup": "Erhitzen Sie 0,20 kg Wasser von 20 °C auf 70 °C mit c = 4.180 J/(kg·K).",
                            "formulas": [
                                "ΔT = 70 - 20 = 50 °C",
                                "Q = 0,20 × 4.180 × 50 = 41.800 J"
                            ],
                            "conclusion": "Der ideale Energiebedarf beträgt 41,8 kJ; Eine echte Heizung braucht wegen der Verluste mehr."
                        }
                    ]
                },
                {
                    "id": "electrical-heating",
                    "title": "Heizung mit Strom",
                    "formulas": [
                        {
                            "expression": "Q = P × t"
                        },
                        {
                            "expression": "t = m × c × ΔT / P"
                        }
                    ],
                    "examples": [
                        {
                            "title": "Ideale Aufheizzeit",
                            "setup": "Erhitzen Sie das 41,8-kJ-Beispiel mit einer konstanten 100-W-Quelle und ohne Verluste.",
                            "formulas": [
                                "t = 41.800 J / 100 W = 418 s"
                            ],
                            "conclusion": "Die ideale Zeit beträgt etwa 7,0 Minuten; bei 80 % Übertragungseffizienz sind es etwa 523 Sekunden."
                        }
                    ]
                },
                {
                    "id": "object-and-material",
                    "title": "Objekt versus Material",
                    "paragraphs": [
                        "Die Wärmekapazität gehört zum gesamten Objekt und hängt davon ab, wie viel Material vorhanden ist. Die spezifische Wärmekapazität ist eine Materialeigenschaft. Eine Verdoppelung der Masse verdoppelt die Wärmekapazität für dasselbe Material."
                    ],
                    "formulas": [
                        {
                            "expression": "C_total = Σ m_i × c_i"
                        }
                    ]
                },
                {
                    "id": "phase-changes-and-limits",
                    "title": "Phasenwechsel und praktische Grenzen",
                    "formulas": [
                        {
                            "expression": "Q = m × L"
                        }
                    ],
                    "paragraphs": [
                        "Beim Schmelzen oder Sieden kann zugeführte Energie den Zustand des Materials ändern, ohne seine Temperatur zu ändern. L ist die spezifische latente Wärme in J/kg.",
                        "Die einfache Gleichung geht davon aus, dass die spezifische Wärme ungefähr konstant ist. Wärmeverlust, Konvektion, Strahlung, Verdunstung, Kontaktwiderstand und ungleichmäßige Temperatur können dazu führen, dass ein tatsächliches Ergebnis vom Ideal abweicht."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_capacity"
        },
        "concept-heat-flux": {
            "displayName": "Wärmefluss",
            "description": "Der Wärmefluss beschreibt, wie schnell Wärme eine Oberfläche durchquert, unabhängig von der Gesamtmenge des Materials, das Wärme speichert.",
            "summary": "Die Geschwindigkeit der Wärmeübertragung durch eine Flächeneinheit.",
            "sections": [
                {
                    "id": "definition",
                    "title": "Definition",
                    "formulas": [
                        {
                            "expression": "q'' = Q_dot / A"
                        }
                    ],
                    "bullets": [
                        "q'' ist der Wärmestrom in W/m².",
                        "Q_dot ist die gesamte Wärmeübertragungsrate in Watt (W).",
                        "A ist die Fläche, durch die Wärme übertragen wird, in Quadratmetern (m²)."
                    ],
                    "paragraphs": [
                        "Der Wärmefluss unterscheidet sich von der Wärmekapazität: Die Wärmekapazität beschreibt die gespeicherte Energie pro Temperaturänderung, während der Wärmefluss die Geschwindigkeit beschreibt, mit der Wärme eine Oberfläche durchquert."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Ausgearbeitetes Beispiel",
                    "examples": [
                        {
                            "title": "Durchschnittlicher Heizstrom",
                            "setup": "Eine 100-W-Heizung überträgt Wärme über eine Fläche von 0,020 m².",
                            "formulas": [
                                "q'' = 100 W / 0,020 m² = 5.000 W/m²"
                            ],
                            "conclusion": "Der durchschnittliche Wärmestrom beträgt 5.000 W/m² bzw. 0,5 W/cm²."
                        }
                    ]
                },
                {
                    "id": "conduction",
                    "title": "Leitung durch eine flache Schicht",
                    "formulas": [
                        {
                            "expression": "q'' = -k × ΔT / L"
                        },
                        {
                            "expression": "Q_dot = k × A × (T_hot – T_cold) / L"
                        }
                    ],
                    "bullets": [
                        "k ist die Wärmeleitfähigkeit in W/(m·K).",
                        "ΔT ist der Temperaturunterschied über die Schicht.",
                        "L ist die Schichtdicke in Metern.",
                        "Das Minuszeichen zeigt den Fluss von höherer Temperatur zu niedrigerer Temperatur an."
                    ]
                },
                {
                    "id": "convection-and-radiation",
                    "title": "Konvektion und Strahlung",
                    "formulas": [
                        {
                            "expression": "q'' = h × (T_s - T_∞)"
                        },
                        {
                            "expression": "q'' = ε × σ × (T_s^4 - T_sur^4)"
                        }
                    ],
                    "paragraphs": [
                        "Konvektion verwendet einen Oberflächenkoeffizienten h. Strahlung verwendet den Emissionsgrad ε und die Stefan-Boltzmann-Konstante σ; Temperaturen in der Strahlungsgleichung müssen absolute Temperaturen in Kelvin sein."
                    ]
                },
                {
                    "id": "practical-checks",
                    "title": "Praktische Kontrollen",
                    "bullets": [
                        "Rechnen Sie die Fläche in m² um, bevor Sie W/m² verwenden.",
                        "Unterscheiden Sie den durchschnittlichen Wärmefluss von einem lokalen Spitzenwert. Die Erwärmung kann ungleichmäßig sein.",
                        "Berücksichtigen Sie bei Bedarf Kontaktwiderstand, Konvektion, Strahlung und Wärmeverlust.",
                        "Der Wärmefluss ist eine Übertragungsrate, keine Temperatur; Wärmekapazität zur Temperaturänderung nutzen."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_flux"
        },
        "concept-si-system-and-imperial-units": {
            "displayName": "Das SI-System und imperiale Maße",
            "description": "Das Internationale Einheitensystem bietet konsistente Basiseinheiten, abgeleitete Einheiten und Dezimalskalierung für die Technik.",
            "summary": "Die in technischen Berechnungen verwendeten Einheiten, Präfixe und Umrechnungen.",
            "sections": [
                {
                    "id": "base-units",
                    "title": "Gängige SI-Einheiten",
                    "table": {
                        "headers": [
                            "Menge",
                            "SI-Einheit",
                            "Symbol"
                        ],
                        "rows": [
                            [
                                "Länge",
                                "Meter",
                                "m"
                            ],
                            [
                                "Messe",
                                "Kilogramm",
                                "kg"
                            ],
                            [
                                "Zeit",
                                "zweitens",
                                "s"
                            ],
                            [
                                "Temperatur",
                                "Kelvin",
                                "K"
                            ],
                            [
                                "Elektrischer Strom",
                                "Ampere",
                                "A"
                            ],
                            [
                                "Stoffmenge",
                                "Maulwurf",
                                "Mol"
                            ],
                            [
                                "Lichtstärke",
                                "Candela",
                                "CD"
                            ]
                        ]
                    },
                    "bullets": [
                        "Spannung: Volt (V).",
                        "Widerstand: Ohm (\\u03a9).",
                        "Leistung: Watt (W).",
                        "Energie: Joule (J).",
                        "Kraft: Newton (N).",
                        "Druck: Pascal (Pa).",
                        "Frequenz: Hertz (Hz)."
                    ]
                },
                {
                    "id": "decimal-prefixes",
                    "title": "Dezimalpräfixe",
                    "table": {
                        "headers": [
                            "Präfix",
                            "Symbol",
                            "Faktor"
                        ],
                        "rows": [
                            [
                                "Kilo",
                                "k",
                                "1.000 = 10^3"
                            ],
                            [
                                "Mega",
                                "M",
                                "1.000.000 = 10^6"
                            ],
                            [
                                "Milli",
                                "m",
                                "0,001 = 10^-3"
                            ],
                            [
                                "Mikro",
                                "μ",
                                "0,000001 = 10^-6"
                            ],
                            [
                                "Nano",
                                "n",
                                "0,000000001 = 10^-9"
                            ]
                        ]
                    },
                    "paragraphs": [
                        "Beispielsweise entspricht 2,2 k\\u03a9 2.200 \\u03a9 und 15 mA entspricht 0,015 A. Konvertieren Sie Werte in kompatible Einheiten, bevor Sie eine Formel verwenden."
                    ]
                },
                {
                    "id": "length-conversions",
                    "title": "Zoll und metrische Länge",
                    "formulas": [
                        {
                            "expression": "1 Zoll = 25,4 mm = 0,0254 m"
                        },
                        {
                            "expression": "1 Fuß = 12 Zoll = 0,3048 m"
                        },
                        {
                            "expression": "1 Yard = 3 Fuß = 0,9144 m"
                        },
                        {
                            "expression": "1 Zoll² = 645,16 mm²"
                        }
                    ],
                    "examples": [
                        {
                            "title": "Länge umrechnen",
                            "setup": "Konvertieren Sie 0,1 Zoll in Millimeter und 5 mm in Zoll.",
                            "formulas": [
                                "0,1 Zoll × 25,4 = 2,54 mm",
                                "5 mm / 25,4 ≈ 0,19685 Zoll"
                            ],
                            "conclusion": "Flächen- und Volumenumrechnungen verwenden den auf die entsprechende Potenz gesteigerten Längenfaktor."
                        }
                    ]
                },
                {
                    "id": "other-conversions",
                    "title": "Andere gängige Konvertierungen",
                    "bullets": [
                        "1 Pfund ≈ 0,45359237 kg.",
                        "1 lbf ≈ 4,44822 N.",
                        "1 psi ≈ 6.894,76 Pa.",
                        "°F = °C × 9/5 + 32.",
                        "°C = (°F - 32) × 5/9.",
                        "K = °C + 273,15."
                    ],
                    "paragraphs": [
                        "Ein Pfund kann sich auf Masse (lb) oder Kraft (lbf) beziehen, bei denen es sich um unterschiedliche Größen handelt. Ebenso messen Zoll, Quadratzoll und Kubikzoll unterschiedliche Abmessungen."
                    ]
                },
                {
                    "id": "unit-checks",
                    "title": "Praktische Gerätekontrollen",
                    "bullets": [
                        "Schreiben Sie beim Berechnen die Einheit neben jeden Wert.",
                        "Bestätigen Sie, dass beide Seiten einer Gleichung kompatible Dimensionen haben.",
                        "Konvertieren Sie, bevor Sie multiplizieren oder dividieren.",
                        "Nur am Ende runden, damit Zwischenergebnisse ihre brauchbare Präzision behalten."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/International_System_of_Units"
        },
        "concept-wire-gauges-awg-swg-bwg": {
            "displayName": "Drahtstärken: AWG, SWG und BWG",
            "description": "Eine Feinheitsnummer beschreibt eine Nenngröße nur dann, wenn ihr Feinheitssystem benannt ist.",
            "summary": "Warum Drahtstärkenzahlen ein benanntes System und einen angegebenen Durchmesser benötigen.",
            "sections": [
                {
                    "id": "gauge-systems",
                    "title": "Messgerätesysteme",
                    "bullets": [
                        "AWG ist die amerikanische Drahtstärke, früher auch als Brown & Sharpe-Stärke bekannt.",
                        "SWG ist Standard Wire Gauge, das historische britische Draht- und Blechdickensystem.",
                        "BWG ist Birmingham Wire Gauge, das früher für Eisendraht, Rohre und Blechdicke verwendet wurde.",
                        "Eine größere Normalmaßzahl bedeutet im Allgemeinen einen kleineren Durchmesser; Für Größen über Stärke 0 verwenden Sie 00, 000 oder 0000."
                    ],
                    "paragraphs": [
                        "SWG und BWG sind tabellarische Systeme und dürfen nicht mit der AWG-Formel berechnet werden. Die gleiche Nummer kennzeichnet daher nicht systemübergreifend den gleichen Durchmesser."
                    ]
                },
                {
                    "id": "awg-formula",
                    "title": "AWG-Durchmesser und -Fläche",
                    "formulas": [
                        {
                            "expression": "d_inch = 0,005 × 92^((36 - n) / 39)"
                        },
                        {
                            "expression": "d_mm = 0,127 × 92^((36 - n) / 39)"
                        },
                        {
                            "expression": "A = π × d^2 / 4"
                        }
                    ],
                    "paragraphs": [
                        "Für 1/0, 2/0, 3/0 und 4/0 verwenden Sie n = 0, -1, -2 und -3. AWG bestimmt die Leitergröße, kein universeller sicherer Strom; Die Strombelastbarkeit hängt auch vom Material, der Isolierung, der Kühlung, der Installation und den geltenden elektrischen Vorschriften ab."
                    ]
                },
                {
                    "id": "system-comparison",
                    "title": "Warum der Systemname wichtig ist",
                    "table": {
                        "headers": [
                            "Messgerät",
                            "AWG",
                            "Britische SWG",
                            "BWG"
                        ],
                        "rows": [
                            [
                                "10",
                                "2,588 mm",
                                "3,251 mm",
                                "3,404 mm"
                            ],
                            [
                                "20",
                                "0,8128 mm",
                                "0,9144 mm",
                                "0,8890 mm"
                            ],
                            [
                                "30",
                                "0,2540 mm",
                                "0,3150 mm",
                                "0,3048 mm"
                            ]
                        ]
                    },
                    "paragraphs": [
                        "Diese Werte sind nominal. Produkttoleranzen, Beschichtungen, Isolierung und Litzenkonstruktion können den gemessenen oder Gesamtdurchmesser verändern."
                    ]
                },
                {
                    "id": "resistance",
                    "title": "Stärke, Fläche und Widerstand",
                    "formulas": [
                        {
                            "expression": "R = ρ × L / A"
                        }
                    ],
                    "paragraphs": [
                        "Der Widerstand hängt von der Leiterlänge L, der Querschnittsfläche A und dem Materialwiderstand ρ ab. Da die Fläche mit dem Quadrat des Durchmessers variiert, kann ein geringfügiger Durchmesserunterschied einen erheblichen Widerstandsunterschied bewirken. Bei AWG halbiert eine Erhöhung der Stärke um drei Größen etwa die Fläche und verdoppelt den Widerstand pro Längeneinheit bei gleichem Material und gleicher Temperatur."
                    ]
                },
                {
                    "id": "practical-specification",
                    "title": "Praktische Spezifikation",
                    "bullets": [
                        "Benennen Sie das System, z. B. 24 AWG oder 24 British SWG.",
                        "Geben Sie den Nenndurchmesser in Millimetern an, wenn die Systeme verwechselt werden könnten.",
                        "Geben Sie an, ob es sich bei der Abmessung um blanken Leiter, isolierten Durchmesser, Blechdicke oder Rohrwanddicke handelt.",
                        "Berücksichtigen Sie bei Litzenleitern die Litzenkonstruktion, wenn Flexibilität und Gesamtdurchmesser wichtig sind.",
                        "Bestimmen Sie die aktuelle Kapazität anhand von Produktdaten und elektrischen Regeln, nicht allein anhand der Messgerätenummer."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Wire_gauge"
        }
    },
    materials: materialPresentationsFor(materialTexts),
    batteries: batteryPresentationsFor(batteryTexts),
    mods: modPresentationsFor(modTexts)
};
