import "../info.scss"
import {InfoItemProps} from "../types.ts";

const InfoItem = ({title, label}: InfoItemProps) => (
    <p>
        <span className="info-title">{title}</span>
        {label}
    </p>
)

export default InfoItem
