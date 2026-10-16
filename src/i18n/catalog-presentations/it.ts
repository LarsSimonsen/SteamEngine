/* Machine-materialized draft. Human review may edit string values. */

import type { CatalogPresentationSet } from "../catalog-presentations";
import { batteryPresentationsFor, type BatteryTextDictionary } from "../battery-presentation-text";
import { modPresentationsFor, type ModTextDictionary } from "../mod-presentation-text";
import { materialPresentationsFor, type MaterialTextDictionary } from "../material-presentation-text";

export const batteryTexts: BatteryTextDictionary = {
    "battery.summary.removable": "Cella ricaricabile rimovibile per dispositivi compatibili.",
    "battery.summary.integrated": "Batteria interna al dispositivo, non una cella sostituibile dall'utente.",
    "battery.note.approvedResearch": "Approvata il 2026-08-13; consultare la relativa scheda di ricerca.",
    "battery.note.capacityBelowLabel": "La capacità effettiva è inferiore a quanto suggerisce l'etichetta.",
    "battery.note.battery-71.evidence":
        "20 A di corrente continua; i valori a impulsi non vengono usati.",
    "battery.note.battery-77.evidence":
        "20 A, valore di confronto indipendente e conservativo; l'involucro "
        + "esatto e la revisione di produzione restano rilevanti.",
    "battery.note.battery-78.evidence":
        "15 A, valore conservativo ottenuto dai test del modello esatto; la "
        + "revisione testata con marchio CCC resta rilevante.",
    "battery.note.battery-79.evidence":
        "45 A, valore continuo indipendente per la revisione tabless testata; "
        + "non sostituire i valori a impulsi.",
    "battery.note.battery-80.evidence": "36 A, valore continuo effettivo; il dato di 56 A è limitato dalla temperatura.",
    "battery.note.battery-81.evidence":
        "40 A, valore conservativo; le celle testate sembravano di "
        + "pre-produzione e non avevano il logo CCC.",
    "battery.note.battery-82.evidence":
        "13 A, valore continuo consigliato; 16,8 A è un massimo assoluto "
        + "non destinato alla durata del ciclo.",
    "battery.note.battery-83.evidence":
        "40 A, valore conservativo; 70 A è limitato dalla temperatura e i "
        + "campioni testati erano di pre-produzione.",
    "battery.note.battery-84.evidence":
        "40 A, valore di confronto per una cella di produzione; 70 A "
        + "richiede il controllo della temperatura.",
    "battery.note.battery-85.evidence":
        "40 A, valore dell'involucro esatto; 70 A è limitato a 60 °C ed è "
        + "stato testato come rewrap EVE 40PL.",
    "battery.note.battery-86.evidence":
        "19 A, valore conservativo; i campioni esatti testati sembravano di "
        + "pre-produzione e non avevano i marchi CCC.",
    "battery.note.battery-87.evidence":
        "40 A, valore conservativo; 90 A è limitato dalla temperatura e le "
        + "celle testate sembravano di pre-produzione.",
    "battery.note.battery-88.evidence":
        "40 A, valore conservativo; 60 A è limitato dalla temperatura e la "
        + "continuità della produzione resta irrisolta.",
    "battery.note.battery-89.evidence":
        "40 A, valore conservativo; i campioni testati avevano una capacità "
        + "incoerente e non avevano i marchi CCC/CE.",
    "battery.note.battery-90.evidence":
        "13 A, valore conservativo; i campioni esatti testati sembravano di "
        + "pre-produzione e non avevano i marchi CCC.",
    "battery.note.battery-91.evidence":
        "30 A, valore continuo stimato dal tester; il massimo di 50 A di "
        + "Reliance è limitato dalla temperatura.",
    "battery.note.battery-92.evidence":
        "20 A, valore continuo ottenuto da due lotti testati collegati alla "
        + "produzione; 30 A è limitato dalla temperatura.",
    "battery.note.battery-93.evidence":
        "12 A continui; 20 A è solo a impulsi. L'involucro esatto testato è "
        + "registrato come SA110 / INR18650/40.",
    "battery.note.battery-94.evidence":
        "20 A, valore dell'involucro esatto; il tester consiglia meno di 15 A "
        + "continui. Vapehuset pubblicizza 25 A nel titolo e le successive "
        + "revisioni del rewrap o dell'involucro potrebbero differire.",
    "battery.note.battery-95.evidence":
        "30 A, valore del modello esatto; si tratta di un rewrap e le revisioni "
        + "successive dell'involucro o l'approvvigionamento sottostante potrebbero differire.",
    "battery.note.battery-96.evidence":
        "30 A, valore della revisione esatta a cinque linguette; le revisioni "
        + "a quattro linguette e quelle successive con lo stesso involucro sono "
        + "sostanzialmente diverse e non devono ereditare questo profilo.",
    "battery.safety.lowDrain": "Batteria a bassa capacità di scarica; non adatta allo svapo.",
};

export const materialTexts: MaterialTextDictionary = {
    "material.profile": (displayName) => "Profilo catalogo per " + displayName + ".",
    "material.safety.verifiedProfile": "Usa un profilo del materiale verificato e rispetta i limiti di "
                + "temperatura e di funzionamento del dispositivo.",
};
export const modTexts: ModTextDictionary = {
    "mod.profile.regulated": (displayName) => "Profilo per un dispositivo di svapo regolato o una scheda di controllo: "
        + displayName + ".",
    "mod.preset-9.profile":
        "Billet Box Rev. 3a con finitura in alluminio anodizzato "
        + "brillante e pallinato; introdotto nel maggio 2014.",
    "mod.preset-10.profile":
        "Un dispositivo Cloupor da 30 W che utilizza un chipset "
        + "clone in stile DNA30 di terze parti, non una scheda Evolv "
        + "DNA-30D autentica.",
    "mod.preset-231.profile":
        "Mod regolato Dual-21700 con adattatori 18650; VAPORESSO lo "
        + "valuta 220 W; i test hanno misurato 208 W, 8,979 V e 39 A.",
    "mod.preset-234.profile":
        "Mod regolato Dual-18650; VAPORESSO lo valuta 220 W; i test "
        + "hanno misurato 215 W, 9,08 V e 37 A.",
    "mod.preset-235.profile":
        "Mod regolato da batteria integrata con potenza nominale di "
        + "100 W; i test hanno misurato 101 W, 29 A e almeno 7,97 V.",
    "mod.preset-236.profile":
        "Mod regolato single-18650 utilizzando AS Chip 4.0; il "
        + "profilo del produttore è 100 W, 7,5 V, 32 A, 0,1–3 Ω.",
    "mod.preset-237.profile":
        "Modulo adattatore 21700/18650 a cella singola; Eleaf "
        + "specifica 100 W, 9 V, 0,05–3,5 Ω; i test hanno "
        + "identificato 30 A.",
    "mod.preset-238.profile":
        "Mod squonk regolato a cella singola per celle 21700, 20700 "
        + "o 18650 adattate con un profilo conservativo da 95 W, 6 V, "
        + "34 A.",
};

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
    materials: materialPresentationsFor(materialTexts),
    batteries: batteryPresentationsFor(batteryTexts),
    mods: modPresentationsFor(modTexts)
};
