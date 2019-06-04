import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PhoneIcon from '@material-ui/icons/Phone';
import AddIcon from '@material-ui/icons/Add';
import MailIcon from '@material-ui/icons/Mail';
import Fab from '@material-ui/core/Fab';

export default class Footer extends React.Component {
    render() {
        return (
            <div style={{
                maxWidth: 1024
            }}
            >
                <Container>
                    <Row>
                        <Col xs={4}>
                            <Row>
                                <Col xs={4}>
                                    <Fab style={{
                                        backgroundColor: "#5ac4c3",
                                        color: "#ffffff"
                                    }}
                                    >
                                        <a href="tel:+34 600 80 90 24"
                                           style={{ color: "inherit" }}
                                        > <PhoneIcon /></a>
                                    </Fab>
                                </Col>
                                <Col xs={8}>
                                    <p>Llamar</p>
                                    <a href="tel:+34 600 80 90 24"
                                       style={{
                                           color: "inherit",
                                           textDecoration: "inherit"
                                       }}
                                    >+34 600 80 90 24</a>

                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs={4}>
                                    <Fab style={{
                                        backgroundColor: "#5ac4c3",
                                        color: "#ffffff"
                                    }}
                                    >
                                        <a href="mailto:dartvales@gmail.com"
                                           style={{
                                               color: "inherit",
                                               textDecoration: "inherit"
                                           }}
                                        ><MailIcon /></a>
                                    </Fab>
                                </Col>
                                <Col xs={8}>
                                    <p>Mail</p>
                                    <a href="mailto:dartvales@gmail.com"
                                       style={{
                                           color: "inherit",
                                           textDecoration: "inherit"
                                       }}
                                    >dartvales@gmail.com</a>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs={4}>
                                    <Fab style={{
                                        backgroundColor: "#5ac4c3",
                                        color: "#ffffff"
                                    }}
                                    >
                                        <a href="https://www.linkedin.com/in/david-valenciano"
                                           style={{
                                               color: "inherit",
                                               textDecoration: "inherit"
                                           }}
                                        ><AddIcon /></a>
                                    </Fab>
                                </Col>
                                <Col xs={8}>
                                    <p>Sígueme</p>
                                    <span style={{
                                        fontSize: 23,
                                        lineHeight: 1
                                    }}
                                    >
                                        <a href="https://www.linkedin.com/in/david-valenciano"> <i className="fab fa-linkedin-in" /></a>
                                        &nbsp; &nbsp;
                                        <a href="https://github.com/DartValEs"> <i className="fab fa-github" /> </a>
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
