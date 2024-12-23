import {useTranslation} from "react-i18next";
import {david} from "assets";
import "./hero.scss"
import Typewriter from "../../typewriter/typewriter.tsx";
import {HTML_YEAR_EXPERTISE} from "../../../utils/dates.ts";

const Hero = () => {
    const {t} = useTranslation();

    return (
        <div style={{display: "flex", alignItems: "center", marginBottom: 50}}>
            <img className="hero-image" src={david} alt="david"/>

            <div>
                <h1>{t("header.name")}</h1>
                <p style={{fontSize: "16px"}}>
                    {t("personal.hero.i_am")} <Typewriter
                    texts={[
                        t("professions.react"),
                        t("professions.js"),
                        t("professions.front"),
                        t("professions.ts")
                    ]}
                    delay={100}/>
                </p>
                <p>
                    {t('personal.hero.experience', {years: HTML_YEAR_EXPERTISE})}
                </p>
            </div>
        </div>
    )
}

export default Hero
