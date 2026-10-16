import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./tr";

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
        throw new Error("Turkish catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "relationship").title = "İlişki";
getSection("concept-ohms-law", "relationship").bullets![0] = "V, volt (V) cinsinden ölçülen gerilimdir.";
getSection("concept-ohms-law", "relationship").bullets![1] = "I, amper (A) cinsinden ölçülen akımdır.";
getSection("concept-ohms-law", "worked-examples").examples![0].formulas![0] =
    "I = 4,2 V / 1,0 Ω = 4,2 A";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "Ohm yasası, P = V × I güç ilişkisiyle birlikte kullanılır. Güç P, watt (W) cinsinden ölçülür. 4,2 V kaynak ve " +
    "1,0 Ω yük için ideal güç 17,64 W'tır. Bileşenin ortaya çıkan ısıyı güvenli biçimde dağıtmak için yeterli ısı " +
    "yayma kapasitesine ve güvenlik payına sahip olması gerekir.";
getSection("concept-ohms-law", "unit-conversions").bullets![2] = "1 mA = 0,001 A";
getSection("concept-joule-heating", "worked-example").title = "Hesaplama örneği";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![1] =
    "E = P × t = 7,2 W × 10 s = 72 J";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Bileşenlerin, bağlantıların ve yalıtımın beklenen akım ve gücü karşılayıp karşılamadığını kontrol edin. Gerçek " +
    "bileşenler eşit olmayan biçimde ısınabileceği ve direnç sıcaklıkla değişebileceği için uygun bir güvenlik payı " +
    "kullanın. Pillerin ve güç kaynaklarının sürekli akım sınırları da vardır.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![1] =
    "Kol, iki düğüm arasındaki akım yoludur.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![2] =
    "Çevrim, başlangıç noktasına dönen kapalı bir yoldur.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![3] =
    "Seri bağlantı, akım için bileşenler arasında yalnızca tek bir yol sağlar.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].formulas![0] =
    "R_total = 0,40 Ω";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].formulas![1] =
    "I = 8,0 V / 0,40 Ω = 20 A";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8,0 V - V_1 - V_2 = 0";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (paralel kollar)";
getSection("concept-kirchhoffs-laws", "solving-and-limits").title = "Gerçek devreleri analiz etme";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![0] =
    "Düğüm gerilimlerini, kol akımlarını ve varsayılan akım yönlerini belirleyin.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![2] =
    "Direnç üzerindeki gerilim ve akımı V = I × R ile ilişkilendirin.";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").title = "Hesaplama örneği";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].setup =
    "20 °C'de 1,00 Ω direnç ve 400 ppm/°C TCR verilmiştir.";
getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "θ açısına göre karşı kenar açının karşısında, komşu kenar hipotenüs dışında açıya bitişik ve hipotenüs dik " +
    "açının karşısındadır. SOH-CAH-TOA bir hatırlatıcıdır: sinüs = karşı / hipotenüs, kosinüs = komşu / hipotenüs " +
    "ve tanjant = karşı / komşu.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "10 cm uzunluğundaki hipotenüs 30° açı yapar.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "karşı kenar = 10 × sin(30°) = 5 cm";
getSection("concept-heat-capacity", "basic-relationships").formulas![0].expression = "C = Q / ΔT";
getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "Temel terimler bir devre şemasını anlamayı kolaylaştırır:";
corrected.concepts["concept-kirchhoffs-laws"].description =
    "Kirchhoff'un akım ve gerilim yasaları, düğümlerde yükün ve kapalı çevrimlerde enerjinin korunmasını açıklar.";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Bir düğüme 8 A girer ve bir koldan 3 A çıkarsa, kalan kollardan toplam 5 A çıkmalıdır. Hesaplamadan önce akım " +
    "yönlerini belirleyin; negatif sonuç, gerçek akımın varsayılan yönün tersine aktığı anlamına gelir.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].setup =
    "0,20 Ω değerindeki iki direnç seri bağlanarak 8,0 V'luk bir kaynağa bağlanır.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].formulas![0] =
    "R_total = 0,20 Ω";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].formulas![1] =
    "I_total = 4,0 V / 0,20 Ω = 20 A";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].conclusion =
    "Eşit dirençli her paralel koldan 10 A akar.";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "Kapalı bir çevrimdeki gerilim yükselmeleri ile düşümlerinin cebirsel toplamı sıfırdır. Bir çevrim yönü seçin ve " +
    "kutupları tutarlı biçimde kullanın. Yönü tersine çevirmek işaretleri değiştirir, fiziksel çözümü değil. Daha " +
    "büyük bir seri dirençte gerilim düşümü daha büyüktür; çünkü aynı akım her seri bileşenden geçer.";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (seri)";
getSection("concept-kirchhoffs-laws", "cells").formulas![1].expression =
    "C_pack = C_1 + C_2 + ... (paralel)";
getSection("concept-kirchhoffs-laws", "solving-and-limits").paragraphs![0] =
    "Basitleştirilmiş bir model, hücre iç direncini, temas direncini, dönüştürücü verimliliğini, sıcaklık etkilerini, " +
    "geçici davranışı, koruma devrelerini ve bileşen toleranslarını göz ardı edebilir. Yüksek akımlı bir devri maddi " +
    "olarak etkileyebilecek her ihmal edilen davranışı modele dahil edin.";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Direncin sıcaklık katsayısı, bir malzeme ısındıkça veya soğudukça direncin nasıl değiştiğini tahmin eder.";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").paragraphs![0] =
    "Küçük veya orta büyüklükteki bir sıcaklık değişimi için birinci dereceden ilişkiyi kullanın:";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![3] =
    "Katsayının işareti önemlidir; negatif bir değerin mutlak değeriyle değiştirilmesi tahmini tersine çevirir.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "Sabit gerilimle beslenen pozitif TCR'li bir dirençte sıcaklık arttıkça direnç artar ve akım azalma eğilimi gösterir. " +
    "Sabit akım kaynağında aynı direnç artışı gücü artırır.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "Üreticinin belirttiği TCR normalde belirli bir sıcaklık ve direnç aralığı için geçerlidir. Sıcaklık değişimleri, " +
    "malzeme farklılıkları, temaslar, mekanik gerilim ve kendi kendine ısınma gerçek sonucun birinci dereceden modelden " +
    "farklı olmasına neden olabilir.";
corrected.concepts["concept-trigonometry"].description =
    "Trigonometri açıları ve uzunlukları ilişkilendirir; vektörler, faz ilişkileri ve dalga şekilleri için kullanışlıdır.";
getSection("concept-trigonometry", "finding-sides-and-angles").title = "Bilinmeyen kenarları ve açıları bulma";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "komşu kenar = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-trigonometry", "degrees-and-radians").formulas![0].expression = "180° = π radyan";
getSection("concept-heat-capacity", "worked-example").title = "Hesaplama örneği";
getSection("concept-heat-capacity", "worked-example").examples![0].formulas![1] =
    "Q = 0,20 × 4,180 × 50 = 41.800 J";
getSection("concept-heat-capacity", "electrical-heating").title = "Elektrik enerjisiyle ısıtma";
getSection("concept-heat-capacity", "electrical-heating").examples![0].formulas![0] =
    "t = 41.800 J / 100 W = 418 s";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows = [
    ["Uzunluk", "metre", "m"],
    ["Kütle", "kilogram", "kg"],
    ["Zaman", "saniye", "s"],
    ["Sıcaklık", "kelvin", "K"],
    ["Elektrik akımı", "amper", "A"],
    ["Madde miktarı", "mol", "mol"],
    ["Işık şiddeti", "kandela", "cd"]
];

getSection("concept-ohms-law", "worked-examples").examples![0].formulas![0] =
    "I = 4,2 V / 1,0 Ω = 4,2 A";
getSection("concept-ohms-law", "unit-conversions").bullets![2] = "1 mA = 0,001 A";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![1] =
    "E = P × t = 7,2 W × 10 s = 72 J";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "Bobin, enerjiyi saniyede 7,2 joule veya 10 saniyede 72 J hızla ısıya dönüştürür.";
getSection("concept-trigonometry", "right-triangles").formulas = [
    { expression: "sin(θ) = karşı kenar / hipotenüs" },
    { expression: "cos(θ) = komşu kenar / hipotenüs" },
    { expression: "tan(θ) = karşı kenar / komşu kenar" }
];
getSection("concept-trigonometry", "finding-sides-and-angles").formulas = [
    { expression: "θ = sin^-1(karşı kenar / hipotenüs)" },
    { expression: "θ = cos^-1(komşu kenar / hipotenüs)" },
    { expression: "θ = tan^-1(karşı kenar / komşu kenar)" }
];

getSection("concept-heat-flux", "definition").bullets![0] =
    "q'', W/m² cinsinden ısı akısıdır.";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "Ortalama ısı akısı 5.000 W/m² veya 0,5 W/cm²'dir.";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Ortalama ısı akısını yerel bir tepe değerinden ayırt edin; ısıtma eşit olmayabilir.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").title =
    "Tel ölçü sistemleri";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![1] =
    "SWG, tarihî İngiliz tel ve levha kalınlığı sistemi olan Standart Tel Ölçü Sistemidir.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![2] =
    "BWG, tarihsel olarak demir tel, boru ve sac kalınlığı için kullanılan Birmingham Tel "
    + "Ölçü Sistemidir.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.headers![0] =
    "Tel ölçüsü";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").title =
    "Tel ölçüsü, alan ve direnç";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").paragraphs![0] =
    "Direnç, iletkenin uzunluğuna L, kesit alanına A ve malzemenin öz direncine ρ bağlıdır. "
    + "Alan çapın karesiyle değiştiğinden, küçük bir çap farkı önemli bir direnç farkı "
    + "yaratabilir. AWG numarasını üç artırmak, aynı malzeme ve sıcaklık için alanı yaklaşık "
    + "yarıya indirir ve birim uzunluk başına direnci iki katına çıkarır.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![0] =
    "24 AWG veya 24 İngiliz SWG gibi, ölçü sistemini açıkça belirtin.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Akım kapasitesini yalnızca tel ölçüsü numarasına göre değil, ürün verilerine ve "
    + "elektrik kurallarına göre belirleyin.";

getSection("concept-ohms-law", "worked-examples").examples![0].title =
    "Akımı bulun";
getSection("concept-kirchhoffs-laws", "solving-and-limits").paragraphs![0] =
    "Basitleştirilmiş bir model hücre iç direncini, temas direncini, dönüştürücü "
    + "verimliliğini, sıcaklık etkilerini, geçici davranışı, koruma devrelerini ve bileşen "
    + "toleranslarını göz ardı edebilir. Yüksek akımlı bir devreyi önemli ölçüde etkileyen, "
    + "modele alınmamış tüm davranışları dahil edin.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "Üreticinin belirttiği TCR normalde belirli bir sıcaklık ve direnç aralığı için "
    + "geçerlidir. Sıcaklık gradyanları, malzeme değişimleri, temaslar, mekanik gerinim ve "
    + "kendi kendine ısınma, gerçek sonucun birinci dereceden tahminden farklı olmasına neden "
    + "olabilir.";
getSection("concept-trigonometry", "right-triangles").title =
    "Dik üçgenler";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].title =
    "Bir kenarı bulun";
getSection("concept-trigonometry", "waveforms-and-identities").title =
    "Dalga şekilleri ve kullanışlı özdeşlikler";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![2] =
    "Yön veya faz önemli olduğunda işareti ve açının bulunduğu bölgeyi koruyun.";
getSection("concept-heat-capacity", "worked-example").examples![0].title =
    "Suyu ısıtma";
getSection("concept-heat-capacity", "worked-example").examples![0].setup =
    "c = 4.180 J/(kg·K) değerini kullanarak 0,20 kg suyu 20 °C'den 70 °C'ye ısıtın.";
getSection("concept-heat-capacity", "worked-example").examples![0].formulas![1] =
    "Q = 0,20 × 4.180 × 50 = 41.800 J";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[0][2] =
    "1.000 = 10^3";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[1][2] =
    "1.000.000 = 10^6";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[2][2] =
    "0,001 = 10^-3";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[3][2] =
    "0,000001 = 10^-6";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[4][2] =
    "0,000000001 = 10^-9";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[0][2] =
    "3,251 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[0][3] =
    "3,404 mm";
getSection("concept-heat-capacity", "electrical-heating").title =
    "Elektrik gücüyle ısıtma";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "Konveksiyon, h yüzey katsayısını kullanır. Radyasyon, yayma katsayısı ε ve "
    + "Stefan–Boltzmann sabiti σ kullanılarak hesaplanır; radyasyon denklemindeki sıcaklıklar "
    + "kelvin cinsinden mutlak sıcaklıklar olmalıdır.";
getSection("concept-si-system-and-imperial-units", "base-units").table!.headers![0] =
    "Büyüklük";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].conclusion =
    "Alan ve hacim dönüşümlerinde uzunluk dönüşüm çarpanının ilgili kuvveti alınır.";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![3] =
    "Ara sonuçların hassasiyetini korumak için yalnızca en son aşamada yuvarlayın.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").paragraphs![0] =
    "1/0, 2/0, 3/0 ve 4/0 için n = 0, -1, -2 ve -3 kullanın. AWG, evrensel bir güvenli "
    + "akımı değil, iletken boyutunu belirler; akım taşıma kapasitesi ayrıca malzemeye, "
    + "yalıtıma, soğutmaya, kuruluma ve geçerli elektrik kurallarına bağlıdır.";

getSection("concept-ohms-law", "relationship").bullets![2] =
    "R, ohm (Ω) cinsinden ölçülen dirençtir.";
getSection("concept-ohms-law", "rearranged-formulas").bullets![2] =
    "Sıfır Ω direnci ideal bir kısa devredir ve ayrı olarak ele alınmalıdır.";
getSection("concept-ohms-law", "worked-examples").examples![0].setup =
    "4,2 V'luk bir kaynak 1,0 Ω yüke bağlanır.";
getSection("concept-ohms-law", "worked-examples").examples![1].formulas![0] =
    "R = 12 V / 2 A = 6 Ω";
getSection("concept-ohms-law", "worked-examples").examples![1].conclusion =
    "Devre direnci 6 Ω'dur.";
getSection("concept-ohms-law", "worked-examples").examples![2].setup =
    "0,5 A akım 10 Ω dirençten akar.";
getSection("concept-ohms-law", "unit-conversions").bullets![0] =
    "1 kΩ = 1.000 Ω";
getSection("concept-ohms-law", "unit-conversions").bullets![1] =
    "1 MΩ = 1.000.000 Ω";
getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "0,8 Ω'luk bir bobin 3 A taşır.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].setup =
    "İki eşit 0,40 Ω dal 4,0 V'a bağlanır.";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![2] =
    "α, malzemenin 1/°C veya ppm/°C cinsinden ifade edilen sıcaklık katsayısıdır.";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![0] =
    "α = 400 × 10^-6 / °C = 0,0004 / °C";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![1] =
    "ΔT = 100 - 20 = 80 °C";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![2] =
    "R_T = 1,00 [1 + 0,0004 × 80] = 1,032 Ω";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].conclusion =
    "Tahmini direnç 1,032 Ω'dur, bu da 20 °C'deki değerinin yaklaşık %3,2 üzerindedir.";
getSection("concept-si-system-and-imperial-units", "base-units").bullets![1] =
    "Direnç: ohm (Ω).";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").paragraphs![0] =
    "Örneğin, 2,2 kΩ, 2.200 Ω'a, 15 mA ise 0,015 A'ya eşittir. Formül kullanmadan önce "
    + "değerleri uyumlu birimlere dönüştürün.";
corrected.concepts["concept-joule-heating"].summary =
    "Elektrik akımı geçtiğinde elektrik enerjisinin ısıya nasıl dönüştüğü.";

export const presentations = corrected as unknown as CatalogPresentationSet;
