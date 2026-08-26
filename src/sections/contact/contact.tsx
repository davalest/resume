import {useI18n} from "../../i18n.tsx";
import SectionLabel from "../../ui/sectionLabel/sectionLabel.tsx";
import DownloadCv from "../../ui/downloadCv/downloadCv.tsx";
import {email, socialLinks} from "../../content/contact.ts";
import {sectionIds, sectionTitleId} from "../../navigation.ts";
import "./contact.scss";

const {Icon: EmailIcon, href: emailHref} = email;

const Contact = () => {
    const {t} = useI18n();

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
                    <a className="button button-primary" href={emailHref}>
                        <EmailIcon />
                        {t("contact.email_cta")}
                    </a>
                    <DownloadCv />
                </div>

                <ul className="contact-links">
                    {socialLinks.map(({id, Icon, label, href}) => (
                        <li key={id}>
                            <a href={href} target="_blank" rel="noopener noreferrer">
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
