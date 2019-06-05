import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PhoneIcon from '@material-ui/icons/Phone';
import AddIcon from '@material-ui/icons/Add';
import MailIcon from '@material-ui/icons/Mail';
import Fab from '@material-ui/core/Fab';
import "./Footer.scss";

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer-external">
                <div className="footer-internal">
                    <Container>
                        <Row>
                            <Col xs={4}>
                                <Row>
                                    <Col xs={4}>
                                        <Fab style={{
                                            backgroundColor: "#5ac4c3",
                                            color: "#ffffff",
                                            "&:focus": {
                                                outline: 0
                                            }
                                        }}
                                        >
                                            <a href="tel:+34 600 80 90 24"
                                               className="footer-link"
                                            > <PhoneIcon /></a>
                                        </Fab>
                                    </Col>
                                    <Col xs={8}>
                                        <p>Llamar</p>
                                        <a href="tel:+34 600 80 90 24"
                                           className="footer-link"
                                        >+34 600 80 90 24</a>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs={4}>
                                        <Fab style={{
                                            backgroundColor: "#5ac4c3",
                                            color: "#ffffff",
                                            "&:focus": {
                                                outline: 0
                                            }
                                        }}
                                        >
                                            <a href="mailto:dartvales@gmail.com"
                                               className="footer-link"
                                            ><MailIcon /></a>
                                        </Fab>
                                    </Col>
                                    <Col xs={8}>
                                        <p>Mail</p>
                                        <a href="mailto:dartvales@gmail.com"
                                           className="footer-link"
                                        >dartvales@gmail.com</a>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs={4}>
                                        <Fab style={{
                                            backgroundColor: "#5ac4c3",
                                            color: "#ffffff",
                                            "&:focus": {
                                                outline: 0
                                            }
                                        }}
                                        >
                                            <a href="https://www.linkedin.com/in/david-valenciano"
                                               className="footer-link"
                                            ><AddIcon /></a>
                                        </Fab>
                                    </Col>
                                    <Col xs={8}>
                                        <p>Sígueme</p>
                                        <span className="footer-icons">
                                        <a href="https://www.linkedin.com/in/david-valenciano"> <i className="fab fa-linkedin-in" /></a>
                                            &nbsp;
                                            <a href="https://github.com/DartValEs"
                                               className="footer-link"
                                            > <i className="fab fa-github" /> </a>
                                    </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}
