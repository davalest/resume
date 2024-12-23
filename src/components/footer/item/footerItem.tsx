import "./item.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FooterItemProps} from "../types.ts";
import {Link} from "react-router-dom";

const FooterItem = ({icon, text, link}: FooterItemProps) => (
    <Link to={link} className="footer-item-container" aria-label={text}>
        <div className="footer-item-content">
            <FontAwesomeIcon className="footer-item-icon" icon={icon} size="2x"/>
            <p className="footer-item-text">{text}</p>
        </div>
    </Link>
);

export default FooterItem;
