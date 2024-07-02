import {Link, Outlet} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useLanguage} from "../contexts/Language.tsx";
import i18n from "i18next";
import Header from "../components/header/header.tsx";

function Layout() {
    const {t} = useTranslation();
    const {language, setLanguage} = useLanguage();

    const changeLanguages = (lng: string) => {
        i18n.changeLanguage(lng).then(() => setLanguage(lng))
    };

    const setNewLangTo = language === "es" ? "en" : "es";

    return (
        <div style={{width:"100%"}}>
            <Header/>
            <Link to={``}>Home</Link>
            <Link to={`resume`}>{t('resume')}</Link>
            <Link to={`skills`}>Skills</Link>



            <Outlet/>
            <h2>
                Footer
            </h2>
            <button onClick={() => changeLanguages(setNewLangTo)}>{setNewLangTo.toUpperCase()}</button>
        </div>
    )
}

export default Layout
