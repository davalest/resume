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
        "where_ive_work":"He participado en varios proyectos, en los que he trabajado con equipos pequeños y grandes de personas estupendas. De los que me he llevado experiencias únicas.",
        "how_am_i": "Soy una persona proactiva que siempre está en busca de conocimientos y nuevas experiencias.",
        "work_with_me":"¿Quieres trabajar conmigo? Me encantaría saber de ti.",
        "work_experience":"Experiencia profesional",
        "actual_work":"Agosto 2022- Actualmente",
        "2021_2022":"Septiembre 2021- Agosto 2022",
        "2019_2021":"Octubre 2019- Septiembre 2021",
        "2017_2019":"Febrero 2017– Octubre 2019",
        "2015_2016":"Septiembre 2015– Julio 2016",
        "developed_projects":"Proyectos desarrollados:",
        "developed_tasks":"Tareas desempeñadas:",
        "used_tech":"Tecnologías empleadas: ",
        "web_app_dev":"Desarrollo de App web.",
        "native_app_dev":"Desarrollo de App web y mobile.",
        "website_development":"Maquetado y desarrollo de página web.",
        "design_website_development":"Diseño, maquetado y desarrollo de página web.",
        "incident_management":"Mantenimiento y gestión de incidencias.",
        "infraestructure_management":"Desarrollo e implementación de infraestructura.",
        "now":"Actualmente",
        "beginner":"Principiante",
        "advanced":"Avanzado",
        "expert":"Experto",
        "native":"Nativo",
        "months":"Meses",
        "years":"Años",
        "other_knowledge":"Otros conocimientos",
        "language_skills":"Conocimiento de idiomas",
        "spanish_exp":"Español",
        "english_adv":"Inglés",
        "other_data":"Otros datos de interés",
        "driving_license":"Permiso de conducir (B)",
        "car_owner":"Coche propio",
        "cross_browser":"Compatibilidad cross-browser",
        "git_knowledge":"Conocimiento de Git",
        "willing_relocation":"Disponibilidad para movilidad geográfica",
        "responsive_implementation": "Implementación responsive",
        "team_working_skills":"Habilidades de trabajo en equipo",
        "name_title":"Nombre",
        "name_text":"David Valenciano Esteban",
        "email_title":"Email",
        "email_text":"david.valenciano.esteban@gmail.com",
        "email_text2":"david.valenciano. esteban@gmail.com",
        "phone_title":"Teléfono",
        "phone_text":"+ 34 600 80 90 24",
        "birthdate_title":"Fecha de nacimiento",
        "birthdate_text":"17 Mayo 1991",
        "address_title":"Dirección",
        "address_text":"C/ Isla de la Toja nº1 escalera derecha 3ºD",
        "nationality_title":"Nationalidad",
        "nationality_text":"Español",
        "hnc_dam": "Técnico Superior de Desarrollo de Aplicaciones Multiplataforma",
        "hnc_daw": "Técnico Superior de Desarrollo de Aplicaciones Web",
        "hnc_asir": "Técnico Superior de Administración de Sistemas Informáticos y Redes",
        "hnc_smr": "Técnico de Sistemas Microinformáticos y Redes"

    },
    en: {
        "home": "Home",
        "about": "About",
        "skills": "Skills",
        "experience": "Experience",
        "education": "Education",
        "contact": "Contact",
        "know_me": "Know me",
        "resume":"Resume",
        "projects":"Projects",
        "download_resume": "Download resume",
        "who_am_i":"My name is David Valenciano Esteban and I'm front-end developer. I have also been Freelance Web Layout Designer.",
        "where_ive_work":"I have participated in several projects, in which I have worked with small and big teams of great people. Of which I have taken unique experiences.",
        "how_am_i": "I am a proactive person who is always looking for knowledge and new experiences.",
        "work_with_me":"Do you want to work with me? I would love to hear from you.",
        "work_experience":"Experience",
        "actual_work":"August 2022- Currently",
        "2021_2022":"September 2021- August 2022",
        "2019_2021":"October 2019- September 2021",
        "2017_2019":"February 2017- October 2019",
        "2015_2016":"September 2015– July 2016",
        "developed_projects":"Developed projects:",
        "developed_tasks":"Developed tasks:",
        "used_tech ":"Used technology",
        "web_app_dev":"Web App development.",
        "native_app_dev":"Web & Mobile App development.",
        "website_development":"Layout and website development.",
        "design_website_development":"Design, layout and website development.",
        "incident_management":"Maintenance and incident management.",
        "infraestructure_management":"Development and implementation of infrastructure.",
        "now":"Currently",
        "beginner":"Beginner",
        "advanced":"Advanced",
        "expert":"Expert",
        "native":"Experienced",
        "months":"Months",
        "years":"Years",
        "other_knowledge":"Other knowledge",
        "language_skills":"Language skills",
        "spanish_exp":"Spanish",
        "english_adv":"English Advanced",
        "other_data":"Other data of interest",
        "driving_license":"Driving license",
        "car_owner":"Car owner",
        "cross_browser":"Cross-browser compatibility",
        "git_knowledge":"Git knowledge",
        "willing_relocation":"Willing to relocate",
        "responsive_implementation": "Responsive implementation",
        "team_working_skills":"Team working skills",
        "name_title":"Name",
        "name_text":"David Valenciano Esteban",
        "email_title":"Email",
        "email_text":"david.valenciano.esteban@gmail.com",
        "email_text2":"david.valenciano. esteban@gmail.com",
        "phone_title":"Phone",
        "phone_text":"+ 34 600 80 90 24",
        "birthdate_title":"Date of birth",
        "birthdate_text":"17 May 1991",
        "address_title":"Address",
        "address_text":"1 Isla de la Toja Street 3ºD",
        "nationality_title":"Nationality",
        "nationality_text":"Spanish",
        "hnc_dam": "HND in Multiplatform Application Development",
        "hnc_daw": "HND in Web Application Development",
        "hnc_asir": "HND in Computer Systems and Networks Administration",
        "hnc_smr": "HND in Microcomputer Systems and Networks Technician"

    }
};

const DEFAULT_LANGUAGE = "en";

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
