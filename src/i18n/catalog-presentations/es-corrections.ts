import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./es";

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
    table?: { headers: string[]; rows: string[][] };
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
        throw new Error("Spanish catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

corrected.concepts["concept-ohms-law"].displayName = "Ley de Ohm";
getSection("concept-ohms-law", "relationship").title = "La relación";
getSection("concept-ohms-law", "relationship").bullets![1] =
    "I es la corriente, medida en amperios (A).";
getSection("concept-ohms-law", "worked-examples").examples![1].title = "Encontrar la resistencia";
getSection("concept-ohms-law", "worked-examples").examples![2].title = "Encontrar el voltaje";
getSection("concept-ohms-law", "electrical-power").title = "Potencia eléctrica";
getSection("concept-ohms-law", "unit-conversions").bullets![0] = "1 kΩ = 1.000 Ω";
getSection("concept-ohms-law", "unit-conversions").bullets![1] = "1 MΩ = 1.000.000 Ω";
getSection("concept-ohms-law", "unit-conversions").bullets![3] = "1 W = 1.000 mW";
getSection("concept-ohms-law", "unit-conversions").bullets![2] = "1 mA = 0,001 A";

corrected.concepts["concept-joule-heating"].displayName = "Calentamiento de Joule";
corrected.concepts["concept-joule-heating"].summary =
    "Cómo la corriente eléctrica convierte la energía eléctrica en calor.";
getSection("concept-joule-heating", "heating-power").title = "Potencia de calentamiento";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "La potencia eléctrica es una tasa de transferencia de energía, no una temperatura. La capacidad calorífica y el "
    + "flujo de calor determinan cómo esa energía cambia la temperatura y con qué rapidez abandona la superficie.";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "La bobina convierte energía en calor con una potencia de 7,2 W; en 10 segundos, la energía convertida es de 72 J.";

corrected.concepts["concept-kirchhoffs-laws"].displayName = "Leyes de Kirchhoff";
getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "Los términos básicos facilitan la comprensión de un diagrama de circuito:";
getSection("concept-kirchhoffs-laws", "series-and-parallel").title = "Circuitos en serie y paralelo";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8,0 V - V_1 - V_2 = 0";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (ramas paralelas)";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (serie)";
getSection("concept-kirchhoffs-laws", "cells").formulas![1].expression =
    "C_pack = C_1 + C_2 + ... (paralelo)";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![3] =
    "Resuelva las ecuaciones simultáneas y compruebe el equilibrio de potencia.";

getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![0] =
    "Un TCR positivo significa que la resistencia aumenta a medida que aumenta la temperatura; muchos metales se "
    + "comportan de esta manera.";

getSection("concept-trigonometry", "right-triangles").title = "Triángulos rectángulos";
getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = lado opuesto / hipotenusa";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = lado adyacente / hipotenusa";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = lado opuesto / lado adyacente";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].title = "Encontrar un lado";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "lado opuesto = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "lado adyacente = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-trigonometry", "degrees-and-radians").formulas![0].expression =
    "180° = π radianes";
getSection("concept-trigonometry", "waveforms-and-identities").title = "Formas de onda e identidades útiles";
getSection("concept-heat-capacity", "electrical-heating").title = "Calentamiento con energía eléctrica";
getSection("concept-heat-capacity", "phase-changes-and-limits").title = "Cambios de fase y límites prácticos";
corrected.concepts["concept-heat-flux"].displayName = "Densidad de flujo térmico";
getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' es la densidad de flujo térmico, medida en W/m².";
getSection("concept-heat-flux", "worked-example").examples![0].formulas![0] =
    "q'' = 100 W / 0,020 m² = 5.000 W/m²";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "El flujo térmico es una tasa de transferencia por unidad de área, no una temperatura; use la capacidad calorífica "
    + "para calcular el cambio de temperatura.";

const siBaseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siBaseUnits.rows[0][1] = "metro";
siBaseUnits.rows[0][2] = "m";
siBaseUnits.rows[1][0] = "Masa";
siBaseUnits.rows[1][1] = "kilogramo";
siBaseUnits.rows[1][2] = "kg";
siBaseUnits.rows[4][2] = "A";
siBaseUnits.rows[5][1] = "mol";
siBaseUnits.rows[5][2] = "mol";
siBaseUnits.rows[6][2] = "cd";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].displayName =
    "Calibres de alambre: AWG, SWG y BWG";

getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "La ley de Ohm se combina con la relación de potencia P = V × I. La potencia P se mide en vatios (W). Para una "
    + "fuente de 4,2 V y una carga de 1,0 Ω, la potencia ideal es de 17,64 W. El componente necesita una capacidad "
    + "de disipación térmica suficiente y un margen de seguridad adecuado para disipar el calor resultante de forma segura.";
getSection("concept-joule-heating", "heating-power").title = "Potencia térmica";
getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "Una bobina de 0,8 Ω conduce una corriente de 3 A.";
getSection("concept-joule-heating", "what-affects-heating").title = "¿Qué afecta al calentamiento?";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "La transferencia de calor al aire, al líquido y a los equipos determina la temperatura real.";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "La potencia eléctrica es una tasa de transferencia de energía, no una temperatura. La capacidad calorífica y la "
    + "densidad de flujo térmico determinan cómo esa energía cambia la temperatura y con qué rapidez se transfiere desde "
    + "la superficie.";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Verifique que los componentes, las conexiones y el aislamiento puedan soportar la corriente y potencia esperadas. "
    + "Utilice un margen de seguridad adecuado porque los componentes reales pueden calentarse de manera desigual y la "
    + "resistencia puede cambiar con la temperatura. Las baterías y las fuentes de alimentación también tienen límites de "
    + "corriente continua.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].conclusion =
    "La misma corriente de 20 A pasa por ambas resistencias.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].conclusion =
    "Cuando las resistencias de las ramas son iguales, por cada rama circulan 10 A.";
getSection("concept-kirchhoffs-laws", "cells").title = "Celdas conectadas en serie y paralelo";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "Las celdas en serie suman sus voltajes, mientras que la capacidad en amperios-hora sigue siendo la de una celda "
    + "equivalente.";
getSection("concept-kirchhoffs-laws", "cells").bullets![3] =
    "La carga en serie de celdas de ion-litio requiere supervisión a nivel de celda y un equilibrado o una protección "
    + "adecuados.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").title = "Resolución de circuitos reales";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![3] =
    "Resuelva las ecuaciones simultáneas y compruebe el equilibrio de potencia.";
getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "Respecto a un ángulo θ, el lado opuesto está frente al ángulo, el lado adyacente está junto a él pero no es la "
    + "hipotenusa, y la hipotenusa está frente al ángulo recto. SOH-CAH-TOA ayuda a recordarlo: el seno es el lado "
    + "opuesto dividido por la hipotenusa, el coseno es el lado adyacente dividido por la hipotenusa y la tangente es "
    + "el lado opuesto dividido por el adyacente.";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "El tiempo ideal es de unos 7,0 minutos; con una eficiencia de transferencia del 80 %, son aproximadamente 523 segundos.";
getSection("concept-heat-capacity", "object-and-material").title = "Objeto y material";
getSection("concept-heat-capacity", "object-and-material").paragraphs![0] =
    "La capacidad calorífica se refiere al objeto completo y depende de la cantidad de material presente. La capacidad "
    + "calorífica específica es una propiedad del material. Duplicar la masa duplica la capacidad calorífica del mismo material.";
getSection("concept-heat-flux", "conduction").title = "Conducción a través de una capa plana";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "La convección utiliza un coeficiente superficial h. La radiación utiliza la emisividad ε y la constante de "
    + "Stefan-Boltzmann σ; las temperaturas de la ecuación de radiación deben ser temperaturas absolutas en kelvin.";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Distinga el flujo térmico medio de un pico local; el calentamiento puede ser desigual.";
corrected.concepts["concept-si-system-and-imperial-units"].displayName =
    "El sistema SI y las medidas imperiales";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").title = "Calibre, área y resistencia";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").paragraphs![0] =
    "Para 1/0, 2/0, 3/0 y 4/0, utilice n = 0, -1, -2 y -3. AWG determina el tamaño del conductor, no una intensidad "
    + "admisible universal; la capacidad de corriente también depende del material, el aislamiento, la refrigeración, "
    + "la instalación y las normas eléctricas aplicables.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![0] =
    "Indique el sistema, por ejemplo, 24 AWG o 24 British SWG.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Las leyes de corriente y voltaje de Kirchhoff expresan, respectivamente, la conservación de la carga en los nodos "
    + "y la conservación de la energía en los bucles cerrados.";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Si entran 8 A en un nodo y una rama deja salir 3 A, las ramas restantes deben dejar salir un total de 5 A. Elija "
    + "las direcciones de corriente antes de resolver el circuito; un resultado negativo significa que la corriente real "
    + "fluye en dirección opuesta a la supuesta.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].setup =
    "Dos resistencias de 0,20 Ω se conectan en serie a una fuente de 8,0 V.";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "La suma algebraica de las subidas y caídas de voltaje alrededor de un bucle cerrado es cero. Elija una dirección "
    + "para el bucle y mantenga constantes las polaridades. Invertir la dirección cambia los signos, no la solución física. "
    + "Una resistencia en serie mayor produce una caída de voltaje mayor porque la misma corriente fluye por cada componente "
    + "conectado en serie.";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "Las celdas conectadas en serie suman sus voltajes, mientras que la capacidad en amperios-hora sigue siendo la de una "
    + "celda de igual capacidad.";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "Las celdas conectadas en paralelo mantienen el mismo voltaje, mientras que la capacidad y la corriente disponible se "
    + "suman aproximadamente.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![2] =
    "Relacione el voltaje en cada resistencia con su corriente mediante V = I × R.";

corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "El coeficiente de temperatura de la resistencia describe cómo cambia la resistencia de un material al cambiar la "
    + "temperatura.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "Para una resistencia con TCR positivo alimentada con tensión constante, el aumento de temperatura incrementa la "
    + "resistencia y tiende a reducir la corriente. Con una fuente de corriente constante, ese mismo aumento de resistencia "
    + "incrementa la potencia.";

getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = lado adyacente / hipotenusa";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = lado opuesto / lado adyacente";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(lado opuesto / hipotenusa)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(lado adyacente / hipotenusa)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(lado opuesto / lado adyacente)";

getSection("concept-heat-capacity", "electrical-heating").title = "Calentamiento eléctrico";
getSection("concept-heat-capacity", "electrical-heating").examples![0].setup =
    "Caliente el ejemplo de 41,8 kJ con una fuente constante de 100 W y sin pérdidas.";
corrected.concepts["concept-heat-flux"].description =
    "La densidad de flujo térmico describe la rapidez con la que se transfiere calor por unidad de área, independientemente "
    + "de la cantidad total de material que almacena calor.";
getSection("concept-heat-flux", "worked-example").examples![0].title =
    "Densidad de flujo térmico media del calentador";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "La densidad de flujo térmico media es de 5.000 W/m², o 0,5 W/cm².";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "La convección utiliza un coeficiente de convección h. La radiación utiliza la emisividad ε y la constante de "
    + "Stefan-Boltzmann σ; las temperaturas de la ecuación de radiación deben ser temperaturas absolutas en kelvin.";

corrected.concepts["concept-si-system-and-imperial-units"].description =
    "El Sistema Internacional de Unidades proporciona unidades básicas y derivadas coherentes, además de prefijos "
    + "decimales para los cálculos técnicos.";
getSection("concept-si-system-and-imperial-units", "base-units").title = "Unidades básicas del SI";
const siPrefixes = getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!;
siPrefixes.rows[0][0] = "kilo";
siPrefixes.rows[1][0] = "mega";
siPrefixes.rows[2][0] = "mili";
siPrefixes.rows[3][0] = "micro";
siPrefixes.rows[4][0] = "nano";

corrected.concepts["concept-wire-gauges-awg-swg-bwg"].description =
    "Un número de calibre solo describe un tamaño nominal cuando se indica el sistema de calibres.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![0].expression =
    "d_inch = 0,005 × 92^((36 - n) / 39)";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![1].expression =
    "d_mm = 0,127 × 92^((36 - n) / 39)";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Las leyes de corriente y tensión de Kirchhoff describen la conservación de la carga en los nodos y de la energía " +
    "en los lazos cerrados.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8,0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "El coeficiente de temperatura de la resistencia describe cómo cambia la resistencia de un componente con la " +
    "temperatura.";
corrected.concepts["concept-heat-flux"].displayName = "Densidad de flujo térmico";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Determina la capacidad de conducción de corriente según los datos del producto y las normas eléctricas, no solo " +
    "según el número de calibre.";

getSection("concept-ohms-law", "unit-conversions").bullets![0] = "1 kΩ = 1.000 Ω";
getSection("concept-ohms-law", "unit-conversions").bullets![3] = "1 W = 1.000 mW";
getSection("concept-trigonometry", "degrees-and-radians").formulas![0].expression = "180° = π radianes";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "La convección utiliza un coeficiente de superficie h. La radiación utiliza la emisividad ε y la constante de " +
    "Stefan-Boltzmann σ; las temperaturas en la ecuación de radiación deben ser temperaturas absolutas en kelvin.";

export const presentations = corrected as unknown as CatalogPresentationSet;
