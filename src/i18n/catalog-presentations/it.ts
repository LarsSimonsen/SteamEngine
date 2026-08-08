/* Machine-materialized draft. Human review may edit string values. */

import type { CatalogPresentationSet } from "../catalog-presentations";

export const presentations: CatalogPresentationSet = {
    "concepts": {
        "concept-ohms-law": {
            "displayName": "La legge di Ohm",
            "description": "La legge di Ohm collega tensione, corrente e resistenza in un circuito elettrico.",
            "summary": "La relazione tra tensione, corrente e resistenza.",
            "sections": [{
                "id": "relationship",
                "title": "La relazione",
                "paragraphs": ["La relazione di base è utile ogni volta che la resistenza di un componente è approssimativamente costante."],
                "formulas": [{
                    "expression": "V = io × R"
                }],
                "bullets": ["V è la tensione, misurata in volt (V).", "I è la corrente, misurata in ampere o ampere (A).", "R è la resistenza, misurata in ohm (\\u03a9)."]
            }, {
                "id": "rearranged-formulas",
                "title": "Formule riorganizzate",
                "paragraphs": ["Utilizza la versione che mette il valore che vuoi trovare a sinistra:"],
                "formulas": [{
                    "expression": "Io = V/R"
                }, {
                    "expression": "R = V/I"
                }],
                "bullets": ["L'aumento della tensione aumenta la corrente quando la resistenza rimane la stessa.", "L'aumento della resistenza diminuisce la corrente quando la tensione rimane la stessa.", "Una resistenza pari a zero \\u03a9 è un cortocircuito ideale e deve essere gestita separatamente."]
            }, {
                "id": "worked-examples",
                "title": "Esempi realizzati",
                "examples": [{
                    "title": "Trova corrente",
                    "setup": "Una sorgente da 4,2 V è collegata a un carico da 1,0 \\u03a9.",
                    "formulas": ["io = 4,2 V / 1,0 \\u03a9 = 4,2 A"],
                    "conclusion": "La corrente di carico è 4,2 A."
                }, {
                    "title": "Trova resistenza",
                    "setup": "Un circuito ha ai suoi capi 12 V e assorbe 2 A.",
                    "formulas": ["R = 12 V / 2 A = 6 \\u03a9"],
                    "conclusion": "La resistenza del circuito è 6 \\u03a9."
                }, {
                    "title": "Trova la tensione",
                    "setup": "Una corrente da 0,5 A scorre attraverso una resistenza da 10 \\u03a9.",
                    "formulas": ["V = 0,5 A × 10 Ω = 5 V"],
                    "conclusion": "La tensione è di 5 V."
                }]
            }, {
                "id": "electrical-power",
                "title": "Energia elettrica",
                "formulas": [{
                    "expression": "P = V × I = I^2 × R = V^2 / R"
                }],
                "paragraphs": ["La legge di Ohm si combina con la relazione di potenza P = V × I. La potenza P è misurata in watt (W). Per una sorgente da 4,2 V e un carico da 1,0 Ω, la potenza ideale è 17,64 W. Il componente necessita di capacità termica e headroom sufficienti per dissipare il calore risultante in modo sicuro."]
            }, {
                "id": "unit-conversions",
                "title": "Conversioni di unità",
                "paragraphs": ["Mantieni le unità coerenti prima di calcolare:"],
                "bullets": ["1 k\\u03a9 = 1.000 \\u03a9", "1 M\\u03a9 = 1.000.000 \\u03a9", "1 mA = 0,001 A", "1 W = 1.000 mW"]
            }, {
                "id": "limits",
                "title": "Limiti del modello",
                "paragraphs": ["La legge di Ohm è un modello idealizzato. I componenti reali possono essere non ohmici: la loro resistenza può cambiare con la temperatura, la tensione, la corrente, la frequenza o lo stato operativo. Per le reti in serie e parallele, utilizzare le leggi di Kirchhoff insieme alla legge di Ohm."]
            }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Ohm%27s_law"
        },
        "concept-joule-heating": {
            "displayName": "Riscaldamento Joule",
            "description": "Il riscaldamento Joule descrive la conversione dell'energia elettrica in calore quando la corrente scorre attraverso la resistenza.",
            "summary": "Come la corrente elettrica trasforma la resistenza in calore.",
            "sections": [{
                "id": "heating-power",
                "title": "Potenza di riscaldamento",
                "paragraphs": ["La potenza elettrica riscaldante è:"],
                "formulas": [{
                    "expression": "P = V × I"
                }, {
                    "expression": "P = I^2 × R"
                }, {
                    "expression": "P = V^2 / R"
                }],
                "bullets": ["P è la potenza in watt (W).", "V è la tensione in volt (V).", "La corrente è espressa in ampere (A)."]
            }, {
                "id": "worked-example",
                "title": "Esempio lavorato",
                "examples": [{
                    "title": "Un carico resistivo",
                    "setup": "Una bobina da 0,8 \\u03a9 trasporta 3 A.",
                    "formulas": ["P = I^2 × R = 3^2 × 0,8 = 7,2 L", "E = P × t = 7,2 W × 10 s = 72 J"],
                    "conclusion": "La bobina converte l'energia in calore a 7,2 joule al secondo, o 72 J in 10 secondi."
                }]
            }, {
                "id": "what-affects-heating",
                "title": "Cosa influenza il riscaldamento",
                "bullets": ["A resistenza costante, il raddoppio della corrente produce quattro volte la potenza di riscaldamento.", "A corrente costante, il raddoppio della resistenza raddoppia la potenza di riscaldamento.", "A tensione costante, l'abbassamento della resistenza aumenta la potenza di riscaldamento.", "Il trasferimento di calore all'aria, al liquido e all'hardware determina la temperatura effettiva."],
                "paragraphs": ["L'energia elettrica è una velocità di trasferimento di energia, non una temperatura. La capacità termica e il flusso di calore determinano il modo in cui l'energia cambia la temperatura e la velocità con cui lascia la superficie."]
            }, {
                "id": "practical-checks",
                "title": "Verifiche pratiche",
                "paragraphs": ["Verificare che i componenti, i collegamenti e l'isolamento siano in grado di gestire la corrente e la potenza previste. Utilizzare un margine adeguato perché i componenti reali possono riscaldarsi in modo non uniforme e la resistenza può cambiare con la temperatura. Anche le batterie e gli alimentatori hanno limiti di corrente continua."]
            }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Joule_heating"
        },
        "concept-kirchhoffs-laws": {
            "displayName": "Le leggi di Kirchhoff",
            "description": "Le leggi della corrente e della tensione di Kirchhoff descrivono la conservazione nei nodi del circuito e attorno ai circuiti chiusi.",
            "summary": "Come si comportano la corrente e la tensione nei circuiti collegati.",
            "sections": [{
                "id": "circuit-terms",
                "title": "Termini del circuito",
                "paragraphs": ["I termini di base rendono più facile ragionare su uno schema elettrico:"],
                "bullets": ["Un nodo è un insieme di conduttori collegati senza alcun componente intermedio.", "Un ramo è un percorso corrente tra due nodi.", "Un loop è un percorso chiuso che ritorna al punto di partenza.", "Un collegamento in serie fornisce alla corrente un solo percorso attraverso i componenti.", "Una connessione parallela unisce i rami agli stessi due nodi."]
            }, {
                "id": "current-law",
                "title": "L'attuale legge di Kirchhoff",
                "formulas": [{
                    "expression": "ΣI = 0"
                }, {
                    "expression": "Σ I_in = Σ I_out"
                }],
                "paragraphs": ["Se 8 A entrano in un nodo e un ramo porta via 3 A, i rami rimanenti devono portare via un totale di 5 A. Scegli le direzioni attuali prima di risolvere; un risultato negativo significa che la corrente reale scorre in direzione opposta alla direzione assunta."]
            }, {
                "id": "series-and-parallel",
                "title": "Circuiti in serie e in parallelo",
                "formulas": [{
                    "expression": "I_totale = I_1 = I_2 = ..."
                }, {
                    "expression": "R_totale = R_1 + R_2 + ..."
                }, {
                    "expression": "I_totale = I_1 + I_2 + ..."
                }, {
                    "expression": "1 / R_totale = 1 / R_1 + 1 / R_2 + ..."
                }],
                "examples": [{
                    "title": "Resistori in serie",
                    "setup": "Due resistori da 0,20 \\u03a9 in serie sono collegati a 8,0 V.",
                    "formulas": ["R_totale = 0,40 \\u03a9", "I = 8,0 V / 0,40 Ω = 20 A"],
                    "conclusion": "Gli stessi 20 A passano attraverso entrambi i resistori."
                }, {
                    "title": "Resistori paralleli",
                    "setup": "Due rami uguali da 0,40 \\u03a9 sono collegati a 4,0 V.",
                    "formulas": ["R_totale = 0,20 \\u03a9", "I_totale = 4,0 V / 0,20 Ω = 20 A"],
                    "conclusion": "A parità di resistenza dei rami, ciascun ramo trasporta 10 A."
                }]
            }, {
                "id": "voltage-law",
                "title": "Legge di Kirchhoff sulla tensione",
                "formulas": [{
                    "expression": "ΣV = 0"
                }, {
                    "expression": "+8,0 V - V_1 - V_2 = 0"
                }, {
                    "expression": "V_totale = V_1 = V_2 = ... (rami paralleli)"
                }],
                "paragraphs": ["La somma algebrica degli aumenti e delle cadute di tensione attorno a un circuito chiuso è zero. Scegli una direzione del circuito e mantieni le polarità coerenti. Invertire la direzione cambia i segni, non la soluzione fisica. Una resistenza in serie più grande ha una caduta di tensione maggiore perché la stessa corrente scorre attraverso ogni componente in serie."]
            }, {
                "id": "cells",
                "title": "Celle in serie e parallelo",
                "formulas": [{
                    "expression": "V_pacco = V_1 + V_2 + ... (serie)"
                }, {
                    "expression": "C_pack = C_1 + C_2 + ... (parallelo)"
                }],
                "bullets": ["Le celle in serie aggiungono tensione mentre la capacità amperora rimane quella di una cella uguale.", "Le celle parallele mantengono la stessa tensione mentre la capacità e la corrente disponibile si aggiungono approssimativamente.", "La condivisione della corrente dipende dalla resistenza interna, dai contatti, dal cablaggio e dagli interruttori.", "La ricarica in serie agli ioni di litio richiede il monitoraggio a livello di cella e un bilanciamento o una protezione adeguati."]
            }, {
                "id": "solving-and-limits",
                "title": "Risoluzione di circuiti reali",
                "bullets": ["Contrassegnare le tensioni dei nodi, le correnti dei rami e le direzioni presunte della corrente.", "Applicare KCL ai nodi indipendenti e KVL attorno ai loop indipendenti.", "Metti in relazione la tensione e la corrente del resistore con V = I × R.", "Risolvi le equazioni simultanee e controlla il bilancio di potenza."],
                "paragraphs": ["Un modello semplificato può omettere la resistenza interna della cella, la resistenza di contatto, l'efficienza del convertitore, gli effetti della temperatura, il comportamento transitorio, i circuiti di protezione e le tolleranze dei componenti. Includere ogni comportamento omesso che influisce materialmente su un circuito ad alta corrente."]
            }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Kirchhoff%27s_circuit_laws"
        },
        "concept-temperature-coefficient-of-resistance": {
            "displayName": "Coefficiente di temperatura di resistenza (TCR)",
            "description": "Il coefficiente di temperatura della resistenza stima come cambia la resistenza quando un materiale si riscalda o si raffredda.",
            "summary": "Come cambia la resistenza di un materiale con la temperatura.",
            "sections": [{
                "id": "linear-model",
                "title": "Il modello lineare",
                "paragraphs": ["Per una variazione di temperatura piccola o moderata, utilizzare la relazione del primo ordine:"],
                "formulas": [{
                    "expression": "R_T = R_0 [1 + \\u03b1 (T - T_0)]"
                }],
                "bullets": ["R_0 è la resistenza alla temperatura di riferimento T_0.", "R_T è la resistenza stimata alla temperatura T.", "\\u03b1 è il coefficiente di temperatura del materiale, espresso in 1/°C o ppm/°C.", "Le temperature devono utilizzare la stessa scala e unità per la differenza T - T_0."]
            }, {
                "id": "positive-and-negative",
                "title": "TCR positivo e negativo",
                "bullets": ["Un TCR positivo significa che la resistenza aumenta all'aumentare della temperatura; molti metalli si comportano in questo modo.", "Un TCR negativo significa che la resistenza diminuisce all'aumentare della temperatura.", "Un TCR vicino allo zero significa che la resistenza cambia poco nell'intervallo specificato.", "Il segno del coefficiente è importante; la sostituzione di un valore negativo con il suo valore assoluto inverte la previsione."]
            }, {
                "id": "worked-example",
                "title": "Esempio lavorato",
                "examples": [{
                    "title": "Una resistenza accesa",
                    "setup": "A 20 \\u00b0C è specificata una resistenza di 1,00 \\u03a9, con un TCR di 400 ppm/\\u00b0C.",
                    "formulas": ["\\u03b1 = 400 × 10^-6 / \\u00b0C = 0,0004 / \\u00b0C", "\\u0394T = 100 - 20 = 80 \\u00b0C", "R_T = 1,00 [1 + 0,0004 × 80] = 1,032 \\u03a9"],
                    "conclusion": "La resistenza stimata è 1.032 \\u03a9, circa il 3,2% superiore al suo valore a 20 \\u00b0C."
                }]
            }, {
                "id": "power-and-limits",
                "title": "TCR, potenza e limiti pratici",
                "formulas": [{
                    "expression": "Io = V/R"
                }, {
                    "expression": "P = V^2 / R = I^2 × R"
                }],
                "paragraphs": ["Per una resistenza TCR positiva pilotata a tensione costante, l'aumento della temperatura aumenta la resistenza e tende a ridurre la corrente. Per una fonte di corrente costante, lo stesso aumento di resistenza aumenta la potenza.", "Il TCR di un produttore normalmente si applica a un intervallo di temperatura e resistenza indicato. Gradienti di temperatura, cambiamenti di materiale, contatti, sollecitazione meccanica e autoriscaldamento possono far sì che il risultato reale differisca dalla stima del primo ordine."]
            }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Temperature_coefficient_of_resistance"
        },
        "concept-trigonometry": {
            "displayName": "Trigonometria",
            "description": "La trigonometria mette in relazione angoli e lunghezze ed è utile per vettori, relazioni di fase e forme d'onda.",
            "summary": "Relazioni tra angoli e lati dei triangoli.",
            "sections": [{
                "id": "right-triangles",
                "title": "Triangoli rettangoli",
                "paragraphs": ["Rispetto ad un angolo θ, il cateto opposto è opposto ad esso, il cateto adiacente lo tocca esclusa l'ipotenusa, e l'ipotenusa è opposta all'angolo retto. SOH-CAH-TOA è un aiuto per la memoria: il seno è opposto all'ipotenusa, il coseno è adiacente all'ipotenusa e la tangente è opposta all'adiacente."],
                "formulas": [{
                    "expression": "sin(θ) = opposto / ipotenusa"
                }, {
                    "expression": "cos(θ) = adiacente / ipotenusa"
                }, {
                    "expression": "tan(θ) = opposto / adiacente"
                }]
            }, {
                "id": "finding-sides-and-angles",
                "title": "Trovare lati e angoli sconosciuti",
                "examples": [{
                    "title": "Trova un lato",
                    "setup": "Un'ipotenusa di 10 cm incontra un angolo di 30°.",
                    "formulas": ["opposto = 10 × sin(30°) = 5 cm", "adiacente = 10 × cos(30°) ≈ 8,66 cm"],
                    "conclusion": "Utilizzare una funzione trigonometrica inversa quando si conoscono le lunghezze dei lati."
                }],
                "formulas": [{
                    "expression": "θ = sin^-1(opposto / ipotenusa)"
                }, {
                    "expression": "θ = cos^-1(adiacente / ipotenusa)"
                }, {
                    "expression": "θ = tan^-1(opposto / adiacente)"
                }]
            }, {
                "id": "degrees-and-radians",
                "title": "Gradi e radianti",
                "formulas": [{
                    "expression": "180° = π radianti"
                }, {
                    "expression": "θ_rad = θ_gradi × π / 180"
                }],
                "paragraphs": ["La calcolatrice deve essere nella modalità dell'angolo corretto. L'utilizzo della modalità gradi per un valore in radianti, o viceversa, produce un risultato diverso. Un ciclo completo è di 360° o 2π radianti."]
            }, {
                "id": "waveforms-and-identities",
                "title": "Forme d'onda e identità utili",
                "formulas": [{
                    "expression": "x(t) = A × sin(2πft + φ)"
                }, {
                    "expression": "ω = 2πf"
                }, {
                    "expression": "peccato^2(θ) + cos^2(θ) = 1"
                }, {
                    "expression": "a^2 + b^2 = c^2"
                }],
                "bullets": ["A è l'ampiezza, f è la frequenza in hertz, t è il tempo in secondi e φ è l'angolo di fase.", "La frequenza angolare ω è misurata in radianti al secondo.", "Mantieni il segno e il quadrante quando la direzione o la fase sono importanti."]
            }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Trigonometry"
        },
        "concept-heat-capacity": {
            "displayName": "Capacità termica",
            "description": "La capacità termica collega l'energia trasferita con il cambiamento di temperatura di un oggetto o materiale.",
            "summary": "Quanta energia ha bisogno di un oggetto per cambiare temperatura.",
            "sections": [{
                "id": "basic-relationships",
                "title": "Relazioni di base",
                "formulas": [{
                    "expression": "C = Q/ΔT"
                }, {
                    "expression": "Q = m × c × ΔT"
                }],
                "bullets": ["C è la capacità termica in J/K o J/°C.", "Q è l'energia termica trasferita in joule (J).", "m è la massa in chilogrammi e c è la capacità termica specifica in J/(kg·K).", "Una differenza di temperatura di 1 K equivale a una differenza di 1 °C."]
            }, {
                "id": "worked-example",
                "title": "Esempio lavorato",
                "examples": [{
                    "title": "Riscaldamento dell'acqua",
                    "setup": "Riscaldare 0,20 kg di acqua da 20 °C a 70 °C utilizzando c = 4.180 J/(kg·K).",
                    "formulas": ["ΔT = 70 - 20 = 50 °C", "Q = 0,20 × 4.180 × 50 = 41.800 J"],
                    "conclusion": "Il fabbisogno energetico ideale è di 41,8 kJ; un vero riscaldatore ha bisogno di più a causa delle perdite."
                }]
            }, {
                "id": "electrical-heating",
                "title": "Riscaldamento con energia elettrica",
                "formulas": [{
                    "expression": "Q = P × t"
                }, {
                    "expression": "t = m × c × ΔT / P"
                }],
                "examples": [{
                    "title": "Tempo di riscaldamento ideale",
                    "setup": "Riscalda l'esempio da 41,8 kJ con una sorgente costante da 100 W e senza perdite.",
                    "formulas": ["t = 41.800 J / 100 W = 418 s"],
                    "conclusion": "Il tempo ideale è di circa 7,0 minuti; con un'efficienza di trasferimento dell'80% è di circa 523 secondi."
                }]
            }, {
                "id": "object-and-material",
                "title": "Oggetto contro materiale",
                "paragraphs": ["La capacità termica appartiene all'intero oggetto e dipende dalla quantità di materiale presente. La capacità termica specifica è una proprietà dei materiali. Raddoppiando la massa raddoppia la capacità termica dello stesso materiale."],
                "formulas": [{
                    "expression": "C_totale = Σ m_i × c_i"
                }]
            }, {
                "id": "phase-changes-and-limits",
                "title": "Cambiamenti di fase e limiti pratici",
                "formulas": [{
                    "expression": "Q = m×L"
                }],
                "paragraphs": ["Durante la fusione o l'ebollizione, l'energia fornita può modificare lo stato del materiale senza modificarne la temperatura. L è il calore latente specifico in J/kg.", "La semplice equazione presuppone che il calore specifico sia approssimativamente costante. La perdita di calore, la convezione, l'irraggiamento, l'evaporazione, la resistenza di contatto e la temperatura irregolare possono far sì che il risultato reale differisca dall'ideale."]
            }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_capacity"
        },
        "concept-heat-flux": {
            "displayName": "Flusso di calore",
            "description": "Il flusso di calore descrive la velocità con cui il calore attraversa una superficie, indipendentemente dalla quantità totale di materiale che immagazzina calore.",
            "summary": "La velocità di trasferimento del calore attraverso un'unità di superficie.",
            "sections": [{
                "id": "definition",
                "title": "Definizione",
                "formulas": [{
                    "expression": "q'' = Q_punto / A"
                }],
                "bullets": ["q'' è il flusso di calore in W/m².", "Q_dot è la velocità di trasferimento del calore totale in watt (W).", "A è l'area attraverso la quale viene trasferito il calore in metri quadrati (m²)."],
                "paragraphs": ["Il flusso di calore è diverso dalla capacità termica: la capacità termica descrive l'energia immagazzinata per variazione di temperatura, mentre il flusso di calore descrive la velocità con cui il calore attraversa una superficie."]
            }, {
                "id": "worked-example",
                "title": "Esempio lavorato",
                "examples": [{
                    "title": "Flusso medio del riscaldatore",
                    "setup": "Un riscaldatore da 100 W trasferisce il calore su una superficie di 0,020 m².",
                    "formulas": ["q'' = 100 W / 0,020 m² = 5.000 W/m²"],
                    "conclusion": "Il flusso di calore medio è di 5.000 W/m², ovvero 0,5 W/cm²."
                }]
            }, {
                "id": "conduction",
                "title": "Conduzione attraverso uno strato piano",
                "formulas": [{
                    "expression": "q'' = -k × ΔT / L"
                }, {
                    "expression": "Q_punto = k × A × (T_caldo - T_freddo) / L"
                }],
                "bullets": ["k è la conduttività termica in W/(m·K).", "ΔT è la differenza di temperatura attraverso lo strato.", "L è lo spessore dello strato in metri.", "Il segno meno indica il flusso dalla temperatura più alta verso la temperatura più bassa."]
            }, {
                "id": "convection-and-radiation",
                "title": "Convezione e radiazione",
                "formulas": [{
                    "expression": "q'' = h × (T_s - T_∞)"
                }, {
                    "expression": "q'' = ε × σ × (T_s^4 - T_sur^4)"
                }],
                "paragraphs": ["La convezione utilizza un coefficiente superficiale h. La radiazione utilizza l'emissività ε e la costante di Stefan-Boltzmann σ; le temperature nell'equazione della radiazione devono essere temperature assolute in Kelvin."]
            }, {
                "id": "practical-checks",
                "title": "Verifiche pratiche",
                "bullets": ["Convertire l'area in m² prima di utilizzare W/m².", "Distinguere il flusso di calore medio da un picco locale; il riscaldamento potrebbe non essere uniforme.", "Includere resistenza di contatto, convezione, radiazione e perdita di calore quando necessario.", "Il flusso di calore è una velocità di trasferimento, non una temperatura; utilizzare la capacità termica per il cambiamento di temperatura."]
            }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_flux"
        },
        "concept-si-system-and-imperial-units": {
            "displayName": "Il sistema SI e le misure imperiali",
            "description": "Il Sistema internazionale di unità fornisce unità di base coerenti, unità derivate e scala decimale per l'ingegneria.",
            "summary": "Le unità, i prefissi e le conversioni utilizzati nei calcoli ingegneristici.",
            "sections": [{
                "id": "base-units",
                "title": "Unità SI comuni",
                "table": {
                    "headers": ["Quantità", "Unità SI", "Simbolo"],
                    "rows": [["Lunghezza", "metro", "M"], ["Massa", "chilogrammo", "kg"], ["Tempo", "secondo", "S"], ["Temperatura", "Kelvin", "K"], ["Corrente elettrica", "ampere", "UN"], ["Quantità di sostanza", "neo", "mol"], ["Intensità luminosa", "candela", "CD"]]
                },
                "bullets": ["Voltaggio: volt (V).", "Resistenza: ohm (\\u03a9).", "Potenza: watt (W).", "Energia: joule (J).", "Forza: newton (N).", "Pressione: pascal (Pa).", "Frequenza: hertz (Hz)."]
            }, {
                "id": "decimal-prefixes",
                "title": "Prefissi decimali",
                "table": {
                    "headers": ["Prefisso", "Simbolo", "Fattore"],
                    "rows": [["chilo", "k", "1.000 = 10^3"], ["mega", "M", "1.000.000 = 10^6"], ["milli", "M", "0,001 = 10^-3"], ["micro", "µ", "0,000001 = 10^-6"], ["nano", "N", "0,000000001 = 10^-9"]]
                },
                "paragraphs": ["Ad esempio, 2,2 k\\u03a9 equivale a 2.200 \\u03a9 e 15 mA equivale a 0,015 A. Converti i valori in unità compatibili prima di utilizzare una formula."]
            }, {
                "id": "length-conversions",
                "title": "Pollici e lunghezza metrica",
                "formulas": [{
                    "expression": "1 pollice = 25,4 mm = 0,0254 m"
                }, {
                    "expression": "1 piede = 12 pollici = 0,3048 m"
                }, {
                    "expression": "1 iarda = 3 piedi = 0,9144 m"
                }, {
                    "expression": "1 pollice² = 645,16 mm²"
                }],
                "examples": [{
                    "title": "Converti lunghezza",
                    "setup": "Converti 0,1 pollici in millimetri e 5 mm in pollici.",
                    "formulas": ["0,1 pollici × 25,4 = 2,54 mm", "5 mm/25,4 ≈ 0,19685 pollici"],
                    "conclusion": "Le conversioni di area e volume utilizzano il fattore di lunghezza elevato alla potenza pertinente."
                }]
            }, {
                "id": "other-conversions",
                "title": "Altre conversioni comuni",
                "bullets": ["1 libbra ≈ 0,45359237 kg.", "1 libbra ≈ 4,44822 N.", "1 psi ≈ 6.894,76 Pa.", "°F = °C × 9/5 + 32.", "°C = (°F - 32) × 5/9.", "K = °C + 273,15."],
                "paragraphs": ["Una libbra può riferirsi alla massa (lb) o alla forza (lbf), che sono quantità diverse. Allo stesso modo, pollici, pollici quadrati e pollici cubi misurano dimensioni diverse."]
            }, {
                "id": "unit-checks",
                "title": "Verifiche pratiche unitarie",
                "bullets": ["Scrivi l'unità accanto a ciascun valore durante il calcolo.", "Conferma che entrambi i lati di un'equazione hanno dimensioni compatibili.", "Converti prima di moltiplicare o dividere.", "Arrotonda solo alla fine in modo che i risultati intermedi mantengano una precisione utile."]
            }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/International_System_of_Units"
        },
        "concept-wire-gauges-awg-swg-bwg": {
            "displayName": "Calibro dei cavi: AWG, SWG e BWG",
            "description": "Un numero di misuratore descrive una dimensione nominale solo quando viene nominato il relativo sistema di misuratore.",
            "summary": "Perché i numeri del calibro del filo necessitano di un sistema denominato e di un diametro dichiarato.",
            "sections": [{
                "id": "gauge-systems",
                "title": "Sistemi di misura",
                "bullets": ["AWG è l'American Wire Gauge, conosciuto storicamente anche come calibro Brown & Sharpe.", "SWG è Standard Wire Gauge, lo storico sistema britannico di spessore di fili e lamiere.", "BWG è Birmingham Wire Gauge, storicamente utilizzato per fili di ferro, tubi e spessori di lamiere.", "Un numero di calibro ordinario più grande generalmente significa un diametro più piccolo; le dimensioni superiori al calibro 0 utilizzano 00, 000 o 0000."],
                "paragraphs": ["SWG e BWG sono sistemi tabulati e non devono essere calcolati con la formula AWG. Lo stesso numero quindi non identifica lo stesso diametro tra i sistemi."]
            }, {
                "id": "awg-formula",
                "title": "Diametro e area AWG",
                "formulas": [{
                    "expression": "d_pollici = 0,005 × 92^((36 - n) / 39)"
                }, {
                    "expression": "d_mm = 0,127 × 92^((36 - n) / 39)"
                }, {
                    "expression": "A = π × d^2 / 4"
                }],
                "paragraphs": ["Per 1/0, 2/0, 3/0 e 4/0, utilizzare n = 0, -1, -2 e -3. L'AWG determina la dimensione del conduttore, non una corrente sicura universale; la portata dipende anche dal materiale, dall'isolamento, dal raffreddamento, dall'installazione e dalle norme elettriche applicabili."]
            }, {
                "id": "system-comparison",
                "title": "Perché il nome del sistema è importante",
                "table": {
                    "headers": ["Misura", "AWG", "SWG britannico", "BWG"],
                    "rows": [["10", "2.588 mm", "3.251 mm", "3.404 mm"], ["20", "0,8128 mm", "0,9144 mm", "0,8890 mm"], ["30", "0,2540 mm", "0,3150 mm", "0,3048 mm"]]
                },
                "paragraphs": ["Questi valori sono nominali. Le tolleranze del prodotto, i rivestimenti, l'isolamento e la struttura a trefoli possono modificare il diametro misurato o complessivo."]
            }, {
                "id": "resistance",
                "title": "Calibro, area e resistenza",
                "formulas": [{
                    "expression": "R = ρ × L / A"
                }],
                "paragraphs": ["La resistenza dipende dalla lunghezza del conduttore L, dall'area della sezione trasversale A e dalla resistività del materiale ρ. Poiché l'area varia con il quadrato del diametro, una modesta differenza di diametro può comportare una sostanziale differenza di resistenza. In AWG, aumentando il calibro di tre dimensioni si dimezza circa l'area e si raddoppia la resistenza per unità di lunghezza per lo stesso materiale e la stessa temperatura."]
            }, {
                "id": "practical-specification",
                "title": "Specificazione pratica",
                "bullets": ["Assegna un nome al sistema, ad esempio 24 AWG o 24 British SWG.", "Includere il diametro nominale in millimetri quando i sistemi potrebbero essere confusi.", "Indicare se la dimensione è conduttore nudo, diametro isolato, spessore della lamiera o spessore della parete del tubo.", "Per i conduttori a trefolo, includere la costruzione del trefolo quando la flessibilità e il diametro complessivo sono importanti.", "Determina la capacità di corrente dai dati del prodotto e dalle regole elettriche, non solo dal numero del manometro."]
            }],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Wire_gauge"
        }
    },
    "materials": {
        "ka1": {
            "displayName": "Kanthal A1 / APM",
            "description": "Profilo catalogo per Kanthal A1 / APM.",
            "summary": "Profilo catalogo per Kanthal A1 / APM."
        },
        "ka": {
            "displayName": "Kanthal A / AE / AF",
            "description": "Profilo catalogo per Kanthal A / AE / AF.",
            "summary": "Profilo catalogo per Kanthal A / AE / AF."
        },
        "kd": {
            "displayName": "Kanthal D",
            "description": "Profilo catalogo per Kanthal D.",
            "summary": "Profilo catalogo per Kanthal D."
        },
        "n20": {
            "displayName": "Nichrome N20",
            "description": "Profilo catalogo per Nichrome N20.",
            "summary": "Profilo catalogo per Nichrome N20."
        },
        "n40": {
            "displayName": "Nichrome N40",
            "description": "Profilo catalogo per Nichrome N40.",
            "summary": "Profilo catalogo per Nichrome N40."
        },
        "n60": {
            "displayName": "Nichrome N60 (C)",
            "description": "Profilo catalogo per Nichrome N60 (C).",
            "summary": "Profilo catalogo per Nichrome N60 (C)."
        },
        "n70": {
            "displayName": "Nichrome N70 (B)",
            "description": "Profilo catalogo per Nichrome N70 (B).",
            "summary": "Profilo catalogo per Nichrome N70 (B)."
        },
        "n80": {
            "displayName": "Nichrome N80 (A)",
            "description": "Profilo catalogo per Nichrome N80 (A).",
            "summary": "Profilo catalogo per Nichrome N80 (A)."
        },
        "ss304": {
            "displayName": "SS 304",
            "description": "Profilo catalogo per SS 304.",
            "summary": "Profilo catalogo per SS 304."
        },
        "ss316": {
            "displayName": "SS 316",
            "description": "Profilo catalogo per SS 316.",
            "summary": "Profilo catalogo per SS 316."
        },
        "ss316l": {
            "displayName": "SS 316L / Elite",
            "description": "Profilo catalogo per SS 316L / Elite.",
            "summary": "Profilo catalogo per SS 316L / Elite."
        },
        "ss317l": {
            "displayName": "SS 317L / Haywire",
            "description": "Profilo catalogo per SS 317L / Haywire.",
            "summary": "Profilo catalogo per SS 317L / Haywire."
        },
        "ss430": {
            "displayName": "SS 430",
            "description": "Profilo catalogo per SS 430.",
            "summary": "Profilo catalogo per SS 430."
        },
        "ti1": {
            "displayName": "Titanium 1",
            "description": "Profilo catalogo per Titanium 1.",
            "summary": "Profilo catalogo per Titanium 1."
        },
        "ti2": {
            "displayName": "Titanium 2 (R50400)",
            "description": "Profilo catalogo per Titanium 2 (R50400).",
            "summary": "Profilo catalogo per Titanium 2 (R50400)."
        },
        "tie": {
            "displayName": "Titanium ready (e-SG)",
            "description": "Profilo catalogo per Titanium ready (e-SG).",
            "summary": "Profilo catalogo per Titanium ready (e-SG)."
        },
        "w": {
            "displayName": "Tungsten",
            "description": "Profilo catalogo per Tungsten.",
            "summary": "Profilo catalogo per Tungsten."
        },
        "nio": {
            "displayName": "Niobium alloy",
            "description": "Profilo catalogo per Niobium alloy.",
            "summary": "Profilo catalogo per Niobium alloy."
        },
        "ni200": {
            "displayName": "Nickel 200 / Ni200 (UNS N02200)",
            "description": "Profilo catalogo per Nickel 200 / Ni200 (UNS N02200).",
            "summary": "Profilo catalogo per Nickel 200 / Ni200 (UNS N02200)."
        },
        "nife30": {
            "displayName": "NiFe30 (Resistherm - TFR)",
            "description": "Profilo catalogo per NiFe30 (Resistherm - TFR).",
            "summary": "Profilo catalogo per NiFe30 (Resistherm - TFR)."
        },
        "dicodes": {
            "displayName": "NiFe30 (Resistherm - TCR)",
            "description": "Profilo catalogo per NiFe30 (Resistherm - TCR).",
            "summary": "Profilo catalogo per NiFe30 (Resistherm - TCR)."
        },
        "reactor": {
            "displayName": "NiFe (Reactor Wire)",
            "description": "Profilo catalogo per NiFe (Reactor Wire).",
            "summary": "Profilo catalogo per NiFe (Reactor Wire)."
        },
        "nife30stealth": {
            "displayName": "NiFe30 (StealthVape)",
            "description": "Profilo catalogo per NiFe30 (StealthVape).",
            "summary": "Profilo catalogo per NiFe30 (StealthVape)."
        },
        "nft70": {
            "displayName": "Nifethal 70 (Alloy120)",
            "description": "Profilo catalogo per Nifethal 70 (Alloy120).",
            "summary": "Profilo catalogo per Nifethal 70 (Alloy120)."
        },
        "nft52": {
            "displayName": "Nifethal 52 (Alloy52)",
            "description": "Profilo catalogo per Nifethal 52 (Alloy52).",
            "summary": "Profilo catalogo per Nifethal 52 (Alloy52)."
        },
        "zr": {
            "displayName": "Zirconium (pure)",
            "description": "Profilo catalogo per Zirconium (pure).",
            "summary": "Profilo catalogo per Zirconium (pure)."
        },
        "n90": {
            "displayName": "Nichrome N90 (Ni90Cr10)",
            "description": "Profilo catalogo per Nichrome N90 (Ni90Cr10).",
            "summary": "Profilo catalogo per Nichrome N90 (Ni90Cr10)."
        },
        "ss904l": {
            "displayName": "SS 904L (UNS N08904)",
            "description": "Profilo catalogo per SS 904L (UNS N08904).",
            "summary": "Profilo catalogo per SS 904L (UNS N08904)."
        }
    },
    "batteries": {
        "battery-1": {
            "displayName": "AW IMR 14500",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-2": {
            "displayName": "AW IMR 14500",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-3": {
            "displayName": "AW IMR 16340",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-4": {
            "displayName": "AW IMR 18350",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-5": {
            "displayName": "AW IMR 18350",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-6": {
            "displayName": "AW IMR 18490",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-7": {
            "displayName": "AW IMR 18490",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-8": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-9": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-10": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-11": {
            "displayName": "AWT 26650 4500mAh 75A",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-12": {
            "displayName": "EH IMR 18350",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-13": {
            "displayName": "EH IMR 18500",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-14": {
            "displayName": "EH IMR 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-15": {
            "displayName": "EH IMR 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-16": {
            "displayName": "Efest IMR 18350",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-17": {
            "displayName": "Efest IMR 18350",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-18": {
            "displayName": "Efest IMR 18490",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-19": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-20": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-21": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-22": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-23": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-24": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-25": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-26": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-27": {
            "displayName": "Efest IMR 18650 35A",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-28": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-29": {
            "displayName": "Efest IMR 26650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-30": {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": undefined,
            "summary": "Una batteria interna al dispositivo anziché una cella sostituibile dall'utente.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-31": {
            "displayName": "Innokin iTaste VV v3",
            "description": undefined,
            "summary": "Una batteria interna al dispositivo anziché una cella sostituibile dall'utente.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-32": {
            "displayName": "Keeppower IMR26650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-33": {
            "displayName": "LG 18650HB6",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-34": {
            "displayName": "LG 18650HE2",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-35": {
            "displayName": "LG 18650HG2",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-36": {
            "displayName": "MNKE IMR 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-37": {
            "displayName": "MNKE IMR 26650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-38": {
            "displayName": "MXJO IMR 18650 35A",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-39": {
            "displayName": "MXJO IMR 18650 20A",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-40": {
            "displayName": "Nitecore NL188",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-41": {
            "displayName": "Orbtronic 18650 PD2900",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-42": {
            "displayName": "Orbtronic 18650 SX22",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-43": {
            "displayName": "Orbtronic 18650 SX30",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-44": {
            "displayName": "Orbtronic 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-45": {
            "displayName": "Orbtronic CGR18650CH",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-46": {
            "displayName": "Orbtronic NCR18650A",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-47": {
            "displayName": "Panasonic CGR18650CH",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-48": {
            "displayName": "Panasonic NCR18650A",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-49": {
            "displayName": "Panasonic NCR18650B",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-50": {
            "displayName": "Panasonic NCR18650BD",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-51": {
            "displayName": "Panasonic NCR18650PF",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-52": {
            "displayName": "Panasonic CGR26650A",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-53": {
            "displayName": "Samsung ICR18650-26F",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-54": {
            "displayName": "Panasonic NCR18650PD",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-55": {
            "displayName": "Samsung INR18650-20R",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-56": {
            "displayName": "Samsung INR18650-25R",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-57": {
            "displayName": "Samsung INR18650-20Q",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-58": {
            "displayName": "Samsung INR18650-30Q",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-59": {
            "displayName": "Sanyo UR16650ZTA",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-60": {
            "displayName": "Sanyo UR18650EX",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-61": {
            "displayName": "Sanyo UR18650F",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": "Batteria a basso consumo; non adatto per lo svapo."
        },
        "battery-62": {
            "displayName": "Sibeile IMR 18500",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-63": {
            "displayName": "Sibeile IMR 18500",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-64": {
            "displayName": "Sony US18650VTC3",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-65": {
            "displayName": "Sony US18650VTC4",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-66": {
            "displayName": "Sony US18650VTC5",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-67": {
            "displayName": "Sony US18650v3",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-68": {
            "displayName": "Sony US26650VT",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-69": {
            "displayName": "Torchy IMR 18350",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-70": {
            "displayName": "Vappower IMR 26650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-71": {
            "displayName": "Vamped 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["20 A valutazione continua; le valutazioni degli impulsi non vengono utilizzate."],
            "safetyText": undefined
        },
        "battery-72": {
            "displayName": "UltraFire BRC 18650 4000mAh li-ion",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["La capacità effettiva è inferiore a quanto suggerisce l'etichetta."],
            "safetyText": undefined
        },
        "battery-73": {
            "displayName": "UltraFire XSL 18350 1200mAh",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["La capacità effettiva è inferiore a quanto suggerisce l'etichetta."],
            "safetyText": undefined
        },
        "battery-74": {
            "displayName": "Vamped 26650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-75": {
            "displayName": "Xtar IMR 18350",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-76": {
            "displayName": "Xtar IMR 18500",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-77": {
            "displayName": "EVE INR18650/30P",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["20 Un valore di confronto indipendente e conservativo; l'esatto involucro e la revisione della produzione rimangono rilevanti."],
            "safetyText": undefined
        },
        "battery-78": {
            "displayName": "EVE INR18650/25P",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["15 Un valore conservativo derivante da test su modello esatto; la revisione testata con marchio CCC rimane rilevante."],
            "safetyText": undefined
        },
        "battery-79": {
            "displayName": "EVE INR18650/30PL",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["45 Un valore continuo indipendente per la revisione della tabella testata; non sostituire le valutazioni del polso."],
            "safetyText": undefined
        },
        "battery-80": {
            "displayName": "Ampace JP30P1",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["36 Un vero valore continuo; la cifra di 56 A è limitata dalla temperatura."],
            "safetyText": undefined
        },
        "battery-81": {
            "displayName": "Tenpower INR18650-30XG",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["40 A valore conservativo; le celle testate apparivano pre-produzione e mancavano del logo CCC."],
            "safetyText": undefined
        },
        "battery-82": {
            "displayName": "EVE INR21700/58E",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["13 Un valore continuo consigliato; 16,8 A è un massimo assoluto non previsto per la durata del ciclo."],
            "safetyText": undefined
        },
        "battery-83": {
            "displayName": "Reliance INR21700-RS40",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["40 A valore conservativo; 70 A è limitato alla temperatura e i campioni testati erano pre-produzione."],
            "safetyText": undefined
        },
        "battery-84": {
            "displayName": "Reliance INR21700-RS50",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["40 Un valore di confronto tra celle di produzione; 70 A richiede il controllo della temperatura."],
            "safetyText": undefined
        },
        "battery-85": {
            "displayName": "Vapcell S41",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["40 Un valore del wrapper esatto; 70 A è limitato a 60 C e testato come riavvolgimento EVE 40PL."],
            "safetyText": undefined
        },
        "battery-86": {
            "displayName": "BAK 21700-65E",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["19 Un valore conservativo; i campioni esatti testati apparivano in pre-produzione e mancavano dei marchi CCC."],
            "safetyText": undefined
        },
        "battery-87": {
            "displayName": "Tenpower INR21700-50XG",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["40 A valore conservativo; 90 A è limitato alla temperatura e le celle testate sono apparse pre-produzione."],
            "safetyText": undefined
        },
        "battery-88": {
            "displayName": "Tenpower INR21700-60XG",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["40 A valore conservativo; 60 A sono limitati dalla temperatura e la continuità della produzione rimane irrisolta."],
            "safetyText": undefined
        },
        "battery-89": {
            "displayName": "Great Power 50Q",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["40 A valore conservativo; i campioni testati avevano una capacità incoerente e mancavano i marchi CCC/CE."],
            "safetyText": undefined
        },
        "battery-90": {
            "displayName": "FEB 21700-68E",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["13 Un valore conservativo; i campioni esatti testati apparivano in pre-produzione e mancavano dei marchi CCC."],
            "safetyText": undefined
        },
        "battery-91": {
            "displayName": "Reliance INR21700-RS60",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["30 A valore continuo stimato dal tester; Il limite massimo di 50 A di Reliance è limitato dalla temperatura."],
            "safetyText": undefined
        },
        "battery-92": {
            "displayName": "Reliance INR21700-RH60",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["20 Un valore continuo da due lotti relativi alla produzione testati; 30 A è limitato dalla temperatura."],
            "safetyText": undefined
        },
        "battery-93": {
            "displayName": "Amprius INR18650/40 (SA110)",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["12 A continui; 20 A è solo a impulsi. L'involucro testato esatto è registrato come SA110 / INR18650/40."],
            "safetyText": undefined
        },
        "battery-94": {
            "displayName": "Vapcell B30 18650",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["20 Un valore del wrapper esatto; il tester consiglia un valore inferiore a 15 A continui. Vapehuset pubblicizza 25 A nel titolo e le successive revisioni del rewrap sourcing o dell'involucro potrebbero differire."],
            "safetyText": undefined
        },
        "battery-95": {
            "displayName": "Golisi S35 21700",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["30 Un valore del modello esatto; si tratta di un riavvolgimento e le revisioni successive del wrapper o l'approvvigionamento sottostante potrebbero differire."],
            "safetyText": undefined
        },
        "battery-96": {
            "displayName": "iJoy 20700 3000mAh five-leg",
            "description": undefined,
            "summary": "Una cella ricaricabile rimovibile utilizzata nei dispositivi compatibili.",
            "notes": ["30 Un valore di revisione esatto di cinque gambe; le revisioni a quattro gambe e successive che utilizzano lo stesso rivestimento sono sostanzialmente diverse e non devono ereditare questo profilo."],
            "safetyText": undefined
        }
    },
    "mods": {
        "preset-1": {
            "displayName": "AceSmok Ace 50",
            "description": "Un profilo del dispositivo di svapo regolamentato per AceSmok Ace 50.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per AceSmok Ace 50."
        },
        "preset-2": {
            "displayName": "Ante Meridiem Axis",
            "description": "Un profilo del dispositivo di svapo regolamentato per Ante Meridiem Axis.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Ante Meridiem Axis."
        },
        "preset-3": {
            "displayName": "Anyvape AnyMOD",
            "description": "Un profilo del dispositivo di svapo regolamentato per Anyvape AnyMOD.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Anyvape AnyMOD."
        },
        "preset-4": {
            "displayName": "Arrow 100W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Arrow 100W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Arrow 100W."
        },
        "preset-5": {
            "displayName": "Artisan Supermax",
            "description": "Un profilo del dispositivo di svapo regolamentato per Artisan Supermax.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Artisan Supermax."
        },
        "preset-6": {
            "displayName": "Asmodus Snow Wolf 200W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Asmodus Snow Wolf 200W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Asmodus Snow Wolf 200W."
        },
        "preset-7": {
            "displayName": "Aspire CF Sub Ohm",
            "description": "Un profilo del dispositivo di svapo regolamentato per Aspire CF Sub Ohm.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Aspire CF Sub Ohm."
        },
        "preset-8": {
            "displayName": "Beastmode Industries BMI 100 Watt V.1",
            "description": "Un profilo del dispositivo di svapo regolamentato per Beastmode Industries BMI 100 Watt V.1.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Beastmode Industries BMI 100 Watt V.1."
        },
        "preset-9": {
            "displayName": "Billet Box rev. 3a",
            "description": "Billet Box Rev. 3a con finitura in alluminio anodizzato brillante e pallinato; introdotto nel maggio 2014.",
            "summary": "Scatola per billette Rev."
        },
        "preset-10": {
            "displayName": "Cloupor DNA-30",
            "description": "Un dispositivo Cloupor da 30 W che utilizza un chipset clone in stile DNA30 di terze parti, non una scheda Evolv DNA-30D autentica.",
            "summary": "Un dispositivo Cloupor da 30 W che utilizza un chipset clone in stile DNA30 di terze parti, non una scheda Evolv DNA-30D autentica."
        },
        "preset-11": {
            "displayName": "Cloupor DNA-50",
            "description": "Un profilo del dispositivo di svapo regolamentato per Cloupor DNA-50.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Cloupor DNA-50."
        },
        "preset-12": {
            "displayName": "Cloupor GT",
            "description": "Un profilo del dispositivo di svapo regolamentato per Cloupor GT.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Cloupor GT."
        },
        "preset-13": {
            "displayName": "Cloupor Mini",
            "description": "Un profilo del dispositivo di svapo regolamentato per Cloupor Mini.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Cloupor Mini."
        },
        "preset-14": {
            "displayName": "Cloupor T5",
            "description": "Un profilo del dispositivo di svapo regolamentato per Cloupor T5.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Cloupor T5."
        },
        "preset-15": {
            "displayName": "Cloupor T6",
            "description": "Un profilo del dispositivo di svapo regolamentato per Cloupor T6.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Cloupor T6."
        },
        "preset-16": {
            "displayName": "Cloupor T8",
            "description": "Un profilo del dispositivo di svapo regolamentato per Cloupor T8.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Cloupor T8."
        },
        "preset-17": {
            "displayName": "Cloupor ZNA50",
            "description": "Un profilo del dispositivo di svapo regolamentato per Cloupor ZNA50.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Cloupor ZNA50."
        },
        "preset-18": {
            "displayName": "C-Tratech Smart Box 50W",
            "description": "Un profilo del dispositivo di svapo regolamentato per C-Tratech Smart Box 50W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per C-Tratech Smart Box 50W."
        },
        "preset-19": {
            "displayName": "Dicodes Dani Extreme",
            "description": "Un profilo del dispositivo di svapo regolamentato per Dicodes Dani Extreme.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Dicodes Dani Extreme."
        },
        "preset-20": {
            "displayName": "Dicodes Dani Extreme v2 / Pipeline Pro v2",
            "description": "Un profilo del dispositivo di svapo regolamentato per Dicodes Dani Extreme v2 / Pipeline Pro v2.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Dicodes Dani Extreme v2 / Pipeline Pro v2."
        },
        "preset-21": {
            "displayName": "DJK Wood Mods The Nerd VV",
            "description": "Un profilo del dispositivo di svapo regolamentato per DJK Wood Mods The Nerd VV.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per DJK Wood Mods The Nerd VV."
        },
        "preset-22": {
            "displayName": "Dovpo DT-50",
            "description": "Un profilo del dispositivo di svapo regolamentato per Dovpo DT-50.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Dovpo DT-50."
        },
        "preset-23": {
            "displayName": "Dovpo E-LVT",
            "description": "Un profilo del dispositivo di svapo regolamentato per Dovpo E-LVT.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Dovpo E-LVT."
        },
        "preset-24": {
            "displayName": "Dovpo E-Mech",
            "description": "Un profilo del dispositivo di svapo regolamentato per Dovpo E-Mech.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Dovpo E-Mech."
        },
        "preset-25": {
            "displayName": "Dovpo TC 50",
            "description": "Un profilo del dispositivo di svapo regolamentato per Dovpo TC 50.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Dovpo TC 50."
        },
        "preset-26": {
            "displayName": "eGo Twist",
            "description": "Un profilo del dispositivo di svapo regolamentato per eGo Twist.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per eGo Twist."
        },
        "preset-27": {
            "displayName": "eGo-V V3",
            "description": "Un profilo del dispositivo di svapo regolamentato per eGo-V V3.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per eGo-V V3."
        },
        "preset-28": {
            "displayName": "Evod V v3",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evod V v3.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evod V v3."
        },
        "preset-29": {
            "displayName": "Evolv DNA-20D",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-20D.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-20D."
        },
        "preset-30": {
            "displayName": "Evolv DNA-30D",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-30D.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-30D."
        },
        "preset-31": {
            "displayName": "Evolv DNA-40 (std. wire)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-40 (std. wire).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-40 (std."
        },
        "preset-32": {
            "displayName": "Evolv DNA-40 (Ni 200)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-40 (Ni 200).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-40 (Ni 200)."
        },
        "preset-33": {
            "displayName": "Evolv DNA60 (non-color)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA60 (non-color).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA60 (non-color)."
        },
        "preset-34": {
            "displayName": "Evolv DNA-75",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-75.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-75."
        },
        "preset-35": {
            "displayName": "Evolv DNA-200 (2 cells, DNA-133)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-200 (2 cells, DNA-133).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-200 (2 cells, DNA-133)."
        },
        "preset-36": {
            "displayName": "Evolv DNA-200 (3 cells)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-200 (3 cells).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-200 (3 cells)."
        },
        "preset-37": {
            "displayName": "Evolv DNA-200 (TC mode)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-200 (TC mode).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-200 (TC mode)."
        },
        "preset-38": {
            "displayName": "Evolv DNA-250 (2 cells, DNA-166)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-250 (2 cells, DNA-166).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-250 (2 cells, DNA-166)."
        },
        "preset-39": {
            "displayName": "Evolv DNA-250 (3 cells)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-250 (3 cells).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA-250 (3 cells)."
        },
        "preset-40": {
            "displayName": "Evolv Kick 2",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv Kick 2.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv Kick 2."
        },
        "preset-41": {
            "displayName": "Eleaf iStick",
            "description": "Un profilo del dispositivo di svapo regolamentato per Eleaf iStick.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Eleaf iStick."
        },
        "preset-42": {
            "displayName": "Eleaf iStick 30W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Eleaf iStick 30W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Eleaf iStick 30W."
        },
        "preset-43": {
            "displayName": "Eleaf iStick 40W TC",
            "description": "Un profilo del dispositivo di svapo regolamentato per Eleaf iStick 40W TC.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Eleaf iStick 40W TC."
        },
        "preset-44": {
            "displayName": "Eleaf iStick 50W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Eleaf iStick 50W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Eleaf iStick 50W."
        },
        "preset-45": {
            "displayName": "Eleaf iStick 100W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Eleaf iStick 100W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Eleaf iStick 100W."
        },
        "preset-46": {
            "displayName": "Gossmods The Duke",
            "description": "Un profilo del dispositivo di svapo regolamentato per Gossmods The Duke.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Gossmods The Duke."
        },
        "preset-47": {
            "displayName": "Grand Innovations GI2",
            "description": "Un profilo del dispositivo di svapo regolamentato per Grand Innovations GI2.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Grand Innovations GI2."
        },
        "preset-48": {
            "displayName": "Heatvape Invader Mini",
            "description": "Un profilo del dispositivo di svapo regolamentato per Heatvape Invader Mini.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Heatvape Invader Mini."
        },
        "preset-49": {
            "displayName": "Heatvape Invader Mini (TC mode)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Heatvape Invader Mini (TC mode).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Heatvape Invader Mini (TC mode)."
        },
        "preset-50": {
            "displayName": "iJoy A160",
            "description": "Un profilo del dispositivo di svapo regolamentato per iJoy A160.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per iJoy A160."
        },
        "preset-51": {
            "displayName": "Innokin Cool Fire II",
            "description": "Un profilo del dispositivo di svapo regolamentato per Innokin Cool Fire II.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Innokin Cool Fire II."
        },
        "preset-52": {
            "displayName": "Innokin Cool Fire IV",
            "description": "Un profilo del dispositivo di svapo regolamentato per Innokin Cool Fire IV.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Innokin Cool Fire IV."
        },
        "preset-53": {
            "displayName": "Innokin Disrupter",
            "description": "Un profilo del dispositivo di svapo regolamentato per Innokin Disrupter.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Innokin Disrupter."
        },
        "preset-54": {
            "displayName": "Innokin iTaste 134 / iTaste 134 mini",
            "description": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste 134 / iTaste 134 mini.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste 134 / iTaste 134 mini."
        },
        "preset-55": {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste MVP 2.0.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste MVP 2.0."
        },
        "preset-56": {
            "displayName": "Innokin iTaste MVP 20 Watt",
            "description": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste MVP 20 Watt.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste MVP 20 Watt."
        },
        "preset-57": {
            "displayName": "Innokin iTaste MVP 3.0",
            "description": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste MVP 3.0.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste MVP 3.0."
        },
        "preset-58": {
            "displayName": "Innokin iTaste MVP 3 Pro",
            "description": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste MVP 3 Pro.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste MVP 3 Pro."
        },
        "preset-59": {
            "displayName": "Innokin iTaste SVD",
            "description": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste SVD.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste SVD."
        },
        "preset-60": {
            "displayName": "Innokin iTaste SVD2",
            "description": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste SVD2.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste SVD2."
        },
        "preset-61": {
            "displayName": "Innokin iTaste VTR",
            "description": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste VTR.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste VTR."
        },
        "preset-62": {
            "displayName": "Innokin iTaste VV V3.0",
            "description": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste VV V3.0.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Innokin iTaste VV V3.0."
        },
        "preset-63": {
            "displayName": "Joy4life Beyang 30W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Joy4life Beyang 30W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Joy4life Beyang 30W."
        },
        "preset-64": {
            "displayName": "Joyetech eCom Supreme",
            "description": "Un profilo del dispositivo di svapo regolamentato per Joyetech eCom Supreme.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Joyetech eCom Supreme."
        },
        "preset-65": {
            "displayName": "Joyetech eVic",
            "description": "Un profilo del dispositivo di svapo regolamentato per Joyetech eVic.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Joyetech eVic."
        },
        "preset-66": {
            "displayName": "Joyetech eVic VT",
            "description": "Un profilo del dispositivo di svapo regolamentato per Joyetech eVic VT.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Joyetech eVic VT."
        },
        "preset-67": {
            "displayName": "Joyetech eVic VT (TC mode)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Joyetech eVic VT (TC mode).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Joyetech eVic VT (TC mode)."
        },
        "preset-68": {
            "displayName": "Joyetech eVic Supreme",
            "description": "Un profilo del dispositivo di svapo regolamentato per Joyetech eVic Supreme.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Joyetech eVic Supreme."
        },
        "preset-69": {
            "displayName": "J Well Alesia",
            "description": "Un profilo del dispositivo di svapo regolamentato per J Well Alesia.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per J Well Alesia."
        },
        "preset-70": {
            "displayName": "J Well Troca",
            "description": "Un profilo del dispositivo di svapo regolamentato per J Well Troca.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per J Well Troca."
        },
        "preset-71": {
            "displayName": "Kanger e-Power v3",
            "description": "Un profilo del dispositivo di svapo regolamentato per Kanger e-Power v3.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Kanger e-Power v3."
        },
        "preset-72": {
            "displayName": "Kanger IPOW 2",
            "description": "Un profilo del dispositivo di svapo regolamentato per Kanger IPOW 2.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Kanger IPOW 2."
        },
        "preset-73": {
            "displayName": "Kanger KBOX",
            "description": "Un profilo del dispositivo di svapo regolamentato per Kanger KBOX.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Kanger KBOX."
        },
        "preset-74": {
            "displayName": "Kanger KBOX Mini / SUBOX Mini",
            "description": "Un profilo del dispositivo di svapo regolamentato per Kanger KBOX Mini / SUBOX Mini.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Kanger KBOX Mini / SUBOX Mini."
        },
        "preset-75": {
            "displayName": "Kanger K-Simar 20",
            "description": "Un profilo del dispositivo di svapo regolamentato per Kanger K-Simar 20.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Kanger K-Simar 20."
        },
        "preset-76": {
            "displayName": "Kangside e-Huge",
            "description": "Un profilo del dispositivo di svapo regolamentato per Kangside e-Huge.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Kangside e-Huge."
        },
        "preset-77": {
            "displayName": "Kamry 20",
            "description": "Un profilo del dispositivo di svapo regolamentato per Kamry 20.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Kamry 20."
        },
        "preset-78": {
            "displayName": "Kamry 60W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Kamry 60W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Kamry 60W."
        },
        "preset-79": {
            "displayName": "Kamry God Box",
            "description": "Un profilo del dispositivo di svapo regolamentato per Kamry God Box.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Kamry God Box."
        },
        "preset-80": {
            "displayName": "KangXin VF clone v3",
            "description": "Un profilo del dispositivo di svapo regolamentato per KangXin VF clone v3.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per KangXin VF clone v3."
        },
        "preset-81": {
            "displayName": "KangXin KX5-50W",
            "description": "Un profilo del dispositivo di svapo regolamentato per KangXin KX5-50W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per KangXin KX5-50W."
        },
        "preset-82": {
            "displayName": "Koopor Mini KP60",
            "description": "Un profilo del dispositivo di svapo regolamentato per Koopor Mini KP60.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Koopor Mini KP60."
        },
        "preset-83": {
            "displayName": "Koopor Mini KP60 (TC)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Koopor Mini KP60 (TC).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Koopor Mini KP60 (TC)."
        },
        "preset-84": {
            "displayName": "KSD 30",
            "description": "Un profilo del dispositivo di svapo regolamentato per KSD 30.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per KSD 30."
        },
        "preset-85": {
            "displayName": "KSD Kmax (single battery)",
            "description": "Un profilo del dispositivo di svapo regolamentato per KSD Kmax (single battery).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per KSD Kmax (single battery)."
        },
        "preset-86": {
            "displayName": "KSD Kmax (stacked)",
            "description": "Un profilo del dispositivo di svapo regolamentato per KSD Kmax (stacked).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per KSD Kmax (stacked)."
        },
        "preset-87": {
            "displayName": "L-Rider Lambo 6.0",
            "description": "Un profilo del dispositivo di svapo regolamentato per L-Rider Lambo 6.0.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per L-Rider Lambo 6.0."
        },
        "preset-88": {
            "displayName": "L-Rider Lavatube",
            "description": "Un profilo del dispositivo di svapo regolamentato per L-Rider Lavatube.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per L-Rider Lavatube."
        },
        "preset-89": {
            "displayName": "Lotus Jellyfish",
            "description": "Un profilo del dispositivo di svapo regolamentato per Lotus Jellyfish.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Lotus Jellyfish."
        },
        "preset-90": {
            "displayName": "Lotus LE80",
            "description": "Un profilo del dispositivo di svapo regolamentato per Lotus LE80.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Lotus LE80."
        },
        "preset-91": {
            "displayName": "Luxyoun Smaug",
            "description": "Un profilo del dispositivo di svapo regolamentato per Luxyoun Smaug.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Luxyoun Smaug."
        },
        "preset-92": {
            "displayName": "Majesty 150W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Majesty 150W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Majesty 150W."
        },
        "preset-93": {
            "displayName": "Megatron 260",
            "description": "Un profilo del dispositivo di svapo regolamentato per Megatron 260.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Megatron 260."
        },
        "preset-94": {
            "displayName": "Naos Raptor 10A",
            "description": "Un profilo del dispositivo di svapo regolamentato per Naos Raptor 10A.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Naos Raptor 10A."
        },
        "preset-95": {
            "displayName": "Naos Raptor 20A",
            "description": "Un profilo del dispositivo di svapo regolamentato per Naos Raptor 20A.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Naos Raptor 20A."
        },
        "preset-96": {
            "displayName": "Nivel V3",
            "description": "Un profilo del dispositivo di svapo regolamentato per Nivel V3.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Nivel V3."
        },
        "preset-97": {
            "displayName": "Notcigs VV",
            "description": "Un profilo del dispositivo di svapo regolamentato per Notcigs VV.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Notcigs VV."
        },
        "preset-98": {
            "displayName": "OKL2-T/20-W12",
            "description": "Un profilo del dispositivo di svapo regolamentato per OKL2-T/20-W12.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per OKL2-T/20-W12."
        },
        "preset-99": {
            "displayName": "OKR-T10",
            "description": "Un profilo del dispositivo di svapo regolamentato per OKR-T10.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per OKR-T10."
        },
        "preset-100": {
            "displayName": "Pioneer4You/Green Leaf P-Max",
            "description": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf P-Max.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf P-Max."
        },
        "preset-101": {
            "displayName": "ProVari 2, ProVari 2.5",
            "description": "Un profilo del dispositivo di svapo regolamentato per ProVari 2, ProVari 2.5.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per ProVari 2, ProVari 2.5."
        },
        "preset-102": {
            "displayName": "ProVari P3 beta",
            "description": "Un profilo del dispositivo di svapo regolamentato per ProVari P3 beta.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per ProVari P3 beta."
        },
        "preset-103": {
            "displayName": "ProVari P35",
            "description": "Un profilo del dispositivo di svapo regolamentato per ProVari P35.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per ProVari P35."
        },
        "preset-104": {
            "displayName": "Psmoke GI2",
            "description": "Un profilo del dispositivo di svapo regolamentato per Psmoke GI2.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Psmoke GI2."
        },
        "preset-105": {
            "displayName": "RainbowHeaven Arrow",
            "description": "Un profilo del dispositivo di svapo regolamentato per RainbowHeaven Arrow.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per RainbowHeaven Arrow."
        },
        "preset-106": {
            "displayName": "Robbot Tech ZNA50",
            "description": "Un profilo del dispositivo di svapo regolamentato per Robbot Tech ZNA50.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Robbot Tech ZNA50."
        },
        "preset-107": {
            "displayName": "Sigelei 20W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sigelei 20W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sigelei 20W."
        },
        "preset-108": {
            "displayName": "Sigelei 50W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sigelei 50W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sigelei 50W."
        },
        "preset-109": {
            "displayName": "Sigelei 75W TC",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sigelei 75W TC.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sigelei 75W TC."
        },
        "preset-110": {
            "displayName": "Sigelei 150W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sigelei 150W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sigelei 150W."
        },
        "preset-111": {
            "displayName": "Sigelei Fuchai 213 Plus",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sigelei Fuchai 213 Plus.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sigelei Fuchai 213 Plus."
        },
        "preset-112": {
            "displayName": "Sigelei Kick",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sigelei Kick.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sigelei Kick."
        },
        "preset-113": {
            "displayName": "Sigelei Legend v2",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sigelei Legend v2.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sigelei Legend v2."
        },
        "preset-114": {
            "displayName": "Sigelei Vmax",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sigelei Vmax.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sigelei Vmax."
        },
        "preset-115": {
            "displayName": "Sigelei Zmax V3",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sigelei Zmax V3.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sigelei Zmax V3."
        },
        "preset-116": {
            "displayName": "Sigelei Zmax V5",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sigelei Zmax V5.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sigelei Zmax V5."
        },
        "preset-117": {
            "displayName": "Simeiyue God 180",
            "description": "Un profilo del dispositivo di svapo regolamentato per Simeiyue God 180.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Simeiyue God 180."
        },
        "preset-118": {
            "displayName": "Simeiyue God 180s",
            "description": "Un profilo del dispositivo di svapo regolamentato per Simeiyue God 180s.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Simeiyue God 180s."
        },
        "preset-119": {
            "displayName": "Simeiyue God 260",
            "description": "Un profilo del dispositivo di svapo regolamentato per Simeiyue God 260.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Simeiyue God 260."
        },
        "preset-120": {
            "displayName": "Smok Ace",
            "description": "Un profilo del dispositivo di svapo regolamentato per Smok Ace.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Smok Ace."
        },
        "preset-121": {
            "displayName": "Smok BEC Pro",
            "description": "Un profilo del dispositivo di svapo regolamentato per Smok BEC Pro.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Smok BEC Pro."
        },
        "preset-122": {
            "displayName": "Smok G-Priv 220W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Smok G-Priv 220W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Smok G-Priv 220W."
        },
        "preset-123": {
            "displayName": "Smok Sid",
            "description": "Un profilo del dispositivo di svapo regolamentato per Smok Sid.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Smok Sid."
        },
        "preset-124": {
            "displayName": "Smok X Cube II",
            "description": "Un profilo del dispositivo di svapo regolamentato per Smok X Cube II.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Smok X Cube II."
        },
        "preset-125": {
            "displayName": "Smok X Pro BT50",
            "description": "Un profilo del dispositivo di svapo regolamentato per Smok X Pro BT50.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Smok X Pro BT50."
        },
        "preset-126": {
            "displayName": "Smok X Pro M36",
            "description": "Un profilo del dispositivo di svapo regolamentato per Smok X Pro M36.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Smok X Pro M36."
        },
        "preset-127": {
            "displayName": "Smok X Pro M50",
            "description": "Un profilo del dispositivo di svapo regolamentato per Smok X Pro M50.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Smok X Pro M50."
        },
        "preset-128": {
            "displayName": "Smok X Pro M80",
            "description": "Un profilo del dispositivo di svapo regolamentato per Smok X Pro M80.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Smok X Pro M80."
        },
        "preset-129": {
            "displayName": "Smok Zmax",
            "description": "Un profilo del dispositivo di svapo regolamentato per Smok Zmax.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Smok Zmax."
        },
        "preset-130": {
            "displayName": "Smok Zmax Mini",
            "description": "Un profilo del dispositivo di svapo regolamentato per Smok Zmax Mini.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Smok Zmax Mini."
        },
        "preset-131": {
            "displayName": "SMY 260W",
            "description": "Un profilo del dispositivo di svapo regolamentato per SMY 260W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per SMY 260W."
        },
        "preset-132": {
            "displayName": "SMY 50TC",
            "description": "Un profilo del dispositivo di svapo regolamentato per SMY 50TC.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per SMY 50TC."
        },
        "preset-133": {
            "displayName": "SMY GOD 180",
            "description": "Un profilo del dispositivo di svapo regolamentato per SMY GOD 180.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per SMY GOD 180."
        },
        "preset-134": {
            "displayName": "Steam STM-1 / STM-2",
            "description": "Un profilo del dispositivo di svapo regolamentato per Steam STM-1 / STM-2.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Steam STM-1 / STM-2."
        },
        "preset-135": {
            "displayName": "Sunzip Vapmod Deezel",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sunzip Vapmod Deezel.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sunzip Vapmod Deezel."
        },
        "preset-136": {
            "displayName": "Taifun The Eye",
            "description": "Un profilo del dispositivo di svapo regolamentato per Taifun The Eye.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Taifun The Eye."
        },
        "preset-137": {
            "displayName": "Taifun The Eye (updated)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Taifun The Eye (updated).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Taifun The Eye (updated)."
        },
        "preset-138": {
            "displayName": "Tesla",
            "description": "Un profilo del dispositivo di svapo regolamentato per Tesla.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Tesla."
        },
        "preset-139": {
            "displayName": "Tesla 120W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Tesla 120W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Tesla 120W."
        },
        "preset-140": {
            "displayName": "Tesla 2 Sub Mod",
            "description": "Un profilo del dispositivo di svapo regolamentato per Tesla 2 Sub Mod.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Tesla 2 Sub Mod."
        },
        "preset-141": {
            "displayName": "Tesla Spider",
            "description": "Un profilo del dispositivo di svapo regolamentato per Tesla Spider.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Tesla Spider."
        },
        "preset-142": {
            "displayName": "Tobeco ZNA 36",
            "description": "Un profilo del dispositivo di svapo regolamentato per Tobeco ZNA 36.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Tobeco ZNA 36."
        },
        "preset-143": {
            "displayName": "Vamo 35W (clone)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Vamo 35W (clone).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Vamo 35W (clone)."
        },
        "preset-144": {
            "displayName": "Vamo V1 / V2 / V3 / V5",
            "description": "Un profilo del dispositivo di svapo regolamentato per Vamo V1 / V2 / V3 / V5.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Vamo V1 / V2 / V3 / V5."
        },
        "preset-145": {
            "displayName": "Vamo V7",
            "description": "Un profilo del dispositivo di svapo regolamentato per Vamo V7.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Vamo V7."
        },
        "preset-146": {
            "displayName": "VaporFi Vox II",
            "description": "Un profilo del dispositivo di svapo regolamentato per VaporFi Vox II.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per VaporFi Vox II."
        },
        "preset-147": {
            "displayName": "Vicious Ant VariAnt 120W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Vicious Ant VariAnt 120W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Vicious Ant VariAnt 120W."
        },
        "preset-148": {
            "displayName": "Vicious Ant VariAnt 250W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Vicious Ant VariAnt 250W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Vicious Ant VariAnt 250W."
        },
        "preset-149": {
            "displayName": "Vision Spinner / Spinner II",
            "description": "Un profilo del dispositivo di svapo regolamentato per Vision Spinner / Spinner II.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Vision Spinner / Spinner II."
        },
        "preset-150": {
            "displayName": "Vision X.Fir/X.Gun",
            "description": "Un profilo del dispositivo di svapo regolamentato per Vision X.Fir/X.Gun.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Vision X.Fir/X.Gun."
        },
        "preset-151": {
            "displayName": "Volcano Lavatube",
            "description": "Un profilo del dispositivo di svapo regolamentato per Volcano Lavatube.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Volcano Lavatube."
        },
        "preset-152": {
            "displayName": "Volcano Lavatube v2.5",
            "description": "Un profilo del dispositivo di svapo regolamentato per Volcano Lavatube v2.5.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Volcano Lavatube v2.5."
        },
        "preset-153": {
            "displayName": "Wismec Reuleaux RX200S (4.10)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Wismec Reuleaux RX200S (4.10).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Wismec Reuleaux RX200S (4.10)."
        },
        "preset-154": {
            "displayName": "YiHi SX130",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX130.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX130."
        },
        "preset-155": {
            "displayName": "YiHi SX130 v1.5",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX130 v1.5.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX130 v1.5."
        },
        "preset-156": {
            "displayName": "YiHi SX130H",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX130H.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX130H."
        },
        "preset-157": {
            "displayName": "YiHi SX220",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX220.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX220."
        },
        "preset-158": {
            "displayName": "YiHi SX300",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX300.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX300."
        },
        "preset-159": {
            "displayName": "YiHi SX330 V1 35W",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V1 35W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V1 35W."
        },
        "preset-160": {
            "displayName": "YiHi SX330 V2 50W",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V2 50W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V2 50W."
        },
        "preset-161": {
            "displayName": "YiHi SX330 V2C 70W",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V2C 70W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V2C 70W."
        },
        "preset-162": {
            "displayName": "YiHi SX330 V2 S 60W",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V2 S 60W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V2 S 60W."
        },
        "preset-163": {
            "displayName": "YiHi SX330 V3 100W",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V3 100W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V3 100W."
        },
        "preset-164": {
            "displayName": "YiHi SX330 V3 150W",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V3 150W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V3 150W."
        },
        "preset-165": {
            "displayName": "YiHi SX330 V3S 150W",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V3S 150W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V3S 150W."
        },
        "preset-166": {
            "displayName": "YiHi SX330-V3Si 200W",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330-V3Si 200W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330-V3Si 200W."
        },
        "preset-167": {
            "displayName": "YiHi SX330 V4S 100W",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V4S 100W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX330 V4S 100W."
        },
        "preset-168": {
            "displayName": "YiHi SX350 30W",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX350 30W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX350 30W."
        },
        "preset-169": {
            "displayName": "YiHi SX350 50W",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX350 50W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX350 50W."
        },
        "preset-170": {
            "displayName": "YiHi SX350 100W",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX350 100W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX350 100W."
        },
        "preset-171": {
            "displayName": "YiHi SX350J VJ mode",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX350J VJ mode.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX350J VJ mode."
        },
        "preset-172": {
            "displayName": "YiHi SX350J VW/single batt mode",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX350J VW/single batt mode.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX350J VW/single batt mode."
        },
        "preset-173": {
            "displayName": "YiHi SX350J VW/dual batt mode",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX350J VW/dual batt mode.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX350J VW/dual batt mode."
        },
        "preset-174": {
            "displayName": "YiHi SX470",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX470.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX470."
        },
        "preset-175": {
            "displayName": "YiHi SX450",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX450.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX450."
        },
        "preset-176": {
            "displayName": "YiHi SXMini",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SXMini.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SXMini."
        },
        "preset-177": {
            "displayName": "Beyond Vape Solara",
            "description": "Un profilo del dispositivo di svapo regolamentato per Beyond Vape Solara.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Beyond Vape Solara."
        },
        "preset-178": {
            "displayName": "Cana Modz",
            "description": "Un profilo del dispositivo di svapo regolamentato per Cana Modz.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Cana Modz."
        },
        "preset-179": {
            "displayName": "Craving Vapor HexOhm",
            "description": "Un profilo del dispositivo di svapo regolamentato per Craving Vapor HexOhm.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Craving Vapor HexOhm."
        },
        "preset-180": {
            "displayName": "Craving Vapor HexOhm V2",
            "description": "Un profilo del dispositivo di svapo regolamentato per Craving Vapor HexOhm V2.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Craving Vapor HexOhm V2."
        },
        "preset-181": {
            "displayName": "Hana Modz V3",
            "description": "Un profilo del dispositivo di svapo regolamentato per Hana Modz V3.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Hana Modz V3."
        },
        "preset-182": {
            "displayName": "Hana Modz DNA 40",
            "description": "Un profilo del dispositivo di svapo regolamentato per Hana Modz DNA 40.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Hana Modz DNA 40."
        },
        "preset-183": {
            "displayName": "Lost Vape Therion DNA 75",
            "description": "Un profilo del dispositivo di svapo regolamentato per Lost Vape Therion DNA 75.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Lost Vape Therion DNA 75."
        },
        "preset-184": {
            "displayName": "Lost Vape Therion DNA 133",
            "description": "Un profilo del dispositivo di svapo regolamentato per Lost Vape Therion DNA 133.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Lost Vape Therion DNA 133."
        },
        "preset-185": {
            "displayName": "Lost Vape Therion DNA 166",
            "description": "Un profilo del dispositivo di svapo regolamentato per Lost Vape Therion DNA 166.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Lost Vape Therion DNA 166."
        },
        "preset-186": {
            "displayName": "Notcigs Buzz Pro",
            "description": "Un profilo del dispositivo di svapo regolamentato per Notcigs Buzz Pro.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Notcigs Buzz Pro."
        },
        "preset-187": {
            "displayName": "Pioneer4You/Green Leaf Seven 22",
            "description": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf Seven 22.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf Seven 22."
        },
        "preset-188": {
            "displayName": "Pioneer4You/Green Leaf Seven 30W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf Seven 30W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf Seven 30W."
        },
        "preset-189": {
            "displayName": "Pioneer4You/Green Leaf IPV",
            "description": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV."
        },
        "preset-190": {
            "displayName": "Pioneer4You/Green Leaf IPV D2",
            "description": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV D2.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV D2."
        },
        "preset-191": {
            "displayName": "Pioneer4You/Green Leaf IPV Mini",
            "description": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV Mini.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV Mini."
        },
        "preset-192": {
            "displayName": "Pioneer4You/Green Leaf IPV Mini 2",
            "description": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV Mini 2.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV Mini 2."
        },
        "preset-193": {
            "displayName": "Pioneer4You/Green Leaf IPV V2",
            "description": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV V2.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV V2."
        },
        "preset-194": {
            "displayName": "Pioneer4You/Green Leaf IPV V2S",
            "description": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV V2S.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV V2S."
        },
        "preset-195": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 100W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV V3 100W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV V3 100W."
        },
        "preset-196": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 150W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV V3 150W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV V3 150W."
        },
        "preset-197": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 200W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV V3 200W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV V3 200W."
        },
        "preset-198": {
            "displayName": "Pioneer4You/Green Leaf IPV V4 100W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV V4 100W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Pioneer4You/Green Leaf IPV V4 100W."
        },
        "preset-199": {
            "displayName": "Protovapor XPV DNA-20D",
            "description": "Un profilo del dispositivo di svapo regolamentato per Protovapor XPV DNA-20D.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Protovapor XPV DNA-20D."
        },
        "preset-200": {
            "displayName": "Protovapor XPV DNA-30D",
            "description": "Un profilo del dispositivo di svapo regolamentato per Protovapor XPV DNA-30D.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Protovapor XPV DNA-30D."
        },
        "preset-201": {
            "displayName": "Protovapor XPV DNA-40D",
            "description": "Un profilo del dispositivo di svapo regolamentato per Protovapor XPV DNA-40D.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Protovapor XPV DNA-40D."
        },
        "preset-202": {
            "displayName": "Raffmods Ranger",
            "description": "Un profilo del dispositivo di svapo regolamentato per Raffmods Ranger.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Raffmods Ranger."
        },
        "preset-203": {
            "displayName": "Reo VV Grand/Woodvil",
            "description": "Un profilo del dispositivo di svapo regolamentato per Reo VV Grand/Woodvil.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Reo VV Grand/Woodvil."
        },
        "preset-204": {
            "displayName": "Sigelei 30W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sigelei 30W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sigelei 30W."
        },
        "preset-205": {
            "displayName": "Sigelei Raptor",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sigelei Raptor.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sigelei Raptor."
        },
        "preset-206": {
            "displayName": "Sigelei 100W",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sigelei 100W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sigelei 100W."
        },
        "preset-207": {
            "displayName": "Sigelei Mini",
            "description": "Un profilo del dispositivo di svapo regolamentato per Sigelei Mini.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Sigelei Mini."
        },
        "preset-208": {
            "displayName": "SvoëMesto Semovar",
            "description": "Un profilo del dispositivo di svapo regolamentato per SvoëMesto Semovar.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per SvoëMesto Semovar."
        },
        "preset-209": {
            "displayName": "Vapor Flask v1/v2 DNA 30",
            "description": "Un profilo del dispositivo di svapo regolamentato per Vapor Flask v1/v2 DNA 30.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Vapor Flask v1/v2 DNA 30."
        },
        "preset-210": {
            "displayName": "Vapor Flask v2 DNA 40",
            "description": "Un profilo del dispositivo di svapo regolamentato per Vapor Flask v2 DNA 40.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Vapor Flask v2 DNA 40."
        },
        "preset-211": {
            "displayName": "Vapor Shark DNA",
            "description": "Un profilo del dispositivo di svapo regolamentato per Vapor Shark DNA.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Vapor Shark DNA."
        },
        "preset-212": {
            "displayName": "Vapor Shark DNA/rDNA 30",
            "description": "Un profilo del dispositivo di svapo regolamentato per Vapor Shark DNA/rDNA 30.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Vapor Shark DNA/rDNA 30."
        },
        "preset-213": {
            "displayName": "Vapor Shark rDNA 40",
            "description": "Un profilo del dispositivo di svapo regolamentato per Vapor Shark rDNA 40.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Vapor Shark rDNA 40."
        },
        "preset-214": {
            "displayName": "Geekvape Aegis Legend 5",
            "description": "Un profilo del dispositivo di svapo regolamentato per Geekvape Aegis Legend 5.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Geekvape Aegis Legend 5."
        },
        "preset-215": {
            "displayName": "Evolv DNA60C",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA60C.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA60C."
        },
        "preset-216": {
            "displayName": "Evolv DNA100C",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA100C.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA100C."
        },
        "preset-217": {
            "displayName": "Evolv DNA250C (2S)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA250C (2S).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA250C (2S)."
        },
        "preset-218": {
            "displayName": "Evolv DNA250C (3S, US firmware)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA250C (3S, US firmware).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA250C (3S, US firmware)."
        },
        "preset-219": {
            "displayName": "Evolv DNA250C (3S, international firmware)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA250C (3S, international firmware).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA250C (3S, international firmware)."
        },
        "preset-220": {
            "displayName": "Evolv DNA250C (4S)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA250C (4S).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA250C (4S)."
        },
        "preset-221": {
            "displayName": "VOOPOO DRAG 6",
            "description": "Un profilo del dispositivo di svapo regolamentato per VOOPOO DRAG 6.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per VOOPOO DRAG 6."
        },
        "preset-222": {
            "displayName": "YiHi SXmini MQ Class",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SXmini MQ Class.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SXmini MQ Class."
        },
        "preset-223": {
            "displayName": "Evolv DNA80C",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA80C.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA80C."
        },
        "preset-224": {
            "displayName": "Evolv DNA75C",
            "description": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA75C.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Evolv DNA75C."
        },
        "preset-225": {
            "displayName": "YiHi SX600H",
            "description": "Un profilo del dispositivo di svapo regolamentato per YiHi SX600H.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per YiHi SX600H."
        },
        "preset-226": {
            "displayName": "Craving Vapor HexOhm V3",
            "description": "Un profilo del dispositivo di svapo regolamentato per Craving Vapor HexOhm V3.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Craving Vapor HexOhm V3."
        },
        "preset-227": {
            "displayName": "VOOPOO VINCI Spark220",
            "description": "Un profilo del dispositivo di svapo regolamentato per VOOPOO VINCI Spark220.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per VOOPOO VINCI Spark220."
        },
        "preset-228": {
            "displayName": "Dovpo x TVC Topside Dual",
            "description": "Un profilo del dispositivo di svapo regolamentato per Dovpo x TVC Topside Dual.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Dovpo x TVC Topside Dual."
        },
        "preset-229": {
            "displayName": "VOOPOO DRAG 5",
            "description": "Un profilo del dispositivo di svapo regolamentato per VOOPOO DRAG 5.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per VOOPOO DRAG 5."
        },
        "preset-230": {
            "displayName": "Geekvape L200 Classic",
            "description": "Un profilo del dispositivo di svapo regolamentato per Geekvape L200 Classic.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Geekvape L200 Classic."
        },
        "preset-231": {
            "displayName": "VAPORESSO ARMOUR MAX",
            "description": "Mod regolato Dual-21700 con adattatori 18650; VAPORESSO lo valuta 220 W; i test hanno misurato 208 W, 8,979 V e 39 A.",
            "summary": "Mod regolato Dual-21700 con adattatori 18650; VAPORESSO lo valuta 220 W; i test hanno misurato 208 W, 8,979 V e 39 A."
        },
        "preset-232": {
            "displayName": "Geekvape Aegis Legend 2 (L200)",
            "description": "Un profilo del dispositivo di svapo regolamentato per Geekvape Aegis Legend 2 (L200).",
            "summary": "Un profilo del dispositivo di svapo regolamentato per Geekvape Aegis Legend 2 (L200)."
        },
        "preset-233": {
            "displayName": "ProVape ProVari Radius 40 W",
            "description": "Un profilo del dispositivo di svapo regolamentato per ProVape ProVari Radius 40 W.",
            "summary": "Un profilo del dispositivo di svapo regolamentato per ProVape ProVari Radius 40 W."
        },
        "preset-234": {
            "displayName": "VAPORESSO GEN MAX",
            "description": "Mod regolato Dual-18650; VAPORESSO lo valuta 220 W; i test hanno misurato 215 W, 9,08 V e 37 A.",
            "summary": "Mod regolato Dual-18650; VAPORESSO lo valuta 220 W; i test hanno misurato 215 W, 9,08 V e 37 A."
        },
        "preset-235": {
            "displayName": "VAPORESSO ARMOUR ULTRA",
            "description": "Mod regolato da batteria integrata con potenza nominale di 100 W; i test hanno misurato 101 W, 29 A e almeno 7,97 V.",
            "summary": "Mod regolato da batteria integrata con potenza nominale di 100 W; i test hanno misurato 101 W, 29 A e almeno 7,97 V."
        },
        "preset-236": {
            "displayName": "Geekvape Aegis Solo 3",
            "description": "Mod regolato single-18650 utilizzando AS Chip 4.0; il profilo del produttore è 100 W, 7,5 V, 32 A, 0,1–3 Ω.",
            "summary": "Mod regolato single-18650 utilizzando AS Chip 4.0; il profilo del produttore è 100 W, 7,5 V, 32 A, 0,1–3 Ω."
        },
        "preset-237": {
            "displayName": "Eleaf iStick Pico 21700",
            "description": "Modulo adattatore 21700/18650 a cella singola; Eleaf specifica 100 W, 9 V, 0,05–3,5 Ω; i test hanno identificato 30 A.",
            "summary": "Modulo adattatore 21700/18650 a cella singola; Eleaf specifica 100 W, 9 V, 0,05–3,5 Ω; i test hanno identificato 30 A."
        },
        "preset-238": {
            "displayName": "Vandy Vape Pulse V2",
            "description": "Mod squonk regolato a cella singola per celle 21700, 20700 o 18650 adattate con un profilo conservativo da 95 W, 6 V, 34 A.",
            "summary": "Mod squonk regolato a cella singola per celle 21700, 20700 o 18650 adattate con un profilo conservativo da 95 W, 6 V, 34 A."
        }
    }
};
