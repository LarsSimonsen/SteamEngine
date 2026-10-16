/* Machine-materialized draft. Human review may edit string values. */

import type { CatalogPresentationSet } from "../catalog-presentations";
import { batteryPresentationsFor, type BatteryTextDictionary } from "../battery-presentation-text";
import { modPresentationsFor, type ModTextDictionary } from "../mod-presentation-text";
import { materialPresentationsFor, type MaterialTextDictionary } from "../material-presentation-text";

export const batteryTexts: BatteryTextDictionary = {
    "battery.summary.removable": "Une cellule rechargeable amovible pour les appareils compatibles.",
    "battery.summary.integrated":
        "Une batterie interne intégrée à l'appareil, et non une cellule "
        + "remplaçable par l'utilisateur.",
    "battery.note.approvedResearch": "Approuvé le 2026-08-13 ; consulter la fiche de recherche associée.",
    "battery.note.capacityBelowLabel": "La capacité réelle est inférieure à celle indiquée sur l'étiquette.",
    "battery.note.battery-71.evidence": "Courant nominal de décharge en continu de 20 A ; "
        + "les valeurs de décharge par impulsions ne sont pas utilisées.",
    "battery.note.battery-77.evidence":
        "Valeur prudente de comparaison indépendante de 20 A ; "
        + "l'enveloppe exacte et la révision de production restent "
        + "pertinentes.",
    "battery.note.battery-78.evidence":
        "Valeur prudente de 15 A issue de tests sur le modèle exact ; "
        + "la révision testée portant la marque CCC reste pertinente.",
    "battery.note.battery-79.evidence":
        "Valeur de courant en continu de 45 A issue d'essais indépendants sur la révision tabless "
        + "testée ; ne la remplacez pas par une valeur de décharge par impulsions.",
    "battery.note.battery-80.evidence":
        "Valeur réelle de 36 A en continu ; la valeur de 56 A est "
        + "limitée par la température.",
    "battery.note.battery-81.evidence":
        "Valeur prudente de 40 A ; les cellules testées semblaient "
        + "être de préproduction et ne portaient pas le logo CCC.",
    "battery.note.battery-82.evidence":
        "Valeur recommandée de 13 A en continu ; 16,8 A est un "
        + "maximum absolu qui n'est pas destiné à préserver la durée de vie.",
    "battery.note.battery-83.evidence":
        "Valeur prudente de 40 A ; 70 A est limité par la "
        + "température et les échantillons testés étaient de préproduction.",
    "battery.note.battery-84.evidence":
        "Valeur de comparaison de 40 A pour une cellule de production ; "
        + "70 A nécessite un contrôle de la température.",
    "battery.note.battery-85.evidence":
        "Valeur de 40 A pour la version portant la gaine testée ; la valeur de 70 A est limitée à 60 "
        + "°C. Cette version a été testée comme une cellule EVE 40PL réenveloppée.",
    "battery.note.battery-86.evidence":
        "Valeur prudente de 19 A ; les échantillons exacts testés "
        + "semblaient être de préproduction et n'avaient pas de marque CCC.",
    "battery.note.battery-87.evidence":
        "Valeur prudente de 40 A ; 90 A est limité par la "
        + "température et les cellules testées semblaient être de préproduction.",
    "battery.note.battery-88.evidence":
        "Valeur prudente de 40 A ; 60 A est limité par la température "
        + "et la continuité de production reste à résoudre.",
    "battery.note.battery-89.evidence":
        "Valeur prudente de 40 A ; les échantillons testés avaient "
        + "une capacité irrégulière et ne portaient pas les marques CCC/CE.",
    "battery.note.battery-90.evidence":
        "Valeur prudente de 13 A ; les échantillons exacts testés "
        + "semblaient être de préproduction et n'avaient pas de marque CCC.",
    "battery.note.battery-91.evidence":
        "Valeur de 30 A en continu estimée par le testeur ; le maximum "
        + "de 50 A de Reliance est limité par la température.",
    "battery.note.battery-92.evidence":
        "Valeur de 20 A en continu provenant de deux lots testés liés "
        + "à la production ; 30 A est limité par la température.",
    "battery.note.battery-93.evidence":
        "12 A en continu ; 20 A est réservé aux impulsions. "
        + "L'enveloppe exacte testée est répertoriée comme SA110 / "
        + "INR18650/40.",
    "battery.note.battery-94.evidence":
        "Valeur de 20 A pour l'enveloppe exacte ; le testeur recommande "
        + "moins de 15 A en continu. Vapehuset annonce 25 A dans son titre, "
        + "et les révisions ultérieures de l'approvisionnement ou de l'enveloppe peuvent différer.",
    "battery.note.battery-95.evidence":
        "Valeur de 30 A pour le modèle exact ; il s'agit d'une cellule réenveloppée, et les versions "
        + "ultérieures de l'enveloppe ou la provenance de la cellule peuvent différer.",
    "battery.note.battery-96.evidence":
        "Valeur de 30 A pour la révision exacte à cinq pattes ; les "
        + "révisions à quatre pattes et ultérieures utilisant la même "
        + "enveloppe sont très différentes et ne doivent pas hériter de ce profil.",
    "battery.safety.lowDrain": "Batterie à faible courant de décharge ; ne convient pas au vapotage.",
};

export const materialTexts: MaterialTextDictionary = {
    "material.profile": (displayName) => "Profil de catalogue pour " + displayName + ".",
    "material.safety.verifiedProfile": "Utilisez un profil de matériau vérifié et respectez les limites de "
                + "température et de fonctionnement de l’appareil.",
};
export const modTexts: ModTextDictionary = {
    "mod.profile.regulated": (displayName) => "Profil d'appareil de vapotage régulé pour "
        + displayName + ".",
    "mod.preset-9.profile":
        "Billet Box Rev. 3a avec une finition en aluminium anodisé "
        + "brillant et microbillé ; introduit en mai 2014.",
    "mod.preset-10.profile":
        "Un appareil Cloupor 30 W utilisant un chipset clone tiers "
        + "de style DNA30, et non une carte Evolv DNA-30D "
        + "authentique.",
    "mod.preset-231.profile":
        "Mod régulé double 21700 avec adaptateurs 18650 ; VAPORESSO l'annonce à 220 W ; les essais "
        + "ont mesuré 208 W, 8,979 V et 39 A.",
    "mod.preset-234.profile":
        "Mod régulé double 18650 ; VAPORESSO l'annonce à 220 W ; les essais ont mesuré 215 W, 9,08 V "
        + "et 37 A.",
    "mod.preset-235.profile":
        "Mod régulé à batterie intégrée annoncé à 100 W ; les essais ont mesuré 101 W, 29 A et au "
        + "moins 7,97 V.",
    "mod.preset-236.profile":
        "Mod régulé à accu 18650 unique utilisant l'AS Chip 4.0 ; le profil du fabricant indique 100 "
        + "W, 7,5 V, 32 A, 0,1–3 Ω.",
    "mod.preset-237.profile":
        "Mod à cellule unique 21700 avec adaptateur 18650 ; Eleaf indique 100 W, 9 V, 0,05–3,5 Ω ; "
        + "les essais ont relevé 30 A.",
    "mod.preset-238.profile":
        "Mod squonk régulé à cellule unique pour accus 21700, 20700 "
        + "ou adaptés 18650, avec un profil prudent de 95 W, 6 V et "
        + "34 A.",
};

export const presentations: CatalogPresentationSet = {
    "concepts": {
        "concept-ohms-law": {
            "displayName": "La loi d'Ohm",
            "description": "La loi d'Ohm relie la tension, le courant et la résistance dans un circuit électrique.",
            "summary": "La relation entre la tension, le courant et la résistance.",
            "sections": [
                {
                    "id": "relationship",
                    "title": "La relation",
                    "paragraphs": [
                        "La relation de base est utile lorsque la résistance d'un composant est approximativement constante."
                    ],
                    "formulas": [
                        {
                            "expression": "V = I × R"
                        }
                    ],
                    "bullets": [
                        "V est la tension, mesurée en volts (V).",
                        "I est le courant, mesuré en ampères ou ampères (A).",
                        "R est la résistance, mesurée en ohms (\\u03a9)."
                    ]
                },
                {
                    "id": "rearranged-formulas",
                    "title": "Formules réarrangées",
                    "paragraphs": [
                        "Utilisez la version qui met la valeur que vous souhaitez rechercher à gauche :"
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
                        "L'augmentation de la tension augmente le courant lorsque la résistance reste la même.",
                        "L'augmentation de la résistance diminue le courant lorsque la tension reste la même.",
                        "Une résistance de zéro \\u03a9 est un court-circuit idéal et doit être traitée séparément."
                    ]
                },
                {
                    "id": "worked-examples",
                    "title": "Exemples résolus",
                    "examples": [
                        {
                            "title": "Trouver le courant",
                            "setup": "Une source de 4,2 V est connectée à une charge de 1,0 \\u03a9.",
                            "formulas": [
                                "I = 4,2 V / 1,0 \\u03a9 = 4,2 A"
                            ],
                            "conclusion": "Le courant traversant la charge est de 4,2 A."
                        },
                        {
                            "title": "Trouver de la résistance",
                            "setup": "Un circuit est alimenté par 12 V et consomme 2 A.",
                            "formulas": [
                                "R = 12 V / 2 A = 6 = 9"
                            ],
                            "conclusion": "La résistance du circuit est de 6 = 9."
                        },
                        {
                            "title": "Trouver la tension",
                            "setup": "Un courant de 0,5 A traverse une résistance de 10 \\u03a9.",
                            "formulas": [
                                "V = 0,5 A × 10 Ω = 5 V"
                            ],
                            "conclusion": "La tension est de 5 V."
                        }
                    ]
                },
                {
                    "id": "electrical-power",
                    "title": "Énergie électrique",
                    "formulas": [
                        {
                            "expression": "P = V × I = I^2 × R = V^2 / R"
                        }
                    ],
                    "paragraphs": [
                        "La loi d'Ohm se combine avec la relation de puissance P = V × I. La puissance P se mesure en watts (W). Pour une source de 4,2 V et une charge de 1,0 Ω, la puissance idéale est de 17,64 W. Le composant a besoin d'une capacité thermique et d'une marge suffisantes pour dissiper la chaleur résultante en toute sécurité."
                    ]
                },
                {
                    "id": "unit-conversions",
                    "title": "Conversions d'unités",
                    "paragraphs": [
                        "Gardez les unités cohérentes avant de calculer :"
                    ],
                    "bullets": [
                        "1 k\\u03a9 = 1 000 \\u03a9",
                        "1 M\\u03a9 = 1 000 000 \\u03a9",
                        "1 mA = 0,001 A",
                        "1 W = 1 000 mW"
                    ]
                },
                {
                    "id": "limits",
                    "title": "Limites du modèle",
                    "paragraphs": [
                        "La loi d'Ohm est un modèle idéalisé. Les composants réels peuvent être non ohmiques : leur résistance peut changer en fonction de la température, de la tension, du courant, de la fréquence ou de l'état de fonctionnement. Pour les réseaux série et parallèle, utilisez les lois de Kirchhoff ainsi que la loi d'Ohm."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Ohm%27s_law"
        },
        "concept-joule-heating": {
            "displayName": "Effet Joule",
            "description": "L'effet Joule désigne la conversion de l'énergie électrique en chaleur lorsqu'un "
            + "courant traverse une résistance.",
            "summary": "Comment le courant électrique transforme la résistance en chaleur.",
            "sections": [
                {
                    "id": "heating-power",
                    "title": "Puissance de chauffage",
                    "paragraphs": [
                        "La puissance électrique de chauffage est de :"
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
                        "P est la puissance en watts (W).",
                        "V est la tension en volts (V).",
                        "I est le courant en ampères (A)."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Exemple résolu",
                    "examples": [
                        {
                            "title": "Une charge résistive",
                            "setup": "Une bobine de 0,8 \\u03a9 transporte 3 A.",
                            "formulas": [
                                "P = I ^ 2 × R = 3 ^ 2 × 0,8 = 7,2 W",
                                "E = P × t = 7,2 W × 10 s = 72 J"
                            ],
                            "conclusion": "La bobine convertit l'énergie en chaleur à 7,2 joules par seconde, soit 72 J sur 10 secondes."
                        }
                    ]
                },
                {
                    "id": "what-affects-heating",
                    "title": "Qu'est-ce qui affecte le chauffage",
                    "bullets": [
                        "À résistance constante, le doublement du courant produit quatre fois la puissance de chauffage.",
                        "À courant constant, doubler la résistance double la puissance de chauffage.",
                        "À tension constante, diminuer la résistance augmente la puissance de chauffage.",
                        "Le transfert de chaleur vers l'air, le liquide et le matériel détermine la température réelle."
                    ],
                    "paragraphs": [
                        "L’énergie électrique est un taux de transfert d’énergie et non une température. La capacité thermique et le flux thermique déterminent la manière dont cette énergie change de température et la rapidité avec laquelle elle quitte la surface."
                    ]
                },
                {
                    "id": "practical-checks",
                    "title": "Vérifications pratiques",
                    "paragraphs": [
                        "Vérifiez que les composants, les connexions et l'isolation peuvent gérer le courant et la puissance attendus. Utilisez une marge appropriée car les composants réels peuvent chauffer de manière inégale et la résistance peut changer avec la température. Les batteries et les alimentations ont également des limites de courant continu."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Joule_heating"
        },
        "concept-kirchhoffs-laws": {
            "displayName": "Les lois de Kirchhoff",
            "description": "Les lois de Kirchhoff sur le courant et la tension décrivent la conservation au niveau des nœuds du circuit et autour des boucles fermées.",
            "summary": "Comment se comportent le courant et la tension dans les circuits connectés.",
            "sections": [
                {
                    "id": "circuit-terms",
                    "title": "Termes de circuit",
                    "paragraphs": [
                        "Les termes de base facilitent le raisonnement sur un schéma de circuit :"
                    ],
                    "bullets": [
                        "Un nœud est un ensemble de conducteurs connectés sans composant intermédiaire.",
                        "Une branche est un chemin actuel entre deux nœuds.",
                        "Une boucle est un chemin fermé qui revient à son point de départ.",
                        "Une connexion en série ne donne au courant qu'un seul chemin à travers les composants.",
                        "Une connexion parallèle relie les branches aux deux mêmes nœuds."
                    ]
                },
                {
                    "id": "current-law",
                    "title": "La loi actuelle de Kirchhoff",
                    "formulas": [
                        {
                            "expression": "Σ I = 0"
                        },
                        {
                            "expression": "Σ I_in = Σ I_out"
                        }
                    ],
                    "paragraphs": [
                        "Si 8 A entrent dans un nœud et qu'une branche en sort 3 A, les autres branches doivent transporter ensemble 5 A vers l'extérieur. Choisissez les sens des courants avant de résoudre ; un résultat négatif signifie que le courant réel circule dans le sens opposé à celui supposé."
                    ]
                },
                {
                    "id": "series-and-parallel",
                    "title": "Circuits en série et en parallèle",
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
                            "title": "Résistances en série",
                            "setup": "Deux résistances de 0,20 Ω en série sont connectées à 8,0 V.",
                            "formulas": [
                                "R_total = 0,40 Ω",
                                "I = 8,0 V / 0,40 Ω = 20 A"
                            ],
                            "conclusion": "Le même courant de 20 A traverse les deux résistances."
                        },
                        {
                            "title": "Résistances en parallèle",
                            "setup": "Deux branches égales de 0,40 Ω sont connectées à 4,0 V.",
                            "formulas": [
                                "R_total = 0,20 Ω",
                                "I_total = 4,0 V / 0,20 Ω = 20 A"
                            ],
                            "conclusion": "Avec des résistances de branche égales, chaque branche transporte 10 A."
                        }
                    ]
                },
                {
                    "id": "voltage-law",
                    "title": "Loi des mailles de Kirchhoff",
                    "formulas": [
                        {
                            "expression": "Σ V = 0"
                        },
                        {
                            "expression": "+8.0 V - V_1 - V_2 = 0"
                        },
                        {
                            "expression": "V_total = V_1 = V_2 = ... (parallel branches)"
                        }
                    ],
                    "paragraphs": [
                        "La somme algébrique des élévations et des chutes de tension autour d'une boucle fermée est nulle. Choisissez un sens de parcours et gardez des polarités cohérentes. Inverser le sens change les signes, mais pas la solution physique. Une résistance série plus grande provoque une chute de tension plus importante, car le même courant traverse chaque composant en série."
                    ]
                },
                {
                    "id": "cells",
                    "title": "Cellules en série et en parallèle",
                    "formulas": [
                        {
                            "expression": "V_pack = V_1 + V_2 + ... (series)"
                        },
                        {
                            "expression": "C_pack = C_1 + C_2 + ... (parallel)"
                        }
                    ],
                    "bullets": [
                        "Les cellules en série additionnent la tension, tandis que la capacité en ampères-heures reste celle d'une cellule équivalente.",
                        "Les cellules en parallèle gardent la même tension, tandis que la capacité et le courant disponible s'additionnent approximativement.",
                        "Le partage du courant dépend de la résistance interne, des contacts, du câblage et des interrupteurs.",
                        "La charge des cellules lithium-ion en série exige une surveillance au niveau de chaque cellule et un équilibrage ou une protection appropriés."
                    ]
                },
                {
                    "id": "solving-and-limits",
                    "title": "Résolution de circuits réels",
                    "bullets": [
                        "Indiquez les tensions des nœuds, les courants de branche et les sens de courant supposés.",
                        "Appliquez la loi des nœuds aux nœuds indépendants et la loi des mailles aux boucles indépendantes.",
                        "Reliez la tension et le courant d'une résistance avec V = I × R.",
                        "Résolvez les équations simultanées et vérifiez le bilan de puissance."
                    ],
                    "paragraphs": [
                        "Un modèle simplifié peut omettre la résistance interne des cellules, la résistance des contacts, le rendement du convertisseur, les effets de température, les phénomènes transitoires, les circuits de protection et les tolérances des composants. Intégrez tout comportement omis qui influence sensiblement un circuit à fort courant."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Kirchhoff%27s_circuit_laws"
        },
        "concept-temperature-coefficient-of-resistance": {
            "displayName": "Coefficient de température de la résistance (TCR)",
            "description": "Le coefficient de température de résistance estime la façon dont la résistance change à mesure qu'un matériau chauffe ou refroidit.",
            "summary": "Comment la résistance d'un matériau change avec la température.",
            "sections": [
                {
                    "id": "linear-model",
                    "title": "Le modèle linéaire",
                    "paragraphs": [
                        "Pour un changement de température faible ou modéré, utilisez la relation du premier ordre :"
                    ],
                    "formulas": [
                        {
                            "expression": "R_T = R_0 [1 + \\u03b1 (T - T_0)]"
                        }
                    ],
                    "bullets": [
                        "R_0 est la résistance à la température de référence T_0.",
                        "R_T est la résistance estimée à la température T.",
                        "\\u03b1 est le coefficient de température du matériau, exprimé en 1/°C ou ppm/°C.",
                        "Les températures doivent utiliser la même échelle et les mêmes unités pour la différence T - T_0."
                    ]
                },
                {
                    "id": "positive-and-negative",
                    "title": "TCR positif et négatif",
                    "bullets": [
                        "Un TCR positif signifie que la résistance augmente à mesure que la température augmente ; de nombreux métaux se comportent de cette façon.",
                        "Un TCR négatif signifie que la résistance diminue à mesure que la température augmente.",
                        "Un TCR proche de zéro signifie que la résistance change peu sur la plage spécifiée.",
                        "Le signe du coefficient compte ; remplacer une valeur négative par sa valeur absolue inverse la prédiction."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Exemple résolu",
                    "examples": [
                        {
                            "title": "Une résistance chauffée",
                            "setup": "Une résistance de 1,00 \\u03a9 est spécifiée à 20 \\u00b0C, avec un TCR de 400 ppm/\\u00b0C.",
                            "formulas": [
                                "\\u03b1 = 400 × 10^-6 / \\u00b0C = 0,0004 / \\u00b0C",
                                "\\u0394T = 100 - 20 = 80 \\u00b0C",
                                "R_T = 1,00 [1 + 0,0004 × 80] = 1,032 \\u03a9"
                            ],
                            "conclusion": "La résistance estimée est de 1,032 \\u03a9, soit environ 3,2% au-dessus de sa valeur à 20 \\u00b0C."
                        }
                    ]
                },
                {
                    "id": "power-and-limits",
                    "title": "TCR, puissance et limites pratiques",
                    "formulas": [
                        {
                            "expression": "I = V / R"
                        },
                        {
                            "expression": "P = V^2 / R = I^2 × R"
                        }
                    ],
                    "paragraphs": [
                        "Pour une résistance à TCR positif alimentée à tension constante, "
                        + "l'augmentation de la température augmente la résistance et tend à réduire "
                        + "le courant. Avec une source de courant constant, la même augmentation de "
                        + "résistance augmente la puissance.",
                        "Le TCR d'un fabricant s'applique normalement à une plage de température et de résistance indiquée. Les gradients de température, les changements de matériaux, les contacts, les contraintes mécaniques et l'auto-échauffement peuvent faire en sorte qu'un résultat réel diffère de l'estimation de premier ordre."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Temperature_coefficient_of_resistance"
        },
        "concept-trigonometry": {
            "displayName": "Trigonométrie",
            "description": "La trigonométrie relie les angles et les longueurs et est utile pour les vecteurs, les relations de phase et les formes d'onde.",
            "summary": "Relations entre les angles et les côtés des triangles.",
            "sections": [
                {
                    "id": "right-triangles",
                    "title": "Triangles rectangles",
                    "paragraphs": [
                        "Par rapport à un angle θ, le côté opposé lui fait face, le côté adjacent le touche à l'exclusion de l'hypoténuse et l'hypoténuse est opposée à l'angle droit. SOH-CAH-TOA est un aide-mémoire : le sinus est opposé au-dessus de l'hypoténuse, le cosinus est adjacent au-dessus de l'hypoténuse et la tangente est opposée au-dessus de l'adjacente."
                    ],
                    "formulas": [
                        {
                            "expression": "sin(θ) = opposite / hypotenuse"
                        },
                        {
                            "expression": "cos(θ) = adjacent / hypotenuse"
                        },
                        {
                            "expression": "tan(θ) = opposite / adjacent"
                        }
                    ]
                },
                {
                    "id": "finding-sides-and-angles",
                    "title": "Trouver des côtés et des angles inconnus",
                    "examples": [
                        {
                            "title": "Trouver un côté",
                            "setup": "Une hypoténuse de 10 cm rencontre un angle de 30°.",
                            "formulas": [
                                "ci-contre = 10 × sin(30°) = 5 cm",
                                "adjacent = 10 × cos(30°) ≈ 8,66 cm"
                            ],
                            "conclusion": "Utilisez une fonction trigonométrique inverse lorsque les longueurs des côtés sont connues."
                        }
                    ],
                    "formulas": [
                        {
                            "expression": "θ = sin^-1(opposite / hypotenuse)"
                        },
                        {
                            "expression": "θ = cos^-1(adjacent / hypotenuse)"
                        },
                        {
                            "expression": "θ = tan^-1(opposite / adjacent)"
                        }
                    ]
                },
                {
                    "id": "degrees-and-radians",
                    "title": "Degrés et radians",
                    "formulas": [
                        {
                            "expression": "180° = π radians"
                        },
                        {
                            "expression": "θ_rad = θ_deg × π / 180"
                        }
                    ],
                    "paragraphs": [
                        "Un calculateur doit être dans le mode angle correct. L’utilisation du mode degrés pour une valeur en radian, ou vice versa, produit un résultat différent. Un cycle complet fait 360° ou 2π radians."
                    ]
                },
                {
                    "id": "waveforms-and-identities",
                    "title": "Formes d'onde et identités utiles",
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
                        "A est l'amplitude, f est la fréquence en hertz, t est le temps en secondes et φ est l'angle de phase.",
                        "La fréquence angulaire ω est mesurée en radians par seconde.",
                        "Gardez le panneau et le quadrant lorsque la direction ou la phase est importante."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Trigonometry"
        },
        "concept-heat-capacity": {
            "displayName": "Capacité thermique",
            "description": "La capacité thermique relie l'énergie transférée au changement de température d'un objet ou d'un matériau.",
            "summary": "Quelle quantité d’énergie un objet a besoin pour changer de température.",
            "sections": [
                {
                    "id": "basic-relationships",
                    "title": "Relations de base",
                    "formulas": [
                        {
                            "expression": "C = Q / ΔT"
                        },
                        {
                            "expression": "Q = m × c × ΔT"
                        }
                    ],
                    "bullets": [
                        "C est la capacité thermique en J/K ou J/°C.",
                        "Q est l'énergie thermique transférée en joules (J).",
                        "m est la masse en kilogrammes et c est la capacité thermique massique en "
                        + "J/(kg·K).",
                        "Une différence de température de 1 K équivaut à une différence de 1 °C."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Exemple résolu",
                    "examples": [
                        {
                            "title": "Eau de chauffage",
                            "setup": "Chauffer 0,20 kg d'eau de 20 °C à 70 °C en utilisant c = 4 180 J/(kg·K).",
                            "formulas": [
                                "ΔT = 70 - 20 = 50 °C",
                                "Q = 0,20 × 4 180 × 50 = 41 800 J"
                            ],
                            "conclusion": "Le besoin énergétique idéal est de 41,8 kJ ; un vrai radiateur a besoin de plus à cause des pertes."
                        }
                    ]
                },
                {
                    "id": "electrical-heating",
                    "title": "Chauffage à l'énergie électrique",
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
                            "title": "Temps de chauffe idéal",
                            "setup": "Reprenez l'exemple nécessitant 41,8 kJ, avec une source de puissance "
                            + "constante de 100 W et sans pertes.",
                            "formulas": [
                                "t = 41 800 J / 100 W = 418 s"
                            ],
                            "conclusion": "Le temps idéal est d'environ 7,0 minutes ; avec un rendement de "
                            + "transfert de 80 %, il est d'environ 523 secondes."
                        }
                    ]
                },
                {
                    "id": "object-and-material",
                    "title": "Objet contre matériau",
                    "paragraphs": [
                        "La capacité thermique appartient à l’objet entier et dépend de la quantité de matière présente. La capacité thermique spécifique est une propriété matérielle. Doubler la masse double la capacité thermique pour le même matériau."
                    ],
                    "formulas": [
                        {
                            "expression": "C_total = Σ m_i × c_i"
                        }
                    ]
                },
                {
                    "id": "phase-changes-and-limits",
                    "title": "Changements de phase et limites pratiques",
                    "formulas": [
                        {
                            "expression": "Q = m × L"
                        }
                    ],
                    "paragraphs": [
                        "Lors de la fusion ou de l'ébullition, l'énergie fournie peut modifier "
                        + "l'état du matériau sans modifier sa température. L est la chaleur latente "
                        + "massique en J/kg.",
                        "L'équation simple suppose que la capacité thermique massique est à peu près "
                        + "constante. Les pertes de chaleur, la convection, le rayonnement, "
                        + "l'évaporation, la résistance thermique de contact et une température non "
                        + "uniforme peuvent faire différer le résultat réel du résultat idéal."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_capacity"
        },
        "concept-heat-flux": {
            "displayName": "Flux de chaleur",
            "description": "Le flux thermique décrit la rapidité avec laquelle la chaleur traverse une surface, indépendamment de la quantité totale de matériau emmagasinant la chaleur.",
            "summary": "Le taux de transfert de chaleur à travers une unité de surface.",
            "sections": [
                {
                    "id": "definition",
                    "title": "Définition",
                    "formulas": [
                        {
                            "expression": "q'' = Q_dot / A"
                        }
                    ],
                    "bullets": [
                        "q'' est le flux thermique en W/m².",
                        "Q_dot est le taux de transfert de chaleur total en watts (W).",
                        "A est la surface à travers laquelle la chaleur est transférée en mètres carrés (m²)."
                    ],
                    "paragraphs": [
                        "La densité de flux thermique se distingue de la capacité thermique : cette "
                        + "dernière décrit l'énergie stockée par unité de variation de température, "
                        + "tandis que la densité de flux thermique décrit la puissance thermique "
                        + "transférée par unité de surface."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Exemple résolu",
                    "examples": [
                        {
                            "title": "Flux de chauffage moyen",
                            "setup": "Un élément chauffant de 100 W transfère de la chaleur à travers une "
                            + "surface de 0,020 m².",
                            "formulas": [
                                "q'' = 100 W / 0,020 m² = 5 000 W/m²"
                            ],
                            "conclusion": "Le flux thermique moyen est de 5 000 W/m², soit 0,5 W/cm²."
                        }
                    ]
                },
                {
                    "id": "conduction",
                    "title": "Conduction à travers une couche plate",
                    "formulas": [
                        {
                            "expression": "q'' = -k × ΔT / L"
                        },
                        {
                            "expression": "Q_dot = k × A × (T_hot - T_cold) / L"
                        }
                    ],
                    "bullets": [
                        "k est la conductivité thermique en W/(m·K).",
                        "ΔT est la différence de température à travers la couche.",
                        "L est l'épaisseur de la couche en mètres.",
                        "Le signe moins indique un flux d’une température plus élevée vers une température plus basse."
                    ]
                },
                {
                    "id": "convection-and-radiation",
                    "title": "Convection et rayonnement",
                    "formulas": [
                        {
                            "expression": "q'' = h × (T_s - T_∞)"
                        },
                        {
                            "expression": "q'' = ε × σ × (T_s^4 - T_sur^4)"
                        }
                    ],
                    "paragraphs": [
                        "La convection utilise un coefficient de surface h. Le rayonnement utilise l'émissivité ε et la constante de Stefan – Boltzmann σ ; les températures dans l’équation de rayonnement doivent être des températures absolues en kelvin."
                    ]
                },
                {
                    "id": "practical-checks",
                    "title": "Vérifications pratiques",
                    "bullets": [
                        "Convertissez la surface en m² avant d'utiliser W/m².",
                        "Distinguer le flux thermique moyen d'un pic local ; le chauffage peut être inégal.",
                        "Incluez la résistance de contact, la convection, le rayonnement et la perte de chaleur si nécessaire.",
                        "Le flux thermique est un taux de transfert, pas une température ; utiliser la capacité thermique pour le changement de température."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_flux"
        },
        "concept-si-system-and-imperial-units": {
            "displayName": "Le système SI et les mesures impériales",
            "description": "Le Système international d'unités fournit des unités de base cohérentes, des unités dérivées et une échelle décimale pour l'ingénierie.",
            "summary": "Les unités, préfixes et conversions utilisés dans les calculs techniques.",
            "sections": [
                {
                    "id": "base-units",
                    "title": "Unités SI communes",
                    "table": {
                        "headers": [
                            "Grandeur",
                            "Unité SI",
                            "Symbole"
                        ],
                        "rows": [
                            [
                                "Longueur",
                                "mètre",
                                "m"
                            ],
                            [
                                "Messe",
                                "kilogramme",
                                "kilos"
                            ],
                            [
                                "Temps",
                                "deuxième",
                                "s"
                            ],
                            [
                                "Température",
                                "Kelvin",
                                "K"
                            ],
                            [
                                "Courant électrique",
                                "ampère",
                                "Un"
                            ],
                            [
                                "Quantité de matière",
                                "taupe",
                                "mole"
                            ],
                            [
                                "Intensité lumineuse",
                                "candela",
                                "cd"
                            ]
                        ]
                    },
                    "bullets": [
                        "Tension : volts (V).",
                        "Résistance : ohm (\\u03a9).",
                        "Puissance : watts (W).",
                        "Énergie : joule (J).",
                        "Force : newton (N).",
                        "Pression : pascal (Pa).",
                        "Fréquence : Hertz (Hz)."
                    ]
                },
                {
                    "id": "decimal-prefixes",
                    "title": "Préfixes décimaux",
                    "table": {
                        "headers": [
                            "Préfixe",
                            "Symbole",
                            "Facteur"
                        ],
                        "rows": [
                            [
                                "kilo",
                                "k",
                                "1 000 = 10 ^ 3"
                            ],
                            [
                                "méga",
                                "M.",
                                "1 000 000 = 10 ^ 6"
                            ],
                            [
                                "milli",
                                "m",
                                "0,001 = 10^-3"
                            ],
                            [
                                "micro",
                                "µ",
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
                        "Par exemple, 2,2 k\\u03a9 est égal à 2 200 \\u03a9 et 15 mA est égal à 0,015 A. Convertissez les valeurs en unités compatibles avant d'utiliser une formule."
                    ]
                },
                {
                    "id": "length-conversions",
                    "title": "Pouces et longueur métrique",
                    "formulas": [
                        {
                            "expression": "1 inch = 25.4 mm = 0.0254 m"
                        },
                        {
                            "expression": "1 foot = 12 inches = 0.3048 m"
                        },
                        {
                            "expression": "1 yard = 3 feet = 0.9144 m"
                        },
                        {
                            "expression": "1 in² = 645.16 mm²"
                        }
                    ],
                    "examples": [
                        {
                            "title": "Convertir la longueur",
                            "setup": "Convertissez 0,1 pouce en millimètres et 5 mm en pouces.",
                            "formulas": [
                                "0,1 pouce × 25,4 = 2,54 mm",
                                "5 mm / 25,4 ≈ 0,19685 pouces"
                            ],
                            "conclusion": "Les conversions de surface et de volume utilisent le facteur de longueur élevé à la puissance appropriée."
                        }
                    ]
                },
                {
                    "id": "other-conversions",
                    "title": "Autres conversions courantes",
                    "bullets": [
                        "1 livre ≈ 0,45359237 kg.",
                        "1 lb ≈ 4,44822 N.",
                        "1 psi ≈ 6 894,76 Pa.",
                        "°F = °C × 9/5 + 32.",
                        "°C = (°F - 32) × 5/9.",
                        "K = °C + 273,15."
                    ],
                    "paragraphs": [
                        "Une livre peut désigner une masse (lb) ou une force (lbf), qui sont des "
                        + "grandeurs différentes. De même, les pouces, les pouces carrés et les pouces "
                        + "cubes mesurent des grandeurs de dimensions différentes."
                    ]
                },
                {
                    "id": "unit-checks",
                    "title": "Vérifications pratiques des unités",
                    "bullets": [
                        "Écrivez l'unité à côté de chaque valeur pendant le calcul.",
                        "Confirmez que les deux côtés d’une équation ont des dimensions compatibles.",
                        "Convertissez avant de multiplier ou de diviser.",
                        "Arrondissez uniquement à la fin afin que les résultats intermédiaires conservent une précision utile."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/International_System_of_Units"
        },
        "concept-wire-gauges-awg-swg-bwg": {
            "displayName": "Calibres de fil : AWG, SWG et BWG",
            "description": "Un numéro de calibre décrit une taille nominale uniquement lorsque son système de calibre est nommé.",
            "summary": "Pourquoi les numéros de calibre des fils nécessitent un système nommé et un diamètre déclaré.",
            "sections": [
                {
                    "id": "gauge-systems",
                    "title": "Systèmes de jauge",
                    "bullets": [
                        "AWG est l'American Wire Gauge, également connu historiquement sous le nom de jauge Brown & Sharpe.",
                        "SWG est Standard Wire Gauge, le système britannique historique d'épaisseur de fil et de tôle.",
                        "BWG est Birmingham Wire Gauge, historiquement utilisé pour l'épaisseur du fil de fer, des tubes et des tôles.",
                        "Un numéro de calibre ordinaire plus grand signifie généralement un diamètre plus petit ; les tailles supérieures à la jauge 0 utilisent 00, 000 ou 0000."
                    ],
                    "paragraphs": [
                        "SWG et BWG sont des systèmes tabulés et ne doivent pas être calculés avec la formule AWG. Le même numéro n’identifie donc pas le même diamètre dans tous les systèmes."
                    ]
                },
                {
                    "id": "awg-formula",
                    "title": "Diamètre et section en AWG",
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
                        "Pour 1/0, 2/0, 3/0 et 4/0, utilisez n = 0, -1, -2 et -3. AWG détermine la taille du conducteur, et non un courant de sécurité universel ; l'intensité admissible dépend également du matériau, de l'isolation, du refroidissement, de l'installation et des règles électriques applicables."
                    ]
                },
                {
                    "id": "system-comparison",
                    "title": "Pourquoi le nom du système est important",
                    "table": {
                        "headers": [
                            "Jauge",
                            "AWG",
                            "SWG britannique",
                            "GTB"
                        ],
                        "rows": [
                            [
                                "10",
                                "2,588 millimètres",
                                "3,251 millimètres",
                                "3,404 millimètres"
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
                        "Ces valeurs sont nominales. Les tolérances du produit, les revêtements, l'isolation et la construction toronnée peuvent modifier le diamètre mesuré ou global."
                    ]
                },
                {
                    "id": "resistance",
                    "title": "Calibre, section et résistance",
                    "formulas": [
                        {
                            "expression": "R = ρ × L / A"
                        }
                    ],
                    "paragraphs": [
                        "La résistance dépend de la longueur du conducteur L, de la section transversale A et de la résistivité du matériau ρ. Étant donné que la surface varie en fonction du carré de diamètre, une légère différence de diamètre peut entraîner une différence de résistance substantielle. En AWG, l'augmentation de la jauge de trois tailles réduit environ de moitié la surface et double la résistance par unité de longueur pour le même matériau et la même température."
                    ]
                },
                {
                    "id": "practical-specification",
                    "title": "Spécification pratique",
                    "bullets": [
                        "Nommez le système, par exemple 24 AWG ou 24 British SWG.",
                        "Incluez le diamètre nominal en millimètres lorsque les systèmes peuvent être confondus.",
                        "Précisez si la dimension indiquée est le diamètre du conducteur nu, le "
                        + "diamètre avec isolant, l'épaisseur de la tôle ou l'épaisseur de la paroi du "
                        + "tube.",
                        "Pour les conducteurs multibrins, incluez la construction de torons lorsque la flexibilité et le diamètre global comptent.",
                        "Déterminez la capacité actuelle à partir des données du produit et des règles électriques, et non à partir du seul numéro de jauge."
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
