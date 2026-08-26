import {EnvelopeIcon, GithubIcon, LinkedInIcon} from "../ui/icons/icons.tsx";
import type {Icon} from "../ui/icons/icons.tsx";

export interface ContactLink {
    id: string;
    Icon: Icon;
    label: string;
    href: string;
}

export const email: ContactLink = {
    id: "email",
    Icon: EnvelopeIcon,
    label: "david.valenciano.esteban@gmail.com",
    href: "mailto:david.valenciano.esteban@gmail.com",
};

export const socialLinks: readonly ContactLink[] = [
    {
        id: "linkedin",
        Icon: LinkedInIcon,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/david-valenciano",
    },
    {id: "github", Icon: GithubIcon, label: "GitHub", href: "https://github.com/davalest"},
];

export const allContactLinks: readonly ContactLink[] = [email, ...socialLinks];
