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
                backgroundColor: "#E1DBDB",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end"
            }}
            >
                <div style={{
                    maxWidth: 1024,
                    paddingTop: 20,
                    paddingBottom: 20,
                    zIndex: 999
                }}
                >
                    <Container style={{
                    }}>
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
                                            color: "#ffffff",
                                            "&:focus": {
                                                outline: 0
                                            }
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
                                            color: "#ffffff",
                                            "&:focus": {
                                                outline: 0
                                            }
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
                                            &nbsp;
                                            <a href="https://github.com/DartValEs"
                                               style={{
                                                   color: "inherit",
                                                   textDecoration: "inherit"
                                               }}
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
