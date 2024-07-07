import "./footer.scss";
import FooterItem from "./item/item.tsx";
import {footerItems} from "./constants.ts";

const Footer = () => {

    return (
        <div className="footer-container">
            <div className="footer-content">
                {footerItems.map((item)=>
                    <FooterItem key={item.text} icon={item.icon} text={item.text} link={item.link}/>
                )}
            </div>
        </div>
    )
}

export default Footer
