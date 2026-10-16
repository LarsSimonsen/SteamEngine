/* Machine-materialized Finnish draft. Human review may edit string values. */
export const messages = {
    "eyebrow": "Akun kuormitus- ja turvallisuuslaskin",
    "title": "Akun kuormitus",
    "description": "Arvioi höyrystimen lähtöarvot, akun kuormitus ja jäljellä oleva "
        + "virtamarginaali säädellyillä ja säätelemättömillä modeilla.",
    "manage": "Hallitse akkuja",
    "reset": "Nollaa",
    "calculating": "Lasketaan…",
    "device": "Laite",
    "operatingMode": "Toimintatila",
    "powerRegulated": "Tehosäädelty modi",
    "voltageRegulated": "Jännitesäädelty modi",
    "currentRegulated": "Virtasäädelty",
    "bypass": "Ohitustila",
    "notVerified": "ei varmistettu",
    "unregulated": "Säätelemätön modi",
    "atomizerResistance": "Höyrystimen resistanssi",
    "outputPower": "Lähtöteho",
    "outputVoltage": "Lähtöjännite",
    "efficiency": "Hyötysuhde",
    "batteryPresets": "Kennon esiasetus",
    "cellSelection": "Kennon valinta",
    "batteryIntro": "Valitse kaikissa akkupaketin kennoissa käytettävä kennotyyppi tai "
        + "syötä kennokohtaiset arvot alle.",
    "batteryPreset": "Kennon esiasetus",
    "customValues": "Mukautetut arvot",
    "detailsBattery": "Tietoja tästä akusta",
    "customBattery": "Mukautettu akku",
    "selectPreset": "Valitse esiasetus tästä",
    "batteryValues": "Kenno ja akkupaketti",
    "batteryConfiguration": "Akkukokoonpano",
    "deviceBatterySetup": "Laitteen akkukokoonpano",
    "boardInputProfile": "Ohjauskortin tuloprofiili",
    "singleCell": "1S — yksi kenno",
    "customConfiguration": "Mukautettu kokoonpano",
    "cellsInSeries": "Kennoja sarjassa",
    "parallelStrings": "Rinnakkaisia kennosarjoja",
    "cells": "kennoa",
    "cell": "kenno",
    "matchedCells": "Käytä keskenään samanlaisia, yhteensovitettuja kennoja, jotka "
        + "ovat samanikäisiä ja samassa kunnossa. Virran jakautuminen "
        + "oletetaan ihanteelliseksi; heikoin kenno rajoittaa akkupaketin "
        + "suorituskykyä.",
    "batteryVoltage": "Akun jännite",
    "cellVoltageNearCutoff": "Kennojännite lähellä katkaisurajaa",
    "regulatedVoltageHelp": "Käytä kuormitettuna mitattua kennokohtaista jännitettä lähellä "
        + "modin katkaisurajaa. 3,2 V on varovainen lähtöarvo; käytä "
        + "laitteen teknisissä tiedoissa ilmoitettua arvoa, jos se on "
        + "saatavilla.",
    "unregulatedVoltageHelp": "Käytä täyteen ladatun akun jännitettä suurimman virran "
        + "arviointiin. Älä laske kuormituksen aiheuttamaa jännitehäviötä "
        + "turvamarginaaliksi.",
    "voltage": "Jännite",
    "capacity": "Kapasiteetti",
    "maximumCurrent": "Enimmäisvirta",
    "cRating": "C-luokitus",
    "nominalVoltage": "Nimellisjännite",
    "batteryHelp": "Nimellisjännite ja kapasiteetti määräävät arvion varastoituneesta "
        + "energiasta ja yhtäjaksoisesta käyttöajasta. Ne eivät vaikuta "
        + "virtarajaan.",
    "results": "Tulokset",
    "enterValue": "Syötä arvo:",
    "resultsUseLastValidValues": "Tuloksissa käytetään viimeisintä kelvollista arvoa.",
    "atomizerOutput": "Höyrystimen lähtöarvot",
    "batteryDrain": "Akun kuormitus",
    "batterySafety": "Akun turvallisuus",
    "pack": "Akkupaketti",
    "currentPerCell": "Arvioitu virta kennoa kohti",
    "effectiveMaximumCurrent": "Sovellettava enimmäisvirta",
    "currentHeadroom": "Jäljellä oleva virtamarginaali",
    "estimatedRuntime": "Arvioitu käyttöaika",
    "nominalEnergy": "Nimellisenergia",
    "continuousRuntime": "Yhtäjaksoinen käyttöaika",
    "safe": "Arvioitu kuormitus on akulle sovellettavan virtarajan sisällä.",
    "caution": "Virtamarginaalia on jäljellä alle 20 %.",
    "danger": "Arvioitu kuormitus ylittää akulle sovellettavan virtarajan.",
    "runtimeHelp": "Tämä ihanteellisiin olosuhteisiin perustuva arvio olettaa akun "
        + "antavan laskettua tehoa yhtäjaksoisesti. Todelliseen käyttöaikaan "
        + "vaikuttavat katkaisujännite, kuormituksen aiheuttama "
        + "jännitehäviö, kennon ikä, laitteen oma energiankulutus ja "
        + "katkonainen käyttö.",
    "voltageLabel": "Jännite",
    "currentLabel": "Virta",
    "powerLabel": "Teho",
} as const;
