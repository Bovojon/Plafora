import React from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

import { Carousel } from "react-responsive-carousel";

const SpaceCarousel = ({open, spaceId, spaces, toggle}) => {
    const space = spaces.find((space) => space.id === spaceId );
    let items = [];
    if (space) {
        items = space.photos.map((photo, i) => {
            return (
                <React.Fragment key={i}>
                    <img src={photo.photo} alt={space.name} />
                </React.Fragment>
            );
        });
    }

    return (
        <Modal isOpen={open} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle}>{ space && space.name }</ModalHeader>
            <ModalBody style={{ padding: items.length > 0 ? "0px" : "1rem" }}>
                { items.length > 0 && <Carousel showArrows={true} infiniteLoop>{items}</Carousel> }
                { items.length === 0 && <h3>No photos available</h3> }
            </ModalBody>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        spaces: state.spaces
    }
}

export default connect(mapStateToProps)(SpaceCarousel);