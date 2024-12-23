import {useTranslation} from "react-i18next";
import {david} from "assets";
import "./intro.scss"

const Intro = () => {
    const {t} = useTranslation("", {keyPrefix: 'personal'});

    return (
        <div className="intro-container">
            <div>
                <p>{t("who_am_i")}</p>
                <p>{t("where_ive_work")}</p>
                <p>{t("how_am_i")}</p>
                <p>{t("work_with_me")}</p>
            </div>
            <img className="intro-image" src={david} alt="david"/>
        </div>
    )
}

export default Intro
