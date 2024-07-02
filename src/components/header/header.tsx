import {Link, NavLink} from "react-router-dom";
import "./header.scss"
import {useTranslation} from "react-i18next";

const Header = () => {
    const {t} = useTranslation();

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
                </div>
            </div>
        </div>
    )
}

export default Header
