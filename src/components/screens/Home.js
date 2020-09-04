import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardTitle,
    CardBody,
    Button
  } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <Container className="home-container d-flex align-items-center justify-content-between" fluid>
                <Row style={{ flex: 1, marginTop: "-3em" }}>
                    <Col md={{ size: "10", offset: "1" }} lg={{ size: "8", offset: "2" }} xl={{ size: "6", offset: "3" }}>
                        <div className="text-center">
                            <h1 className="text-info">Places for all</h1>
                            <p className="lead"><span className="text-info">Plafora</span> helps you quickly find and reserve unique places for your gatherings</p>
                            <Button color="info" size="lg" block onClick={() => this.props.navigateTo("/places")}>View all places</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        eventFormValues: state.events.eventForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (route) => {
            dispatch(push(route));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
