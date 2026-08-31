import type {Localised} from "./i18n.ts";

export const sectionIds = {
    hero: "top",
    experience: "experience",
    stack: "stack",
    about: "about",
    education: "education",
    contact: "contact",
} as const;

export const sectionTitleId = (id: string): string => `${id}-title`;

export const navSections: readonly {id: string; label: Localised}[] = [
    {id: sectionIds.experience, label: {en: "Experience", es: "Experiencia"}},
    {id: sectionIds.stack, label: {en: "Stack", es: "Stack"}},
    {id: sectionIds.about, label: {en: "About", es: "Sobre mí"}},
    {id: sectionIds.education, label: {en: "Education", es: "Formación"}},
    {id: sectionIds.contact, label: {en: "Contact", es: "Contacto"}},
];

export const navSectionIds: readonly string[] = navSections.map(({id}) => id);

export const withBase = (path: string): string =>
    `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
