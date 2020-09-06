import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import UserForm from '../forms/UserForm';

const Profile = () => {
    return (
        <Container className="home-container d-flex align-items-center justify-content-between" fluid>
            <Row style={{ flex: 1, marginTop: "-10em" }}>
                <Col md={{ size: "4", offset: "4" }}>
                    <Card>
                        <CardBody>
                            <UserForm />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>        
    )
}

export default Profile;