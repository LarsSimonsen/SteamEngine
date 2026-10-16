/* Machine-materialized Finnish draft. Human review may edit string values. */
export const messages = {
    "eyebrow": "Lämpötilansäädön lankalaskin",
    "title": "Resistanssin lämpötilakerroin",
    "description": "Vertaa TCR- ja TFR-materiaaleja, yhdistä lankojen resistanssit "
        + "rinnakkain ja vie normalisoitu DNA 200 -resistanssikäyrä.",
    "manageMaterials": "Hallitse materiaaleja",
    "needModel": "Tarvitsetko täydellisen coilimallin?",
    "wireWizard": "Wire Wizard",
    "needModelText": "langan geometrian, monimutkaisten rakenteiden ja coililaskelmien "
        + "käsittelyyn. Tämä rajatumpi työkalu soveltuu resistanssikäyrien "
        + "vertailuun ja yhdistämiseen.",
    "controls": "Lämpötilapisteet",
    "reset": "Nollaa",
    "calculating": "Lasketaan…",
    "temperatureList": "Pilkuilla erotetut lämpötilat",
    "temperatureScale": "Lämpötila-asteikko",
    "help": "Näiden arvojen muokkaaminen poistaa materiaalivalinnat. DNA 200 "
        + "-vienti hyväksyy 2–8 pistettä, joista yhden on oltava lähellä "
        + "lämpötilaa 70 °F (noin 21 °C).",
    "selectMaterial": "Valitse materiaali",
    "materialToAdd": "Lisättävä materiaali",
    "builtInMaterials": "Valmiit materiaalit",
    "customMaterials": "Omat materiaalit",
    "selectMaterialPlaceholder": "Valitse materiaali",
    "addMaterial": "Lisää materiaali",
    "duplicateHelp": "Saman materiaalin voi lisätä useamman kerran.",
    "results": "Resistanssi lämpötilan funktiona",
    "baseAt20": "Perusresistanssi mitataan lämpötilassa 20 °C.",
    "sensitivity": "Herkkyys",
    "empty": "Lisää yksi tai useampi materiaali resistanssikäyrän laskemiseksi.",
    "material": "Materiaali",
    "baseResistance": "Perusresistanssi",
    "actions": "Toiminnot",
    "remove": "Poista",
    "totalParallel": "Rinnankytkennän kokonaisresistanssi",
    "normalizedTfr": "Normalisoitu TFR-käyrä",
    "export": "DNA 200 -vienti",
    "exportHelp": "Käyrä normalisoidaan täsmälleen lämpötilassa 20 °C laskettuun "
        + "resistanssiinsa.",
    "extrapolated": "Käytettävissä olevan TFR-alueen ulkopuolella olevat arvot "
        + "ekstrapoloitiin lineaarisesti.",
    "downloadCsv": "Lataa CSV-tiedosto",
    "csvOutput": "DNA 200 -vientitiedosto (CSV)",
    "about": "Laskennan toimintaperiaate",
    "aboutOne": "TFR-materiaalien laskennassa käytetään "
        + "resistanssikerrointaulukoita ja lineaarista interpolointia "
        + "taulukon pisteiden välillä. Jos materiaalilla ei ole "
        + "TFR-taulukkoa, käytetään sen vakioista TCR-arvoa.",
    "aboutTwo": "Kun materiaaleja on valittu useita, ne käsitellään "
        + "rinnankytkettyinä resistansseina. Herkkyys vertaa "
        + "kokonaisresistanssin muutosta lämpötilavälillä 160–260 °C aiemman "
        + "laskentamallin Ni200-vertailukäyrään.",
    "noticeCleared": "Lämpötilapisteet muuttuivat; materiaalivalinnat poistettiin.",
    "resetNotice": "TCR-asetukset nollattiin.",
    "baseFor": "Perusresistanssi, materiaali:",
    "removeMaterial": "Poista",
} as const;
