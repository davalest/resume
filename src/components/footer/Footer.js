import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import "./Footer.scss";
import {getString} from "resources";


const Footer = () => {
    return (
        <div className="footer-external">
            <div className="footer-internal">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="footer-item">
                                <a href="tel:+34 600 80 90 24"
                                   className="footer-link"
                                >
                                    <Avatar className="footer-avatar">
                                        <PhoneIcon style={{ color: "#000000" }} />
                                    </Avatar>
                                    +34 600 80 90 24</a>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="footer-item">
                                <a href="mailto:david.valenciano.esteban@gmail.com"
                                   className="footer-link"
                                >
                                    <Avatar className="footer-avatar">
                                        <MailIcon style={{ color: "#000000" }} />
                                    </Avatar>
                                    {getString("email_text2")}</a>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="footer-item">
                                <a href="https://github.com/davalest"
                                   className="footer-link"
                                >
                                    <Avatar className="footer-avatar">
                                        <i className="fab fa-github"
                                           style={{ color: "#000000" }}
                                        />
                                    </Avatar>
                                    Github </a>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <div className="footer-item">
                                <a href="https://www.linkedin.com/in/david-valenciano"
                                   className="footer-link"
                                >
                                    <Avatar className="footer-avatar">
                                        <i className="fab fa-linkedin-in"
                                           style={{ color: "#000000" }}
                                        />
                                    </Avatar>
                                    LinkedIn </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default Footer;
