import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const NotFound = (props) => {
  return (
    <Container>
      <Row>
        <Col md="12" className="mt-5">
          <h1>Page Not Found</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;