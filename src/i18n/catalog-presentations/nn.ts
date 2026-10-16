/* Machine-materialized draft. Human review may edit string values. */

import type { CatalogPresentationSet } from "../catalog-presentations";
import { batteryPresentationsFor, type BatteryTextDictionary } from "../battery-presentation-text";
import { normalizeNynorsk } from "../nynorsk-normalization";
import { modPresentationsFor, type ModTextDictionary } from "../mod-presentation-text";
import {
    materialPresentationsFor,
    type MaterialDisplayNames,
    type MaterialTextDictionary,
} from "../material-presentation-text";

export const batteryTexts: BatteryTextDictionary = {
    "battery.summary.removable": "Ei utskiftbar, oppladbar celle for kompatible einingar.",
    "battery.summary.integrated": "Ei intern batteripakke i eininga, ikkje ei celle brukaren kan byte.",
    "battery.note.approvedResearch": "Godkjend 2026-08-13; sjå den tilhøyrande forskingsoppføringa.",
    "battery.note.capacityBelowLabel": "Den faktiske kapasiteten er lågare enn etiketten antyder.",
    "battery.note.battery-71.evidence": "20 A kontinuerleg verdi; pulsverdiar blir ikkje brukte.",
    "battery.note.battery-77.evidence":
        "20 A som konservativ, uavhengig samanlikningsverdi; nøyaktig "
        + "omslag og produksjonsrevisjon er framleis relevante.",
    "battery.note.battery-78.evidence":
        "15 A som konservativ verdi frå testing av nøyaktig modell; den "
        + "testa CCC-merkte revisjonen er framleis relevant.",
    "battery.note.battery-79.evidence":
        "45 A uavhengig kontinuerleg verdi for den testa revisjonen utan kontaktfaner "
        + "(tabless); ikkje erstatt denne med pulsverdiar.",
    "battery.note.battery-80.evidence": "36 A faktisk kontinuerleg verdi; 56 A-verdien er temperaturavgrensa.",
    "battery.note.battery-81.evidence":
        "40 A konservativ verdi; dei testa cellene såg ut til å "
        + "vere førproduksjon og mangla CCC-logo.",
    "battery.note.battery-82.evidence":
        "13 A anbefalt kontinuerleg verdi; 16,8 A er eit absolutt "
        + "maksimum som ikkje er meint for lang levetid.",
    "battery.note.battery-83.evidence":
        "40 A konservativ verdi; 70 A er temperaturavgrensa, og dei "
        + "testa prøvene var førproduksjon.",
    "battery.note.battery-84.evidence":
        "40 A samanlikningsverdi for produksjonscelle; 70 A krev "
        + "temperaturkontroll.",
    "battery.note.battery-85.evidence":
        "40 A verdi for nøyaktig omslag; 70 A er avgrensa til 60 "
        + "°C, og cella blei testa som ei ompakka EVE 40PL-celle.",
    "battery.note.battery-86.evidence":
        "19 A konservativ verdi; dei nøyaktig testa prøvene såg ut "
        + "til å vere førproduksjon og mangla CCC-merke.",
    "battery.note.battery-87.evidence":
        "40 A konservativ verdi; 90 A er temperaturavgrensa, og dei "
        + "testa cellene såg ut til å vere førproduksjon.",
    "battery.note.battery-88.evidence":
        "40 A konservativ verdi; 60 A er temperaturavgrensa, og "
        + "produksjonskontinuiteten er framleis uavklart.",
    "battery.note.battery-89.evidence":
        "40 A konservativ verdi; dei testa prøvene hadde ujamn "
        + "kapasitet og mangla CCC-/CE-merke.",
    "battery.note.battery-90.evidence":
        "13 A konservativ verdi; dei nøyaktig testa prøvene såg ut "
        + "til å vere førproduksjon og mangla CCC-merke.",
    "battery.note.battery-91.evidence":
        "30 A kontinuerleg verdi anslått av testaren; Reliance sitt "
        + "maksimum på 50 A er temperaturavgrensa.",
    "battery.note.battery-92.evidence":
        "20 A kontinuerleg verdi frå to produksjonsrelaterte "
        + "testparti; 30 A er temperaturavgrensa.",
    "battery.note.battery-93.evidence":
        "12 A kontinuerleg; 20 A er berre puls. Det nøyaktig "
        + "testa omslaget er registrert som SA110 / INR18650/40.",
    "battery.note.battery-94.evidence":
        "20 A verdi for nøyaktig omslag; testaren tilrår under "
        + "15 A kontinuerleg. Vapehuset oppgir 25 A i tittelen, og "
        + "seinare kjelder til ompakka celler eller omslagsrevisjonar kan avvike.",
    "battery.note.battery-95.evidence":
        "30 A verdi for nøyaktig modell; dette er ei ompakka celle, og "
        + "seinare omslagsrevisjonar eller underliggjande kjelde kan "
        + "avvike.",
    "battery.note.battery-96.evidence":
        "30 A verdi for nøyaktig revisjon med fem kontaktbein; revisjonar med fire "
        + "kontaktbein og seinare revisjonar med same omslag er vesentleg "
        + "ulike og må ikkje arve denne profilen.",
    "battery.safety.lowDrain":
        "Batteri med låg utladingsstraum; ikkje eigna for damping.",
};

const nynorskMaterialNames: MaterialDisplayNames = {
    ti1: "Titan 1",
    ti2: "Titan 2 (R50400)",
    w: "Wolfram",
    nio: "Niobiumlegering",
    ni200: "Nikkel 200 / Ni200 (UNS N02200)",
    zr: "Zirkonium (rent)",
};
export const materialTexts: MaterialTextDictionary = {
    "material.profile": (displayName) => "Katalogprofil for " + displayName + ".",
    "material.safety.verifiedProfile":
        "Bruk ein verifisert materialprofil, og følg temperatur- og "
        + "driftsgrensene til eininga.",
};
export const modTexts: ModTextDictionary = {
    "mod.profile.regulated": (displayName) => "Profil for ei regulert eining eller eit styrekort: "
        + displayName + ".",
    "mod.preset-9.profile":
        "Billet Box Rev. 3a med perleblåst, blankdyppa anodisert "
        + "aluminiumsfinish; introdusert i mai 2014.",
    "mod.preset-10.profile":
        "Ei Cloupor-eining på 30 W med eit tredjeparts "
        + "klonebrikkesett i DNA30-stil, ikkje eit autentisk Evolv "
        + "DNA-30D-kort.",
    "mod.preset-231.profile":
        "Regulert mod med to 21700-celler og 18650-adapterar; "
        + "VAPORESSO oppgir 220 W; testing målte 208 W, 8,979 V og 39 "
        + "A.",
    "mod.preset-234.profile":
        "Regulert mod med to 18650-celler; VAPORESSO oppgir 220 W; "
        + "testing målte 215 W, 9,08 V og 37 A.",
    "mod.preset-235.profile":
        "Regulert mod med innebygd batteri, oppgitt til 100 W; "
        + "testing målte 101 W, 29 A og minst 7,97 V.",
    "mod.preset-236.profile":
        "Regulert mod med éi 18650-celle og AS Chip 4.0; "
        + "produsentprofilen er 100 W, 7,5 V, 32 A og 0,1–3 Ω.",
    "mod.preset-237.profile":
        "Mod for éi 21700-celle eller ei tilpassa 18650-celle; "
        + "Eleaf oppgir 100 W, 9 V og 0,05–3,5 Ω; testing "
        + "identifiserte 30 A.",
    "mod.preset-238.profile":
        "Regulert squonk-mod for éi 21700-, 20700- eller tilpassa "
        + "18650-celle, med ein konservativ profil på 95 W, 6 V og 34 "
        + "A.",
};

export const presentations: CatalogPresentationSet = normalizeNynorsk({
    "concepts": {
        "concept-ohms-law": {
            "displayName": "Ohms lov",
            "description": "Ohms lov knyter saman spenning, straum og motstand i ein elektrisk krins.",
            "summary": "Forholdet mellom spenning, straum og motstand.",
            "sections": [
                {
                    "id": "relationship",
                    "title": "Samanhengen",
                    "paragraphs": [
                        "Den grunnleggjande samanhengen er nyttig når motstanden i ein komponent er omtrent konstant."
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
                        "Ein motstand på null Ω er ei ideell kortslutning og må handsamast separat."
                    ]
                },
                {
                    "id": "worked-examples",
                    "title": "Regneeksempler",
                    "examples": [
                        {
                            "title": "Finn straumen",
                            "setup": "Ei kjelde på 4,2 V er kopla til ei belastning på 1,0 Ω.",
                            "formulas": [
                                "I = 4.2 V / 1.0 Ω = 4.2 A"
                            ],
                            "conclusion": "Straumen i belastninga er 4,2 A."
                        },
                        {
                            "title": "Finn motstanden",
                            "setup": "Ein krins har 12 V over seg og trekkjer 2 A.",
                            "formulas": [
                                "R = 12 V / 2 A = 6 Ω"
                            ],
                            "conclusion": "Motstanden i kretsen er 6 Ω."
                        },
                        {
                            "title": "Finn spenninga",
                            "setup": "Ein straum på 0,5 A går gjennom ein motstand på 10 Ω.",
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
                        "Ohms lov kan kombinerast med samanhengen for effekt, P = V × I. Effekt P blir målt i watt (W). For ei kjelde på 4,2 V og ei belastning på 1,0 Ω er den ideelle effekten 17,64 W. Komponenten må ha tilstrekkeleg varmekapasitet og reserve til å leie bort varmen som oppstår, på ein trygg måte."
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
                        "Ohms lov er ein idealisert modell. Verkelege komponentar kan vere ikkje-ohmske: Motstanden kan endre seg med temperatur, spenning, straum, frekvens eller driftstilstand. For serie- og parallellkrinsar brukar du Kirchhoffs lover saman med Ohms lov."
                    ]
                }
            ],
            "wikipediaUrl": "https://nb.wikipedia.org/wiki/Ohms_lov"
        },
        "concept-joule-heating": {
            "displayName": "Joule-oppvarming",
            "description": "Joule-oppvarming skildrar korleis elektrisk energi blir til varme når straum går gjennom motstand.",
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
                            "title": "Ei resistiv belastning",
                            "setup": "Ei spole på 0,8 Ω fører 3 A.",
                            "formulas": [
                                "P = I^2 × R = 3^2 × 0,8 = 7,2 W",
                                "E = P × t = 7,2 W × 10 s = 72 J"
                            ],
                            "conclusion": "Spolen omdannar energi til varme med 7,2 joule per sekund, eller 72 J på 10 sekund."
                        }
                    ]
                },
                {
                    "id": "what-affects-heating",
                    "title": "Kva påverkar oppvarminga",
                    "bullets": [
                        "Ved konstant motstand gir ei dobling av straumen fire gonger så stor oppvarmingseffekt.",
                        "Ved konstant straum gjer ei dobling av motstanden at oppvarmingseffekten blir dobla.",
                        "Ved konstant spenning øker oppvarmingseffekten når motstanden reduseres.",
                        "Varmeoverføring til luft, væske og maskinvare bestemmer den faktiske temperaturen."
                    ],
                    "paragraphs": [
                        "Elektrisk effekt er ein energioverføringsrate, ikkje ein temperatur. Varmekapasitet og varmestraum bestemmer korleis energien endrar temperaturen, og kor raskt han forlèt overflata."
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
            "description": "Kirchhoffs straum- og spenningslover skildrar bevaring av straum i krinsknutepunkt og av "
                + "spenning i lukka sløyfer.",
            "summary": "Korleis straum og spenning oppfører seg i samankopla krinsar.",
            "sections": [
                {
                    "id": "circuit-terms",
                    "title": "Krinstermar",
                    "paragraphs": [
                        "Dei grunnleggjande termane gjer det enklare å tolke eit krinsskjema:"
                    ],
                    "bullets": [
                        "Ein node er eit sett leiarar som er kopla saman utan ein komponent mellom dei.",
                        "Ei grein er ein straumveg mellom to nodar.",
                        "Ei sløyfe er ein lukka veg som kjem tilbake til utgangspunktet.",
                        "Ei seriekopling gir straumen berre éin veg gjennom komponentane.",
                        "Ei parallellkopling koplar greinene til dei same to nodane."
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
                        "Viss 8 A går inn i ein node og éi grein fører 3 A ut, må dei resterande greinene føre til "
                            + "saman 5 A ut. Vel straumretningar før du reknar; eit negativt resultat betyr at den "
                            + "verkelege straumen går motsett veg av den antatte retninga."
                    ]
                },
                {
                    "id": "series-and-parallel",
                    "title": "Serie- og parallellkrinsar",
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
                            "title": "Seriekopla motstandar",
                            "setup": "To motstandar på 0,20 Ω blir kopla i serie til 8,0 V.",
                            "formulas": [
                                "R_total = 0,40 Ω",
                                "I = 8,0 V / 0,40 Ω = 20 A"
                            ],
                            "conclusion": "Den same straumen på 20 A går gjennom begge motstandane."
                        },
                        {
                            "title": "Parallellkopla motstandar",
                            "setup": "To like greiner på 0,40 Ω blir kopla til 4,0 V.",
                            "formulas": [
                                "R_total = 0,20 Ω",
                                "I_total = 4,0 V / 0,20 Ω = 20 A"
                            ],
                            "conclusion": "Når greinmotstandane er like, fører kvar grein 10 A."
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
                        "Den algebraiske summen av spenningsaukar og spenningsfall rundt ei lukka sløyfe er null. "
                            + "Vel éi sløyferetning og hald polaritetane konsekvente. Viss du snur retninga, "
                            + "endrar fortegna seg, ikkje den fysiske løysinga. Ein større seriemotstand gir eit "
                            + "større spenningsfall fordi den same straumen går gjennom alle seriekopla komponentane."
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
                        "Seriekopla celler legg saman spenninga, medan kapasiteten i amperetimar svarar til éi "
                            + "tilsvarande celle.",
                        "Parallellkopla celler held på same spenning, medan kapasitet og tilgjengeleg straum om lag "
                            + "blir summert.",
                        "Straumfordelinga avheng av indre motstand, kontaktar, leidningar og brytarar.",
                        "Seriekopla litiumioneceller krev overvaking på cellenivå og eigna balansering eller vern."
                    ]
                },
                {
                    "id": "solving-and-limits",
                    "title": "Løysing av verkelege krinsar",
                    "bullets": [
                        "Merk spenningane i nodane, greinstraumane og dei antatte straumretningane.",
                        "Bruk KCL i uavhengige nodar og KVL rundt uavhengige sløyfer.",
                        "Knyt spenning og straum i motstandar saman med V = I × R.",
                        "Løys dei samtidige likningane og kontroller effektbalansen."
                    ],
                    "paragraphs": [
                        "Ein forenkla modell kan utelate den indre motstanden i cella, kontaktmotstand, verknadsgraden "
                            + "til omformaren, temperatureffektar, transient åtferd, vernkrinsar og "
                            + "komponenttoleransar. Ta med all utelaten åtferd som påverkar ein krins med høg straum "
                            + "vesentleg."
                    ]
                }
            ],
            "wikipediaUrl": "https://nb.wikipedia.org/wiki/Kirchhoffs_lover"
        },
        "concept-temperature-coefficient-of-resistance": {
            "displayName": "Temperaturkoeffisient for motstand (TCR)",
            "description": "Temperaturkoeffisienten skildrar korleis motstanden i ein leiar endrar seg med "
                + "temperaturen.",
            "summary": "Korleis temperatur endrar motstanden i ein leiar.",
            "sections": [
                {
                    "id": "linear-model",
                    "title": "Den lineære modellen",
                    "paragraphs": [
                        "Ved ei lita eller moderat temperaturendring brukar vi dette førsteordensforholdet:"
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
                        "Temperaturane må bruke same skala og einingar for differansen T - T_0."
                    ]
                },
                {
                    "id": "positive-and-negative",
                    "title": "Positiv og negativ TCR",
                    "bullets": [
                        "Ein positiv TCR tyder at motstanden aukar når temperaturen stig; mange metall oppfører seg "
                            + "slik.",
                        "Ein negativ TCR tyder at motstanden søkk når temperaturen stig.",
                        "Ein TCR nær null tyder at motstanden endrar seg lite innanfor det oppgitte området.",
                        "Forteiknet til koeffisienten er viktig; viss ein negativ verdi blir erstatta med "
                            + "absoluttverdien, blir føreseiinga snudd."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Rekneeksempel",
                    "examples": [
                        {
                            "title": "Ein oppvarma motstand",
                            "setup": "Ein motstand på 1,00 Ω er spesifisert ved 20 °C, med ein TCR på 400 ppm/°C.",
                            "formulas": [
                                "α = 400 × 10^-6 / °C = 0,0004 / °C",
                                "ΔT = 100 - 20 = 80 °C",
                                "R_T = 1,00 [1 + 0,0004 × 80] = 1,032 Ω"
                            ],
                            "conclusion": "Den estimerte motstanden er 1,032 Ω, om lag 3,2 % høgare enn "
                                + "verdien ved 20 °C."
                        }
                    ]
                },
                {
                    "id": "power-and-limits",
                    "title": "TCR, effekt og praktiske avgrensingar",
                    "formulas": [
                        {
                            "expression": "I = V / R"
                        },
                        {
                            "expression": "P = V^2 / R = I^2 × R"
                        }
                    ],
                    "paragraphs": [
                        "For ein motstand med positiv TCR som blir driven med konstant spenning, aukar motstanden når "
                            + "temperaturen stig, og straumen har ein tendens til å søkkje. For ei "
                            + "konstantstraumskjelde aukar effekten når den same motstanden aukar.",
                        "Produsenten sin TCR gjeld normalt for eit oppgitt temperatur- og motstandsområde. "
                            + "Temperaturgradientar, materialendringar, kontaktar, mekanisk belastning og "
                            + "sjølvoppvarming kan gjere at eit verkeleg resultat avvik frå førsteordensestimatet."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Temperature_coefficient_of_resistance"
        },
        "concept-trigonometry": {
            "displayName": "Trigonometri",
            "description": "Trigonometri knyter saman vinklar, lengder og forhold i geometriske modellar.",
            "summary": "Vinkler, lengder og nyttige geometriske forhold.",
            "sections": [
                {
                    "id": "right-triangles",
                    "title": "Rettvinkla trekantar",
                    "paragraphs": [
                        "I høve til ein vinkel θ ligg den motståande sida på andre sida av vinkelen, den hosliggjande "
                            + "sida rører ved vinkelen utan å vere hypotenusen, og hypotenusen ligg mot den rette vinkelen. "
                            + "SOH-CAH-TOA er ein hugseregel: sinus er motståande side delt på hypotenusen, cosinus er "
                            + "hosliggjande side delt på hypotenusen, og tangens er motståande side delt på "
                            + "hosliggjande side."
                    ],
                    "formulas": [
                        {
                            "expression": "sin(θ) = motståande / hypotenuse"
                        },
                        {
                            "expression": "cos(θ) = hosliggjande / hypotenuse"
                        },
                        {
                            "expression": "tan(θ) = motståande / hosliggjande"
                        }
                    ]
                },
                {
                    "id": "finding-sides-and-angles",
                    "title": "Finn ukjende sider og vinklar",
                    "examples": [
                        {
                            "title": "Finn ei side",
                            "setup": "Ein hypotenus på 10 cm dannar ein vinkel på 30°.",
                            "formulas": [
                                "motstående = 10 × sin(30°) = 5 cm",
                                "hosliggende = 10 × cos(30°) ≈ 8,66 cm"
                            ],
                            "conclusion": "Bruk ein invers trigonometrisk funksjon når sidelengdene er kjende."
                        }
                    ],
                    "formulas": [
                        {
                            "expression": "θ = sin^-1(motståande / hypotenuse)"
                        },
                        {
                            "expression": "θ = cos^-1(hosliggjande / hypotenuse)"
                        },
                        {
                            "expression": "θ = tan^-1(motståande / hosliggjande)"
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
    materials: materialPresentationsFor(materialTexts, nynorskMaterialNames),
    batteries: batteryPresentationsFor(batteryTexts),
    mods: modPresentationsFor(modTexts)
});
