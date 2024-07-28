import "./item.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {FooterItemProps} from "../types.ts";
import {Link} from "react-router-dom";
import {useState} from "react";


const FooterItem = ({icon, text, link}: FooterItemProps) => {
    const [hover, setHover] = useState(false)

    return (
        <Link to={link} className="footer-item-container"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}>
            <div style={{display: "flex", alignItems: "center"}}>
                <FontAwesomeIcon color={`${hover ? "#46ABB7" : "#979797"}`} icon={icon} size="2x"/>
                <p style={{margin: "0 20px"}}>{text}</p>
            </div>
        </Link>
    )
}

export default FooterItem
