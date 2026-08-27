import {useI18n} from "../../i18n.tsx";
import {DownloadIcon} from "../icons/icons.tsx";
import "./downloadCv.scss";

interface DownloadCvProps {
    variant?: "primary" | "secondary";
}

const CV_DIRECTORY = `${import.meta.env.BASE_URL}cv/`;

const CV = {
    en: "David-Valenciano-CV-EN.pdf",
    es: "David-Valenciano-CV-ES.pdf",
} as const;

const DownloadCv = ({variant = "secondary"}: DownloadCvProps) => {
    const {t, language} = useI18n();
    const filename = CV[language];
    const label = t("hero.cta.cv");

    return (
        <a
            className={`button download-cv ${variant === "primary" ? "button-primary" : ""}`}
            href={`${CV_DIRECTORY}${filename}`}
            download={filename}
        >
            <DownloadIcon />
            {label}
        </a>
    );
};

export default DownloadCv;
