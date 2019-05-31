import React, { Component } from 'react';
import './Home.css';
import { Col, Grid, Row } from "react-bootstrap";
import Paper from '@material-ui/core/Paper';
import { david, resume } from "resources";
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


class Home extends Component {
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
                    <Grid>
                        <Row>
                            <Col xs={12} md={3} mdOffset={3}
                                 style={{
                                     display: "flex",
                                     justifyContent: "center"
                                 }}
                            >
                                <img src={david}
                                     alt="David"
                                     style={{
                                         width: 165,
                                         height: 165,
                                         borderRadius: 15
                                     }}
                                />
                            </Col>
                            <Col xs={12} md={6}>
                                <div style={{ textAlign: "left" }}>
                                    <h1>David Valenciano</h1>
                                    <Divider style={{
                                        width: 280,
                                        height: 2
                                    }}
                                    />
                                    <p style={{
                                        fontSize: 20,
                                        marginTop: 10
                                    }}>Front-End Developer</p>
                                    <Button href="/about"
                                            variant="outlined"
                                            style={{ marginRight: 20 }}>
                                        Conóceme
                                    </Button>
                                    <Button variant="outlined"
                                            color="primary"
                                            href={resume}
                                            download
                                    >
                                        Descargar CV
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default Home;
