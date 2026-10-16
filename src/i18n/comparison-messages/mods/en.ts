import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "Platform",
    powerLimits: "Power limits",
    atomizerRange: "Atomizer range",
    category: "Category",
    batteryConfiguration: "Battery configuration",
    baseProfile: "Base profile",
    invalidSelection: "A mod or board referenced by this shared link could not be found in the catalog.",
    sameSelection: "You selected the same mod or board on both sides.",
    platformDiffers:
        "These entries differ in category or battery configuration. Confirm that the " +
        "comparison fits your intended use.",
    platformUnknown:
        "Some platform details are unknown, so category and battery-configuration " +
        "compatibility cannot be fully compared.",
    noSafetyFindings: "No entry-specific safety findings are recorded.",
};
