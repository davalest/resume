import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Fab from "@material-ui/core/Fab";
import "./Info.scss";
import { getString } from "resources";

const InfoSection = (props) => {
    return (
        <div className="info-external">
            <Container>
                <Row>
                    <Col xs={6}
                         md={3}
                    >
                        <div>
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
                                {getString("work_experience").toUpperCase()}
                            </Fab>
                        </div>
                    </Col>
                    <Col xs={9}>
                        <div style={{ backgroundColor: "#fff" }}>
                            <Row>
                                <Col xs={3}>
                                    <p className="info-dates">{getString("feb_actual")}</p>
                                </Col>
                                <Col xs={9}>
                                    <p>
                                        <span className="info-company">QUO Health SL </span>
                                        <span className="info-job">Front-end Developer </span>
                                        <span className="info-projects">{getString("developed_projects")} </span>
                                        <ul>
                                            <li>
                                                gluQUO Diabetes Academy {getString("web_app_dev")}
                                                <p className="info-tech">{getString("used_tech")} HTML 5,
                                                                                                  SCSS,
                                                                                                  Bootstrap,
                                                                                                  React.js,
                                                                                                  Firebase </p>
                                            </li>
                                            <li>
                                                O.K Transport {getString("web_app_dev")}
                                                <p className="info-tech">{getString("used_tech")} HTML 5, SCSS,
                                                                                                  Bootstrap,
                                                                                                  React.js,
                                                                                                  Moment.js,
                                                                                                  Node.js,
                                                                                                  MongoDB,
                                                                                                  LoopBack </p>
                                            </li>
                                            <li>
                                                gluQUO PRO {getString("web_app_dev")}
                                                <p className="info-tech">{getString("used_tech")} HTML 5,
                                                                                                  SCSS,
                                                                                                  Bootstrap,
                                                                                                  React.js,
                                                                                                  Moment.js,
                                                                                                  Node.js,
                                                                                                  Express,
                                                                                                  Firebase </p>
                                            </li>
                                            <li>
                                                {getString("website_development")} (Optima CC)
                                                <p className="info-tech">{getString("used_tech")}
                                                    HTML 5, CSS 3, Bootstrap, React.js,
                                                    Node.js</p>
                                            </li>
                                            <li>
                                                {getString("website_development")} (gluQUO)
                                                <p className="info-tech">{getString("used_tech")} HTML 5, CSS
                                                                                                  3,
                                                                                                  Bootstrap,
                                                                                                  React.js,
                                                                                                  Node.js</p>
                                            </li>
                                            <li> {getString("design_website_development")} (QUO
                                                                                           Health)
                                                <p className="info-tech">{getString("used_tech")} HTML 5, CSS
                                                                                                  3,
                                                                                                  Bootstrap,
                                                                                                  JQuery</p>
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
                                        <p style={{ marginLeft: 10 }}>Tecnologías
                                                                      empleadas: HTML 5, CSS 3,
                                                                      Bootstrap, JQuery</p>
                                        􏰂 Diseño, maquetado, creación y desarrollo de página web.(La Parada S.L)
                                        <p style={{ marginLeft: 10 }}>Tecnologías empleadas: HTML 5, CSS
                                                                      3, Bootstrap, JQuery</p>
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
};

export default InfoSection;
