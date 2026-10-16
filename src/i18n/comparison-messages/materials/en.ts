import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "Compare materials",
    description: "Compare two materials from the Steam Engine catalog side by side.",
    chooseMaterial: "Choose a material",
    firstMaterial: "Select material A",
    secondMaterial: "Select material B",
    swap: "Swap materials",
    identity: "Identity",
    name: "Name",
    electricalProperties: "Electrical properties",
    temperatureBehavior: "Temperature behavior",
    physicalProperties: "Physical properties",
    temperatureControlProfile: "Temperature-control profile",
    profileAvailable: "Catalog profile available",
    profileUnavailable: "No catalog profile",
    thermalConductivity: "Thermal conductivity",
    invalidSelection: "A material referenced by this shared link could not be found in the catalog.",
    sameSelection: "You selected the same material on both sides.",
    capabilityDiffers:
        "Only one selected material has a catalog temperature-control profile. Check device support and use the " +
        "profile for the exact material.",
    noSafetyNote: "No material-specific safety note is recorded for this entry.",
};
