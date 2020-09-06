import React from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';

const RequestConfirmation = ({spaces, match, navigateTo}) => {
    let space = null;
    if (match && match.params) {
        space = spaces.find( (space) => space.id === parseInt(match.params.id) );
    }

    if (space) {
        return (
            <Container className="home-container d-flex align-items-center justify-content-between" fluid>
                <Row style={{ flex: 1, marginTop: "-10em" }}>
                    <Col md={{ size: "6", offset: "3" }}>
                        <Card>
                            <CardBody>
                                <Container fluid>
                                    <Row className="mb-4">
                                        <h3>
                                            Thank you for your inquiry. We will get back to you shortly 
                                            with a response from { space.venue.name }.
                                        </h3>
                                    </Row>
                                    <Row className="d-flex justify-content-between">
                                        <Button color="link" onClick={() => navigateTo("/places")}>Back to places</Button>
                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
    else {
        return (
            <Container className="home-container d-flex align-items-center justify-content-between" fluid>
                <Row style={{ flex: 1, marginTop: "-10em" }}>
                    <Col md={{ size: "6", offset: "3" }}>
                        <Card>
                            <CardBody>
                                <Container fluid>
                                    <Row className="mb-4">
                                        <h3>This place does not exist.</h3>
                                    </Row>
                                    <Row className="d-flex justify-content-between">
                                        <Button color="link" onClick={() => navigateTo("/places")}>Back to places</Button>
                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        spaces: state.spaces
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSpaces: () => dispatch({ type: "GET_SPACES" }),
        navigateTo: (route) => {
            dispatch(push(route))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestConfirmation);