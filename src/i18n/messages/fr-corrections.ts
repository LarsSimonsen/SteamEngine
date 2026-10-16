import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./fr";

const catalogNouns: Readonly<Record<string, string>> = {
    material: "matériau", materials: "matériaux", battery: "batterie", batteries: "batteries",
    mod: "mod", mods: "mods",
};

// Only catalog type arguments pass through this map; user-entered labels remain untouched.
const catalogNoun = (noun: string): string =>
    Object.prototype.hasOwnProperty.call(catalogNouns, noun.toLowerCase())
        ? catalogNouns[noun.toLowerCase()]! : noun;

export const messages: SharedMessages = {
    ...draftMessages,
    home: {
        ...draftMessages.home,
        tools: {
            ...draftMessages.home.tools,
            wirewiz: {
                ...draftMessages.home.tools.wirewiz,
                label: "Wire Wizard",
            },
            ohm: {
                ...draftMessages.home.tools.ohm,
                description: "Calculez la résistance, la tension, le courant et la puissance avec l’effet Joule.",
            },
            batt: {
                ...draftMessages.home.tools.batt,
                description: "Consultez le courant et la puissance consommés par un appareil alimenté par batterie.",
            },
            modrange: {
                ...draftMessages.home.tools.modrange,
                label: "Plage de résistances du mod",
            },
        },
        blogTitle: "Blog Steam Engine",
    },
    encyclopedia: {
        ...draftMessages.encyclopedia,
        kicker: "Référence Steam Engine",
        openEntry: "Ouvrir l’entrée",
        lead: "Parcourez les concepts, matériaux, batteries, mods et cartes de contrôle " +
            "utilisés par les calculateurs.",
        categoryLabels: {
            ...draftMessages.encyclopedia.categoryLabels,
            mods: "Mods et cartes de contrôle",
        },
        categoryDescriptions: {
            ...draftMessages.encyclopedia.categoryDescriptions,
            materials: "Fils résistifs et matériaux pour le contrôle de température.",
            mods: "Appareils régulés et profils de cartes de contrôle.",
        },
    },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        sourceBackedMaterial: "Fiche matériau étayée par des sources",
        evidenceNotes: "Notes sur les éléments probants",
        loadingPowerCurve: "Chargement de la courbe de puissance",
        evidenceDate: "Date de la documentation",
        recordStatus: "État de la fiche",
        catalogImplication: "Impact sur le catalogue",
        wrapperColor: "Couleur de la gaine",
        propertyLabels: {
            ...draftMessages.encyclopediaDetail.propertyLabels,
            density: "Masse volumique",
            specificHeatCapacity: "Capacité thermique massique",
        },
        unknownPropertyValue: "Le catalogue n’établit pas de valeur pour cette propriété.",
        temperatureResistanceCurve: "Courbe de résistance en fonction de la température",
        loadingTemperatureCurve: "Chargement de la courbe de température…",
        continuousDischargeCurrent: (arg0) => "Le catalogue indique un courant nominal de décharge continue de " +
            String(arg0) +
            " A.",
        continuousDischargeC: (arg0) => "Le catalogue indique un taux nominal de décharge continue de " +
            String(arg0) +
            " C.",
        rewrapExplanation: "Cette marque est considérée comme une marque qui commercialise des cellules " +
            "d’autres fabricants sous sa propre gaine (« rewrap ») ; le fabricant " +
            "d’origine de la cellule n’est pas déduit de la gaine.",
        modBoardCatalog: "Catalogue de mods et de cartes de contrôle",
        noMaterialSources: "Aucune source n’est disponible pour ce matériau.",
        introduced: (arg0) => "Mise sur le marché : " + String(arg0),
        introducedBetween: (arg0, arg1) => "Mise sur le marché entre " + String(arg0) + " et " + String(arg1),
        introducedNoEarlier: (arg0) => "Mise sur le marché au plus tôt : " + String(arg0),
        availableBy: (arg0) => "Disponible au plus tard : " + String(arg0),
        reviewed: (arg0) => "Date de révision : " + String(arg0),
    },
    navigation: {
        ...draftMessages.navigation,
        home: "Accueil Steam Engine",
    },
    theme: { ...draftMessages.theme, switchToLight: "Passer en mode clair" },
    footer: {
        ...draftMessages.footer,
        translationDraft: "Cette traduction a été générée automatiquement et attend une relecture humaine.",
    },
    calculatorVisibility: {
        ...draftMessages.calculatorVisibility,
        shown: "Visible",
        hidden: "Non visible",
        ariaLabel: (arg0) => "Visibilité dans les calculateurs : " + String(arg0),
    },
    catalogManager: {
        ...draftMessages.catalogManager,
        filterBuiltIns: "Filtrer les éléments prédéfinis",
        manage: (arg0) => "Gérer les " + catalogNoun(arg0),
        shared: (arg0) => "catalogue partagé : " + catalogNoun(arg0),
        close: (arg0) => "Fermer le gestionnaire : " + catalogNoun(arg0),
        choose: (arg0) => "Choisissez les éléments prédéfinis à afficher ou créez vos propres " +
            catalogNoun(arg0) +
            " à conserver dans ce navigateur.",
        builtIn: (plural) => "Éléments prédéfinis : " + catalogNoun(plural),
        visibility: (arg0) => "Les changements de visibilité sont enregistrés immédiatement. " +
            "Les éléments masqués du catalogue (" +
            catalogNoun(arg0) +
            ") restent disponibles pour être clonés.",
        custom: (plural) => "Éléments personnalisés : " + catalogNoun(plural),
        newCustom: (arg0) => "Créer un élément personnalisé : " + catalogNoun(arg0),
        noneYet: (arg0) => "Aucun élément personnalisé dans le catalogue (" + catalogNoun(arg0) + ") pour le moment.",
        resetSaved: (arg0) => "Réinitialiser les données enregistrées : " + catalogNoun(arg0),
        savedReset: (arg0) => "Les données enregistrées ont été réinitialisées : " + catalogNoun(arg0) + ".",
        customItemsDescription: (arg0) => "Les éléments personnalisés du catalogue (" +
            catalogNoun(arg0) +
            ") sont toujours affichés dans les sélecteurs des calculateurs.",
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        editCustom: (arg0) => "Modifier un élément personnalisé : " + catalogNoun(arg0),
        newCustom: (arg0) => "Créer un élément personnalisé : " + catalogNoun(arg0),
        properties: (arg0) => "Propriétés : " + catalogNoun(arg0),
        save: (arg0) => "Enregistrer : " + catalogNoun(arg0),
        saved: (arg0) => "Enregistrement effectué : " + catalogNoun(arg0) + ".",
        terminalStyle: "Type de borne",
        flatTop: "Borne plate",
        buttonTop: "Borne à téton",
        protectedStatus: "Protection intégrée",
        wrapperColor: "Couleur de la gaine",
        batteryHelp: "Saisissez au moins une limite de décharge continue. Les batteries intégrées " +
            "sont des blocs-batteries internes au mod ; les dimensions des cellules " +
            "individuelles ne sont donc pas requises. Les dimensions des cellules " +
            "amovibles sont nominales ; indiquez dans les notes les dimensions mesurées du " +
            "produit tel qu’il est vendu. Lorsque les deux limites de décharge sont " +
            "renseignées et diffèrent sensiblement, le calculateur continue d’utiliser la " +
            "limite calculée la plus prudente.",
        heatCapacity: "Capacité thermique massique (J/g·K)",
        density: "Masse volumique (g/cm³)",
        removeTfrPoint: "Supprimer le point TFR",
        addTfrPoint: "Ajouter un point TFR",
        normalizationInterpolated: " Le point à 20 °C a été interpolé et la courbe a été normalisée.",
        normalizationExtrapolated: " Le point à 20 °C a été extrapolé et la courbe a été normalisée.",
        normalizationExisting: " La courbe TFR a été normalisée à 20 °C.",
        sizeCodePlaceholder: "Facultatif, par ex. 18650",
        wrapperColorPlaceholder: "Description facultative",
        markingsPlaceholder: "Facultatif ; un marquage de la gaine par ligne",
        currentWithCRatingPlaceholder: "Facultatif si le taux en C est renseigné",
        cRatingWithCurrentPlaceholder: "Facultatif si le courant est renseigné",
    },
    ohm: {
        ...draftMessages.ohm,
        descriptionBeforeOhm: "Calculateur simple fondé sur la",
        descriptionAfterLaws: ".",
        simpleLocks: "Verrouillages simples",
        detailedLocks: "Verrouillages détaillés",
        lockSummary: (arg0, arg1) => "La modification de " +
            String(arg0) +
            " laisse la valeur de " +
            String(arg1) +
            " inchangée.",
        joulesLawLinkLabel: "la loi de Joule",
        title: "Loi d’Ohm",
    },
};
