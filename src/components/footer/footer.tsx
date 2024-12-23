import "./footer.scss";
import FooterItem from "./item/footerItem.tsx";
import {footerItems} from "./constants.ts";

const Footer = () => (
    <footer className="footer-container">
        <div className="footer-content">
            {footerItems.map(({icon, text, link}) => (
                <FooterItem key={text} icon={icon} text={text} link={link}/>
            ))}
        </div>
    </footer>
);

export default Footer;
