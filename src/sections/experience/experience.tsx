import SectionLabel from "../../ui/sectionLabel/sectionLabel.tsx";
import {earlierRoles, featuredRoles} from "../../content/roles.ts";
import {sectionIds, sectionTitleId} from "../../navigation.ts";
import {formatDateRange} from "../../utils/dates.ts";
import {useI18n} from "../../i18n.tsx";
import "./experience.scss";

const roleTitleId = (id: string): string => `role-${id}-title`;

const Experience = () => {
    const {t, pick, language} = useI18n();
    const ongoingLabel = t("experience.present");

    return (
        <section
            className="section"
            id={sectionIds.experience}
            aria-labelledby={sectionTitleId(sectionIds.experience)}
        >
            <SectionLabel id={sectionIds.experience} label={t("experience.title")} />

            <div className="section-body">
                {featuredRoles.map(({id, company, dates, title, context, bullets}) => (
                    <article className="role" key={id} aria-labelledby={roleTitleId(id)}>
                        <p className="role-dates">
                            {formatDateRange(dates, language, ongoingLabel)}
                        </p>
                        <div className="role-detail">
                            <h3 className="role-title" id={roleTitleId(id)}>
                                {pick(title)}
                                {company && <span className="role-company"> · {company}</span>}
                            </h3>
                            <p className="role-context">{pick(context)}</p>
                            <ul className="role-bullets">
                                {bullets.map((bullet, index) => (
                                    <li key={index}>{pick(bullet)}</li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}

                <h3 className="earlier-title">{t("experience.earlier_title")}</h3>
                <ul className="earlier-list">
                    {earlierRoles.map(({id, company, dates, title, summary}) => (
                        <li className="earlier-role" key={id}>
                            <p className="role-dates">
                                {formatDateRange(dates, language, ongoingLabel)}
                            </p>
                            <div className="role-detail">
                                <p className="earlier-role-title">
                                    {pick(title)}
                                    {company && <span className="role-company"> · {company}</span>}
                                </p>
                                <p className="earlier-role-summary">{pick(summary)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Experience;
