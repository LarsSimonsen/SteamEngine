import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./it";

type MutableExample = {
    title?: string;
    setup?: string;
    conclusion?: string;
    formulas?: string[];
};

type MutableSection = {
    id: string;
    title?: string;
    paragraphs?: string[];
    bullets?: string[];
    formulas?: Array<{ expression: string }>;
    examples?: MutableExample[];
    table?: {
        headers: string[];
        rows: string[][];
    };
};

type MutableConcept = {
    displayName?: string;
    description?: string;
    summary?: string;
    sections: MutableSection[];
};

type MutablePresentationSet = {
    concepts: Record<string, MutableConcept>;
};

const corrected = JSON.parse(JSON.stringify(draftPresentations)) as MutablePresentationSet;

const getSection = (conceptId: string, sectionId: string): MutableSection => {
    const section = corrected.concepts[conceptId].sections.find((candidate) => candidate.id === sectionId);
    if (!section) {
        throw new Error("Italian catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "relationship").formulas![0].expression = "V = I × R";
getSection("concept-ohms-law", "relationship").bullets![1] =
    "I è la corrente, misurata in ampere (A).";
getSection("concept-ohms-law", "rearranged-formulas").formulas![0].expression = "I = V / R";
getSection("concept-ohms-law", "worked-examples").examples![0].formulas![0] =
    "I = 4,2 V / 1,0 Ω = 4,2 A";
getSection("concept-ohms-law", "electrical-power").title = "Potenza elettrica";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "La legge di Ohm si combina con la relazione di potenza P = V × I. La potenza P si misura in watt (W). Per una "
    + "sorgente da 4,2 V e un carico da 1,0 Ω, la potenza ideale è 17,64 W. Il componente necessita di capacità "
    + "termica sufficiente e di un margine di sicurezza per dissipare il calore prodotto.";

corrected.concepts["concept-joule-heating"].summary =
    "Come la corrente elettrica trasforma l'energia elettrica in calore.";
getSection("concept-joule-heating", "worked-example").title = "Esempio risolto";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![0] =
    "P = I^2 × R = 3^2 × 0,8 = 7,2 W";

getSection("concept-kirchhoffs-laws", "current-law").title = "La legge della corrente di Kirchhoff";
getSection("concept-kirchhoffs-laws", "current-law").formulas![0].expression = "Σ I = 0";
const series = getSection("concept-kirchhoffs-laws", "series-and-parallel");
series.formulas![0].expression = "I_total = I_1 = I_2 = ...";
series.formulas![1].expression = "R_total = R_1 + R_2 + ...";
series.formulas![2].expression = "I_total = I_1 + I_2 + ...";
series.formulas![3].expression = "1 / R_total = 1 / R_1 + 1 / R_2 + ...";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (serie)";

getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").formulas![0].expression =
    "I = V / R";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].title =
    "Una resistenza riscaldata";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].conclusion =
    "La resistenza stimata è 1,032 Ω, circa il 3,2% superiore al valore a 20 °C.";

getSection("concept-trigonometry", "waveforms-and-identities").formulas![2].expression =
    "sin^2(θ) + cos^2(θ) = 1";
getSection("concept-heat-capacity", "basic-relationships").formulas![0].expression = "C = Q / ΔT";
getSection("concept-heat-capacity", "worked-example").title = "Esempio risolto";
getSection("concept-heat-capacity", "object-and-material").formulas![0].expression =
    "C_total = Σ m_i × c_i";
getSection("concept-heat-capacity", "phase-changes-and-limits").formulas![0].expression = "Q = m × L";

getSection("concept-heat-flux", "definition").formulas![0].expression = "q'' = Q_dot / A";
getSection("concept-heat-flux", "conduction").formulas![1].expression =
    "Q_dot = k × A × (T_hot - T_cold) / L";
getSection("concept-heat-flux", "worked-example").title = "Esempio risolto";
getSection("concept-heat-flux", "practical-checks").bullets![0] =
    "Converti l'area in m² prima di utilizzare W/m².";

getSection("concept-joule-heating", "worked-example").examples![0].formulas![0] =
    "P = I^2 × R = 3^2 × 0,8 = 7,2 W";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "La bobina converte l'energia in calore con una potenza di 7,2 W, cioè 72 J in 10 secondi.";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "Il trasferimento di calore all'aria, al liquido e alle apparecchiature determina la temperatura effettiva.";

getSection("concept-kirchhoffs-laws", "current-law").title = "Legge della corrente di Kirchhoff";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Se 8 A entrano in un nodo e un ramo porta via 3 A, i rami rimanenti devono portare via complessivamente 5 A. "
    + "Scegli le direzioni delle correnti prima di risolvere; un risultato negativo significa che la corrente reale "
    + "scorre in direzione opposta a quella assunta.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![0].expression = "Σ V = 0";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (rami paralleli)";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "Le celle in serie sommano la tensione, mentre la capacità in ampere-ora resta quella di una singola cella.";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "Le celle in parallelo mantengono la stessa tensione, mentre capacità e corrente disponibile si sommano circa.";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = opposite / hypotenuse";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = adjacent / hypotenuse";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = opposite / adjacent";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(opposite / hypotenuse)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(adjacent / hypotenuse)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(opposite / adjacent)";
getSection("concept-trigonometry", "degrees-and-radians").formulas![1].expression =
    "θ_rad = θ_deg × π / 180";

getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "Il tempo ideale è di circa 7,0 minuti; con un'efficienza di trasferimento dell'80% è di circa 523 s.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![1] =
    "La semplice equazione presuppone che la capacità termica specifica sia approssimativamente costante. La perdita "
    + "di calore, la convezione, l'irraggiamento, l'evaporazione, la resistenza di contatto e la temperatura non uniforme "
    + "possono far sì che il risultato reale differisca dall'ideale.";

corrected.concepts["concept-heat-flux"].displayName = "Densità di flusso termico";
corrected.concepts["concept-heat-flux"].description =
    "La densità di flusso termico descrive la velocità con cui il calore attraversa ogni unità di superficie, "
    + "indipendentemente dalla quantità totale di materiale che immagazzina calore.";
corrected.concepts["concept-heat-flux"].summary = "La velocità di trasferimento del calore per unità di superficie.";
getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' è la densità di flusso termico in W/m².";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "La densità media di flusso termico è 5.000 W/m², ovvero 0,5 W/cm².";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "La convezione utilizza il coefficiente di convezione h. La radiazione utilizza l'emissività ε e la costante di "
    + "Stefan–Boltzmann σ; le temperature nell'equazione della radiazione devono essere temperature assolute in Kelvin.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![3] =
    "Per i conduttori a trefolo, includi la costruzione dei trefoli quando flessibilità e diametro complessivo sono importanti.";

getSection("concept-ohms-law", "rearranged-formulas").formulas![1].expression = "R = V / I";
getSection("concept-joule-heating", "heating-power").bullets![2] =
    "I è la corrente, misurata in ampere (A).";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Verifica che componenti, collegamenti e isolamento possano gestire la corrente e la potenza previste. Mantieni "
    + "un margine adeguato, perché i componenti reali possono riscaldarsi in modo non uniforme e la resistenza può "
    + "cambiare con la temperatura. Anche batterie e alimentatori hanno limiti di corrente continua.";

getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![1] =
    "Un ramo è un percorso per la corrente tra due nodi.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![2] =
    "Un percorso chiuso ritorna al punto di partenza.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].conclusion =
    "Gli stessi 20 A passano attraverso entrambe le resistenze.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].conclusion =
    "Con resistenze di ramo uguali, ogni ramo conduce 10 A.";
getSection("concept-kirchhoffs-laws", "voltage-law").title = "Legge della tensione di Kirchhoff";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "La somma algebrica degli aumenti e delle cadute di tensione lungo un percorso chiuso è zero. Scegli un verso "
    + "di percorrenza e mantieni coerenti le polarità. Invertire il verso cambia i segni, non la soluzione fisica. Una "
    + "resistenza in serie più grande ha una caduta di tensione maggiore perché la stessa corrente attraversa ogni "
    + "componente in serie.";
getSection("concept-kirchhoffs-laws", "cells").bullets![2] =
    "La ripartizione della corrente dipende dalla resistenza interna, dai contatti, dal cablaggio e dagli interruttori.";
getSection("concept-kirchhoffs-laws", "cells").bullets![3] =
    "La ricarica di celle agli ioni di litio in serie richiede il monitoraggio di ogni cella e un bilanciamento o una "
    + "protezione adeguati.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![0] =
    "Segna le tensioni dei nodi, le correnti dei rami e i versi di corrente presunti.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![1] =
    "Applica KCL ai nodi indipendenti e KVL lungo i percorsi chiusi indipendenti.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").paragraphs![0] =
    "Un modello semplificato può omettere la resistenza interna della cella, la resistenza di contatto, l'efficienza "
    + "del convertitore, gli effetti della temperatura, il comportamento transitorio, i circuiti di protezione e le "
    + "tolleranze dei componenti. Includi ogni comportamento omesso che influisce materialmente su un circuito ad alta "
    + "corrente.";

corrected.concepts["concept-temperature-coefficient-of-resistance"].displayName =
    "Coefficiente di temperatura della resistenza (TCR)";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "Per una resistenza con TCR positivo alimentata a tensione costante, l'aumento della temperatura aumenta la "
    + "resistenza e tende a ridurre la corrente. Con una sorgente di corrente costante, lo stesso aumento di resistenza "
    + "aumenta la potenza.";
getSection("concept-trigonometry", "finding-sides-and-angles").title = "Trovare lati e angoli";
getSection("concept-heat-capacity", "electrical-heating").examples![0].setup =
    "Riscalda un campione che richiede 41,8 kJ con una sorgente costante da 100 W e senza perdite.";
getSection("concept-heat-capacity", "phase-changes-and-limits").title = "Cambiamenti di fase e limiti pratici";

const baseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
baseUnits.rows[0] = ["Lunghezza", "metro", "m"];
baseUnits.rows[2] = ["Tempo", "secondo", "s"];
baseUnits.rows[4] = ["Corrente elettrica", "ampere", "A"];
baseUnits.rows[5] = ["Quantità di sostanza", "mole", "mol"];
baseUnits.rows[6] = ["Intensità luminosa", "candela", "cd"];
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[2] =
    ["milli", "m", "0,001 = 10^-3"];

getSection("concept-ohms-law", "rearranged-formulas").paragraphs![0] =
    "Usa la versione che mette a sinistra il valore che vuoi trovare:";
getSection("concept-ohms-law", "worked-examples").title = "Esempi svolti";

corrected.concepts["concept-joule-heating"].description =
    "Il riscaldamento per effetto Joule descrive come l'energia elettrica si converte in calore quando una corrente "
    + "attraversa un resistore.";
getSection("concept-joule-heating", "heating-power").paragraphs![0] =
    "La potenza di riscaldamento elettrico è:";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "La potenza elettrica è la velocità di trasferimento dell'energia, non una temperatura. La capacità termica e il "
    + "flusso di calore determinano come questa energia modifica la temperatura e con quale rapidità lascia la superficie.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Le leggi della corrente e della tensione di Kirchhoff descrivono la conservazione della carica nei nodi e "
    + "dell'energia lungo le maglie chiuse.";
corrected.concepts["concept-kirchhoffs-laws"].summary =
    "Il comportamento della corrente e della tensione nei circuiti collegati.";
getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "I termini di base facilitano l'analisi di uno schema elettrico:";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![1] =
    "Un ramo è un percorso per la corrente tra due nodi.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![2] =
    "Un percorso chiuso ritorna al punto di partenza.";

getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].setup =
    "Una resistenza da 1,00 Ω è specificata a 20 °C, con un TCR di 400 ppm/°C.";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![3] =
    "Usa la stessa scala e le stesse unità di temperatura per la differenza T - T_0.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "Il TCR del produttore si applica normalmente a un intervallo specificato di temperatura e resistenza. Gradienti "
    + "termici, modifiche del materiale, contatti, sollecitazioni meccaniche e autoriscaldamento possono far differire "
    + "il risultato reale dalla stima del primo ordine.";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "Rispetto a un angolo θ, il cateto opposto è di fronte all'angolo, il cateto adiacente lo tocca senza essere "
    + "l'ipotenusa e l'ipotenusa è opposta all'angolo retto. SOH-CAH-TOA è un aiuto mnemonico: seno = opposto/"
    + "ipotenusa, coseno = adiacente/ipotenusa e tangente = opposto/adiacente.";
getSection("concept-trigonometry", "degrees-and-radians").formulas![1].expression =
    "θ_rad = θ_deg × π / 180";

getSection("concept-heat-capacity", "object-and-material").title = "Oggetto e materiale";
getSection("concept-heat-capacity", "object-and-material").paragraphs![0] =
    "La capacità termica appartiene all'intero oggetto e dipende dalla quantità di materiale presente. La capacità "
    + "termica specifica è una proprietà del materiale. Raddoppiando la massa raddoppia la capacità termica dello stesso "
    + "materiale.";
getSection("concept-heat-flux", "definition").bullets![1] =
    "Q_dot è la velocità totale di trasferimento del calore, misurata in watt (W).";

getSection("concept-si-system-and-imperial-units", "base-units").title = "Unità di base SI";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[3][1] = "kelvin";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[4][1] = "n";

getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![0].expression =
    "d_inch = 0,005 × 92^((36 - n) / 39)";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![1] =
    "Includi il diametro nominale in millimetri quando i sistemi potrebbero essere confusi.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![2] =
    "Indica se la dimensione è quella del conduttore nudo, del diametro isolato, dello spessore della lamiera o della "
    + "parete del tubo.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Determina la portata di corrente dai dati del prodotto e dalle norme elettriche, non solo dal numero del calibro.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Le leggi di Kirchhoff della corrente e della tensione descrivono la conservazione della carica nei nodi e " +
    "dell'energia nelle maglie chiuse.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8,0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Il coefficiente di temperatura della resistenza descrive come cambia la resistenza di un componente al variare " +
    "della temperatura.";
corrected.concepts["concept-heat-flux"].displayName = "Densità del flusso termico";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Determina la portata di corrente in base ai dati del prodotto e alle norme elettriche, non solo al numero del " +
    "calibro.";

getSection("concept-joule-heating", "worked-example").examples![0].formulas![0] =
    "P = I^2 × R = 3^2 × 0,8 = 7,2 W";
getSection("concept-kirchhoffs-laws", "current-law").title = "Legge di corrente di Kirchhoff";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = cateto opposto / ipotenusa";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = cateto adiacente / ipotenusa";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = cateto opposto / cateto adiacente";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(cateto opposto / ipotenusa)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(cateto adiacente / ipotenusa)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(cateto opposto / cateto adiacente)";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "cateto opposto = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "cateto adiacente = 10 × cos(30°) ≈ 8,66 cm";

export const presentations = corrected as unknown as CatalogPresentationSet;
