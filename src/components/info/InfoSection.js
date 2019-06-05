import React from 'react';
import "./PersonalCard.scss";
import { Container, Row, Col } from 'reactstrap';

export default class InfoSection extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            Download resume
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Profesional info
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Work experience
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
