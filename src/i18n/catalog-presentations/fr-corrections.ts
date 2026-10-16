import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./fr";

type MutableExample = {
    title?: string;
    setup?: string;
    conclusion?: string;
    formulas?: string[];
};

type MutableTable = {
    headers: string[];
    rows: string[][];
};

type MutableSection = {
    id: string;
    title?: string;
    paragraphs?: string[];
    bullets?: string[];
    formulas?: Array<{ expression: string }>;
    examples?: MutableExample[];
    table?: MutableTable;
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
        throw new Error("French catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

const ohmsExamples = getSection("concept-ohms-law", "worked-examples").examples!;
getSection("concept-ohms-law", "relationship").bullets![1] =
    "I est le courant, mesuré en ampères (A).";
ohmsExamples[1].title = "Trouver la résistance";
ohmsExamples[1].formulas![0] = "R = 12 V / 2 A = 6 Ω";
ohmsExamples[1].conclusion = "La résistance du circuit est de 6 Ω.";
getSection("concept-ohms-law", "electrical-power").title = "Puissance électrique";

corrected.concepts["concept-joule-heating"].summary =
    "Comment le courant électrique transforme l'énergie électrique en chaleur.";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![0] =
    "P = I^2 × R = 3^2 × 0,8 = 7,2 W";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "La bobine convertit l'énergie en chaleur avec une puissance de 7,2 W ; en 10 secondes, l'énergie convertie est de 72 J.";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "Le transfert de chaleur vers l'air, le liquide et l'équipement détermine la température réelle.";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "La puissance électrique est un taux de transfert d'énergie et non une température. La capacité thermique et le flux "
    + "thermique déterminent comment cette énergie modifie la température et à quelle vitesse elle quitte la surface.";

getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "Les termes de base facilitent la compréhension d'un schéma de circuit :";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![1] =
    "Une branche est un chemin de courant entre deux nœuds.";
getSection("concept-kirchhoffs-laws", "current-law").title = "Loi des nœuds de Kirchhoff";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Si 8 A entrent dans un nœud et qu'une branche évacue 3 A, les autres branches doivent évacuer ensemble 5 A. "
    + "Choisissez les sens des courants avant de résoudre ; un résultat négatif signifie que le courant réel circule dans "
    + "le sens opposé à celui supposé.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (branches parallèles)";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8,0 V - V_1 - V_2 = 0";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (série)";
getSection("concept-kirchhoffs-laws", "cells").formulas![1].expression =
    "C_pack = C_1 + C_2 + ... (parallèle)";

const trigonometry = getSection("concept-trigonometry", "right-triangles");
trigonometry.formulas![0].expression = "sin(θ) = côté opposé / hypoténuse";
trigonometry.formulas![1].expression = "cos(θ) = côté adjacent / hypoténuse";
trigonometry.formulas![2].expression = "tan(θ) = côté opposé / côté adjacent";
const trigExample = getSection("concept-trigonometry", "finding-sides-and-angles").examples![0];
trigExample.formulas![0] = "côté opposé = 10 × sin(30°) = 5 cm";
trigExample.formulas![1] = "côté adjacent = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![2] =
    "Conservez le signe et le quadrant lorsque la direction ou la phase est importante.";
getSection("concept-trigonometry", "degrees-and-radians").formulas![0].expression =
    "180° = π radians";
getSection("concept-trigonometry", "waveforms-and-identities").title = "Formes d'onde et identités utiles";

corrected.concepts["concept-heat-capacity"].summary =
    "De quelle quantité d'énergie un objet a-t-il besoin pour changer de température ?";
getSection("concept-heat-capacity", "worked-example").examples![0].title = "Chauffer de l'eau";
getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "Le besoin énergétique idéal est de 41,8 kJ ; un véritable chauffage a besoin de plus à cause des pertes.";
getSection("concept-heat-capacity", "electrical-heating").title = "Chauffage par énergie électrique";
getSection("concept-heat-capacity", "phase-changes-and-limits").title = "Changements de phase et limites pratiques";
corrected.concepts["concept-heat-flux"].summary = "Puissance thermique transférée par unité de surface.";
getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' est la densité de flux thermique, mesurée en W/m².";
getSection("concept-heat-flux", "worked-example").examples![0].formulas![0] =
    "q'' = 100 W / 0,020 m² = 5 000 W/m²";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Distinguez le flux thermique moyen d'un pic local ; le chauffage peut être inégal.";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Le flux thermique est un taux de transfert, pas une température ; utilisez la capacité thermique pour les changements de température.";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[1][0] = "Masse";
const siBaseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siBaseUnits.rows[0][1] = "mètre";
siBaseUnits.rows[0][2] = "m";
siBaseUnits.rows[1][1] = "kilogramme";
siBaseUnits.rows[1][2] = "kg";
siBaseUnits.rows[2][1] = "seconde";
siBaseUnits.rows[2][2] = "s";
siBaseUnits.rows[4][2] = "A";
siBaseUnits.rows[5][1] = "mole";
siBaseUnits.rows[5][2] = "mol";
siBaseUnits.rows[6][2] = "cd";

getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "La loi d'Ohm se combine avec la relation de puissance P = V × I. La puissance P se mesure en watts (W). Pour une "
    + "source de 4,2 V et une charge de 1,0 Ω, la puissance idéale est de 17,64 W. Le composant doit avoir une capacité "
    + "de dissipation thermique suffisante et une marge de sécurité pour dissiper la chaleur produite en toute sécurité.";
getSection("concept-joule-heating", "heating-power").title = "Puissance thermique";
getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "Une bobine de 0,8 Ω conduit un courant de 3 A.";
getSection("concept-joule-heating", "what-affects-heating").title =
    "Facteurs qui influencent le chauffage";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "La puissance électrique est un taux de transfert d'énergie et non une température. La capacité thermique et la "
    + "densité de flux thermique déterminent comment cette énergie modifie la température et à quelle vitesse la chaleur "
    + "est transférée depuis la surface.";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Vérifiez que les composants, les connexions et l'isolation supportent le courant et la "
    + "puissance prévus. Prévoyez une marge de sécurité suffisante, car les composants réels peuvent "
    + "chauffer de manière inégale et leur résistance peut varier avec la température. Les batteries "
    + "et les alimentations ont également des limites de courant admissible en continu.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].conclusion =
    "Lorsque les résistances des branches sont égales, un courant de 10 A circule dans chaque branche.";
getSection("concept-kirchhoffs-laws", "cells").title = "Cellules connectées en série et en parallèle";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "Les cellules en série additionnent leurs tensions, tandis que la capacité en ampères-heures reste celle d'une cellule "
    + "équivalente.";
getSection("concept-kirchhoffs-laws", "cells").bullets![3] =
    "La charge en série de cellules lithium-ion nécessite une surveillance au niveau de chaque cellule ainsi qu'un équilibrage "
    + "ou une protection appropriés.";
getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "Par rapport à un angle θ, le côté opposé lui fait face, le côté adjacent lui est contigu sans être l'hypoténuse, "
    + "et l'hypoténuse est opposée à l'angle droit. SOH-CAH-TOA est un aide-mémoire : le sinus est le côté opposé divisé "
    + "par l'hypoténuse, le cosinus est le côté adjacent divisé par l'hypoténuse et la tangente est le côté opposé divisé "
    + "par le côté adjacent.";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(côté opposé / hypoténuse)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(côté adjacent / hypoténuse)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(côté opposé / côté adjacent)";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "Dans un triangle rectangle, l'hypoténuse mesure 10 cm et l'un des angles aigus mesure 30°.";
getSection("concept-heat-capacity", "worked-example").examples![0].title = "Exemple de chauffage de l'eau";
getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "Le besoin énergétique idéal est de 41,8 kJ ; un chauffage réel en nécessite davantage à cause des pertes.";
getSection("concept-heat-capacity", "electrical-heating").title = "Chauffage électrique";
getSection("concept-heat-capacity", "object-and-material").title = "Objet et matériau";
getSection("concept-heat-capacity", "object-and-material").paragraphs![0] =
    "La capacité thermique se rapporte à l'objet entier et dépend de la quantité de matériau "
    + "présente. La capacité thermique massique est une propriété du matériau. Pour un même matériau, "
    + "doubler la masse double la capacité thermique.";
getSection("concept-heat-flux", "definition").title = "Définition de la densité de flux thermique";
getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' est la densité de flux thermique, mesurée en W/m².";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "La convection utilise un coefficient de surface h. Le rayonnement utilise l'émissivité ε et la constante de "
    + "Stefan-Boltzmann σ ; les températures de l'équation de rayonnement doivent être des températures absolues en kelvins.";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Distinguez le flux thermique moyen d'un pic local ; le chauffage peut être inégal.";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Le flux thermique est un taux de transfert, pas une température ; utilisez la capacité thermique pour les changements "
    + "de température.";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].conclusion =
    "La résistance estimée est de 1,032 Ω, soit environ 3,2 % au-dessus de sa valeur à 20 °C.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Déterminez la capacité de courant à partir des données du produit et des règles électriques, et non à partir du seul "
    + "numéro de calibre.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").title = "Systèmes de calibres";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Les lois de Kirchhoff sur le courant et la tension expriment respectivement la conservation de la charge aux nœuds "
    + "et la conservation de l'énergie dans les boucles fermées.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![2] =
    "Reliez la tension aux bornes d'une résistance à son courant par V = I × R.";

corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Le coefficient de température de la résistance décrit comment la résistance d'un matériau varie lorsque la température "
    + "change.";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "Par rapport à un angle θ, le côté opposé lui fait face, le côté adjacent le touche sans être l'hypoténuse, et "
    + "l'hypoténuse est opposée à l'angle droit. SOH-CAH-TOA est un aide-mémoire : le sinus est le rapport du côté opposé "
    + "à l'hypoténuse, le cosinus celui du côté adjacent à l'hypoténuse et la tangente celui du côté opposé au côté adjacent.";
getSection("concept-trigonometry", "degrees-and-radians").paragraphs![0] =
    "Le calculateur doit être réglé sur le bon mode angulaire. Utiliser le mode degrés pour une valeur en radians, ou "
    + "inversement, donne un résultat différent. Un tour complet correspond à 360° ou 2π radians.";

getSection("concept-ohms-law", "limits").paragraphs![0] =
    "La loi d'Ohm est un modèle idéalisé. Les composants réels peuvent être non ohmiques : leur résistance peut changer en "
    + "fonction de la température, de la tension, du courant, de la fréquence ou de l'état de fonctionnement. Pour les "
    + "réseaux en série et en parallèle, utilisez les lois de Kirchhoff ainsi que la loi d'Ohm.";
getSection("concept-ohms-law", "rearranged-formulas").paragraphs![0] =
    "Utilisez la version qui place à gauche la valeur que vous souhaitez trouver :";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Vérifiez que les composants, les connexions et l'isolation supportent le courant et la "
    + "puissance prévus. Prévoyez une marge de sécurité suffisante, car les composants réels peuvent "
    + "chauffer de manière inégale et leur résistance peut varier avec la température. Les batteries "
    + "et les alimentations ont également des limites de courant admissible en continu.";

corrected.concepts["concept-heat-flux"].displayName = "Densité de flux thermique";
corrected.concepts["concept-heat-flux"].description =
    "La densité de flux thermique décrit le taux de transfert de chaleur par unité de surface, indépendamment de la quantité "
    + "totale de matériau qui stocke cette chaleur.";
getSection("concept-heat-flux", "worked-example").examples![0].title =
    "Densité de flux thermique moyenne de l'élément chauffant";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "La densité de flux thermique moyenne est de 5 000 W/m², soit 0,5 W/cm².";
getSection("concept-heat-flux", "conduction").bullets![3] =
    "Le signe moins indique que la chaleur se transfère d'une température plus élevée vers une température plus basse.";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "La convection utilise un coefficient de convection h. Le rayonnement utilise l'émissivité ε et la constante de "
    + "Stefan-Boltzmann σ ; les températures de l'équation de rayonnement doivent être des températures absolues en kelvins.";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Distinguez la densité de flux thermique moyenne d'un pic local ; le chauffage peut être inégal.";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "La densité de flux thermique est un taux de transfert, pas une température ; utilisez la capacité thermique pour "
    + "calculer la variation de température.";

getSection("concept-si-system-and-imperial-units", "base-units").title = "Unités SI courantes";
const decimalPrefixes = getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!;
decimalPrefixes.rows[0][0] = "kilo";
decimalPrefixes.rows[0][2] = "1 000 = 10^3";
decimalPrefixes.rows[1][0] = "méga";
decimalPrefixes.rows[1][1] = "M";
decimalPrefixes.rows[1][2] = "1 000 000 = 10^6";
decimalPrefixes.rows[2][2] = "0,001 = 10^-3";
decimalPrefixes.rows[3][1] = "μ";
decimalPrefixes.rows[3][2] = "0,000001 = 10^-6";
decimalPrefixes.rows[4][2] = "0,000000001 = 10^-9";

const lengthConversions = getSection("concept-si-system-and-imperial-units", "length-conversions");
lengthConversions.formulas![0].expression = "1 pouce = 25,4 mm = 0,0254 m";
lengthConversions.formulas![1].expression = "1 pied = 12 pouces = 0,3048 m";
lengthConversions.formulas![2].expression = "1 yard = 3 pieds = 0,9144 m";
lengthConversions.formulas![3].expression = "1 po² = 645,16 mm²";
getSection("concept-si-system-and-imperial-units", "other-conversions").bullets![1] =
    "1 lbf ≈ 4,44822 N.";

const gaugeComparison = getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!;
gaugeComparison.headers[0] = "Calibre";
gaugeComparison.headers[3] = "BWG";
gaugeComparison.rows[0][1] = "2,588 mm";
gaugeComparison.rows[0][2] = "3,251 mm";
gaugeComparison.rows[0][3] = "3,404 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Un numéro de calibre plus élevé signifie généralement un diamètre plus petit ; les tailles supérieures au calibre 0 "
    + "utilisent 00, 000 ou 0000.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![0].expression =
    "d_inch = 0,005 × 92^((36 - n) / 39)";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![1].expression =
    "d_mm = 0,127 × 92^((36 - n) / 39)";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").paragraphs![0] =
    "La résistance dépend de la longueur du conducteur L, de la section transversale A et de la résistivité du matériau ρ. "
    + "Comme la section varie selon le carré du diamètre, une légère différence de diamètre peut entraîner une différence de "
    + "résistance substantielle. En AWG, l'augmentation du calibre de trois tailles réduit environ de moitié la section et "
    + "double la résistance par unité de longueur pour le même matériau et la même température.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![0] =
    "Indiquez le système, par exemple 24 AWG ou 24 British SWG.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Les lois de Kirchhoff du courant et de la tension décrivent la conservation de la charge aux nœuds et de l'énergie " +
    "dans les mailles fermées.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8,0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Le coefficient de température de la résistance décrit comment la résistance d'un composant varie avec la " +
    "température.";
corrected.concepts["concept-heat-flux"].displayName = "Densité de flux thermique";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Déterminez la capacité de transport de courant à partir des données du produit et des normes électriques, et non " +
    "du seul numéro de calibre.";

getSection("concept-kirchhoffs-laws", "current-law").title = "Loi des nœuds de Kirchhoff";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![1] =
    "Une branche est un chemin de courant entre deux nœuds.";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "La convection utilise un coefficient de surface h. Le rayonnement utilise l'émissivité ε et la constante de " +
    "Stefan–Boltzmann σ ; les températures de l'équation de rayonnement doivent être des températures absolues en kelvins.";

export const presentations = corrected as unknown as CatalogPresentationSet;
