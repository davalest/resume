import "./info.scss"
import {useTranslation} from "react-i18next";
import InfoItem from "./item/infoItem.tsx";

const Info = () => {
    const {t} = useTranslation("", {keyPrefix: 'personal'});

    return (
        <div className="info-container">
            <div>
                <InfoItem title={t("name_title")} label={t("name_info")}/>
                <InfoItem title={t("email_title")} label={t("email_info")}/>
                <InfoItem title={t("phone_title")} label={t("phone_info")}/>
            </div>
            <div>
                <InfoItem title={t("birth_date_title")} label={t("birth_date_info")}/>
                <InfoItem title={t("located_title")} label={t("located_info")}/>
                <InfoItem title={t("nationality_title")} label={t("nationality_info")}/>
            </div>
        </div>
    )
}

export default Info
