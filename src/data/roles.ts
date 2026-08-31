import type {Localised} from "../utils/i18n.ts";
import type {DateRange} from "../utils/dates.ts";

interface Role {
    id: string;
    company: string | undefined;
    dates: DateRange;
    title: Localised;
}

export interface FeaturedRole extends Role {
    context: Localised;
    bullets: readonly Localised[];
}

export interface EarlierRole extends Role {
    summary: Localised;
}

export const featuredRoles: readonly FeaturedRole[] = [
    {
        id: "docline",
        company: "Docline (Aplicaciones de Salud, S.L.)",
        dates: {start: "2024-01"},
        title: {en: "Senior Front-End Engineer", es: "Senior Front-End Engineer"},
        context: {
            en: "Healthtech platform for online medical consultations.",
            es: "Plataforma healthtech de consulta médica online.",
        },
        bullets: [
            {
                en: "One of two front-end engineers covering all five of the company's products: video consultation, patient portal, back-office, mobile app and the shared component library.",
                es: "Uno de los dos front-end que cubren los cinco productos de la empresa: videoconsulta, portal de paciente, back-office, app móvil y la librería de componentes compartida.",
            },
            {
                en: "Own Docline Components, the component library every one of those products is built on — React, Styled-Components and TypeScript.",
                es: "Soy responsable de Docline Components, la librería sobre la que se construyen todos esos productos — React, Styled-Components y TypeScript.",
            },
            {
                en: "Set the front-end architecture and coding standards, and run code review and mentoring for the team.",
                es: "Defino la arquitectura de front y los estándares de código, y llevo el code review y la mentoría del equipo.",
            },
            {
                en: "Sole developer of Docline Care: built it with React Native and Expo and shipped it to both the App Store and Google Play.",
                es: "Desarrollé Docline Care en solitario con React Native y Expo, y me encargué de su publicación en App Store y Google Play.",
            },
            {
                en: "Leading Docline's AI-adoption push since March 2026: introduced an agentic AI development methodology (BMAD), used it to build the company's back-office end-to-end, and now runs mentoring sessions and workshops to roll it out to the rest of the team.",
                es: "Lidero la adopción de IA en Docline desde marzo de 2026: introduje una metodología de desarrollo agéntico con IA (BMAD), la usé para construir el back-office de la empresa de principio a fin, y ahora imparto mentorías y workshops para extenderla al resto del equipo.",
            },
        ],
    },
    {
        id: "shopery",
        company: "Shopery, S.L.",
        dates: {start: "2022-08", end: "2023-11"},
        title: {en: "Front-End Engineer", es: "Front-End Engineer"},
        context: {
            en: "E-commerce products for two consumer brands, in a five-person front-end team.",
            es: "Productos de e-commerce para dos marcas de consumo, en un equipo de cinco front-end.",
        },
        bullets: [
            {
                en: "Built the Mustang and YouPop storefronts with Next.js, React, TypeScript and SCSS, live in Spain, Mexico and the Dominican Republic.",
                es: "Construí las tiendas de Mustang y YouPop con Next.js, React, TypeScript y SCSS, en producción en España, México y República Dominicana.",
            },
        ],
    },
    {
        id: "stack_and_vault",
        company: "Stack and Vault, S.L.",
        dates: {start: "2021-09", end: "2022-08"},
        title: {en: "Front-End Engineer", es: "Front-End Engineer"},
        context: {
            en: "Three client products in parallel, web and cross-platform.",
            es: "Tres productos de cliente en paralelo, web y multiplataforma.",
        },
        bullets: [
            {
                en: "Wotoch: web app built with Svelte and TypeScript.",
                es: "Wotoch: aplicación web construida con Svelte y TypeScript.",
            },
            {
                en: "Voting Manager: cross-platform app sharing React and React Native code across web, iOS and Android.",
                es: "Voting Manager: app multiplataforma compartiendo código React y React Native entre web, iOS y Android.",
            },
            {
                en: "VR Manager and ImmoScout24: React and Redux web apps with TypeScript and SCSS.",
                es: "VR Manager e ImmoScout24: aplicaciones web con React y Redux sobre TypeScript y SCSS.",
            },
        ],
    },
];

export const earlierRoles: readonly EarlierRole[] = [
    {
        id: "capitole",
        company: "Capitole Consulting",
        dates: {start: "2019-10", end: "2021-09"},
        title: {en: "Programmer Analyst", es: "Analista Programador"},
        summary: {
            en: "Verisure OWA — customer web app built with React, Redux, GraphQL and SCSS.",
            es: "Verisure OWA — aplicación web de cliente construida con React, Redux, GraphQL y SCSS.",
        },
    },
    {
        id: "quo_health",
        company: "QUO Health, S.L.",
        dates: {start: "2017-02", end: "2019-10"},
        title: {en: "Front-End Developer", es: "Front-End Developer"},
        summary: {
            en: "gluQUO Diabetes Academy (React, React Native, Firebase) plus four more web products for the gluQUO and QUO Health brands.",
            es: "gluQUO Diabetes Academy (React, React Native, Firebase) y cuatro productos web más para las marcas gluQUO y QUO Health.",
        },
    },
    {
        id: "freelance",
        company: undefined,
        dates: {start: "2016", end: "2016"},
        title: {en: "Front-End Developer, freelance", es: "Front-End Developer, freelance"},
        summary: {
            en: "Websites for MarVal, S.L. and La Parada, S.L. — design, build and delivery.",
            es: "Webs para MarVal, S.L. y La Parada, S.L. — diseño, desarrollo y entrega.",
        },
    },
    {
        id: "hm_hospitales",
        company: "HM Hospitales (Montepríncipe)",
        dates: {start: "2015-09", end: "2016-07"},
        title: {en: "IT Support (CAU)", es: "Soporte IT (CAU)"},
        summary: {
            en: "Maintenance, incident management and infrastructure rollout.",
            es: "Mantenimiento, gestión de incidencias e implantación de infraestructura.",
        },
    },
];
