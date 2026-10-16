import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "素材を比較",
    description: "Steam Engineカタログの2つの素材を並べて比較します。",
    chooseMaterial: "素材を選択",
    firstMaterial: "1つ目の素材",
    secondMaterial: "2つ目の素材",
    swap: "素材を入れ替える",
    identity: "識別情報",
    name: "名称",
    electricalProperties: "電気的特性",
    temperatureBehavior: "温度特性",
    physicalProperties: "物理的特性",
    temperatureControlProfile: "温度管理プロファイル",
    profileAvailable: "カタログプロファイルあり",
    profileUnavailable: "カタログプロファイルなし",
    thermalConductivity: "熱伝導率",
    invalidSelection: "この共有リンクで指定された素材がカタログに見つかりませんでした。",
    sameSelection: "両側で同じ素材が選択されています。",
    capabilityDiffers:
        "選択した素材のうち、カタログに温度管理プロファイルがあるのは一方だけです。デバイスの対応状況を確認し、" +
        "正確な素材のプロファイルを使用してください。",
    noSafetyNote: "この項目には素材固有の安全上の注意は登録されていません。",
};
