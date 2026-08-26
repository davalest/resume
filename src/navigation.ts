import type {Localised} from "./i18n.tsx";

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

export const navSectionIds = navSections.map(({id}) => id);
