import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./pl";

type CatalogNounForms = {
    singular: string;
    genitive: string;
    plural: string;
    pluralGenitive: string;
    pluralInstrumental: string;
};

const catalogNouns: Readonly<Record<string, CatalogNounForms>> = {
    material: {
        singular: "materiał", genitive: "materiału", plural: "materiały",
        pluralGenitive: "materiałów", pluralInstrumental: "materiałami",
    },
    battery: {
        singular: "akumulator", genitive: "akumulatora", plural: "akumulatory",
        pluralGenitive: "akumulatorów", pluralInstrumental: "akumulatorami",
    },
    mod: {
        singular: "mod", genitive: "moda", plural: "mody",
        pluralGenitive: "modów", pluralInstrumental: "modami",
    },
};

// Only catalog-type arguments use these forms. User-created labels never pass through this lookup.
const catalogNoun = (value: string, form: keyof CatalogNounForms): string => {
    const key = value.toLowerCase();
    const pluralKeys: Readonly<Record<string, string>> = { materials: "material", batteries: "battery", mods: "mod" };
    const singularKey = pluralKeys[key] ?? key;
    return catalogNouns[singularKey]?.[form] ?? value;
};

export const messages: SharedMessages = {
    ...draftMessages,
    navigation: { ...draftMessages.navigation, home: "Strona główna Steam Engine" },
    theme: { ...draftMessages.theme, switchToLight: "Przełącz na tryb jasny" },
    catalogManager: {
        ...draftMessages.catalogManager,
        manage: (noun) => `Zarządzaj ${catalogNoun(noun, "pluralInstrumental")}`,
        shared: (noun) => `wspólny katalog ${catalogNoun(noun, "pluralGenitive")}`,
        close: (noun) => `Zamknij menedżera ${catalogNoun(noun, "pluralGenitive")}`,
        choose: (noun) => "Wybierz widoczne wbudowane elementy lub utwórz własne "
            + `${catalogNoun(noun, "plural")} przechowywane w tej przeglądarce.`,
        builtIn: (noun) => `Wbudowane ${catalogNoun(noun, "plural")}`,
        visibility: (noun) => "Zmiany widoczności są zapisywane natychmiast. "
            + `Ukryte ${catalogNoun(noun, "plural")} pozostają dostępne do klonowania.`,
        filterBuiltIns: "Filtruj wbudowane elementy",
        custom: (noun) => `Własne ${catalogNoun(noun, "plural")}`,
        customItemsDescription: (noun) => `Własne ${catalogNoun(noun, "plural")} `
            + "są zawsze widoczne na listach wyboru kalkulatorów.",
        newCustom: (noun) => `Nowy własny ${catalogNoun(noun, "singular")}`,
        noneYet: (noun) => `Nie ma jeszcze własnych ${catalogNoun(noun, "pluralGenitive")}.`,
        clone: "Klonuj",
        resetSaved: (noun) => `Zresetuj zapisane dane ${catalogNoun(noun, "pluralGenitive")}`,
        savedReset: (noun) => `Zresetowano zapisane dane ${catalogNoun(noun, "pluralGenitive")}.`,
        usedBy: (label, references) => `Nie można usunąć wpisu „${label}”; korzystają z niego: ${references}.`,
        deleted: (label) => `Usunięto wpis „${label}”.`,
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        editCustom: (noun) => `Edytuj własny ${catalogNoun(noun, "singular")}`,
        newCustom: (noun) => `Nowy własny ${catalogNoun(noun, "singular")}`,
        properties: (noun) => `Właściwości ${catalogNoun(noun, "genitive")}`,
        save: (noun) => `Zapisz ${catalogNoun(noun, "singular")}`,
        saved: (noun) => `Zapisano ${catalogNoun(noun, "singular")}.`,
        name: "Nazwa",
        removableCell: "Wyjmowane ogniwo",
        formFactor: "Format ogniwa",
        selectFormFactor: "Wybierz format ogniwa",
        sizeCodePlaceholder: "Opcjonalnie, np. 18650",
        wrapperColorPlaceholder: "Opcjonalny opis koloru",
        markingsPlaceholder: "Opcjonalnie; jedno oznaczenie z koszulki w każdym wierszu",
        currentWithCRatingPlaceholder: "Opcjonalnie, jeśli podano współczynnik C",
        cRatingWithCurrentPlaceholder: "Opcjonalnie, jeśli podano prąd",
        flatTop: "Płaski biegun dodatni",
        buttonTop: "Wypukły biegun dodatni",
        protectedStatus: "Zabezpieczenie ogniwa",
        protectedCell: "Z zabezpieczeniem",
        unprotectedCell: "Bez zabezpieczenia",
        wrapperColor: "Kolor koszulki",
        continuousC: "Znamionowy współczynnik C ciągłego rozładowania",
        density: "Gęstość (g/cm³)",
        normalizationInterpolated: " Punkt 20 °C został interpolowany, a krzywa znormalizowana.",
        normalizationExtrapolated: " Punkt 20 °C został ekstrapolowany, a krzywa znormalizowana.",
        normalizationExisting: " Krzywa TFR została znormalizowana w temperaturze 20 °C.",
    },
    ohm: {
        ...draftMessages.ohm,
        descriptionBeforeOhm: "W tym prostym kalkulatorze",
        descriptionAfterLaws: "służą do obliczania wartości.",
        joulesLawLinkLabel: "prawo Joule’a",
        simpleLocks: "Proste blokady",
        showDetailedLocks: "Pokaż szczegółowe blokady",
        hideDetailedLocks: "Ukryj szczegółowe blokady",
        detailedLocks: "Szczegółowe blokady",
        adjusting: (field) => `Podczas zmiany wartości „${field}”`,
        lockSummary: (changed, fixed) =>
            `Zmiana wartości „${changed}” pozostawia wartość „${fixed}” bez zmian.`,
        fields: { ...draftMessages.ohm.fields, current: "Prąd" },
    },
    home: {
        ...draftMessages.home,
        intro: "Steam Engine to zestaw praktycznych kalkulatorów do budowania grzałek, sprawdzania zużycia baterii, "
            + "mieszania liquidu i zrozumienia parametrów Twojego zestawu.",
        blogTitle: "Blog Steam Engine",
        catalogDescription: "Poznaj pojęcia i wyszukaj materiały, baterie, mody i płytki sterujące "
            + "używane przez Steam Engine.",
        tools: {
            ...draftMessages.home.tools,
            wirewiz: {
                ...draftMessages.home.tools.wirewiz,
                label: "Wire Wizard",
                description: "Połącz różne druty, aby zbudować grzałkę i określić jej krzywą temperaturową.",
            },
        },
    },
    encyclopedia: {
        ...draftMessages.encyclopedia,
        kicker: "Materiały referencyjne Steam Engine",
        lead: "Przeglądaj pojęcia, materiały, baterie, mody i płytki sterujące wykorzystywane w kalkulatorach.",
        entriesLabel: (count) => `Liczba wpisów: ${count}`,
        browseCategory: (label, count) => `Przeglądaj: ${label} (liczba wpisów: ${count})`,
        categoryLabels: { ...draftMessages.encyclopedia.categoryLabels, mods: "Mody i płytki sterujące" },
        categoryDescriptions: {
            ...draftMessages.encyclopedia.categoryDescriptions,
            materials: "Drut oporowy i materiały do kontroli temperatury.",
            mods: "Urządzenia regulowane i profile płytek sterujących.",
        },
    },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        protectedCell: "Ogniwo z zabezpieczeniem.",
        unprotectedCell: "Ogniwo bez zabezpieczenia.",
        materialCatalog: "Katalog materiałów na grzałki",
        breadcrumb: "Ścieżka nawigacyjna",
        availableBy: (date) => `Dostępne najpóźniej ${date}`,
        evidenceNotes: "Uwagi dotyczące dowodów",
        basedOnArticle: "Na podstawie artykułu z bazy wiedzy Steam Engine",
        loadingPowerCurve: "Ładowanie krzywej mocy",
        evidenceDate: "Data dokumentacji",
        recordStatus: "Status rekordu",
        catalogImplication: "Znaczenie dla katalogu",
        unit: "Jednostka",
        builtIntoModProfile: "Ten profil baterii jest wbudowany w profil moda:",
        additionalPropertyNotes: "Dodatkowe uwagi dotyczące właściwości",
        continuousDischargeCurrent: (current) =>
            `W katalogu podano znamionowy ciągły prąd rozładowania ${current} A.`,
        nonRemovableBatteryProfile: "Ten mod ma profil wbudowanego akumulatora:",
        wrapperColor: "Kolor koszulki",
        modBoardCatalog: "Katalog modów i płytek sterujących",
        propertyLabels: {
            ...draftMessages.encyclopediaDetail.propertyLabels,
            formFactor: "Format ogniwa",
            continuousDischarge: "Znamionowy limit ciągłego rozładowania",
            boardController: "Płytka sterująca/kontroler",
            resistivity: "Rezystywność w temperaturze 20 °C",
            specificHeatCapacity: "Ciepło właściwe",
        },
    },
};
