import { messages as modrangeDraft } from "./modrange/id";
import { messages as converterDraft } from "./converter/id";
import { messages as battDraft } from "./batt/id";
import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/id";
import { messages as juiceDraft } from "./juice/id";
import { messages as wireWizDraft } from "./wirewiz/id";

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    setupParallel4: "Empat coil (paralel)",
    setupSeries4: "Empat coil (seri)",
    setupSeriesParallel4: "Empat coil (seri-paralel)",
    description: "Pilih kawat dan parameter konstruksi untuk memperkirakan jumlah lilitan, resistansi, "
        + "dan panas.",
    legLength: "Panjang kaki kawat",
    legPowerLoss: "Daya hilang pada kaki kawat",
    wireLengthWarning: "Setelah kaki kawat, tidak tersisa cukup kawat untuk coil.",
};
export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    description: "Masukkan sifat basis nikotin Anda dan komposisi campuran yang diinginkan.",
    ingredient: "Bahan",
    safetyText: "Nikotin pekat dapat membahayakan atau membunuh anak-anak, hewan peliharaan, dan orang dewasa. "
        + "Sebelum meracik liquid sendiri, pelajari cara mengurangi risikonya dan periksa hitungan dengan alat lain.",
};
export const wirewiz: CalculatorRouteMessages = { ...wireWizDraft, legLength: "Panjang kaki kawat" };

export const batt: CalculatorRouteMessages = {
    ...battDraft,
    matchedCells: "Gunakan sel identik yang cocok satu sama lain serta memiliki usia dan kondisi yang "
        + "sama. Pembagian arus dimodelkan secara ideal; sel terlemah membatasi kemampuan paket "
        + "baterai.",
    pack: "Paket baterai",
    currentPerCell: "Perkiraan arus per sel",
    batteryPresets: "Prasetel sel",
    batteryPreset: "Prasetel sel",
    batteryIntro: "Pilih sel yang digunakan di seluruh paket baterai, atau masukkan nilai per sel di "
        + "bawah.",
    batteryValues: "Sel dan paket baterai",
    unregulated: "Mod tanpa regulasi",
    estimatedRuntime: "Perkiraan waktu pengoperasian",
    continuousRuntime: "Waktu pengoperasian kontinu",
    cellSelection: "Pemilihan sel",
    batteryConfiguration: "Konfigurasi baterai",
    singleCell: "1S — Sel tunggal",
    customConfiguration: "Konfigurasi khusus",
    cellsInSeries: "Sel dalam rangkaian seri",
    parallelStrings: "Cabang paralel",
    cells: "sel",
    cell: "sel",
};

export const converter: CalculatorRouteMessages = {
    ...converterDraft,
    needleGauge: "BWG (gauge jarum)",
};

export const modrange: CalculatorRouteMessages = {
    ...modrangeDraft,
    medianResistance: "Titik peralihan batas arus/tegangan",
    median: "Titik peralihan batas arus/tegangan",
    optimalResistance: "Panduan resistansi",
    sweetSpot: "Titik tengah rentang atas",
    voltageLimitRequires: "batas tegangan memerlukan",
};
