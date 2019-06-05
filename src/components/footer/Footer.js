import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import "./Footer.scss";

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer-external">
                <div className="footer-internal">
                    <Container>
                        <Row>
                            <Col xs={6} md={3}>
                                <div className="footer-item">
                                    <a href="tel:+34 600 80 90 24"
                                       className="footer-link"
                                    >
                                        <Avatar className="footer-avatar">
                                            <PhoneIcon />
                                        </Avatar>
                                        +34 600 80 90 24</a>
                                </div>
                            </Col>
                            <Col xs={6} md={3}>
                                <div className="footer-item">
                                    <a href="mailto:dartvales@gmail.com"
                                       className="footer-link"
                                    >
                                        <Avatar className="footer-avatar">
                                            <MailIcon />
                                        </Avatar>
                                        dartvales@gmail.com</a>
                                </div>
                            </Col>
                            <Col xs={6} md={3}>
                                <div className="footer-item">
                                    <a href="https://github.com/DartValEs"
                                       className="footer-link"
                                    >
                                        <Avatar className="footer-avatar">
                                            <i className="fab fa-github" />
                                        </Avatar>
                                        Github </a>
                                </div>
                            </Col>
                            <Col xs={6} md={3}>
                                <div className="footer-item">
                                    <a href="https://www.linkedin.com/in/david-valenciano"
                                       className="footer-link"
                                    >
                                        <Avatar className="footer-avatar">
                                            <i className="fab fa-linkedin-in" />
                                        </Avatar>
                                        LinkedIn </a>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}
