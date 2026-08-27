import {useI18n} from "../../i18n.tsx";
import "./errorPage.scss";

const ErrorPage = () => {
    const {t} = useI18n();
    const home = import.meta.env.BASE_URL;

    return (
        <div className="error-page">
            <h1 className="error-title">{t("error.title")}</h1>
            <p className="error-message">{t("error.message")}</p>
            <a className="button button-primary" href={home}>
                {t("error.cta")}
            </a>
        </div>
    );
};

export default ErrorPage;
