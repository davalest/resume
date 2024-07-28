import i18n from "i18next";
import {useTranslation} from "react-i18next";
import {useLanguage} from "../../contexts/language";
import {Link, NavLink, useLocation} from "react-router-dom";
import {english, spanish} from "assets";
import "./header.scss"
import {pathList} from "../../contexts/routes/constants.ts";

const Header = () => {
    const {t} = useTranslation("", { keyPrefix: 'header' });
    const {language, setLanguage} = useLanguage();
    const location = useLocation();
    const changeLanguages = (lng: string) => {
        i18n.changeLanguage(lng).then(() => setLanguage(lng))
    };

    const setNewLangTo = language === "en" ? "es" : "en";
    const langImg = language === "en" ? spanish : english;

    return (
        <div className="header-container">
            <div className="header-content">
                <div className="header-name">
                    <Link className="name-link" to="/">
                        <div className="name-title">{t('name')}</div>
                        <div className="work-title">{t('work')}</div>
                    </Link>
                </div>
                <div className="header-navigation">
                    <NavLink
                        to={pathList.root}
                        className={({isActive}) => `nav-link ${(location.pathname.toString() === pathList.home || isActive) && "active"}`}
                    >
                        {t('home')}
                    </NavLink>
                    <NavLink
                        to={pathList.resume}
                        className={({isActive}) => `nav-link ${isActive && "active"}`}
                    >
                        {t('resume')}
                    </NavLink>
                    <NavLink
                        to={pathList.skills}
                        className={({isActive}) => `nav-link ${isActive && "active"}`}
                    >
                        {t('skills')}
                    </NavLink>
                    <img className="lang-selector" src={langImg} alt={"language"} onClick={() => changeLanguages(setNewLangTo)}/>
                </div>
            </div>
        </div>
    )
}

export default Header
