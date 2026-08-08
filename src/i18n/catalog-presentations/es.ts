/* Google Translate machine draft. Human review may edit string values. */

import type { CatalogPresentationSet } from "../catalog-presentations";

export const presentations: CatalogPresentationSet = {
    "concepts": {
        "concept-ohms-law": {
            "displayName": "ley de ohm",
            "description": "La ley de Ohm conecta el voltaje, la corriente y la resistencia en un circuito eléctrico.",
            "summary": "La relación entre voltaje, corriente y resistencia.",
            "sections": [
                {
                    "id": "relationship",
                    "title": "la relación",
                    "paragraphs": [
                        "La relación básica es útil siempre que la resistencia de un componente sea aproximadamente constante."
                    ],
                    "formulas": [
                        {
                            "expression": "V = I × R"
                        }
                    ],
                    "bullets": [
                        "V es el voltaje, medido en voltios (V).",
                        "I es la corriente, medida en amperios o amperios (A).",
                        "R es la resistencia, medida en ohmios (\\u03a9)."
                    ]
                },
                {
                    "id": "rearranged-formulas",
                    "title": "Fórmulas reorganizadas",
                    "paragraphs": [
                        "Utilice la versión que pone el valor que desea encontrar a la izquierda:"
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
                        "El aumento de voltaje aumenta la corriente cuando la resistencia permanece igual.",
                        "El aumento de la resistencia disminuye la corriente cuando el voltaje permanece igual.",
                        "Una resistencia de cero \\u03a9 es un cortocircuito ideal y debe manejarse por separado."
                    ]
                },
                {
                    "id": "worked-examples",
                    "title": "Ejemplos resueltos",
                    "examples": [
                        {
                            "title": "Encontrar la corriente",
                            "setup": "Una fuente de 4,2 V está conectada a una carga de 1,0 \\u03a9.",
                            "formulas": [
                                "I = 4,2 V / 1,0 \\u03a9 = 4,2 A"
                            ],
                            "conclusion": "La corriente de carga es de 4,2 A."
                        },
                        {
                            "title": "encontrar resistencia",
                            "setup": "Un circuito tiene 12 V a través de él y consume 2 A.",
                            "formulas": [
                                "R = 12 V / 2 A = 6 \\u03a9"
                            ],
                            "conclusion": "La resistencia del circuito es 6 \\u03a9."
                        },
                        {
                            "title": "encontrar voltaje",
                            "setup": "Una corriente de 0,5 A fluye a través de una resistencia de 10 \\u03a9.",
                            "formulas": [
                                "V = 0,5 A × 10 Ω = 5 V"
                            ],
                            "conclusion": "El voltaje es de 5 V."
                        }
                    ]
                },
                {
                    "id": "electrical-power",
                    "title": "energía eléctrica",
                    "formulas": [
                        {
                            "expression": "P = V × I = I^2 × R = V^2 / R"
                        }
                    ],
                    "paragraphs": [
                        "La ley de Ohm se combina con la relación de potencia P = V × I. La potencia P se mide en vatios (W). Para una fuente de 4,2 V y una carga de 1,0 Ω, la potencia ideal es 17,64 W. El componente necesita suficiente capacidad térmica y espacio libre para disipar el calor resultante de forma segura."
                    ]
                },
                {
                    "id": "unit-conversions",
                    "title": "Conversiones de unidades",
                    "paragraphs": [
                        "Mantenga las unidades consistentes antes de calcular:"
                    ],
                    "bullets": [
                        "1k\\u03a9 = 1.000\\u03a9",
                        "1 m\\u03a9 = 1.000.000 \\u03a9",
                        "1 mA = 0,001 A",
                        "1W = 1.000mW"
                    ]
                },
                {
                    "id": "limits",
                    "title": "Límites del modelo",
                    "paragraphs": [
                        "La ley de Ohm es un modelo idealizado. Los componentes reales pueden ser no óhmicos: su resistencia puede cambiar con la temperatura, el voltaje, la corriente, la frecuencia o el estado de funcionamiento. Para redes en serie y paralelas, utilice las leyes de Kirchhoff junto con la ley de Ohm."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Ohm%27s_law"
        },
        "concept-joule-heating": {
            "displayName": "calentamiento en julios",
            "description": "El calentamiento Joule describe la conversión de energía eléctrica en calor cuando la corriente fluye a través de una resistencia.",
            "summary": "Cómo la corriente eléctrica convierte la resistencia en calor.",
            "sections": [
                {
                    "id": "heating-power",
                    "title": "Potencia de calefacción",
                    "paragraphs": [
                        "La potencia de calefacción eléctrica es:"
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
                        "P es la potencia en vatios (W).",
                        "V es el voltaje en voltios (V).",
                        "I es la corriente en amperios (A)."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Ejemplo resuelto",
                    "examples": [
                        {
                            "title": "Una carga resistiva",
                            "setup": "Una bobina de 0,8 \\u03a9 transporta 3 A.",
                            "formulas": [
                                "P = I^2 × R = 3^2 × 0,8 = 7,2 W",
                                "E = P × t = 7,2 W × 10 s = 72 J"
                            ],
                            "conclusion": "La bobina convierte energía en calor a 7,2 julios por segundo, o 72 J en 10 segundos."
                        }
                    ]
                },
                {
                    "id": "what-affects-heating",
                    "title": "¿Qué afecta la calefacción?",
                    "bullets": [
                        "Con una resistencia constante, duplicar la corriente produce cuatro veces la potencia de calentamiento.",
                        "A corriente constante, duplicar la resistencia duplica la potencia de calentamiento.",
                        "A voltaje constante, la reducción de la resistencia aumenta la potencia de calefacción.",
                        "La transferencia de calor al aire, al líquido y al hardware determina la temperatura real."
                    ],
                    "paragraphs": [
                        "La energía eléctrica es una tasa de transferencia de energía, no una temperatura. La capacidad calorífica y el flujo de calor determinan cómo esa energía cambia de temperatura y qué tan rápido abandona la superficie."
                    ]
                },
                {
                    "id": "practical-checks",
                    "title": "Controles prácticos",
                    "paragraphs": [
                        "Verifique que los componentes, las conexiones y el aislamiento puedan soportar la corriente y potencia esperadas. Utilice un espacio libre adecuado porque los componentes reales pueden calentarse de manera desigual y la resistencia puede cambiar con la temperatura. Las baterías y las fuentes de alimentación también tienen límites de corriente continua."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Joule_heating"
        },
        "concept-kirchhoffs-laws": {
            "displayName": "las leyes de kirchhoff",
            "description": "Las leyes de corriente y voltaje de Kirchhoff describen la conservación en los nodos del circuito y alrededor de bucles cerrados.",
            "summary": "Cómo se comportan la corriente y el voltaje en circuitos conectados.",
            "sections": [
                {
                    "id": "circuit-terms",
                    "title": "Términos del circuito",
                    "paragraphs": [
                        "Los términos básicos hacen que sea más fácil razonar sobre un diagrama de circuito:"
                    ],
                    "bullets": [
                        "Un nodo es un conjunto de conductores conectados sin ningún componente intermedio.",
                        "Una rama es una ruta de corriente entre dos nodos.",
                        "Un bucle es un camino cerrado que regresa a su punto de partida.",
                        "Una conexión en serie proporciona a la corriente un solo camino a través de los componentes.",
                        "Una conexión paralela une ramas a los mismos dos nodos."
                    ]
                },
                {
                    "id": "current-law",
                    "title": "La ley de corrientes de Kirchhoff",
                    "formulas": [
                        {
                            "expression": "Σ I = 0"
                        },
                        {
                            "expression": "Σ I_in = Σ I_out"
                        }
                    ],
                    "paragraphs": [
                        "Si entran 8 A en un nodo y una rama conduce 3 A hacia fuera, las ramas restantes deben conducir juntas 5 A hacia fuera. Elija las direcciones de corriente antes de resolver; un resultado negativo significa que la corriente real fluye en dirección opuesta a la supuesta."
                    ]
                },
                {
                    "id": "series-and-parallel",
                    "title": "Circuitos en serie y paralelo.",
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
                            "title": "Resistencias en serie",
                            "setup": "Dos resistencias de 0,20 \\u03a9 en serie están conectadas a 8,0 V.",
                            "formulas": [
                                "R_total = 0,40 \\u03a9",
                                "I = 8,0 V / 0,40 Ω = 20 A"
                            ],
                            "conclusion": "Los mismos 20 A pasan por ambas resistencias."
                        },
                        {
                            "title": "Resistencias paralelas",
                            "setup": "Dos ramas iguales de 0,40 \\u03a9 están conectadas a 4,0 V.",
                            "formulas": [
                                "R_total = 0,20 \\u03a9",
                                "I_total = 4,0 V / 0,20 Ω = 20 A"
                            ],
                            "conclusion": "Con igual resistencia de rama, cada rama transporta 10 A."
                        }
                    ]
                },
                {
                    "id": "voltage-law",
                    "title": "Ley de voltaje de Kirchhoff",
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
                        "La suma algebraica de los aumentos y caídas de voltaje alrededor de un circuito cerrado es cero. Elija una dirección de bucle y mantenga las polaridades consistentes. Invertir la dirección cambia los signos, no la solución física. Una resistencia en serie mayor tiene una caída de voltaje mayor porque la misma corriente fluye a través de cada componente en serie."
                    ]
                },
                {
                    "id": "cells",
                    "title": "Celdas en serie y paralelo",
                    "formulas": [
                        {
                            "expression": "V_pack = V_1 + V_2 + ... (series)"
                        },
                        {
                            "expression": "C_pack = C_1 + C_2 + ... (parallel)"
                        }
                    ],
                    "bullets": [
                        "Las celdas en serie agregan voltaje, mientras que la capacidad en amperios-hora sigue siendo la de una celda igual.",
                        "Las celdas paralelas mantienen el mismo voltaje mientras que la capacidad y la corriente disponible se suman aproximadamente.",
                        "El intercambio de corriente depende de la resistencia interna, los contactos, el cableado y los interruptores.",
                        "La carga de iones de litio en serie requiere monitoreo a nivel de celda y un equilibrio o protección adecuados."
                    ]
                },
                {
                    "id": "solving-and-limits",
                    "title": "Resolviendo circuitos reales",
                    "bullets": [
                        "Marque los voltajes de los nodos, las corrientes de las ramas y las direcciones de las corrientes supuestas.",
                        "Aplique KCL en nodos independientes y KVL alrededor de bucles independientes.",
                        "Relacione el voltaje y la corriente de la resistencia con V = I × R.",
                        "Resuelve las ecuaciones simultáneas y comprueba el equilibrio de potencia."
                    ],
                    "paragraphs": [
                        "Un modelo simplificado puede omitir la resistencia interna de la celda, la resistencia de contacto, la eficiencia del convertidor, los efectos de la temperatura, el comportamiento transitorio, los circuitos de protección y las tolerancias de los componentes. Incluya todos los comportamientos omitidos que afecten materialmente a un circuito de alta corriente."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Kirchhoff%27s_circuit_laws"
        },
        "concept-temperature-coefficient-of-resistance": {
            "displayName": "Coeficiente de temperatura de resistencia (TCR)",
            "description": "El coeficiente de temperatura de resistencia estima cómo cambia la resistencia a medida que un material se calienta o enfría.",
            "summary": "Cómo cambia la resistencia de un material con la temperatura.",
            "sections": [
                {
                    "id": "linear-model",
                    "title": "El modelo lineal",
                    "paragraphs": [
                        "Para un cambio de temperatura pequeño o moderado, utilice la relación de primer orden:"
                    ],
                    "formulas": [
                        {
                            "expression": "R_T = R_0 [1 + \\u03b1 (T - T_0)]"
                        }
                    ],
                    "bullets": [
                        "R_0 es la resistencia a la temperatura de referencia T_0.",
                        "R_T es la resistencia estimada a la temperatura T.",
                        "\\u03b1 es el coeficiente de temperatura del material, expresado en 1/°C o ppm/°C.",
                        "Las temperaturas deben utilizar la misma escala y unidades para la diferencia T - T_0."
                    ]
                },
                {
                    "id": "positive-and-negative",
                    "title": "TCR positivo y negativo",
                    "bullets": [
                        "Un TCR positivo significa que la resistencia aumenta a medida que aumenta la temperatura; Muchos metales se comportan de esta manera.",
                        "Un TCR negativo significa que la resistencia disminuye a medida que aumenta la temperatura.",
                        "Un TCR cercano a cero significa que la resistencia cambia poco en el rango especificado.",
                        "El signo del coeficiente importa; reemplazar un valor negativo con su valor absoluto invierte la predicción."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Ejemplo resuelto",
                    "examples": [
                        {
                            "title": "Una resistencia calentada",
                            "setup": "Se especifica una resistencia de 1,00 \\u03a9 a 20 \\u00b0C, con un TCR de 400 ppm/\\u00b0C.",
                            "formulas": [
                                "\\u03b1 = 400 × 10^-6 / \\u00b0C = 0,0004 / \\u00b0C",
                                "\\u0394T = 100 - 20 = 80 \\u00b0C",
                                "R_T = 1,00 [1 + 0,0004 × 80] = 1,032 \\u03a9"
                            ],
                            "conclusion": "La resistencia estimada es 1,032 \\u03a9, aproximadamente un 3,2% por encima de su valor a 20 \\u00b0C."
                        }
                    ]
                },
                {
                    "id": "power-and-limits",
                    "title": "TCR, potencia y límites prácticos",
                    "formulas": [
                        {
                            "expression": "I = V / R"
                        },
                        {
                            "expression": "P = V^2 / R = I^2 × R"
                        }
                    ],
                    "paragraphs": [
                        "Para una resistencia TCR positiva accionada a voltaje constante, el aumento de temperatura aumenta la resistencia y tiende a reducir la corriente. Para una fuente de corriente constante, el mismo aumento de resistencia aumenta la potencia.",
                        "El TCR de un fabricante normalmente se aplica a un rango de temperatura y resistencia establecido. Los gradientes de temperatura, los cambios de material, los contactos, la tensión mecánica y el autocalentamiento pueden hacer que un resultado real difiera de la estimación de primer orden."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Temperature_coefficient_of_resistance"
        },
        "concept-trigonometry": {
            "displayName": "Trigonometría",
            "description": "La trigonometría relaciona ángulos y longitudes y es útil para vectores, relaciones de fase y formas de onda.",
            "summary": "Relaciones entre ángulos y lados de triángulos.",
            "sections": [
                {
                    "id": "right-triangles",
                    "title": "triangulos rectángulos",
                    "paragraphs": [
                        "Con respecto a un ángulo θ, el lado opuesto está frente a él, el lado adyacente lo toca excluyendo la hipotenusa y la hipotenusa está opuesta al ángulo recto. SOH-CAH-TOA es una ayuda para la memoria: el seno es opuesto a la hipotenusa, el coseno es adyacente a la hipotenusa y la tangente es opuesta a la adyacente."
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
                    "title": "Encontrar lados y ángulos desconocidos",
                    "examples": [
                        {
                            "title": "encontrar un lado",
                            "setup": "Una hipotenusa de 10 cm forma un ángulo de 30°.",
                            "formulas": [
                                "opuesto = 10 × pecado(30°) = 5 cm",
                                "adyacente = 10 × cos(30°) ≈ 8,66 cm"
                            ],
                            "conclusion": "Utilice una función trigonométrica inversa cuando se conozcan las longitudes de los lados."
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
                    "title": "Grados y radianes",
                    "formulas": [
                        {
                            "expression": "180° = π radians"
                        },
                        {
                            "expression": "θ_rad = θ_deg × π / 180"
                        }
                    ],
                    "paragraphs": [
                        "Una calculadora debe estar en el modo de ángulo correcto. Usar el modo de grados para un valor en radianes, o viceversa, produce un resultado diferente. Un ciclo completo es de 360° o 2π radianes."
                    ]
                },
                {
                    "id": "waveforms-and-identities",
                    "title": "Formas de onda e identidades útiles.",
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
                        "A es amplitud, f es frecuencia en hercios, t es tiempo en segundos y φ es ángulo de fase.",
                        "La frecuencia angular ω se mide en radianes por segundo.",
                        "Mantenga el signo y el cuadrante cuando la dirección o la fase sean importantes."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Trigonometry"
        },
        "concept-heat-capacity": {
            "displayName": "Capacidad calorífica",
            "description": "La capacidad calorífica conecta la energía transferida con el cambio de temperatura de un objeto o material.",
            "summary": "Cuánta energía necesita un objeto para cambiar de temperatura.",
            "sections": [
                {
                    "id": "basic-relationships",
                    "title": "Relaciones básicas",
                    "formulas": [
                        {
                            "expression": "C = Q / ΔT"
                        },
                        {
                            "expression": "Q = m × c × ΔT"
                        }
                    ],
                    "bullets": [
                        "C es la capacidad calorífica en J/K o J/°C.",
                        "Q es energía térmica transferida en julios (J).",
                        "m es la masa en kilogramos y c es la capacidad calorífica específica en J/(kg·K).",
                        "Una diferencia de temperatura de 1 K es del mismo tamaño que una diferencia de 1 °C."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Ejemplo resuelto",
                    "examples": [
                        {
                            "title": "Calentar agua",
                            "setup": "Calentar 0,20 kg de agua de 20 °C a 70 °C usando c = 4180 J/(kg·K).",
                            "formulas": [
                                "ΔT = 70 - 20 = 50 °C",
                                "Q = 0,20 × 4.180 × 50 = 41.800 J"
                            ],
                            "conclusion": "El requerimiento energético ideal es 41,8 kJ; un calentador real necesita más debido a las pérdidas."
                        }
                    ]
                },
                {
                    "id": "electrical-heating",
                    "title": "Calefacción con energía eléctrica.",
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
                            "title": "Tiempo ideal de calentamiento",
                            "setup": "Calienta el ejemplo de 41,8 kJ con una fuente constante de 100 W y sin pérdidas.",
                            "formulas": [
                                "t = 41.800 J / 100 W = 418 s"
                            ],
                            "conclusion": "El tiempo ideal es de unos 7,0 minutos; con una eficiencia de transferencia del 80%, son aproximadamente 523 segundos."
                        }
                    ]
                },
                {
                    "id": "object-and-material",
                    "title": "Objeto versus material",
                    "paragraphs": [
                        "La capacidad calorífica pertenece a todo el objeto y depende de la cantidad de material presente. La capacidad calorífica específica es una propiedad del material. Al duplicar la masa se duplica la capacidad calorífica del mismo material."
                    ],
                    "formulas": [
                        {
                            "expression": "C_total = Σ m_i × c_i"
                        }
                    ]
                },
                {
                    "id": "phase-changes-and-limits",
                    "title": "Cambios de fase y límites prácticos.",
                    "formulas": [
                        {
                            "expression": "Q = m × L"
                        }
                    ],
                    "paragraphs": [
                        "Durante la fusión o ebullición, la energía suministrada puede cambiar el estado del material sin cambiar su temperatura. L es el calor latente específico en J/kg.",
                        "La ecuación simple supone que el calor específico es aproximadamente constante. La pérdida de calor, la convección, la radiación, la evaporación, la resistencia de contacto y la temperatura desigual pueden hacer que un resultado real difiera del ideal."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_capacity"
        },
        "concept-heat-flux": {
            "displayName": "flujo de calor",
            "description": "El flujo de calor describe la rapidez con la que el calor atraviesa una superficie, independientemente de la cantidad total de material que almacena calor.",
            "summary": "La tasa de transferencia de calor a través de una unidad de área.",
            "sections": [
                {
                    "id": "definition",
                    "title": "Definición",
                    "formulas": [
                        {
                            "expression": "q'' = Q_dot / A"
                        }
                    ],
                    "bullets": [
                        "q'' es el flujo de calor en W/m².",
                        "Q_dot es la tasa total de transferencia de calor en vatios (W).",
                        "A es el área a través de la cual se transfiere calor en metros cuadrados (m²)."
                    ],
                    "paragraphs": [
                        "El flujo de calor es diferente de la capacidad calorífica: la capacidad calorífica describe la energía almacenada por cambio de temperatura, mientras que el flujo de calor describe la velocidad a la que el calor cruza una superficie."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Ejemplo resuelto",
                    "examples": [
                        {
                            "title": "Flujo promedio del calentador",
                            "setup": "Un calentador de 100 W transfiere calor a través de un área de 0,020 m².",
                            "formulas": [
                                "q'' = 100 W / 0,020 m² = 5.000 W/m²"
                            ],
                            "conclusion": "El flujo de calor medio es de 5.000 W/m², o 0,5 W/cm²."
                        }
                    ]
                },
                {
                    "id": "conduction",
                    "title": "Conducción a través de una capa plana.",
                    "formulas": [
                        {
                            "expression": "q'' = -k × ΔT / L"
                        },
                        {
                            "expression": "Q_dot = k × A × (T_hot - T_cold) / L"
                        }
                    ],
                    "bullets": [
                        "k es la conductividad térmica en W/(m·K).",
                        "ΔT es la diferencia de temperatura a través de la capa.",
                        "L es el espesor de la capa en metros.",
                        "El signo menos indica flujo desde una temperatura más alta hacia una temperatura más baja."
                    ]
                },
                {
                    "id": "convection-and-radiation",
                    "title": "Convección y radiación",
                    "formulas": [
                        {
                            "expression": "q'' = h × (T_s - T_∞)"
                        },
                        {
                            "expression": "q'' = ε × σ × (T_s^4 - T_sur^4)"
                        }
                    ],
                    "paragraphs": [
                        "La convección utiliza un coeficiente de superficie h. La radiación utiliza la emisividad ε y la constante de Stefan-Boltzmann σ; Las temperaturas en la ecuación de radiación deben ser temperaturas absolutas en kelvin."
                    ]
                },
                {
                    "id": "practical-checks",
                    "title": "Controles prácticos",
                    "bullets": [
                        "Convierta el área a m² antes de usar W/m².",
                        "Distinguir el flujo de calor promedio de un pico local; el calentamiento puede ser desigual.",
                        "Incluya resistencia de contacto, convección, radiación y pérdida de calor cuando sea necesario.",
                        "El flujo de calor es una tasa de transferencia, no una temperatura; utilizar la capacidad calorífica para el cambio de temperatura."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_flux"
        },
        "concept-si-system-and-imperial-units": {
            "displayName": "El sistema SI y las medidas imperiales.",
            "description": "El Sistema Internacional de Unidades proporciona unidades base, unidades derivadas y escalas decimales consistentes para ingeniería.",
            "summary": "Las unidades, prefijos y conversiones utilizadas en los cálculos de ingeniería.",
            "sections": [
                {
                    "id": "base-units",
                    "title": "Unidades SI comunes",
                    "table": {
                        "headers": [
                            "Cantidad",
                            "unidad SI",
                            "Símbolo"
                        ],
                        "rows": [
                            [
                                "Longitud",
                                "metro",
                                "metro"
                            ],
                            [
                                "Masa",
                                "kilogramo",
                                "kilos"
                            ],
                            [
                                "Tiempo",
                                "segundo",
                                "s"
                            ],
                            [
                                "Temperatura",
                                "kelvin",
                                "k"
                            ],
                            [
                                "Corriente eléctrica",
                                "amperio",
                                "A"
                            ],
                            [
                                "cantidad de sustancia",
                                "lunar",
                                "moles"
                            ],
                            [
                                "Intensidad luminosa",
                                "candela",
                                "cd"
                            ]
                        ]
                    },
                    "bullets": [
                        "Voltaje: voltio (V).",
                        "Resistencia: ohmios (\\u03a9).",
                        "Potencia: vatio (W).",
                        "Energía: julio (J).",
                        "Fuerza: Newton (N).",
                        "Presión: pascales (Pa).",
                        "Frecuencia: hercios (Hz)."
                    ]
                },
                {
                    "id": "decimal-prefixes",
                    "title": "Prefijos decimales",
                    "table": {
                        "headers": [
                            "Prefijo",
                            "Símbolo",
                            "Factor"
                        ],
                        "rows": [
                            [
                                "kilo",
                                "k",
                                "1000 = 10^3"
                            ],
                            [
                                "mega",
                                "METRO",
                                "1.000.000 = 10^6"
                            ],
                            [
                                "mili",
                                "metro",
                                "0,001 = 10^-3"
                            ],
                            [
                                "micro",
                                "µ",
                                "0,000001 = 10^-6"
                            ],
                            [
                                "nano",
                                "norte",
                                "0.000000001 = 10^-9"
                            ]
                        ]
                    },
                    "paragraphs": [
                        "Por ejemplo, 2,2 k\\u03a9 equivale a 2200 \\u03a9 y 15 mA equivalen a 0,015 A. Convierta los valores a unidades compatibles antes de usar una fórmula."
                    ]
                },
                {
                    "id": "length-conversions",
                    "title": "Pulgadas y longitud métrica",
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
                            "title": "Convertir longitud",
                            "setup": "Convierta 0,1 pulgadas a milímetros y 5 mm a pulgadas.",
                            "formulas": [
                                "0,1 pulgadas × 25,4 = 2,54 mm",
                                "5 mm/25,4 ≈ 0,19685 pulgadas"
                            ],
                            "conclusion": "Las conversiones de área y volumen utilizan el factor de longitud elevado a la potencia relevante."
                        }
                    ]
                },
                {
                    "id": "other-conversions",
                    "title": "Otras conversiones comunes",
                    "bullets": [
                        "1 libra ≈ 0,45359237 kg.",
                        "1 libra ≈ 4,44822 N.",
                        "1 psi ≈ 6.894,76 Pa.",
                        "°F = °C × 9/5 + 32.",
                        "°C = (°F - 32) × 5/9.",
                        "K = ºC + 273,15."
                    ],
                    "paragraphs": [
                        "Una libra puede referirse a masa (lb) o fuerza (lbf), que son cantidades diferentes. Asimismo, las pulgadas, las pulgadas cuadradas y las pulgadas cúbicas miden diferentes dimensiones."
                    ]
                },
                {
                    "id": "unit-checks",
                    "title": "Controles prácticos de unidades",
                    "bullets": [
                        "Escribe la unidad al lado de cada valor mientras calculas.",
                        "Confirma que ambos lados de una ecuación tienen dimensiones compatibles.",
                        "Convierta antes de multiplicar o dividir.",
                        "Redondee solo al final para que los resultados intermedios conserven una precisión útil."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/International_System_of_Units"
        },
        "concept-wire-gauges-awg-swg-bwg": {
            "displayName": "Calibres de cables: AWG, SWG y BWG",
            "description": "Un número de calibre describe un tamaño nominal sólo cuando se nombra su sistema de calibre.",
            "summary": "Por qué los números de calibre de alambre necesitan un sistema con nombre y un diámetro establecido.",
            "sections": [
                {
                    "id": "gauge-systems",
                    "title": "Sistemas de calibre",
                    "bullets": [
                        "AWG es el calibre de alambre estadounidense, también conocido históricamente como calibre Brown & Sharpe.",
                        "SWG es Standard Wire Gauge, el histórico sistema británico de espesor de alambre y láminas.",
                        "BWG es el calibre de alambre de Birmingham, utilizado históricamente para espesores de alambre, tubos y láminas de hierro.",
                        "Un número de calibre ordinario mayor generalmente significa un diámetro menor; los tamaños por encima del calibre 0 utilizan 00, 000 o 0000."
                    ],
                    "paragraphs": [
                        "SWG y BWG son sistemas tabulados y no deben calcularse con la fórmula AWG. Por lo tanto, el mismo número no identifica el mismo diámetro en todos los sistemas."
                    ]
                },
                {
                    "id": "awg-formula",
                    "title": "Diámetro y área AWG",
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
                        "Para 1/0, 2/0, 3/0 y 4/0, utilice n = 0, -1, -2 y -3. AWG determina el tamaño del conductor, no una corriente segura universal; La ampacidad también depende del material, el aislamiento, la refrigeración, la instalación y las normas eléctricas aplicables."
                    ]
                },
                {
                    "id": "system-comparison",
                    "title": "Por qué es importante el nombre del sistema",
                    "table": {
                        "headers": [
                            "Indicador",
                            "AWG",
                            "SWG británico",
                            "BWG"
                        ],
                        "rows": [
                            [
                                "10",
                                "2.588 milímetros",
                                "3.251 milímetros",
                                "3.404 milímetros"
                            ],
                            [
                                "20",
                                "0,8128 milímetros",
                                "0,9144 milímetros",
                                "0,8890 milímetros"
                            ],
                            [
                                "30",
                                "0,2540 milímetros",
                                "0,3150 milímetros",
                                "0,3048 milímetros"
                            ]
                        ]
                    },
                    "paragraphs": [
                        "Estos valores son nominales. Las tolerancias del producto, los recubrimientos, el aislamiento y la construcción trenzada pueden cambiar el diámetro medido o total."
                    ]
                },
                {
                    "id": "resistance",
                    "title": "Calibre, área y resistencia.",
                    "formulas": [
                        {
                            "expression": "R = ρ × L / A"
                        }
                    ],
                    "paragraphs": [
                        "La resistencia depende de la longitud del conductor L, el área de la sección transversal A y la resistividad del material ρ. Debido a que el área varía con el cuadrado del diámetro, una diferencia modesta en el diámetro puede generar una diferencia sustancial en la resistencia. En AWG, aumentar el calibre en tres tamaños aproximadamente reduce a la mitad el área y duplica la resistencia por unidad de longitud para el mismo material y temperatura."
                    ]
                },
                {
                    "id": "practical-specification",
                    "title": "Especificación práctica",
                    "bullets": [
                        "Asigne un nombre al sistema, como 24 AWG o 24 British SWG.",
                        "Incluya el diámetro nominal en milímetros cuando los sistemas puedan confundirse.",
                        "Indique si la dimensión es conductor desnudo, diámetro aislado, espesor de la lámina o espesor de la pared del tubo.",
                        "Para conductores trenzados, incluya la construcción de los hilos cuando la flexibilidad y el diámetro total sean importantes.",
                        "Determine la capacidad de corriente a partir de los datos del producto y las reglas eléctricas, no solo del número de calibre."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Wire_gauge"
        }
    },
    "materials": {
        "ka1": {
            "displayName": "Kanthal A1 / APM",
            "description": "Perfil de catálogo para Kanthal A1 / APM.",
            "summary": "Perfil de catálogo para Kanthal A1 / APM."
        },
        "ka": {
            "displayName": "Kanthal A / AE / AF",
            "description": "Perfil de catálogo para Kanthal A / AE / AF.",
            "summary": "Perfil de catálogo para Kanthal A / AE / AF."
        },
        "kd": {
            "displayName": "Kanthal D",
            "description": "Perfil de catálogo para Kanthal D.",
            "summary": "Perfil de catálogo para Kanthal D."
        },
        "n20": {
            "displayName": "Nichrome N20",
            "description": "Perfil de catálogo para Nichrome N20.",
            "summary": "Perfil de catálogo para Nichrome N20."
        },
        "n40": {
            "displayName": "Nichrome N40",
            "description": "Perfil de catálogo para Nichrome N40.",
            "summary": "Perfil de catálogo para Nichrome N40."
        },
        "n60": {
            "displayName": "Nichrome N60 (C)",
            "description": "Perfil de catálogo para Nichrome N60 (C).",
            "summary": "Perfil de catálogo para Nichrome N60 (C)."
        },
        "n70": {
            "displayName": "Nichrome N70 (B)",
            "description": "Perfil de catálogo para Nichrome N70 (B).",
            "summary": "Perfil de catálogo para Nichrome N70 (B)."
        },
        "n80": {
            "displayName": "Nichrome N80 (A)",
            "description": "Perfil de catálogo para Nichrome N80 (A).",
            "summary": "Perfil de catálogo para Nichrome N80 (A)."
        },
        "ss304": {
            "displayName": "SS 304",
            "description": "Perfil de catálogo para SS 304.",
            "summary": "Perfil de catálogo para SS 304."
        },
        "ss316": {
            "displayName": "SS 316",
            "description": "Perfil de catálogo para SS 316.",
            "summary": "Perfil de catálogo para SS 316."
        },
        "ss316l": {
            "displayName": "SS 316L / Elite",
            "description": "Perfil de catálogo para SS 316L / Elite.",
            "summary": "Perfil de catálogo para SS 316L / Elite."
        },
        "ss317l": {
            "displayName": "SS 317L / Haywire",
            "description": "Perfil de catálogo para SS 317L / Haywire.",
            "summary": "Perfil de catálogo para SS 317L / Haywire."
        },
        "ss430": {
            "displayName": "SS 430",
            "description": "Perfil de catálogo para SS 430.",
            "summary": "Perfil de catálogo para SS 430."
        },
        "ti1": {
            "displayName": "Titanium 1",
            "description": "Perfil de catálogo para Titanium 1.",
            "summary": "Perfil de catálogo para Titanium 1."
        },
        "ti2": {
            "displayName": "Titanium 2 (R50400)",
            "description": "Perfil de catálogo para Titanium 2 (R50400).",
            "summary": "Perfil de catálogo para Titanium 2 (R50400)."
        },
        "tie": {
            "displayName": "Titanium ready (e-SG)",
            "description": "Perfil de catálogo para Titanium ready (e-SG).",
            "summary": "Perfil de catálogo para Titanium ready (e-SG)."
        },
        "w": {
            "displayName": "Tungsten",
            "description": "Perfil de catálogo para Tungsten.",
            "summary": "Perfil de catálogo para Tungsten."
        },
        "nio": {
            "displayName": "Niobium alloy",
            "description": "Perfil de catálogo para Niobium alloy.",
            "summary": "Perfil de catálogo para Niobium alloy."
        },
        "ni200": {
            "displayName": "Nickel 200 / Ni200 (UNS N02200)",
            "description": "Perfil de catálogo para Nickel 200 / Ni200 (UNS N02200).",
            "summary": "Perfil de catálogo para Nickel 200 / Ni200 (UNS N02200)."
        },
        "nife30": {
            "displayName": "NiFe30 (Resistherm - TFR)",
            "description": "Perfil de catálogo para NiFe30 (Resistherm - TFR).",
            "summary": "Perfil de catálogo para NiFe30 (Resistherm - TFR)."
        },
        "dicodes": {
            "displayName": "NiFe30 (Resistherm - TCR)",
            "description": "Perfil de catálogo para NiFe30 (Resistherm - TCR).",
            "summary": "Perfil de catálogo para NiFe30 (Resistherm - TCR)."
        },
        "reactor": {
            "displayName": "NiFe (Reactor Wire)",
            "description": "Perfil de catálogo para NiFe (Reactor Wire).",
            "summary": "Perfil de catálogo para NiFe (Reactor Wire)."
        },
        "nife30stealth": {
            "displayName": "NiFe30 (StealthVape)",
            "description": "Perfil de catálogo para NiFe30 (StealthVape).",
            "summary": "Perfil de catálogo para NiFe30 (StealthVape)."
        },
        "nft70": {
            "displayName": "Nifethal 70 (Alloy120)",
            "description": "Perfil de catálogo para Nifethal 70 (Alloy120).",
            "summary": "Perfil de catálogo para Nifethal 70 (Alloy120)."
        },
        "nft52": {
            "displayName": "Nifethal 52 (Alloy52)",
            "description": "Perfil de catálogo para Nifethal 52 (Alloy52).",
            "summary": "Perfil de catálogo para Nifethal 52 (Alloy52)."
        },
        "zr": {
            "displayName": "Zirconium (pure)",
            "description": "Perfil de catálogo para Zirconium (pure).",
            "summary": "Perfil de catálogo para Zirconium (pure)."
        },
        "n90": {
            "displayName": "Nichrome N90 (Ni90Cr10)",
            "description": "Perfil de catálogo para Nichrome N90 (Ni90Cr10).",
            "summary": "Perfil de catálogo para Nichrome N90 (Ni90Cr10)."
        },
        "ss904l": {
            "displayName": "SS 904L (UNS N08904)",
            "description": "Perfil de catálogo para SS 904L (UNS N08904).",
            "summary": "Perfil de catálogo para SS 904L (UNS N08904)."
        }
    },
    "batteries": {
        "battery-1": {
            "displayName": "AW IMR 14500",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-2": {
            "displayName": "AW IMR 14500",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-3": {
            "displayName": "AW IMR 16340",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-4": {
            "displayName": "AW IMR 18350",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-5": {
            "displayName": "AW IMR 18350",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-6": {
            "displayName": "AW IMR 18490",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-7": {
            "displayName": "AW IMR 18490",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-8": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-9": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-10": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-11": {
            "displayName": "AWT 26650 4500mAh 75A",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-12": {
            "displayName": "EH IMR 18350",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-13": {
            "displayName": "EH IMR 18500",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-14": {
            "displayName": "EH IMR 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-15": {
            "displayName": "EH IMR 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-16": {
            "displayName": "Efest IMR 18350",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-17": {
            "displayName": "Efest IMR 18350",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-18": {
            "displayName": "Efest IMR 18490",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-19": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-20": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-21": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-22": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-23": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-24": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-25": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-26": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-27": {
            "displayName": "Efest IMR 18650 35A",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-28": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-29": {
            "displayName": "Efest IMR 26650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-30": {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": undefined,
            "summary": "Una batería interna en el dispositivo en lugar de una celda reemplazable por el usuario.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-31": {
            "displayName": "Innokin iTaste VV v3",
            "description": undefined,
            "summary": "Una batería interna en el dispositivo en lugar de una celda reemplazable por el usuario.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-32": {
            "displayName": "Keeppower IMR26650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-33": {
            "displayName": "LG 18650HB6",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-34": {
            "displayName": "LG 18650HE2",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-35": {
            "displayName": "LG 18650HG2",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-36": {
            "displayName": "MNKE IMR 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-37": {
            "displayName": "MNKE IMR 26650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-38": {
            "displayName": "MXJO IMR 18650 35A",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-39": {
            "displayName": "MXJO IMR 18650 20A",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-40": {
            "displayName": "Nitecore NL188",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-41": {
            "displayName": "Orbtronic 18650 PD2900",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-42": {
            "displayName": "Orbtronic 18650 SX22",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-43": {
            "displayName": "Orbtronic 18650 SX30",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-44": {
            "displayName": "Orbtronic 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-45": {
            "displayName": "Orbtronic CGR18650CH",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-46": {
            "displayName": "Orbtronic NCR18650A",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-47": {
            "displayName": "Panasonic CGR18650CH",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-48": {
            "displayName": "Panasonic NCR18650A",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-49": {
            "displayName": "Panasonic NCR18650B",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-50": {
            "displayName": "Panasonic NCR18650BD",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-51": {
            "displayName": "Panasonic NCR18650PF",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-52": {
            "displayName": "Panasonic CGR26650A",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-53": {
            "displayName": "Samsung ICR18650-26F",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-54": {
            "displayName": "Panasonic NCR18650PD",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-55": {
            "displayName": "Samsung INR18650-20R",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-56": {
            "displayName": "Samsung INR18650-25R",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-57": {
            "displayName": "Samsung INR18650-20Q",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-58": {
            "displayName": "Samsung INR18650-30Q",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-59": {
            "displayName": "Sanyo UR16650ZTA",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-60": {
            "displayName": "Sanyo UR18650EX",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-61": {
            "displayName": "Sanyo UR18650F",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": "Batería de bajo consumo; no apto para vapear."
        },
        "battery-62": {
            "displayName": "Sibeile IMR 18500",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-63": {
            "displayName": "Sibeile IMR 18500",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-64": {
            "displayName": "Sony US18650VTC3",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-65": {
            "displayName": "Sony US18650VTC4",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-66": {
            "displayName": "Sony US18650VTC5",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-67": {
            "displayName": "Sony US18650v3",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-68": {
            "displayName": "Sony US26650VT",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-69": {
            "displayName": "Torchy IMR 18350",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-70": {
            "displayName": "Vappower IMR 26650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-71": {
            "displayName": "Vamped 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "20 A calificación continua; No se utilizan clasificaciones de pulso."
            ],
            "safetyText": undefined
        },
        "battery-72": {
            "displayName": "UltraFire BRC 18650 4000mAh li-ion",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "La capacidad real es menor de lo que sugiere la etiqueta."
            ],
            "safetyText": undefined
        },
        "battery-73": {
            "displayName": "UltraFire XSL 18350 1200mAh",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "La capacidad real es menor de lo que sugiere la etiqueta."
            ],
            "safetyText": undefined
        },
        "battery-74": {
            "displayName": "Vamped 26650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-75": {
            "displayName": "Xtar IMR 18350",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-76": {
            "displayName": "Xtar IMR 18500",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-77": {
            "displayName": "EVE INR18650/30P",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "20 Un valor de comparación independiente conservador; La envoltura exacta y la revisión de la producción siguen siendo relevantes."
            ],
            "safetyText": undefined
        },
        "battery-78": {
            "displayName": "EVE INR18650/25P",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "15 Un valor conservador de pruebas de modelo exacto; La revisión probada con la marca CCC sigue siendo relevante."
            ],
            "safetyText": undefined
        },
        "battery-79": {
            "displayName": "EVE INR18650/30PL",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "45 Un valor continuo independiente para la revisión sin tablas probadas; no sustituya las clasificaciones de pulso."
            ],
            "safetyText": undefined
        },
        "battery-80": {
            "displayName": "Ampace JP30P1",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "36 Un verdadero valor continuo; la cifra de 56 A está limitada por temperatura."
            ],
            "safetyText": undefined
        },
        "battery-81": {
            "displayName": "Tenpower INR18650-30XG",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "40 Un valor conservador; Las células probadas parecían preproducción y carecían del logotipo CCC."
            ],
            "safetyText": undefined
        },
        "battery-82": {
            "displayName": "EVE INR21700/58E",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "13 Un valor continuo recomendado; 16,8 A es un máximo absoluto no previsto para la vida útil."
            ],
            "safetyText": undefined
        },
        "battery-83": {
            "displayName": "Reliance INR21700-RS40",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "40 Un valor conservador; 70 A tiene una temperatura limitada y las muestras analizadas eran de preproducción."
            ],
            "safetyText": undefined
        },
        "battery-84": {
            "displayName": "Reliance INR21700-RS50",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "40 Un valor comparativo de la celda de producción; 70 A requiere control de temperatura."
            ],
            "safetyText": undefined
        },
        "battery-85": {
            "displayName": "Vapcell S41",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "40 Un valor de envoltura exacta; 70 A está limitado a 60 C y se prueba como un reenvoltorio EVE 40PL."
            ],
            "safetyText": undefined
        },
        "battery-86": {
            "displayName": "BAK 21700-65E",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "19 Un valor conservador; Las muestras exactas probadas parecían de preproducción y carecían de marcas CCC."
            ],
            "safetyText": undefined
        },
        "battery-87": {
            "displayName": "Tenpower INR21700-50XG",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "40 Un valor conservador; 90 A tiene una temperatura limitada y las células probadas parecían de preproducción."
            ],
            "safetyText": undefined
        },
        "battery-88": {
            "displayName": "Tenpower INR21700-60XG",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "40 Un valor conservador; 60 A tiene una temperatura limitada y la continuidad de la producción sigue sin resolverse."
            ],
            "safetyText": undefined
        },
        "battery-89": {
            "displayName": "Great Power 50Q",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "40 Un valor conservador; Las muestras analizadas tenían una capacidad inconsistente y carecían de marcas CCC/CE."
            ],
            "safetyText": undefined
        },
        "battery-90": {
            "displayName": "FEB 21700-68E",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "13 Un valor conservador; Las muestras exactas probadas parecían de preproducción y carecían de marcas CCC."
            ],
            "safetyText": undefined
        },
        "battery-91": {
            "displayName": "Reliance INR21700-RS60",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "30 Un valor continuo estimado por el probador; El máximo de 50 A del Reliance tiene una temperatura limitada."
            ],
            "safetyText": undefined
        },
        "battery-92": {
            "displayName": "Reliance INR21700-RH60",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "20 Un valor continuo de dos lotes probados relacionados con la producción; 30 A tiene limitación de temperatura."
            ],
            "safetyText": undefined
        },
        "battery-93": {
            "displayName": "Amprius INR18650/40 (SA110)",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "12 A continuo; 20 A es solo de pulso. La envoltura exacta probada se registra como SA110/INR18650/40."
            ],
            "safetyText": undefined
        },
        "battery-94": {
            "displayName": "Vapcell B30 18650",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "20 Un valor de envoltura exacta; el probador recomienda menos de 15 A continuos. Vapehuset anuncia 25 A en su título, y las revisiones posteriores del envoltorio o del abastecimiento pueden diferir."
            ],
            "safetyText": undefined
        },
        "battery-95": {
            "displayName": "Golisi S35 21700",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "30 Un valor de modelo exacto; Se trata de una reelaboración y las revisiones posteriores del envoltorio o el abastecimiento subyacente pueden diferir."
            ],
            "safetyText": undefined
        },
        "battery-96": {
            "displayName": "iJoy 20700 3000mAh five-leg",
            "description": undefined,
            "summary": "Una celda recargable extraíble utilizada en dispositivos compatibles.",
            "notes": [
                "30 Un valor de revisión exacto de cinco patas; Las revisiones de cuatro patas y posteriores que utilizan la misma envoltura son materialmente diferentes y no deben heredar este perfil."
            ],
            "safetyText": undefined
        }
    },
    "mods": {
        "preset-1": {
            "displayName": "AceSmok Ace 50",
            "description": "Un perfil de dispositivo de vapeo regulado para AceSmok Ace 50.",
            "summary": "Un perfil de dispositivo de vapeo regulado para AceSmok Ace 50."
        },
        "preset-2": {
            "displayName": "Ante Meridiem Axis",
            "description": "Un perfil de dispositivo de vapeo regulado para Ante Meridiem Axis.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Ante Meridiem Axis."
        },
        "preset-3": {
            "displayName": "Anyvape AnyMOD",
            "description": "Un perfil de dispositivo de vapeo regulado para Anyvape AnyMOD.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Anyvape AnyMOD."
        },
        "preset-4": {
            "displayName": "Arrow 100W",
            "description": "Un perfil de dispositivo de vapeo regulado para Arrow 100W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Arrow 100W."
        },
        "preset-5": {
            "displayName": "Artisan Supermax",
            "description": "Un perfil de dispositivo de vapeo regulado para Artisan Supermax.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Artisan Supermax."
        },
        "preset-6": {
            "displayName": "Asmodus Snow Wolf 200W",
            "description": "Un perfil de dispositivo de vapeo regulado para Asmodus Snow Wolf 200W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Asmodus Snow Wolf 200W."
        },
        "preset-7": {
            "displayName": "Aspire CF Sub Ohm",
            "description": "Un perfil de dispositivo de vapeo regulado para Aspire CF Sub Ohm.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Aspire CF Sub Ohm."
        },
        "preset-8": {
            "displayName": "Beastmode Industries BMI 100 Watt V.1",
            "description": "Un perfil de dispositivo de vapeo regulado para Beastmode Industries BMI 100 Watt V.1.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Beastmode Industries BMI 100 Watt V.1."
        },
        "preset-9": {
            "displayName": "Billet Box rev. 3a",
            "description": "Billet Box Rev. 3a con un acabado de aluminio anodizado brillante y granallado; introducido en mayo de 2014.",
            "summary": "Caja Billet Rev."
        },
        "preset-10": {
            "displayName": "Cloupor DNA-30",
            "description": "Un dispositivo Cloupor de 30 W que utiliza un chipset clonado estilo DNA30 de terceros, no una placa Evolv DNA-30D auténtica.",
            "summary": "Un dispositivo Cloupor de 30 W que utiliza un chipset clonado estilo DNA30 de terceros, no una placa Evolv DNA-30D auténtica."
        },
        "preset-11": {
            "displayName": "Cloupor DNA-50",
            "description": "Un perfil de dispositivo de vapeo regulado para Cloupor DNA-50.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Cloupor DNA-50."
        },
        "preset-12": {
            "displayName": "Cloupor GT",
            "description": "Un perfil de dispositivo de vapeo regulado para Cloupor GT.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Cloupor GT."
        },
        "preset-13": {
            "displayName": "Cloupor Mini",
            "description": "Un perfil de dispositivo de vapeo regulado para Cloupor Mini.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Cloupor Mini."
        },
        "preset-14": {
            "displayName": "Cloupor T5",
            "description": "Un perfil de dispositivo de vapeo regulado para Cloupor T5.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Cloupor T5."
        },
        "preset-15": {
            "displayName": "Cloupor T6",
            "description": "Un perfil de dispositivo de vapeo regulado para Cloupor T6.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Cloupor T6."
        },
        "preset-16": {
            "displayName": "Cloupor T8",
            "description": "Un perfil de dispositivo de vapeo regulado para Cloupor T8.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Cloupor T8."
        },
        "preset-17": {
            "displayName": "Cloupor ZNA50",
            "description": "Un perfil de dispositivo de vapeo regulado para Cloupor ZNA50.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Cloupor ZNA50."
        },
        "preset-18": {
            "displayName": "C-Tratech Smart Box 50W",
            "description": "Un perfil de dispositivo de vapeo regulado para C-Tratech Smart Box 50W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para C-Tratech Smart Box 50W."
        },
        "preset-19": {
            "displayName": "Dicodes Dani Extreme",
            "description": "Un perfil de dispositivo de vapeo regulado para Dicodes Dani Extreme.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Dicodes Dani Extreme."
        },
        "preset-20": {
            "displayName": "Dicodes Dani Extreme v2 / Pipeline Pro v2",
            "description": "Un perfil de dispositivo de vapeo regulado para Dicodes Dani Extreme v2 / Pipeline Pro v2.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Dicodes Dani Extreme v2 / Pipeline Pro v2."
        },
        "preset-21": {
            "displayName": "DJK Wood Mods The Nerd VV",
            "description": "Un perfil de dispositivo de vapeo regulado para DJK Wood Mods The Nerd VV.",
            "summary": "Un perfil de dispositivo de vapeo regulado para DJK Wood Mods The Nerd VV."
        },
        "preset-22": {
            "displayName": "Dovpo DT-50",
            "description": "Un perfil de dispositivo de vapeo regulado para Dovpo DT-50.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Dovpo DT-50."
        },
        "preset-23": {
            "displayName": "Dovpo E-LVT",
            "description": "Un perfil de dispositivo de vapeo regulado para Dovpo E-LVT.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Dovpo E-LVT."
        },
        "preset-24": {
            "displayName": "Dovpo E-Mech",
            "description": "Un perfil de dispositivo de vapeo regulado para Dovpo E-Mech.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Dovpo E-Mech."
        },
        "preset-25": {
            "displayName": "Dovpo TC 50",
            "description": "Un perfil de dispositivo de vapeo regulado para Dovpo TC 50.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Dovpo TC 50."
        },
        "preset-26": {
            "displayName": "eGo Twist",
            "description": "Un perfil de dispositivo de vapeo regulado para eGo Twist.",
            "summary": "Un perfil de dispositivo de vapeo regulado para eGo Twist."
        },
        "preset-27": {
            "displayName": "eGo-V V3",
            "description": "Un perfil de dispositivo de vapeo regulado para eGo-V V3.",
            "summary": "Un perfil de dispositivo de vapeo regulado para eGo-V V3."
        },
        "preset-28": {
            "displayName": "Evod V v3",
            "description": "Un perfil de dispositivo de vapeo regulado para Evod V v3.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evod V v3."
        },
        "preset-29": {
            "displayName": "Evolv DNA-20D",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-20D.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-20D."
        },
        "preset-30": {
            "displayName": "Evolv DNA-30D",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-30D.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-30D."
        },
        "preset-31": {
            "displayName": "Evolv DNA-40 (std. wire)",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-40 (std. wire).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-40 (estándar."
        },
        "preset-32": {
            "displayName": "Evolv DNA-40 (Ni 200)",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-40 (Ni 200).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-40 (Ni 200)."
        },
        "preset-33": {
            "displayName": "Evolv DNA60 (non-color)",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA60 (non-color).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA60 (non-color)."
        },
        "preset-34": {
            "displayName": "Evolv DNA-75",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-75.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-75."
        },
        "preset-35": {
            "displayName": "Evolv DNA-200 (2 cells, DNA-133)",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-200 (2 cells, DNA-133).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-200 (2 cells, DNA-133)."
        },
        "preset-36": {
            "displayName": "Evolv DNA-200 (3 cells)",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-200 (3 cells).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-200 (3 cells)."
        },
        "preset-37": {
            "displayName": "Evolv DNA-200 (TC mode)",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-200 (TC mode).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-200 (TC mode)."
        },
        "preset-38": {
            "displayName": "Evolv DNA-250 (2 cells, DNA-166)",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-250 (2 cells, DNA-166).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-250 (2 cells, DNA-166)."
        },
        "preset-39": {
            "displayName": "Evolv DNA-250 (3 cells)",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-250 (3 cells).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA-250 (3 cells)."
        },
        "preset-40": {
            "displayName": "Evolv Kick 2",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv Kick 2.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv Kick 2."
        },
        "preset-41": {
            "displayName": "Eleaf iStick",
            "description": "Un perfil de dispositivo de vapeo regulado para Eleaf iStick.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Eleaf iStick."
        },
        "preset-42": {
            "displayName": "Eleaf iStick 30W",
            "description": "Un perfil de dispositivo de vapeo regulado para Eleaf iStick 30W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Eleaf iStick 30W."
        },
        "preset-43": {
            "displayName": "Eleaf iStick 40W TC",
            "description": "Un perfil de dispositivo de vapeo regulado para Eleaf iStick 40W TC.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Eleaf iStick 40W TC."
        },
        "preset-44": {
            "displayName": "Eleaf iStick 50W",
            "description": "Un perfil de dispositivo de vapeo regulado para Eleaf iStick 50W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Eleaf iStick 50W."
        },
        "preset-45": {
            "displayName": "Eleaf iStick 100W",
            "description": "Un perfil de dispositivo de vapeo regulado para Eleaf iStick 100W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Eleaf iStick 100W."
        },
        "preset-46": {
            "displayName": "Gossmods The Duke",
            "description": "Un perfil de dispositivo de vapeo regulado para Gossmods The Duke.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Gossmods The Duke."
        },
        "preset-47": {
            "displayName": "Grand Innovations GI2",
            "description": "Un perfil de dispositivo de vapeo regulado para Grand Innovations GI2.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Grand Innovations GI2."
        },
        "preset-48": {
            "displayName": "Heatvape Invader Mini",
            "description": "Un perfil de dispositivo de vapeo regulado para Heatvape Invader Mini.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Heatvape Invader Mini."
        },
        "preset-49": {
            "displayName": "Heatvape Invader Mini (TC mode)",
            "description": "Un perfil de dispositivo de vapeo regulado para Heatvape Invader Mini (TC mode).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Heatvape Invader Mini (TC mode)."
        },
        "preset-50": {
            "displayName": "iJoy A160",
            "description": "Un perfil de dispositivo de vapeo regulado para iJoy A160.",
            "summary": "Un perfil de dispositivo de vapeo regulado para iJoy A160."
        },
        "preset-51": {
            "displayName": "Innokin Cool Fire II",
            "description": "Un perfil de dispositivo de vapeo regulado para Innokin Cool Fire II.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Innokin Cool Fire II."
        },
        "preset-52": {
            "displayName": "Innokin Cool Fire IV",
            "description": "Un perfil de dispositivo de vapeo regulado para Innokin Cool Fire IV.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Innokin Cool Fire IV."
        },
        "preset-53": {
            "displayName": "Innokin Disrupter",
            "description": "Un perfil de dispositivo de vapeo regulado para Innokin Disrupter.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Innokin Disrupter."
        },
        "preset-54": {
            "displayName": "Innokin iTaste 134 / iTaste 134 mini",
            "description": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste 134 / iTaste 134 mini.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste 134 / iTaste 134 mini."
        },
        "preset-55": {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste MVP 2.0.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste MVP 2.0."
        },
        "preset-56": {
            "displayName": "Innokin iTaste MVP 20 Watt",
            "description": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste MVP 20 Watt.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste MVP 20 Watt."
        },
        "preset-57": {
            "displayName": "Innokin iTaste MVP 3.0",
            "description": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste MVP 3.0.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste MVP 3.0."
        },
        "preset-58": {
            "displayName": "Innokin iTaste MVP 3 Pro",
            "description": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste MVP 3 Pro.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste MVP 3 Pro."
        },
        "preset-59": {
            "displayName": "Innokin iTaste SVD",
            "description": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste SVD.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste SVD."
        },
        "preset-60": {
            "displayName": "Innokin iTaste SVD2",
            "description": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste SVD2.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste SVD2."
        },
        "preset-61": {
            "displayName": "Innokin iTaste VTR",
            "description": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste VTR.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste VTR."
        },
        "preset-62": {
            "displayName": "Innokin iTaste VV V3.0",
            "description": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste VV V3.0.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Innokin iTaste VV V3.0."
        },
        "preset-63": {
            "displayName": "Joy4life Beyang 30W",
            "description": "Un perfil de dispositivo de vapeo regulado para Joy4life Beyang 30W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Joy4life Beyang 30W."
        },
        "preset-64": {
            "displayName": "Joyetech eCom Supreme",
            "description": "Un perfil de dispositivo de vapeo regulado para Joyetech eCom Supreme.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Joyetech eCom Supreme."
        },
        "preset-65": {
            "displayName": "Joyetech eVic",
            "description": "Un perfil de dispositivo de vapeo regulado para Joyetech eVic.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Joyetech eVic."
        },
        "preset-66": {
            "displayName": "Joyetech eVic VT",
            "description": "Un perfil de dispositivo de vapeo regulado para Joyetech eVic VT.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Joyetech eVic VT."
        },
        "preset-67": {
            "displayName": "Joyetech eVic VT (TC mode)",
            "description": "Un perfil de dispositivo de vapeo regulado para Joyetech eVic VT (TC mode).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Joyetech eVic VT (TC mode)."
        },
        "preset-68": {
            "displayName": "Joyetech eVic Supreme",
            "description": "Un perfil de dispositivo de vapeo regulado para Joyetech eVic Supreme.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Joyetech eVic Supreme."
        },
        "preset-69": {
            "displayName": "J Well Alesia",
            "description": "Un perfil de dispositivo de vapeo regulado para J Well Alesia.",
            "summary": "Un perfil de dispositivo de vapeo regulado para J Well Alesia."
        },
        "preset-70": {
            "displayName": "J Well Troca",
            "description": "Un perfil de dispositivo de vapeo regulado para J Well Troca.",
            "summary": "Un perfil de dispositivo de vapeo regulado para J Well Troca."
        },
        "preset-71": {
            "displayName": "Kanger e-Power v3",
            "description": "Un perfil de dispositivo de vapeo regulado para Kanger e-Power v3.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Kanger e-Power v3."
        },
        "preset-72": {
            "displayName": "Kanger IPOW 2",
            "description": "Un perfil de dispositivo de vapeo regulado para Kanger IPOW 2.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Kanger IPOW 2."
        },
        "preset-73": {
            "displayName": "Kanger KBOX",
            "description": "Un perfil de dispositivo de vapeo regulado para Kanger KBOX.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Kanger KBOX."
        },
        "preset-74": {
            "displayName": "Kanger KBOX Mini / SUBOX Mini",
            "description": "Un perfil de dispositivo de vapeo regulado para Kanger KBOX Mini / SUBOX Mini.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Kanger KBOX Mini / SUBOX Mini."
        },
        "preset-75": {
            "displayName": "Kanger K-Simar 20",
            "description": "Un perfil de dispositivo de vapeo regulado para Kanger K-Simar 20.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Kanger K-Simar 20."
        },
        "preset-76": {
            "displayName": "Kangside e-Huge",
            "description": "Un perfil de dispositivo de vapeo regulado para Kangside e-Huge.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Kangside e-Huge."
        },
        "preset-77": {
            "displayName": "Kamry 20",
            "description": "Un perfil de dispositivo de vapeo regulado para Kamry 20.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Kamry 20."
        },
        "preset-78": {
            "displayName": "Kamry 60W",
            "description": "Un perfil de dispositivo de vapeo regulado para Kamry 60W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Kamry 60W."
        },
        "preset-79": {
            "displayName": "Kamry God Box",
            "description": "Un perfil de dispositivo de vapeo regulado para Kamry God Box.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Kamry God Box."
        },
        "preset-80": {
            "displayName": "KangXin VF clone v3",
            "description": "Un perfil de dispositivo de vapeo regulado para KangXin VF clone v3.",
            "summary": "Un perfil de dispositivo de vapeo regulado para KangXin VF clone v3."
        },
        "preset-81": {
            "displayName": "KangXin KX5-50W",
            "description": "Un perfil de dispositivo de vapeo regulado para KangXin KX5-50W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para KangXin KX5-50W."
        },
        "preset-82": {
            "displayName": "Koopor Mini KP60",
            "description": "Un perfil de dispositivo de vapeo regulado para Koopor Mini KP60.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Koopor Mini KP60."
        },
        "preset-83": {
            "displayName": "Koopor Mini KP60 (TC)",
            "description": "Un perfil de dispositivo de vapeo regulado para Koopor Mini KP60 (TC).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Koopor Mini KP60 (TC)."
        },
        "preset-84": {
            "displayName": "KSD 30",
            "description": "Un perfil de dispositivo de vapeo regulado para KSD 30.",
            "summary": "Un perfil de dispositivo de vapeo regulado para KSD 30."
        },
        "preset-85": {
            "displayName": "KSD Kmax (single battery)",
            "description": "Un perfil de dispositivo de vapeo regulado para KSD Kmax (single battery).",
            "summary": "Un perfil de dispositivo de vapeo regulado para KSD Kmax (single battery)."
        },
        "preset-86": {
            "displayName": "KSD Kmax (stacked)",
            "description": "Un perfil de dispositivo de vapeo regulado para KSD Kmax (stacked).",
            "summary": "Un perfil de dispositivo de vapeo regulado para KSD Kmax (stacked)."
        },
        "preset-87": {
            "displayName": "L-Rider Lambo 6.0",
            "description": "Un perfil de dispositivo de vapeo regulado para L-Rider Lambo 6.0.",
            "summary": "Un perfil de dispositivo de vapeo regulado para L-Rider Lambo 6.0."
        },
        "preset-88": {
            "displayName": "L-Rider Lavatube",
            "description": "Un perfil de dispositivo de vapeo regulado para L-Rider Lavatube.",
            "summary": "Un perfil de dispositivo de vapeo regulado para L-Rider Lavatube."
        },
        "preset-89": {
            "displayName": "Lotus Jellyfish",
            "description": "Un perfil de dispositivo de vapeo regulado para Lotus Jellyfish.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Lotus Jellyfish."
        },
        "preset-90": {
            "displayName": "Lotus LE80",
            "description": "Un perfil de dispositivo de vapeo regulado para Lotus LE80.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Lotus LE80."
        },
        "preset-91": {
            "displayName": "Luxyoun Smaug",
            "description": "Un perfil de dispositivo de vapeo regulado para Luxyoun Smaug.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Luxyoun Smaug."
        },
        "preset-92": {
            "displayName": "Majesty 150W",
            "description": "Un perfil de dispositivo de vapeo regulado para Majesty 150W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Majesty 150W."
        },
        "preset-93": {
            "displayName": "Megatron 260",
            "description": "Un perfil de dispositivo de vapeo regulado para Megatron 260.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Megatron 260."
        },
        "preset-94": {
            "displayName": "Naos Raptor 10A",
            "description": "Un perfil de dispositivo de vapeo regulado para Naos Raptor 10A.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Naos Raptor 10A."
        },
        "preset-95": {
            "displayName": "Naos Raptor 20A",
            "description": "Un perfil de dispositivo de vapeo regulado para Naos Raptor 20A.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Naos Raptor 20A."
        },
        "preset-96": {
            "displayName": "Nivel V3",
            "description": "Un perfil de dispositivo de vapeo regulado para Nivel V3.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Nivel V3."
        },
        "preset-97": {
            "displayName": "Notcigs VV",
            "description": "Un perfil de dispositivo de vapeo regulado para Notcigs VV.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Notcigs VV."
        },
        "preset-98": {
            "displayName": "OKL2-T/20-W12",
            "description": "Un perfil de dispositivo de vapeo regulado para OKL2-T/20-W12.",
            "summary": "Un perfil de dispositivo de vapeo regulado para OKL2-T/20-W12."
        },
        "preset-99": {
            "displayName": "OKR-T10",
            "description": "Un perfil de dispositivo de vapeo regulado para OKR-T10.",
            "summary": "Un perfil de dispositivo de vapeo regulado para OKR-T10."
        },
        "preset-100": {
            "displayName": "Pioneer4You/Green Leaf P-Max",
            "description": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf P-Max.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf P-Max."
        },
        "preset-101": {
            "displayName": "ProVari 2, ProVari 2.5",
            "description": "Un perfil de dispositivo de vapeo regulado para ProVari 2, ProVari 2.5.",
            "summary": "Un perfil de dispositivo de vapeo regulado para ProVari 2, ProVari 2.5."
        },
        "preset-102": {
            "displayName": "ProVari P3 beta",
            "description": "Un perfil de dispositivo de vapeo regulado para ProVari P3 beta.",
            "summary": "Un perfil de dispositivo de vapeo regulado para ProVari P3 beta."
        },
        "preset-103": {
            "displayName": "ProVari P35",
            "description": "Un perfil de dispositivo de vapeo regulado para ProVari P35.",
            "summary": "Un perfil de dispositivo de vapeo regulado para ProVari P35."
        },
        "preset-104": {
            "displayName": "Psmoke GI2",
            "description": "Un perfil de dispositivo de vapeo regulado para Psmoke GI2.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Psmoke GI2."
        },
        "preset-105": {
            "displayName": "RainbowHeaven Arrow",
            "description": "Un perfil de dispositivo de vapeo regulado para RainbowHeaven Arrow.",
            "summary": "Un perfil de dispositivo de vapeo regulado para RainbowHeaven Arrow."
        },
        "preset-106": {
            "displayName": "Robbot Tech ZNA50",
            "description": "Un perfil de dispositivo de vapeo regulado para Robbot Tech ZNA50.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Robbot Tech ZNA50."
        },
        "preset-107": {
            "displayName": "Sigelei 20W",
            "description": "Un perfil de dispositivo de vapeo regulado para Sigelei 20W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sigelei 20W."
        },
        "preset-108": {
            "displayName": "Sigelei 50W",
            "description": "Un perfil de dispositivo de vapeo regulado para Sigelei 50W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sigelei 50W."
        },
        "preset-109": {
            "displayName": "Sigelei 75W TC",
            "description": "Un perfil de dispositivo de vapeo regulado para Sigelei 75W TC.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sigelei 75W TC."
        },
        "preset-110": {
            "displayName": "Sigelei 150W",
            "description": "Un perfil de dispositivo de vapeo regulado para Sigelei 150W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sigelei 150W."
        },
        "preset-111": {
            "displayName": "Sigelei Fuchai 213 Plus",
            "description": "Un perfil de dispositivo de vapeo regulado para Sigelei Fuchai 213 Plus.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sigelei Fuchai 213 Plus."
        },
        "preset-112": {
            "displayName": "Sigelei Kick",
            "description": "Un perfil de dispositivo de vapeo regulado para Sigelei Kick.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sigelei Kick."
        },
        "preset-113": {
            "displayName": "Sigelei Legend v2",
            "description": "Un perfil de dispositivo de vapeo regulado para Sigelei Legend v2.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sigelei Legend v2."
        },
        "preset-114": {
            "displayName": "Sigelei Vmax",
            "description": "Un perfil de dispositivo de vapeo regulado para Sigelei Vmax.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sigelei Vmax."
        },
        "preset-115": {
            "displayName": "Sigelei Zmax V3",
            "description": "Un perfil de dispositivo de vapeo regulado para Sigelei Zmax V3.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sigelei Zmax V3."
        },
        "preset-116": {
            "displayName": "Sigelei Zmax V5",
            "description": "Un perfil de dispositivo de vapeo regulado para Sigelei Zmax V5.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sigelei Zmax V5."
        },
        "preset-117": {
            "displayName": "Simeiyue God 180",
            "description": "Un perfil de dispositivo de vapeo regulado para Simeiyue God 180.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Simeiyue God 180."
        },
        "preset-118": {
            "displayName": "Simeiyue God 180s",
            "description": "Un perfil de dispositivo de vapeo regulado para Simeiyue God 180s.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Simeiyue God 180s."
        },
        "preset-119": {
            "displayName": "Simeiyue God 260",
            "description": "Un perfil de dispositivo de vapeo regulado para Simeiyue God 260.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Simeiyue God 260."
        },
        "preset-120": {
            "displayName": "Smok Ace",
            "description": "Un perfil de dispositivo de vapeo regulado para Smok Ace.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Smok Ace."
        },
        "preset-121": {
            "displayName": "Smok BEC Pro",
            "description": "Un perfil de dispositivo de vapeo regulado para Smok BEC Pro.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Smok BEC Pro."
        },
        "preset-122": {
            "displayName": "Smok G-Priv 220W",
            "description": "Un perfil de dispositivo de vapeo regulado para Smok G-Priv 220W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Smok G-Priv 220W."
        },
        "preset-123": {
            "displayName": "Smok Sid",
            "description": "Un perfil de dispositivo de vapeo regulado para Smok Sid.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Smok Sid."
        },
        "preset-124": {
            "displayName": "Smok X Cube II",
            "description": "Un perfil de dispositivo de vapeo regulado para Smok X Cube II.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Smok X Cube II."
        },
        "preset-125": {
            "displayName": "Smok X Pro BT50",
            "description": "Un perfil de dispositivo de vapeo regulado para Smok X Pro BT50.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Smok X Pro BT50."
        },
        "preset-126": {
            "displayName": "Smok X Pro M36",
            "description": "Un perfil de dispositivo de vapeo regulado para Smok X Pro M36.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Smok X Pro M36."
        },
        "preset-127": {
            "displayName": "Smok X Pro M50",
            "description": "Un perfil de dispositivo de vapeo regulado para Smok X Pro M50.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Smok X Pro M50."
        },
        "preset-128": {
            "displayName": "Smok X Pro M80",
            "description": "Un perfil de dispositivo de vapeo regulado para Smok X Pro M80.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Smok X Pro M80."
        },
        "preset-129": {
            "displayName": "Smok Zmax",
            "description": "Un perfil de dispositivo de vapeo regulado para Smok Zmax.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Smok Zmax."
        },
        "preset-130": {
            "displayName": "Smok Zmax Mini",
            "description": "Un perfil de dispositivo de vapeo regulado para Smok Zmax Mini.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Smok Zmax Mini."
        },
        "preset-131": {
            "displayName": "SMY 260W",
            "description": "Un perfil de dispositivo de vapeo regulado para SMY 260W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para SMY 260W."
        },
        "preset-132": {
            "displayName": "SMY 50TC",
            "description": "Un perfil de dispositivo de vapeo regulado para SMY 50TC.",
            "summary": "Un perfil de dispositivo de vapeo regulado para SMY 50TC."
        },
        "preset-133": {
            "displayName": "SMY GOD 180",
            "description": "Un perfil de dispositivo de vapeo regulado para SMY GOD 180.",
            "summary": "Un perfil de dispositivo de vapeo regulado para SMY GOD 180."
        },
        "preset-134": {
            "displayName": "Steam STM-1 / STM-2",
            "description": "Un perfil de dispositivo de vapeo regulado para Steam STM-1 / STM-2.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Steam STM-1 / STM-2."
        },
        "preset-135": {
            "displayName": "Sunzip Vapmod Deezel",
            "description": "Un perfil de dispositivo de vapeo regulado para Sunzip Vapmod Deezel.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sunzip Vapmod Deezel."
        },
        "preset-136": {
            "displayName": "Taifun The Eye",
            "description": "Un perfil de dispositivo de vapeo regulado para Taifun The Eye.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Taifun The Eye."
        },
        "preset-137": {
            "displayName": "Taifun The Eye (updated)",
            "description": "Un perfil de dispositivo de vapeo regulado para Taifun The Eye (updated).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Taifun The Eye (updated)."
        },
        "preset-138": {
            "displayName": "Tesla",
            "description": "Un perfil de dispositivo de vapeo regulado para Tesla.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Tesla."
        },
        "preset-139": {
            "displayName": "Tesla 120W",
            "description": "Un perfil de dispositivo de vapeo regulado para Tesla 120W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Tesla 120W."
        },
        "preset-140": {
            "displayName": "Tesla 2 Sub Mod",
            "description": "Un perfil de dispositivo de vapeo regulado para Tesla 2 Sub Mod.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Tesla 2 Sub Mod."
        },
        "preset-141": {
            "displayName": "Tesla Spider",
            "description": "Un perfil de dispositivo de vapeo regulado para Tesla Spider.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Tesla Spider."
        },
        "preset-142": {
            "displayName": "Tobeco ZNA 36",
            "description": "Un perfil de dispositivo de vapeo regulado para Tobeco ZNA 36.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Tobeco ZNA 36."
        },
        "preset-143": {
            "displayName": "Vamo 35W (clone)",
            "description": "Un perfil de dispositivo de vapeo regulado para Vamo 35W (clone).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Vamo 35W (clone)."
        },
        "preset-144": {
            "displayName": "Vamo V1 / V2 / V3 / V5",
            "description": "Un perfil de dispositivo de vapeo regulado para Vamo V1 / V2 / V3 / V5.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Vamo V1 / V2 / V3 / V5."
        },
        "preset-145": {
            "displayName": "Vamo V7",
            "description": "Un perfil de dispositivo de vapeo regulado para Vamo V7.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Vamo V7."
        },
        "preset-146": {
            "displayName": "VaporFi Vox II",
            "description": "Un perfil de dispositivo de vapeo regulado para VaporFi Vox II.",
            "summary": "Un perfil de dispositivo de vapeo regulado para VaporFi Vox II."
        },
        "preset-147": {
            "displayName": "Vicious Ant VariAnt 120W",
            "description": "Un perfil de dispositivo de vapeo regulado para Vicious Ant VariAnt 120W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Vicious Ant VariAnt 120W."
        },
        "preset-148": {
            "displayName": "Vicious Ant VariAnt 250W",
            "description": "Un perfil de dispositivo de vapeo regulado para Vicious Ant VariAnt 250W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Vicious Ant VariAnt 250W."
        },
        "preset-149": {
            "displayName": "Vision Spinner / Spinner II",
            "description": "Un perfil de dispositivo de vapeo regulado para Vision Spinner / Spinner II.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Vision Spinner / Spinner II."
        },
        "preset-150": {
            "displayName": "Vision X.Fir/X.Gun",
            "description": "Un perfil de dispositivo de vapeo regulado para Vision X.Fir/X.Gun.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Vision X.Fir/X.Gun."
        },
        "preset-151": {
            "displayName": "Volcano Lavatube",
            "description": "Un perfil de dispositivo de vapeo regulado para Volcano Lavatube.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Volcano Lavatube."
        },
        "preset-152": {
            "displayName": "Volcano Lavatube v2.5",
            "description": "Un perfil de dispositivo de vapeo regulado para Volcano Lavatube v2.5.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Volcano Lavatube v2.5."
        },
        "preset-153": {
            "displayName": "Wismec Reuleaux RX200S (4.10)",
            "description": "Un perfil de dispositivo de vapeo regulado para Wismec Reuleaux RX200S (4.10).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Wismec Reuleaux RX200S (4.10)."
        },
        "preset-154": {
            "displayName": "YiHi SX130",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX130.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX130."
        },
        "preset-155": {
            "displayName": "YiHi SX130 v1.5",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX130 v1.5.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX130 v1.5."
        },
        "preset-156": {
            "displayName": "YiHi SX130H",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX130H.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX130H."
        },
        "preset-157": {
            "displayName": "YiHi SX220",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX220.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX220."
        },
        "preset-158": {
            "displayName": "YiHi SX300",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX300.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX300."
        },
        "preset-159": {
            "displayName": "YiHi SX330 V1 35W",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V1 35W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V1 35W."
        },
        "preset-160": {
            "displayName": "YiHi SX330 V2 50W",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V2 50W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V2 50W."
        },
        "preset-161": {
            "displayName": "YiHi SX330 V2C 70W",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V2C 70W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V2C 70W."
        },
        "preset-162": {
            "displayName": "YiHi SX330 V2 S 60W",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V2 S 60W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V2 S 60W."
        },
        "preset-163": {
            "displayName": "YiHi SX330 V3 100W",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V3 100W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V3 100W."
        },
        "preset-164": {
            "displayName": "YiHi SX330 V3 150W",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V3 150W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V3 150W."
        },
        "preset-165": {
            "displayName": "YiHi SX330 V3S 150W",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V3S 150W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V3S 150W."
        },
        "preset-166": {
            "displayName": "YiHi SX330-V3Si 200W",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX330-V3Si 200W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX330-V3Si 200W."
        },
        "preset-167": {
            "displayName": "YiHi SX330 V4S 100W",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V4S 100W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX330 V4S 100W."
        },
        "preset-168": {
            "displayName": "YiHi SX350 30W",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX350 30W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX350 30W."
        },
        "preset-169": {
            "displayName": "YiHi SX350 50W",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX350 50W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX350 50W."
        },
        "preset-170": {
            "displayName": "YiHi SX350 100W",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX350 100W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX350 100W."
        },
        "preset-171": {
            "displayName": "YiHi SX350J VJ mode",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX350J VJ mode.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX350J VJ mode."
        },
        "preset-172": {
            "displayName": "YiHi SX350J VW/single batt mode",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX350J VW/single batt mode.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX350J VW/single batt mode."
        },
        "preset-173": {
            "displayName": "YiHi SX350J VW/dual batt mode",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX350J VW/dual batt mode.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX350J VW/dual batt mode."
        },
        "preset-174": {
            "displayName": "YiHi SX470",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX470.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX470."
        },
        "preset-175": {
            "displayName": "YiHi SX450",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX450.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX450."
        },
        "preset-176": {
            "displayName": "YiHi SXMini",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SXMini.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SXMini."
        },
        "preset-177": {
            "displayName": "Beyond Vape Solara",
            "description": "Un perfil de dispositivo de vapeo regulado para Beyond Vape Solara.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Beyond Vape Solara."
        },
        "preset-178": {
            "displayName": "Cana Modz",
            "description": "Un perfil de dispositivo de vapeo regulado para Cana Modz.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Cana Modz."
        },
        "preset-179": {
            "displayName": "Craving Vapor HexOhm",
            "description": "Un perfil de dispositivo de vapeo regulado para Craving Vapor HexOhm.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Craving Vapor HexOhm."
        },
        "preset-180": {
            "displayName": "Craving Vapor HexOhm V2",
            "description": "Un perfil de dispositivo de vapeo regulado para Craving Vapor HexOhm V2.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Craving Vapor HexOhm V2."
        },
        "preset-181": {
            "displayName": "Hana Modz V3",
            "description": "Un perfil de dispositivo de vapeo regulado para Hana Modz V3.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Hana Modz V3."
        },
        "preset-182": {
            "displayName": "Hana Modz DNA 40",
            "description": "Un perfil de dispositivo de vapeo regulado para Hana Modz DNA 40.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Hana Modz DNA 40."
        },
        "preset-183": {
            "displayName": "Lost Vape Therion DNA 75",
            "description": "Un perfil de dispositivo de vapeo regulado para Lost Vape Therion DNA 75.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Lost Vape Therion DNA 75."
        },
        "preset-184": {
            "displayName": "Lost Vape Therion DNA 133",
            "description": "Un perfil de dispositivo de vapeo regulado para Lost Vape Therion DNA 133.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Lost Vape Therion DNA 133."
        },
        "preset-185": {
            "displayName": "Lost Vape Therion DNA 166",
            "description": "Un perfil de dispositivo de vapeo regulado para Lost Vape Therion DNA 166.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Lost Vape Therion DNA 166."
        },
        "preset-186": {
            "displayName": "Notcigs Buzz Pro",
            "description": "Un perfil de dispositivo de vapeo regulado para Notcigs Buzz Pro.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Notcigs Buzz Pro."
        },
        "preset-187": {
            "displayName": "Pioneer4You/Green Leaf Seven 22",
            "description": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf Seven 22.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf Seven 22."
        },
        "preset-188": {
            "displayName": "Pioneer4You/Green Leaf Seven 30W",
            "description": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf Seven 30W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf Seven 30W."
        },
        "preset-189": {
            "displayName": "Pioneer4You/Green Leaf IPV",
            "description": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV."
        },
        "preset-190": {
            "displayName": "Pioneer4You/Green Leaf IPV D2",
            "description": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV D2.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV D2."
        },
        "preset-191": {
            "displayName": "Pioneer4You/Green Leaf IPV Mini",
            "description": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV Mini.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV Mini."
        },
        "preset-192": {
            "displayName": "Pioneer4You/Green Leaf IPV Mini 2",
            "description": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV Mini 2.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV Mini 2."
        },
        "preset-193": {
            "displayName": "Pioneer4You/Green Leaf IPV V2",
            "description": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV V2.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV V2."
        },
        "preset-194": {
            "displayName": "Pioneer4You/Green Leaf IPV V2S",
            "description": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV V2S.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV V2S."
        },
        "preset-195": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 100W",
            "description": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV V3 100W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV V3 100W."
        },
        "preset-196": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 150W",
            "description": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV V3 150W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV V3 150W."
        },
        "preset-197": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 200W",
            "description": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV V3 200W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV V3 200W."
        },
        "preset-198": {
            "displayName": "Pioneer4You/Green Leaf IPV V4 100W",
            "description": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV V4 100W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Pioneer4You/Green Leaf IPV V4 100W."
        },
        "preset-199": {
            "displayName": "Protovapor XPV DNA-20D",
            "description": "Un perfil de dispositivo de vapeo regulado para Protovapor XPV DNA-20D.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Protovapor XPV DNA-20D."
        },
        "preset-200": {
            "displayName": "Protovapor XPV DNA-30D",
            "description": "Un perfil de dispositivo de vapeo regulado para Protovapor XPV DNA-30D.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Protovapor XPV DNA-30D."
        },
        "preset-201": {
            "displayName": "Protovapor XPV DNA-40D",
            "description": "Un perfil de dispositivo de vapeo regulado para Protovapor XPV DNA-40D.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Protovapor XPV DNA-40D."
        },
        "preset-202": {
            "displayName": "Raffmods Ranger",
            "description": "Un perfil de dispositivo de vapeo regulado para Raffmods Ranger.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Raffmods Ranger."
        },
        "preset-203": {
            "displayName": "Reo VV Grand/Woodvil",
            "description": "Un perfil de dispositivo de vapeo regulado para Reo VV Grand/Woodvil.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Reo VV Grand/Woodvil."
        },
        "preset-204": {
            "displayName": "Sigelei 30W",
            "description": "Un perfil de dispositivo de vapeo regulado para Sigelei 30W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sigelei 30W."
        },
        "preset-205": {
            "displayName": "Sigelei Raptor",
            "description": "Un perfil de dispositivo de vapeo regulado para Sigelei Raptor.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sigelei Raptor."
        },
        "preset-206": {
            "displayName": "Sigelei 100W",
            "description": "Un perfil de dispositivo de vapeo regulado para Sigelei 100W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sigelei 100W."
        },
        "preset-207": {
            "displayName": "Sigelei Mini",
            "description": "Un perfil de dispositivo de vapeo regulado para Sigelei Mini.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Sigelei Mini."
        },
        "preset-208": {
            "displayName": "SvoëMesto Semovar",
            "description": "Un perfil de dispositivo de vapeo regulado para SvoëMesto Semovar.",
            "summary": "Un perfil de dispositivo de vapeo regulado para SvoëMesto Semovar."
        },
        "preset-209": {
            "displayName": "Vapor Flask v1/v2 DNA 30",
            "description": "Un perfil de dispositivo de vapeo regulado para Vapor Flask v1/v2 DNA 30.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Vapor Flask v1/v2 DNA 30."
        },
        "preset-210": {
            "displayName": "Vapor Flask v2 DNA 40",
            "description": "Un perfil de dispositivo de vapeo regulado para Vapor Flask v2 DNA 40.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Vapor Flask v2 DNA 40."
        },
        "preset-211": {
            "displayName": "Vapor Shark DNA",
            "description": "Un perfil de dispositivo de vapeo regulado para Vapor Shark DNA.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Vapor Shark DNA."
        },
        "preset-212": {
            "displayName": "Vapor Shark DNA/rDNA 30",
            "description": "Un perfil de dispositivo de vapeo regulado para Vapor Shark DNA/rDNA 30.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Vapor Shark DNA/rDNA 30."
        },
        "preset-213": {
            "displayName": "Vapor Shark rDNA 40",
            "description": "Un perfil de dispositivo de vapeo regulado para Vapor Shark rDNA 40.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Vapor Shark rDNA 40."
        },
        "preset-214": {
            "displayName": "Geekvape Aegis Legend 5",
            "description": "Un perfil de dispositivo de vapeo regulado para Geekvape Aegis Legend 5.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Geekvape Aegis Legend 5."
        },
        "preset-215": {
            "displayName": "Evolv DNA60C",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA60C.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA60C."
        },
        "preset-216": {
            "displayName": "Evolv DNA100C",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA100C.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA100C."
        },
        "preset-217": {
            "displayName": "Evolv DNA250C (2S)",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA250C (2S).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA250C (2S)."
        },
        "preset-218": {
            "displayName": "Evolv DNA250C (3S, US firmware)",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA250C (3S, US firmware).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA250C (3S, US firmware)."
        },
        "preset-219": {
            "displayName": "Evolv DNA250C (3S, international firmware)",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA250C (3S, international firmware).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA250C (3S, international firmware)."
        },
        "preset-220": {
            "displayName": "Evolv DNA250C (4S)",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA250C (4S).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA250C (4S)."
        },
        "preset-221": {
            "displayName": "VOOPOO DRAG 6",
            "description": "Un perfil de dispositivo de vapeo regulado para VOOPOO DRAG 6.",
            "summary": "Un perfil de dispositivo de vapeo regulado para VOOPOO DRAG 6."
        },
        "preset-222": {
            "displayName": "YiHi SXmini MQ Class",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SXmini MQ Class.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SXmini MQ Class."
        },
        "preset-223": {
            "displayName": "Evolv DNA80C",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA80C.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA80C."
        },
        "preset-224": {
            "displayName": "Evolv DNA75C",
            "description": "Un perfil de dispositivo de vapeo regulado para Evolv DNA75C.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Evolv DNA75C."
        },
        "preset-225": {
            "displayName": "YiHi SX600H",
            "description": "Un perfil de dispositivo de vapeo regulado para YiHi SX600H.",
            "summary": "Un perfil de dispositivo de vapeo regulado para YiHi SX600H."
        },
        "preset-226": {
            "displayName": "Craving Vapor HexOhm V3",
            "description": "Un perfil de dispositivo de vapeo regulado para Craving Vapor HexOhm V3.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Craving Vapor HexOhm V3."
        },
        "preset-227": {
            "displayName": "VOOPOO VINCI Spark220",
            "description": "Un perfil de dispositivo de vapeo regulado para VOOPOO VINCI Spark220.",
            "summary": "Un perfil de dispositivo de vapeo regulado para VOOPOO VINCI Spark220."
        },
        "preset-228": {
            "displayName": "Dovpo x TVC Topside Dual",
            "description": "Un perfil de dispositivo de vapeo regulado para Dovpo x TVC Topside Dual.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Dovpo x TVC Topside Dual."
        },
        "preset-229": {
            "displayName": "VOOPOO DRAG 5",
            "description": "Un perfil de dispositivo de vapeo regulado para VOOPOO DRAG 5.",
            "summary": "Un perfil de dispositivo de vapeo regulado para VOOPOO DRAG 5."
        },
        "preset-230": {
            "displayName": "Geekvape L200 Classic",
            "description": "Un perfil de dispositivo de vapeo regulado para Geekvape L200 Classic.",
            "summary": "Un perfil de dispositivo de vapeo regulado para Geekvape L200 Classic."
        },
        "preset-231": {
            "displayName": "VAPORESSO ARMOUR MAX",
            "description": "Mod regulado Dual-21700 con adaptadores 18650; VAPORESSO lo califica con 220 W; Las pruebas midieron 208 W, 8,979 V y 39 A.",
            "summary": "Mod regulado Dual-21700 con adaptadores 18650; VAPORESSO lo califica con 220 W; Las pruebas midieron 208 W, 8,979 V y 39 A."
        },
        "preset-232": {
            "displayName": "Geekvape Aegis Legend 2 (L200)",
            "description": "Un perfil de dispositivo de vapeo regulado para Geekvape Aegis Legend 2 (L200).",
            "summary": "Un perfil de dispositivo de vapeo regulado para Geekvape Aegis Legend 2 (L200)."
        },
        "preset-233": {
            "displayName": "ProVape ProVari Radius 40 W",
            "description": "Un perfil de dispositivo de vapeo regulado para ProVape ProVari Radius 40 W.",
            "summary": "Un perfil de dispositivo de vapeo regulado para ProVape ProVari Radius 40 W."
        },
        "preset-234": {
            "displayName": "VAPORESSO GEN MAX",
            "description": "Mod regulado Dual-18650; VAPORESSO lo califica con 220 W; Las pruebas midieron 215 W, 9,08 V y 37 A.",
            "summary": "Mod regulado Dual-18650; VAPORESSO lo califica con 220 W; Las pruebas midieron 215 W, 9,08 V y 37 A."
        },
        "preset-235": {
            "displayName": "VAPORESSO ARMOUR ULTRA",
            "description": "Mod regulado por batería incorporada de 100 W; Las pruebas midieron 101 W, 29 A y al menos 7,97 V.",
            "summary": "Mod regulado por batería incorporada de 100 W; Las pruebas midieron 101 W, 29 A y al menos 7,97 V."
        },
        "preset-236": {
            "displayName": "Geekvape Aegis Solo 3",
            "description": "Mod regulado Single-18650 usando AS Chip 4.0; El perfil del fabricante es 100 W, 7,5 V, 32 A, 0,1–3 Ω.",
            "summary": "Mod regulado Single-18650 usando AS Chip 4.0; El perfil del fabricante es 100 W, 7,5 V, 32 A, 0,1–3 Ω."
        },
        "preset-237": {
            "displayName": "Eleaf iStick Pico 21700",
            "description": "Mod de adaptador de celda única 21700/18650; Eleaf especifica 100 W, 9 V, 0,05–3,5 Ω; Las pruebas identificaron 30 A.",
            "summary": "Mod de adaptador de celda única 21700/18650; Eleaf especifica 100 W, 9 V, 0,05–3,5 Ω; Las pruebas identificaron 30 A."
        },
        "preset-238": {
            "displayName": "Vandy Vape Pulse V2",
            "description": "Mod squonk regulado de celda única para celdas 21700, 20700 o 18650 adaptadas con un perfil conservador de 95 W, 6 V y 34 A.",
            "summary": "Mod squonk regulado de celda única para celdas 21700, 20700 o 18650 adaptadas con un perfil conservador de 95 W, 6 V y 34 A."
        }
    }
};
