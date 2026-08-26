import type {Localised} from "../i18n.tsx";

export interface StackGroup {
    id: string;
    label: Localised;
    items: readonly string[];
}

export const stackGroups: readonly StackGroup[] = [
    {
        id: "daily",
        label: {en: "Day to day", es: "A diario"},
        items: ["React", "TypeScript", "React Native", "Expo", "Styled-Components", "SCSS"],
    },
    {
        id: "production",
        label: {en: "In production", es: "En producción"},
        items: ["Next.js", "Svelte", "Redux", "GraphQL"],
    },
    {
        id: "backend",
        label: {en: "Backend (2017–2019)", es: "Backend (2017–2019)"},
        items: ["Node.js", "Express", "Firebase", "MongoDB"],
    },
];
