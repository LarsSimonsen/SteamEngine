/* Machine-materialized draft. Human review may edit string values. */

import type { CatalogPresentationSet } from "../catalog-presentations";

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
                    "title": "Exemples travaillés",
                    "examples": [
                        {
                            "title": "Trouver le courant",
                            "setup": "Une source de 4,2 V est connectée à une charge de 1,0 \\u03a9.",
                            "formulas": [
                                "I = 4,2 V / 1,0 \\u03a9 = 4,2 A"
                            ],
                            "conclusion": "Le courant de charge est de 4,2 A."
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
            "displayName": "Chauffage Joule",
            "description": "Le chauffage Joule décrit la conversion de l’énergie électrique en chaleur lorsque le courant traverse une résistance.",
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
                    "title": "Exemple travaillé",
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
                    "title": "Loi des tensions de Kirchhoff",
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
            "displayName": "Coefficient de température de résistance (TCR)",
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
                    "title": "Exemple travaillé",
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
                        "Pour une résistance TCR positive pilotée à tension constante, l’augmentation de la température augmente la résistance et tend à réduire le courant. Pour une source de courant constant, la même augmentation de résistance augmente la puissance.",
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
                        "m est la masse en kilogrammes et c est la capacité thermique spécifique en J/(kg·K).",
                        "Une différence de température de 1 K équivaut à une différence de 1 °C."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Exemple travaillé",
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
                            "setup": "Chauffez l’exemple de 41,8 kJ avec une source constante de 100 W et aucune perte.",
                            "formulas": [
                                "t = 41 800 J / 100 W = 418 s"
                            ],
                            "conclusion": "Le temps idéal est d’environ 7,0 minutes ; avec une efficacité de transfert de 80 %, cela prend environ 523 secondes."
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
                        "Lors de la fusion ou de l'ébullition, l'énergie fournie peut modifier l'état du matériau sans modifier sa température. L est la chaleur latente spécifique en J/kg.",
                        "L'équation simple suppose que la chaleur spécifique est à peu près constante. La perte de chaleur, la convection, le rayonnement, l’évaporation, la résistance de contact et la température inégale peuvent faire en sorte qu’un résultat réel diffère de l’idéal."
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
                        "Le flux thermique est différent de la capacité thermique : la capacité thermique décrit l'énergie stockée par changement de température, tandis que le flux thermique décrit la vitesse à laquelle la chaleur traverse une surface."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Exemple travaillé",
                    "examples": [
                        {
                            "title": "Flux de chauffage moyen",
                            "setup": "Un radiateur de 100 W transfère la chaleur sur une surface de 0,020 m².",
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
                            "Quantité",
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
                                "Quantité de substance",
                                "taupe",
                                "mole"
                            ],
                            [
                                "Intensité lumineuse",
                                "bougie",
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
                        "Une livre peut faire référence à la masse (lb) ou à la force (lbf), qui sont des quantités différentes. De même, les pouces, les pouces carrés et les pouces cubes mesurent différentes dimensions."
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
                    "title": "Diamètre et surface AWG",
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
                    "title": "Jauge, surface et résistance",
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
                        "Indiquez si la dimension est un conducteur nu, un diamètre isolé, une épaisseur de tôle ou une épaisseur de paroi de tube.",
                        "Pour les conducteurs multibrins, incluez la construction de torons lorsque la flexibilité et le diamètre global comptent.",
                        "Déterminez la capacité actuelle à partir des données du produit et des règles électriques, et non à partir du seul numéro de jauge."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Wire_gauge"
        }
    },
    "materials": {
        "ka1": {
            "displayName": "Kanthal A1 / APM",
            "description": "Profil de catalogue pour Kanthal A1 / APM.",
            "summary": "Profil de catalogue pour Kanthal A1 / APM."
        },
        "ka": {
            "displayName": "Kanthal A / AE / AF",
            "description": "Profil de catalogue pour Kanthal A / AE / AF.",
            "summary": "Profil de catalogue pour Kanthal A / AE / AF."
        },
        "kd": {
            "displayName": "Kanthal D",
            "description": "Profil de catalogue pour Kanthal D.",
            "summary": "Profil de catalogue pour Kanthal D."
        },
        "n20": {
            "displayName": "Nichrome N20",
            "description": "Profil de catalogue pour Nichrome N20.",
            "summary": "Profil de catalogue pour Nichrome N20."
        },
        "n40": {
            "displayName": "Nichrome N40",
            "description": "Profil de catalogue pour Nichrome N40.",
            "summary": "Profil de catalogue pour Nichrome N40."
        },
        "n60": {
            "displayName": "Nichrome N60 (C)",
            "description": "Profil de catalogue pour Nichrome N60 (C).",
            "summary": "Profil de catalogue pour Nichrome N60 (C)."
        },
        "n70": {
            "displayName": "Nichrome N70 (B)",
            "description": "Profil de catalogue pour Nichrome N70 (B).",
            "summary": "Profil de catalogue pour Nichrome N70 (B)."
        },
        "n80": {
            "displayName": "Nichrome N80 (A)",
            "description": "Profil de catalogue pour Nichrome N80 (A).",
            "summary": "Profil de catalogue pour Nichrome N80 (A)."
        },
        "ss304": {
            "displayName": "SS 304",
            "description": "Profil de catalogue pour SS 304.",
            "summary": "Profil de catalogue pour SS 304."
        },
        "ss316": {
            "displayName": "SS 316",
            "description": "Profil de catalogue pour SS 316.",
            "summary": "Profil de catalogue pour SS 316."
        },
        "ss316l": {
            "displayName": "SS 316L / Elite",
            "description": "Profil de catalogue pour SS 316L / Elite.",
            "summary": "Profil de catalogue pour SS 316L / Elite."
        },
        "ss317l": {
            "displayName": "SS 317L / Haywire",
            "description": "Profil de catalogue pour SS 317L / Haywire.",
            "summary": "Profil de catalogue pour SS 317L / Haywire."
        },
        "ss430": {
            "displayName": "SS 430",
            "description": "Profil de catalogue pour SS 430.",
            "summary": "Profil de catalogue pour SS 430."
        },
        "ti1": {
            "displayName": "Titanium 1",
            "description": "Profil de catalogue pour Titanium 1.",
            "summary": "Profil de catalogue pour Titanium 1."
        },
        "ti2": {
            "displayName": "Titanium 2 (R50400)",
            "description": "Profil de catalogue pour Titanium 2 (R50400).",
            "summary": "Profil de catalogue pour Titanium 2 (R50400)."
        },
        "tie": {
            "displayName": "Titanium ready (e-SG)",
            "description": "Profil de catalogue pour Titanium ready (e-SG).",
            "summary": "Profil de catalogue pour Titanium ready (e-SG)."
        },
        "w": {
            "displayName": "Tungsten",
            "description": "Profil de catalogue pour Tungsten.",
            "summary": "Profil de catalogue pour Tungsten."
        },
        "nio": {
            "displayName": "Niobium alloy",
            "description": "Profil de catalogue pour Niobium alloy.",
            "summary": "Profil de catalogue pour Niobium alloy."
        },
        "ni200": {
            "displayName": "Nickel 200 / Ni200 (UNS N02200)",
            "description": "Profil de catalogue pour Nickel 200 / Ni200 (UNS N02200).",
            "summary": "Profil de catalogue pour Nickel 200 / Ni200 (UNS N02200)."
        },
        "nife30": {
            "displayName": "NiFe30 (Resistherm - TFR)",
            "description": "Profil de catalogue pour NiFe30 (Resistherm - TFR).",
            "summary": "Profil de catalogue pour NiFe30 (Resistherm - TFR)."
        },
        "dicodes": {
            "displayName": "NiFe30 (Resistherm - TCR)",
            "description": "Profil de catalogue pour NiFe30 (Resistherm - TCR).",
            "summary": "Profil de catalogue pour NiFe30 (Resistherm - TCR)."
        },
        "reactor": {
            "displayName": "NiFe (Reactor Wire)",
            "description": "Profil de catalogue pour NiFe (Reactor Wire).",
            "summary": "Profil de catalogue pour NiFe (Reactor Wire)."
        },
        "nife30stealth": {
            "displayName": "NiFe30 (StealthVape)",
            "description": "Profil de catalogue pour NiFe30 (StealthVape).",
            "summary": "Profil de catalogue pour NiFe30 (StealthVape)."
        },
        "nft70": {
            "displayName": "Nifethal 70 (Alloy120)",
            "description": "Profil de catalogue pour Nifethal 70 (Alloy120).",
            "summary": "Profil de catalogue pour Nifethal 70 (Alloy120)."
        },
        "nft52": {
            "displayName": "Nifethal 52 (Alloy52)",
            "description": "Profil de catalogue pour Nifethal 52 (Alloy52).",
            "summary": "Profil de catalogue pour Nifethal 52 (Alloy52)."
        },
        "zr": {
            "displayName": "Zirconium (pure)",
            "description": "Profil de catalogue pour Zirconium (pure).",
            "summary": "Profil de catalogue pour Zirconium (pure)."
        },
        "n90": {
            "displayName": "Nichrome N90 (Ni90Cr10)",
            "description": "Profil de catalogue pour Nichrome N90 (Ni90Cr10).",
            "summary": "Profil de catalogue pour Nichrome N90 (Ni90Cr10)."
        },
        "ss904l": {
            "displayName": "SS 904L (UNS N08904)",
            "description": "Profil de catalogue pour SS 904L (UNS N08904).",
            "summary": "Profil de catalogue pour SS 904L (UNS N08904)."
        }
    },
    "batteries": {
        "battery-1": {
            "displayName": "AW IMR 14500",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-2": {
            "displayName": "AW IMR 14500",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-3": {
            "displayName": "AW IMR 16340",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-4": {
            "displayName": "AW IMR 18350",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-5": {
            "displayName": "AW IMR 18350",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-6": {
            "displayName": "AW IMR 18490",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-7": {
            "displayName": "AW IMR 18490",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-8": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-9": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-10": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-11": {
            "displayName": "AWT 26650 4500mAh 75A",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-12": {
            "displayName": "EH IMR 18350",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-13": {
            "displayName": "EH IMR 18500",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-14": {
            "displayName": "EH IMR 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-15": {
            "displayName": "EH IMR 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-16": {
            "displayName": "Efest IMR 18350",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-17": {
            "displayName": "Efest IMR 18350",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-18": {
            "displayName": "Efest IMR 18490",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-19": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-20": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-21": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-22": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-23": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-24": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-25": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-26": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-27": {
            "displayName": "Efest IMR 18650 35A",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-28": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-29": {
            "displayName": "Efest IMR 26650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-30": {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": undefined,
            "summary": "Une batterie interne dans l'appareil plutôt qu'une cellule remplaçable par l'utilisateur.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-31": {
            "displayName": "Innokin iTaste VV v3",
            "description": undefined,
            "summary": "Une batterie interne dans l'appareil plutôt qu'une cellule remplaçable par l'utilisateur.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-32": {
            "displayName": "Keeppower IMR26650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-33": {
            "displayName": "LG 18650HB6",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-34": {
            "displayName": "LG 18650HE2",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-35": {
            "displayName": "LG 18650HG2",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-36": {
            "displayName": "MNKE IMR 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-37": {
            "displayName": "MNKE IMR 26650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-38": {
            "displayName": "MXJO IMR 18650 35A",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-39": {
            "displayName": "MXJO IMR 18650 20A",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-40": {
            "displayName": "Nitecore NL188",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-41": {
            "displayName": "Orbtronic 18650 PD2900",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-42": {
            "displayName": "Orbtronic 18650 SX22",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-43": {
            "displayName": "Orbtronic 18650 SX30",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-44": {
            "displayName": "Orbtronic 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-45": {
            "displayName": "Orbtronic CGR18650CH",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-46": {
            "displayName": "Orbtronic NCR18650A",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-47": {
            "displayName": "Panasonic CGR18650CH",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-48": {
            "displayName": "Panasonic NCR18650A",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-49": {
            "displayName": "Panasonic NCR18650B",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-50": {
            "displayName": "Panasonic NCR18650BD",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-51": {
            "displayName": "Panasonic NCR18650PF",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-52": {
            "displayName": "Panasonic CGR26650A",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-53": {
            "displayName": "Samsung ICR18650-26F",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-54": {
            "displayName": "Panasonic NCR18650PD",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-55": {
            "displayName": "Samsung INR18650-20R",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-56": {
            "displayName": "Samsung INR18650-25R",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-57": {
            "displayName": "Samsung INR18650-20Q",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-58": {
            "displayName": "Samsung INR18650-30Q",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-59": {
            "displayName": "Sanyo UR16650ZTA",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-60": {
            "displayName": "Sanyo UR18650EX",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-61": {
            "displayName": "Sanyo UR18650F",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": "Batterie à faible consommation ; ne convient pas au vapotage."
        },
        "battery-62": {
            "displayName": "Sibeile IMR 18500",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-63": {
            "displayName": "Sibeile IMR 18500",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-64": {
            "displayName": "Sony US18650VTC3",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-65": {
            "displayName": "Sony US18650VTC4",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-66": {
            "displayName": "Sony US18650VTC5",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-67": {
            "displayName": "Sony US18650v3",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-68": {
            "displayName": "Sony US26650VT",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-69": {
            "displayName": "Torchy IMR 18350",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-70": {
            "displayName": "Vappower IMR 26650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-71": {
            "displayName": "Vamped 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "20 Une cote continue ; Les évaluations du pouls ne sont pas utilisées."
            ],
            "safetyText": undefined
        },
        "battery-72": {
            "displayName": "UltraFire BRC 18650 4000mAh li-ion",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "La capacité réelle est inférieure à ce que l’étiquette suggère."
            ],
            "safetyText": undefined
        },
        "battery-73": {
            "displayName": "UltraFire XSL 18350 1200mAh",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "La capacité réelle est inférieure à ce que l’étiquette suggère."
            ],
            "safetyText": undefined
        },
        "battery-74": {
            "displayName": "Vamped 26650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-75": {
            "displayName": "Xtar IMR 18350",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-76": {
            "displayName": "Xtar IMR 18500",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-77": {
            "displayName": "EVE INR18650/30P",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "20 Une valeur de comparaison indépendante conservatrice ; l'emballage exact et la révision de la production restent pertinents."
            ],
            "safetyText": undefined
        },
        "battery-78": {
            "displayName": "EVE INR18650/25P",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "15 Une valeur conservatrice issue de tests sur modèle exact ; La révision testée et marquée CCC reste pertinente."
            ],
            "safetyText": undefined
        },
        "battery-79": {
            "displayName": "EVE INR18650/30PL",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "45 Une valeur continue indépendante pour la révision des tables testées ; ne remplacez pas les évaluations du pouls."
            ],
            "safetyText": undefined
        },
        "battery-80": {
            "displayName": "Ampace JP30P1",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "36 Une vraie valeur continue ; le chiffre de 56 A est limité par la température."
            ],
            "safetyText": undefined
        },
        "battery-81": {
            "displayName": "Tenpower INR18650-30XG",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "40 Une valeur conservatrice ; les cellules testées apparaissaient en pré-production et ne portaient pas le logo CCC."
            ],
            "safetyText": undefined
        },
        "battery-82": {
            "displayName": "EVE INR21700/58E",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "13 Une valeur continue recommandée ; 16,8 A est un maximum absolu non destiné à la durée de vie."
            ],
            "safetyText": undefined
        },
        "battery-83": {
            "displayName": "Reliance INR21700-RS40",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "40 Une valeur conservatrice ; 70 A est limité en température et les échantillons testés étaient en pré-production."
            ],
            "safetyText": undefined
        },
        "battery-84": {
            "displayName": "Reliance INR21700-RS50",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "40 Une valeur de comparaison de cellule de production ; 70 A nécessite un contrôle de la température."
            ],
            "safetyText": undefined
        },
        "battery-85": {
            "displayName": "Vapcell S41",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "40 Une valeur d'emballage exacte ; 70 A est limité à 60 C et testé comme un rewrap EVE 40PL."
            ],
            "safetyText": undefined
        },
        "battery-86": {
            "displayName": "BAK 21700-65E",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "19 Une valeur conservatrice ; des échantillons testés exacts apparaissaient en pré-production et manquaient de marques CCC."
            ],
            "safetyText": undefined
        },
        "battery-87": {
            "displayName": "Tenpower INR21700-50XG",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "40 Une valeur conservatrice ; 90 A est limité en température et les cellules testées sont apparues en pré-production."
            ],
            "safetyText": undefined
        },
        "battery-88": {
            "displayName": "Tenpower INR21700-60XG",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "40 Une valeur conservatrice ; 60 A est limité en température et la continuité de la production reste irrésolue."
            ],
            "safetyText": undefined
        },
        "battery-89": {
            "displayName": "Great Power 50Q",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "40 Une valeur conservatrice ; les échantillons testés avaient une capacité incohérente et ne portaient pas les marques CCC/CE."
            ],
            "safetyText": undefined
        },
        "battery-90": {
            "displayName": "FEB 21700-68E",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "13 Une valeur conservatrice ; des échantillons testés exacts apparaissaient en pré-production et manquaient de marques CCC."
            ],
            "safetyText": undefined
        },
        "battery-91": {
            "displayName": "Reliance INR21700-RS60",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "30 A valeur continue estimée par le testeur ; Le maximum de 50 A de Reliance est limité en température."
            ],
            "safetyText": undefined
        },
        "battery-92": {
            "displayName": "Reliance INR21700-RH60",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "20 Une valeur continue provenant de deux lots testés liés à la production ; 30 A est limité en température."
            ],
            "safetyText": undefined
        },
        "battery-93": {
            "displayName": "Amprius INR18650/40 (SA110)",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "12 A continu ; 20 A est uniquement à impulsion. L'emballage testé exactement est enregistré comme SA110 / INR18650/40."
            ],
            "safetyText": undefined
        },
        "battery-94": {
            "displayName": "Vapcell B30 18650",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "20 Une valeur d'emballage exacte ; le testeur recommande en dessous de 15 A en continu. Vapehuset annonce 25 A dans son titre, et les révisions ultérieures de l'approvisionnement ou du wrapper peuvent différer."
            ],
            "safetyText": undefined
        },
        "battery-95": {
            "displayName": "Golisi S35 21700",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "30 Une valeur de modèle exacte ; il s'agit d'un réemballage et les révisions ultérieures du wrapper ou l'approvisionnement sous-jacent peuvent différer."
            ],
            "safetyText": undefined
        },
        "battery-96": {
            "displayName": "iJoy 20700 3000mAh five-leg",
            "description": undefined,
            "summary": "Une cellule rechargeable amovible utilisée dans les appareils compatibles.",
            "notes": [
                "30 Une valeur de révision exacte à cinq pattes ; les révisions à quatre pattes et ultérieures utilisant le même wrap sont sensiblement différentes et ne doivent pas hériter de ce profil."
            ],
            "safetyText": undefined
        }
    },
    "mods": {
        "preset-1": {
            "displayName": "AceSmok Ace 50",
            "description": "Un profil d'appareil de vapotage réglementé pour AceSmok Ace 50.",
            "summary": "Un profil d'appareil de vapotage réglementé pour AceSmok Ace 50."
        },
        "preset-2": {
            "displayName": "Ante Meridiem Axis",
            "description": "Un profil d'appareil de vapotage réglementé pour Ante Meridiem Axis.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Ante Meridiem Axis."
        },
        "preset-3": {
            "displayName": "Anyvape AnyMOD",
            "description": "Un profil d'appareil de vapotage réglementé pour Anyvape AnyMOD.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Anyvape AnyMOD."
        },
        "preset-4": {
            "displayName": "Arrow 100W",
            "description": "Un profil d'appareil de vapotage réglementé pour Arrow 100W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Arrow 100W."
        },
        "preset-5": {
            "displayName": "Artisan Supermax",
            "description": "Un profil d'appareil de vapotage réglementé pour Artisan Supermax.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Artisan Supermax."
        },
        "preset-6": {
            "displayName": "Asmodus Snow Wolf 200W",
            "description": "Un profil d'appareil de vapotage réglementé pour Asmodus Snow Wolf 200W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Asmodus Snow Wolf 200W."
        },
        "preset-7": {
            "displayName": "Aspire CF Sub Ohm",
            "description": "Un profil d'appareil de vapotage réglementé pour Aspire CF Sub Ohm.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Aspire CF Sub Ohm."
        },
        "preset-8": {
            "displayName": "Beastmode Industries BMI 100 Watt V.1",
            "description": "Un profil d'appareil de vapotage réglementé pour Beastmode Industries BMI 100 Watt V.1.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Beastmode Industries BMI 100 Watt V.1."
        },
        "preset-9": {
            "displayName": "Billet Box rev. 3a",
            "description": "Billet Box Rev. 3a avec une finition en aluminium anodisé brillant et microbillé ; introduit en mai 2014.",
            "summary": "Boîte à Billets Rév."
        },
        "preset-10": {
            "displayName": "Cloupor DNA-30",
            "description": "Un appareil Cloupor 30 W utilisant un chipset clone tiers de style DNA30, et non une carte Evolv DNA-30D authentique.",
            "summary": "Un appareil Cloupor 30 W utilisant un chipset clone tiers de style DNA30, et non une carte Evolv DNA-30D authentique."
        },
        "preset-11": {
            "displayName": "Cloupor DNA-50",
            "description": "Un profil d'appareil de vapotage réglementé pour Cloupor DNA-50.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Cloupor DNA-50."
        },
        "preset-12": {
            "displayName": "Cloupor GT",
            "description": "Un profil d'appareil de vapotage réglementé pour Cloupor GT.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Cloupor GT."
        },
        "preset-13": {
            "displayName": "Cloupor Mini",
            "description": "Un profil d'appareil de vapotage réglementé pour Cloupor Mini.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Cloupor Mini."
        },
        "preset-14": {
            "displayName": "Cloupor T5",
            "description": "Un profil d'appareil de vapotage réglementé pour Cloupor T5.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Cloupor T5."
        },
        "preset-15": {
            "displayName": "Cloupor T6",
            "description": "Un profil d'appareil de vapotage réglementé pour Cloupor T6.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Cloupor T6."
        },
        "preset-16": {
            "displayName": "Cloupor T8",
            "description": "Un profil d'appareil de vapotage réglementé pour Cloupor T8.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Cloupor T8."
        },
        "preset-17": {
            "displayName": "Cloupor ZNA50",
            "description": "Un profil d'appareil de vapotage réglementé pour Cloupor ZNA50.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Cloupor ZNA50."
        },
        "preset-18": {
            "displayName": "C-Tratech Smart Box 50W",
            "description": "Un profil d'appareil de vapotage réglementé pour C-Tratech Smart Box 50W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour C-Tratech Smart Box 50W."
        },
        "preset-19": {
            "displayName": "Dicodes Dani Extreme",
            "description": "Un profil d'appareil de vapotage réglementé pour Dicodes Dani Extreme.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Dicodes Dani Extreme."
        },
        "preset-20": {
            "displayName": "Dicodes Dani Extreme v2 / Pipeline Pro v2",
            "description": "Un profil d'appareil de vapotage réglementé pour Dicodes Dani Extreme v2 / Pipeline Pro v2.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Dicodes Dani Extreme v2 / Pipeline Pro v2."
        },
        "preset-21": {
            "displayName": "DJK Wood Mods The Nerd VV",
            "description": "Un profil d'appareil de vapotage réglementé pour DJK Wood Mods The Nerd VV.",
            "summary": "Un profil d'appareil de vapotage réglementé pour DJK Wood Mods The Nerd VV."
        },
        "preset-22": {
            "displayName": "Dovpo DT-50",
            "description": "Un profil d'appareil de vapotage réglementé pour Dovpo DT-50.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Dovpo DT-50."
        },
        "preset-23": {
            "displayName": "Dovpo E-LVT",
            "description": "Un profil d'appareil de vapotage réglementé pour Dovpo E-LVT.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Dovpo E-LVT."
        },
        "preset-24": {
            "displayName": "Dovpo E-Mech",
            "description": "Un profil d'appareil de vapotage réglementé pour Dovpo E-Mech.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Dovpo E-Mech."
        },
        "preset-25": {
            "displayName": "Dovpo TC 50",
            "description": "Un profil d'appareil de vapotage réglementé pour Dovpo TC 50.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Dovpo TC 50."
        },
        "preset-26": {
            "displayName": "eGo Twist",
            "description": "Un profil d'appareil de vapotage réglementé pour eGo Twist.",
            "summary": "Un profil d'appareil de vapotage réglementé pour eGo Twist."
        },
        "preset-27": {
            "displayName": "eGo-V V3",
            "description": "Un profil d'appareil de vapotage réglementé pour eGo-V V3.",
            "summary": "Un profil d'appareil de vapotage réglementé pour eGo-V V3."
        },
        "preset-28": {
            "displayName": "Evod V v3",
            "description": "Un profil d'appareil de vapotage réglementé pour Evod V v3.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Evod V v3."
        },
        "preset-29": {
            "displayName": "Evolv DNA-20D",
            "description": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-20D.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-20D."
        },
        "preset-30": {
            "displayName": "Evolv DNA-30D",
            "description": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-30D.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-30D."
        },
        "preset-31": {
            "displayName": "Evolv DNA-40 (std. wire)",
            "description": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-40 (std. wire).",
            "summary": "Un profil de dispositif de vapotage réglementé pour Evolv DNA-40 (std."
        },
        "preset-32": {
            "displayName": "Evolv DNA-40 (Ni 200)",
            "description": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-40 (Ni 200).",
            "summary": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-40 (Ni 200)."
        },
        "preset-33": {
            "displayName": "Evolv DNA60 (non-color)",
            "description": "Un profil d'appareil de vapotage réglementé pour Evolv DNA60 (non-color).",
            "summary": "Un profil d'appareil de vapotage réglementé pour Evolv DNA60 (non-color)."
        },
        "preset-34": {
            "displayName": "Evolv DNA-75",
            "description": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-75.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-75."
        },
        "preset-35": {
            "displayName": "Evolv DNA-200 (2 cells, DNA-133)",
            "description": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-200 (2 cells, DNA-133).",
            "summary": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-200 (2 cells, DNA-133)."
        },
        "preset-36": {
            "displayName": "Evolv DNA-200 (3 cells)",
            "description": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-200 (3 cells).",
            "summary": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-200 (3 cells)."
        },
        "preset-37": {
            "displayName": "Evolv DNA-200 (TC mode)",
            "description": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-200 (TC mode).",
            "summary": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-200 (TC mode)."
        },
        "preset-38": {
            "displayName": "Evolv DNA-250 (2 cells, DNA-166)",
            "description": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-250 (2 cells, DNA-166).",
            "summary": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-250 (2 cells, DNA-166)."
        },
        "preset-39": {
            "displayName": "Evolv DNA-250 (3 cells)",
            "description": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-250 (3 cells).",
            "summary": "Un profil d'appareil de vapotage réglementé pour Evolv DNA-250 (3 cells)."
        },
        "preset-40": {
            "displayName": "Evolv Kick 2",
            "description": "Un profil d'appareil de vapotage réglementé pour Evolv Kick 2.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Evolv Kick 2."
        },
        "preset-41": {
            "displayName": "Eleaf iStick",
            "description": "Un profil d'appareil de vapotage réglementé pour Eleaf iStick.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Eleaf iStick."
        },
        "preset-42": {
            "displayName": "Eleaf iStick 30W",
            "description": "Un profil d'appareil de vapotage réglementé pour Eleaf iStick 30W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Eleaf iStick 30W."
        },
        "preset-43": {
            "displayName": "Eleaf iStick 40W TC",
            "description": "Un profil d'appareil de vapotage réglementé pour Eleaf iStick 40W TC.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Eleaf iStick 40W TC."
        },
        "preset-44": {
            "displayName": "Eleaf iStick 50W",
            "description": "Un profil d'appareil de vapotage réglementé pour Eleaf iStick 50W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Eleaf iStick 50W."
        },
        "preset-45": {
            "displayName": "Eleaf iStick 100W",
            "description": "Un profil d'appareil de vapotage réglementé pour Eleaf iStick 100W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Eleaf iStick 100W."
        },
        "preset-46": {
            "displayName": "Gossmods The Duke",
            "description": "Un profil d'appareil de vapotage réglementé pour Gossmods The Duke.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Gossmods The Duke."
        },
        "preset-47": {
            "displayName": "Grand Innovations GI2",
            "description": "Un profil d'appareil de vapotage réglementé pour Grand Innovations GI2.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Grand Innovations GI2."
        },
        "preset-48": {
            "displayName": "Heatvape Invader Mini",
            "description": "Un profil d'appareil de vapotage réglementé pour Heatvape Invader Mini.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Heatvape Invader Mini."
        },
        "preset-49": {
            "displayName": "Heatvape Invader Mini (TC mode)",
            "description": "Un profil d'appareil de vapotage réglementé pour Heatvape Invader Mini (TC mode).",
            "summary": "Un profil d'appareil de vapotage réglementé pour Heatvape Invader Mini (TC mode)."
        },
        "preset-50": {
            "displayName": "iJoy A160",
            "description": "Un profil d'appareil de vapotage réglementé pour iJoy A160.",
            "summary": "Un profil d'appareil de vapotage réglementé pour iJoy A160."
        },
        "preset-51": {
            "displayName": "Innokin Cool Fire II",
            "description": "Un profil d'appareil de vapotage réglementé pour Innokin Cool Fire II.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Innokin Cool Fire II."
        },
        "preset-52": {
            "displayName": "Innokin Cool Fire IV",
            "description": "Un profil d'appareil de vapotage réglementé pour Innokin Cool Fire IV.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Innokin Cool Fire IV."
        },
        "preset-53": {
            "displayName": "Innokin Disrupter",
            "description": "Un profil d'appareil de vapotage réglementé pour Innokin Disrupter.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Innokin Disrupter."
        },
        "preset-54": {
            "displayName": "Innokin iTaste 134 / iTaste 134 mini",
            "description": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste 134 / iTaste 134 mini.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste 134 / iTaste 134 mini."
        },
        "preset-55": {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste MVP 2.0.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste MVP 2.0."
        },
        "preset-56": {
            "displayName": "Innokin iTaste MVP 20 Watt",
            "description": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste MVP 20 Watt.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste MVP 20 Watt."
        },
        "preset-57": {
            "displayName": "Innokin iTaste MVP 3.0",
            "description": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste MVP 3.0.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste MVP 3.0."
        },
        "preset-58": {
            "displayName": "Innokin iTaste MVP 3 Pro",
            "description": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste MVP 3 Pro.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste MVP 3 Pro."
        },
        "preset-59": {
            "displayName": "Innokin iTaste SVD",
            "description": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste SVD.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste SVD."
        },
        "preset-60": {
            "displayName": "Innokin iTaste SVD2",
            "description": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste SVD2.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste SVD2."
        },
        "preset-61": {
            "displayName": "Innokin iTaste VTR",
            "description": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste VTR.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste VTR."
        },
        "preset-62": {
            "displayName": "Innokin iTaste VV V3.0",
            "description": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste VV V3.0.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Innokin iTaste VV V3.0."
        },
        "preset-63": {
            "displayName": "Joy4life Beyang 30W",
            "description": "Un profil d'appareil de vapotage réglementé pour Joy4life Beyang 30W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Joy4life Beyang 30W."
        },
        "preset-64": {
            "displayName": "Joyetech eCom Supreme",
            "description": "Un profil d'appareil de vapotage réglementé pour Joyetech eCom Supreme.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Joyetech eCom Supreme."
        },
        "preset-65": {
            "displayName": "Joyetech eVic",
            "description": "Un profil d'appareil de vapotage réglementé pour Joyetech eVic.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Joyetech eVic."
        },
        "preset-66": {
            "displayName": "Joyetech eVic VT",
            "description": "Un profil d'appareil de vapotage réglementé pour Joyetech eVic VT.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Joyetech eVic VT."
        },
        "preset-67": {
            "displayName": "Joyetech eVic VT (TC mode)",
            "description": "Un profil d'appareil de vapotage réglementé pour Joyetech eVic VT (TC mode).",
            "summary": "Un profil d'appareil de vapotage réglementé pour Joyetech eVic VT (TC mode)."
        },
        "preset-68": {
            "displayName": "Joyetech eVic Supreme",
            "description": "Un profil d'appareil de vapotage réglementé pour Joyetech eVic Supreme.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Joyetech eVic Supreme."
        },
        "preset-69": {
            "displayName": "J Well Alesia",
            "description": "Un profil d'appareil de vapotage réglementé pour J Well Alesia.",
            "summary": "Un profil d'appareil de vapotage réglementé pour J Well Alesia."
        },
        "preset-70": {
            "displayName": "J Well Troca",
            "description": "Un profil d'appareil de vapotage réglementé pour J Well Troca.",
            "summary": "Un profil d'appareil de vapotage réglementé pour J Well Troca."
        },
        "preset-71": {
            "displayName": "Kanger e-Power v3",
            "description": "Un profil d'appareil de vapotage réglementé pour Kanger e-Power v3.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Kanger e-Power v3."
        },
        "preset-72": {
            "displayName": "Kanger IPOW 2",
            "description": "Un profil d'appareil de vapotage réglementé pour Kanger IPOW 2.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Kanger IPOW 2."
        },
        "preset-73": {
            "displayName": "Kanger KBOX",
            "description": "Un profil d'appareil de vapotage réglementé pour Kanger KBOX.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Kanger KBOX."
        },
        "preset-74": {
            "displayName": "Kanger KBOX Mini / SUBOX Mini",
            "description": "Un profil d'appareil de vapotage réglementé pour Kanger KBOX Mini / SUBOX Mini.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Kanger KBOX Mini / SUBOX Mini."
        },
        "preset-75": {
            "displayName": "Kanger K-Simar 20",
            "description": "Un profil d'appareil de vapotage réglementé pour Kanger K-Simar 20.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Kanger K-Simar 20."
        },
        "preset-76": {
            "displayName": "Kangside e-Huge",
            "description": "Un profil d'appareil de vapotage réglementé pour Kangside e-Huge.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Kangside e-Huge."
        },
        "preset-77": {
            "displayName": "Kamry 20",
            "description": "Un profil d'appareil de vapotage réglementé pour Kamry 20.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Kamry 20."
        },
        "preset-78": {
            "displayName": "Kamry 60W",
            "description": "Un profil d'appareil de vapotage réglementé pour Kamry 60W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Kamry 60W."
        },
        "preset-79": {
            "displayName": "Kamry God Box",
            "description": "Un profil d'appareil de vapotage réglementé pour Kamry God Box.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Kamry God Box."
        },
        "preset-80": {
            "displayName": "KangXin VF clone v3",
            "description": "Un profil d'appareil de vapotage réglementé pour KangXin VF clone v3.",
            "summary": "Un profil d'appareil de vapotage réglementé pour KangXin VF clone v3."
        },
        "preset-81": {
            "displayName": "KangXin KX5-50W",
            "description": "Un profil d'appareil de vapotage réglementé pour KangXin KX5-50W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour KangXin KX5-50W."
        },
        "preset-82": {
            "displayName": "Koopor Mini KP60",
            "description": "Un profil d'appareil de vapotage réglementé pour Koopor Mini KP60.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Koopor Mini KP60."
        },
        "preset-83": {
            "displayName": "Koopor Mini KP60 (TC)",
            "description": "Un profil d'appareil de vapotage réglementé pour Koopor Mini KP60 (TC).",
            "summary": "Un profil d'appareil de vapotage réglementé pour Koopor Mini KP60 (TC)."
        },
        "preset-84": {
            "displayName": "KSD 30",
            "description": "Un profil d'appareil de vapotage réglementé pour KSD 30.",
            "summary": "Un profil d'appareil de vapotage réglementé pour KSD 30."
        },
        "preset-85": {
            "displayName": "KSD Kmax (single battery)",
            "description": "Un profil d'appareil de vapotage réglementé pour KSD Kmax (single battery).",
            "summary": "Un profil d'appareil de vapotage réglementé pour KSD Kmax (single battery)."
        },
        "preset-86": {
            "displayName": "KSD Kmax (stacked)",
            "description": "Un profil d'appareil de vapotage réglementé pour KSD Kmax (stacked).",
            "summary": "Un profil d'appareil de vapotage réglementé pour KSD Kmax (stacked)."
        },
        "preset-87": {
            "displayName": "L-Rider Lambo 6.0",
            "description": "Un profil d'appareil de vapotage réglementé pour L-Rider Lambo 6.0.",
            "summary": "Un profil d'appareil de vapotage réglementé pour L-Rider Lambo 6.0."
        },
        "preset-88": {
            "displayName": "L-Rider Lavatube",
            "description": "Un profil d'appareil de vapotage réglementé pour L-Rider Lavatube.",
            "summary": "Un profil d'appareil de vapotage réglementé pour L-Rider Lavatube."
        },
        "preset-89": {
            "displayName": "Lotus Jellyfish",
            "description": "Un profil d'appareil de vapotage réglementé pour Lotus Jellyfish.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Lotus Jellyfish."
        },
        "preset-90": {
            "displayName": "Lotus LE80",
            "description": "Un profil d'appareil de vapotage réglementé pour Lotus LE80.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Lotus LE80."
        },
        "preset-91": {
            "displayName": "Luxyoun Smaug",
            "description": "Un profil d'appareil de vapotage réglementé pour Luxyoun Smaug.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Luxyoun Smaug."
        },
        "preset-92": {
            "displayName": "Majesty 150W",
            "description": "Un profil d'appareil de vapotage réglementé pour Majesty 150W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Majesty 150W."
        },
        "preset-93": {
            "displayName": "Megatron 260",
            "description": "Un profil d'appareil de vapotage réglementé pour Megatron 260.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Megatron 260."
        },
        "preset-94": {
            "displayName": "Naos Raptor 10A",
            "description": "Un profil d'appareil de vapotage réglementé pour Naos Raptor 10A.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Naos Raptor 10A."
        },
        "preset-95": {
            "displayName": "Naos Raptor 20A",
            "description": "Un profil d'appareil de vapotage réglementé pour Naos Raptor 20A.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Naos Raptor 20A."
        },
        "preset-96": {
            "displayName": "Nivel V3",
            "description": "Un profil d'appareil de vapotage réglementé pour Nivel V3.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Nivel V3."
        },
        "preset-97": {
            "displayName": "Notcigs VV",
            "description": "Un profil d'appareil de vapotage réglementé pour Notcigs VV.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Notcigs VV."
        },
        "preset-98": {
            "displayName": "OKL2-T/20-W12",
            "description": "Un profil d'appareil de vapotage réglementé pour OKL2-T/20-W12.",
            "summary": "Un profil d'appareil de vapotage réglementé pour OKL2-T/20-W12."
        },
        "preset-99": {
            "displayName": "OKR-T10",
            "description": "Un profil d'appareil de vapotage réglementé pour OKR-T10.",
            "summary": "Un profil d'appareil de vapotage réglementé pour OKR-T10."
        },
        "preset-100": {
            "displayName": "Pioneer4You/Green Leaf P-Max",
            "description": "Un profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf P-Max.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf P-Max."
        },
        "preset-101": {
            "displayName": "ProVari 2, ProVari 2.5",
            "description": "Un profil d'appareil de vapotage réglementé pour ProVari 2, ProVari 2.5.",
            "summary": "Un profil d'appareil de vapotage réglementé pour ProVari 2, ProVari 2.5."
        },
        "preset-102": {
            "displayName": "ProVari P3 beta",
            "description": "Un profil d'appareil de vapotage réglementé pour ProVari P3 beta.",
            "summary": "Un profil d'appareil de vapotage réglementé pour ProVari P3 beta."
        },
        "preset-103": {
            "displayName": "ProVari P35",
            "description": "Un profil d'appareil de vapotage réglementé pour ProVari P35.",
            "summary": "Un profil d'appareil de vapotage réglementé pour ProVari P35."
        },
        "preset-104": {
            "displayName": "Psmoke GI2",
            "description": "Un profil d'appareil de vapotage réglementé pour Psmoke GI2.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Psmoke GI2."
        },
        "preset-105": {
            "displayName": "RainbowHeaven Arrow",
            "description": "Un profil d'appareil de vapotage réglementé pour RainbowHeaven Arrow.",
            "summary": "Un profil d'appareil de vapotage réglementé pour RainbowHeaven Arrow."
        },
        "preset-106": {
            "displayName": "Robbot Tech ZNA50",
            "description": "Un profil d'appareil de vapotage réglementé pour Robbot Tech ZNA50.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Robbot Tech ZNA50."
        },
        "preset-107": {
            "displayName": "Sigelei 20W",
            "description": "Un profil d'appareil de vapotage réglementé pour Sigelei 20W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Sigelei 20W."
        },
        "preset-108": {
            "displayName": "Sigelei 50W",
            "description": "Un profil d'appareil de vapotage réglementé pour Sigelei 50W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Sigelei 50W."
        },
        "preset-109": {
            "displayName": "Sigelei 75W TC",
            "description": "Un profil d'appareil de vapotage réglementé pour Sigelei 75W TC.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Sigelei 75W TC."
        },
        "preset-110": {
            "displayName": "Sigelei 150W",
            "description": "Un profil d'appareil de vapotage réglementé pour Sigelei 150W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Sigelei 150W."
        },
        "preset-111": {
            "displayName": "Sigelei Fuchai 213 Plus",
            "description": "Un profil d'appareil de vapotage réglementé pour Sigelei Fuchai 213 Plus.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Sigelei Fuchai 213 Plus."
        },
        "preset-112": {
            "displayName": "Sigelei Kick",
            "description": "Un profil d'appareil de vapotage réglementé pour Sigelei Kick.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Sigelei Kick."
        },
        "preset-113": {
            "displayName": "Sigelei Legend v2",
            "description": "Un profil d'appareil de vapotage réglementé pour Sigelei Legend v2.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Sigelei Legend v2."
        },
        "preset-114": {
            "displayName": "Sigelei Vmax",
            "description": "Un profil d'appareil de vapotage réglementé pour Sigelei Vmax.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Sigelei Vmax."
        },
        "preset-115": {
            "displayName": "Sigelei Zmax V3",
            "description": "Un profil d'appareil de vapotage réglementé pour Sigelei Zmax V3.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Sigelei Zmax V3."
        },
        "preset-116": {
            "displayName": "Sigelei Zmax V5",
            "description": "Un profil d'appareil de vapotage réglementé pour Sigelei Zmax V5.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Sigelei Zmax V5."
        },
        "preset-117": {
            "displayName": "Simeiyue God 180",
            "description": "Un profil d'appareil de vapotage réglementé pour Simeiyue God 180.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Simeiyue God 180."
        },
        "preset-118": {
            "displayName": "Simeiyue God 180s",
            "description": "Un profil d'appareil de vapotage réglementé pour Simeiyue God 180s.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Simeiyue God 180s."
        },
        "preset-119": {
            "displayName": "Simeiyue God 260",
            "description": "Un profil d'appareil de vapotage réglementé pour Simeiyue God 260.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Simeiyue God 260."
        },
        "preset-120": {
            "displayName": "Smok Ace",
            "description": "Un profil d'appareil de vapotage réglementé pour Smok Ace.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Smok Ace."
        },
        "preset-121": {
            "displayName": "Smok BEC Pro",
            "description": "Un profil d'appareil de vapotage réglementé pour Smok BEC Pro.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Smok BEC Pro."
        },
        "preset-122": {
            "displayName": "Smok G-Priv 220W",
            "description": "Un profil d'appareil de vapotage réglementé pour Smok G-Priv 220W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Smok G-Priv 220W."
        },
        "preset-123": {
            "displayName": "Smok Sid",
            "description": "Un profil d'appareil de vapotage réglementé pour Smok Sid.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Smok Sid."
        },
        "preset-124": {
            "displayName": "Smok X Cube II",
            "description": "Un profil d'appareil de vapotage réglementé pour Smok X Cube II.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Smok X Cube II."
        },
        "preset-125": {
            "displayName": "Smok X Pro BT50",
            "description": "Un profil d'appareil de vapotage réglementé pour Smok X Pro BT50.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Smok X Pro BT50."
        },
        "preset-126": {
            "displayName": "Smok X Pro M36",
            "description": "Un profil d'appareil de vapotage réglementé pour Smok X Pro M36.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Smok X Pro M36."
        },
        "preset-127": {
            "displayName": "Smok X Pro M50",
            "description": "Un profil d'appareil de vapotage réglementé pour Smok X Pro M50.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Smok X Pro M50."
        },
        "preset-128": {
            "displayName": "Smok X Pro M80",
            "description": "Un profil d'appareil de vapotage réglementé pour Smok X Pro M80.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Smok X Pro M80."
        },
        "preset-129": {
            "displayName": "Smok Zmax",
            "description": "Un profil d'appareil de vapotage réglementé pour Smok Zmax.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Smok Zmax."
        },
        "preset-130": {
            "displayName": "Smok Zmax Mini",
            "description": "Un profil d'appareil de vapotage réglementé pour Smok Zmax Mini.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Smok Zmax Mini."
        },
        "preset-131": {
            "displayName": "SMY 260W",
            "description": "Un profil d'appareil de vapotage réglementé pour SMY 260W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour SMY 260W."
        },
        "preset-132": {
            "displayName": "SMY 50TC",
            "description": "Un profil d'appareil de vapotage réglementé pour SMY 50TC.",
            "summary": "Un profil d'appareil de vapotage réglementé pour SMY 50TC."
        },
        "preset-133": {
            "displayName": "SMY GOD 180",
            "description": "Un profil d'appareil de vapotage réglementé pour SMY GOD 180.",
            "summary": "Un profil d'appareil de vapotage réglementé pour SMY GOD 180."
        },
        "preset-134": {
            "displayName": "Steam STM-1 / STM-2",
            "description": "Un profil d'appareil de vapotage réglementé pour Steam STM-1 / STM-2.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Steam STM-1 / STM-2."
        },
        "preset-135": {
            "displayName": "Sunzip Vapmod Deezel",
            "description": "Un profil d'appareil de vapotage réglementé pour Sunzip Vapmod Deezel.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Sunzip Vapmod Deezel."
        },
        "preset-136": {
            "displayName": "Taifun The Eye",
            "description": "Un profil d'appareil de vapotage réglementé pour Taifun The Eye.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Taifun The Eye."
        },
        "preset-137": {
            "displayName": "Taifun The Eye (updated)",
            "description": "Un profil d'appareil de vapotage réglementé pour Taifun The Eye (updated).",
            "summary": "Un profil d'appareil de vapotage réglementé pour Taifun The Eye (updated)."
        },
        "preset-138": {
            "displayName": "Tesla",
            "description": "Un profil d'appareil de vapotage réglementé pour Tesla.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Tesla."
        },
        "preset-139": {
            "displayName": "Tesla 120W",
            "description": "Un profil d'appareil de vapotage réglementé pour Tesla 120W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Tesla 120W."
        },
        "preset-140": {
            "displayName": "Tesla 2 Sub Mod",
            "description": "Un profil d'appareil de vapotage réglementé pour Tesla 2 Sub Mod.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Tesla 2 Sub Mod."
        },
        "preset-141": {
            "displayName": "Tesla Spider",
            "description": "Un profil d'appareil de vapotage réglementé pour Tesla Spider.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Tesla Spider."
        },
        "preset-142": {
            "displayName": "Tobeco ZNA 36",
            "description": "Un profil d'appareil de vapotage réglementé pour Tobeco ZNA 36.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Tobeco ZNA 36."
        },
        "preset-143": {
            "displayName": "Vamo 35W (clone)",
            "description": "Un profil d'appareil de vapotage réglementé pour Vamo 35W (clone).",
            "summary": "Un profil d'appareil de vapotage réglementé pour Vamo 35W (clone)."
        },
        "preset-144": {
            "displayName": "Vamo V1 / V2 / V3 / V5",
            "description": "Un profil d'appareil de vapotage réglementé pour Vamo V1 / V2 / V3 / V5.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Vamo V1 / V2 / V3 / V5."
        },
        "preset-145": {
            "displayName": "Vamo V7",
            "description": "Un profil d'appareil de vapotage réglementé pour Vamo V7.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Vamo V7."
        },
        "preset-146": {
            "displayName": "VaporFi Vox II",
            "description": "Un profil d'appareil de vapotage réglementé pour VaporFi Vox II.",
            "summary": "Un profil d'appareil de vapotage réglementé pour VaporFi Vox II."
        },
        "preset-147": {
            "displayName": "Vicious Ant VariAnt 120W",
            "description": "Un profil d'appareil de vapotage réglementé pour Vicious Ant VariAnt 120W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Vicious Ant VariAnt 120W."
        },
        "preset-148": {
            "displayName": "Vicious Ant VariAnt 250W",
            "description": "Un profil d'appareil de vapotage réglementé pour Vicious Ant VariAnt 250W.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Vicious Ant VariAnt 250W."
        },
        "preset-149": {
            "displayName": "Vision Spinner / Spinner II",
            "description": "Un profil d'appareil de vapotage réglementé pour Vision Spinner / Spinner II.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Vision Spinner / Spinner II."
        },
        "preset-150": {
            "displayName": "Vision X.Fir/X.Gun",
            "description": "Un profil d'appareil de vapotage réglementé pour Vision X.Fir/X.Gun.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Vision X.Fir/X.Gun."
        },
        "preset-151": {
            "displayName": "Volcano Lavatube",
            "description": "Un profil d'appareil de vapotage réglementé pour Volcano Lavatube.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Volcano Lavatube."
        },
        "preset-152": {
            "displayName": "Volcano Lavatube v2.5",
            "description": "Un profil d'appareil de vapotage réglementé pour Volcano Lavatube v2.5.",
            "summary": "Un profil d'appareil de vapotage réglementé pour Volcano Lavatube v2.5."
        },
        "preset-153": {
            "displayName": "Wismec Reuleaux RX200S (4.10)",
            "description": "Un profil d'appareil de vapotage réglementé pour Wismec Reuleaux RX200S (4.10).",
            "summary": "Un profil d'appareil de vapotage réglementé pour Wismec Reuleaux RX200S (4.10)."
        },
        "preset-154": {
            "displayName": "YiHi SX130",
            "description": "Un profil d'appareil de vapotage réglementé pour YiHi SX130.",
            "summary": "Un profil d'appareil de vapotage réglementé pour YiHi SX130."
        },
        "preset-155": {
            "displayName": "YiHi SX130 v1.5",
            "description": "Un profil d'appareil de vapotage réglementé pour YiHi SX130 v1.5.",
            "summary": "Un profil d'appareil de vapotage réglementé pour YiHi SX130 v1.5."
        },
        "preset-156": {
            "displayName": "YiHi SX130H",
            "description": "Un profil d'appareil de vapotage réglementé pour YiHi SX130H.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX130H."
        },
        "preset-157": {
            "displayName": "YiHi SX220",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX220.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX220."
        },
        "preset-158": {
            "displayName": "YiHi SX300",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX300.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX300."
        },
        "preset-159": {
            "displayName": "YiHi SX330 V1 35W",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V1 35W.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V1 35W."
        },
        "preset-160": {
            "displayName": "YiHi SX330 V2 50W",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V2 50W.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V2 50W."
        },
        "preset-161": {
            "displayName": "YiHi SX330 V2C 70W",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V2C 70W.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V2C 70W."
        },
        "preset-162": {
            "displayName": "YiHi SX330 V2 S 60W",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V2 S 60W.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V2 S 60W."
        },
        "preset-163": {
            "displayName": "YiHi SX330 V3 100W",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V3 100W.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V3 100W."
        },
        "preset-164": {
            "displayName": "YiHi SX330 V3 150W",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V3 150W.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V3 150W."
        },
        "preset-165": {
            "displayName": "YiHi SX330 V3S 150W",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V3S 150W.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V3S 150W."
        },
        "preset-166": {
            "displayName": "YiHi SX330-V3Si 200W",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX330-V3Si 200W.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX330-V3Si 200W."
        },
        "preset-167": {
            "displayName": "YiHi SX330 V4S 100W",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V4S 100W.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX330 V4S 100W."
        },
        "preset-168": {
            "displayName": "YiHi SX350 30W",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX350 30W.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX350 30W."
        },
        "preset-169": {
            "displayName": "YiHi SX350 50W",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX350 50W.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX350 50W."
        },
        "preset-170": {
            "displayName": "YiHi SX350 100W",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX350 100W.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX350 100W."
        },
        "preset-171": {
            "displayName": "YiHi SX350J VJ mode",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX350J VJ mode.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX350J VJ mode."
        },
        "preset-172": {
            "displayName": "YiHi SX350J VW/single batt mode",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX350J VW/single batt mode.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX350J VW/single batt mode."
        },
        "preset-173": {
            "displayName": "YiHi SX350J VW/dual batt mode",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX350J VW/dual batt mode.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX350J VW/dual batt mode."
        },
        "preset-174": {
            "displayName": "YiHi SX470",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX470.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX470."
        },
        "preset-175": {
            "displayName": "YiHi SX450",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX450.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX450."
        },
        "preset-176": {
            "displayName": "YiHi SXMini",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SXMini.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SXMini."
        },
        "preset-177": {
            "displayName": "Beyond Vape Solara",
            "description": "Profil d'appareil de vapotage réglementé pour Beyond Vape Solara.",
            "summary": "Profil d'appareil de vapotage réglementé pour Beyond Vape Solara."
        },
        "preset-178": {
            "displayName": "Cana Modz",
            "description": "Profil d'appareil de vapotage réglementé pour Cana Modz.",
            "summary": "Profil d'appareil de vapotage réglementé pour Cana Modz."
        },
        "preset-179": {
            "displayName": "Craving Vapor HexOhm",
            "description": "Profil d'appareil de vapotage réglementé pour Craving Vapor HexOhm.",
            "summary": "Profil d'appareil de vapotage réglementé pour Craving Vapor HexOhm."
        },
        "preset-180": {
            "displayName": "Craving Vapor HexOhm V2",
            "description": "Profil d'appareil de vapotage réglementé pour Craving Vapor HexOhm V2.",
            "summary": "Profil d'appareil de vapotage réglementé pour Craving Vapor HexOhm V2."
        },
        "preset-181": {
            "displayName": "Hana Modz V3",
            "description": "Profil d'appareil de vapotage réglementé pour Hana Modz V3.",
            "summary": "Profil d'appareil de vapotage réglementé pour Hana Modz V3."
        },
        "preset-182": {
            "displayName": "Hana Modz DNA 40",
            "description": "Profil d'appareil de vapotage réglementé pour Hana Modz DNA 40.",
            "summary": "Profil d'appareil de vapotage réglementé pour Hana Modz DNA 40."
        },
        "preset-183": {
            "displayName": "Lost Vape Therion DNA 75",
            "description": "Profil d'appareil de vapotage réglementé pour Lost Vape Therion DNA 75.",
            "summary": "Profil d'appareil de vapotage réglementé pour Lost Vape Therion DNA 75."
        },
        "preset-184": {
            "displayName": "Lost Vape Therion DNA 133",
            "description": "Profil d'appareil de vapotage réglementé pour Lost Vape Therion DNA 133.",
            "summary": "Profil d'appareil de vapotage réglementé pour Lost Vape Therion DNA 133."
        },
        "preset-185": {
            "displayName": "Lost Vape Therion DNA 166",
            "description": "Profil d'appareil de vapotage réglementé pour Lost Vape Therion DNA 166.",
            "summary": "Profil d'appareil de vapotage réglementé pour Lost Vape Therion DNA 166."
        },
        "preset-186": {
            "displayName": "Notcigs Buzz Pro",
            "description": "Profil d'appareil de vapotage réglementé pour Notcigs Buzz Pro.",
            "summary": "Profil d'appareil de vapotage réglementé pour Notcigs Buzz Pro."
        },
        "preset-187": {
            "displayName": "Pioneer4You/Green Leaf Seven 22",
            "description": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf Seven 22.",
            "summary": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf Seven 22."
        },
        "preset-188": {
            "displayName": "Pioneer4You/Green Leaf Seven 30W",
            "description": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf Seven 30W.",
            "summary": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf Seven 30W."
        },
        "preset-189": {
            "displayName": "Pioneer4You/Green Leaf IPV",
            "description": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV.",
            "summary": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV."
        },
        "preset-190": {
            "displayName": "Pioneer4You/Green Leaf IPV D2",
            "description": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV D2.",
            "summary": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV D2."
        },
        "preset-191": {
            "displayName": "Pioneer4You/Green Leaf IPV Mini",
            "description": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV Mini.",
            "summary": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV Mini."
        },
        "preset-192": {
            "displayName": "Pioneer4You/Green Leaf IPV Mini 2",
            "description": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV Mini 2.",
            "summary": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV Mini 2."
        },
        "preset-193": {
            "displayName": "Pioneer4You/Green Leaf IPV V2",
            "description": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV V2.",
            "summary": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV V2."
        },
        "preset-194": {
            "displayName": "Pioneer4You/Green Leaf IPV V2S",
            "description": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV V2S.",
            "summary": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV V2S."
        },
        "preset-195": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 100W",
            "description": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV V3 100W.",
            "summary": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV V3 100W."
        },
        "preset-196": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 150W",
            "description": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV V3 150W.",
            "summary": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV V3 150W."
        },
        "preset-197": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 200W",
            "description": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV V3 200W.",
            "summary": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV V3 200W."
        },
        "preset-198": {
            "displayName": "Pioneer4You/Green Leaf IPV V4 100W",
            "description": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV V4 100W.",
            "summary": "Profil d'appareil de vapotage réglementé pour Pioneer4You/Green Leaf IPV V4 100W."
        },
        "preset-199": {
            "displayName": "Protovapor XPV DNA-20D",
            "description": "Profil d'appareil de vapotage réglementé pour Protovapor XPV DNA-20D.",
            "summary": "Profil d'appareil de vapotage réglementé pour Protovapor XPV DNA-20D."
        },
        "preset-200": {
            "displayName": "Protovapor XPV DNA-30D",
            "description": "Profil d'appareil de vapotage réglementé pour Protovapor XPV DNA-30D.",
            "summary": "Profil d'appareil de vapotage réglementé pour Protovapor XPV DNA-30D."
        },
        "preset-201": {
            "displayName": "Protovapor XPV DNA-40D",
            "description": "Profil d'appareil de vapotage réglementé pour Protovapor XPV DNA-40D.",
            "summary": "Profil d'appareil de vapotage réglementé pour Protovapor XPV DNA-40D."
        },
        "preset-202": {
            "displayName": "Raffmods Ranger",
            "description": "Profil d'appareil de vapotage réglementé pour Raffmods Ranger.",
            "summary": "Profil d'appareil de vapotage réglementé pour Raffmods Ranger."
        },
        "preset-203": {
            "displayName": "Reo VV Grand/Woodvil",
            "description": "Profil d'appareil de vapotage réglementé pour Reo VV Grand/Woodvil.",
            "summary": "Profil d'appareil de vapotage réglementé pour Reo VV Grand/Woodvil."
        },
        "preset-204": {
            "displayName": "Sigelei 30W",
            "description": "Profil d'appareil de vapotage réglementé pour Sigelei 30W.",
            "summary": "Profil d'appareil de vapotage réglementé pour Sigelei 30W."
        },
        "preset-205": {
            "displayName": "Sigelei Raptor",
            "description": "Profil d'appareil de vapotage réglementé pour Sigelei Raptor.",
            "summary": "Profil d'appareil de vapotage réglementé pour Sigelei Raptor."
        },
        "preset-206": {
            "displayName": "Sigelei 100W",
            "description": "Profil d'appareil de vapotage réglementé pour Sigelei 100W.",
            "summary": "Profil d'appareil de vapotage réglementé pour Sigelei 100W."
        },
        "preset-207": {
            "displayName": "Sigelei Mini",
            "description": "Profil d'appareil de vapotage réglementé pour Sigelei Mini.",
            "summary": "Profil d'appareil de vapotage réglementé pour Sigelei Mini."
        },
        "preset-208": {
            "displayName": "SvoëMesto Semovar",
            "description": "Profil d'appareil de vapotage réglementé pour SvoëMesto Semovar.",
            "summary": "Profil d'appareil de vapotage réglementé pour SvoëMesto Semovar."
        },
        "preset-209": {
            "displayName": "Vapor Flask v1/v2 DNA 30",
            "description": "Profil d'appareil de vapotage réglementé pour Vapor Flask v1/v2 DNA 30.",
            "summary": "Profil d'appareil de vapotage réglementé pour Vapor Flask v1/v2 DNA 30."
        },
        "preset-210": {
            "displayName": "Vapor Flask v2 DNA 40",
            "description": "Profil d'appareil de vapotage réglementé pour Vapor Flask v2 DNA 40.",
            "summary": "Profil d'appareil de vapotage réglementé pour Vapor Flask v2 DNA 40."
        },
        "preset-211": {
            "displayName": "Vapor Shark DNA",
            "description": "Profil d'appareil de vapotage réglementé pour Vapor Shark DNA.",
            "summary": "Profil d'appareil de vapotage réglementé pour Vapor Shark DNA."
        },
        "preset-212": {
            "displayName": "Vapor Shark DNA/rDNA 30",
            "description": "Profil d'appareil de vapotage réglementé pour Vapor Shark DNA/rDNA 30.",
            "summary": "Profil d'appareil de vapotage réglementé pour Vapor Shark DNA/rDNA 30."
        },
        "preset-213": {
            "displayName": "Vapor Shark rDNA 40",
            "description": "Profil d'appareil de vapotage réglementé pour Vapor Shark rDNA 40.",
            "summary": "Profil d'appareil de vapotage réglementé pour Vapor Shark rDNA 40."
        },
        "preset-214": {
            "displayName": "Geekvape Aegis Legend 5",
            "description": "Profil d'appareil de vapotage réglementé pour Geekvape Aegis Legend 5.",
            "summary": "Profil d'appareil de vapotage réglementé pour Geekvape Aegis Legend 5."
        },
        "preset-215": {
            "displayName": "Evolv DNA60C",
            "description": "Profil d'appareil de vapotage réglementé pour Evolv DNA60C.",
            "summary": "Profil d'appareil de vapotage réglementé pour Evolv DNA60C."
        },
        "preset-216": {
            "displayName": "Evolv DNA100C",
            "description": "Profil d'appareil de vapotage réglementé pour Evolv DNA100C.",
            "summary": "Profil d'appareil de vapotage réglementé pour Evolv DNA100C."
        },
        "preset-217": {
            "displayName": "Evolv DNA250C (2S)",
            "description": "Profil d'appareil de vapotage réglementé pour Evolv DNA250C (2S).",
            "summary": "Profil d'appareil de vapotage réglementé pour Evolv DNA250C (2S)."
        },
        "preset-218": {
            "displayName": "Evolv DNA250C (3S, US firmware)",
            "description": "Profil d'appareil de vapotage réglementé pour Evolv DNA250C (3S, US firmware).",
            "summary": "Profil d'appareil de vapotage réglementé pour Evolv DNA250C (3S, US firmware)."
        },
        "preset-219": {
            "displayName": "Evolv DNA250C (3S, international firmware)",
            "description": "Profil d'appareil de vapotage réglementé pour Evolv DNA250C (3S, international firmware).",
            "summary": "Profil d'appareil de vapotage réglementé pour Evolv DNA250C (3S, international firmware)."
        },
        "preset-220": {
            "displayName": "Evolv DNA250C (4S)",
            "description": "Profil d'appareil de vapotage réglementé pour Evolv DNA250C (4S).",
            "summary": "Profil d'appareil de vapotage réglementé pour Evolv DNA250C (4S)."
        },
        "preset-221": {
            "displayName": "VOOPOO DRAG 6",
            "description": "Profil d'appareil de vapotage réglementé pour VOOPOO DRAG 6.",
            "summary": "Profil d'appareil de vapotage réglementé pour VOOPOO DRAG 6."
        },
        "preset-222": {
            "displayName": "YiHi SXmini MQ Class",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SXmini MQ Class.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SXmini MQ Class."
        },
        "preset-223": {
            "displayName": "Evolv DNA80C",
            "description": "Profil d'appareil de vapotage réglementé pour Evolv DNA80C.",
            "summary": "Profil d'appareil de vapotage réglementé pour Evolv DNA80C."
        },
        "preset-224": {
            "displayName": "Evolv DNA75C",
            "description": "Profil d'appareil de vapotage réglementé pour Evolv DNA75C.",
            "summary": "Profil d'appareil de vapotage réglementé pour Evolv DNA75C."
        },
        "preset-225": {
            "displayName": "YiHi SX600H",
            "description": "Profil d'appareil de vapotage réglementé pour YiHi SX600H.",
            "summary": "Profil d'appareil de vapotage réglementé pour YiHi SX600H."
        },
        "preset-226": {
            "displayName": "Craving Vapor HexOhm V3",
            "description": "Profil d'appareil de vapotage réglementé pour Craving Vapor HexOhm V3.",
            "summary": "Profil d'appareil de vapotage réglementé pour Craving Vapor HexOhm V3."
        },
        "preset-227": {
            "displayName": "VOOPOO VINCI Spark220",
            "description": "Profil d'appareil de vapotage réglementé pour VOOPOO VINCI Spark220.",
            "summary": "Profil d'appareil de vapotage réglementé pour VOOPOO VINCI Spark220."
        },
        "preset-228": {
            "displayName": "Dovpo x TVC Topside Dual",
            "description": "Profil d'appareil de vapotage réglementé pour Dovpo x TVC Topside Dual.",
            "summary": "Profil d'appareil de vapotage réglementé pour Dovpo x TVC Topside Dual."
        },
        "preset-229": {
            "displayName": "VOOPOO DRAG 5",
            "description": "Profil d'appareil de vapotage réglementé pour VOOPOO DRAG 5.",
            "summary": "Profil d'appareil de vapotage réglementé pour VOOPOO DRAG 5."
        },
        "preset-230": {
            "displayName": "Geekvape L200 Classic",
            "description": "Profil d'appareil de vapotage réglementé pour Geekvape L200 Classic.",
            "summary": "Profil d'appareil de vapotage réglementé pour Geekvape L200 Classic."
        },
        "preset-231": {
            "displayName": "VAPORESSO ARMOUR MAX",
            "description": "Mod régulé double 21700 avec adaptateurs 18650 ; VAPORESSO l'annonce à 220 W ; les essais ont mesuré 208 W, 8.979 V et 39 A.",
            "summary": "Mod régulé double 21700 avec adaptateurs 18650 ; VAPORESSO l'annonce à 220 W ; les essais ont mesuré 208 W, 8.979 V et 39 A."
        },
        "preset-232": {
            "displayName": "Geekvape Aegis Legend 2 (L200)",
            "description": "Profil d'appareil de vapotage réglementé pour Geekvape Aegis Legend 2 (L200).",
            "summary": "Profil d'appareil de vapotage réglementé pour Geekvape Aegis Legend 2 (L200)."
        },
        "preset-233": {
            "displayName": "ProVape ProVari Radius 40 W",
            "description": "Profil d'appareil de vapotage réglementé pour ProVape ProVari Radius 40 W.",
            "summary": "Profil d'appareil de vapotage réglementé pour ProVape ProVari Radius 40 W."
        },
        "preset-234": {
            "displayName": "VAPORESSO GEN MAX",
            "description": "Mod régulé double 18650 ; VAPORESSO l'annonce à 220 W ; les essais ont mesuré 215 W, 9.08 V et 37 A.",
            "summary": "Mod régulé double 18650 ; VAPORESSO l'annonce à 220 W ; les essais ont mesuré 215 W, 9.08 V et 37 A."
        },
        "preset-235": {
            "displayName": "VAPORESSO ARMOUR ULTRA",
            "description": "Mod régulé à batterie intégrée annoncé à 100 W ; les essais ont mesuré 101 W, 29 A et au moins 7.97 V.",
            "summary": "Mod régulé à batterie intégrée annoncé à 100 W ; les essais ont mesuré 101 W, 29 A et au moins 7.97 V."
        },
        "preset-236": {
            "displayName": "Geekvape Aegis Solo 3",
            "description": "Mod régulé à accu 18650 unique utilisant l'AS Chip 4.0 ; le profil du fabricant indique 100 W, 7.5 V, 32 A, 0.1–3 Ω.",
            "summary": "Mod régulé à accu 18650 unique utilisant l'AS Chip 4.0 ; le profil du fabricant indique 100 W, 7.5 V, 32 A, 0.1–3 Ω."
        },
        "preset-237": {
            "displayName": "Eleaf iStick Pico 21700",
            "description": "Mod à cellule unique 21700 avec adaptateur 18650 ; Eleaf indique 100 W, 9 V, 0.05–3.5 Ω ; les essais ont relevé 30 A.",
            "summary": "Mod à cellule unique 21700 avec adaptateur 18650 ; Eleaf indique 100 W, 9 V, 0.05–3.5 Ω ; les essais ont relevé 30 A."
        },
        "preset-238": {
            "displayName": "Vandy Vape Pulse V2",
            "description": "Mod squonk régulé à cellule unique pour accus 21700, 20700 ou adaptés 18650, avec un profil prudent de 95 W, 6 V et 34 A.",
            "summary": "Mod squonk régulé à cellule unique pour accus 21700, 20700 ou adaptés 18650, avec un profil prudent de 95 W, 6 V et 34 A."
        }
    }
};
