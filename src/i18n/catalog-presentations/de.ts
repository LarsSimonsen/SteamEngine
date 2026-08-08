/* Machine-materialized draft. Human review may edit string values. */

import type { CatalogPresentationSet } from "../catalog-presentations";

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
    "materials": {
        "ka1": {
            "displayName": "Kanthal A1 / APM",
            "description": "Katalogprofil für Kanthal A1 / APM.",
            "summary": "Katalogprofil für Kanthal A1 / APM."
        },
        "ka": {
            "displayName": "Kanthal A / AE / AF",
            "description": "Katalogprofil für Kanthal A / AE / AF.",
            "summary": "Katalogprofil für Kanthal A / AE / AF."
        },
        "kd": {
            "displayName": "Kanthal D",
            "description": "Katalogprofil für Kanthal D.",
            "summary": "Katalogprofil für Kanthal D."
        },
        "n20": {
            "displayName": "Nichrome N20",
            "description": "Katalogprofil für Nichrome N20.",
            "summary": "Katalogprofil für Nichrome N20."
        },
        "n40": {
            "displayName": "Nichrome N40",
            "description": "Katalogprofil für Nichrome N40.",
            "summary": "Katalogprofil für Nichrome N40."
        },
        "n60": {
            "displayName": "Nichrome N60 (C)",
            "description": "Katalogprofil für Nichrome N60 (C).",
            "summary": "Katalogprofil für Nichrome N60 (C)."
        },
        "n70": {
            "displayName": "Nichrome N70 (B)",
            "description": "Katalogprofil für Nichrome N70 (B).",
            "summary": "Katalogprofil für Nichrome N70 (B)."
        },
        "n80": {
            "displayName": "Nichrome N80 (A)",
            "description": "Katalogprofil für Nichrome N80 (A).",
            "summary": "Katalogprofil für Nichrome N80 (A)."
        },
        "ss304": {
            "displayName": "SS 304",
            "description": "Katalogprofil für SS 304.",
            "summary": "Katalogprofil für SS 304."
        },
        "ss316": {
            "displayName": "SS 316",
            "description": "Katalogprofil für SS 316.",
            "summary": "Katalogprofil für SS 316."
        },
        "ss316l": {
            "displayName": "SS 316L / Elite",
            "description": "Katalogprofil für SS 316L / Elite.",
            "summary": "Katalogprofil für SS 316L / Elite."
        },
        "ss317l": {
            "displayName": "SS 317L / Haywire",
            "description": "Katalogprofil für SS 317L / Haywire.",
            "summary": "Katalogprofil für SS 317L / Haywire."
        },
        "ss430": {
            "displayName": "SS 430",
            "description": "Katalogprofil für SS 430.",
            "summary": "Katalogprofil für SS 430."
        },
        "ti1": {
            "displayName": "Titanium 1",
            "description": "Katalogprofil für Titanium 1.",
            "summary": "Katalogprofil für Titanium 1."
        },
        "ti2": {
            "displayName": "Titanium 2 (R50400)",
            "description": "Katalogprofil für Titanium 2 (R50400).",
            "summary": "Katalogprofil für Titanium 2 (R50400)."
        },
        "tie": {
            "displayName": "Titanium ready (e-SG)",
            "description": "Katalogprofil für Titanium ready (e-SG).",
            "summary": "Katalogprofil für Titanium ready (e-SG)."
        },
        "w": {
            "displayName": "Tungsten",
            "description": "Katalogprofil für Tungsten.",
            "summary": "Katalogprofil für Tungsten."
        },
        "nio": {
            "displayName": "Niobium alloy",
            "description": "Katalogprofil für Niobium alloy.",
            "summary": "Katalogprofil für Niobium alloy."
        },
        "ni200": {
            "displayName": "Nickel 200 / Ni200 (UNS N02200)",
            "description": "Katalogprofil für Nickel 200 / Ni200 (UNS N02200).",
            "summary": "Katalogprofil für Nickel 200 / Ni200 (UNS N02200)."
        },
        "nife30": {
            "displayName": "NiFe30 (Resistherm - TFR)",
            "description": "Katalogprofil für NiFe30 (Resistherm - TFR).",
            "summary": "Katalogprofil für NiFe30 (Resistherm - TFR)."
        },
        "dicodes": {
            "displayName": "NiFe30 (Resistherm - TCR)",
            "description": "Katalogprofil für NiFe30 (Resistherm - TCR).",
            "summary": "Katalogprofil für NiFe30 (Resistherm - TCR)."
        },
        "reactor": {
            "displayName": "NiFe (Reactor Wire)",
            "description": "Katalogprofil für NiFe (Reactor Wire).",
            "summary": "Katalogprofil für NiFe (Reactor Wire)."
        },
        "nife30stealth": {
            "displayName": "NiFe30 (StealthVape)",
            "description": "Katalogprofil für NiFe30 (StealthVape).",
            "summary": "Katalogprofil für NiFe30 (StealthVape)."
        },
        "nft70": {
            "displayName": "Nifethal 70 (Alloy120)",
            "description": "Katalogprofil für Nifethal 70 (Alloy120).",
            "summary": "Katalogprofil für Nifethal 70 (Alloy120)."
        },
        "nft52": {
            "displayName": "Nifethal 52 (Alloy52)",
            "description": "Katalogprofil für Nifethal 52 (Alloy52).",
            "summary": "Katalogprofil für Nifethal 52 (Alloy52)."
        },
        "zr": {
            "displayName": "Zirconium (pure)",
            "description": "Katalogprofil für Zirconium (pure).",
            "summary": "Katalogprofil für Zirconium (pure)."
        },
        "n90": {
            "displayName": "Nichrome N90 (Ni90Cr10)",
            "description": "Katalogprofil für Nichrome N90 (Ni90Cr10).",
            "summary": "Katalogprofil für Nichrome N90 (Ni90Cr10)."
        },
        "ss904l": {
            "displayName": "SS 904L (UNS N08904)",
            "description": "Katalogprofil für SS 904L (UNS N08904).",
            "summary": "Katalogprofil für SS 904L (UNS N08904)."
        }
    },
    "batteries": {
        "battery-1": {
            "displayName": "AW IMR 14500",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-2": {
            "displayName": "AW IMR 14500",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-3": {
            "displayName": "AW IMR 16340",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-4": {
            "displayName": "AW IMR 18350",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-5": {
            "displayName": "AW IMR 18350",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-6": {
            "displayName": "AW IMR 18490",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-7": {
            "displayName": "AW IMR 18490",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-8": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-9": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-10": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-11": {
            "displayName": "AWT 26650 4500mAh 75A",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-12": {
            "displayName": "EH IMR 18350",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-13": {
            "displayName": "EH IMR 18500",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-14": {
            "displayName": "EH IMR 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-15": {
            "displayName": "EH IMR 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-16": {
            "displayName": "Efest IMR 18350",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-17": {
            "displayName": "Efest IMR 18350",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-18": {
            "displayName": "Efest IMR 18490",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-19": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-20": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-21": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-22": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-23": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-24": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-25": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-26": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-27": {
            "displayName": "Efest IMR 18650 35A",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-28": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-29": {
            "displayName": "Efest IMR 26650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-30": {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": undefined,
            "summary": "Ein interner Akku im Gerät statt einer vom Benutzer austauschbaren Zelle.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-31": {
            "displayName": "Innokin iTaste VV v3",
            "description": undefined,
            "summary": "Ein interner Akku im Gerät statt einer vom Benutzer austauschbaren Zelle.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-32": {
            "displayName": "Keeppower IMR26650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-33": {
            "displayName": "LG 18650HB6",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-34": {
            "displayName": "LG 18650HE2",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-35": {
            "displayName": "LG 18650HG2",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-36": {
            "displayName": "MNKE IMR 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-37": {
            "displayName": "MNKE IMR 26650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-38": {
            "displayName": "MXJO IMR 18650 35A",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-39": {
            "displayName": "MXJO IMR 18650 20A",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-40": {
            "displayName": "Nitecore NL188",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-41": {
            "displayName": "Orbtronic 18650 PD2900",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-42": {
            "displayName": "Orbtronic 18650 SX22",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-43": {
            "displayName": "Orbtronic 18650 SX30",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-44": {
            "displayName": "Orbtronic 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-45": {
            "displayName": "Orbtronic CGR18650CH",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-46": {
            "displayName": "Orbtronic NCR18650A",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-47": {
            "displayName": "Panasonic CGR18650CH",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-48": {
            "displayName": "Panasonic NCR18650A",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-49": {
            "displayName": "Panasonic NCR18650B",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-50": {
            "displayName": "Panasonic NCR18650BD",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-51": {
            "displayName": "Panasonic NCR18650PF",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-52": {
            "displayName": "Panasonic CGR26650A",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-53": {
            "displayName": "Samsung ICR18650-26F",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-54": {
            "displayName": "Panasonic NCR18650PD",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-55": {
            "displayName": "Samsung INR18650-20R",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-56": {
            "displayName": "Samsung INR18650-25R",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-57": {
            "displayName": "Samsung INR18650-20Q",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-58": {
            "displayName": "Samsung INR18650-30Q",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-59": {
            "displayName": "Sanyo UR16650ZTA",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-60": {
            "displayName": "Sanyo UR18650EX",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-61": {
            "displayName": "Sanyo UR18650F",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": "Batterie mit geringem Stromverbrauch; nicht zum Dampfen geeignet."
        },
        "battery-62": {
            "displayName": "Sibeile IMR 18500",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-63": {
            "displayName": "Sibeile IMR 18500",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-64": {
            "displayName": "Sony US18650VTC3",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-65": {
            "displayName": "Sony US18650VTC4",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-66": {
            "displayName": "Sony US18650VTC5",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-67": {
            "displayName": "Sony US18650v3",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-68": {
            "displayName": "Sony US26650VT",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-69": {
            "displayName": "Torchy IMR 18350",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-70": {
            "displayName": "Vappower IMR 26650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-71": {
            "displayName": "Vamped 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "20 A Dauerleistung; Pulswerte werden nicht verwendet."
            ],
            "safetyText": undefined
        },
        "battery-72": {
            "displayName": "UltraFire BRC 18650 4000mAh li-ion",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "Die tatsächliche Kapazität ist geringer als auf dem Etikett angegeben."
            ],
            "safetyText": undefined
        },
        "battery-73": {
            "displayName": "UltraFire XSL 18350 1200mAh",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "Die tatsächliche Kapazität ist geringer als auf dem Etikett angegeben."
            ],
            "safetyText": undefined
        },
        "battery-74": {
            "displayName": "Vamped 26650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-75": {
            "displayName": "Xtar IMR 18350",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-76": {
            "displayName": "Xtar IMR 18500",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-77": {
            "displayName": "EVE INR18650/30P",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "20 Ein konservativer unabhängiger Vergleichswert; Die genaue Verpackung und Produktionsüberarbeitung bleiben relevant."
            ],
            "safetyText": undefined
        },
        "battery-78": {
            "displayName": "EVE INR18650/25P",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "15 Ein konservativer Wert aus exakten Modelltests; Die geprüfte, mit CCC gekennzeichnete Revision bleibt relevant."
            ],
            "safetyText": undefined
        },
        "battery-79": {
            "displayName": "EVE INR18650/30PL",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "45 Ein unabhängiger kontinuierlicher Wert für die getestete Tabellenrevision; Ersetzen Sie nicht die Pulswerte."
            ],
            "safetyText": undefined
        },
        "battery-80": {
            "displayName": "Ampace JP30P1",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "36 Ein wahrer kontinuierlicher Wert; der Wert von 56 A ist temperaturbegrenzt."
            ],
            "safetyText": undefined
        },
        "battery-81": {
            "displayName": "Tenpower INR18650-30XG",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "40 Ein konservativer Wert; Die getesteten Zellen schienen vor der Produktion zu sein und hatten kein CCC-Logo."
            ],
            "safetyText": undefined
        },
        "battery-82": {
            "displayName": "EVE INR21700/58E",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "13 Ein empfohlener Dauerwert; 16,8 A ist ein absolutes Maximum, das nicht für die Zyklenlebensdauer vorgesehen ist."
            ],
            "safetyText": undefined
        },
        "battery-83": {
            "displayName": "Reliance INR21700-RS40",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "40 Ein konservativer Wert; 70 A ist temperaturbegrenzt und die getesteten Muster stammten aus der Vorproduktion."
            ],
            "safetyText": undefined
        },
        "battery-84": {
            "displayName": "Reliance INR21700-RS50",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "40 A Vergleichswert Produktionszelle; 70 A erfordern eine Temperaturregelung."
            ],
            "safetyText": undefined
        },
        "battery-85": {
            "displayName": "Vapcell S41",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "40 Ein exakter Wrapper-Wert; 70 A ist auf 60 °C begrenzt und als EVE 40PL-Umwicklung getestet."
            ],
            "safetyText": undefined
        },
        "battery-86": {
            "displayName": "BAK 21700-65E",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "19 Ein konservativer Wert; Genaue getestete Muster schienen vor der Produktion zu sein und hatten keine CCC-Kennzeichnung."
            ],
            "safetyText": undefined
        },
        "battery-87": {
            "displayName": "Tenpower INR21700-50XG",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "40 Ein konservativer Wert; 90 A ist temperaturbegrenzt und getestete Zellen erschienen vor der Produktion."
            ],
            "safetyText": undefined
        },
        "battery-88": {
            "displayName": "Tenpower INR21700-60XG",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "40 Ein konservativer Wert; 60 A ist temperaturbegrenzt und die Produktionskontinuität bleibt ungelöst."
            ],
            "safetyText": undefined
        },
        "battery-89": {
            "displayName": "Great Power 50Q",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "40 Ein konservativer Wert; Die getesteten Proben hatten eine inkonsistente Kapazität und keine CCC-/CE-Kennzeichnung."
            ],
            "safetyText": undefined
        },
        "battery-90": {
            "displayName": "FEB 21700-68E",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "13 Ein konservativer Wert; Genaue getestete Muster schienen vor der Produktion zu sein und hatten keine CCC-Kennzeichnung."
            ],
            "safetyText": undefined
        },
        "battery-91": {
            "displayName": "Reliance INR21700-RS60",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "30 Ein vom Tester geschätzter kontinuierlicher Wert; Der Maximalwert von 50 A von Reliance ist temperaturbegrenzt."
            ],
            "safetyText": undefined
        },
        "battery-92": {
            "displayName": "Reliance INR21700-RH60",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "20 Ein kontinuierlicher Wert aus zwei geprüften produktionsbezogenen Chargen; 30 A ist temperaturbegrenzt."
            ],
            "safetyText": undefined
        },
        "battery-93": {
            "displayName": "Amprius INR18650/40 (SA110)",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "12 A Dauerstrom; 20 A ist nur Impulsbetrieb. Das genau getestete Deckblatt ist als SA110 / INR18650/40 verzeichnet."
            ],
            "safetyText": undefined
        },
        "battery-94": {
            "displayName": "Vapcell B30 18650",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "20 Ein exakter Wrapper-Wert; Der Tester empfiehlt einen Dauerstrom von unter 15 A. Vapehuset wirbt im Titel mit 25 A, und spätere Umverpackungsbeschaffungs- oder Verpackungsrevisionen können abweichen."
            ],
            "safetyText": undefined
        },
        "battery-95": {
            "displayName": "Golisi S35 21700",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "30 Ein exakter Modellwert; Hierbei handelt es sich um eine Neuverpackung, und spätere Überarbeitungen des Wrappers oder der zugrunde liegenden Bezugsquellen können abweichen."
            ],
            "safetyText": undefined
        },
        "battery-96": {
            "displayName": "iJoy 20700 3000mAh five-leg",
            "description": undefined,
            "summary": "Eine herausnehmbare wiederaufladbare Zelle, die in kompatiblen Geräten verwendet wird.",
            "notes": [
                "30 Ein exakter Revisionswert mit fünf Beinen; Vierbeinige und spätere Revisionen, die dieselbe Umhüllung verwenden, unterscheiden sich wesentlich und dürfen dieses Profil nicht erben."
            ],
            "safetyText": undefined
        }
    },
    "mods": {
        "preset-1": {
            "displayName": "AceSmok Ace 50",
            "description": "Ein reguliertes Dampfgeräteprofil für AceSmok Ace 50.",
            "summary": "Ein reguliertes Dampfgeräteprofil für AceSmok Ace 50."
        },
        "preset-2": {
            "displayName": "Ante Meridiem Axis",
            "description": "Ein reguliertes Dampfgeräteprofil für Ante Meridiem Axis.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Ante Meridiem Axis."
        },
        "preset-3": {
            "displayName": "Anyvape AnyMOD",
            "description": "Ein reguliertes Dampfgeräteprofil für Anyvape AnyMOD.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Anyvape AnyMOD."
        },
        "preset-4": {
            "displayName": "Arrow 100W",
            "description": "Ein reguliertes Dampfgeräteprofil für Arrow 100W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Arrow 100W."
        },
        "preset-5": {
            "displayName": "Artisan Supermax",
            "description": "Ein reguliertes Dampfgeräteprofil für Artisan Supermax.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Artisan Supermax."
        },
        "preset-6": {
            "displayName": "Asmodus Snow Wolf 200W",
            "description": "Ein reguliertes Dampfgeräteprofil für Asmodus Snow Wolf 200W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Asmodus Snow Wolf 200W."
        },
        "preset-7": {
            "displayName": "Aspire CF Sub Ohm",
            "description": "Ein reguliertes Dampfgeräteprofil für Aspire CF Sub Ohm.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Aspire CF Sub Ohm."
        },
        "preset-8": {
            "displayName": "Beastmode Industries BMI 100 Watt V.1",
            "description": "Ein reguliertes Dampfgeräteprofil für Beastmode Industries BMI 100 Watt V.1.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Beastmode Industries BMI 100 Watt V.1."
        },
        "preset-9": {
            "displayName": "Billet Box rev. 3a",
            "description": "Billet Box Rev. 3a mit perlgestrahlter, glänzend eloxierter Aluminiumoberfläche; eingeführt im Mai 2014.",
            "summary": "Billet Box Rev."
        },
        "preset-10": {
            "displayName": "Cloupor DNA-30",
            "description": "Ein Cloupor 30-W-Gerät, das einen Klon-Chipsatz im DNA30-Stil eines Drittanbieters verwendet, kein authentisches Evolv DNA-30D-Board.",
            "summary": "Ein Cloupor 30-W-Gerät, das einen Klon-Chipsatz im DNA30-Stil eines Drittanbieters verwendet, kein authentisches Evolv DNA-30D-Board."
        },
        "preset-11": {
            "displayName": "Cloupor DNA-50",
            "description": "Ein reguliertes Dampfgeräteprofil für Cloupor DNA-50.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Cloupor DNA-50."
        },
        "preset-12": {
            "displayName": "Cloupor GT",
            "description": "Ein reguliertes E-Zigaretten-Geräteprofil für Cloupor GT.",
            "summary": "Ein reguliertes E-Zigaretten-Geräteprofil für Cloupor GT."
        },
        "preset-13": {
            "displayName": "Cloupor Mini",
            "description": "Ein reguliertes Dampfgeräteprofil für Cloupor Mini.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Cloupor Mini."
        },
        "preset-14": {
            "displayName": "Cloupor T5",
            "description": "Ein reguliertes Dampfgeräteprofil für Cloupor T5.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Cloupor T5."
        },
        "preset-15": {
            "displayName": "Cloupor T6",
            "description": "Ein reguliertes Dampfgeräteprofil für Cloupor T6.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Cloupor T6."
        },
        "preset-16": {
            "displayName": "Cloupor T8",
            "description": "Ein reguliertes Dampfgeräteprofil für Cloupor T8.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Cloupor T8."
        },
        "preset-17": {
            "displayName": "Cloupor ZNA50",
            "description": "Ein reguliertes Dampfgeräteprofil für Cloupor ZNA50.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Cloupor ZNA50."
        },
        "preset-18": {
            "displayName": "C-Tratech Smart Box 50W",
            "description": "Ein reguliertes Dampfgeräteprofil für C-Tratech Smart Box 50W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für C-Tratech Smart Box 50W."
        },
        "preset-19": {
            "displayName": "Dicodes Dani Extreme",
            "description": "Ein reguliertes Dampfgeräteprofil für Dicodes Dani Extreme.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Dicodes Dani Extreme."
        },
        "preset-20": {
            "displayName": "Dicodes Dani Extreme v2 / Pipeline Pro v2",
            "description": "Ein reguliertes Dampfgeräteprofil für Dicodes Dani Extreme v2 / Pipeline Pro v2.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Dicodes Dani Extreme v2 / Pipeline Pro v2."
        },
        "preset-21": {
            "displayName": "DJK Wood Mods The Nerd VV",
            "description": "Ein reguliertes Dampfgeräteprofil für DJK Wood Mods The Nerd VV.",
            "summary": "Ein reguliertes Dampfgeräteprofil für DJK Wood Mods The Nerd VV."
        },
        "preset-22": {
            "displayName": "Dovpo DT-50",
            "description": "Ein reguliertes E-Zigaretten-Geräteprofil für Dovpo DT-50.",
            "summary": "Ein reguliertes E-Zigaretten-Geräteprofil für Dovpo DT-50."
        },
        "preset-23": {
            "displayName": "Dovpo E-LVT",
            "description": "Ein reguliertes Dampfgeräteprofil für Dovpo E-LVT.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Dovpo E-LVT."
        },
        "preset-24": {
            "displayName": "Dovpo E-Mech",
            "description": "Ein reguliertes Dampfgeräteprofil für Dovpo E-Mech.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Dovpo E-Mech."
        },
        "preset-25": {
            "displayName": "Dovpo TC 50",
            "description": "Ein reguliertes E-Zigaretten-Geräteprofil für Dovpo TC 50.",
            "summary": "Ein reguliertes E-Zigaretten-Geräteprofil für Dovpo TC 50."
        },
        "preset-26": {
            "displayName": "eGo Twist",
            "description": "Ein reguliertes Dampfgeräteprofil für eGo Twist.",
            "summary": "Ein reguliertes Dampfgeräteprofil für eGo Twist."
        },
        "preset-27": {
            "displayName": "eGo-V V3",
            "description": "Ein reguliertes Dampfgeräteprofil für eGo-V V3.",
            "summary": "Ein reguliertes Dampfgeräteprofil für eGo-V V3."
        },
        "preset-28": {
            "displayName": "Evod V v3",
            "description": "Ein reguliertes Dampfgeräteprofil für Evod V v3.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evod V v3."
        },
        "preset-29": {
            "displayName": "Evolv DNA-20D",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-20D.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-20D."
        },
        "preset-30": {
            "displayName": "Evolv DNA-30D",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-30D.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-30D."
        },
        "preset-31": {
            "displayName": "Evolv DNA-40 (std. wire)",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-40 (std. wire).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-40 (Std."
        },
        "preset-32": {
            "displayName": "Evolv DNA-40 (Ni 200)",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-40 (Ni 200).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-40 (Ni 200)."
        },
        "preset-33": {
            "displayName": "Evolv DNA60 (non-color)",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA60 (non-color).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA60 (non-color)."
        },
        "preset-34": {
            "displayName": "Evolv DNA-75",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-75.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-75."
        },
        "preset-35": {
            "displayName": "Evolv DNA-200 (2 cells, DNA-133)",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-200 (2 cells, DNA-133).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-200 (2 cells, DNA-133)."
        },
        "preset-36": {
            "displayName": "Evolv DNA-200 (3 cells)",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-200 (3 cells).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-200 (3 cells)."
        },
        "preset-37": {
            "displayName": "Evolv DNA-200 (TC mode)",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-200 (TC mode).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-200 (TC mode)."
        },
        "preset-38": {
            "displayName": "Evolv DNA-250 (2 cells, DNA-166)",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-250 (2 cells, DNA-166).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-250 (2 cells, DNA-166)."
        },
        "preset-39": {
            "displayName": "Evolv DNA-250 (3 cells)",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-250 (3 cells).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA-250 (3 cells)."
        },
        "preset-40": {
            "displayName": "Evolv Kick 2",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv Kick 2.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv Kick 2."
        },
        "preset-41": {
            "displayName": "Eleaf iStick",
            "description": "Ein reguliertes Dampfgeräteprofil für Eleaf iStick.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Eleaf iStick."
        },
        "preset-42": {
            "displayName": "Eleaf iStick 30W",
            "description": "Ein reguliertes Dampfgeräteprofil für Eleaf iStick 30W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Eleaf iStick 30W."
        },
        "preset-43": {
            "displayName": "Eleaf iStick 40W TC",
            "description": "Ein reguliertes Dampfgeräteprofil für Eleaf iStick 40W TC.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Eleaf iStick 40W TC."
        },
        "preset-44": {
            "displayName": "Eleaf iStick 50W",
            "description": "Ein reguliertes Dampfgeräteprofil für Eleaf iStick 50W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Eleaf iStick 50W."
        },
        "preset-45": {
            "displayName": "Eleaf iStick 100W",
            "description": "Ein reguliertes Dampfgeräteprofil für Eleaf iStick 100W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Eleaf iStick 100W."
        },
        "preset-46": {
            "displayName": "Gossmods The Duke",
            "description": "Ein reguliertes Dampfgeräteprofil für Gossmods The Duke.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Gossmods The Duke."
        },
        "preset-47": {
            "displayName": "Grand Innovations GI2",
            "description": "Ein reguliertes Dampfgeräteprofil für Grand Innovations GI2.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Grand Innovations GI2."
        },
        "preset-48": {
            "displayName": "Heatvape Invader Mini",
            "description": "Ein reguliertes Dampfgeräteprofil für Heatvape Invader Mini.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Heatvape Invader Mini."
        },
        "preset-49": {
            "displayName": "Heatvape Invader Mini (TC mode)",
            "description": "Ein reguliertes Dampfgeräteprofil für Heatvape Invader Mini (TC mode).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Heatvape Invader Mini (TC mode)."
        },
        "preset-50": {
            "displayName": "iJoy A160",
            "description": "Ein reguliertes Dampfgeräteprofil für iJoy A160.",
            "summary": "Ein reguliertes Dampfgeräteprofil für iJoy A160."
        },
        "preset-51": {
            "displayName": "Innokin Cool Fire II",
            "description": "Ein reguliertes Dampfgeräteprofil für Innokin Cool Fire II.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Innokin Cool Fire II."
        },
        "preset-52": {
            "displayName": "Innokin Cool Fire IV",
            "description": "Ein reguliertes Dampfgeräteprofil für Innokin Cool Fire IV.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Innokin Cool Fire IV."
        },
        "preset-53": {
            "displayName": "Innokin Disrupter",
            "description": "Ein reguliertes Dampfgeräteprofil für Innokin Disrupter.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Innokin Disrupter."
        },
        "preset-54": {
            "displayName": "Innokin iTaste 134 / iTaste 134 mini",
            "description": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste 134 / iTaste 134 mini.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste 134 / iTaste 134 mini."
        },
        "preset-55": {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste MVP 2.0.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste MVP 2.0."
        },
        "preset-56": {
            "displayName": "Innokin iTaste MVP 20 Watt",
            "description": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste MVP 20 Watt.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste MVP 20 Watt."
        },
        "preset-57": {
            "displayName": "Innokin iTaste MVP 3.0",
            "description": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste MVP 3.0.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste MVP 3.0."
        },
        "preset-58": {
            "displayName": "Innokin iTaste MVP 3 Pro",
            "description": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste MVP 3 Pro.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste MVP 3 Pro."
        },
        "preset-59": {
            "displayName": "Innokin iTaste SVD",
            "description": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste SVD.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste SVD."
        },
        "preset-60": {
            "displayName": "Innokin iTaste SVD2",
            "description": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste SVD2.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste SVD2."
        },
        "preset-61": {
            "displayName": "Innokin iTaste VTR",
            "description": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste VTR.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste VTR."
        },
        "preset-62": {
            "displayName": "Innokin iTaste VV V3.0",
            "description": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste VV V3.0.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Innokin iTaste VV V3.0."
        },
        "preset-63": {
            "displayName": "Joy4life Beyang 30W",
            "description": "Ein reguliertes Dampfgeräteprofil für Joy4life Beyang 30W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Joy4life Beyang 30W."
        },
        "preset-64": {
            "displayName": "Joyetech eCom Supreme",
            "description": "Ein reguliertes Dampfgeräteprofil für Joyetech eCom Supreme.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Joyetech eCom Supreme."
        },
        "preset-65": {
            "displayName": "Joyetech eVic",
            "description": "Ein reguliertes Dampfgeräteprofil für Joyetech eVic.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Joyetech eVic."
        },
        "preset-66": {
            "displayName": "Joyetech eVic VT",
            "description": "Ein reguliertes Dampfgeräteprofil für Joyetech eVic VT.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Joyetech eVic VT."
        },
        "preset-67": {
            "displayName": "Joyetech eVic VT (TC mode)",
            "description": "Ein reguliertes Dampfgeräteprofil für Joyetech eVic VT (TC mode).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Joyetech eVic VT (TC mode)."
        },
        "preset-68": {
            "displayName": "Joyetech eVic Supreme",
            "description": "Ein reguliertes Dampfgeräteprofil für Joyetech eVic Supreme.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Joyetech eVic Supreme."
        },
        "preset-69": {
            "displayName": "J Well Alesia",
            "description": "Ein reguliertes Dampfgeräteprofil für J Well Alesia.",
            "summary": "Ein reguliertes Dampfgeräteprofil für J Well Alesia."
        },
        "preset-70": {
            "displayName": "J Well Troca",
            "description": "Ein reguliertes E-Zigaretten-Geräteprofil für J Well Troca.",
            "summary": "Ein reguliertes E-Zigaretten-Geräteprofil für J Well Troca."
        },
        "preset-71": {
            "displayName": "Kanger e-Power v3",
            "description": "Ein reguliertes Dampfgeräteprofil für Kanger e-Power v3.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Kanger e-Power v3."
        },
        "preset-72": {
            "displayName": "Kanger IPOW 2",
            "description": "Ein reguliertes Dampfgeräteprofil für Kanger IPOW 2.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Kanger IPOW 2."
        },
        "preset-73": {
            "displayName": "Kanger KBOX",
            "description": "Ein reguliertes Dampfgeräteprofil für Kanger KBOX.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Kanger KBOX."
        },
        "preset-74": {
            "displayName": "Kanger KBOX Mini / SUBOX Mini",
            "description": "Ein reguliertes Dampfgeräteprofil für Kanger KBOX Mini / SUBOX Mini.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Kanger KBOX Mini / SUBOX Mini."
        },
        "preset-75": {
            "displayName": "Kanger K-Simar 20",
            "description": "Ein reguliertes Dampfgeräteprofil für Kanger K-Simar 20.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Kanger K-Simar 20."
        },
        "preset-76": {
            "displayName": "Kangside e-Huge",
            "description": "Ein reguliertes Dampfgeräteprofil für Kangside e-Huge.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Kangside e-Huge."
        },
        "preset-77": {
            "displayName": "Kamry 20",
            "description": "Ein reguliertes Dampfgeräteprofil für Kamry 20.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Kamry 20."
        },
        "preset-78": {
            "displayName": "Kamry 60W",
            "description": "Ein reguliertes Dampfgeräteprofil für Kamry 60W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Kamry 60W."
        },
        "preset-79": {
            "displayName": "Kamry God Box",
            "description": "Ein reguliertes Dampfgeräteprofil für Kamry God Box.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Kamry God Box."
        },
        "preset-80": {
            "displayName": "KangXin VF clone v3",
            "description": "Ein reguliertes Dampfgeräteprofil für KangXin VF clone v3.",
            "summary": "Ein reguliertes Dampfgeräteprofil für KangXin VF clone v3."
        },
        "preset-81": {
            "displayName": "KangXin KX5-50W",
            "description": "Ein reguliertes Dampfgeräteprofil für KangXin KX5-50W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für KangXin KX5-50W."
        },
        "preset-82": {
            "displayName": "Koopor Mini KP60",
            "description": "Ein reguliertes Dampfgeräteprofil für Koopor Mini KP60.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Koopor Mini KP60."
        },
        "preset-83": {
            "displayName": "Koopor Mini KP60 (TC)",
            "description": "Ein reguliertes Dampfgeräteprofil für Koopor Mini KP60 (TC).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Koopor Mini KP60 (TC)."
        },
        "preset-84": {
            "displayName": "KSD 30",
            "description": "Ein reguliertes Dampfgeräteprofil für KSD 30.",
            "summary": "Ein reguliertes Dampfgeräteprofil für KSD 30."
        },
        "preset-85": {
            "displayName": "KSD Kmax (single battery)",
            "description": "Ein reguliertes Dampfgeräteprofil für KSD Kmax (single battery).",
            "summary": "Ein reguliertes Dampfgeräteprofil für KSD Kmax (single battery)."
        },
        "preset-86": {
            "displayName": "KSD Kmax (stacked)",
            "description": "Ein reguliertes Dampfgeräteprofil für KSD Kmax (stacked).",
            "summary": "Ein reguliertes Dampfgeräteprofil für KSD Kmax (stacked)."
        },
        "preset-87": {
            "displayName": "L-Rider Lambo 6.0",
            "description": "Ein reguliertes Dampfgeräteprofil für L-Rider Lambo 6.0.",
            "summary": "Ein reguliertes Dampfgeräteprofil für L-Rider Lambo 6.0."
        },
        "preset-88": {
            "displayName": "L-Rider Lavatube",
            "description": "Ein reguliertes Dampfgeräteprofil für L-Rider Lavatube.",
            "summary": "Ein reguliertes Dampfgeräteprofil für L-Rider Lavatube."
        },
        "preset-89": {
            "displayName": "Lotus Jellyfish",
            "description": "Ein reguliertes Dampfgeräteprofil für Lotus Jellyfish.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Lotus Jellyfish."
        },
        "preset-90": {
            "displayName": "Lotus LE80",
            "description": "Ein reguliertes Dampfgeräteprofil für Lotus LE80.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Lotus LE80."
        },
        "preset-91": {
            "displayName": "Luxyoun Smaug",
            "description": "Ein reguliertes Dampfgeräteprofil für Luxyoun Smaug.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Luxyoun Smaug."
        },
        "preset-92": {
            "displayName": "Majesty 150W",
            "description": "Ein reguliertes Dampfgeräteprofil für Majesty 150W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Majesty 150W."
        },
        "preset-93": {
            "displayName": "Megatron 260",
            "description": "Ein reguliertes Dampfgeräteprofil für Megatron 260.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Megatron 260."
        },
        "preset-94": {
            "displayName": "Naos Raptor 10A",
            "description": "Ein reguliertes Dampfgeräteprofil für Naos Raptor 10A.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Naos Raptor 10A."
        },
        "preset-95": {
            "displayName": "Naos Raptor 20A",
            "description": "Ein reguliertes Dampfgeräteprofil für Naos Raptor 20A.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Naos Raptor 20A."
        },
        "preset-96": {
            "displayName": "Nivel V3",
            "description": "Ein reguliertes Dampfgeräteprofil für Nivel V3.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Nivel V3."
        },
        "preset-97": {
            "displayName": "Notcigs VV",
            "description": "Ein reguliertes Dampfgeräteprofil für Notcigs VV.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Notcigs VV."
        },
        "preset-98": {
            "displayName": "OKL2-T/20-W12",
            "description": "Ein reguliertes Dampfgeräteprofil für OKL2-T/20-W12.",
            "summary": "Ein reguliertes Dampfgeräteprofil für OKL2-T/20-W12."
        },
        "preset-99": {
            "displayName": "OKR-T10",
            "description": "Ein reguliertes Dampfgeräteprofil für OKR-T10.",
            "summary": "Ein reguliertes Dampfgeräteprofil für OKR-T10."
        },
        "preset-100": {
            "displayName": "Pioneer4You/Green Leaf P-Max",
            "description": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf P-Max.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf P-Max."
        },
        "preset-101": {
            "displayName": "ProVari 2, ProVari 2.5",
            "description": "Ein reguliertes Dampfgeräteprofil für ProVari 2, ProVari 2.5.",
            "summary": "Ein reguliertes Dampfgeräteprofil für ProVari 2, ProVari 2.5."
        },
        "preset-102": {
            "displayName": "ProVari P3 beta",
            "description": "Ein reguliertes Dampfgeräteprofil für ProVari P3 beta.",
            "summary": "Ein reguliertes Dampfgeräteprofil für ProVari P3 beta."
        },
        "preset-103": {
            "displayName": "ProVari P35",
            "description": "Ein reguliertes Dampfgeräteprofil für ProVari P35.",
            "summary": "Ein reguliertes Dampfgeräteprofil für ProVari P35."
        },
        "preset-104": {
            "displayName": "Psmoke GI2",
            "description": "Ein reguliertes Dampfgeräteprofil für Psmoke GI2.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Psmoke GI2."
        },
        "preset-105": {
            "displayName": "RainbowHeaven Arrow",
            "description": "Ein reguliertes Dampfgeräteprofil für RainbowHeaven Arrow.",
            "summary": "Ein reguliertes Dampfgeräteprofil für RainbowHeaven Arrow."
        },
        "preset-106": {
            "displayName": "Robbot Tech ZNA50",
            "description": "Ein reguliertes Dampfgeräteprofil für Robbot Tech ZNA50.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Robbot Tech ZNA50."
        },
        "preset-107": {
            "displayName": "Sigelei 20W",
            "description": "Ein reguliertes Dampfgeräteprofil für Sigelei 20W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sigelei 20W."
        },
        "preset-108": {
            "displayName": "Sigelei 50W",
            "description": "Ein reguliertes Dampfgeräteprofil für Sigelei 50W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sigelei 50W."
        },
        "preset-109": {
            "displayName": "Sigelei 75W TC",
            "description": "Ein reguliertes Dampfgeräteprofil für Sigelei 75W TC.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sigelei 75W TC."
        },
        "preset-110": {
            "displayName": "Sigelei 150W",
            "description": "Ein reguliertes Dampfgeräteprofil für Sigelei 150W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sigelei 150W."
        },
        "preset-111": {
            "displayName": "Sigelei Fuchai 213 Plus",
            "description": "Ein reguliertes Dampfgeräteprofil für Sigelei Fuchai 213 Plus.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sigelei Fuchai 213 Plus."
        },
        "preset-112": {
            "displayName": "Sigelei Kick",
            "description": "Ein reguliertes Dampfgeräteprofil für Sigelei Kick.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sigelei Kick."
        },
        "preset-113": {
            "displayName": "Sigelei Legend v2",
            "description": "Ein reguliertes Dampfgeräteprofil für Sigelei Legend v2.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sigelei Legend v2."
        },
        "preset-114": {
            "displayName": "Sigelei Vmax",
            "description": "Ein reguliertes Dampfgeräteprofil für Sigelei Vmax.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sigelei Vmax."
        },
        "preset-115": {
            "displayName": "Sigelei Zmax V3",
            "description": "Ein reguliertes Dampfgeräteprofil für Sigelei Zmax V3.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sigelei Zmax V3."
        },
        "preset-116": {
            "displayName": "Sigelei Zmax V5",
            "description": "Ein reguliertes Dampfgeräteprofil für Sigelei Zmax V5.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sigelei Zmax V5."
        },
        "preset-117": {
            "displayName": "Simeiyue God 180",
            "description": "Ein reguliertes Dampfgeräteprofil für Simeiyue God 180.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Simeiyue God 180."
        },
        "preset-118": {
            "displayName": "Simeiyue God 180s",
            "description": "Ein reguliertes Dampfgeräteprofil für Simeiyue God 180s.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Simeiyue God 180s."
        },
        "preset-119": {
            "displayName": "Simeiyue God 260",
            "description": "Ein reguliertes Dampfgeräteprofil für Simeiyue God 260.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Simeiyue God 260."
        },
        "preset-120": {
            "displayName": "Smok Ace",
            "description": "Ein reguliertes Dampfgeräteprofil für Smok Ace.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Smok Ace."
        },
        "preset-121": {
            "displayName": "Smok BEC Pro",
            "description": "Ein reguliertes Dampfgeräteprofil für Smok BEC Pro.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Smok BEC Pro."
        },
        "preset-122": {
            "displayName": "Smok G-Priv 220W",
            "description": "Ein reguliertes Dampfgeräteprofil für Smok G-Priv 220W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Smok G-Priv 220W."
        },
        "preset-123": {
            "displayName": "Smok Sid",
            "description": "Ein reguliertes Dampfgeräteprofil für Smok Sid.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Smok Sid."
        },
        "preset-124": {
            "displayName": "Smok X Cube II",
            "description": "Ein reguliertes Dampfgeräteprofil für Smok X Cube II.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Smok X Cube II."
        },
        "preset-125": {
            "displayName": "Smok X Pro BT50",
            "description": "Ein reguliertes Dampfgeräteprofil für Smok X Pro BT50.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Smok X Pro BT50."
        },
        "preset-126": {
            "displayName": "Smok X Pro M36",
            "description": "Ein reguliertes Dampfgeräteprofil für Smok X Pro M36.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Smok X Pro M36."
        },
        "preset-127": {
            "displayName": "Smok X Pro M50",
            "description": "Ein reguliertes Dampfgeräteprofil für Smok X Pro M50.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Smok X Pro M50."
        },
        "preset-128": {
            "displayName": "Smok X Pro M80",
            "description": "Ein reguliertes Dampfgeräteprofil für Smok X Pro M80.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Smok X Pro M80."
        },
        "preset-129": {
            "displayName": "Smok Zmax",
            "description": "Ein reguliertes Dampfgeräteprofil für Smok Zmax.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Smok Zmax."
        },
        "preset-130": {
            "displayName": "Smok Zmax Mini",
            "description": "Ein reguliertes Dampfgeräteprofil für Smok Zmax Mini.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Smok Zmax Mini."
        },
        "preset-131": {
            "displayName": "SMY 260W",
            "description": "Ein reguliertes Dampfgeräteprofil für SMY 260W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für SMY 260W."
        },
        "preset-132": {
            "displayName": "SMY 50TC",
            "description": "Ein reguliertes Dampfgeräteprofil für SMY 50TC.",
            "summary": "Ein reguliertes Dampfgeräteprofil für SMY 50TC."
        },
        "preset-133": {
            "displayName": "SMY GOD 180",
            "description": "Ein reguliertes Dampfgeräteprofil für SMY GOD 180.",
            "summary": "Ein reguliertes Dampfgeräteprofil für SMY GOD 180."
        },
        "preset-134": {
            "displayName": "Steam STM-1 / STM-2",
            "description": "Ein reguliertes Dampfgeräteprofil für Steam STM-1 / STM-2.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Steam STM-1 / STM-2."
        },
        "preset-135": {
            "displayName": "Sunzip Vapmod Deezel",
            "description": "Ein reguliertes Dampfgeräteprofil für Sunzip Vapmod Deezel.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sunzip Vapmod Deezel."
        },
        "preset-136": {
            "displayName": "Taifun The Eye",
            "description": "Ein reguliertes Dampfgeräteprofil für Taifun The Eye.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Taifun The Eye."
        },
        "preset-137": {
            "displayName": "Taifun The Eye (updated)",
            "description": "Ein reguliertes Dampfgeräteprofil für Taifun The Eye (updated).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Taifun The Eye (updated)."
        },
        "preset-138": {
            "displayName": "Tesla",
            "description": "Ein reguliertes Dampfgeräteprofil für Tesla.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Tesla."
        },
        "preset-139": {
            "displayName": "Tesla 120W",
            "description": "Ein reguliertes Dampfgeräteprofil für Tesla 120W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Tesla 120W."
        },
        "preset-140": {
            "displayName": "Tesla 2 Sub Mod",
            "description": "Ein reguliertes Dampfgeräteprofil für Tesla 2 Sub Mod.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Tesla 2 Sub Mod."
        },
        "preset-141": {
            "displayName": "Tesla Spider",
            "description": "Ein reguliertes Dampfgeräteprofil für Tesla Spider.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Tesla Spider."
        },
        "preset-142": {
            "displayName": "Tobeco ZNA 36",
            "description": "Ein reguliertes Dampfgeräteprofil für Tobeco ZNA 36.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Tobeco ZNA 36."
        },
        "preset-143": {
            "displayName": "Vamo 35W (clone)",
            "description": "Ein reguliertes Dampfgeräteprofil für Vamo 35W (clone).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Vamo 35W (clone)."
        },
        "preset-144": {
            "displayName": "Vamo V1 / V2 / V3 / V5",
            "description": "Ein reguliertes Dampfgeräteprofil für Vamo V1 / V2 / V3 / V5.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Vamo V1 / V2 / V3 / V5."
        },
        "preset-145": {
            "displayName": "Vamo V7",
            "description": "Ein reguliertes Dampfgeräteprofil für Vamo V7.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Vamo V7."
        },
        "preset-146": {
            "displayName": "VaporFi Vox II",
            "description": "Ein reguliertes Dampfgeräteprofil für VaporFi Vox II.",
            "summary": "Ein reguliertes Dampfgeräteprofil für VaporFi Vox II."
        },
        "preset-147": {
            "displayName": "Vicious Ant VariAnt 120W",
            "description": "Ein reguliertes Dampfgeräteprofil für Vicious Ant VariAnt 120W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Vicious Ant VariAnt 120W."
        },
        "preset-148": {
            "displayName": "Vicious Ant VariAnt 250W",
            "description": "Ein reguliertes Dampfgeräteprofil für Vicious Ant VariAnt 250W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Vicious Ant VariAnt 250W."
        },
        "preset-149": {
            "displayName": "Vision Spinner / Spinner II",
            "description": "Ein reguliertes Dampfgeräteprofil für Vision Spinner / Spinner II.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Vision Spinner / Spinner II."
        },
        "preset-150": {
            "displayName": "Vision X.Fir/X.Gun",
            "description": "Ein reguliertes Dampfgeräteprofil für Vision X.Fir/X.Gun.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Vision X.Fir/X.Gun."
        },
        "preset-151": {
            "displayName": "Volcano Lavatube",
            "description": "Ein reguliertes E-Zigaretten-Geräteprofil für Volcano Lavatube.",
            "summary": "Ein reguliertes E-Zigaretten-Geräteprofil für Volcano Lavatube."
        },
        "preset-152": {
            "displayName": "Volcano Lavatube v2.5",
            "description": "Ein reguliertes Dampfgeräteprofil für Volcano Lavatube v2.5.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Volcano Lavatube v2.5."
        },
        "preset-153": {
            "displayName": "Wismec Reuleaux RX200S (4.10)",
            "description": "Ein reguliertes Dampfgeräteprofil für Wismec Reuleaux RX200S (4.10).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Wismec Reuleaux RX200S (4.10)."
        },
        "preset-154": {
            "displayName": "YiHi SX130",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX130.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX130."
        },
        "preset-155": {
            "displayName": "YiHi SX130 v1.5",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX130 v1.5.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX130 v1.5."
        },
        "preset-156": {
            "displayName": "YiHi SX130H",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX130H.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX130H."
        },
        "preset-157": {
            "displayName": "YiHi SX220",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX220.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX220."
        },
        "preset-158": {
            "displayName": "YiHi SX300",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX300.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX300."
        },
        "preset-159": {
            "displayName": "YiHi SX330 V1 35W",
            "description": "Ein reguliertes E-Zigaretten-Geräteprofil für YiHi SX330 V1 35W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V1 35W."
        },
        "preset-160": {
            "displayName": "YiHi SX330 V2 50W",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V2 50W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V2 50W."
        },
        "preset-161": {
            "displayName": "YiHi SX330 V2C 70W",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V2C 70W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V2C 70W."
        },
        "preset-162": {
            "displayName": "YiHi SX330 V2 S 60W",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V2 S 60W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V2 S 60W."
        },
        "preset-163": {
            "displayName": "YiHi SX330 V3 100W",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V3 100W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V3 100W."
        },
        "preset-164": {
            "displayName": "YiHi SX330 V3 150W",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V3 150W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V3 150W."
        },
        "preset-165": {
            "displayName": "YiHi SX330 V3S 150W",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V3S 150W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V3S 150W."
        },
        "preset-166": {
            "displayName": "YiHi SX330-V3Si 200W",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX330-V3Si 200W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX330-V3Si 200W."
        },
        "preset-167": {
            "displayName": "YiHi SX330 V4S 100W",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V4S 100W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX330 V4S 100W."
        },
        "preset-168": {
            "displayName": "YiHi SX350 30W",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX350 30W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX350 30W."
        },
        "preset-169": {
            "displayName": "YiHi SX350 50W",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX350 50W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX350 50W."
        },
        "preset-170": {
            "displayName": "YiHi SX350 100W",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX350 100W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX350 100W."
        },
        "preset-171": {
            "displayName": "YiHi SX350J VJ mode",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX350J VJ mode.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX350J VJ mode."
        },
        "preset-172": {
            "displayName": "YiHi SX350J VW/single batt mode",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX350J VW/single batt mode.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX350J VW/single batt mode."
        },
        "preset-173": {
            "displayName": "YiHi SX350J VW/dual batt mode",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX350J VW/dual batt mode.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX350J VW/dual batt mode."
        },
        "preset-174": {
            "displayName": "YiHi SX470",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX470.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX470."
        },
        "preset-175": {
            "displayName": "YiHi SX450",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX450.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX450."
        },
        "preset-176": {
            "displayName": "YiHi SXMini",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SXMini.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SXMini."
        },
        "preset-177": {
            "displayName": "Beyond Vape Solara",
            "description": "Ein reguliertes Dampfgeräteprofil für Beyond Vape Solara.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Beyond Vape Solara."
        },
        "preset-178": {
            "displayName": "Cana Modz",
            "description": "Ein reguliertes Dampfgeräteprofil für Cana Modz.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Cana Modz."
        },
        "preset-179": {
            "displayName": "Craving Vapor HexOhm",
            "description": "Ein reguliertes Dampfgeräteprofil für Craving Vapor HexOhm.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Craving Vapor HexOhm."
        },
        "preset-180": {
            "displayName": "Craving Vapor HexOhm V2",
            "description": "Ein reguliertes E-Zigaretten-Geräteprofil für Craving Vapor HexOhm V2.",
            "summary": "Ein reguliertes E-Zigaretten-Geräteprofil für Craving Vapor HexOhm V2."
        },
        "preset-181": {
            "displayName": "Hana Modz V3",
            "description": "Ein reguliertes Dampfgeräteprofil für Hana Modz V3.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Hana Modz V3."
        },
        "preset-182": {
            "displayName": "Hana Modz DNA 40",
            "description": "Ein reguliertes Dampfgeräteprofil für Hana Modz DNA 40.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Hana Modz DNA 40."
        },
        "preset-183": {
            "displayName": "Lost Vape Therion DNA 75",
            "description": "Ein reguliertes Dampfgeräteprofil für Lost Vape Therion DNA 75.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Lost Vape Therion DNA 75."
        },
        "preset-184": {
            "displayName": "Lost Vape Therion DNA 133",
            "description": "Ein reguliertes Dampfgeräteprofil für Lost Vape Therion DNA 133.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Lost Vape Therion DNA 133."
        },
        "preset-185": {
            "displayName": "Lost Vape Therion DNA 166",
            "description": "Ein reguliertes Dampfgeräteprofil für Lost Vape Therion DNA 166.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Lost Vape Therion DNA 166."
        },
        "preset-186": {
            "displayName": "Notcigs Buzz Pro",
            "description": "Ein reguliertes E-Zigaretten-Geräteprofil für Notcigs Buzz Pro.",
            "summary": "Ein reguliertes E-Zigaretten-Geräteprofil für Notcigs Buzz Pro."
        },
        "preset-187": {
            "displayName": "Pioneer4You/Green Leaf Seven 22",
            "description": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf Seven 22.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf Seven 22."
        },
        "preset-188": {
            "displayName": "Pioneer4You/Green Leaf Seven 30W",
            "description": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf Seven 30W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf Seven 30W."
        },
        "preset-189": {
            "displayName": "Pioneer4You/Green Leaf IPV",
            "description": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV."
        },
        "preset-190": {
            "displayName": "Pioneer4You/Green Leaf IPV D2",
            "description": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV D2.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV D2."
        },
        "preset-191": {
            "displayName": "Pioneer4You/Green Leaf IPV Mini",
            "description": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV Mini.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV Mini."
        },
        "preset-192": {
            "displayName": "Pioneer4You/Green Leaf IPV Mini 2",
            "description": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV Mini 2.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV Mini 2."
        },
        "preset-193": {
            "displayName": "Pioneer4You/Green Leaf IPV V2",
            "description": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV V2.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV V2."
        },
        "preset-194": {
            "displayName": "Pioneer4You/Green Leaf IPV V2S",
            "description": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV V2S.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV V2S."
        },
        "preset-195": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 100W",
            "description": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV V3 100W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV V3 100W."
        },
        "preset-196": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 150W",
            "description": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV V3 150W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV V3 150W."
        },
        "preset-197": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 200W",
            "description": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV V3 200W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV V3 200W."
        },
        "preset-198": {
            "displayName": "Pioneer4You/Green Leaf IPV V4 100W",
            "description": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV V4 100W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Pioneer4You/Green Leaf IPV V4 100W."
        },
        "preset-199": {
            "displayName": "Protovapor XPV DNA-20D",
            "description": "Ein reguliertes Dampfgeräteprofil für Protovapor XPV DNA-20D.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Protovapor XPV DNA-20D."
        },
        "preset-200": {
            "displayName": "Protovapor XPV DNA-30D",
            "description": "Ein reguliertes Dampfgeräteprofil für Protovapor XPV DNA-30D.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Protovapor XPV DNA-30D."
        },
        "preset-201": {
            "displayName": "Protovapor XPV DNA-40D",
            "description": "Ein reguliertes Dampfgeräteprofil für Protovapor XPV DNA-40D.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Protovapor XPV DNA-40D."
        },
        "preset-202": {
            "displayName": "Raffmods Ranger",
            "description": "Ein reguliertes Dampfgeräteprofil für Raffmods Ranger.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Raffmods Ranger."
        },
        "preset-203": {
            "displayName": "Reo VV Grand/Woodvil",
            "description": "Ein reguliertes Dampfgeräteprofil für Reo VV Grand/Woodvil.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Reo VV Grand/Woodvil."
        },
        "preset-204": {
            "displayName": "Sigelei 30W",
            "description": "Ein reguliertes Dampfgeräteprofil für Sigelei 30W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sigelei 30W."
        },
        "preset-205": {
            "displayName": "Sigelei Raptor",
            "description": "Ein reguliertes Dampfgeräteprofil für Sigelei Raptor.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sigelei Raptor."
        },
        "preset-206": {
            "displayName": "Sigelei 100W",
            "description": "Ein reguliertes Dampfgeräteprofil für Sigelei 100W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sigelei 100W."
        },
        "preset-207": {
            "displayName": "Sigelei Mini",
            "description": "Ein reguliertes Dampfgeräteprofil für Sigelei Mini.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Sigelei Mini."
        },
        "preset-208": {
            "displayName": "SvoëMesto Semovar",
            "description": "Ein reguliertes Dampfgeräteprofil für SvoëMesto Semovar.",
            "summary": "Ein reguliertes Dampfgeräteprofil für SvoëMesto Semovar."
        },
        "preset-209": {
            "displayName": "Vapor Flask v1/v2 DNA 30",
            "description": "Ein reguliertes Dampfgeräteprofil für Vapor Flask v1/v2 DNA 30.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Vapor Flask v1/v2 DNA 30."
        },
        "preset-210": {
            "displayName": "Vapor Flask v2 DNA 40",
            "description": "Ein reguliertes Dampfgeräteprofil für Vapor Flask v2 DNA 40.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Vapor Flask v2 DNA 40."
        },
        "preset-211": {
            "displayName": "Vapor Shark DNA",
            "description": "Ein reguliertes Dampfgeräteprofil für Vapor Shark DNA.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Vapor Shark DNA."
        },
        "preset-212": {
            "displayName": "Vapor Shark DNA/rDNA 30",
            "description": "Ein reguliertes E-Zigaretten-Geräteprofil für Vapor Shark DNA/rDNA 30.",
            "summary": "Ein reguliertes E-Zigaretten-Geräteprofil für Vapor Shark DNA/rDNA 30."
        },
        "preset-213": {
            "displayName": "Vapor Shark rDNA 40",
            "description": "Ein reguliertes Dampfgeräteprofil für Vapor Shark rDNA 40.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Vapor Shark rDNA 40."
        },
        "preset-214": {
            "displayName": "Geekvape Aegis Legend 5",
            "description": "Ein reguliertes Dampfgeräteprofil für Geekvape Aegis Legend 5.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Geekvape Aegis Legend 5."
        },
        "preset-215": {
            "displayName": "Evolv DNA60C",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA60C.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA60C."
        },
        "preset-216": {
            "displayName": "Evolv DNA100C",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA100C.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA100C."
        },
        "preset-217": {
            "displayName": "Evolv DNA250C (2S)",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA250C (2S).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA250C (2S)."
        },
        "preset-218": {
            "displayName": "Evolv DNA250C (3S, US firmware)",
            "description": "Ein reguliertes E-Zigaretten-Geräteprofil für Evolv DNA250C (3S, US firmware).",
            "summary": "Ein reguliertes E-Zigaretten-Geräteprofil für Evolv DNA250C (3S, US firmware)."
        },
        "preset-219": {
            "displayName": "Evolv DNA250C (3S, international firmware)",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA250C (3S, international firmware).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA250C (3S, international firmware)."
        },
        "preset-220": {
            "displayName": "Evolv DNA250C (4S)",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA250C (4S).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA250C (4S)."
        },
        "preset-221": {
            "displayName": "VOOPOO DRAG 6",
            "description": "Ein reguliertes Dampfgeräteprofil für VOOPOO DRAG 6.",
            "summary": "Ein reguliertes Dampfgeräteprofil für VOOPOO DRAG 6."
        },
        "preset-222": {
            "displayName": "YiHi SXmini MQ Class",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SXmini MQ Class.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SXmini MQ Class."
        },
        "preset-223": {
            "displayName": "Evolv DNA80C",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA80C.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA80C."
        },
        "preset-224": {
            "displayName": "Evolv DNA75C",
            "description": "Ein reguliertes Dampfgeräteprofil für Evolv DNA75C.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Evolv DNA75C."
        },
        "preset-225": {
            "displayName": "YiHi SX600H",
            "description": "Ein reguliertes Dampfgeräteprofil für YiHi SX600H.",
            "summary": "Ein reguliertes Dampfgeräteprofil für YiHi SX600H."
        },
        "preset-226": {
            "displayName": "Craving Vapor HexOhm V3",
            "description": "Ein reguliertes Dampfgeräteprofil für Craving Vapor HexOhm V3.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Craving Vapor HexOhm V3."
        },
        "preset-227": {
            "displayName": "VOOPOO VINCI Spark220",
            "description": "Ein reguliertes Dampfgeräteprofil für VOOPOO VINCI Spark220.",
            "summary": "Ein reguliertes Dampfgeräteprofil für VOOPOO VINCI Spark220."
        },
        "preset-228": {
            "displayName": "Dovpo x TVC Topside Dual",
            "description": "Ein reguliertes Dampfgeräteprofil für Dovpo x TVC Topside Dual.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Dovpo x TVC Topside Dual."
        },
        "preset-229": {
            "displayName": "VOOPOO DRAG 5",
            "description": "Ein reguliertes Dampfgeräteprofil für VOOPOO DRAG 5.",
            "summary": "Ein reguliertes Dampfgeräteprofil für VOOPOO DRAG 5."
        },
        "preset-230": {
            "displayName": "Geekvape L200 Classic",
            "description": "Ein reguliertes Dampfgeräteprofil für Geekvape L200 Classic.",
            "summary": "Ein reguliertes Dampfgeräteprofil für Geekvape L200 Classic."
        },
        "preset-231": {
            "displayName": "VAPORESSO ARMOUR MAX",
            "description": "Dual-21700-geregelter Mod mit 18650-Adaptern; VAPORESSO bewertet es mit 220 W; Beim Test wurden 208 W, 8,979 V und 39 A gemessen.",
            "summary": "Dual-21700-geregelter Mod mit 18650-Adaptern; VAPORESSO bewertet es mit 220 W; Beim Test wurden 208 W, 8,979 V und 39 A gemessen."
        },
        "preset-232": {
            "displayName": "Geekvape Aegis Legend 2 (L200)",
            "description": "Ein reguliertes Dampfgeräteprofil für Geekvape Aegis Legend 2 (L200).",
            "summary": "Ein reguliertes Dampfgeräteprofil für Geekvape Aegis Legend 2 (L200)."
        },
        "preset-233": {
            "displayName": "ProVape ProVari Radius 40 W",
            "description": "Ein reguliertes Dampfgeräteprofil für ProVape ProVari Radius 40 W.",
            "summary": "Ein reguliertes Dampfgeräteprofil für ProVape ProVari Radius 40 W."
        },
        "preset-234": {
            "displayName": "VAPORESSO GEN MAX",
            "description": "Dual-18650 regulierter Mod; VAPORESSO bewertet es mit 220 W; Beim Test wurden 215 W, 9,08 V und 37 A gemessen.",
            "summary": "Dual-18650 regulierter Mod; VAPORESSO bewertet es mit 220 W; Beim Test wurden 215 W, 9,08 V und 37 A gemessen."
        },
        "preset-235": {
            "displayName": "VAPORESSO ARMOUR ULTRA",
            "description": "Eingebauter, batteriegeregelter Mod mit einer Leistung von 100 W; Beim Test wurden 101 W, 29 A und mindestens 7,97 V gemessen.",
            "summary": "Eingebauter, batteriegeregelter Mod mit einer Nennleistung von 100 W; Beim Test wurden 101 W, 29 A und mindestens 7,97 V gemessen."
        },
        "preset-236": {
            "displayName": "Geekvape Aegis Solo 3",
            "description": "Single-18650 regulierter Mod mit AS Chip 4.0; Das Herstellerprofil beträgt 100 W, 7,5 V, 32 A, 0,1–3 Ω.",
            "summary": "Single-18650 regulierter Mod mit AS Chip 4.0; Das Herstellerprofil beträgt 100 W, 7,5 V, 32 A, 0,1–3 Ω."
        },
        "preset-237": {
            "displayName": "Eleaf iStick Pico 21700",
            "description": "Einzelzellen-21700/18650-Adapter-Mod; Eleaf gibt 100 W, 9 V, 0,05–3,5 Ω an; Tests ergaben 30 A.",
            "summary": "Einzelzellen-21700/18650-Adapter-Mod; Eleaf gibt 100 W, 9 V, 0,05–3,5 Ω an; Tests ergaben 30 A."
        },
        "preset-238": {
            "displayName": "Vandy Vape Pulse V2",
            "description": "Einzelzelliger regulierter Squonk-Mod für 21700-, 20700- oder angepasste 18650-Zellen mit einem konservativen Profil von 95 W, 6 V, 34 A.",
            "summary": "Einzelzelliger regulierter Squonk-Mod für 21700-, 20700- oder angepasste 18650-Zellen mit einem konservativen Profil von 95 W, 6 V, 34 A."
        }
    }
};
