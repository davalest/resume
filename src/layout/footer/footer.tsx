import {allContactLinks} from "../../content/contact.ts";
import "./footer.scss";

const Footer = () => (
    <footer className="footer-container">
        <div className="footer-content">
            {allContactLinks.map(({id, Icon, label, href}) => {
                const isExternal = href.startsWith("http");

                return (
                    <a
                        key={id}
                        className="footer-item"
                        href={href}
                        {...(isExternal ? {target: "_blank", rel: "noopener noreferrer"} : {})}
                    >
                        <Icon className="footer-item-icon" />
                        <span className="footer-item-text">{label}</span>
                    </a>
                );
            })}
        </div>
    </footer>
);

export default Footer;
