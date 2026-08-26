import {useI18n} from "../../i18n.tsx";
import {DownloadIcon} from "../icons/icons.tsx";
import {resumeEn, resumeEs} from "@assets";
import "./downloadCv.scss";

interface DownloadCvProps {
    variant?: "primary" | "secondary";
}

const CV = {
    en: {file: resumeEn, filename: "David-Valenciano-CV-EN.pdf"},
    es: {file: resumeEs, filename: "David-Valenciano-CV-ES.pdf"},
} as const;

const DownloadCv = ({variant = "secondary"}: DownloadCvProps) => {
    const {t, language} = useI18n();
    const {file, filename} = CV[language];
    const label = t("hero.cta.cv");

    return (
        <a
            className={`button download-cv ${variant === "primary" ? "button-primary" : ""}`}
            href={file}
            download={filename}
        >
            <DownloadIcon />
            {label}
        </a>
    );
};

export default DownloadCv;
