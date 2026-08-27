import SectionLabel from "../../ui/sectionLabel/sectionLabel.tsx";
import {studies} from "../../content/studies.ts";
import {sectionIds, sectionTitleId} from "../../navigation.ts";
import {useI18n} from "../../i18n.tsx";
import "./education.scss";

const Education = () => {
    const {t, pick} = useI18n();

    return (
        <section
            className="section"
            id={sectionIds.education}
            aria-labelledby={sectionTitleId(sectionIds.education)}
        >
            <SectionLabel id={sectionIds.education} label={t("education.title")} />

            <div className="section-body">
                <ul className="study-list" role="list">
                    {studies.map(({id, title, school, location, year}) => (
                        <li className="study" key={id}>
                            <span className="study-year">{year ?? t("education.in_progress")}</span>
                            <span className="study-title">{pick(title)}</span>
                            <span className="study-school">{`${school} · ${location}`}</span>
                        </li>
                    ))}
                </ul>

                <p className="languages">
                    <span className="languages-label">{t("education.languages_title")}</span>
                    {t("education.languages")}
                </p>
            </div>
        </section>
    );
};

export default Education;
