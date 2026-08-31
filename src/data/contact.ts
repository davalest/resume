import type {IconName} from "../utils/icons.ts";

export interface ContactLink {
    id: string;
    icon: IconName;
    label: string;
    href: string;
}

export const email: ContactLink = {
    id: "email",
    icon: "envelope",
    label: "david.valenciano.esteban@gmail.com",
    href: "mailto:david.valenciano.esteban@gmail.com",
};

export const mailtoWithSubject = (subject: string): string =>
    `${email.href}?subject=${encodeURIComponent(subject)}`;

export const vCardPath = "david-valenciano.vcf";

export const socialLinks: readonly ContactLink[] = [
    {
        id: "linkedin",
        icon: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/david-valenciano",
    },
    {id: "github", icon: "github", label: "GitHub", href: "https://github.com/davalest"},
];

export const allContactLinks: readonly ContactLink[] = [email, ...socialLinks];

export const cvFiles = {
    en: "David-Valenciano-CV-EN.pdf",
    es: "David-Valenciano-CV-ES.pdf",
} as const;
