import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./id";

export const messages: SharedMessages = {
    ...draftMessages,
    encyclopedia: { ...draftMessages.encyclopedia, kicker: "Referensi Steam Engine" },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail, availableBy: (date) => `Tersedia paling lambat ${date}`,
        unit: "Satuan",
        evidenceDate: "Tanggal dokumentasi",
        recordStatus: "Status data",
        propertyLabels: {
            ...draftMessages.encyclopediaDetail.propertyLabels,
            boardController: "Papan sirkuit/pengendali",
            ratedCapacity: "Kapasitas nominal",
        },
    },
    ohm: {
        ...draftMessages.ohm,
        descriptionBeforeOhm: "Ini adalah kalkulator",
        joulesLawLinkLabel: "Hukum Joule",
        descriptionAfterLaws: "yang sederhana.",
    },
    catalogManager: {
        ...draftMessages.catalogManager,
        shared: (noun) => `katalog ${noun} bersama`,
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        ratedCapacity: "Kapasitas nominal (mAh)",
        buttonTop: "Ujung menonjol",
        batteryHelp: "Masukkan setidaknya satu batas pengosongan kontinu. Baterai terintegrasi merupakan "
            + "paket baterai internal mod, sehingga dimensi sel individual tidak diperlukan. Dimensi "
            + "sel yang dapat dilepas bersifat nominal; gunakan catatan untuk mencantumkan dimensi "
            + "terukur produk sebagaimana dijual. Jika kedua batas pengosongan ditetapkan dan berbeda "
            + "secara signifikan, kalkulator tetap menggunakan batas hasil perhitungan yang lebih "
            + "aman.",
    },
};
