import {useTranslation} from "react-i18next";

const Intro = () => {
    const { t } = useTranslation("", { keyPrefix: 'personal' });

    return (
        <div>
            <p>{t("who_am_i")}</p>
            <p>{t("where_ive_work")}</p>
            <p>{t("how_am_i")}</p>
            <p>{t("work_with_me")}</p>
        </div>
    )
}

export default Intro
