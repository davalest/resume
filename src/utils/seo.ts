import {locales, siteUrl, urlForLocale, type SupportedLanguage} from "../../site.config.ts";
import {earlierRoles, featuredRoles} from "../data/roles.ts";
import {studies} from "../data/studies.ts";
import {socialLinks} from "../data/contact.ts";
import {translator} from "./i18n.ts";
import {lastModified} from "./lastModified.ts";

export const ogImage = `${siteUrl}og-image.jpg`;

const PERSON = {
    givenName: "David",
    familyName: "Valenciano",
    username: "davalest",
    locality: "Madrid",
    country: "ES",
} as const;

/** Every job, newest first, as schema.org Roles wrapping their Organization. */
const employmentHistory = (language: SupportedLanguage) =>
    [...featuredRoles, ...earlierRoles]
        .filter((role) => role.company !== undefined)
        .map((role) => ({
            "@type": "OrganizationRole",
            roleName: role.title[language],
            startDate: role.dates.start,
            ...(role.dates.end ? {endDate: role.dates.end} : {}),
            worksFor: {"@type": "Organization", name: role.company},
        }));

const education = (language: SupportedLanguage) =>
    studies.map((study) => ({
        "@type": "EducationalOrganization",
        name: study.school,
        // The credential is the interesting part; the school is just where it happened.
        hasCredential: {
            "@type": "EducationalOccupationalCredential",
            name: study.title[language],
            ...(study.year ? {dateCreated: study.year} : {}),
            educationalLevel: "Higher National Diploma",
        },
    }));

export interface PageSeo {
    readonly language: SupportedLanguage;
    readonly title: string;
    readonly description: string;
    readonly ogDescription: string;
    readonly imageAlt: string;
    readonly ogLocale: string;
    readonly ogLocaleAlternate: string;
    readonly canonical: string;
    readonly alternates: readonly {hreflang: string; href: string}[];
    readonly jsonLd: string;
}

export const seoFor = (language: SupportedLanguage): PageSeo => {
    const t = translator(language);
    const locale = locales.find(({code}) => code === language);
    const other = locales.find(({code}) => code !== language);
    if (!locale || !other) {
        throw new Error(`seo: ${language} has no alternate locale to advertise`);
    }

    const canonical = urlForLocale(language);

    const graph = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": canonical,
        url: canonical,
        inLanguage: language,
        dateModified: lastModified(),
        primaryImageOfPage: {"@type": "ImageObject", url: ogImage, width: 1200, height: 630},
        mainEntity: {
            "@type": "Person",
            "@id": `${siteUrl}#person`,
            name: `${PERSON.givenName} ${PERSON.familyName}`,
            givenName: PERSON.givenName,
            familyName: PERSON.familyName,
            jobTitle: t("seo.job_title"),
            description: t("seo.description"),
            url: canonical,
            image: ogImage,
            // The address deliberately carries no email: it is on the page and in
            // the vCard for humans, and putting it in the graph only feeds scrapers.
            sameAs: socialLinks.map(({href}) => href),
            address: {
                "@type": "PostalAddress",
                addressLocality: PERSON.locality,
                addressCountry: PERSON.country,
            },
            knowsLanguage: [
                {"@type": "Language", name: "Spanish", alternateName: "es"},
                {"@type": "Language", name: "English", alternateName: "en"},
            ],
            knowsAbout: [
                "React",
                "TypeScript",
                "React Native",
                "Next.js",
                "Astro",
                "Front-end architecture",
                "Design systems",
                "Web accessibility",
            ],
            hasOccupation: {
                "@type": "Occupation",
                name: t("seo.job_title"),
                occupationalCategory: "15-1254.00",
                skills: "React, TypeScript, React Native, design systems, front-end architecture",
                occupationLocation: {"@type": "City", name: PERSON.locality},
            },
            worksFor: employmentHistory(language),
            alumniOf: education(language),
        },
    };

    return {
        language,
        title: t("seo.title"),
        description: t("seo.description"),
        ogDescription: t("seo.og_description"),
        imageAlt: t("seo.image_alt"),
        ogLocale: locale.ogLocale,
        ogLocaleAlternate: other.ogLocale,
        canonical,
        alternates: [
            ...locales.map(({code}) => ({hreflang: code, href: urlForLocale(code)})),
            {hreflang: "x-default", href: urlForLocale("en")},
        ],
        jsonLd: JSON.stringify(graph),
    };
};

export const profileMeta = {
    firstName: PERSON.givenName,
    lastName: PERSON.familyName,
    username: PERSON.username,
} as const;
