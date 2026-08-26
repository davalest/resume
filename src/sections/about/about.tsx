import {useI18n} from "../../i18n.tsx";
import SectionLabel from "../../ui/sectionLabel/sectionLabel.tsx";
import {sectionIds, sectionTitleId} from "../../navigation.ts";
import "./about.scss";

const About = () => {
    const {t} = useI18n();

    return (
        <section
            className="section"
            id={sectionIds.about}
            aria-labelledby={sectionTitleId(sectionIds.about)}
        >
            <SectionLabel id={sectionIds.about} label={t("about.title")} />

            <div className="section-body about-body">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
                <p>
                    {t("about.p3")}{" "}
                    <a
                        className="about-repo-link"
                        href="https://github.com/davalest/resume"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        github.com/davalest/resume
                    </a>
                </p>
            </div>
        </section>
    );
};

export default About;
