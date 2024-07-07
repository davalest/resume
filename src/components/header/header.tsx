import {Link, NavLink} from "react-router-dom";
import "./header.scss"
import {useTranslation} from "react-i18next";
import {useLanguage} from "../../contexts/language";
import i18n from "i18next";
import {english, spanish} from "assets";
const Header = () => {
    const {t} = useTranslation();
    const {language, setLanguage} = useLanguage();

    const changeLanguages = (lng: string) => {
        i18n.changeLanguage(lng).then(() => setLanguage(lng))
    };

    const setNewLangTo = language === "es" ? "en" : "es";
    const langImg = language === "es" ? english : spanish;

    return (
        <div className="header-container">
            <div className="header-content">
                <div className="header-name">
                    <Link className="name-link" to="/">
                        <div className="name-title">{t('header.name')}</div>
                        <div className="work-title">{t('header.work')}</div>
                    </Link>
                </div>
                <div className="header-navigation">
                    <NavLink
                        to="/"
                        className={({isActive}) => `nav-link ${isActive && "active"}`}
                    >
                        {t('header.home')}
                    </NavLink>
                    <NavLink
                        to="/resume"
                        className={({isActive}) => `nav-link ${isActive && "active"}`}
                    >
                        {t('header.resume')}
                    </NavLink>
                    <NavLink
                        to="/skills"
                        className={({isActive}) => `nav-link ${isActive && "active"}`}
                    >
                        {t('header.skills')}
                    </NavLink>
                    <img className="lang-selector" src={langImg} alt={"language"} onClick={() => changeLanguages(setNewLangTo)}/>
                </div>
            </div>
        </div>
    )
}

export default Header
