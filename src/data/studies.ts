import type {Localised} from "../utils/i18n.ts";

export interface Study {
    id: string;
    title: Localised;
    school: string;
    location: string;
    year?: string;
}

export const studies: readonly Study[] = [
    {
        id: "dam",
        title: {
            en: "HND in Multiplatform Application Development",
            es: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma",
        },
        school: "Ilerna",
        location: "Online",
        year: "2024",
    },
    {
        id: "daw",
        title: {
            en: "HND in Web Application Development",
            es: "Técnico Superior en Desarrollo de Aplicaciones Web",
        },
        school: "Ilerna",
        location: "Online",
        year: "2020",
    },
    {
        id: "asir",
        title: {
            en: "HND in Computer Systems and Networks Administration",
            es: "Técnico Superior en Administración de Sistemas Informáticos y Redes",
        },
        school: "IES Lázaro Cárdenas",
        location: "Collado Villalba",
        year: "2017",
    },
    {
        id: "smr",
        title: {
            en: "Microcomputer Systems and Networks Technician",
            es: "Técnico en Sistemas Microinformáticos y Redes",
        },
        school: "IES Infanta Elena",
        location: "Galapagar",
        year: "2015",
    },
];
