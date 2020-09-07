import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { isEmpty } from 'lodash';

import SpaceCard from '../spaces/SpaceCard';
import SpaceCarousel from '../spaces/SpaceCarousel';
import Axios from 'axios';

const Spaces = ({auth, spaces, getSpaces}) => {
    const [selectedSpaceId, setSelectedSpaceId] = useState(null);
    const [randomizedSpaces, setRandomizedSpaces] = useState([]);

    useEffect(
        () => {
            setRandomizedSpaces(spaces)
            getSpaces()
        },
        [spaces]
    );

    const setSelectedSpace = (selectedSpaceId) => {
        setSelectedSpaceId({selectedSpaceId})
    }

    const shuffleArray = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    const spaceCards = randomizedSpaces.map((space) => {
        return <SpaceCard 
            key={space.id}
            space={space}
            anonymous={!auth.token}
            setSelectedSpace={setSelectedSpace}
        />;
    });

    if (isEmpty(randomizedSpaces)) {
        return ( <Spinner style={{width: '50px', height: '50px', position: 'fixed', left: '50%', top: '50%'}} /> )
    } else {
        return (
            <Container className="mt-4">
                <Row>
                    <Col md="12">
                        <h1 className="mt-5 mb-3">Find the perfect place for your gathering</h1>
                    </Col>
                </Row>
                <Row>
                    { spaceCards }
                </Row>
                <SpaceCarousel spaceId={selectedSpaceId} setSelectedSpace={setSelectedSpace} />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        spaces: state.spaces,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSpaces: () => dispatch({type: "GET_SPACES"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spaces);