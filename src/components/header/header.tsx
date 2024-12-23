import {useMemo} from "react";
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import {useLanguage} from "../../contexts/language";
import {Link, NavLink, useLocation} from "react-router-dom";
import {english, spanish} from "assets";
import "./header.scss";
import {pathList} from "../../contexts/routes/constants.ts";

const Header = () => {
    const {t} = useTranslation("", {keyPrefix: "header"});
    const {language, setLanguage} = useLanguage();
    const location = useLocation();
    const changeLanguages = (lng: string) => {
        i18n.changeLanguage(lng).then(() => setLanguage(lng))
    };

    const setNewLangTo = language === "en" ? "es" : "en";
    const langImg = language === "en" ? spanish : english;

    const navLinks = useMemo(
        () => [
            {path: pathList.root, label: t("home")},
            {path: pathList.resume, label: t("resume")},
            {path: pathList.skills, label: t("skills")},
        ],
        [t]
    );

    return (
        <header className="header-container">
            <div className="header-content">
                <div className="header-name">
                    <Link className="name-link" to="/">
                        <div className="name-title">{t("name")}</div>
                        <div className="work-title">{t("work")}</div>
                    </Link>
                </div>
                <nav className="header-navigation">
                    {navLinks.map(({path, label}) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({isActive}) =>
                                `nav-link ${isActive || location.pathname === pathList.home ? "active" : ""}`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                    <img className="lang-selector" src={langImg} alt={"language"} onClick={() => changeLanguages(setNewLangTo)}/>
                </nav>
            </div>
        </header>
    );
};

export default Header;
