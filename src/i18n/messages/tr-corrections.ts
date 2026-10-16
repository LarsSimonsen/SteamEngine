import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./tr";

const catalogNouns: Readonly<Record<string, string>> = {
    material: "malzeme", materials: "malzemeler",
    battery: "pil", batteries: "piller",
    mod: "mod", mods: "modlar",
};

const localizeCatalogNoun = (noun: string): string => catalogNouns[noun.toLowerCase()] ?? noun;

export const messages: SharedMessages = {
    ...draftMessages,
    navigation: {
        ...draftMessages.navigation,
        home: "Steam Engine ana sayfası",
    },
    home: {
        ...draftMessages.home,
        tools: {
            ...draftMessages.home.tools,
            wirewiz: {
                ...draftMessages.home.tools.wirewiz,
                label: "Wire Wizard",
            },
            juice: {
                ...draftMessages.home.tools.juice,
                description: "Bir tarifi hedef nikotin derişiminize ve VG/PG oranına göre karıştırın.",
            },
        },
    },
    encyclopedia: {
        ...draftMessages.encyclopedia,
        kicker: "Steam Engine referansı",
        entriesLabel: (arg0) => arg0
            + " kayıt",
        browseCategory: (arg0, arg1) => arg0
            + " kategorisine göz atın ("
            + arg1
            + " kayıt)",
    },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        breadcrumb: "Gezinti yolu",
        availableBy: (date) => `En geç ${date} tarihinde kullanıma sunuldu`,
        catalogImplication: "Katalog üzerindeki etkisi",
        propertyLabels: {
            ...draftMessages.encyclopediaDetail.propertyLabels,
            resistivity: "20 °C'de elektriksel öz direnç",
        },
        introduced: (arg0) => "Tanıtım tarihi: "
            + arg0,
        reviewed: (arg0) => "İnceleme tarihi: "
            + arg0,
        temperatureResistanceCurve: "Sıcaklığa bağlı direnç eğrisi",
        rewrapExplanation: "Etiket, başka bir üreticinin hücresini yeniden ambalajlayarak satan bir "
            + "markaya ait kabul edilir; asıl hücre üreticisi yalnızca ambalajdan çıkarılmaz.",
        oldBatteryWarning: "Bu eski bir pil modelidir ve muhtemelen yerini daha uygun modeller almıştır.",
        unknownBatteryIntroductionNotice:
            "Bu hücrenin piyasaya çıkış tarihi bilinmediğinden yaşı ve yerini daha yeni "
            + "modellerin alıp almadığı belirlenemiyor.",
        noAuthenticityAssessment: "Bu kayda özgü bir orijinallik değerlendirmesi kaydedilmemiştir.",
    },
    theme: {
        ...draftMessages.theme,
        switchToLight: "Açık moda geç",
    },
    catalogManager: {
        ...draftMessages.catalogManager,
        manage: (arg0) => "Yönet: "
            + localizeCatalogNoun(arg0),
        resetSavedMessage: "Bu yalnızca kayıtlı verileri kaldırır. Devam edilsin mi?",
        customItemsDescription: (arg0) => "Özel "
            + localizeCatalogNoun(arg0)
            + " hesaplayıcı seçim listelerinde her zaman gösterilir.",
        shared: (noun) => draftMessages.catalogManager.shared(localizeCatalogNoun(noun)),
        close: (noun) => draftMessages.catalogManager.close(localizeCatalogNoun(noun)),
        choose: (noun) => draftMessages.catalogManager.choose(localizeCatalogNoun(noun)),
        builtIn: (noun) => draftMessages.catalogManager.builtIn(localizeCatalogNoun(noun)),
        visibility: (noun) => draftMessages.catalogManager.visibility(localizeCatalogNoun(noun)),
        custom: (noun) => draftMessages.catalogManager.custom(localizeCatalogNoun(noun)),
        newCustom: (noun) => draftMessages.catalogManager.newCustom(localizeCatalogNoun(noun)),
        noneYet: (noun) => draftMessages.catalogManager.noneYet(localizeCatalogNoun(noun)),
        resetSaved: (noun) => draftMessages.catalogManager.resetSaved(localizeCatalogNoun(noun)),
        savedReset: (noun) => draftMessages.catalogManager.savedReset(localizeCatalogNoun(noun)),
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        editCustom: (arg0) => "Özel kaydı düzenle: "
            + localizeCatalogNoun(arg0),
        clone: (arg0) => "Klonla: "
            + arg0,
        properties: (arg0) => localizeCatalogNoun(arg0)
            + " özellikleri",
        model: "Model",
        buttonTop: "Düğme başlı",
        batteryHelp: "En az bir sürekli deşarj limiti girin. Entegre piller modun içindeki pil "
            + "paketleri olduğundan ayrı hücre boyutları gerekli değildir. Çıkarılabilir "
            + "hücre boyutları nominaldir; satıldığı hâliyle ölçülen boyutları notlara yazın. "
            + "Her iki deşarj limiti de ayarlandığında, aralarında önemli bir fark varsa "
            + "hesaplayıcı türetilen daha güvenli limiti kullanmaya devam eder.",
        resistivity: "Öz direnç (Ω mm²/m)",
        normalizationInterpolated: " 20 °C noktası enterpole edildi ve eğri normalleştirildi.",
        normalizationExtrapolated: " 20 °C noktası ekstrapolasyonla hesaplandı ve eğri normalleştirildi.",
        normalizationExisting: " TFR eğrisi 20 °C'de normalleştirildi.",
        newCustom: (noun) => draftMessages.catalogEditor.newCustom(localizeCatalogNoun(noun)),
        save: (noun) => draftMessages.catalogEditor.save(localizeCatalogNoun(noun)),
        saved: (noun) => draftMessages.catalogEditor.saved(localizeCatalogNoun(noun)),
        sizeCodePlaceholder: "İsteğe bağlı, ör. 18650",
        wrapperColorPlaceholder: "İsteğe bağlı, açıklayıcı",
        markingsPlaceholder: "İsteğe bağlı; her satıra ambalajdaki bir işaret",
        currentWithCRatingPlaceholder: "C değeri belirtilmişse isteğe bağlı",
        cRatingWithCurrentPlaceholder: "Akım belirtilmişse isteğe bağlı",
        heatCapacity: "Özgül ısı kapasitesi (J/g·K)",
    },
    ohm: {
        ...draftMessages.ohm,
        joulesLawLinkLabel: "Joule yasası",
    },
};
