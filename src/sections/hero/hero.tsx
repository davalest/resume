import {portraitAvif, portraitFallback, portraitWebp} from "@assets";
import DownloadCv from "../../ui/downloadCv/downloadCv.tsx";
import {socialLinks} from "../../content/contact.ts";
import {specialties} from "../../content/specialties.ts";
import {sectionIds, sectionTitleId} from "../../navigation.ts";
import {useI18n} from "../../i18n.tsx";
import "./hero.scss";

const PHOTO_SIZES = "(max-width: 768px) min(180px, 50vw), 220px";

const Hero = () => {
    const {t, pick} = useI18n();

    return (
        <section
            className="hero"
            id={sectionIds.hero}
            aria-labelledby={sectionTitleId(sectionIds.hero)}
        >
            <picture className="hero-photo-frame">
                <source type="image/avif" srcSet={portraitAvif} sizes={PHOTO_SIZES} />
                <source type="image/webp" srcSet={portraitWebp} sizes={PHOTO_SIZES} />
                <img
                    className="hero-photo"
                    src={portraitFallback}
                    alt={t("hero.photo_alt")}
                    width={220}
                    height={220}
                    fetchPriority="high"
                    decoding="async"
                />
            </picture>

            <div className="hero-content">
                <h1 className="hero-name" id={sectionTitleId(sectionIds.hero)}>
                    {t("header.name")}
                </h1>
                <p className="hero-role">{t("hero.role")}</p>

                <ul className="hero-specialties" role="list">
                    {specialties.map((specialty) => (
                        <li className="hero-specialty" key={specialty.en}>
                            {pick(specialty)}
                        </li>
                    ))}
                </ul>

                <p className="hero-pitch">{t("hero.pitch")}</p>

                <p className="hero-availability">{t("hero.availability")}</p>

                <div className="hero-actions">
                    <DownloadCv variant="primary" />
                    <a className="button" href={`#${sectionIds.experience}`}>
                        {t("hero.cta.experience")}
                    </a>
                    <a className="button" href={`#${sectionIds.contact}`}>
                        {t("hero.cta.contact")}
                    </a>
                    {socialLinks.map(({id, label, href}) => (
                        <a
                            key={id}
                            className="button button-quiet"
                            href={href}
                            target="_blank"
                            rel="noopener"
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
