import React from 'react';
import "./PersonalCard.scss";
import { Container, Row, Col } from 'reactstrap';
import Avatar from "react-avatar";
import Fab from '@material-ui/core/Fab';

export default class PersonalCard extends React.Component {
    render() {
        return (
            <div className="personal-internal">
                <Container>
                    <Row>
                        <Col sm={12}
                             md={5}
                        >
                            <Avatar name={this.props.title}
                                    size={380}
                                    src={this.props.src}
                                    alt={this.props.title}
                                    round={true}
                            />
                        </Col>
                        <Col sm={12}
                             md={7}
                        >
                            <div style={{paddingTop:20}}>
                                <p>Soy David Valenciano y me dedico a ser desarrollador front-end. Tambien
                                   he sido Maquetador Web. </p>
                                <p>He participado en varios proyectos, en los que he trabajado con equipos pequeños
                                   de gente estupenda. De los que me he llevado experiencias únicas.</p>
                                <p>Soy una persona proactiva que siempre está en busca de conocimientos y nuevas
                                   experiencias.</p>
                                <p>¿Quieres trabajar conmigo? Me encantaría saber de ti.</p>
                                <div>
                                    <Fab color="primary"
                                         aria-label="resume"
                                         style={{
                                             height: 150,
                                             width: 150,
                                             fontSize: 20,
                                             backgroundColor: "#5ac4c3",
                                             "&:focus": {
                                                 outline: 0
                                             }
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
                                             backgroundColor: "#5ac4c3",
                                             "&:focus": {
                                                 outline: 0
                                             }
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
                                             backgroundColor: "#5ac4c3",
                                             "&:focus": {
                                                 outline: 0
                                             }
                                         }}
                                    >
                                        Educación
                                    </Fab>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
