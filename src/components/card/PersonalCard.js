import React from 'react';
import "./PersonalCard.css";
import { Container, Row, Col } from 'reactstrap';
import Avatar from "react-avatar";
import Fab from '@material-ui/core/Fab';

export default class PersonalCard extends React.Component {
    render() {
        return (
            <div style={{
                maxWidth: 1024
            }}
            >
                <div>
                    <Container>
                        <Row>
                            <Col xs={12} sm={5}>
                                <Avatar name={this.props.title}
                                        size={380}
                                        src={this.props.src}
                                        alt={this.props.title}
                                        round={true}
                                />
                            </Col>
                            <Col xs={12} sm={7}>
                                <p>Soy David Valenciano y me dedico a ser desarrollador front-end. Tambien
                                   he sido Maquetador Web. </p>
                                <p>He participado en varios proyectos, en los que he trabajado con equipos pequeños
                                   de gente estupenda. De los que me he llevado experiencias únicas.</p>
                                <p>Soy una persona proactiva que siempre está en busca de conocimientos y nuevas
                                   experiencias.</p>
                                <p>¿Quieres trabajar conmigo? Me encantaría saber de ti.</p>
                                <div style={{
                                    paddingTop: 20
                                }}
                                >
                                    <Fab color="primary"
                                         aria-label="resume"
                                         style={{
                                             height: 150,
                                             width: 150,
                                             fontSize: 20,
                                             backgroundColor:"#5ac4c3"
                                         }}
                                    >
                                        Resumen
                                    </Fab>
                                    <Fab color="secondary"
                                         aria-label="projects"
                                         style={{
                                             height: 150,
                                             width: 150,
                                             fontSize: 20,
                                             marginLeft: 30,
                                             backgroundColor:"#5ac4c3"
                                         }}
                                    >
                                        Proyectos
                                    </Fab>
                                    <Fab color="secondary"
                                         aria-label="schooling"
                                         style={{
                                             height: 150,
                                             width: 150,
                                             fontSize: 20,
                                             marginLeft: 30,
                                             backgroundColor:"#5ac4c3"
                                         }}
                                    >
                                        Educación
                                    </Fab>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}
