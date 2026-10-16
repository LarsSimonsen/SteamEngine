import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/tr";
import { messages as juiceDraft } from "./juice/tr";
import { messages as tcrDraft } from "./tcr/tr";
import { messages as wireWizDraft } from "./wirewiz/tr";

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    imperial: "İngiliz ölçü birimleri",
    legLength: "Bağlantı teli uzunluğu",
    legPowerLoss: "Bağlantı tellerindeki güç kaybı",
    wireLengthWarning: "Bağlantı tellerinden sonra coil için yeterli tel kalmamıştır.",
    description: "Sarım sayısını, direnci ve ısıyı tahmin etmek için telinizi ve yapım "
        + "parametrelerini seçin.",
    buildDetails: "Yapım ayrıntıları",
    targetHeatFlux: "Hedef ısı akısı",
};

export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    amount: "Hazırlamak istediğiniz miktar",
    nicStrengthIn: "Nikotin gücü",
    flavoring: "Aroma",
    flavor: "Aroma",
    nicBase: "Nikotin bazı",
    nicStrength: "Nikotin gücü",
    targetLabel: "Hedeflediğiniz değer",
    safetyText: "Konsantre nikotin çocuklara, evcil hayvanlara ve yetişkinlere zarar verebilir veya onları "
        + "öldürebilir. Kendi e-sıvınızı karıştırmadan önce riskleri nasıl azaltacağınızı öğrenin ve hesaplamaları "
        + "başka bir araçla kontrol edin.",
    flavorName: "Aroma",
    flavorPercentage: "Aroma yüzdesi",
    flavorVg: "Aroma VG bazlıdır",
    load: "Yükle",
    adjustMix: "Hedef nikotin derişimini, VG veya PG içeriğini ya da aroma miktarını azaltmanız "
        + "gerekebilir. Alternatif olarak daha yüksek nikotin derişimli bir baz veya farklı "
        + "VG/PG oranına sahip bir nikotin bazı kullanın. Lütfen tüm sayılar sıfırdan büyük "
        + "olana kadar ayarlarınızı düzenleyin.",
    targetNicWarning: "Hedef nikotin derişiminiz, nikotin bazınızın derişiminden yüksek. Daha yüksek "
        + "nikotin derişimli bir baz kullanmalı veya hedef nikotin derişiminizi düşürmelisiniz.",
    batch: "Karışım partisi",
};

export const tcr: CalculatorRouteMessages = {
    ...tcrDraft,
    wireWizard: "Wire Wizard",
    eyebrow: "Sıcaklık kontrolü için tel hesaplayıcısı",
    title: "Direncin sıcaklık katsayısı",
    baseFor: "Temel direnç:",
};

export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft,
    title: "Wire Wizard",
    export: "Dışa aktar",
    import: "İçe aktar",
    legLength: "Bağlantı teli uzunluğu",
    clapton: "Clapton",
    strandWire: "Tekil tel",
    resetPersistence: "Kaydedilen verileri değiştirmek için sıfırlama yapın veya geçerli bir tasarımı içe "
        + "aktarın.",
    wraps: "Sarım sayısı",
    sourceFactor: "Oluşturduğunuz telin bu sıcaklıktaki direnç faktörü:",
    matchTemperature: "Aynı sonucu elde etmek için modda seçilen malzeme:",
    adjustTemperature: "sıcaklık ayarını yaklaşık şu değere getirin:",
    vapingRange: "elektronik sigara kullanım sıcaklığı aralığında",
    sourceFactorSuffix: "olarak hesaplanmıştır.",
};
