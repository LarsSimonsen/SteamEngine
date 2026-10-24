const nouns: Readonly<Record<string, string>> = {
    material: "materiaali", materials: "materiaalit", battery: "akku", batteries: "akut", mod: "modi", mods: "modit"
};
const catalogNoun = (value: unknown): string => nouns[String(value).toLowerCase()] ?? String(value);
export const catalogLoadFailure = "Omia kohteita ei ladattu, eikä tallennettujen tietojen päälle ole kirjoitettu.";
/* Machine-materialized Finnish draft. Human review may edit string values. */
export const messages = {
    "navigation": {
        "about": "Tietoja",
        "blog": "Blogi",
        "catalog": "Luettelo",
        "home": "Steam Enginen etusivu",
        "primary": "Päänavigaatio",
        "calculators": "Laskinten navigaatio",
        "language": "Kieli",
        "languageFilter": "Suodata kieliä",
        "noLanguageMatches": "Kieliä ei löytynyt.",
        "languageMatches": (count: number) => `Löydetyt kielet: ${count}`,
        "skipToContent": "Siirry pääsisältöön",
    },
    "theme": {
        "switchToLight": "Vaihda vaaleaan tilaan",
        "switchToDark": "Vaihda tummaan tilaan",
    },
    "footer": {
        "purgeCache": "Tyhjennä välimuisti",
        "translationDraft": "Tämä käännös on koneellisesti laadittu luonnos, joka odottaa "
            + "ihmisen tarkistusta.",
        "suggestCorrection": "Ehdota korjausta",
        "advertisement": "Mainos",
    },
    "error": {
        "title": "Laskimen päivitys epäonnistui",
        "cancel": "Peruuta",
        "reset": "Nollaa",
        "hideDetails": "Piilota tiedot",
        "viewDetails": "Näytä tiedot",
        "retry": "Yritä uudelleen",
        "retrying": "Yritetään uudelleen…",
    },
    "numericInput": {
        "enterNumber": "Anna luku.",
        "range": (min: string, max: string) => `Anna luku väliltä ${min}–${max}.`,
        "atLeast": (min: string) => `Anna luku, joka on vähintään ${min}.`,
        "atMost": (max: string) => `Anna luku, joka on enintään ${max}.`,
        "wholeNumber": "Käytä kokonaislukua."
    },
    "notice": { "dismiss": "Sulje" },
    "filter": { "matches": (count: number) => `Osumat: ${count}` },
    "comparison": { "differs": "Eroaa" },
    "calculatorHeader": {
        "oldVersionNote": "Löydät tämän laskimen vanhan version",
        "oldVersionLinkLabel": "täältä",
    },
    "calculatorVisibility": {
        "label": "Laskimen näkyvyys",
        "ariaLabel": (arg0: unknown) =>
            "Laskimen näkyvyys: "
            + String(arg0),
        "shown": "Näkyvissä",
        "hidden": "Piilotettu",
    },
    "catalogManager": {
        "customItemsDescription": (arg0: unknown) =>
            "Omat kohteet näkyvät aina laskinten valintaluetteloissa. Kohdetyyppi: "
            + catalogNoun(arg0)
            + ".",
        "manage": (arg0: unknown) =>
            "Hallinta: "
            + catalogNoun(arg0),
        "shared": (arg0: unknown) =>
            "yhteinen luettelo: "
            + catalogNoun(arg0),
        "close": (arg0: unknown) =>
            "Sulje hallinta: "
            + catalogNoun(arg0),
        "choose": (arg0: unknown) =>
            "Valitse näkyvät valmiit kohteet tai luo omia tähän selaimeen "
                + "tallennettavia kohteita. Kohdetyyppi: "
            + catalogNoun(arg0)
            + ".",
        "builtIn": (arg0: unknown) =>
            "Valmiit kohteet: "
            + catalogNoun(arg0),
        "visibility": (arg0: unknown) =>
            "Näkyvyyden muutokset tallentuvat heti. Myös piilotetuista "
                + "kohteista voi tehdä kopioita. Kohdetyyppi: "
            + catalogNoun(arg0)
            + ".",
        "filterBuiltIns": "Suodata valmiita kohteita",
        "custom": (arg0: unknown) =>
            "Omat kohteet: "
            + catalogNoun(arg0),
        "newCustom": (arg0: unknown) =>
            "Uusi oma kohde: "
            + catalogNoun(arg0),
        "noneYet": (arg0: unknown) =>
            "Omia kohteita ei vielä ole. Kohdetyyppi: "
            + catalogNoun(arg0)
            + ".",
        "clone": "Tee kopio",
        "edit": "Muokkaa",
        "delete": "Poista",
        "confirmDelete": "Vahvista poistaminen",
        "cancel": "Peruuta",
        "confirmReset": "Vahvista nollaus",
        "resetSaved": (arg0: unknown) =>
            "Nollaa tallennetut tiedot: "
            + catalogNoun(arg0),
        "resetSavedMessage": "Tämä poistaa vain tallennetut tiedot. Jatketaanko?",
        "savedReset": (arg0: unknown) =>
            "Tallennetut tiedot nollattiin. Kohdetyyppi: "
            + catalogNoun(arg0)
            + ".",
        "usedBy": (arg0: unknown, arg1: unknown) =>
            "Kohdetta ”"
            + catalogNoun(arg0)
            + "” ei voi poistaa, koska se on käytössä: "
            + String(arg1)
            + ".",
        "deleted": (arg0: unknown) =>
            String(arg0)
            + " poistettiin.",
    },
    "catalogEditor": {
        "cRatingWithCurrentPlaceholder": "Valinnainen, jos virta on annettu",
        "currentWithCRatingPlaceholder": "Valinnainen, jos C-arvo on annettu",
        "markingsPlaceholder": "Valinnainen; yksi suojakalvon merkintä riville",
        "wrapperColorPlaceholder": "Valinnainen, kuvaileva",
        "sizeCodePlaceholder": "Valinnainen, esim. 18650",
        "editCustom": (arg0: unknown) =>
            "Muokkaa omaa kohdetta: "
            + String(arg0),
        "newCustom": (arg0: unknown) =>
            "Uusi oma kohde: "
            + catalogNoun(arg0),
        "clone": (arg0: unknown) =>
            "Tee kopio: "
            + String(arg0),
        "properties": (arg0: unknown) =>
            "Ominaisuudet: "
            + catalogNoun(arg0),
        "save": (arg0: unknown) =>
            "Tallenna: "
            + String(arg0),
        "saved": (arg0: unknown) =>
            "Tallennettu: "
            + catalogNoun(arg0)
            + ".",
        "cancel": "Peruuta",
        "name": "Nimi",
        "manufacturer": "Valmistaja",
        "model": "Malli",
        "variant": "Muunnos",
        "weightGrams": "Paino (g)",
        "optional": "Valinnainen",
        "unknown": "Tuntematon",
        "batteryAccess": "Akun irrotettavuus",
        "removableCell": "Irrotettava kenno",
        "integratedMod": "Modiin integroitu",
        "formFactor": "Rakenne",
        "selectFormFactor": "Valitse rakenne",
        "notApplicable": "Ei sovellu",
        "cylindrical": "Sylinterimäinen",
        "prismatic": "Prismaattinen",
        "sizeCode": "Kokokoodi",
        "nominalDiameter": "Nimellishalkaisija (mm)",
        "nominalLength": "Nimellispituus (mm)",
        "terminalStyle": "Navan tyyppi",
        "flatTop": "Tasainen napa",
        "buttonTop": "Nappinapa",
        "length": "Pituus (mm)",
        "width": "Leveys (mm)",
        "thickness": "Paksuus (mm)",
        "protectedStatus": "Suojaus",
        "protectedCell": "Suojattu",
        "unprotectedCell": "Suojaamaton",
        "wrapperColor": "Suojakalvon väri",
        "markings": "Merkinnät",
        "ratedCapacity": "Nimelliskapasiteetti (mAh)",
        "continuousCurrent": "Jatkuva purkausvirta (A)",
        "continuousC": "Jatkuvan purkauksen C-arvo",
        "nominalVoltage": "Nimellisjännite (V)",
        "safetyWarning": "Turvallisuusvaroitus",
        "dataNote": "Tietoja koskeva huomautus",
        "batteryHelp": "Anna vähintään yksi jatkuvan purkauksen raja-arvo. Integroidut "
            + "akut ovat modin sisäisiä akkupaketteja, joten erillisen kennon "
            + "mittoja ei vaadita. Irrotettavien kennojen mitat ovat "
            + "nimellismittoja; kirjaa myyntikuntoisesta kennosta mitatut mitat "
            + "huomautuksiin. Kun molemmat purkausrajat on asetettu ja ne "
            + "eroavat olennaisesti toisistaan, laskin käyttää edelleen niistä "
            + "johdettua turvallisempaa rajaa.",
        "resistivity": "Resistiivisyys (Ω mm²/m)",
        "heatCapacity": "Ominaislämpökapasiteetti (J/g·K)",
        "density": "Tiheys (g/cm³)",
        "temperatureModel": "Lämpötilamalli",
        "noTemperatureData": "Ei lämpötilatietoja",
        "tcrPerDegree": "TCR (°C:ta kohti)",
        "temperature": "Lämpötila (°C)",
        "resistanceFactor": "Resistanssikerroin",
        "removeTfrPoint": "Poista TFR-piste",
        "addTfrPoint": "Lisää TFR-piste",
        "normalizationHelp": "Tallennettaessa käyrän pisteet järjestetään, 20 °C:n "
            + "vertailupiste lisätään tai lasketaan ja kaikki kertoimet "
            + "normalisoidaan.",
        "normalizationInterpolated": " 20 °C:n piste interpoloitiin ja käyrä normalisoitiin.",
        "normalizationExtrapolated": " 20 °C:n piste ekstrapoloitiin ja käyrä normalisoitiin.",
        "normalizationExisting": " TFR-käyrä normalisoitiin 20 °C:ssa.",
        "basedOnPreset": "Perustuu esiasetukseen",
        "none": "Ei mitään",
        "maxOutputVoltage": "Suurin lähtöjännite (V)",
        "maxOutputPower": "Suurin lähtöteho (W)",
        "maxOutputCurrent": "Suurin lähtövirta (A)",
        "minAtomizerResistance": "Höyrystimen pienin resistanssi (Ω)",
        "maxAtomizerResistance": "Höyrystimen suurin resistanssi (Ω)",
    },
    "home": {
        "intro": "Steam Engine tarjoaa käytännöllisiä laskimia coilien "
            + "rakentamiseen, akun kuormituksen tarkistamiseen, "
            + "sähkösavukenesteen sekoittamiseen ja oman laitekokoonpanon "
            + "lukuarvojen ymmärtämiseen.",
        "toolkit": "Työkalusarja",
        "chooseCalculator": "Valitse laskin",
        "blogEyebrow": "Pysy ajan tasalla",
        "blogTitle": "Steam Enginen blogi",
        "blogDescription": "Lue uutisia ja laskinten käyttövinkkejä Steam Enginen blogista.",
        "catalogEyebrow": "Tietokirjasto",
        "catalogTitle": "Tutustu luetteloon",
        "catalogDescription": "Tutustu käsitteisiin ja Steam Enginen käyttämiin materiaaleihin, "
            + "akkuihin, modeihin ja ohjauskortteihin.",
        "tools": {
            "ohm": {
                "label": "Ohmin laki",
                "description": "Laske resistanssi, jännite, virta ja teho Joulen lain avulla.",
            },
            "coil": {
                "label": "Coilin käämintä",
                "description": "Suunnittele itse rakennettavien höyrystimien coileja ja tutki "
                    + "niiden sähköisiä ominaisuuksia.",
            },
            "wirewiz": {
                "label": "Wire Wizard",
                "description": "Yhdistele erilaisia lankoja ja suunnittele coilin rakenne ja "
                    + "lämpötilakäyrä.",
            },
            "batt": {
                "label": "Akun kuormitus",
                "description": "Tarkastele akkukäyttöisen laitteen virran- ja tehonkulutusta.",
            },
            "modrange": {
                "label": "Modin toiminta-alue",
                "description": "Selvitä säädellyn modin käyttökelpoinen resistanssialue.",
            },
            "juice": {
                "label": "Sähkösavukeneste",
                "description": "Laadi sekoitusresepti halutulle nikotiinipitoisuudelle ja VG/PG-suhteelle.",
            },
            "converter": {
                "label": "Yksikkömuunnin",
                "description": "Muunna millimetrien, tuumien, tuuman murto-osien ja langan "
                    + "paksuusluokkien välillä.",
            },
            "old": {
                "label": "Vanha sivusto",
                "description": "Laskimien vanhat versiot löydät täältä.",
            },
        },
    },
    "ohm": {
        "joulesLawLinkLabel": "Joulen laki",
        "eyebrow": "Ohmin lain laskin",
        "title": "Ohmin laki",
        "descriptionBeforeOhm": "Tässä yksinkertaisessa laskimessa",
        "descriptionBetweenLaws": "ja",
        "descriptionAfterLaws": "muodostavat laskennan perustan.",
        "values": "Arvot",
        "lock": "Lukitse",
        "reset": "Nollaa",
        "simpleLocks": "Yksinkertaiset lukitukset",
        "showDetailedLocks": "Näytä tarkat lukitusasetukset",
        "hideDetailedLocks": "Piilota tarkat lukitusasetukset",
        "detailedLocks": "Tarkat lukitusasetukset",
        "adjusting": (arg0: unknown) =>
            "Muutettava suure: "
            + String(arg0),
        "help": "Valitse, mitkä suureet pysyvät vakioina, kun muutat muita arvoja.",
        "about": "Tietoja tästä laskimesta",
        "aboutText": "Voit muuttaa mitä tahansa arvoa. Muut arvot päivittyvät "
            + "välittömästi. Arvot voidaan lukita, jotta ne eivät muutu, kun "
            + "muutat toista arvoa.",
        "serviceUnavailable": "Laskentapalvelu ei ole käytettävissä.",
        "defaultsRestored": "Oletusasetukset on palautettu.",
        "fields": {
            "resistance": "Resistanssi",
            "voltage": "Jännite",
            "current": "Virta",
            "power": "Teho",
        },
        "lockSummary": (arg0: unknown, arg1: unknown) =>
            "Muutetaan: "
            + String(arg0)
            + ". Vakiona: "
            + String(arg1)
            + ".",
    },
    "encyclopedia": {
        "kicker": "Steam Enginen tietokirjasto",
        "title": "Luettelo",
        "lead": "Tutustu laskinten taustalla oleviin käsitteisiin, materiaaleihin, "
            + "akkuihin, modeihin ja ohjauskortteihin.",
        "entriesLabel": (arg0: unknown) =>
            "Kohteita: "
            + String(arg0),
        "browserLabel": "Luettelon kohteet",
        "searchLabel": "Hae tietosanakirjan kohteita",
        "searchPlaceholder": "Hae nimellä, mallilla tai vaihtoehtoisella nimellä",
        "filtersLabel": "Suodata tietosanakirjan kohteita",
        "all": "Kaikki",
        "openEntry": "Avaa kohde",
        "noMatches": "Hakua vastaavia kohteita ei löytynyt.",
        "browseCategory": (arg0: unknown, arg1: unknown) =>
            "Selaa luokkaa: "
            + String(arg0)
            + " (kohteita: "
            + String(arg1)
            + ")",
        "categoryLabels": {
            "concepts": "Käsitteet",
            "batteries": "Akut",
            "materials": "Materiaalit",
            "mods": "Modit ja ohjauskortit",
        },
        "categoryDescriptions": {
            "concepts": "Laskinten ja niiden tulosten taustalla olevat periaatteet.",
            "batteries": "Kennot, akkupaketit ja integroidut virtalähteet.",
            "materials": "Vastuslangat ja lämpötilansäätöön soveltuvat materiaalit.",
            "mods": "Säädeltyjen laitteiden ja ohjauskorttien profiilit.",
        },
    },
    "encyclopediaDetail": {
        "breadcrumb": "Murupolku",
        "categoryLabels": {
            "concepts": "Käsitteet",
            "batteries": "Akut",
            "materials": "Materiaalit",
            "mods": "Modit",
        },
        "additionalInformation": "Lisätietoja",
        "aliases": "Vaihtoehtoiset nimet",
        "marketIntroduction": "Markkinoilletulo",
        "introduced": (arg0: unknown) =>
            "Tuli markkinoille: "
            + String(arg0),
        "introducedBetween": (arg0: unknown, arg1: unknown) =>
            "Markkinoilletulon aikaväli: "
            + String(arg0)
            + " – "
            + String(arg1),
        "introducedNoEarlier": (arg0: unknown) =>
            "Tuli markkinoille aikaisintaan: "
            + String(arg0),
        "availableBy": (arg0: unknown) =>
            "Oli saatavilla viimeistään: "
            + String(arg0),
        "unknown": "Tuntematon",
        "relatedEntry": "Aiheeseen liittyvä kohde",
        "sourceBackedMaterial": "Lähteisiin perustuva materiaalitietue",
        "sourceBackedEntity": "Lähteisiin perustuva kohdetietue",
        "researchSummary": "Tutkimusyhteenveto",
        "noResearchSummary": "Tästä kohteesta ei ole saatavilla tutkimusyhteenvetoa.",
        "evidenceNotes": "Lähdeaineistoa koskevat huomautukset",
        "source": "Lähde",
        "sources": "Lähteet",
        "noSources": "Tästä kohteesta ei ole saatavilla lähteitä.",
        "noSourceBackedRecord": "Tästä kohteesta ei ole saatavilla lähteisiin perustuvaa tutkimustietuetta.",
        "property": "Ominaisuus",
        "properties": "Ominaisuudet",
        "value": "Arvo",
        "unit": "Unit",
        "additionalPropertyNotes": "Ominaisuuksia koskevat lisähuomautukset",
        "unknownPropertyValue": "Luettelossa ei ole vahvistettua arvoa tälle ominaisuudelle.",
        "appearance": "Ulkonäkö",
        "loadingPowerCurve": "Ladataan tehokäyrää",
        "temperatureResistanceCurve": "Resistanssin lämpötilariippuvuuden käyrä",
        "temperature": "Lämpötila",
        "relativeResistance": "Suhteellinen resistanssi",
        "extrapolatedCurve": "Annettujen pisteiden kattaman alueen ulkopuoliset arvot "
            + "ekstrapoloidaan lineaarisesti vain kuvaajaa varten.",
        "loadingTemperatureCurve": "Ladataan lämpötilakäyrää…",
        "normalizedCurve": (arg0: unknown) =>
            "Luettelon käyrä on normalisoitu suhteeksi R/R20. Normalisointimenetelmä: "
            + String(arg0)
            + ".",
        "loadingResearchRecord": "Ladataan tutkimustietuetta…",
        "independentTestReview": "Riippumaton testi ja arvostelu",
        "reviewed": (arg0: unknown) =>
            "Arvioitu: "
            + String(arg0),
        "limitation": "Rajoitus",
        "evidenceDate": "Lähdeaineiston päivämäärä",
        "confidence": "Varmuusaste",
        "date": "Päivämäärä",
        "relation": "Yhteys",
        "lifecycleEvidence": "Elinkaarta koskeva lähdeaineisto",
        "recordStatus": "Tietueen tila",
        "identityStability": "Tuoteidentiteetin pysyvyys",
        "lastUpdated": "Viimeksi päivitetty",
        "researchSources": "Tutkimuslähteet",
        "deviceSafetyNotes": "Laitekohtaiset turvallisuusohjeet",
        "safety": "Turvallisuus",
        "catalogImplication": "Vaikutus luettelon tietoihin",
        "noBatterySafety": "Tälle kohteelle ei ole kirjattu akkukohtaista turvallisuushuomautusta.",
        "batteryInternal": "Tämä akku on laitteen sisäinen akkupaketti, ei käyttäjän "
            + "vaihdettavissa oleva kenno.",
        "batteryRemovable": "Tämä on irrotettava ladattava kenno, jota käytetään "
            + "yhteensopivissa laitteissa.",
        "continuousDischargeCurrent": (arg0: unknown) =>
            "Luettelossa ilmoitettu jatkuva purkausvirta on "
            + String(arg0)
            + " A.",
        "continuousDischargeC": (arg0: unknown) =>
            "Luettelossa ilmoitettu jatkuvan purkauksen arvo on "
            + String(arg0)
            + " C.",
        "noContinuousDischarge": "Luettelossa ei ole vahvistettua jatkuvan purkauksen raja-arvoa.",
        "rewrapExplanation": "Tuotemerkkiä käsitellään uudelleenpäällystettyjen kennojen "
            + "merkkinä. Kennon varsinaista valmistajaa ei päätellä suojakalvon "
            + "perusteella.",
        "oldBatteryWarning": "Tämä on vanha akkumalli, ja se on todennäköisesti korvattu "
            + "sopivammilla malleilla.",
        "unknownBatteryIntroductionNotice": "Tämän kennon markkinoilletuloajankohtaa ei tunneta, joten sen "
            + "ikää ei voida määrittää eikä tiedetä, ovatko uudemmat mallit "
            + "korvanneet sen.",
        "unknownChemistry": "Tutkimustietueessa ei ole vahvistettu tämän kohteen akkukemian tyyppiä.",
        "unknownAuthenticitySummary": "Tietue ei sisällä laajempaa yhteenvetoa aitoudesta.",
        "nonRemovableBatteryProfile": "Tämän modin kiinteän akun profiili:",
        "basedOnBoardProfile": "Tämä laiteprofiili perustuu seuraavaan ohjauskorttiprofiiliin:",
        "builtIntoModProfile": "Tämä akkuprofiili sisältyy seuraavaan modiprofiiliin:",
        "appliesTo": "Koskee",
        "status": "Tila",
        "authenticityAssessment": "Aitouden arviointi",
        "noAuthenticityAssessment": "Kohdekohtaista aitousarviointia ei ole tallennettu.",
        "catalogNote": "Luettelon huomautus",
        "chemistry": "Akkukemia",
        "batteryAccess": "Akun irrotettavuus",
        "integratedInMod": "Modiin integroitu",
        "protection": "Suojaus",
        "protectedCell": "Suojattu kenno.",
        "unprotectedCell": "Suojaamaton kenno.",
        "brand": "Tuotemerkki",
        "manufacturer": "Valmistaja",
        "nominalVoltage": "Nimellisjännite",
        "wrapperColor": "Suojakalvon väri",
        "markings": "Merkinnät",
        "noDefinedCurve": (arg0: unknown) =>
            "Tälle materiaalille ei ole määritetty TFR-käyrän pisteitä. Sen TCR on "
            + String(arg0)
            + " °C:ta kohti.",
        "noUsableResistanceRange": "Luettelon raja-arvoista ei voida laskea käyttökelpoista "
            + "resistanssialuetta.",
        "modBoardCatalog": "Modien ja ohjauskorttien luettelo",
        "supportedModesAndCapabilities": "Tuetut toimintatilat ja ominaisuudet",
        "outputControlModes": "Lähdön säätötilat",
        "additionalCapabilities": "Lisäominaisuudet",
        "operatingFeatureLabels": {
            "voltage": "Jännitteensäätö",
            "power": "Tehonsäätö",
            "current": "Virransäätö",
            "temperatureControl": "Lämpötilansäätö",
            "bypass": "Ohitustila",
            "powerCurve": "Tehokäyrä",
            "temperatureCurve": "Lämpötilakäyrä",
            "configurableTcr": "Säädettävä TCR",
            "preheat": "Esilämmitys",
            "replay": "Replay",
        },
        "batteryCatalog": "Akkuluettelo",
        "materialCatalog": "Coilimateriaalien luettelo",
        "overview": "Yleiskatsaus",
        "inVaping": "Höyryttelykäytössä",
        "materialSpecificLimitations": "Materiaalikohtaiset rajoitukset",
        "secondaryProperties": "Toissijaiset ominaisuudet",
        "noMaterialSources": "Tälle materiaalille ei ole saatavilla lähteitä.",
        "basedOnArticle": "Perustuu Steam Enginen tietopankin artikkeliin",
        "seeAlso": "Katso myös",
        "wikipedia": "Wikipedia",
        "propertyLabels": {
            "formFactor": "Rakenne",
            "dimensions": "Mitat",
            "ratedCapacity": "Nimelliskapasiteetti",
            "continuousDischarge": "Jatkuvan purkauksen raja-arvo",
            "maximumPower": "Suurin teho",
            "maximumVoltage": "Suurin jännite",
            "minimumInputVoltage": "Pienin tulojännite",
            "typicalInputVoltage": "Tyypillinen tulojännite",
            "maximumInputVoltage": "Suurin tulojännite",
            "maximumCurrent": "Suurin virta",
            "resistanceRange": "Resistanssialue",
            "boardController": "Ohjauskortti/ohjain",
            "resistivity": "Sähköinen resistiivisyys 20 °C:ssa",
            "temperatureModel": "Lämpötilamalli",
            "fullResistanceCurve": "Täydellinen resistanssikäyrä",
            "temperatureCoefficient": "Lämpötilakerroin",
            "specificHeatCapacity": "Ominaislämpökapasiteetti",
            "maximumRecommendedTemperature": "Suurin suositeltu höyrytyslämpötila",
            "density": "Tiheys",
            "meltingPoint": "Sulamispiste",
        },
    },
} as const;
