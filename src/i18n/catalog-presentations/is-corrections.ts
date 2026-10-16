import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./is";

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
        throw new Error("Icelandic catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "relationship").bullets![1] =
    "I er straumur, mældur í amperum (A).";
getSection("concept-ohms-law", "rearranged-formulas").bullets![1] =
    "Aukið viðnám dregur úr straumi þegar spennan helst sú sama.";
getSection("concept-ohms-law", "worked-examples").examples![2].conclusion = "Spennan er 5 V.";
getSection("concept-ohms-law", "electrical-power").title = "Rafafl";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "Lögmál Ohms tengist aflsambandinu P = V × I. Afl P er mælt í vöttum (W). Fyrir 4,2 V spennugjafa og 1,0 Ω "
    + "álag er kjöraflið 17,64 W. Íhluturinn þarf næga varmagetu og öryggisbil til að leiða myndaðan hita frá á "
    + "öruggan hátt.";

corrected.concepts["concept-joule-heating"].description =
    "Joule-upphitun lýsir því hvernig raforka breytist í hita þegar straumur flæðir um viðnám.";
corrected.concepts["concept-joule-heating"].summary =
    "Hvernig rafstraumur breytir raforku í hita.";
getSection("concept-joule-heating", "what-affects-heating").bullets![0] =
    "Við stöðugt viðnám gefur tvöföldun straums fjórfalt hitunarafl.";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Athugaðu hvort íhlutir, tengingar og einangrun þoli væntanlegan straum og afl. Hafðu nægt öryggisbil því "
    + "raunverulegir íhlutir geta hitnað ójafnt og viðnám þeirra breyst með hitastigi. Rafhlöður og aflgjafar hafa "
    + "einnig takmörk fyrir samfelldan straum.";

getSection("concept-kirchhoffs-laws", "circuit-terms").title = "Hringrásarhugtök";
getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "Grunnhugtökin auðvelda túlkun á hringrásarmynd:";
getSection("concept-kirchhoffs-laws", "voltage-law").title = "Spennulögmál Kirchhoffs";
getSection("concept-kirchhoffs-laws", "cells").formulas![1].expression =
    "C_pack = C_1 + C_2 + ... (samsíða)";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![3] =
    "Leystu samtímis jöfnur og athugaðu aflajafnvægi.";

corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Hitastuðull viðnáms lýsir því hvernig viðnám breytist þegar efni hitnar eða kólnar.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "Fyrir viðnám með jákvæðum TCR sem er knúið við stöðuga spennu eykst viðnámið þegar hitastig hækkar og "
    + "straumurinn hefur tilhneigingu til að minnka. Fyrir stöðugan straumgjafa eykur sama hækkun viðnámsins aflið.";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "Miðað við horn θ er gagnstæða hliðin hinum megin við hornið, aðliggjandi hliðin snertir hornið án þess að vera "
    + "undirstúkan og undirstúkan er á móti rétta horninu. SOH-CAH-TOA er minnishjálp: sinus = gagnstæða / "
    + "undirstúka, kósínus = aðliggjandi / undirstúka og tangens = gagnstæða / aðliggjandi.";
getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = opposite / hypotenuse";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = adjacent / hypotenuse";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = opposite / adjacent";

corrected.concepts["concept-heat-capacity"].displayName = "Varmageta";
getSection("concept-heat-flux", "definition").formulas![0].expression = "q'' = Q_dot / A";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Greindu meðalhitaflæði frá staðbundnum hámarki; hitunin getur verið ójöfn.";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Hitaflæði er flutningshraði, ekki hitastig; notaðu varmagetu til að lýsa hitabreytingu.";

getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![0].expression =
    "1 tomma = 25,4 mm = 0,0254 m";
getSection("concept-si-system-and-imperial-units", "other-conversions").paragraphs![0] =
    "Pund getur átt við massa (lb) eða kraft (lbf), sem eru mismunandi stærðir. Á sama hátt mæla tommur, "
    + "ferningstommur og rúmtommur mismunandi víddir.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").paragraphs![0] =
    "Fyrir 1/0, 2/0, 3/0 og 4/0 skaltu nota n = 0, -1, -2 og -3. AWG ákvarðar stærð leiðara, ekki alhliða öruggan "
    + "straum; straumgeta fer einnig eftir efni, einangrun, kælingu, uppsetningu og gildandi rafmagnsreglum.";

getSection("concept-joule-heating", "heating-power").title = "Hitunarafl";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "Spólan breytir orku í hita með aflinu 7,2 W, eða 72 J á 10 sekúndum.";
getSection("concept-joule-heating", "what-affects-heating").bullets![1] =
    "Við stöðugan straum tvöfaldar tvöföldun viðnámsins hitunaraflið.";
getSection("concept-joule-heating", "what-affects-heating").bullets![2] =
    "Við stöðuga spennu eykur minna viðnám hitunaraflið.";

getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].conclusion =
    "Sami 20 A straumur fer í gegnum bæði viðnámin.";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "Frumur í röð leggja saman spennu en afkastageta í amperstundum er sú sama og hjá einni frumu.";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "Frumur í hliðtengingu halda sömu spennu en afkastageta og tiltækur straumur leggjast nokkurn veginn saman.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").paragraphs![0] =
    "Einfaldað líkan getur sleppt innra viðnámi frumu, snertiviðnámi, skilvirkni breytis, hitaáhrifum, skammvinnri "
    + "hegðun, verndarrásum og vikmörkum íhluta. Taktu með alla hegðun sem var sleppt ef hún hefur veruleg áhrif á "
    + "hástraumsrásina.";

getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").formulas![0].expression =
    "I = V / R";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "TCR-gildi framleiðanda gildir yfirleitt fyrir tilgreint hitastigs- og viðnámssvið. Hitastigshlutfall, "
    + "efnisbreytingar, tengiliðir, vélrænt álag og sjálfhitun geta valdið því að raunveruleg niðurstaða víki frá "
    + "fyrsta stigs mati.";

getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(opposite / hypotenuse)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(adjacent / hypotenuse)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(opposite / adjacent)";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "opposite = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "adjacent = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![0] =
    "A er sveifluvídd, f er tíðni í hertsum, t er tími í sekúndum og φ er fasahorn.";

getSection("concept-heat-capacity", "basic-relationships").bullets![3] =
    "Hitamunur upp á 1 K er jafn stór og hitamunur upp á 1 °C.";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "Kjörinn tími er um 7,0 mínútur; við 80% flutningsskilvirkni er hann um 523 s.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "Við bráðnun eða suðu getur tiltekin orka breytt fasa efnisins án þess að breyta hitastigi þess. L er "
    + "eðlisbundinn dulinn varmi í J/kg.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![1] =
    "Einfalda jafnan gerir ráð fyrir að sérvarmi sé nokkurn veginn stöðugur. Hitatap, varmaburður, geislun, uppgufun, "
    + "snertiviðnám og ójafnt hitastig geta valdið því að raunveruleg niðurstaða víki frá kjörmyndinni.";

corrected.concepts["concept-heat-flux"].description =
    "Varmaflæðisþéttleiki lýsir því hversu hratt varmi flyst yfir hverja flatarmálseiningu, óháð heildarmagni efnis "
    + "sem geymir varma.";
corrected.concepts["concept-heat-flux"].summary = "Hraði varmaflutnings á hverja flatarmálseiningu.";
getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' er varmaflæðisþéttleiki í W/m².";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").paragraphs![0] =
    "Þessi gildi eru nafnstærðir. Vöruvik, húðun, einangrun og fjölþátta uppbygging geta breytt mældu eða "
    + "heildarþvermáli.";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").formulas![0].expression =
    "R = ρ × L / A";

getSection("concept-ohms-law", "rearranged-formulas").formulas![0].expression = "I = V / R";
getSection("concept-ohms-law", "rearranged-formulas").formulas![1].expression = "R = V / I";
getSection("concept-ohms-law", "relationship").bullets![2] =
    "R er viðnám, mælt í ohmum (Ω).";
getSection("concept-joule-heating", "worked-example").title = "Reiknidæmi";

corrected.concepts["concept-temperature-coefficient-of-resistance"].displayName =
    "Hitastuðull viðnáms (TCR)";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").title = "Reiknidæmi";

getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].title = "Finndu eina hlið";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "Undirstúka sem er 10 cm löng myndar 30° horn.";

getSection("concept-heat-capacity", "worked-example").title = "Reiknidæmi";
getSection("concept-heat-capacity", "electrical-heating").examples![0].setup =
    "Hitið dæmið sem krefst 41,8 kJ með stöðugri 100 W uppsprettu án taps.";
getSection("concept-heat-capacity", "object-and-material").title = "Hlutur og efni";
getSection("concept-heat-capacity", "phase-changes-and-limits").title =
    "Fasabreytingar og hagnýtar takmarkanir";

corrected.concepts["concept-heat-flux"].displayName = "Varmaflæðisþéttleiki";
getSection("concept-heat-flux", "worked-example").title = "Reiknidæmi";
getSection("concept-heat-flux", "worked-example").examples![0].setup =
    "100 W hitari flytur varma í gegnum 0,020 m² flatarmál.";
getSection("concept-heat-flux", "practical-checks").title = "Hagnýtar athuganir";

getSection("concept-si-system-and-imperial-units", "base-units").title = "SI-grunneiningar";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 fet = 12 tommur = 0,3048 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 yard = 3 fet = 0,9144 m";
getSection("concept-si-system-and-imperial-units", "other-conversions").title =
    "Fleiri algengir umreikningar";

corrected.concepts["concept-wire-gauges-awg-swg-bwg"].displayName =
    "Vírstærðir: AWG, SWG og BWG";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Stærri venjulegt mælitala þýðir yfirleitt minna þvermál; stærðir yfir mælikvarða 0 nota 00, 000 eða 0000.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").title =
    "AWG-þvermál og flatarmál";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").title =
    "Vírstærð, flatarmál og viðnám";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").title =
    "Hagnýt lýsing";

getSection("concept-ohms-law", "worked-examples").examples![0].setup =
    "4,2 V spennugjafi er tengdur við 1,0 Ω álag.";
getSection("concept-ohms-law", "worked-examples").examples![2].conclusion = "Spennan er 5 V.";
getSection("concept-ohms-law", "rearranged-formulas").bullets![2] =
    "Núll Ω viðnám er hugsjónað skammhlaup og verður að meðhöndla sérstaklega.";

getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "3 A straumur flæðir um 0,8 Ω spólu.";
getSection("concept-joule-heating", "what-affects-heating").bullets![0] =
    "Við stöðugt viðnám gefur tvöföldun straums fjórfalt hitunarafl.";
getSection("concept-joule-heating", "what-affects-heating").bullets![2] =
    "Við stöðuga spennu eykur lægra viðnám hitunaraflið.";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "Rafafl er hraði orkuflutnings, ekki hitastig. Hitageta og varmaflæði ákvarða hvernig sú orka breytir hitastigi "
    + "og hversu hratt hún fer frá yfirborðinu.";

getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "Grunnhugtökin auðvelda greiningu á hringrásarmyndum:";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "Frumur í röð leggja saman spennu en afkastageta í amperstundum er sú sama og hjá einni frumu.";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "Samhliða frumur halda sömu spennu en afkastageta og tiltækur straumur leggjast nokkurn veginn saman.";
getSection("concept-kirchhoffs-laws", "cells").bullets![2] =
    "Straumdreifing fer eftir innra viðnámi, tengiliðum, raflögnum og rofum.";
getSection("concept-kirchhoffs-laws", "cells").bullets![3] =
    "Hleðsla litíumjónafrumna í röð krefst eftirlits á frumustigi og viðeigandi jafnvægis eða verndar.";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "Algebrusumma spennuhækkana og spennufalla um lokaða lykkju er núll. Veldu eina lykkjustefnu og haltu pólunum í "
    + "samræmi. Að snúa við stefnunni breytir formerkjum, ekki eðlisfræðilegri lausn. Stærra raðviðnám hefur meira "
    + "spennufall vegna þess að sami straumur flæðir í gegnum hvern raðhluta.";

getSection("concept-temperature-coefficient-of-resistance", "linear-model").paragraphs![0] =
    "Fyrir litlar eða miðlungsmiklar hitabreytingar skaltu nota fyrsta stigs sambandið:";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![3] =
    "Nota verður sama hitakvarða og sömu einingar fyrir hitamuninn T - T_0.";

getSection("concept-heat-capacity", "basic-relationships").bullets![3] =
    "Hitamunur upp á 1 K er jafn stór og hitamunur upp á 1 °C.";
getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "Kjörorkuþörfin er 41,8 kJ; raunverulegur hitari þarf meira vegna varmataps.";
getSection("concept-heat-capacity", "object-and-material").paragraphs![0] =
    "Hitageta tilheyrir öllum hlutnum og fer eftir því hversu mikið efni er til staðar. Sérvarmageta er eiginleiki efnis. "
    + "Tvöföldun massans tvöfaldar hitagetu sama efnis.";

getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "Meðalvarmaflæðisþéttleiki er 5.000 W/m², eða 0,5 W/cm².";

getSection("concept-si-system-and-imperial-units", "other-conversions").paragraphs![0] =
    "Pund getur átt við massa (lb) eða kraft (lbf), sem eru mismunandi stærðir. Sömuleiðis mæla tommur, "
    + "ferningstommur og rúmtommur mismunandi víddir.";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![2] =
    "Umreiknaðu áður en þú margfaldar eða deilir.";

getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Stærri venjuleg mælitala þýðir yfirleitt minna þvermál; stærðir yfir mælikvarða 0 nota 00, 000 eða 0000.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![0].expression =
    "d_inch = 0,005 × 92^((36 - n) / 39)";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").paragraphs![0] =
    "Viðnám fer eftir leiðarlengd L, þversniðsflatarmáli A og eðlisviðnámi ρ. Þar sem flatarmálið breytist í réttu "
    + "hlutfalli við annað veldi þvermáls getur lítill þvermálsmunur valdið verulegum mun á viðnámi. Í AWG helmingar "
    + "aukning mælitölunnar um þrjár stærðir flatarmálið um það bil og tvöfaldar viðnám á hverja lengdareiningu fyrir "
    + "sama efni og hitastig.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![2] =
    "Tilgreindu hvort víddin sé ber leiðari, einangrað þvermál, plötuþykkt eða rörveggþykkt.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Straum- og spennulögmál Kirchhoffs lýsa varðveislu hleðslu í hnútpunktum og orku í lokuðum lykkjum.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8,0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Hitastuðull viðnáms lýsir því hvernig viðnám í íhlut breytist með hitastigi.";
corrected.concepts["concept-heat-flux"].displayName = "Varmastreymisþéttleiki";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Ákvarðaðu straumþol út frá upplýsingum um vöruna og gildandi rafmagnsreglum, ekki eingöngu út frá málstölu.";

getSection("concept-ohms-law", "worked-examples").examples![2].conclusion = "Spennan er 5 V.";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Greindu meðalvarmaflæði frá staðbundnum toppi; hitunin getur verið ójöfn.";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Varmaflæði er flutningshraði, ekki hitastig; notaðu hitagetu til að reikna hitabreytingar.";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = gagnstæða hlið / undirstúka";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = aðliggjandi hlið / undirstúka";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = gagnstæða hlið / aðliggjandi hlið";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(gagnstæða hlið / undirstúka)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(aðliggjandi hlið / undirstúka)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(gagnstæða hlið / aðliggjandi hlið)";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "gagnstæða hlið = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "aðliggjandi hlið = 10 × cos(30°) ≈ 8,66 cm";

getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 jarda = 3 fet = 0,9144 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![3].expression =
    "1 tomma² = 645,16 mm²";

export const presentations = corrected as unknown as CatalogPresentationSet;
