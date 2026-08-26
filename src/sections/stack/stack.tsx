import SectionLabel from "../../ui/sectionLabel/sectionLabel.tsx";
import {stackGroups} from "../../content/stack.ts";
import {sectionIds, sectionTitleId} from "../../navigation.ts";
import {useI18n} from "../../i18n.tsx";
import "./stack.scss";

const Stack = () => {
    const {t, pick} = useI18n();

    return (
        <section
            className="section"
            id={sectionIds.stack}
            aria-labelledby={sectionTitleId(sectionIds.stack)}
        >
            <SectionLabel id={sectionIds.stack} label={t("stack.title")} />

            <div className="section-body stack-groups">
                {stackGroups.map(({id, label, items}) => (
                    <div className="stack-group" key={id}>
                        <h3 className="stack-group-label">{pick(label)}</h3>
                        <ul className="stack-items">
                            {items.map((item) => (
                                <li className="stack-item" key={item}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stack;
