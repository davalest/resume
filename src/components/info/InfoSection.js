import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import Fab from "@material-ui/core/Fab";

export default class InfoSection extends React.Component {
    render() {
        return (
            <div style={{paddingTop: 100}}>
                <Container>
                    <Row>
                        <Col xs={6} md={3}>
                            <div style={{backgroundColor: "#fff"}}>
                                <Fab color="primary"
                                     aria-label="resume"
                                     style={{
                                         height: 180,
                                         width: 180,
                                         fontSize: 20,
                                         backgroundColor: "#5ac4c3",
                                         "&:focus": {
                                             outline: 0
                                         }
                                     }}
                                >
                                    Experiencia profesional
                                </Fab>
                            </div>
                        </Col>
                        <Col xs={9}>
                            <div style={{backgroundColor: "#fff"}}>
                                <Row>
                                    <Col xs={3}>
                                        <p style={{fontSize: 20}}>Febrero 2017–actualmente</p>
                                    </Col>
                                    <Col xs={9}>
                                        <p>
                                            <span style={{fontSize: 16, fontWeight: "bold"}}>QUO Health SL </span>
                                            <span style={{fontWeight: "bold"}}>Front-end Developer </span>
                                            <span style={{fontStyle: "italic"}}>Proyectos
                                                desarrollados:.</span>
                                            <ul>
                                                <li> Diseño, maquetado, creación y desarrollo de página web.(QUO
                                                    Health
                                                    1.0) Tecnologías empleadas: HTML 5,
                                                    CSS 3, Bootstrap, JQuery
                                                </li>
                                                <li>
                                                    Maquetado y creación, desarrollo de página web.(QUO Health 2.0)
                                                    Tecnologías
                                                    empleadas: HTML 5, CSS 3,
                                                    Bootstrap, React.js, Node.js
                                                </li>
                                                <li>
                                                    gluQUO PRO desarrollo de App web. Tecnologías empleadas: HTML 5,
                                                    CSS 3,
                                                    Bootstrap,
                                                    React.js, Node.js,
                                                    Express, Firebase
                                                </li>

                                                <li>
                                                    Maquetado y creación de página web (Optima CC) Tecnologías
                                                    empleadas:
                                                    HTML
                                                    5, CSS
                                                    3, Bootstrap, React.js,
                                                    Node.js
                                                </li>
                                                <li>
                                                    O.K Trans desarrollo de App Web. Tecnologías empleadas: HTML 5, CSS
                                                    3,
                                                    Bootstrap,
                                                    React.js, Node.js,
                                                    MongoDB, LoopBack
                                                </li>
                                            </ul>
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>
                                            2016
                                        </p>
                                    </Col>
                                    <Col>
                                        <p>
                                            Freelance, Front-end Developer, Proyectos desarrollados:.
                                            􏰂 Diseño, maquetado, creación y desarrollo de página web.(MarVal S.L)
                                            Tecnologías
                                            empleadas: HTML 5, CSS 3,
                                            Bootstrap, JQuery
                                            􏰂 Diseño, maquetado, creación y desarrollo de página web.(La Parada S.L)
                                            Tecnologías empleadas: HTML 5, CSS
                                            3, Bootstrap, JQuery
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>
                                            Septiembre 2015 – Julio 2016
                                        </p>
                                    </Col>
                                    <Col>
                                        <p>
                                            HM Hospitales (Montepríncipe), IT CAU, Funciones desarrollados:.
                                            􏰂 Mantenimiento y gestión de incidencias.
                                            􏰂 Desarrollo e implementación de infraestructura.
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
