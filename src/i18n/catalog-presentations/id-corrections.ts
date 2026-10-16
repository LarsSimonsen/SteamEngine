import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./id";

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
        throw new Error("Indonesian catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "relationship").title = "Hubungan";
corrected.concepts["concept-joule-heating"].displayName = "Pemanasan Joule";
corrected.concepts["concept-joule-heating"].summary =
    "Bagaimana arus listrik mengubah energi listrik menjadi panas.";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "Coil mengubah energi menjadi panas dengan daya 7,2 W; selama 10 detik, energi yang diubah adalah 72 J.";
getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "Istilah dasar membuat diagram rangkaian lebih mudah dipahami:";
getSection("concept-kirchhoffs-laws", "current-law").formulas![1].expression =
    "Σ I_in = Σ I_out";
getSection("concept-kirchhoffs-laws", "voltage-law").title = "Hukum Tegangan Kirchhoff";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").formulas![0].expression =
    "R_T = R_0 [1 + α (T - T_0)]";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![0] =
    "α = 400 × 10^-6 / °C = 0,0004 / °C";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![1] =
    "ΔT = 100 - 20 = 80 °C";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Koefisien suhu resistansi menjelaskan bagaimana resistansi berubah ketika material memanas atau mendingin.";
getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = sisi berlawanan / sisi miring";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = sisi berdekatan / sisi miring";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = sisi berlawanan / sisi berdekatan";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "Sisi miring sepanjang 10 cm membentuk sudut 30°.";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(sisi berlawanan / sisi miring)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(sisi berdekatan / sisi miring)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(sisi berlawanan / sisi berdekatan)";
getSection("concept-heat-capacity", "basic-relationships").formulas![0].expression = "C = Q / ΔT";
getSection("concept-heat-capacity", "electrical-heating").title = "Pemanasan listrik";
getSection("concept-heat-capacity", "object-and-material").formulas![0].expression =
    "C_total = Σ m_i × c_i";
getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' adalah kepadatan fluks kalor, diukur dalam W/m².";
getSection("concept-heat-flux", "conduction").formulas![0].expression =
    "q'' = -k × ΔT / L";
getSection("concept-heat-flux", "conduction").formulas![1].expression =
    "Q_dot = k × A × (T_hot - T_cold) / L";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Fluks kalor adalah laju perpindahan, bukan suhu; gunakan kapasitas kalor untuk menghitung perubahan suhu.";

getSection("concept-ohms-law", "worked-examples").title = "Contoh perhitungan";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "Hukum Ohm digabungkan dengan hubungan daya P = V × I. Daya P diukur dalam watt (W). Untuk sumber 4,2 V dan " +
    "beban 1,0 Ω, daya idealnya adalah 17,64 W. Komponen memerlukan kemampuan membuang panas dan margin keamanan " +
    "yang cukup agar panas yang dihasilkan dapat dilepaskan dengan aman.";
getSection("concept-ohms-law", "unit-conversions").paragraphs![0] = "Jaga konsistensi satuan sebelum menghitung:";
getSection("concept-ohms-law", "limits").paragraphs![0] =
    "Hukum Ohm adalah model yang diidealkan. Komponen nyata dapat bersifat non-ohmik: resistansinya dapat berubah " +
    "seiring suhu, tegangan, arus, frekuensi, atau kondisi pengoperasian. Untuk rangkaian seri dan paralel, gunakan " +
    "hukum Kirchhoff bersama dengan hukum Ohm.";
getSection("concept-joule-heating", "heating-power").title = "Daya pemanasan";
getSection("concept-joule-heating", "worked-example").title = "Contoh perhitungan";
getSection("concept-joule-heating", "what-affects-heating").title = "Faktor yang memengaruhi pemanasan";
getSection("concept-joule-heating", "what-affects-heating").bullets![0] =
    "Pada resistansi konstan, melipatgandakan arus akan menghasilkan daya pemanasan empat kali lebih besar.";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Periksa apakah komponen, sambungan, dan insulasi dapat menangani arus dan daya yang diharapkan. Gunakan margin " +
    "keamanan yang sesuai karena komponen sebenarnya dapat memanas secara tidak merata dan resistansi dapat berubah " +
    "seiring suhu. Baterai dan sumber daya juga memiliki batasan arus kontinu.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![0] =
    "Simpul adalah sekumpulan konduktor yang terhubung tanpa komponen di antaranya.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![1] =
    "Cabang adalah jalur arus antara dua simpul.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![2] =
    "Loop adalah lintasan tertutup yang kembali ke titik awalnya.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![3] =
    "Rangkaian seri menyediakan satu jalur arus melalui komponen.";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Jika arus 8 A masuk ke sebuah simpul dan salah satu cabang membawa 3 A keluar, cabang lainnya harus membawa " +
    "total 5 A keluar. Tentukan arah arus sebelum menghitung; hasil negatif berarti arus sebenarnya mengalir " +
    "berlawanan dengan arah yang diasumsikan.";
getSection("concept-kirchhoffs-laws", "cells").title = "Sel seri dan paralel";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "Sel paralel mempertahankan tegangan tetap, sementara kapasitas dan arus yang tersedia kira-kira bertambah.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").title = "Menganalisis rangkaian nyata";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![0] =
    "Tentukan tegangan simpul, arus cabang, dan asumsi arah arus.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![1] =
    "Terapkan KCL pada simpul independen dan KVL pada loop independen.";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").title = "Contoh perhitungan";
getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "Untuk sudut θ, sisi berlawanan berada di seberang sudut tersebut, sisi berdekatan menyentuh sudut tersebut " +
    "tetapi bukan sisi miring, dan sisi miring berhadapan dengan sudut siku-siku. SOH-CAH-TOA adalah alat bantu " +
    "mengingat: sinus = sisi berlawanan dibagi sisi miring, kosinus = sisi berdekatan dibagi sisi miring, dan " +
    "tangen = sisi berlawanan dibagi sisi berdekatan.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].title = "Menentukan panjang sisi";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "sisi berlawanan = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "sisi berdekatan = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-heat-capacity", "worked-example").title = "Contoh perhitungan";
getSection("concept-heat-capacity", "object-and-material").title = "Benda dan material";
getSection("concept-heat-flux", "worked-example").title = "Contoh perhitungan";

const siBaseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siBaseUnits.rows[0][1] = "meter";
siBaseUnits.rows[0][2] = "m";
siBaseUnits.rows[1][1] = "kilogram";
siBaseUnits.rows[1][2] = "kg";
siBaseUnits.rows[2][1] = "sekon";
siBaseUnits.rows[2][2] = "s";
siBaseUnits.rows[4][2] = "A";
siBaseUnits.rows[5][1] = "mol";
siBaseUnits.rows[5][2] = "mol";
siBaseUnits.rows[6][2] = "cd";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Hukum arus dan tegangan Kirchhoff menyatakan kekekalan muatan pada simpul dan kekekalan energi di dalam loop tertutup.";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Jika arus 8 A masuk ke sebuah simpul dan 3 A keluar melalui salah satu cabang, cabang lainnya harus membawa total "
    + "5 A keluar. Tentukan arah arus sebelum menyelesaikan perhitungan; hasil negatif berarti arus sebenarnya mengalir "
    + "berlawanan dengan arah yang diasumsikan.";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "Jumlah aljabar kenaikan dan penurunan tegangan di sepanjang loop tertutup adalah nol. Pilih satu arah putaran dan "
    + "pertahankan polaritas yang konsisten. Membalikkan arah mengubah tanda, bukan solusi fisik. Resistansi seri yang lebih "
    + "besar menghasilkan penurunan tegangan yang lebih besar karena arus yang sama mengalir melalui setiap komponen seri.";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "Sel yang disusun seri menjumlahkan tegangan, sedangkan kapasitas dalam ampere-jam tetap sama dengan satu sel yang setara.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![2] =
    "Hubungkan tegangan pada resistor dengan arus yang melaluinya menggunakan V = I × R.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").paragraphs![0] =
    "Model yang disederhanakan mungkin menghilangkan resistansi internal sel, resistansi kontak, efisiensi konverter, efek "
    + "suhu, perilaku transien, rangkaian proteksi, dan toleransi komponen. Sertakan setiap perilaku yang dihilangkan yang "
    + "secara signifikan memengaruhi rangkaian berarus tinggi.";

getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "Untuk resistansi dengan TCR positif yang diberi tegangan konstan, kenaikan suhu meningkatkan resistansi dan cenderung "
    + "mengurangi arus. Untuk sumber arus konstan, kenaikan resistansi yang sama meningkatkan daya.";
getSection("concept-trigonometry", "degrees-and-radians").paragraphs![0] =
    "Kalkulator harus berada pada mode sudut yang benar. Menggunakan mode derajat untuk nilai dalam radian, atau sebaliknya, "
    + "menghasilkan hasil yang berbeda. Satu putaran penuh adalah 360° atau 2π radian.";

getSection("concept-heat-capacity", "electrical-heating").examples![0].formulas![0] =
    "t = 41.800 J / 100 W = 418 s";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "Selama peleburan atau pendidihan, energi yang diberikan dapat mengubah fase material tanpa mengubah suhunya. L adalah "
    + "kalor laten spesifik dalam J/kg.";

corrected.concepts["concept-heat-flux"].displayName = "Kepadatan fluks kalor";
corrected.concepts["concept-heat-flux"].description =
    "Kepadatan fluks kalor menggambarkan laju perpindahan kalor per satuan luas, terlepas dari jumlah total material yang "
    + "menyimpan kalor.";
getSection("concept-heat-flux", "worked-example").examples![0].title =
    "Rata-rata kepadatan fluks kalor pemanas";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "Rata-rata kepadatan fluks kalor adalah 5.000 W/m², atau 0,5 W/cm².";
getSection("concept-heat-flux", "conduction").bullets![3] =
    "Tanda minus menunjukkan bahwa kalor berpindah dari suhu yang lebih tinggi ke suhu yang lebih rendah.";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "Konveksi menggunakan koefisien konveksi h. Radiasi menggunakan emisivitas ε dan konstanta Stefan–Boltzmann σ; suhu "
    + "dalam persamaan radiasi harus berupa suhu mutlak dalam kelvin.";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Bedakan kepadatan fluks kalor rata-rata dari puncak lokal; pemanasan mungkin tidak merata.";

getSection("concept-si-system-and-imperial-units", "base-units").title = "Satuan dasar SI";
siBaseUnits.headers[0] = "Kuantitas";
siBaseUnits.headers[1] = "Satuan SI";
siBaseUnits.headers[2] = "Simbol";

const gaugeComparison = getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!;
gaugeComparison.rows[0][1] = "2,588 mm";
gaugeComparison.rows[0][2] = "3,251 mm";
gaugeComparison.rows[0][3] = "3,404 mm";
gaugeComparison.rows[1][1] = "0,8128 mm";
gaugeComparison.rows[1][2] = "0,9144 mm";
gaugeComparison.rows[1][3] = "0,8890 mm";
gaugeComparison.rows[2][1] = "0,2540 mm";
gaugeComparison.rows[2][2] = "0,3150 mm";
gaugeComparison.rows[2][3] = "0,3048 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Angka gauge yang lebih besar umumnya berarti diameter yang lebih kecil; ukuran di atas gauge 0 ditulis sebagai 00, "
    + "000, atau 0000.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![0].expression =
    "d_inch = 0,005 × 92^((36 - n) / 39)";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![1].expression =
    "d_mm = 0,127 × 92^((36 - n) / 39)";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![0] =
    "Sebutkan sistemnya, misalnya 24 AWG atau 24 British SWG.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![1] =
    "Sertakan diameter nominal dalam milimeter jika sistem dapat tertukar.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![3] =
    "Untuk konduktor serabut, sertakan konstruksi untaian jika fleksibilitas dan diameter keseluruhan penting.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Hukum arus dan tegangan Kirchhoff menjelaskan kekekalan muatan pada simpul dan energi pada loop tertutup.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8,0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Koefisien suhu resistansi menjelaskan bagaimana resistansi suatu komponen berubah terhadap suhu.";
corrected.concepts["concept-heat-flux"].displayName = "Rapat fluks panas";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Tentukan kemampuan hantar arus berdasarkan data produk dan peraturan kelistrikan, bukan hanya nomor ukuran kawat.";

getSection("concept-kirchhoffs-laws", "current-law").formulas![1].expression = "Σ I_in = Σ I_out";
getSection("concept-joule-heating", "worked-example").examples![0].title = "Contoh perhitungan";

corrected.concepts["concept-heat-capacity"].sections[1].examples![0].title =
    "Memanaskan air";
corrected.concepts["concept-heat-capacity"].sections[1].examples![0].setup =
    "Panaskan 0,20 kg air dari 20 °C menjadi 70 °C menggunakan c = 4180 J/(kg·K).";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].sections[2].paragraphs![0] =
    "Nilai ini bersifat nominal. Toleransi produk, pelapisan, isolasi, dan konstruksi kawat "
    + "serabut dapat mengubah diameter terukur atau diameter keseluruhan.";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].sections[0].bullets![1] =
    "SWG adalah Standard Wire Gauge, sistem ukuran kawat dan ketebalan lembaran Inggris yang "
    + "bersejarah.";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].sections[2].table!.headers![0] =
    "Nomor gauge";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].sections[3].paragraphs![0] =
    "Resistansi bergantung pada panjang konduktor L, luas penampang A, dan resistivitas "
    + "material ρ. Karena luas berubah sebanding dengan kuadrat diameter, perbedaan diameter "
    + "yang kecil dapat menimbulkan perbedaan resistansi yang besar. Dalam AWG, menaikkan "
    + "nomor gauge sebanyak tiga kira-kira mengurangi luas menjadi separuh dan menggandakan "
    + "resistansi per satuan panjang untuk material dan suhu yang sama.";
corrected.concepts["concept-heat-flux"].sections[2].bullets![1] =
    "ΔT adalah perbedaan suhu antara kedua sisi lapisan.";
corrected.concepts["concept-temperature-coefficient-of-resistance"].sections[3].paragraphs![1] =
    "TCR pabrikan biasanya berlaku pada rentang suhu dan resistansi yang ditentukan. Gradien "
    + "suhu, perubahan material, kontak, regangan mekanis, dan pemanasan sendiri dapat membuat "
    + "hasil nyata berbeda dari perkiraan orde pertama.";
corrected.concepts["concept-heat-capacity"].sections[4].paragraphs![1] =
    "Persamaan sederhana mengasumsikan kapasitas kalor spesifik kurang lebih konstan. "
    + "Kehilangan panas, konveksi, radiasi, penguapan, resistansi kontak, dan suhu yang tidak "
    + "merata dapat membuat hasil nyata berbeda dari hasil ideal.";
corrected.concepts["concept-joule-heating"].sections[1].examples![0].title =
    "Beban resistif";
corrected.concepts["concept-si-system-and-imperial-units"].sections[3].bullets![0] =
    "1 lb ≈ 0,45359237 kg.";
corrected.concepts["concept-trigonometry"].sections[1].examples![0].conclusion =
    "Gunakan fungsi trigonometri invers jika panjang sisinya diketahui.";
corrected.concepts["concept-joule-heating"].sections[2].bullets![0] =
    "Pada resistansi konstan, menggandakan arus menghasilkan daya pemanasan empat kali "
    + "lipat.";

export const presentations = corrected as unknown as CatalogPresentationSet;
