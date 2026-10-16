import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./es";

export const messages: SharedMessages = {
    ...draftMessages,
    home: { ...draftMessages.home, tools: { ...draftMessages.home.tools,
        wirewiz: { ...draftMessages.home.tools.wirewiz, label: "Wire Wizard" } } },
    encyclopedia: { ...draftMessages.encyclopedia, kicker: "Referencia de Steam Engine" },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail, availableBy: (date) => `Disponible a más tardar el ${date}`,
        loadingPowerCurve: "Cargando la curva de potencia",
        evidenceDate: "Fecha de la documentación",
        recordStatus: "Estado del registro",
        catalogImplication: "Impacto en el catálogo",
        propertyLabels: { ...draftMessages.encyclopediaDetail.propertyLabels, boardController: "Placa/controlador" },
    },
};
