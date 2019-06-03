import React, { Component } from 'react';
import './Home.css';
import { Col, Container, Row } from "reactstrap";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class About extends Component {
    render() {
        return (
            <div style={{
                display: "flex",
                height: "100vh",
                alignItems: "center",
                justifyContent: "flex-end"
            }}
            >
                <Paper style={{
                    minHeight: 400,
                    display: "flex",
                    alignItems: "center"
                }}
                >
                    <Container>
                        <Row>
                            <Col xs={12}
                                 md={3}
                                 mdOffset={3}
                                 style={{
                                     display: "flex",
                                     justifyContent: "center",
                                     flexDirection:"column"
                                 }}
                            >
                                <div style={{ textAlign: "left" }}>
                                    <h1><u>About me</u></h1>
                                    <p>Soy David Valenciano Esteban y me dedico a ser desarrollador front-end. Tambien
                                       he sido Maquetador Web. </p>
                                    <p>He participado en varios proyectos, en los que he trabajado con equipos pequeños
                                       de gente estupenda. De los que me he llevado experiencias únicas.</p>
                                    <p>Soy una persona proactiva que siempre está en busca de conocimientos y nuevas
                                       experiencias.</p>
                                    <p>¿Quieres trabajar conmigo? Me encantaría saber de ti.</p>
                                </div>
                                <div>
                                    <Button href="/about"
                                            variant="outlined">
                                        Mira mis skills
                                    </Button>
                                </div>


                            </Col>
                            <Col xs={12}
                                 md={6}
                            >

                            </Col>
                        </Row>
                    </Container>
                </Paper>
            </div>
        );
    }
}

export default About;
