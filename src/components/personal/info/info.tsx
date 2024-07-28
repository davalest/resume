import "./info.scss"
import {useTranslation} from "react-i18next";

const Info = () => {
    const { t } = useTranslation("", { keyPrefix: 'personal' });

    return (
        <div>
            <p>
                <span className="info-title">{t("name_title")}</span>
                {t("name_info")}
            </p>
            <p>
                <span className="info-title">{t("email_title")}</span>
                {t("email_info")}
            </p>
            <p>
                <span className="info-title">{t("phone_title")}</span>
                {t("phone_info")}
            </p>
            <p>
                <span className="info-title">{t("birth_date_title")}</span>
                {t("birth_date_info")}
            </p>
            <p>
                <span className="info-title">{t("located_title")}</span>
                {t("located_info")}
            </p>
            <p>
                <span className="info-title">{t("nationality_title")}</span>
                {t("nationality_info")}
            </p>
        </div>
    )
}

export default Info
