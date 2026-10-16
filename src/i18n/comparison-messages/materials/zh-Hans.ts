import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "比较材料",
    description: "并排比较 Steam Engine 目录中的两种材料。",
    chooseMaterial: "选择材料",
    firstMaterial: "第一种材料",
    secondMaterial: "第二种材料",
    swap: "交换材料",
    identity: "标识",
    name: "名称",
    electricalProperties: "电气属性",
    temperatureBehavior: "温度特性",
    physicalProperties: "物理属性",
    temperatureControlProfile: "温控配置文件",
    profileAvailable: "目录配置文件可用",
    profileUnavailable: "无目录配置文件",
    thermalConductivity: "导热系数",
    invalidSelection: "此共享链接引用的材料未在目录中找到。",
    sameSelection: "两侧选择了相同的材料。",
    capabilityDiffers: "只有一种所选材料具有目录温控配置文件。请检查设备支持情况，并使用与确切材料对应的配置文件。",
    noSafetyNote: "此条目未记录材料特定的安全说明。",
};
