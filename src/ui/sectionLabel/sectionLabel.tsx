import {sectionTitleId} from "../../navigation.ts";
import "./sectionLabel.scss";

interface SectionLabelProps {
    id: string;
    label: string;
}

const SectionLabel = ({id, label}: SectionLabelProps) => (
    <div className="section-label">
        <h2 className="section-label-text" id={sectionTitleId(id)}>
            {label}
        </h2>
    </div>
);

export default SectionLabel;
