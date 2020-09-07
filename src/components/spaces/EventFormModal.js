import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Row,
} from 'reactstrap';

import EventForm from '../forms/EventForm';

const EventFromModal = ({open, toggle, space, user, eventFormValues}) => {
    return (
        <Modal isOpen={open} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle}>
                Inquire about { space.name }'s availability
            </ModalHeader>
            <ModalBody>
                <Container fluid>
                    <Row>
                        <EventForm 
                            spaceId={space.id}
                            userId={user.id}
                            venueName={space.venue.name}
                            eventFormValues={eventFormValues}
                        />
                    </Row>
                </Container>
            </ModalBody>
        </Modal>
    );
}

export default EventFromModal;