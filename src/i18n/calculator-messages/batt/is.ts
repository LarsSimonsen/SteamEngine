/* Machine-materialized draft. Human review may edit string values. */

export const messages = { "eyebrow": "Reiknivél fyrir rafhlöðunotkun og öryggi", "title": "Rafhlöðunotkun", "description": "Áætlaðu afl uppgufarans, straumnotkun rafhlöðunnar og tiltækt straumsvigrúm fyrir stýrð og óstýrð rafrettutæki.", "manage": "Stjórna rafhlöðum", "reset": "Endurstilla", "calculating": "Reiknar…", "device": "Tæki", "operatingMode": "Vinnsluhamur", "powerRegulated": "Aflstýrt rafrettutæki", "voltageRegulated": "Spennustýrt rafrettutæki", "currentRegulated": "Straumstýrt", "bypass": "Hjáveita", "notVerified": "óstaðfest", "unregulated": "Óstýrt rafrettutæki", "atomizerResistance": "Viðnám uppgufarans", "outputPower": "Úttaksafl", "outputVoltage": "Útgangsspenna", "efficiency": "Skilvirkni", "batteryPresets": "Forstilling rafhlöðu", "batteryIntro": "Veldu innbyggða rafhlöðuforstillingu eða sláðu inn eigin gildi hér að neðan.", "batteryPreset": "Forstilling rafhlöðu", "customValues": "Sérsniðin gildi", "detailsBattery": "Upplýsingar um þessa rafhlöðu", "customBattery": "Sérsniðin rafhlaða", "selectPreset": "Veldu forstillingu hér", "batteryValues": "Rafhlöðugildi", "batteryVoltage": "Spenna rafhlöðu", "cellVoltageNearCutoff": "Spenna sellu nálægt frátengingarmörkum", "regulatedVoltageHelp": "Notaðu spennu hverrar sellu undir álagi nálægt frátengingarmörkum modsins. 3,2 V er varfærnislegt upphafsgildi; notaðu tæknilýsingu tækisins þegar hún er tiltæk.", "unregulatedVoltageHelp": "Notaðu spennu fullhlaðinnar rafhlöðu fyrir tilfellið með hæsta straumnum. Ekki telja spennufall sem öryggisbil.", "voltage": "Spenna", "capacity": "Afkastageta", "maximumCurrent": "Hámarksstraumur", "cRating": "C-gildi", "nominalVoltage": "Nafnspenna", "batteryHelp": "Nafnspenna og afkastageta ákvarða áætlaða geymda orku og samfelldan notkunartíma. Þær hafa ekki áhrif á straummörk.", "results": "Niðurstöður", "enterValue": "Sláðu inn gildi fyrir", "resultsUseLastValidValues": "Niðurstöður nota síðasta gilda gildið.", "atomizerOutput": "Úttaksafl uppgufarans", "batteryDrain": "Straumnotkun rafhlöðunnar", "batterySafety": "Öryggi rafhlöðu", "effectiveMaximumCurrent": "Virkur hámarksstraumur", "currentHeadroom": "Straumsvigrúm", "estimatedRuntime": "Áætlaður notkunartími", "nominalEnergy": "Nafnorka", "continuousRuntime": "Samfelldur notkunartími", "safe": "Áætluð straumnotkun er innan straummarka rafhlöðunnar.", "caution": "Minna en 20% straumsvigrúms er eftir.", "danger": "Áætluð straumnotkun fer yfir virk hámarksstraummörk rafhlöðunnar.", "runtimeHelp": "Þetta einfalda mat gerir ráð fyrir samfelldu afli miðað við reiknaða orku rafhlöðunnar. Raunverulegur notkunartími er breytilegur eftir stöðvunarspennu, spennufalli, aldri rafhlöðufrumunnar, skilvirkni tækisins og notkun með hléum.", "voltageLabel": "Spenna", "currentLabel": "Straumur", "powerLabel": "Afl", "cellSelection": "Cell selection", "batteryConfiguration": "Battery configuration", "singleCell": "1S — Single cell", "customConfiguration": "Custom configuration", "cellsInSeries": "Cells in series", "parallelStrings": "Parallel strings", "cells": "cells", "cell": "cell", "matchedCells": "Use identical, matched cells of the same age and condition. Current sharing is idealized; the weakest cell limits the pack.", "pack": "Battery pack", "currentPerCell": "Estimated current per cell" } as const;
Object.assign(messages, {
    deviceBatterySetup: "Rafhlöðuuppsetning tækis",
    boardInputProfile: "Inntakssnið stýrispjalds",
    batteryPresets: "Forstilling sellu",
    batteryPreset: "Forstilling sellu",
    cellSelection: "Val á sellu",
    batteryIntro: "Veldu sellugerðina sem er notuð í öllum rafhlöðupakkanum eða sláðu inn gildi fyrir hverja "
        + "sellu hér að neðan.",
    batteryValues: "Sella og rafhlöðupakki",
    batteryConfiguration: "Uppsetning rafhlaðna",
    singleCell: "1S — Ein sella",
    customConfiguration: "Sérsniðin uppsetning",
    cellsInSeries: "Sellur í raðtengingu",
    parallelStrings: "Samhliða greinar",
    cells: "sellur",
    cell: "sella",
    pack: "Rafhlöðupakki",
    currentPerCell: "Áætlaður straumur í hverri sellu",
    matchedCells: "Notaðu eins, samstæðar sellur sem eru jafn gamlar og í sama ástandi. Við útreikning "
        + "straumskiptingar er miðað við kjöraðstæður; veikasta sellan takmarkar rafhlöðupakkann.",
    runtimeHelp: "Þetta mat miðast við kjöraðstæður og gerir ráð fyrir að rafhlaðan skili reiknuðu afli "
        + "samfellt. Raunverulegur notkunartími er breytilegur eftir frátengingarspennu, spennufalli, aldri "
        + "sellunnar, eigin orkunotkun tækisins og notkun með hléum.",
    regulatedVoltageHelp: "Notaðu spennu hverrar sellu undir álagi nálægt frátengingarmörkum rafrettutækisins. "
        + "3,2 V er varfærnislegt upphafsgildi; notaðu tæknilýsingu tækisins þegar hún er tiltæk.",
});
