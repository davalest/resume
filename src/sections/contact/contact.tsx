import {useI18n} from "../../i18n.tsx";
import SectionLabel from "../../ui/sectionLabel/sectionLabel.tsx";
import DownloadCv from "../../ui/downloadCv/downloadCv.tsx";
import {useCopyEmail} from "../../ui/copyEmail/useCopyEmail.ts";
import {CopyIcon, DownloadIcon} from "../../ui/icons/icons.tsx";
import {email, mailtoWithSubject, socialLinks, vCardPath} from "../../content/contact.ts";
import {sectionIds, sectionTitleId} from "../../navigation.ts";
import "./contact.scss";

const {Icon: EmailIcon} = email;

const Contact = () => {
    const {t} = useI18n();
    const {status, copy} = useCopyEmail(email.label);

     const copyStatus =
        status === "copied"
            ? t("contact.copied")
            : status === "failed"
                ? t("contact.copy_failed", {email: email.label})
                : "";

    return (
        <section
            className="section"
            id={sectionIds.contact}
            aria-labelledby={sectionTitleId(sectionIds.contact)}
        >
            <SectionLabel id={sectionIds.contact} label={t("contact.title")} />

            <div className="section-body contact-body">
                <p className="contact-lead">{t("contact.lead")}</p>

                <div className="contact-actions">
                    <a
                        className="button button-primary"
                        href={mailtoWithSubject(t("contact.email_subject"))}
                    >
                        <EmailIcon />
                        {t("contact.email_cta")}
                    </a>
                    <button type="button" className="button" onClick={copy}>
                        <CopyIcon />
                        {t("contact.copy_email")}
                    </button>
                    <DownloadCv />
                    <a
                        className="button button-quiet"
                        href={`${import.meta.env.BASE_URL}${vCardPath}`}
                        download
                    >
                        <DownloadIcon />
                        {t("contact.vcard")}
                    </a>
                </div>

                <p className="contact-copy-status" role="status">
                    {copyStatus}
                </p>

                <ul className="contact-links" role="list">
                    {socialLinks.map(({id, Icon, label, href}) => (
                        <li key={id}>
                            <a href={href} target="_blank" rel="noopener">
                                <Icon />
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                <p className="contact-availability">{t("contact.availability")}</p>
            </div>
        </section>
    );
};

export default Contact;
