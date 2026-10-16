/* Machine-materialized Finnish draft. Human review may edit string values. */
import type { CatalogPresentationSet } from "../catalog-presentations";
import { batteryPresentationsFor, type BatteryTextDictionary } from "../battery-presentation-text";
import { materialPresentationsFor, type MaterialTextDictionary } from "../material-presentation-text";
import { modPresentationsFor, type ModTextDictionary } from "../mod-presentation-text";
export const batteryTexts: BatteryTextDictionary = {
    "battery.summary.removable": "Irrotettava, ladattava kenno yhteensopiviin laitteisiin.",
    "battery.summary.integrated": "Laitteen sisäinen akkupaketti, jota käyttäjä ei voi vaihtaa kuten "
        + "irtokennoa.",
    "battery.note.approvedResearch": "Hyväksytty 2026-08-13. Katso siihen liittyvä tutkimustietue.",
    "battery.note.capacityBelowLabel": "Todellinen kapasiteetti on pienempi kuin merkintä antaa ymmärtää.",
    "battery.note.battery-71.evidence": "Jatkuvan purkuvirran arvo on 20 A. Pulssivirran arvoja ei käytetä.",
    "battery.note.battery-77.evidence": "20 A on varovainen, riippumattomaan arvioon perustuva "
        + "vertailuarvo. Tarkalla suojakääreellä ja tuotantoversiolla on "
        + "edelleen merkitystä.",
    "battery.note.battery-78.evidence": "15 A on juuri tämän mallin testeihin perustuva varovainen arvo. "
        + "Testatulla CCC-merkityllä versiolla on edelleen merkitystä.",
    "battery.note.battery-79.evidence": "45 A on testatun tabless-version riippumaton jatkuvan purkuvirran "
        + "arvo. Älä korvaa sitä pulssivirran arvoilla.",
    "battery.note.battery-80.evidence": "36 A on todellinen jatkuvan purkuvirran arvo. 56 A:n arvo on "
        + "lämpötilarajoitettu.",
    "battery.note.battery-81.evidence": "40 A on varovainen arvo. Testatut kennot vaikuttivat "
        + "esituotantokappaleilta, eikä niissä ollut CCC-logoa.",
    "battery.note.battery-82.evidence": "Suositeltu jatkuvan purkuvirran arvo on 13 A. 16,8 A on ehdoton "
        + "enimmäisarvo, jota ei ole tarkoitettu pitkän syklisen käyttöiän "
        + "saavuttamiseen.",
    "battery.note.battery-83.evidence": "40 A on varovainen arvo. 70 A:n arvo on lämpötilarajoitettu, ja "
        + "testatut näytteet olivat esituotantokappaleita.",
    "battery.note.battery-84.evidence": "40 A on tuotantokennon vertailuarvo. 70 A edellyttää lämpötilan hallintaa.",
    "battery.note.battery-85.evidence": "40 A:n arvo koskee juuri tätä suojakääreversiota. 70 A:n arvoon "
        + "liittyy 60 C:n lämpötilaraja, ja testattu kenno oli "
        + "uudelleenmerkitty EVE 40PL.",
    "battery.note.battery-86.evidence": "19 A on varovainen arvo. Testatut näytteet vaikuttivat "
        + "esituotantokappaleilta, eikä niissä ollut CCC-merkintöjä.",
    "battery.note.battery-87.evidence": "40 A on varovainen arvo. 90 A:n arvo on lämpötilarajoitettu, ja "
        + "testatut kennot vaikuttivat esituotantokappaleilta.",
    "battery.note.battery-88.evidence": "40 A on varovainen arvo. 60 A:n arvo on lämpötilarajoitettu, eikä "
        + "tuotannon jatkuvuutta ole varmistettu.",
    "battery.note.battery-89.evidence": "40 A on varovainen arvo. Testattujen näytteiden kapasiteetit "
        + "vaihtelivat, eikä niissä ollut CCC/CE-merkintöjä.",
    "battery.note.battery-90.evidence": "13 A on varovainen arvo. Testatut näytteet vaikuttivat "
        + "esituotantokappaleilta, eikä niissä ollut CCC-merkintöjä.",
    "battery.note.battery-91.evidence": "30 A on testaajan arvio jatkuvasta purkuvirrasta. Reliancen "
        + "ilmoittama 50 A:n enimmäisarvo on lämpötilarajoitettu.",
    "battery.note.battery-92.evidence": "20 A:n jatkuvan purkuvirran arvo perustuu kahteen testattuun "
        + "tuotantoon liittyvään erään. 30 A:n arvo on lämpötilarajoitettu.",
    "battery.note.battery-93.evidence": "Jatkuva purkuvirta on 12 A. 20 A koskee vain pulssikäyttöä. "
        + "Testatun suojakääreen tarkka merkintä on SA110 / INR18650/40.",
    "battery.note.battery-94.evidence": "20 A:n arvo koskee juuri tätä suojakääreversiota. Testaaja "
        + "suosittelee alle 15 A:n jatkuvaa purkuvirtaa. Vapehuset mainostaa "
        + "otsikossaan arvoa 25 A. Myöhempien uudelleenmerkittyjen kennojen "
        + "alkuperä tai suojakääreversio voi poiketa testatusta.",
    "battery.note.battery-95.evidence": "30 A:n arvo koskee juuri tätä mallia. Kenno on uudelleenmerkitty, "
        + "ja myöhemmät suojakääreversiot tai kennojen alkuperä voivat "
        + "poiketa testatusta.",
    "battery.note.battery-96.evidence": "30 A:n arvo koskee juuri tätä viisisakaraista versiota. "
        + "Nelisakaraiset ja myöhemmät versiot, joissa käytetään samaa "
        + "suojakäärettä, eroavat olennaisesti tästä versiosta, eikä niihin "
        + "saa soveltaa tätä profiilia.",
    "battery.safety.lowDrain": "Pienelle purkuvirralle tarkoitettu akku. Ei sovellu höyryttelyyn.",
};
export const materialTexts: MaterialTextDictionary = {
    "material.profile": (arg0: unknown) =>
        "Luetteloprofiili: "
        + String(arg0)
        + ".",
    "material.safety.verifiedProfile": "Käytä varmennettua materiaaliprofiilia ja noudata laitteen "
        + "lämpötila- ja käyttörajoja.",
};
export const modTexts: ModTextDictionary = {
    "mod.profile.regulated": (arg0: unknown) =>
        "Säädellyn höyryttelylaitteen profiili: "
        + String(arg0)
        + ".",
    "mod.preset-9.profile": "Billet Box Rev. 3a, jossa on kuulapuhallettu, kemiallisesti "
        + "kiillotettu ja anodisoitu alumiinipinta. Esitelty toukokuussa "
        + "2014.",
    "mod.preset-10.profile": "Cloupor 30 W -laite, jossa käytetään kolmannen osapuolen "
        + "DNA30-tyyppistä kopiopiirisarjaa, ei aitoa Evolv DNA-30D "
        + "-ohjauskorttia.",
    "mod.preset-231.profile": "Kahden 21700-kennon säädelty modi, jossa on sovittimet "
        + "18650-kennoille. VAPORESSO ilmoittaa tehoksi 220 W. Testissä "
        + "mitattiin 208 W, 8,979 V ja 39 A.",
    "mod.preset-234.profile": "Kahden 18650-kennon säädelty modi. VAPORESSO ilmoittaa tehoksi "
        + "220 W. Testissä mitattiin 215 W, 9,08 V ja 37 A.",
    "mod.preset-235.profile": "Säädelty modi, jossa on sisäinen akku ja jonka ilmoitettu teho on "
        + "100 W. Testissä mitattiin 101 W, 29 A ja vähintään 7,97 V.",
    "mod.preset-236.profile": "Yhden 18650-kennon säädelty modi, jossa on AS Chip 4.0. "
        + "Valmistajan profiilin arvot ovat 100 W, 7,5 V, 32 A ja 0,1–3 Ω.",
    "mod.preset-237.profile": "Yhden kennon modi, joka käyttää 21700-kennoa tai sovittimella "
        + "18650-kennoa. Eleaf ilmoittaa arvot 100 W, 9 V ja 0,05–3,5 Ω. "
        + "Testissä todettiin 30 A:n virta.",
    "mod.preset-238.profile": "Yhden kennon säädelty squonk-modi 21700- tai 20700-kennolle tai "
        + "sovittimella 18650-kennolle. Varovaisen profiilin arvot ovat 95 "
        + "W, 6 V ja 34 A.",
};
export const presentations: CatalogPresentationSet = {
    "concepts": {
        "concept-ohms-law": {
            "displayName": "Ohmin laki",
            "description": "Ohmin laki kuvaa sähköpiirin jännitteen, virran ja resistanssin "
                + "välistä yhteyttä.",
            "summary": "Jännitteen, virran ja resistanssin välinen yhteys.",
            "sections": [
                {
                    "id": "relationship",
                    "title": "Suureiden välinen yhteys",
                    "paragraphs": [
                        "Perusyhteytt\u00E4 voidaan k\u00E4ytt\u00E4\u00E4, kun komponentin resistanssi on " + "likimain vakio.",
                    ],
                    "formulas": [
                        {
                            "expression": "V = I × R",
                        },
                    ],
                    "bullets": [
                        "V on jännite, jonka yksikkö on voltti (V).",
                        "I on sähkövirta, jonka yksikkö on ampeeri (A).",
                        "R on resistanssi, jonka yksikkö on ohmi (Ω).",
                    ],
                },
                {
                    "id": "rearranged-formulas",
                    "title": "Kaavan eri muodot",
                    "paragraphs": [
                        "Valitse kaavan muoto, jossa laskettava suure on vasemmalla puolella:",
                    ],
                    "formulas": [
                        {
                            "expression": "I = V / R",
                        },
                        {
                            "expression": "R = V / I",
                        },
                    ],
                    "bullets": [
                        "J\u00E4nnitteen kasvattaminen kasvattaa virtaa, kun resistanssi pysyy " + "samana.",
                        "Resistanssin kasvattaminen pienentää virtaa, kun jännite pysyy samana.",
                        "Nollan \u03A9 resistanssi tarkoittaa ideaalista oikosulkua, joka on " + "k\u00E4sitelt\u00E4v\u00E4 erikseen.",
                    ],
                },
                {
                    "id": "worked-examples",
                    "title": "Laskuesimerkkejä",
                    "examples": [
                        {
                            "title": "Laske virta",
                            "setup": "4,2 V:n jännitelähteeseen kytketään kuorma, jonka resistanssi on 1,0 Ω.",
                            "formulas": [
                                "I = 4.2 V / 1.0 \\u03a9 = 4.2 A",
                            ],
                            "conclusion": "Kuormavirta on 4,2 A.",
                        },
                        {
                            "title": "Laske resistanssi",
                            "setup": "Piirin yli vaikuttaa 12 V:n jännite, ja piirissä kulkee 2 A:n virta.",
                            "formulas": [
                                "R = 12 V / 2 A = 6 \\u03a9",
                            ],
                            "conclusion": "Piirin resistanssi on 6 Ω.",
                        },
                        {
                            "title": "Laske jännite",
                            "setup": "Vastuksen resistanssi on 10 Ω, ja sen läpi kulkee 0,5 A:n virta.",
                            "formulas": [
                                "V = 0.5 A × 10 Ω = 5 V",
                            ],
                            "conclusion": "Jännite on 5 V.",
                        },
                    ],
                },
                {
                    "id": "electrical-power",
                    "title": "Sähköteho",
                    "formulas": [
                        {
                            "expression": "P = V × I = I^2 × R = V^2 / R",
                        },
                    ],
                    "paragraphs": [
                        "Ohmin laki voidaan yhdist\u00E4\u00E4 tehon kaavaan P = V \u00D7 I. Tehon P " + "yksikk\u00F6 on watti (W). Kun j\u00E4nnitel\u00E4hteen j\u00E4nnite on 4,2 V ja " + "kuorman resistanssi 1,0 \u03A9, ideaalinen teho on 17,64 W. " + "Komponentilla on oltava riitt\u00E4v\u00E4sti l\u00E4mp\u00F6kapasiteettia ja " + "mitoitusvaraa, jotta syntyv\u00E4 l\u00E4mp\u00F6 poistuu turvallisesti.",
                    ],
                },
                {
                    "id": "unit-conversions",
                    "title": "Yksikkömuunnokset",
                    "paragraphs": [
                        "Muunna yksiköt yhteensopiviksi ennen laskemista:",
                    ],
                    "bullets": [
                        "1 kΩ = 1 000 Ω",
                        "1 MΩ = 1 000 000 Ω",
                        "1 mA = 0,001 A",
                        "1 W = 1 000 mW",
                    ],
                },
                {
                    "id": "limits",
                    "title": "Mallin rajoitukset",
                    "paragraphs": [
                        "Ohmin laki on idealisoitu malli. Todelliset komponentit voivat " + "olla ep\u00E4ohmisia: niiden resistanssi voi muuttua l\u00E4mp\u00F6tilan, " + "j\u00E4nnitteen, virran, taajuuden tai toimintatilan mukaan. K\u00E4yt\u00E4 " + "sarja- ja rinnakkaiskytkenn\u00F6iss\u00E4 Kirchhoffin lakeja yhdess\u00E4 Ohmin " + "lain kanssa.",
                    ],
                },
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Ohm%27s_law",
        },
        "concept-joule-heating": {
            "displayName": "Joulen lämpö",
            "description": "Joulen lämpö tarkoittaa sähköenergian muuttumista lämmöksi, kun "
                + "virta kulkee vastuksen läpi.",
            "summary": "Miten sähkövirta saa vastuksen tuottamaan lämpöä.",
            "sections": [
                {
                    "id": "heating-power",
                    "title": "Lämmitysteho",
                    "paragraphs": [
                        "Sähköinen lämmitysteho on:",
                    ],
                    "formulas": [
                        {
                            "expression": "P = V × I",
                        },
                        {
                            "expression": "P = I^2 × R",
                        },
                        {
                            "expression": "P = V^2 / R",
                        },
                    ],
                    "bullets": [
                        "P on teho watteina (W).",
                        "V on jännite voltteina (V).",
                        "I on virta ampeereina (A).",
                    ],
                },
                {
                    "id": "worked-example",
                    "title": "Laskuesimerkki",
                    "examples": [
                        {
                            "title": "Resistiivinen kuorma",
                            "setup": "Coilissa kulkee 3 A:n virta, ja sen resistanssi on 0,8 Ω.",
                            "formulas": [
                                "P = I^2 × R = 3^2 × 0.8 = 7.2 W",
                                "E = P × t = 7.2 W × 10 s = 72 J",
                            ],
                            "conclusion": "Coili muuttaa energiaa lämmöksi 7,2 joulea sekunnissa eli 72 J "
                                + "kymmenessä sekunnissa.",
                        },
                    ],
                },
                {
                    "id": "what-affects-heating",
                    "title": "Lämpenemiseen vaikuttavat tekijät",
                    "bullets": [
                        "Kun resistanssi on vakio, virran kaksinkertaistaminen " + "nelinkertaistaa l\u00E4mmitystehon.",
                        "Kun virta on vakio, resistanssin kaksinkertaistaminen " + "kaksinkertaistaa l\u00E4mmitystehon.",
                        "Kun j\u00E4nnite on vakio, resistanssin pienent\u00E4minen kasvattaa " + "l\u00E4mmitystehoa.",
                        "Todellinen l\u00E4mp\u00F6tila m\u00E4\u00E4r\u00E4ytyy sen mukaan, miten l\u00E4mp\u00F6 siirtyy " + "ilmaan, nesteeseen ja laitteen rakenteisiin.",
                    ],
                    "paragraphs": [
                        "S\u00E4hk\u00F6teho kuvaa energian siirtymist\u00E4 aikayksikk\u00F6\u00E4 kohti, ei " + "l\u00E4mp\u00F6tilaa. L\u00E4mp\u00F6kapasiteetti ja l\u00E4mp\u00F6virran tiheys m\u00E4\u00E4r\u00E4\u00E4v\u00E4t, " + "miten energia muuttaa l\u00E4mp\u00F6tilaa ja kuinka nopeasti se siirtyy " + "pinnalta pois.",
                    ],
                },
                {
                    "id": "practical-checks",
                    "title": "Tarkistukset käytännössä",
                    "paragraphs": [
                        "Tarkista, ett\u00E4 komponentit, liit\u00E4nn\u00E4t ja eristeet kest\u00E4v\u00E4t " + "odotetun virran ja tehon. J\u00E4t\u00E4 riitt\u00E4v\u00E4 mitoitusvara, sill\u00E4 " + "todelliset komponentit voivat l\u00E4mmet\u00E4 ep\u00E4tasaisesti ja " + "resistanssi voi muuttua l\u00E4mp\u00F6tilan mukana. My\u00F6s akuilla ja " + "virtal\u00E4hteill\u00E4 on jatkuvan virran rajat.",
                    ],
                },
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Joule_heating",
        },
        "concept-kirchhoffs-laws": {
            "displayName": "Kirchhoffin lait",
            "description": "Kirchhoffin virta- ja jännitelait kuvaavat säilymisperiaatteita "
                + "piirin solmupisteissä ja suljetuissa silmukoissa.",
            "summary": "Miten virta ja jännite käyttäytyvät sähköpiirin kytkennöissä.",
            "sections": [
                {
                    "id": "circuit-terms",
                    "title": "Sähköpiirin käsitteet",
                    "paragraphs": [
                        "Peruskäsitteet helpottavat kytkentäkaavion ymmärtämistä:",
                    ],
                    "bullets": [
                        "Solmupiste on toisiinsa yhdistettyjen johtimien joukko, jossa " + "johtimien v\u00E4liss\u00E4 ei ole komponentteja.",
                        "Haara on virran kulkureitti kahden solmupisteen välillä.",
                        "Silmukka on suljettu reitti, joka palaa lähtöpisteeseensä.",
                        "Sarjakytkennässä virralla on vain yksi reitti komponenttien läpi.",
                        "Rinnankytkennässä haarat yhdistetään samoihin kahteen solmupisteeseen.",
                    ],
                },
                {
                    "id": "current-law",
                    "title": "Kirchhoffin virtalaki",
                    "formulas": [
                        {
                            "expression": "Σ I = 0",
                        },
                        {
                            "expression": "Σ I_in = Σ I_out",
                        },
                    ],
                    "paragraphs": [
                        "Jos solmupisteeseen tulee 8 A ja yhdest\u00E4 haarasta poistuu 3 A, " + "muista haaroista on poistuttava yhteens\u00E4 5 A. Valitse virtojen " + "oletetut suunnat ennen laskemista. Negatiivinen tulos tarkoittaa, " + "ett\u00E4 todellinen virta kulkee oletetun suunnan vastaisesti.",
                    ],
                },
                {
                    "id": "series-and-parallel",
                    "title": "Sarja- ja rinnankytkennät",
                    "formulas": [
                        {
                            "expression": "I_total = I_1 = I_2 = ...",
                        },
                        {
                            "expression": "R_total = R_1 + R_2 + ...",
                        },
                        {
                            "expression": "I_total = I_1 + I_2 + ...",
                        },
                        {
                            "expression": "1 / R_total = 1 / R_1 + 1 / R_2 + ...",
                        },
                    ],
                    "examples": [
                        {
                            "title": "Sarjaan kytketyt vastukset",
                            "setup": "Kaksi 0,20 Ω:n vastusta kytketään sarjaan 8,0 V:n jännitteeseen.",
                            "formulas": [
                                "R_total = 0.40 \\u03a9",
                                "I = 8.0 V / 0.40 Ω = 20 A",
                            ],
                            "conclusion": "Molempien vastusten läpi kulkee sama 20 A:n virta.",
                        },
                        {
                            "title": "Rinnan kytketyt vastukset",
                            "setup": "Kaksi haaraa, joiden kummankin resistanssi on 0,40 Ω, kytketään "
                                + "4,0 V:n jännitteeseen.",
                            "formulas": [
                                "R_total = 0.20 \\u03a9",
                                "I_total = 4.0 V / 0.20 Ω = 20 A",
                            ],
                            "conclusion": "Kun haarojen resistanssit ovat yhtä suuret, kummassakin haarassa "
                                + "kulkee 10 A:n virta.",
                        },
                    ],
                },
                {
                    "id": "voltage-law",
                    "title": "Kirchhoffin jännitelaki",
                    "formulas": [
                        {
                            "expression": "Σ V = 0",
                        },
                        {
                            "expression": "+8.0 V - V_1 - V_2 = 0",
                        },
                        {
                            "expression": "V_total = V_1 = V_2 = ... (parallel branches)",
                        },
                    ],
                    "paragraphs": [
                        "J\u00E4nnitteennousujen ja -h\u00E4vi\u00F6iden algebrallinen summa suljetussa " + "silmukassa on nolla. Valitse silmukan kiertosuunta ja k\u00E4yt\u00E4 " + "napaisuuksia johdonmukaisesti. Suunnan vaihtaminen muuttaa " + "etumerkit, mutta ei fysikaalista ratkaisua. Sarjakytkenn\u00E4ss\u00E4 " + "suuremman resistanssin yli syntyy suurempi j\u00E4nniteh\u00E4vi\u00F6, sill\u00E4 " + "kaikkien sarjaan kytkettyjen komponenttien l\u00E4pi kulkee sama " + "virta.",
                    ],
                },
                {
                    "id": "cells",
                    "title": "Kennojen sarja- ja rinnankytkentä",
                    "formulas": [
                        {
                            "expression": "V_pack = V_1 + V_2 + ... (series)",
                        },
                        {
                            "expression": "C_pack = C_1 + C_2 + ... (parallel)",
                        },
                    ],
                    "bullets": [
                        "Sarjaan kytkettyjen kennojen j\u00E4nnitteet summautuvat, mutta " + "ampeeritunteina ilmoitettu kapasiteetti pysyy yhden samanlaisen " + "kennon kapasiteettina.",
                        "Rinnan kytkettyjen kennojen j\u00E4nnite pysyy samana, mutta " + "kapasiteetti ja k\u00E4ytett\u00E4viss\u00E4 oleva virta summautuvat likimain.",
                        "Virran jakautuminen riippuu sis\u00E4isest\u00E4 resistanssista, " + "koskettimista, johdotuksesta ja kytkimist\u00E4.",
                        "Sarjaan kytkettyjen litiumionikennojen lataaminen edellytt\u00E4\u00E4 " + "kennokohtaista valvontaa sek\u00E4 asianmukaista tasapainotusta tai " + "suojausta.",
                    ],
                },
                {
                    "id": "solving-and-limits",
                    "title": "Todellisten piirien laskenta",
                    "bullets": [
                        "Merkitse solmupisteiden j\u00E4nnitteet, haaravirrat ja virtojen " + "oletetut suunnat.",
                        "Sovella virtalakia (KCL) riippumattomissa solmupisteiss\u00E4 ja " + "j\u00E4nnitelakia (KVL) riippumattomissa silmukoissa.",
                        "Yhdistä vastuksen jännite ja virta kaavalla V = I × R.",
                        "Ratkaise yhtälöryhmä ja tarkista tehotase.",
                    ],
                    "paragraphs": [
                        "Yksinkertaistetussa mallissa voidaan j\u00E4tt\u00E4\u00E4 huomiotta kennojen " + "sis\u00E4inen resistanssi, kosketusresistanssi, muuntimen hy\u00F6tysuhde, " + "l\u00E4mp\u00F6tilan vaikutukset, transientit, suojapiirit ja komponenttien " + "toleranssit. Ota huomioon kaikki t\u00E4llaiset tekij\u00E4t, jotka " + "vaikuttavat olennaisesti suurvirtapiirin toimintaan.",
                    ],
                },
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Kirchhoff%27s_circuit_laws",
        },
        "concept-temperature-coefficient-of-resistance": {
            "displayName": "Resistanssin lämpötilakerroin (TCR)",
            "description": "Resistanssin lämpötilakertoimen avulla arvioidaan, miten "
                + "resistanssi muuttuu materiaalin lämmetessä tai jäähtyessä.",
            "summary": "Miten materiaalin resistanssi muuttuu lämpötilan mukana.",
            "sections": [
                {
                    "id": "linear-model",
                    "title": "Lineaarinen malli",
                    "paragraphs": [
                        "Kun l\u00E4mp\u00F6tilan muutos on pieni tai kohtalainen, k\u00E4yt\u00E4 ensimm\u00E4isen " + "kertaluvun riippuvuutta:",
                    ],
                    "formulas": [
                        {
                            "expression": "R_T = R_0 [1 + \\u03b1 (T - T_0)]",
                        },
                    ],
                    "bullets": [
                        "R_0 on resistanssi vertailulämpötilassa T_0.",
                        "R_T on arvioitu resistanssi lämpötilassa T.",
                        "α on materiaalin lämpötilakerroin, jonka yksikkö on 1/°C tai ppm/°C.",
                        "Erotuksen T - T_0 laskennassa l\u00E4mp\u00F6tiloilla on oltava sama " + "asteikko ja yksikk\u00F6.",
                    ],
                },
                {
                    "id": "positive-and-negative",
                    "title": "Positiivinen ja negatiivinen TCR",
                    "bullets": [
                        "Positiivinen TCR tarkoittaa, ett\u00E4 resistanssi kasvaa l\u00E4mp\u00F6tilan " + "noustessa. Monet metallit k\u00E4ytt\u00E4ytyv\u00E4t n\u00E4in.",
                        "Negatiivinen TCR tarkoittaa, ett\u00E4 resistanssi pienenee l\u00E4mp\u00F6tilan " + "noustessa.",
                        "L\u00E4hell\u00E4 nollaa oleva TCR tarkoittaa, ett\u00E4 resistanssi muuttuu " + "vain v\u00E4h\u00E4n m\u00E4\u00E4ritetyll\u00E4 alueella.",
                        "Kertoimen etumerkill\u00E4 on merkityst\u00E4: negatiivisen arvon " + "korvaaminen sen itseisarvolla muuttaa ennustetun muutoksen " + "suunnan p\u00E4invastaiseksi.",
                    ],
                },
                {
                    "id": "worked-example",
                    "title": "Laskuesimerkki",
                    "examples": [
                        {
                            "title": "Lämmitettävä vastus",
                            "setup": "Vastuksen resistanssi on 1,00 Ω lämpötilassa 20 °C, ja sen TCR on "
                                + "400 ppm/°C.",
                            "formulas": [
                                "\\u03b1 = 400 × 10^-6 / \\u00b0C = 0.0004 / \\u00b0C",
                                "\\u0394T = 100 - 20 = 80 \\u00b0C",
                                "R_T = 1.00 [1 + 0.0004 × 80] = 1.032 \\u03a9",
                            ],
                            "conclusion": "Arvioitu resistanssi on 1,032 Ω eli noin 3,2 % suurempi kuin "
                                + "lämpötilassa 20 °C.",
                        },
                    ],
                },
                {
                    "id": "power-and-limits",
                    "title": "TCR, teho ja käytännön rajoitukset",
                    "formulas": [
                        {
                            "expression": "I = V / R",
                        },
                        {
                            "expression": "P = V^2 / R = I^2 × R",
                        },
                    ],
                    "paragraphs": [
                        "Kun positiivisen TCR:n vastukseen sy\u00F6tet\u00E4\u00E4n vakioj\u00E4nnite, " + "l\u00E4mp\u00F6tilan nousu kasvattaa resistanssia ja pyrkii pienent\u00E4m\u00E4\u00E4n " + "virtaa. Vakiovirtal\u00E4hdett\u00E4 k\u00E4ytett\u00E4ess\u00E4 sama resistanssin kasvu " + "lis\u00E4\u00E4 tehoa.",
                        "Valmistajan ilmoittama TCR koskee yleens\u00E4 m\u00E4\u00E4ritetty\u00E4 l\u00E4mp\u00F6tila- " + "ja resistanssialuetta. L\u00E4mp\u00F6tilaerot materiaalin sis\u00E4ll\u00E4, " + "materiaalin muutokset, koskettimet, mekaaninen rasitus ja virran " + "aiheuttama l\u00E4mpeneminen voivat saada todellisen tuloksen " + "poikkeamaan ensimm\u00E4isen kertaluvun arviosta.",
                    ],
                },
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Temperature_coefficient_of_resistance",
        },
        "concept-trigonometry": {
            "displayName": "Trigonometria",
            "description": "Trigonometria kuvaa kulmien ja pituuksien välisiä suhteita. Sitä "
                + "käytetään esimerkiksi vektorien, vaihesuhteiden ja aaltomuotojen "
                + "tarkasteluun.",
            "summary": "Kulmien ja kolmion sivujen väliset suhteet.",
            "sections": [
                {
                    "id": "right-triangles",
                    "title": "Suorakulmaiset kolmiot",
                    "paragraphs": [
                        "Kulman \u03B8 vastainen kateetti on kulmaa vastap\u00E4\u00E4t\u00E4. Viereinen " + "kateetti rajaa kulmaa yhdess\u00E4 hypotenuusan kanssa, ja hypotenuusa " + "on suoraa kulmaa vastap\u00E4\u00E4t\u00E4. Englanninkielinen muistis\u00E4\u00E4nt\u00F6 " + "SOH-CAH-TOA tarkoittaa seuraavaa: sini on vastaisen kateetin " + "suhde hypotenuusaan, kosini on viereisen kateetin suhde " + "hypotenuusaan ja tangentti on vastaisen kateetin suhde viereiseen " + "kateettiin.",
                    ],
                    "formulas": [
                        {
                            "expression": "sin(θ) = opposite / hypotenuse",
                        },
                        {
                            "expression": "cos(θ) = adjacent / hypotenuse",
                        },
                        {
                            "expression": "tan(θ) = opposite / adjacent",
                        },
                    ],
                },
                {
                    "id": "finding-sides-and-angles",
                    "title": "Tuntemattomien sivujen ja kulmien laskeminen",
                    "examples": [
                        {
                            "title": "Laske sivun pituus",
                            "setup": "Suorakulmaisen kolmion hypotenuusa on 10 cm ja tarkasteltava kulma 30°.",
                            "formulas": [
                                "opposite = 10 × sin(30°) = 5 cm",
                                "adjacent = 10 × cos(30°) ≈ 8.66 cm",
                            ],
                            "conclusion": "Käytä käänteistä trigonometristä funktiota, kun sivujen pituudet "
                                + "tunnetaan.",
                        },
                    ],
                    "formulas": [
                        {
                            "expression": "θ = sin^-1(opposite / hypotenuse)",
                        },
                        {
                            "expression": "θ = cos^-1(adjacent / hypotenuse)",
                        },
                        {
                            "expression": "θ = tan^-1(opposite / adjacent)",
                        },
                    ],
                },
                {
                    "id": "degrees-and-radians",
                    "title": "Asteet ja radiaanit",
                    "formulas": [
                        {
                            "expression": "180° = π radians",
                        },
                        {
                            "expression": "θ_rad = θ_deg × π / 180",
                        },
                    ],
                    "paragraphs": [
                        "Laskimessa on oltava k\u00E4yt\u00F6ss\u00E4 oikea kulmayksikk\u00F6. Jos radiaaneina " + "annettua arvoa k\u00E4ytet\u00E4\u00E4n astetilassa tai p\u00E4invastoin, tulos " + "muuttuu. T\u00E4ysi kierros on 360\u00B0 eli 2\u03C0 radiaania.",
                    ],
                },
                {
                    "id": "waveforms-and-identities",
                    "title": "Aaltomuodot ja hyödylliset identiteetit",
                    "formulas": [
                        {
                            "expression": "x(t) = A × sin(2πft + φ)",
                        },
                        {
                            "expression": "ω = 2πf",
                        },
                        {
                            "expression": "sin^2(θ) + cos^2(θ) = 1",
                        },
                        {
                            "expression": "a^2 + b^2 = c^2",
                        },
                    ],
                    "bullets": [
                        "A on amplitudi, f on taajuus hertsein\u00E4, t on aika sekunteina ja \u03C6 " + "on vaihekulma.",
                        "Kulmataajuus ω mitataan radiaaneina sekunnissa.",
                        "Huomioi etumerkki ja koordinaatiston nelj\u00E4nnes, kun suunnalla tai " + "vaiheella on merkityst\u00E4.",
                    ],
                },
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Trigonometry",
        },
        "concept-heat-capacity": {
            "displayName": "Lämpökapasiteetti",
            "description": "Lämpökapasiteetti kuvaa siirtyvän energian ja kappaleen tai "
                + "materiaalin lämpötilan muutoksen välistä yhteyttä.",
            "summary": "Kuinka paljon energiaa kappaleen lämpötilan muuttamiseen tarvitaan.",
            "sections": [
                {
                    "id": "basic-relationships",
                    "title": "Perussuhteet",
                    "formulas": [
                        {
                            "expression": "C = Q / ΔT",
                        },
                        {
                            "expression": "Q = m × c × ΔT",
                        },
                    ],
                    "bullets": [
                        "C on lämpökapasiteetti, jonka yksikkö on J/K tai J/°C.",
                        "Q on siirtyvä lämpöenergia jouleina (J).",
                        "m on massa kilogrammoina ja c on ominaisl\u00E4mp\u00F6kapasiteetti " + "yksik\u00F6ss\u00E4 J/(kg\u00B7K).",
                        "1 K:n lämpötilaero on yhtä suuri kuin 1 °C:n ero.",
                    ],
                },
                {
                    "id": "worked-example",
                    "title": "Laskuesimerkki",
                    "examples": [
                        {
                            "title": "Veden lämmitys",
                            "setup": "Lämmitä 0,20 kg vettä lämpötilasta 20 °C lämpötilaan 70 °C. Käytä "
                                + "arvoa c = 4 180 J/(kg·K).",
                            "formulas": [
                                "ΔT = 70 - 20 = 50 °C",
                                "Q = 0.20 × 4,180 × 50 = 41,800 J",
                            ],
                            "conclusion": "Ideaalinen energiantarve on 41,8 kJ. Todellinen lämmitin "
                                + "tarvitsee enemmän energiaa häviöiden vuoksi.",
                        },
                    ],
                },
                {
                    "id": "electrical-heating",
                    "title": "Lämmitys sähköteholla",
                    "formulas": [
                        {
                            "expression": "Q = P × t",
                        },
                        {
                            "expression": "t = m × c × ΔT / P",
                        },
                    ],
                    "examples": [
                        {
                            "title": "Ideaalinen lämmitysaika",
                            "setup": "Toteuta esimerkin 41,8 kJ:n lämmitys 100 W:n vakioteholla ilman häviöitä.",
                            "formulas": [
                                "t = 41,800 J / 100 W = 418 s",
                            ],
                            "conclusion": "Ideaalinen aika on noin 7,0 minuuttia. Kun lämmönsiirron "
                                + "hyötysuhde on 80 %, aikaa tarvitaan noin 523 sekuntia.",
                        },
                    ],
                },
                {
                    "id": "object-and-material",
                    "title": "Kappaleen ja materiaalin ominaisuudet",
                    "paragraphs": [
                        "L\u00E4mp\u00F6kapasiteetti on koko kappaleen ominaisuus ja riippuu " + "materiaalin m\u00E4\u00E4r\u00E4st\u00E4. Ominaisl\u00E4mp\u00F6kapasiteetti on materiaalin " + "ominaisuus. Samalla materiaalilla massan kaksinkertaistaminen " + "kaksinkertaistaa l\u00E4mp\u00F6kapasiteetin.",
                    ],
                    "formulas": [
                        {
                            "expression": "C_total = Σ m_i × c_i",
                        },
                    ],
                },
                {
                    "id": "phase-changes-and-limits",
                    "title": "Olomuodon muutokset ja käytännön rajoitukset",
                    "formulas": [
                        {
                            "expression": "Q = m × L",
                        },
                    ],
                    "paragraphs": [
                        "Sulamisen tai kiehumisen aikana sy\u00F6tetty energia voi muuttaa " + "materiaalin olomuotoa ilman l\u00E4mp\u00F6tilan muutosta. L on " + "ominaislatenttil\u00E4mp\u00F6 yksik\u00F6ss\u00E4 J/kg.",
                        "Yksinkertainen yht\u00E4l\u00F6 olettaa ominaisl\u00E4mp\u00F6kapasiteetin likimain " + "vakioksi. L\u00E4mp\u00F6h\u00E4vi\u00F6t, konvektio, s\u00E4teily, haihtuminen, " + "rajapintojen l\u00E4mp\u00F6vastus ja ep\u00E4tasainen l\u00E4mp\u00F6tila voivat saada " + "todellisen tuloksen poikkeamaan ideaalisesta.",
                    ],
                },
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_capacity",
        },
        "concept-heat-flux": {
            "displayName": "Lämpövirran tiheys",
            "description": "Lämpövirran tiheys kuvaa, kuinka nopeasti lämpö siirtyy pinnan "
                + "läpi pinta-alayksikköä kohti. Se ei riipu lämpöä varastoivan "
                + "materiaalin kokonaismäärästä.",
            "summary": "Lämmön siirtyminen aikayksikköä ja pinta-alayksikköä kohti.",
            "sections": [
                {
                    "id": "definition",
                    "title": "Määritelmä",
                    "formulas": [
                        {
                            "expression": "q'' = Q_dot / A",
                        },
                    ],
                    "bullets": [
                        "q'' on lämpövirran tiheys yksikössä W/m².",
                        "Q_dot on kokonaislämpövirta watteina (W).",
                        "A on pinta-ala, jonka läpi lämpö siirtyy, neliömetreinä (m²).",
                    ],
                    "paragraphs": [
                        "L\u00E4mp\u00F6virran tiheys ja l\u00E4mp\u00F6kapasiteetti ovat eri suureita. " + "L\u00E4mp\u00F6kapasiteetti kuvaa varastoitunutta energiaa l\u00E4mp\u00F6tilan " + "muutosta kohti, kun taas l\u00E4mp\u00F6virran tiheys kuvaa l\u00E4mm\u00F6n " + "siirtymist\u00E4 pinnan l\u00E4pi aikayksikk\u00F6\u00E4 ja pinta-alayksikk\u00F6\u00E4 kohti.",
                    ],
                },
                {
                    "id": "worked-example",
                    "title": "Laskuesimerkki",
                    "examples": [
                        {
                            "title": "Lämmittimen keskimääräinen lämpövirran tiheys",
                            "setup": "100 W:n lämmitin siirtää lämpöä 0,020 m²:n pinta-alan läpi.",
                            "formulas": [
                                "q'' = 100 W / 0.020 m² = 5,000 W/m²",
                            ],
                            "conclusion": "Keskimääräinen lämpövirran tiheys on 5 000 W/m² eli 0,5 W/cm².",
                        },
                    ],
                },
                {
                    "id": "conduction",
                    "title": "Lämmön johtuminen tasaisen kerroksen läpi",
                    "formulas": [
                        {
                            "expression": "q'' = -k × ΔT / L",
                        },
                        {
                            "expression": "Q_dot = k × A × (T_hot - T_cold) / L",
                        },
                    ],
                    "bullets": [
                        "k on lämmönjohtavuus yksikössä W/(m·K).",
                        "ΔT on kerroksen vastakkaisten pintojen välinen lämpötilaero.",
                        "L on kerroksen paksuus metreinä.",
                        "Miinusmerkki ilmaisee, ett\u00E4 l\u00E4mp\u00F6 siirtyy korkeammasta " + "l\u00E4mp\u00F6tilasta matalampaan.",
                    ],
                },
                {
                    "id": "convection-and-radiation",
                    "title": "Konvektio ja säteily",
                    "formulas": [
                        {
                            "expression": "q'' = h × (T_s - T_∞)",
                        },
                        {
                            "expression": "q'' = ε × σ × (T_s^4 - T_sur^4)",
                        },
                    ],
                    "paragraphs": [
                        "Konvektiota kuvataan pinnan l\u00E4mm\u00F6nsiirtokertoimella h. S\u00E4teilyss\u00E4 " + "k\u00E4ytet\u00E4\u00E4n emissiivisyytt\u00E4 \u03B5 ja Stefan\u2013Boltzmannin vakiota \u03C3. " + "S\u00E4teily-yht\u00E4l\u00F6n l\u00E4mp\u00F6tilojen on oltava absoluuttisia l\u00E4mp\u00F6tiloja " + "kelvinein\u00E4.",
                    ],
                },
                {
                    "id": "practical-checks",
                    "title": "Tarkistukset käytännössä",
                    "bullets": [
                        "Muunna pinta-ala neliömetreiksi (m²) ennen yksikön W/m² käyttöä.",
                        "Erota keskim\u00E4\u00E4r\u00E4inen l\u00E4mp\u00F6virran tiheys paikallisesta " + "huippuarvosta: l\u00E4mpeneminen voi olla ep\u00E4tasaista.",
                        "Ota tarvittaessa huomioon rajapintojen l\u00E4mp\u00F6vastus, konvektio, " + "s\u00E4teily ja l\u00E4mp\u00F6h\u00E4vi\u00F6t.",
                        "L\u00E4mp\u00F6virran tiheys kuvaa l\u00E4mm\u00F6n siirtymisnopeutta, ei l\u00E4mp\u00F6tilaa. " + "K\u00E4yt\u00E4 l\u00E4mp\u00F6kapasiteettia l\u00E4mp\u00F6tilan muutoksen laskemiseen.",
                    ],
                },
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_flux",
        },
        "concept-si-system-and-imperial-units": {
            "displayName": "SI-järjestelmä ja brittiläiset mittayksiköt",
            "description": "Kansainvälinen yksikköjärjestelmä tarjoaa tekniikan laskentaan "
                + "yhtenäiset perusyksiköt, johdetut yksiköt ja kymmenpotensseihin "
                + "perustuvan asteikon.",
            "summary": "Teknisissä laskelmissa käytetyt yksiköt, etuliitteet ja muunnokset.",
            "sections": [
                {
                    "id": "base-units",
                    "title": "Yleiset SI-yksiköt",
                    "table": {
                        "headers": [
                            "Suure",
                            "SI-yksikkö",
                            "Symboli",
                        ],
                        "rows": [
                            [
                                "Pituus",
                                "metri",
                                "m",
                            ],
                            [
                                "Massa",
                                "kilogramma",
                                "kg",
                            ],
                            [
                                "Aika",
                                "sekunti",
                                "s",
                            ],
                            [
                                "Lämpötila",
                                "kelvin",
                                "K",
                            ],
                            [
                                "Sähkövirta",
                                "ampeeri",
                                "A",
                            ],
                            [
                                "Ainemäärä",
                                "mooli",
                                "mol",
                            ],
                            [
                                "Valovoima",
                                "kandela",
                                "cd",
                            ],
                        ],
                    },
                    "bullets": [
                        "Jännite: voltti (V).",
                        "Resistanssi: ohmi (Ω).",
                        "Teho: watti (W).",
                        "Energia: joule (J).",
                        "Voima: newton (N).",
                        "Paine: pascal (Pa).",
                        "Taajuus: hertsi (Hz).",
                    ],
                },
                {
                    "id": "decimal-prefixes",
                    "title": "Desimaalietuliitteet",
                    "table": {
                        "headers": [
                            "Etuliite",
                            "Symboli",
                            "Kerroin",
                        ],
                        "rows": [
                            [
                                "kilo",
                                "k",
                                "1 000 = 10^3",
                            ],
                            [
                                "mega",
                                "M",
                                "1 000 000 = 10^6",
                            ],
                            [
                                "milli",
                                "m",
                                "0,001 = 10^-3",
                            ],
                            [
                                "mikro",
                                "μ",
                                "0,000001 = 10^-6",
                            ],
                            [
                                "nano",
                                "n",
                                "0,000000001 = 10^-9",
                            ],
                        ],
                    },
                    "paragraphs": [
                        "Esimerkiksi 2,2 k\u03A9 on 2 200 \u03A9 ja 15 mA on 0,015 A. Muunna arvot " + "yhteensopiviin yksik\u00F6ihin ennen kaavan k\u00E4ytt\u00E4mist\u00E4.",
                    ],
                },
                {
                    "id": "length-conversions",
                    "title": "Tuumat ja metrijärjestelmän pituusyksiköt",
                    "formulas": [
                        {
                            "expression": "1 inch = 25.4 mm = 0.0254 m",
                        },
                        {
                            "expression": "1 foot = 12 inches = 0.3048 m",
                        },
                        {
                            "expression": "1 yard = 3 feet = 0.9144 m",
                        },
                        {
                            "expression": "1 in² = 645.16 mm²",
                        },
                    ],
                    "examples": [
                        {
                            "title": "Muunna pituus",
                            "setup": "Muunna 0,1 tuumaa millimetreiksi ja 5 mm tuumiksi.",
                            "formulas": [
                                "0.1 inch × 25.4 = 2.54 mm",
                                "5 mm / 25.4 ≈ 0.19685 inch",
                            ],
                            "conclusion": "Pinta-alan ja tilavuuden muunnoksissa pituuden muuntokerroin "
                                + "korotetaan vastaavaan potenssiin.",
                        },
                    ],
                },
                {
                    "id": "other-conversions",
                    "title": "Muut yleiset muunnokset",
                    "bullets": [
                        "1 lb ≈ 0,45359237 kg.",
                        "1 lbf ≈ 4,44822 N.",
                        "1 psi ≈ 6 894,76 Pa.",
                        "°F = °C × 9/5 + 32.",
                        "°C = (°F - 32) × 5/9.",
                        "K = °C + 273,15.",
                    ],
                    "paragraphs": [
                        "Pauna voi tarkoittaa massaa (lb) tai voimaa (lbf), jotka ovat eri " + "suureita. Samoin tuumat, neli\u00F6tuumat ja kuutiotuumat mittaavat " + "eri ulottuvuuksia.",
                    ],
                },
                {
                    "id": "unit-checks",
                    "title": "Yksiköiden tarkistaminen käytännössä",
                    "bullets": [
                        "Kirjoita yksikkö kunkin arvon viereen laskennan aikana.",
                        "Varmista, että yhtälön molempien puolten dimensiot ovat yhteensopivat.",
                        "Tee yksikkömuunnokset ennen kerto- tai jakolaskua.",
                        "Py\u00F6rist\u00E4 vasta lopuksi, jotta v\u00E4litulokset pysyv\u00E4t riitt\u00E4v\u00E4n " + "tarkkoina.",
                    ],
                },
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/International_System_of_Units",
        },
        "concept-wire-gauges-awg-swg-bwg": {
            "displayName": "Lankakoot: AWG, SWG ja BWG",
            "description": "Lankakoon numero kertoo nimelliskoon vain, jos myös "
                + "kokojärjestelmä on ilmoitettu.",
            "summary": "Miksi lankakoon numeron lisäksi tarvitaan kokojärjestelmän nimi "
                + "ja halkaisija.",
            "sections": [
                {
                    "id": "gauge-systems",
                    "title": "Lankojen kokojärjestelmät",
                    "bullets": [
                        "AWG tarkoittaa American Wire Gauge -j\u00E4rjestelm\u00E4\u00E4, joka on " + "tunnettu my\u00F6s nimell\u00E4 Brown & Sharpe.",
                        "SWG tarkoittaa Standard Wire Gauge -j\u00E4rjestelm\u00E4\u00E4, joka on " + "historiallinen brittil\u00E4inen lankojen ja levyjen paksuuksien " + "kokoj\u00E4rjestelm\u00E4.",
                        "BWG tarkoittaa Birmingham Wire Gauge -j\u00E4rjestelm\u00E4\u00E4, jota on " + "k\u00E4ytetty rautalankojen, putkien ja levyjen paksuuksien " + "ilmoittamiseen.",
                        "Suurempi tavanomainen kokonumero tarkoittaa yleens\u00E4 pienemp\u00E4\u00E4 " + "halkaisijaa. Kokoa 0 paksummille langoille k\u00E4ytet\u00E4\u00E4n merkint\u00F6j\u00E4 " + "00, 000 tai 0000.",
                    ],
                    "paragraphs": [
                        "SWG- ja BWG-koot perustuvat taulukoihin, eik\u00E4 niit\u00E4 saa laskea " + "AWG-kaavalla. Sama numero ei siis tarkoita samaa halkaisijaa eri " + "j\u00E4rjestelmiss\u00E4.",
                    ],
                },
                {
                    "id": "awg-formula",
                    "title": "AWG-halkaisija ja poikkipinta-ala",
                    "formulas": [
                        {
                            "expression": "d_inch = 0.005 × 92^((36 - n) / 39)",
                        },
                        {
                            "expression": "d_mm = 0.127 × 92^((36 - n) / 39)",
                        },
                        {
                            "expression": "A = π × d^2 / 4",
                        },
                    ],
                    "paragraphs": [
                        "K\u00E4yt\u00E4 kokoja 1/0, 2/0, 3/0 ja 4/0 vastaavina arvoina n = 0, -1, " + "-2 ja -3. AWG m\u00E4\u00E4ritt\u00E4\u00E4 johtimen koon, mutta ei yleisp\u00E4tev\u00E4\u00E4 " + "turvallista virtaa. Kuormitettavuus riippuu my\u00F6s materiaalista, " + "eristyksest\u00E4, j\u00E4\u00E4hdytyksest\u00E4, asennuksesta ja sovellettavista " + "s\u00E4hk\u00F6m\u00E4\u00E4r\u00E4yksist\u00E4.",
                    ],
                },
                {
                    "id": "system-comparison",
                    "title": "Miksi järjestelmän nimellä on väliä",
                    "table": {
                        "headers": [
                            "Lankakoko",
                            "AWG",
                            "Brittiläinen SWG",
                            "BWG",
                        ],
                        "rows": [
                            [
                                "10",
                                "2,588 mm",
                                "3,251 mm",
                                "3,404 mm",
                            ],
                            [
                                "20",
                                "0,8128 mm",
                                "0,9144 mm",
                                "0,8890 mm",
                            ],
                            [
                                "30",
                                "0,2540 mm",
                                "0,3150 mm",
                                "0,3048 mm",
                            ],
                        ],
                    },
                    "paragraphs": [
                        "Arvot ovat nimellisi\u00E4. Tuotteen toleranssit, pinnoitteet, eristys " + "ja monis\u00E4ikeinen rakenne voivat vaikuttaa mitattuun halkaisijaan " + "tai ulkohalkaisijaan.",
                    ],
                },
                {
                    "id": "resistance",
                    "title": "Lankakoko, poikkipinta-ala ja resistanssi",
                    "formulas": [
                        {
                            "expression": "R = ρ × L / A",
                        },
                    ],
                    "paragraphs": [
                        "Resistanssi riippuu johtimen pituudesta L, poikkipinta-alasta A " + "ja materiaalin resistiivisyydest\u00E4 \u03C1. Koska poikkipinta-ala on " + "verrannollinen halkaisijan neli\u00F6\u00F6n, pienikin halkaisijaero voi " + "aiheuttaa merkitt\u00E4v\u00E4n resistanssieron. Kun AWG-kokonumero kasvaa " + "kolmella, poikkipinta-ala likimain puolittuu ja resistanssi " + "pituusyksikk\u00F6\u00E4 kohti kaksinkertaistuu samalla materiaalilla ja " + "samassa l\u00E4mp\u00F6tilassa.",
                    ],
                },
                {
                    "id": "practical-specification",
                    "title": "Langan koon ilmoittaminen käytännössä",
                    "bullets": [
                        "Ilmoita kokoj\u00E4rjestelm\u00E4 esimerkiksi merkinn\u00E4ll\u00E4 24 AWG tai 24 " + "British SWG.",
                        "Ilmoita nimellishalkaisija millimetrein\u00E4, jos kokoj\u00E4rjestelm\u00E4t " + "voivat sekoittua kesken\u00E4\u00E4n.",
                        "Ilmoita, tarkoittaako mitta paljaan johtimen halkaisijaa, " + "eristeen sis\u00E4lt\u00E4v\u00E4\u00E4 ulkohalkaisijaa, levyn paksuutta vai putken " + "sein\u00E4m\u00E4n paksuutta.",
                        "Ilmoita monis\u00E4ikeisen johtimen s\u00E4ierakenne, kun taipuisuudella ja " + "ulkohalkaisijalla on merkityst\u00E4.",
                        "M\u00E4\u00E4rit\u00E4 kuormitettavuus tuotetietojen ja s\u00E4hk\u00F6m\u00E4\u00E4r\u00E4ysten " + "perusteella, \u00E4l\u00E4 pelk\u00E4n lankakoon numeron perusteella.",
                    ],
                },
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Wire_gauge",
        },
    },
    materials: materialPresentationsFor(materialTexts),
    batteries: batteryPresentationsFor(batteryTexts),
    mods: modPresentationsFor(modTexts),
};
