import {getPathArray, createCookie, getCookie} from "./utils";

const strings = {
    es: {
        "home": "Home",
        "about": "Sobre mi",
        "skills": "Aptitudes",
        "experience": "Experiencia",
        "education": "Educación",
        "contact": "Contacto",
        "know_me": "Conóceme",
        "resume":"Resumen",
        "projects":"Proyectos",
        "download_resume": "Descargar CV",
        "who_am_i": "Soy David Valenciano Esteban y me dedico a ser desarrollador front-end. Tambien he sido Maquetador Web.",
        "where_ive_work":"He participado en varios proyectos, en los que he trabajado con equipos pequeños de gente estupenda. De los que me he llevado experiencias únicas.",
        "how_am_i": "Soy una persona proactiva que siempre está en busca de conocimientos y nuevas experiencias.",
        "work_with_me":"¿Quieres trabajar conmigo? Me encantaría saber de ti.",
        "work_experience":"Experiencia profesional",
        "feb_actual":"Febrero 2017–actualmente",
        "2015_2016":"Septiembre 2015– Julio 2016",
        "developed_projects":"Proyectos desarrollados:",
        "developed_tasks":"Tareas desempeñadas:",
        "used_tech":"Tecnologías empleadas: ",
        "web_app_dev":"Desarrollo de App web.",
        "website_development":"Maquetado y desarrollo de página web.",
        "design_website_development":"Diseño, maquetado y desarrollo de página web.",
        "now":"Actualmente",
        "beginner":"Principiante",
        "advanced":"Avanzado",
        "expert":"Experto",
        "months":"Meses",
        "years":"Años",
    },
    en: {
        "home": "Home",
        "about": "About",
        "skills": "Skills",
        "experience": "Projects",
        "education": "Schooling",
        "contact": "Contact",
        "know_me": "Know me",
        "resume":"Resume",
        "projects":"Projects",
        "download_resume": "Download resume",
        "who_am_i":"My name is David Valenciano Esteban and I'm front-end developer. I have also been Freelance Web Layout Designer.",
        "where_ive_work":"I have participated in several projects, in which I have worked with small teams of great people. Of which I have taken unique experiences.",
        "how_am_i": "I am a proactive person who is always looking for knowledge and new experiences.",
        "work_with_me":"Do you want to work with me? I would love to hear from you.",
        "work_experience":"Experience",
        "feb_actual":"February 2017-currently",
        "2015_2016":"September 2015– July 2016",
        "developed_projects":"Developed projects:",
        "developed_tasks":"Developed tasks:",
        "used_tech ":"Used technology",
        "web_app_dev":"Web App development.",
        "website_development":"Layout and website development.",
        "design_website_development":"Design, layout and website development.",
        "now":"Now",
        "beginner":"Beginner",
        "advanced":"Advanced",
        "expert":"Expert",
        "months":"Months",
        "years":"Years",
    }
};

const DEFAULT_LANGUAGE = "es";

const lang = (getPathArray().length > 1 && strings[getPathArray()[1]]) ? getPathArray()[1] : undefined;

export const currentLanguage = (lang) ? lang : (
    (getCookie("lang")) ? getCookie("lang") : (
        (window.navigator.userLanguage) ? window.navigator.userLanguage.substr(0, 2) : (
            (window.navigator.language) ? window.navigator.language.substr(0, 2) : DEFAULT_LANGUAGE
        )
    )
);

document.getElementsByTagName("html")[0].setAttribute("lang", currentLanguage);

export const addLangToPath = (url, newLang = currentLanguage) => {
    if (url.match(/\/es\/|\/en\//gi)) {
        return url.replace(/\/es\/|\/en\//gi, `/${newLang}/`)
    } else {
        return `/${newLang}${url}`
    }
};

export const changeLanguage = (newLang) => {
    createCookie("lang", newLang);
    window.location = addLangToPath(window.location.pathname, newLang)
};

export default function getString(key) {
    const rsrcs = strings[currentLanguage];
    return (rsrcs) ? rsrcs[key] : strings[DEFAULT_LANGUAGE][key]
}
