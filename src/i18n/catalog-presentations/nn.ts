/* Machine-materialized draft. Human review may edit string values. */

import type { CatalogPresentationSet } from "../catalog-presentations";
import { normalizeNynorsk } from "../nynorsk-normalization";

export const presentations: CatalogPresentationSet = normalizeNynorsk({
    "concepts": {
        "concept-ohms-law": {
            "displayName": "Ohms lov",
            "description": "Ohms lov knytter sammen spenning, straum og motstand i en elektrisk krets.",
            "summary": "Forholdet mellom spenning, straum og motstand.",
            "sections": [
                {
                    "id": "relationship",
                    "title": "Sammenhengen",
                    "paragraphs": [
                        "Den grunnleggende sammenhengen er nyttig når motstanden i en komponent er omtrent konstant."
                    ],
                    "formulas": [
                        {
                            "expression": "V = I × R"
                        }
                    ],
                    "bullets": [
                        "V er spenning, målt i volt (V).",
                        "I er straum, målt i ampere (A).",
                        "R er motstand, målt i ohm (Ω)."
                    ]
                },
                {
                    "id": "rearranged-formulas",
                    "title": "Omformede formler",
                    "paragraphs": [
                        "Bruk versjonen som setter verdien du vil finne på venstre side:"
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
                        "Når motstanden er uendret, øker strømmen når spenningen øker.",
                        "Når spenningen er uendret, synker strømmen når motstanden øker.",
                        "En motstand på null Ω er en ideell kortslutning og må behandles separat."
                    ]
                },
                {
                    "id": "worked-examples",
                    "title": "Regneeksempler",
                    "examples": [
                        {
                            "title": "Finn strømmen",
                            "setup": "En kilde på 4,2 V er koblet til en belastning på 1,0 Ω.",
                            "formulas": [
                                "I = 4.2 V / 1.0 Ω = 4.2 A"
                            ],
                            "conclusion": "Strømmen i belastningen er 4,2 A."
                        },
                        {
                            "title": "Finn motstanden",
                            "setup": "En krets har 12 V over seg og trekker 2 A.",
                            "formulas": [
                                "R = 12 V / 2 A = 6 Ω"
                            ],
                            "conclusion": "Motstanden i kretsen er 6 Ω."
                        },
                        {
                            "title": "Finn spenningen",
                            "setup": "En straum på 0,5 A går gjennom en motstand på 10 Ω.",
                            "formulas": [
                                "V = 0.5 A × 10 Ω = 5 V"
                            ],
                            "conclusion": "Spenningen er 5 V."
                        }
                    ]
                },
                {
                    "id": "electrical-power",
                    "title": "Elektrisk effekt",
                    "formulas": [
                        {
                            "expression": "P = V × I = I^2 × R = V^2 / R"
                        }
                    ],
                    "paragraphs": [
                        "Ohms lov kombineres med sammenhengen for effekt, P = V × I. Effekt P måles i watt (W). For en kilde på 4,2 V og en belastning på 1,0 Ω er den ideelle effekten 17,64 W. Komponenten må ha tilstrekkelig varmekapasitet og reserve til å lede bort varmen som oppstår, på en trygg måte."
                    ]
                },
                {
                    "id": "unit-conversions",
                    "title": "Enhetsomregning",
                    "paragraphs": [
                        "Hold enhetene konsistente før du regner:"
                    ],
                    "bullets": [
                        "1 kΩ = 1 000 Ω",
                        "1 MΩ = 1 000 000 Ω",
                        "1 mA = 0,001 A",
                        "1 W = 1 000 mW"
                    ]
                },
                {
                    "id": "limits",
                    "title": "Modellens begrensninger",
                    "paragraphs": [
                        "Ohms lov er en idealisert modell. Virkelige komponenter kan være ikkje-ohmske: Motstanden kan endre seg med temperatur, spenning, straum, frekvens eller driftstilstand. For serie- og parallellkretser bruker du Kirchhoffs lover sammen med Ohms lov."
                    ]
                }
            ],
            "wikipediaUrl": "https://nb.wikipedia.org/wiki/Ohms_lov"
        },
        "concept-joule-heating": {
            "displayName": "Joule-oppvarming",
            "description": "Joule-oppvarming beskriver hvordan elektrisk energi blir til varme når straum går gjennom motstand.",
            "summary": "Korleis elektrisk straum omdannar motstand til varme.",
            "sections": [
                {
                    "id": "heating-power",
                    "title": "Oppvarmingseffekt",
                    "paragraphs": [
                        "Den elektriske oppvarmingseffekten er:"
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
                        "P er effekt i watt (W).",
                        "V er spenning i volt (V).",
                        "I er straum i ampere (A)."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Regneeksempel",
                    "examples": [
                        {
                            "title": "En resistiv belastning",
                            "setup": "En spole på 0,8 Ω fører 3 A.",
                            "formulas": [
                                "P = I^2 × R = 3^2 × 0,8 = 7,2 W",
                                "E = P × t = 7,2 W × 10 s = 72 J"
                            ],
                            "conclusion": "Spolen omdanner energi til varme med 7,2 joule per sekund, eller 72 J på 10 sekunder."
                        }
                    ]
                },
                {
                    "id": "what-affects-heating",
                    "title": "Hva påverkar oppvarmingen",
                    "bullets": [
                        "Ved konstant motstand gir en dobling av strømmen fire ganger så stor oppvarmingseffekt.",
                        "Ved konstant straum dobler en dobling av motstanden oppvarmingseffekten.",
                        "Ved konstant spenning øker oppvarmingseffekten når motstanden reduseres.",
                        "Varmeoverføring til luft, væske og maskinvare bestemmer den faktiske temperaturen."
                    ],
                    "paragraphs": [
                        "Elektrisk effekt er en energioverføringsrate, ikkje en temperatur. Varmekapasitet og varmestrøm bestemmer hvordan energien endrer temperaturen, og hvor raskt den forlater overflaten."
                    ]
                },
                {
                    "id": "practical-checks",
                    "title": "Praktiske kontroller",
                    "paragraphs": [
                        "Kontroller at komponenter, tilkoblinger og isolasjon tåler forventet straum og effekt. Legg inn tilstrekkelig margin fordi virkelige komponenter kan varmes opp ujevnt, og motstanden kan endres med temperaturen. Batterier og strømforsyninger har også grenser for kontinuerlig straum."
                    ]
                }
            ],
            "wikipediaUrl": "https://nb.wikipedia.org/wiki/Jouleoppvarming"
        },
        "concept-kirchhoffs-laws": {
            "displayName": "Kirchhoffs lover",
            "description": "Kirchhoffs straum- og spenningslover beskriver bevaring i kretsknutepunkter og lukkede sløyfer.",
            "summary": "Korleis straum og spenning oppfører seg i samankopla krinsar.",
            "sections": [
                {
                    "id": "circuit-terms",
                    "title": "Kretstermer",
                    "paragraphs": [
                        "De grunnleggende termene gjør det enklere å tolke et kretsskjema:"
                    ],
                    "bullets": [
                        "En node er et sett ledere som er koblet sammen utan en komponent mellom dem.",
                        "En gren er en strømvei mellom to noder.",
                        "En sløyfe er en lukket vei som kommer tilbake til utgangspunktet.",
                        "En seriekobling gir strømmen berre én vei gjennom komponentene.",
                        "En parallellkobling kobler grener til de samme to nodene."
                    ]
                },
                {
                    "id": "current-law",
                    "title": "Kirchhoffs strømlov",
                    "formulas": [
                        {
                            "expression": "Σ I = 0"
                        },
                        {
                            "expression": "Σ I_in = Σ I_out"
                        }
                    ],
                    "paragraphs": [
                        "Viss 8 A går inn i en node og én gren fører 3 A ut, må de resterende grenene føre til sammen 5 A ut. Vel strømretninger før du regner; et negativt resultat betyr at den virkelige strømmen går motsatt vei av den antatte retningen."
                    ]
                },
                {
                    "id": "series-and-parallel",
                    "title": "Serie- og parallellkretser",
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
                            "title": "Seriekoblede motstander",
                            "setup": "To motstander på 0,20 Ω i serie kobles til 8,0 V.",
                            "formulas": [
                                "R_total = 0,40 Ω",
                                "I = 8,0 V / 0,40 Ω = 20 A"
                            ],
                            "conclusion": "Den samme strømmen på 20 A går gjennom begge motstandene."
                        },
                        {
                            "title": "Parallellkoblede motstander",
                            "setup": "To like grener på 0,40 Ω kobles til 4,0 V.",
                            "formulas": [
                                "R_total = 0,20 Ω",
                                "I_total = 4,0 V / 0,20 Ω = 20 A"
                            ],
                            "conclusion": "Når grenmotstandene er like, fører hver gren 10 A."
                        }
                    ]
                },
                {
                    "id": "voltage-law",
                    "title": "Kirchhoffs spenningslov",
                    "formulas": [
                        {
                            "expression": "Σ V = 0"
                        },
                        {
                            "expression": "+8.0 V - V_1 - V_2 = 0"
                        },
                        {
                            "expression": "V_total = V_1 = V_2 = ... (parallellgrener)"
                        }
                    ],
                    "paragraphs": [
                        "Den algebraiske summen av spenningsøkninger og spenningsfall rundt en lukket sløyfe er null. Vel én sløyferetning og hold polaritetene konsekvente. Viss du snur retningen, endres fortegnene, ikkje den fysiske løsningen. En større seriemotstand får et større spenningsfall fordi den samme strømmen går gjennom alle seriekoblede komponenter."
                    ]
                },
                {
                    "id": "cells",
                    "title": "Celler i serie og parallell",
                    "formulas": [
                        {
                            "expression": "V_pack = V_1 + V_2 + ... (serie)"
                        },
                        {
                            "expression": "C_pack = C_1 + C_2 + ... (parallell)"
                        }
                    ],
                    "bullets": [
                        "Seriekoblede celler legger sammen spenningen, mens kapasiteten i amperetimer tilsvarer én lik celle.",
                        "Parallellkoblede celler beholder samme spenning, mens kapasitet og tilgjengelig straum omtrent summeres.",
                        "Strømfordelingen avhenger av indre motstand, kontakter, ledninger og brytere.",
                        "Seriekoblede litiumioneceller krever overvåking på cellenivå og egnet balansering eller beskyttelse."
                    ]
                },
                {
                    "id": "solving-and-limits",
                    "title": "Løsning av virkelige kretser",
                    "bullets": [
                        "Merk nodenes spenninger, grenstrømmer og antatte strømretninger.",
                        "Bruk KCL i uavhengige noder og KVL rundt uavhengige sløyfer.",
                        "Knytt spenning og straum i motstander sammen med V = I × R.",
                        "Løs de samtidige ligningene og kontroller effektbalansen."
                    ],
                    "paragraphs": [
                        "En forenklet modell kan utelate cellens indre motstand, kontaktmotstand, omformerens virkningsgrad, temperatureffekter, transient oppførsel, beskyttelseskretser og komponenttoleranser. Ta med all utelatt oppførsel som påverkar en sterkstrømskrets vesentlig."
                    ]
                }
            ],
            "wikipediaUrl": "https://nb.wikipedia.org/wiki/Kirchhoffs_lover"
        },
        "concept-temperature-coefficient-of-resistance": {
            "displayName": "Temperaturkoeffisient for motstand (TCR)",
            "description": "Temperaturkoeffisienten beskriver hvordan en leders motstand endrer seg med temperaturen.",
            "summary": "Korleis temperatur endrar motstanden i ein leiar.",
            "sections": [
                {
                    "id": "linear-model",
                    "title": "Den lineære modellen",
                    "paragraphs": [
                        "Ved en liten eller moderat temperaturendring bruker vi dette førsteordensforholdet:"
                    ],
                    "formulas": [
                        {
                            "expression": "R_T = R_0 [1 + α (T - T_0)]"
                        }
                    ],
                    "bullets": [
                        "R_0 er motstanden ved referansetemperaturen T_0.",
                        "R_T er den estimerte motstanden ved temperaturen T.",
                        "α er materialets temperaturkoeffisient, uttrykt i 1/°C eller ppm/°C.",
                        "Temperaturene må bruke samme skala og einingar for differansen T - T_0."
                    ]
                },
                {
                    "id": "positive-and-negative",
                    "title": "Positiv og negativ TCR",
                    "bullets": [
                        "En positiv TCR betyr at motstanden øker når temperaturen stiger; mange metaller oppfører seg slik.",
                        "En negativ TCR betyr at motstanden synker når temperaturen stiger.",
                        "En TCR nær null betyr at motstanden endrer seg lite innenfor det angitte området.",
                        "Fortegnet til koeffisienten er viktig; viss en negativ verdi erstattes med absoluttverdien, snus forutsigelsen."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Regneeksempel",
                    "examples": [
                        {
                            "title": "En oppvarmet motstand",
                            "setup": "En motstand på 1,00 Ω er spesifisert ved 20 °C, med en TCR på 400 ppm/°C.",
                            "formulas": [
                                "α = 400 × 10^-6 / °C = 0,0004 / °C",
                                "ΔT = 100 - 20 = 80 °C",
                                "R_T = 1,00 [1 + 0,0004 × 80] = 1,032 Ω"
                            ],
                            "conclusion": "Den estimerte motstanden er 1,032 Ω, omtrent 3,2 % høgare enn verdien ved 20 °C."
                        }
                    ]
                },
                {
                    "id": "power-and-limits",
                    "title": "TCR, effekt og praktiske begrensninger",
                    "formulas": [
                        {
                            "expression": "I = V / R"
                        },
                        {
                            "expression": "P = V^2 / R = I^2 × R"
                        }
                    ],
                    "paragraphs": [
                        "For en motstand med positiv TCR som drives med konstant spenning, øker motstanden når temperaturen stiger, og strømmen har en tendens til å synke. For en konstantstrømkilde øker effekten når den samme motstanden øker.",
                        "Produsentens TCR gjelder normalt for et angitt temperatur- og motstandsområde. Temperaturgradienter, materialendringer, kontakter, mekanisk belastning og selvoppvarming kan gjøre at et virkelig resultat avviker fra førsteordensestimatet."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Temperature_coefficient_of_resistance"
        },
        "concept-trigonometry": {
            "displayName": "Trigonometri",
            "description": "Trigonometri knytter sammen vinkler, lengder og forhold i geometriske modeller.",
            "summary": "Vinkler, lengder og nyttige geometriske forhold.",
            "sections": [
                {
                    "id": "right-triangles",
                    "title": "Rettvinklede trekanter",
                    "paragraphs": [
                        "Relativt til en vinkel θ ligger den motstående siden på andre siden av vinkelen, den hosliggende siden berører vinkelen utan å være hypotenusen, og hypotenusen ligger mot den rette vinkelen. SOH-CAH-TOA er en huskeregel: sinus er motstående side delt på hypotenusen, cosinus er hosliggende side delt på hypotenusen, og tangens er motstående side delt på hosliggende side."
                    ],
                    "formulas": [
                        {
                            "expression": "sin(θ) = motstående / hypotenuse"
                        },
                        {
                            "expression": "cos(θ) = hosliggende / hypotenuse"
                        },
                        {
                            "expression": "tan(θ) = motstående / hosliggende"
                        }
                    ]
                },
                {
                    "id": "finding-sides-and-angles",
                    "title": "Finn ukjente sider og vinkler",
                    "examples": [
                        {
                            "title": "Finn en side",
                            "setup": "En hypotenus på 10 cm danner en vinkel på 30°.",
                            "formulas": [
                                "motstående = 10 × sin(30°) = 5 cm",
                                "hosliggende = 10 × cos(30°) ≈ 8,66 cm"
                            ],
                            "conclusion": "Bruk en invers trigonometrisk funksjon når sidelengdene er kjente."
                        }
                    ],
                    "formulas": [
                        {
                            "expression": "θ = sin^-1(motstående / hypotenuse)"
                        },
                        {
                            "expression": "θ = cos^-1(hosliggende / hypotenuse)"
                        },
                        {
                            "expression": "θ = tan^-1(motstående / hosliggende)"
                        }
                    ]
                },
                {
                    "id": "degrees-and-radians",
                    "title": "Grader og radianer",
                    "formulas": [
                        {
                            "expression": "180° = π radians"
                        },
                        {
                            "expression": "θ_rad = θ_deg × π / 180"
                        }
                    ],
                    "paragraphs": [
                        "En kalkulator må være i riktig vinkelmodus. Viss gradmodus brukes for en verdi i radianer, eller omvendt, får du et annet resultat. En hel sirkel er 360° eller 2π radianer."
                    ]
                },
                {
                    "id": "waveforms-and-identities",
                    "title": "Bølgeformer og nyttige identiteter",
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
                        "A er amplitude, f er frekvens i hertz, t er tid i sekunder, og φ er fasevinkel.",
                        "Vinkelfrekvensen ω måles i radianer per sekund.",
                        "Behold fortegn og kvadrant når retning eller fase er viktig."
                    ]
                }
            ],
            "wikipediaUrl": "https://nb.wikipedia.org/wiki/Trigonometri"
        },
        "concept-heat-capacity": {
            "displayName": "Varmekapasitet",
            "description": "Varmekapasitet beskriver hvor mye energi som trengs for å endre temperaturen til et objekt.",
            "summary": "Korleis masse og materiale påverkar temperaturendring.",
            "sections": [
                {
                    "id": "basic-relationships",
                    "title": "Grunnleggende sammenhenger",
                    "formulas": [
                        {
                            "expression": "C = Q / ΔT"
                        },
                        {
                            "expression": "Q = m × c × ΔT"
                        }
                    ],
                    "bullets": [
                        "C er varmekapasitet i J/K eller J/°C.",
                        "Q er overført varmeenergi i joule (J).",
                        "m er masse i kilogram, og c er spesifikk varmekapasitet i J/(kg·K).",
                        "En temperaturforskjell på 1 K er like stor som en forskjell på 1 °C."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Regneeksempel",
                    "examples": [
                        {
                            "title": "Oppvarming av vann",
                            "setup": "Varm opp 0,20 kg vann fra 20 °C til 70 °C med c = 4 180 J/(kg·K).",
                            "formulas": [
                                "ΔT = 70 - 20 = 50 °C",
                                "Q = 0,20 × 4 180 × 50 = 41 800 J"
                            ],
                            "conclusion": "Det ideelle energibehovet er 41,8 kJ; en virkelig varmeovn trenger mer på grunn av tap."
                        }
                    ]
                },
                {
                    "id": "electrical-heating",
                    "title": "Oppvarming med elektrisk effekt",
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
                            "title": "Ideell oppvarmingstid",
                            "setup": "Varm opp eksempelet på 41,8 kJ med en konstant kilde på 100 W utan tap.",
                            "formulas": [
                                "t = 41 800 J / 100 W = 418 s"
                            ],
                            "conclusion": "Den ideelle tiden er omtrent 7,0 minutter; ved 80 % overføringseffektivitet er den omtrent 523 sekunder."
                        }
                    ]
                },
                {
                    "id": "object-and-material",
                    "title": "Objekt kontra materiale",
                    "paragraphs": [
                        "Varmekapasiteten gjelder hele objektet og avhenger av hvor mye materiale som er til stede. Spesifikk varmekapasitet er en materialegenskap. Dobling av massen dobler varmekapasiteten for samme materiale."
                    ],
                    "formulas": [
                        {
                            "expression": "C_total = Σ m_i × c_i"
                        }
                    ]
                },
                {
                    "id": "phase-changes-and-limits",
                    "title": "Faseendringer og praktiske begrensninger",
                    "formulas": [
                        {
                            "expression": "Q = m × L"
                        }
                    ],
                    "paragraphs": [
                        "Under smelting eller koking kan tilført energi endre materialets fase utan å endre temperaturen. L er spesifikk latent varme i J/kg.",
                        "Den enkle ligningen antar at den spesifikke varmekapasiteten er omtrent konstant. Varmetap, konveksjon, stråling, fordamping, kontaktmotstand og ujevn temperatur kan gjøre at et virkelig resultat avviker fra det ideelle."
                    ]
                }
            ],
            "wikipediaUrl": "https://nb.wikipedia.org/wiki/Varmekapasitet"
        },
        "concept-heat-flux": {
            "displayName": "Varmestrøm",
            "description": "Varmestrøm beskriver hvor raskt varmeenergi passerer gjennom eller fra en overflate.",
            "summary": "Kor raskt varmeenergi blir overført gjennom ei overflate.",
            "sections": [
                {
                    "id": "definition",
                    "title": "Definisjon",
                    "formulas": [
                        {
                            "expression": "q'' = Q_dot / A"
                        }
                    ],
                    "bullets": [
                        "q'' er varmestrømstetthet i W/m².",
                        "Q_dot er samlet varmeoverføringsrate i watt (W).",
                        "A er arealet som varmen overføres gjennom, i kvadratmeter (m²)."
                    ],
                    "paragraphs": [
                        "Varmestrøm er forskjellig fra varmekapasitet: Varmekapasitet beskriver lagret energi per temperaturendring, mens varmestrøm beskriver hvor raskt varme passerer gjennom en overflate."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Regneeksempel",
                    "examples": [
                        {
                            "title": "Gjennomsnittlig varmestrømstetthet fra en varmeovn",
                            "setup": "En varmeovn på 100 W overfører varme gjennom et areal på 0,020 m².",
                            "formulas": [
                                "q'' = 100 W / 0,020 m² = 5 000 W/m²"
                            ],
                            "conclusion": "Den gjennomsnittlige varmestrømstettheten er 5 000 W/m², eller 0,5 W/cm²."
                        }
                    ]
                },
                {
                    "id": "conduction",
                    "title": "Ledning gjennom et flatt lag",
                    "formulas": [
                        {
                            "expression": "q'' = -k × ΔT / L"
                        },
                        {
                            "expression": "Q_dot = k × A × (T_hot - T_cold) / L"
                        }
                    ],
                    "bullets": [
                        "k er varmeledningsevne i W/(m·K).",
                        "ΔT er temperaturforskjellen over laget.",
                        "L er lagets tykkelse i meter.",
                        "Minustegnet angir strømning fra høgare temperatur mot lågare temperatur."
                    ]
                },
                {
                    "id": "convection-and-radiation",
                    "title": "Konveksjon og stråling",
                    "formulas": [
                        {
                            "expression": "q'' = h × (T_s - T_∞)"
                        },
                        {
                            "expression": "q'' = ε × σ × (T_s^4 - T_sur^4)"
                        }
                    ],
                    "paragraphs": [
                        "Konveksjon bruker en overflatekoeffisient h. Stråling bruker emissivitet ε og Stefan–Boltzmanns konstant σ; temperaturene i strålingsligningen må være absolutte temperaturer i kelvin."
                    ]
                },
                {
                    "id": "practical-checks",
                    "title": "Praktiske kontroller",
                    "bullets": [
                        "Konverter arealet til m² før du bruker W/m².",
                        "Skill mellom gjennomsnittlig varmestrømstetthet og en lokal topp; oppvarmingen kan være ujevn.",
                        "Ta med kontaktmotstand, konveksjon, stråling og varmetap når det er nødvendig.",
                        "Varmestrøm er en overføringsrate, ikkje en temperatur; bruk varmekapasitet for temperaturendring."
                    ]
                }
            ],
            "wikipediaUrl": "https://nb.wikipedia.org/wiki/Varmefluks"
        },
        "concept-si-system-and-imperial-units": {
            "displayName": "SI-systemet og britiske måleenheter",
            "description": "SI-systemet gir et sammenhengende grunnlag for einingar og omregning mellom måleverdier.",
            "summary": "SI-einingar, prefiks og praktiske omrekningar.",
            "sections": [
                {
                    "id": "base-units",
                    "title": "Vanlege SI-einingar",
                    "table": {
                        "headers": [
                            "Storleik",
                            "SI-eining",
                            "Symbol"
                        ],
                        "rows": [
                            [
                                "Lengd",
                                "meter",
                                "m"
                            ],
                            [
                                "Masse",
                                "kilogram",
                                "kg"
                            ],
                            [
                                "Tid",
                                "sekund",
                                "s"
                            ],
                            [
                                "Temperatur",
                                "kelvin",
                                "K"
                            ],
                            [
                                "Elektrisk straum",
                                "ampere",
                                "A"
                            ],
                            [
                                "Stoffmengde",
                                "mol",
                                "mol"
                            ],
                            [
                                "Lysstyrke",
                                "candela",
                                "cd"
                            ]
                        ]
                    },
                    "bullets": [
                        "Spenning: volt (V).",
                        "Motstand: ohm (Ω).",
                        "Effekt: watt (W).",
                        "Energi: joule (J).",
                        "Kraft: newton (N).",
                        "Trykk: pascal (Pa).",
                        "Frekvens: hertz (Hz)."
                    ]
                },
                {
                    "id": "decimal-prefixes",
                    "title": "Desimalprefikser",
                    "table": {
                        "headers": [
                            "Prefiks",
                            "Symbol",
                            "Faktor"
                        ],
                        "rows": [
                            [
                                "kilo",
                                "k",
                                "1 000 = 10^3"
                            ],
                            [
                                "mega",
                                "M",
                                "1 000 000 = 10^6"
                            ],
                            [
                                "milli",
                                "m",
                                "0,001 = 10^-3"
                            ],
                            [
                                "mikro",
                                "μ",
                                "0,000001 = 10^-6"
                            ],
                            [
                                "nano",
                                "n",
                                "0,000000001 = 10^-9"
                            ]
                        ]
                    },
                    "paragraphs": [
                        "For eksempel er 2,2 kΩ lik 2 200 Ω, og 15 mA er lik 0,015 A. Konverter verdier til kompatible einingar før du bruker en formel."
                    ]
                },
                {
                    "id": "length-conversions",
                    "title": "Tommer og metrisk lengd",
                    "formulas": [
                        {
                            "expression": "1 tomme = 25,4 mm = 0,0254 m"
                        },
                        {
                            "expression": "1 fot = 12 tommer = 0,3048 m"
                        },
                        {
                            "expression": "1 yard = 3 fot = 0,9144 m"
                        },
                        {
                            "expression": "1 in² = 645.16 mm²"
                        }
                    ],
                    "examples": [
                        {
                            "title": "Konverter lengd",
                            "setup": "Konverter 0,1 tomme til millimeter og 5 mm til tommer.",
                            "formulas": [
                                "0,1 tomme × 25,4 = 2,54 mm",
                                "5 mm / 25,4 ≈ 0,19685 tomme"
                            ],
                            "conclusion": "Areal- og volumomregning bruker lengdefaktoren opphøyd i den relevante potensen."
                        }
                    ]
                },
                {
                    "id": "other-conversions",
                    "title": "Andre vanlege omregninger",
                    "bullets": [
                        "1 lb ≈ 0,45359237 kg.",
                        "1 lbf ≈ 4,44822 N.",
                        "1 psi ≈ 6 894,76 Pa.",
                        "°F = °C × 9/5 + 32.",
                        "°C = (°F - 32) × 5/9.",
                        "K = °C + 273,15."
                    ],
                    "paragraphs": [
                        "En pound kan vise til masse (lb) eller kraft (lbf), som er ulike størrelser. På samme måte måler tommer, kvadrattommer og kubikktommer ulike dimensjoner."
                    ]
                },
                {
                    "id": "unit-checks",
                    "title": "Praktiske enhetskontroller",
                    "bullets": [
                        "Skriv enheten ved siden av hver verdi mens du regner.",
                        "Kontroller at begge sider av en ligning har kompatible dimensjoner.",
                        "Konverter før du multipliserer eller dividerer.",
                        "Avrund først til slutt, slik at mellomresultatene beholder nyttig presisjon."
                    ]
                }
            ],
            "wikipediaUrl": "https://nb.wikipedia.org/wiki/SI-systemet"
        },
        "concept-wire-gauges-awg-swg-bwg": {
            "displayName": "Tråddimensjoner: AWG, SWG og BWG",
            "description": "Tråddimensjonssystemer beskriver diameter og areal på ulike måter.",
            "summary": "Korleis AWG, SWG og BWG skildrar tråddimensjonar.",
            "sections": [
                {
                    "id": "gauge-systems",
                    "title": "Dimensjonssystemer",
                    "bullets": [
                        "AWG er American Wire Gauge, også historisk kjent som Brown & Sharpe gauge.",
                        "SWG er Standard Wire Gauge, det historiske britiske systemet for tråd- og platetykkelse.",
                        "BWG er Birmingham Wire Gauge, historisk brukt for jerntråd, rør og platetykkelse.",
                        "Et høgare vanlig dimensjonstall betyr generelt mindre diameter; størrelser over dimensjon 0 bruker 00, 000 eller 0000."
                    ],
                    "paragraphs": [
                        "SWG og BWG er tabellerte systemer og skal ikkje beregnes med AWG-formelen. Det samme tallet angir derfor ikkje samme diameter på tvers av systemene."
                    ]
                },
                {
                    "id": "awg-formula",
                    "title": "AWG-diameter og areal",
                    "formulas": [
                        {
                            "expression": "d_inch = 0.005 × 92^((36 - n) / 39)"
                        },
                        {
                            "expression": "d_mm = 0.127 × 92^((36 - n) / 39)"
                        },
                        {
                            "expression": "A = π × d^2 / 4"
                        }
                    ],
                    "paragraphs": [
                        "For 1/0, 2/0, 3/0 og 4/0 bruker du n = 0, -1, -2 og -3. AWG bestemmer lederstørrelsen, ikkje en universell trygg straum; strømføringsevnen avhenger også av materiale, isolasjon, kjøling, installasjon og gjeldende elektriske regler."
                    ]
                },
                {
                    "id": "system-comparison",
                    "title": "Hvorfor systemnavnet er viktig",
                    "table": {
                        "headers": [
                            "Dimensjon",
                            "AWG",
                            "Britisk SWG",
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
                        "Disse verdiene er nominelle. Produkttoleranser, belegg, isolasjon og flertrådet oppbygning kan endre målt eller samlet diameter."
                    ]
                },
                {
                    "id": "resistance",
                    "title": "Dimensjon, areal og motstand",
                    "formulas": [
                        {
                            "expression": "R = ρ × L / A"
                        }
                    ],
                    "paragraphs": [
                        "Motstanden avhenger av lederens lengd L, tverrsnittsareal A og materialets resistivitet ρ. Fordi arealet varierer med kvadratet av diameteren, kan en moderat forskjell i diameter gi en betydelig forskjell i motstand. I AWG halverer en økning på omtrent tre dimensjoner arealet og dobler motstanden per lengdeenhet for samme materiale og temperatur."
                    ]
                },
                {
                    "id": "practical-specification",
                    "title": "Praktisk spesifikasjon",
                    "bullets": [
                        "Oppgi systemet, for eksempel 24 AWG eller 24 British SWG.",
                        "Ta med nominell diameter i millimeter når systemene kan forveksles.",
                        "Oppgi om dimensjonen gjelder bar leder, isolert diameter, platetykkelse eller rørveggens tykkelse.",
                        "For flertrådede ledere må du oppgi trådkonstruksjonen når fleksibilitet og samlet diameter er viktig.",
                        "Finn strømkapasiteten i produktdata og elektriske regler, ikkje ut fra dimensjonstallet alene."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Wire_gauge"
        }
    },
    "materials": {
        "ka1": {
            "displayName": "Kanthal A1 / APM",
            "description": "Katalogprofil for Kanthal A1 / APM, med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Kanthal A1 / APM.",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "ka": {
            "displayName": "Kanthal A / AE / AF",
            "description": "Katalogprofil for Kanthal A / AE / AF, med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Kanthal A / AE / AF.",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "kd": {
            "displayName": "Kanthal D",
            "description": "Katalogprofil for Kanthal D, med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Kanthal D.",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "n20": {
            "displayName": "Nichrome N20",
            "description": "Katalogprofil for Nichrome N20, med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Nichrome N20.",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "n40": {
            "displayName": "Nichrome N40",
            "description": "Katalogprofil for Nichrome N40, med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Nichrome N40.",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "n60": {
            "displayName": "Nichrome N60 (C)",
            "description": "Katalogprofil for Nichrome N60 (C), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Nichrome N60 (C).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "n70": {
            "displayName": "Nichrome N70 (B)",
            "description": "Katalogprofil for Nichrome N70 (B), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Nichrome N70 (B).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "n80": {
            "displayName": "Nichrome N80 (A)",
            "description": "Katalogprofil for Nichrome N80 (A), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Nichrome N80 (A).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "ss304": {
            "displayName": "SS 304",
            "description": "Katalogprofil for SS 304, med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: SS 304.",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "ss316": {
            "displayName": "SS 316",
            "description": "Katalogprofil for SS 316, med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: SS 316.",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "ss316l": {
            "displayName": "SS 316L / Elite",
            "description": "Katalogprofil for SS 316L / Elite, med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: SS 316L / Elite.",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "ss317l": {
            "displayName": "SS 317L / Haywire",
            "description": "Katalogprofil for SS 317L / Haywire, med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: SS 317L / Haywire.",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "ss430": {
            "displayName": "SS 430",
            "description": "Katalogprofil for SS 430, med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: SS 430.",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "ti1": {
            "displayName": "Titan 1",
            "description": "Katalogprofil for Titan 1, med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Titan 1.",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "ti2": {
            "displayName": "Titan 2 (R50400)",
            "description": "Katalogprofil for Titan 2 (R50400), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Titan 2 (R50400).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "tie": {
            "displayName": "Titanium ready (e-SG)",
            "description": "Katalogprofil for Titanium ready (e-SG), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Titanium ready (e-SG).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "w": {
            "displayName": "Wolfram",
            "description": "Katalogprofil for Wolfram, med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Wolfram.",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "nio": {
            "displayName": "Niobiumlegering",
            "description": "Katalogprofil for Niobiumlegering, med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Niobiumlegering.",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "ni200": {
            "displayName": "Nikkel 200 / Ni200 (UNS N02200)",
            "description": "Katalogprofil for Nikkel 200 / Ni200 (UNS N02200), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Nikkel 200 / Ni200 (UNS N02200).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "nife30": {
            "displayName": "NiFe30 (Resistherm - TFR)",
            "description": "Katalogprofil for NiFe30 (Resistherm - TFR), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: NiFe30 (Resistherm - TFR).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "dicodes": {
            "displayName": "NiFe30 (Resistherm - TCR)",
            "description": "Katalogprofil for NiFe30 (Resistherm - TCR), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: NiFe30 (Resistherm - TCR).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "reactor": {
            "displayName": "NiFe (Reactor Wire)",
            "description": "Katalogprofil for NiFe (Reactor Wire), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: NiFe (Reactor Wire).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "nife30stealth": {
            "displayName": "NiFe30 (StealthVape)",
            "description": "Katalogprofil for NiFe30 (StealthVape), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: NiFe30 (StealthVape).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "nft70": {
            "displayName": "Nifethal 70 (Alloy120)",
            "description": "Katalogprofil for Nifethal 70 (Alloy120), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Nifethal 70 (Alloy120).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "nft52": {
            "displayName": "Nifethal 52 (Alloy52)",
            "description": "Katalogprofil for Nifethal 52 (Alloy52), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Nifethal 52 (Alloy52).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "zr": {
            "displayName": "Zirkonium (rent)",
            "description": "Katalogprofil for Zirkonium (rent), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Zirkonium (rent).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "n90": {
            "displayName": "Nichrome N90 (Ni90Cr10)",
            "description": "Katalogprofil for Nichrome N90 (Ni90Cr10), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: Nichrome N90 (Ni90Cr10).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        },
        "ss904l": {
            "displayName": "SS 904L (UNS N08904)",
            "description": "Katalogprofil for SS 904L (UNS N08904), med data for motstandstråd og temperaturkontroll.",
            "summary": "Eit katalogmateriale for motstandstråd og temperaturkontroll: SS 904L (UNS N08904).",
            "safetyText": "Bruk ein verifisert materialprofil, og følg temperatur- og driftsgrensene til eininga."
        }
    },
    "batteries": {
        "battery-1": {
            "displayName": "AW IMR 14500",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-2": {
            "displayName": "AW IMR 14500",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-3": {
            "displayName": "AW IMR 16340",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-4": {
            "displayName": "AW IMR 18350",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-5": {
            "displayName": "AW IMR 18350",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-6": {
            "displayName": "AW IMR 18490",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-7": {
            "displayName": "AW IMR 18490",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-8": {
            "displayName": "AW IMR 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-9": {
            "displayName": "AW IMR 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-10": {
            "displayName": "AW IMR 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-11": {
            "displayName": "AWT 26650 4500mAh 75A",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-12": {
            "displayName": "EH IMR 18350",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-13": {
            "displayName": "EH IMR 18500",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-14": {
            "displayName": "EH IMR 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-15": {
            "displayName": "EH IMR 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-16": {
            "displayName": "Efest IMR 18350",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-17": {
            "displayName": "Efest IMR 18350",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-18": {
            "displayName": "Efest IMR 18490",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-19": {
            "displayName": "Efest IMR 18500",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-20": {
            "displayName": "Efest IMR 18500",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-21": {
            "displayName": "Efest IMR 18500",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-22": {
            "displayName": "Efest IMR 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-23": {
            "displayName": "Efest IMR 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-24": {
            "displayName": "Efest IMR 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-25": {
            "displayName": "Efest IMR 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-26": {
            "displayName": "Efest IMR 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-27": {
            "displayName": "Efest IMR 18650 35A",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-28": {
            "displayName": "Efest IMR 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-29": {
            "displayName": "Efest IMR 26650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-30": {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei integrert batteripakke i eininga.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-31": {
            "displayName": "Innokin iTaste VV v3",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei integrert batteripakke i eininga.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-32": {
            "displayName": "Keeppower IMR26650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-33": {
            "displayName": "LG 18650HB6",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-34": {
            "displayName": "LG 18650HE2",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-35": {
            "displayName": "LG 18650HG2",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-36": {
            "displayName": "MNKE IMR 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-37": {
            "displayName": "MNKE IMR 26650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-38": {
            "displayName": "MXJO IMR 18650 35A",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-39": {
            "displayName": "MXJO IMR 18650 20A",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-40": {
            "displayName": "Nitecore NL188",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-41": {
            "displayName": "Orbtronic 18650 PD2900",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-42": {
            "displayName": "Orbtronic 18650 SX22",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-43": {
            "displayName": "Orbtronic 18650 SX30",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-44": {
            "displayName": "Orbtronic 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-45": {
            "displayName": "Orbtronic CGR18650CH",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-46": {
            "displayName": "Orbtronic NCR18650A",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-47": {
            "displayName": "Panasonic CGR18650CH",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-48": {
            "displayName": "Panasonic NCR18650A",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-49": {
            "displayName": "Panasonic NCR18650B",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-50": {
            "displayName": "Panasonic NCR18650BD",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-51": {
            "displayName": "Panasonic NCR18650PF",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-52": {
            "displayName": "Panasonic CGR26650A",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-53": {
            "displayName": "Samsung ICR18650-26F",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-54": {
            "displayName": "Panasonic NCR18650PD",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-55": {
            "displayName": "Samsung INR18650-20R",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-56": {
            "displayName": "Samsung INR18650-25R",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-57": {
            "displayName": "Samsung INR18650-20Q",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-58": {
            "displayName": "Samsung INR18650-30Q",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-59": {
            "displayName": "Sanyo UR16650ZTA",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-60": {
            "displayName": "Sanyo UR18650EX",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-61": {
            "displayName": "Sanyo UR18650F",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "Batteri for lav belastning; egner seg ikkje for damping."
            ],
            "safetyText": "Bruk berre batteriet innanfor dei oppgitte grensene, og ikkje i ei eining som krev høgare belastning."
        },
        "battery-62": {
            "displayName": "Sibeile IMR 18500",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-63": {
            "displayName": "Sibeile IMR 18500",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-64": {
            "displayName": "Sony US18650VTC3",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-65": {
            "displayName": "Sony US18650VTC4",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-66": {
            "displayName": "Sony US18650VTC5",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-67": {
            "displayName": "Sony US18650v3",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-68": {
            "displayName": "Sony US26650VT",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-69": {
            "displayName": "Torchy IMR 18350",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-70": {
            "displayName": "Vappower IMR 26650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-71": {
            "displayName": "Vamped 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "20 A kontinuerlig verdi; pulsverdier brukes ikkje."
            ],
            "safetyText": undefined
        },
        "battery-72": {
            "displayName": "UltraFire BRC 18650 4000mAh li-ion",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "Den faktiske kapasiteten er lågare enn etiketten antyder."
            ],
            "safetyText": undefined
        },
        "battery-73": {
            "displayName": "UltraFire XSL 18350 1200mAh",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "Den faktiske kapasiteten er lågare enn etiketten antyder."
            ],
            "safetyText": undefined
        },
        "battery-74": {
            "displayName": "Vamped 26650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-75": {
            "displayName": "Xtar IMR 18350",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-76": {
            "displayName": "Xtar IMR 18500",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-77": {
            "displayName": "EVE INR18650/30P",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "20 A konservativ, uavhengig sammenligningsverdi; nøyaktig omslag og produksjonsrevisjon er fortsatt relevante."
            ],
            "safetyText": undefined
        },
        "battery-78": {
            "displayName": "EVE INR18650/25P",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "15 A konservativ verdi fra testing av nøyaktig modell; den testede CCC-merkede revisjonen er fortsatt relevant."
            ],
            "safetyText": undefined
        },
        "battery-79": {
            "displayName": "EVE INR18650/30PL",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "45 A uavhengig kontinuerlig verdi for den testede tabless-revisjonen; ikkje erstatt den med pulsverdier."
            ],
            "safetyText": undefined
        },
        "battery-80": {
            "displayName": "Ampace JP30P1",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "36 A faktisk kontinuerlig verdi; 56 A-verdien er temperaturbegrenset."
            ],
            "safetyText": undefined
        },
        "battery-81": {
            "displayName": "Tenpower INR18650-30XG",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "40 A konservativ verdi; de testede cellene så ut til å være førproduksjon og manglet CCC-logo."
            ],
            "safetyText": undefined
        },
        "battery-82": {
            "displayName": "EVE INR21700/58E",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "13 A anbefalt kontinuerlig verdi; 16,8 A er et absolutt maksimum som ikkje er ment for lang levetid."
            ],
            "safetyText": undefined
        },
        "battery-83": {
            "displayName": "Reliance INR21700-RS40",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "40 A konservativ verdi; 70 A er temperaturbegrenset og de testede prøvene var førproduksjon."
            ],
            "safetyText": undefined
        },
        "battery-84": {
            "displayName": "Reliance INR21700-RS50",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "40 A sammenligningsverdi for produksjonscelle; 70 A krever temperaturkontroll."
            ],
            "safetyText": undefined
        },
        "battery-85": {
            "displayName": "Vapcell S41",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "40 A verdi for nøyaktig omslag; 70 A er begrenset til 60 °C og testet som en EVE 40PL-rewrap."
            ],
            "safetyText": undefined
        },
        "battery-86": {
            "displayName": "BAK 21700-65E",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "19 A konservativ verdi; de nøyaktig testede prøvene så ut til å være førproduksjon og manglet CCC-merker."
            ],
            "safetyText": undefined
        },
        "battery-87": {
            "displayName": "Tenpower INR21700-50XG",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "40 A konservativ verdi; 90 A er temperaturbegrenset og de testede cellene så ut til å være førproduksjon."
            ],
            "safetyText": undefined
        },
        "battery-88": {
            "displayName": "Tenpower INR21700-60XG",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "40 A konservativ verdi; 60 A er temperaturbegrenset og produksjonskontinuiteten er fortsatt uavklart."
            ],
            "safetyText": undefined
        },
        "battery-89": {
            "displayName": "Great Power 50Q",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "40 A konservativ verdi; de testede prøvene hadde ujevn kapasitet og manglet CCC-/CE-merker."
            ],
            "safetyText": undefined
        },
        "battery-90": {
            "displayName": "FEB 21700-68E",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "13 A konservativ verdi; de nøyaktig testede prøvene så ut til å være førproduksjon og manglet CCC-merker."
            ],
            "safetyText": undefined
        },
        "battery-91": {
            "displayName": "Reliance INR21700-RS60",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "30 A kontinuerlig verdi anslått av tester; Reliances maksimum på 50 A er temperaturbegrenset."
            ],
            "safetyText": undefined
        },
        "battery-92": {
            "displayName": "Reliance INR21700-RH60",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "20 A kontinuerlig verdi fra to produksjonsrelaterte testpartier; 30 A er temperaturbegrenset."
            ],
            "safetyText": undefined
        },
        "battery-93": {
            "displayName": "Amprius INR18650/40 (SA110)",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "12 A kontinuerlig; 20 A er berre puls. Det nøyaktig testede omslaget er registrert som SA110 / INR18650/40."
            ],
            "safetyText": undefined
        },
        "battery-94": {
            "displayName": "Vapcell B30 18650",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "20 A verdi for nøyaktig omslag; testeren anbefaler under 15 A kontinuerlig. Vapehuset oppgir 25 A i tittelen, og senere rewrap-kilder eller omslagsrevisjoner kan avvike."
            ],
            "safetyText": undefined
        },
        "battery-95": {
            "displayName": "Golisi S35 21700",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "30 A verdi for nøyaktig modell; dette er en rewrap, og senere omslagsrevisjoner eller underliggende kilde kan avvike."
            ],
            "safetyText": undefined
        },
        "battery-96": {
            "displayName": "iJoy 20700 3000mAh five-leg",
            "description": "Ei oppladbar celle eller batteripakke for kompatible einingar.",
            "summary": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
            "notes": [
                "30 A verdi for nøyaktig fembeinsrevisjon; firebeins- og senere revisjoner med samme omslag er vesentlig forskjellige og må ikkje arve denne profilen."
            ],
            "safetyText": undefined
        }
    },
    "mods": {
        "preset-1": {
            "displayName": "AceSmok Ace 50",
            "description": "Profil for ei regulert eining eller eit styrekort: AceSmok Ace 50.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-2": {
            "displayName": "Ante Meridiem Axis",
            "description": "Profil for ei regulert eining eller eit styrekort: Ante Meridiem Axis.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-3": {
            "displayName": "Anyvape AnyMOD",
            "description": "Profil for ei regulert eining eller eit styrekort: Anyvape AnyMOD.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-4": {
            "displayName": "Arrow 100W",
            "description": "Profil for ei regulert eining eller eit styrekort: Arrow 100W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-5": {
            "displayName": "Artisan Supermax",
            "description": "Profil for ei regulert eining eller eit styrekort: Artisan Supermax.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-6": {
            "displayName": "Asmodus Snow Wolf 200W",
            "description": "Profil for ei regulert eining eller eit styrekort: Asmodus Snow Wolf 200W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-7": {
            "displayName": "Aspire CF Sub Ohm",
            "description": "Profil for ei regulert eining eller eit styrekort: Aspire CF Sub Ohm.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-8": {
            "displayName": "Beastmode Industries BMI 100 Watt V.1",
            "description": "Profil for ei regulert eining eller eit styrekort: Beastmode Industries BMI 100 Watt V.1.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-9": {
            "displayName": "Billet Box rev. 3a",
            "description": "Profil for ei regulert eining eller eit styrekort: Billet Box rev. 3a.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-10": {
            "displayName": "Cloupor DNA-30",
            "description": "Profil for ei regulert eining eller eit styrekort: Cloupor DNA-30.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-11": {
            "displayName": "Cloupor DNA-50",
            "description": "Profil for ei regulert eining eller eit styrekort: Cloupor DNA-50.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-12": {
            "displayName": "Cloupor GT",
            "description": "Profil for ei regulert eining eller eit styrekort: Cloupor GT.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-13": {
            "displayName": "Cloupor Mini",
            "description": "Profil for ei regulert eining eller eit styrekort: Cloupor Mini.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-14": {
            "displayName": "Cloupor T5",
            "description": "Profil for ei regulert eining eller eit styrekort: Cloupor T5.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-15": {
            "displayName": "Cloupor T6",
            "description": "Profil for ei regulert eining eller eit styrekort: Cloupor T6.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-16": {
            "displayName": "Cloupor T8",
            "description": "Profil for ei regulert eining eller eit styrekort: Cloupor T8.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-17": {
            "displayName": "Cloupor ZNA50",
            "description": "Profil for ei regulert eining eller eit styrekort: Cloupor ZNA50.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-18": {
            "displayName": "C-Tratech Smart Box 50W",
            "description": "Profil for ei regulert eining eller eit styrekort: C-Tratech Smart Box 50W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-19": {
            "displayName": "Dicodes Dani Extreme",
            "description": "Profil for ei regulert eining eller eit styrekort: Dicodes Dani Extreme.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-20": {
            "displayName": "Dicodes Dani Extreme v2 / Pipeline Pro v2",
            "description": "Profil for ei regulert eining eller eit styrekort: Dicodes Dani Extreme v2 / Pipeline Pro v2.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-21": {
            "displayName": "DJK Wood Mods The Nerd VV",
            "description": "Profil for ei regulert eining eller eit styrekort: DJK Wood Mods The Nerd VV.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-22": {
            "displayName": "Dovpo DT-50",
            "description": "Profil for ei regulert eining eller eit styrekort: Dovpo DT-50.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-23": {
            "displayName": "Dovpo E-LVT",
            "description": "Profil for ei regulert eining eller eit styrekort: Dovpo E-LVT.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-24": {
            "displayName": "Dovpo E-Mech",
            "description": "Profil for ei regulert eining eller eit styrekort: Dovpo E-Mech.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-25": {
            "displayName": "Dovpo TC 50",
            "description": "Profil for ei regulert eining eller eit styrekort: Dovpo TC 50.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-26": {
            "displayName": "eGo Twist",
            "description": "Profil for ei regulert eining eller eit styrekort: eGo Twist.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-27": {
            "displayName": "eGo-V V3",
            "description": "Profil for ei regulert eining eller eit styrekort: eGo-V V3.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-28": {
            "displayName": "Evod V v3",
            "description": "Profil for ei regulert eining eller eit styrekort: Evod V v3.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-29": {
            "displayName": "Evolv DNA-20D",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA-20D.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-30": {
            "displayName": "Evolv DNA-30D",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA-30D.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-31": {
            "displayName": "Evolv DNA-40 (std. wire)",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA-40 (std. wire).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-32": {
            "displayName": "Evolv DNA-40 (Ni 200)",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA-40 (Ni 200).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-33": {
            "displayName": "Evolv DNA60 (non-color)",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA60 (non-color).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-34": {
            "displayName": "Evolv DNA-75",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA-75.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-35": {
            "displayName": "Evolv DNA-200 (2 cells, DNA-133)",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA-200 (2 cells, DNA-133).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-36": {
            "displayName": "Evolv DNA-200 (3 cells)",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA-200 (3 cells).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-37": {
            "displayName": "Evolv DNA-200 (TC mode)",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA-200 (TC mode).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-38": {
            "displayName": "Evolv DNA-250 (2 cells, DNA-166)",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA-250 (2 cells, DNA-166).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-39": {
            "displayName": "Evolv DNA-250 (3 cells)",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA-250 (3 cells).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-40": {
            "displayName": "Evolv Kick 2",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv Kick 2.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-41": {
            "displayName": "Eleaf iStick",
            "description": "Profil for ei regulert eining eller eit styrekort: Eleaf iStick.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-42": {
            "displayName": "Eleaf iStick 30W",
            "description": "Profil for ei regulert eining eller eit styrekort: Eleaf iStick 30W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-43": {
            "displayName": "Eleaf iStick 40W TC",
            "description": "Profil for ei regulert eining eller eit styrekort: Eleaf iStick 40W TC.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-44": {
            "displayName": "Eleaf iStick 50W",
            "description": "Profil for ei regulert eining eller eit styrekort: Eleaf iStick 50W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-45": {
            "displayName": "Eleaf iStick 100W",
            "description": "Profil for ei regulert eining eller eit styrekort: Eleaf iStick 100W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-46": {
            "displayName": "Gossmods The Duke",
            "description": "Profil for ei regulert eining eller eit styrekort: Gossmods The Duke.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-47": {
            "displayName": "Grand Innovations GI2",
            "description": "Profil for ei regulert eining eller eit styrekort: Grand Innovations GI2.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-48": {
            "displayName": "Heatvape Invader Mini",
            "description": "Profil for ei regulert eining eller eit styrekort: Heatvape Invader Mini.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-49": {
            "displayName": "Heatvape Invader Mini (TC mode)",
            "description": "Profil for ei regulert eining eller eit styrekort: Heatvape Invader Mini (TC mode).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-50": {
            "displayName": "iJoy A160",
            "description": "Profil for ei regulert eining eller eit styrekort: iJoy A160.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-51": {
            "displayName": "Innokin Cool Fire II",
            "description": "Profil for ei regulert eining eller eit styrekort: Innokin Cool Fire II.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-52": {
            "displayName": "Innokin Cool Fire IV",
            "description": "Profil for ei regulert eining eller eit styrekort: Innokin Cool Fire IV.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-53": {
            "displayName": "Innokin Disrupter",
            "description": "Profil for ei regulert eining eller eit styrekort: Innokin Disrupter.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-54": {
            "displayName": "Innokin iTaste 134 / iTaste 134 mini",
            "description": "Profil for ei regulert eining eller eit styrekort: Innokin iTaste 134 / iTaste 134 mini.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-55": {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": "Profil for ei regulert eining eller eit styrekort: Innokin iTaste MVP 2.0.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-56": {
            "displayName": "Innokin iTaste MVP 20 Watt",
            "description": "Profil for ei regulert eining eller eit styrekort: Innokin iTaste MVP 20 Watt.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-57": {
            "displayName": "Innokin iTaste MVP 3.0",
            "description": "Profil for ei regulert eining eller eit styrekort: Innokin iTaste MVP 3.0.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-58": {
            "displayName": "Innokin iTaste MVP 3 Pro",
            "description": "Profil for ei regulert eining eller eit styrekort: Innokin iTaste MVP 3 Pro.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-59": {
            "displayName": "Innokin iTaste SVD",
            "description": "Profil for ei regulert eining eller eit styrekort: Innokin iTaste SVD.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-60": {
            "displayName": "Innokin iTaste SVD2",
            "description": "Profil for ei regulert eining eller eit styrekort: Innokin iTaste SVD2.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-61": {
            "displayName": "Innokin iTaste VTR",
            "description": "Profil for ei regulert eining eller eit styrekort: Innokin iTaste VTR.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-62": {
            "displayName": "Innokin iTaste VV V3.0",
            "description": "Profil for ei regulert eining eller eit styrekort: Innokin iTaste VV V3.0.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-63": {
            "displayName": "Joy4life Beyang 30W",
            "description": "Profil for ei regulert eining eller eit styrekort: Joy4life Beyang 30W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-64": {
            "displayName": "Joyetech eCom Supreme",
            "description": "Profil for ei regulert eining eller eit styrekort: Joyetech eCom Supreme.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-65": {
            "displayName": "Joyetech eVic",
            "description": "Profil for ei regulert eining eller eit styrekort: Joyetech eVic.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-66": {
            "displayName": "Joyetech eVic VT",
            "description": "Profil for ei regulert eining eller eit styrekort: Joyetech eVic VT.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-67": {
            "displayName": "Joyetech eVic VT (TC mode)",
            "description": "Profil for ei regulert eining eller eit styrekort: Joyetech eVic VT (TC mode).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-68": {
            "displayName": "Joyetech eVic Supreme",
            "description": "Profil for ei regulert eining eller eit styrekort: Joyetech eVic Supreme.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-69": {
            "displayName": "J Well Alesia",
            "description": "Profil for ei regulert eining eller eit styrekort: J Well Alesia.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-70": {
            "displayName": "J Well Troca",
            "description": "Profil for ei regulert eining eller eit styrekort: J Well Troca.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-71": {
            "displayName": "Kanger e-Power v3",
            "description": "Profil for ei regulert eining eller eit styrekort: Kanger e-Power v3.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-72": {
            "displayName": "Kanger IPOW 2",
            "description": "Profil for ei regulert eining eller eit styrekort: Kanger IPOW 2.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-73": {
            "displayName": "Kanger KBOX",
            "description": "Profil for ei regulert eining eller eit styrekort: Kanger KBOX.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-74": {
            "displayName": "Kanger KBOX Mini / SUBOX Mini",
            "description": "Profil for ei regulert eining eller eit styrekort: Kanger KBOX Mini / SUBOX Mini.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-75": {
            "displayName": "Kanger K-Simar 20",
            "description": "Profil for ei regulert eining eller eit styrekort: Kanger K-Simar 20.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-76": {
            "displayName": "Kangside e-Huge",
            "description": "Profil for ei regulert eining eller eit styrekort: Kangside e-Huge.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-77": {
            "displayName": "Kamry 20",
            "description": "Profil for ei regulert eining eller eit styrekort: Kamry 20.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-78": {
            "displayName": "Kamry 60W",
            "description": "Profil for ei regulert eining eller eit styrekort: Kamry 60W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-79": {
            "displayName": "Kamry God Box",
            "description": "Profil for ei regulert eining eller eit styrekort: Kamry God Box.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-80": {
            "displayName": "KangXin VF clone v3",
            "description": "Profil for ei regulert eining eller eit styrekort: KangXin VF clone v3.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-81": {
            "displayName": "KangXin KX5-50W",
            "description": "Profil for ei regulert eining eller eit styrekort: KangXin KX5-50W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-82": {
            "displayName": "Koopor Mini KP60",
            "description": "Profil for ei regulert eining eller eit styrekort: Koopor Mini KP60.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-83": {
            "displayName": "Koopor Mini KP60 (TC)",
            "description": "Profil for ei regulert eining eller eit styrekort: Koopor Mini KP60 (TC).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-84": {
            "displayName": "KSD 30",
            "description": "Profil for ei regulert eining eller eit styrekort: KSD 30.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-85": {
            "displayName": "KSD Kmax (single battery)",
            "description": "Profil for ei regulert eining eller eit styrekort: KSD Kmax (single battery).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-86": {
            "displayName": "KSD Kmax (stacked)",
            "description": "Profil for ei regulert eining eller eit styrekort: KSD Kmax (stacked).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-87": {
            "displayName": "L-Rider Lambo 6.0",
            "description": "Profil for ei regulert eining eller eit styrekort: L-Rider Lambo 6.0.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-88": {
            "displayName": "L-Rider Lavatube",
            "description": "Profil for ei regulert eining eller eit styrekort: L-Rider Lavatube.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-89": {
            "displayName": "Lotus Jellyfish",
            "description": "Profil for ei regulert eining eller eit styrekort: Lotus Jellyfish.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-90": {
            "displayName": "Lotus LE80",
            "description": "Profil for ei regulert eining eller eit styrekort: Lotus LE80.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-91": {
            "displayName": "Luxyoun Smaug",
            "description": "Profil for ei regulert eining eller eit styrekort: Luxyoun Smaug.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-92": {
            "displayName": "Majesty 150W",
            "description": "Profil for ei regulert eining eller eit styrekort: Majesty 150W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-93": {
            "displayName": "Megatron 260",
            "description": "Profil for ei regulert eining eller eit styrekort: Megatron 260.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-94": {
            "displayName": "Naos Raptor 10A",
            "description": "Profil for ei regulert eining eller eit styrekort: Naos Raptor 10A.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-95": {
            "displayName": "Naos Raptor 20A",
            "description": "Profil for ei regulert eining eller eit styrekort: Naos Raptor 20A.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-96": {
            "displayName": "Nivel V3",
            "description": "Profil for ei regulert eining eller eit styrekort: Nivel V3.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-97": {
            "displayName": "Notcigs VV",
            "description": "Profil for ei regulert eining eller eit styrekort: Notcigs VV.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-98": {
            "displayName": "OKL2-T/20-W12",
            "description": "Profil for ei regulert eining eller eit styrekort: OKL2-T/20-W12.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-99": {
            "displayName": "OKR-T10",
            "description": "Profil for ei regulert eining eller eit styrekort: OKR-T10.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-100": {
            "displayName": "Pioneer4You/Green Leaf P-Max",
            "description": "Profil for ei regulert eining eller eit styrekort: Pioneer4You/Green Leaf P-Max.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-101": {
            "displayName": "ProVari 2, ProVari 2.5",
            "description": "Profil for ei regulert eining eller eit styrekort: ProVari 2, ProVari 2.5.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-102": {
            "displayName": "ProVari P3 beta",
            "description": "Profil for ei regulert eining eller eit styrekort: ProVari P3 beta.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-103": {
            "displayName": "ProVari P35",
            "description": "Profil for ei regulert eining eller eit styrekort: ProVari P35.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-104": {
            "displayName": "Psmoke GI2",
            "description": "Profil for ei regulert eining eller eit styrekort: Psmoke GI2.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-105": {
            "displayName": "RainbowHeaven Arrow",
            "description": "Profil for ei regulert eining eller eit styrekort: RainbowHeaven Arrow.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-106": {
            "displayName": "Robbot Tech ZNA50",
            "description": "Profil for ei regulert eining eller eit styrekort: Robbot Tech ZNA50.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-107": {
            "displayName": "Sigelei 20W",
            "description": "Profil for ei regulert eining eller eit styrekort: Sigelei 20W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-108": {
            "displayName": "Sigelei 50W",
            "description": "Profil for ei regulert eining eller eit styrekort: Sigelei 50W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-109": {
            "displayName": "Sigelei 75W TC",
            "description": "Profil for ei regulert eining eller eit styrekort: Sigelei 75W TC.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-110": {
            "displayName": "Sigelei 150W",
            "description": "Profil for ei regulert eining eller eit styrekort: Sigelei 150W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-111": {
            "displayName": "Sigelei Fuchai 213 Plus",
            "description": "Profil for ei regulert eining eller eit styrekort: Sigelei Fuchai 213 Plus.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-112": {
            "displayName": "Sigelei Kick",
            "description": "Profil for ei regulert eining eller eit styrekort: Sigelei Kick.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-113": {
            "displayName": "Sigelei Legend v2",
            "description": "Profil for ei regulert eining eller eit styrekort: Sigelei Legend v2.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-114": {
            "displayName": "Sigelei Vmax",
            "description": "Profil for ei regulert eining eller eit styrekort: Sigelei Vmax.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-115": {
            "displayName": "Sigelei Zmax V3",
            "description": "Profil for ei regulert eining eller eit styrekort: Sigelei Zmax V3.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-116": {
            "displayName": "Sigelei Zmax V5",
            "description": "Profil for ei regulert eining eller eit styrekort: Sigelei Zmax V5.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-117": {
            "displayName": "Simeiyue God 180",
            "description": "Profil for ei regulert eining eller eit styrekort: Simeiyue God 180.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-118": {
            "displayName": "Simeiyue God 180s",
            "description": "Profil for ei regulert eining eller eit styrekort: Simeiyue God 180s.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-119": {
            "displayName": "Simeiyue God 260",
            "description": "Profil for ei regulert eining eller eit styrekort: Simeiyue God 260.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-120": {
            "displayName": "Smok Ace",
            "description": "Profil for ei regulert eining eller eit styrekort: Smok Ace.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-121": {
            "displayName": "Smok BEC Pro",
            "description": "Profil for ei regulert eining eller eit styrekort: Smok BEC Pro.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-122": {
            "displayName": "Smok G-Priv 220W",
            "description": "Profil for ei regulert eining eller eit styrekort: Smok G-Priv 220W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-123": {
            "displayName": "Smok Sid",
            "description": "Profil for ei regulert eining eller eit styrekort: Smok Sid.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-124": {
            "displayName": "Smok X Cube II",
            "description": "Profil for ei regulert eining eller eit styrekort: Smok X Cube II.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-125": {
            "displayName": "Smok X Pro BT50",
            "description": "Profil for ei regulert eining eller eit styrekort: Smok X Pro BT50.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-126": {
            "displayName": "Smok X Pro M36",
            "description": "Profil for ei regulert eining eller eit styrekort: Smok X Pro M36.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-127": {
            "displayName": "Smok X Pro M50",
            "description": "Profil for ei regulert eining eller eit styrekort: Smok X Pro M50.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-128": {
            "displayName": "Smok X Pro M80",
            "description": "Profil for ei regulert eining eller eit styrekort: Smok X Pro M80.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-129": {
            "displayName": "Smok Zmax",
            "description": "Profil for ei regulert eining eller eit styrekort: Smok Zmax.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-130": {
            "displayName": "Smok Zmax Mini",
            "description": "Profil for ei regulert eining eller eit styrekort: Smok Zmax Mini.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-131": {
            "displayName": "SMY 260W",
            "description": "Profil for ei regulert eining eller eit styrekort: SMY 260W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-132": {
            "displayName": "SMY 50TC",
            "description": "Profil for ei regulert eining eller eit styrekort: SMY 50TC.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-133": {
            "displayName": "SMY GOD 180",
            "description": "Profil for ei regulert eining eller eit styrekort: SMY GOD 180.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-134": {
            "displayName": "Steam STM-1 / STM-2",
            "description": "Profil for ei regulert eining eller eit styrekort: Steam STM-1 / STM-2.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-135": {
            "displayName": "Sunzip Vapmod Deezel",
            "description": "Profil for ei regulert eining eller eit styrekort: Sunzip Vapmod Deezel.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-136": {
            "displayName": "Taifun The Eye",
            "description": "Profil for ei regulert eining eller eit styrekort: Taifun The Eye.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-137": {
            "displayName": "Taifun The Eye (updated)",
            "description": "Profil for ei regulert eining eller eit styrekort: Taifun The Eye (updated).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-138": {
            "displayName": "Tesla",
            "description": "Profil for ei regulert eining eller eit styrekort: Tesla.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-139": {
            "displayName": "Tesla 120W",
            "description": "Profil for ei regulert eining eller eit styrekort: Tesla 120W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-140": {
            "displayName": "Tesla 2 Sub Mod",
            "description": "Profil for ei regulert eining eller eit styrekort: Tesla 2 Sub Mod.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-141": {
            "displayName": "Tesla Spider",
            "description": "Profil for ei regulert eining eller eit styrekort: Tesla Spider.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-142": {
            "displayName": "Tobeco ZNA 36",
            "description": "Profil for ei regulert eining eller eit styrekort: Tobeco ZNA 36.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-143": {
            "displayName": "Vamo 35W (clone)",
            "description": "Profil for ei regulert eining eller eit styrekort: Vamo 35W (clone).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-144": {
            "displayName": "Vamo V1 / V2 / V3 / V5",
            "description": "Profil for ei regulert eining eller eit styrekort: Vamo V1 / V2 / V3 / V5.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-145": {
            "displayName": "Vamo V7",
            "description": "Profil for ei regulert eining eller eit styrekort: Vamo V7.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-146": {
            "displayName": "VaporFi Vox II",
            "description": "Profil for ei regulert eining eller eit styrekort: VaporFi Vox II.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-147": {
            "displayName": "Vicious Ant VariAnt 120W",
            "description": "Profil for ei regulert eining eller eit styrekort: Vicious Ant VariAnt 120W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-148": {
            "displayName": "Vicious Ant VariAnt 250W",
            "description": "Profil for ei regulert eining eller eit styrekort: Vicious Ant VariAnt 250W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-149": {
            "displayName": "Vision Spinner / Spinner II",
            "description": "Profil for ei regulert eining eller eit styrekort: Vision Spinner / Spinner II.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-150": {
            "displayName": "Vision X.Fir/X.Gun",
            "description": "Profil for ei regulert eining eller eit styrekort: Vision X.Fir/X.Gun.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-151": {
            "displayName": "Volcano Lavatube",
            "description": "Profil for ei regulert eining eller eit styrekort: Volcano Lavatube.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-152": {
            "displayName": "Volcano Lavatube v2.5",
            "description": "Profil for ei regulert eining eller eit styrekort: Volcano Lavatube v2.5.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-153": {
            "displayName": "Wismec Reuleaux RX200S (4.10)",
            "description": "Profil for ei regulert eining eller eit styrekort: Wismec Reuleaux RX200S (4.10).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-154": {
            "displayName": "YiHi SX130",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX130.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-155": {
            "displayName": "YiHi SX130 v1.5",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX130 v1.5.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-156": {
            "displayName": "YiHi SX130H",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX130H.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-157": {
            "displayName": "YiHi SX220",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX220.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-158": {
            "displayName": "YiHi SX300",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX300.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-159": {
            "displayName": "YiHi SX330 V1 35W",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX330 V1 35W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-160": {
            "displayName": "YiHi SX330 V2 50W",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX330 V2 50W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-161": {
            "displayName": "YiHi SX330 V2C 70W",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX330 V2C 70W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-162": {
            "displayName": "YiHi SX330 V2 S 60W",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX330 V2 S 60W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-163": {
            "displayName": "YiHi SX330 V3 100W",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX330 V3 100W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-164": {
            "displayName": "YiHi SX330 V3 150W",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX330 V3 150W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-165": {
            "displayName": "YiHi SX330 V3S 150W",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX330 V3S 150W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-166": {
            "displayName": "YiHi SX330-V3Si 200W",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX330-V3Si 200W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-167": {
            "displayName": "YiHi SX330 V4S 100W",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX330 V4S 100W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-168": {
            "displayName": "YiHi SX350 30W",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX350 30W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-169": {
            "displayName": "YiHi SX350 50W",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX350 50W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-170": {
            "displayName": "YiHi SX350 100W",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX350 100W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-171": {
            "displayName": "YiHi SX350J VJ mode",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX350J VJ mode.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-172": {
            "displayName": "YiHi SX350J VW/single batt mode",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX350J VW/single batt mode.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-173": {
            "displayName": "YiHi SX350J VW/dual batt mode",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX350J VW/dual batt mode.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-174": {
            "displayName": "YiHi SX470",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX470.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-175": {
            "displayName": "YiHi SX450",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX450.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-176": {
            "displayName": "YiHi SXMini",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SXMini.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-177": {
            "displayName": "Beyond Vape Solara",
            "description": "Profil for ei regulert eining eller eit styrekort: Beyond Vape Solara.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-178": {
            "displayName": "Cana Modz",
            "description": "Profil for ei regulert eining eller eit styrekort: Cana Modz.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-179": {
            "displayName": "Craving Vapor HexOhm",
            "description": "Profil for ei regulert eining eller eit styrekort: Craving Vapor HexOhm.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-180": {
            "displayName": "Craving Vapor HexOhm V2",
            "description": "Profil for ei regulert eining eller eit styrekort: Craving Vapor HexOhm V2.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-181": {
            "displayName": "Hana Modz V3",
            "description": "Profil for ei regulert eining eller eit styrekort: Hana Modz V3.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-182": {
            "displayName": "Hana Modz DNA 40",
            "description": "Profil for ei regulert eining eller eit styrekort: Hana Modz DNA 40.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-183": {
            "displayName": "Lost Vape Therion DNA 75",
            "description": "Profil for ei regulert eining eller eit styrekort: Lost Vape Therion DNA 75.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-184": {
            "displayName": "Lost Vape Therion DNA 133",
            "description": "Profil for ei regulert eining eller eit styrekort: Lost Vape Therion DNA 133.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-185": {
            "displayName": "Lost Vape Therion DNA 166",
            "description": "Profil for ei regulert eining eller eit styrekort: Lost Vape Therion DNA 166.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-186": {
            "displayName": "Notcigs Buzz Pro",
            "description": "Profil for ei regulert eining eller eit styrekort: Notcigs Buzz Pro.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-187": {
            "displayName": "Pioneer4You/Green Leaf Seven 22",
            "description": "Profil for ei regulert eining eller eit styrekort: Pioneer4You/Green Leaf Seven 22.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-188": {
            "displayName": "Pioneer4You/Green Leaf Seven 30W",
            "description": "Profil for ei regulert eining eller eit styrekort: Pioneer4You/Green Leaf Seven 30W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-189": {
            "displayName": "Pioneer4You/Green Leaf IPV",
            "description": "Profil for ei regulert eining eller eit styrekort: Pioneer4You/Green Leaf IPV.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-190": {
            "displayName": "Pioneer4You/Green Leaf IPV D2",
            "description": "Profil for ei regulert eining eller eit styrekort: Pioneer4You/Green Leaf IPV D2.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-191": {
            "displayName": "Pioneer4You/Green Leaf IPV Mini",
            "description": "Profil for ei regulert eining eller eit styrekort: Pioneer4You/Green Leaf IPV Mini.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-192": {
            "displayName": "Pioneer4You/Green Leaf IPV Mini 2",
            "description": "Profil for ei regulert eining eller eit styrekort: Pioneer4You/Green Leaf IPV Mini 2.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-193": {
            "displayName": "Pioneer4You/Green Leaf IPV V2",
            "description": "Profil for ei regulert eining eller eit styrekort: Pioneer4You/Green Leaf IPV V2.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-194": {
            "displayName": "Pioneer4You/Green Leaf IPV V2S",
            "description": "Profil for ei regulert eining eller eit styrekort: Pioneer4You/Green Leaf IPV V2S.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-195": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 100W",
            "description": "Profil for ei regulert eining eller eit styrekort: Pioneer4You/Green Leaf IPV V3 100W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-196": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 150W",
            "description": "Profil for ei regulert eining eller eit styrekort: Pioneer4You/Green Leaf IPV V3 150W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-197": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 200W",
            "description": "Profil for ei regulert eining eller eit styrekort: Pioneer4You/Green Leaf IPV V3 200W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-198": {
            "displayName": "Pioneer4You/Green Leaf IPV V4 100W",
            "description": "Profil for ei regulert eining eller eit styrekort: Pioneer4You/Green Leaf IPV V4 100W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-199": {
            "displayName": "Protovapor XPV DNA-20D",
            "description": "Profil for ei regulert eining eller eit styrekort: Protovapor XPV DNA-20D.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-200": {
            "displayName": "Protovapor XPV DNA-30D",
            "description": "Profil for ei regulert eining eller eit styrekort: Protovapor XPV DNA-30D.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-201": {
            "displayName": "Protovapor XPV DNA-40D",
            "description": "Profil for ei regulert eining eller eit styrekort: Protovapor XPV DNA-40D.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-202": {
            "displayName": "Raffmods Ranger",
            "description": "Profil for ei regulert eining eller eit styrekort: Raffmods Ranger.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-203": {
            "displayName": "Reo VV Grand/Woodvil",
            "description": "Profil for ei regulert eining eller eit styrekort: Reo VV Grand/Woodvil.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-204": {
            "displayName": "Sigelei 30W",
            "description": "Profil for ei regulert eining eller eit styrekort: Sigelei 30W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-205": {
            "displayName": "Sigelei Raptor",
            "description": "Profil for ei regulert eining eller eit styrekort: Sigelei Raptor.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-206": {
            "displayName": "Sigelei 100W",
            "description": "Profil for ei regulert eining eller eit styrekort: Sigelei 100W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-207": {
            "displayName": "Sigelei Mini",
            "description": "Profil for ei regulert eining eller eit styrekort: Sigelei Mini.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-208": {
            "displayName": "SvoëMesto Semovar",
            "description": "Profil for ei regulert eining eller eit styrekort: SvoëMesto Semovar.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-209": {
            "displayName": "Vapor Flask v1/v2 DNA 30",
            "description": "Profil for ei regulert eining eller eit styrekort: Vapor Flask v1/v2 DNA 30.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-210": {
            "displayName": "Vapor Flask v2 DNA 40",
            "description": "Profil for ei regulert eining eller eit styrekort: Vapor Flask v2 DNA 40.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-211": {
            "displayName": "Vapor Shark DNA",
            "description": "Profil for ei regulert eining eller eit styrekort: Vapor Shark DNA.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-212": {
            "displayName": "Vapor Shark DNA/rDNA 30",
            "description": "Profil for ei regulert eining eller eit styrekort: Vapor Shark DNA/rDNA 30.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-213": {
            "displayName": "Vapor Shark rDNA 40",
            "description": "Profil for ei regulert eining eller eit styrekort: Vapor Shark rDNA 40.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-214": {
            "displayName": "Geekvape Aegis Legend 5",
            "description": "Profil for ei regulert eining eller eit styrekort: Geekvape Aegis Legend 5.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-215": {
            "displayName": "Evolv DNA60C",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA60C.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-216": {
            "displayName": "Evolv DNA100C",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA100C.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-217": {
            "displayName": "Evolv DNA250C (2S)",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA250C (2S).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-218": {
            "displayName": "Evolv DNA250C (3S, US firmware)",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA250C (3S, US firmware).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-219": {
            "displayName": "Evolv DNA250C (3S, international firmware)",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA250C (3S, international firmware).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-220": {
            "displayName": "Evolv DNA250C (4S)",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA250C (4S).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-221": {
            "displayName": "VOOPOO DRAG 6",
            "description": "Profil for ei regulert eining eller eit styrekort: VOOPOO DRAG 6.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-222": {
            "displayName": "YiHi SXmini MQ Class",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SXmini MQ Class.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-223": {
            "displayName": "Evolv DNA80C",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA80C.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-224": {
            "displayName": "Evolv DNA75C",
            "description": "Profil for ei regulert eining eller eit styrekort: Evolv DNA75C.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-225": {
            "displayName": "YiHi SX600H",
            "description": "Profil for ei regulert eining eller eit styrekort: YiHi SX600H.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-226": {
            "displayName": "Craving Vapor HexOhm V3",
            "description": "Profil for ei regulert eining eller eit styrekort: Craving Vapor HexOhm V3.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-227": {
            "displayName": "VOOPOO VINCI Spark220",
            "description": "Profil for ei regulert eining eller eit styrekort: VOOPOO VINCI Spark220.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-228": {
            "displayName": "Dovpo x TVC Topside Dual",
            "description": "Profil for ei regulert eining eller eit styrekort: Dovpo x TVC Topside Dual.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-229": {
            "displayName": "VOOPOO DRAG 5",
            "description": "Profil for ei regulert eining eller eit styrekort: VOOPOO DRAG 5.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-230": {
            "displayName": "Geekvape L200 Classic",
            "description": "Profil for ei regulert eining eller eit styrekort: Geekvape L200 Classic.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-231": {
            "displayName": "VAPORESSO ARMOUR MAX",
            "description": "Profil for ei regulert eining eller eit styrekort: VAPORESSO ARMOUR MAX.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-232": {
            "displayName": "Geekvape Aegis Legend 2 (L200)",
            "description": "Profil for ei regulert eining eller eit styrekort: Geekvape Aegis Legend 2 (L200).",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-233": {
            "displayName": "ProVape ProVari Radius 40 W",
            "description": "Profil for ei regulert eining eller eit styrekort: ProVape ProVari Radius 40 W.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-234": {
            "displayName": "VAPORESSO GEN MAX",
            "description": "Profil for ei regulert eining eller eit styrekort: VAPORESSO GEN MAX.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-235": {
            "displayName": "VAPORESSO ARMOUR ULTRA",
            "description": "Profil for ei regulert eining eller eit styrekort: VAPORESSO ARMOUR ULTRA.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-236": {
            "displayName": "Geekvape Aegis Solo 3",
            "description": "Profil for ei regulert eining eller eit styrekort: Geekvape Aegis Solo 3.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-237": {
            "displayName": "Eleaf iStick Pico 21700",
            "description": "Profil for ei regulert eining eller eit styrekort: Eleaf iStick Pico 21700.",
            "summary": "En profil for en regulert eining eller et styrekort."
        },
        "preset-238": {
            "displayName": "Vandy Vape Pulse V2",
            "description": "Profil for ei regulert eining eller eit styrekort: Vandy Vape Pulse V2.",
            "summary": "En profil for en regulert eining eller et styrekort."
        }
    }
});
