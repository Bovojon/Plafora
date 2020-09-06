import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';
import { Carousel } from 'react-responsive-carousel';
import { isEmpty } from 'lodash';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  Spinner
} from 'reactstrap';

import EventFormModal from '../spaces/EventFormModal';
import IndividualSpaceCarouselModal from '../spaces/IndividualSpaceCarouselModal';

const Space = ({spaces, getSpaces, navigateTo, match, user, auth, eventFormValues}) => {
    const [eventFormModal, setEventFormModal] = useState(false);
    const [spaceCarouselModal, setSpaceCarouselModal] = useState(false);

    useEffect(
        () => {
            getSpaces();
        },
        [spaces]
    )

    const handleEventFormToggle = () => {
        setEventFormModal(!eventFormModal)
    }

    const handleRegistrationClick = (e) => {
        e.preventDefault();
        navigateTo('/register');
    }

    let space = null;
    let button;

    if (isEmpty(spaces)) {
        return <Spinner style={{width: '50px', height: '50px', position: 'fixed', left: '50%', top: '50%'}} /> ;
    }

    if (match && match.params) {
        space = spaces.find((space) => space.id === parseInt(match.params.id))
    }

    if (auth.token) {
        button = <Button color="info" size="lg" block onClick={() => setEventFormModal(true)}>Check Availability and Pricing</Button>
    } else {
        button = <Button color="info" size="lg" block onClick={handleRegistrationClick}>Check Availability and Pricing</Button>
    }

    if (space) {
        const styleItems = space.styles.map((style, i) => {
          const guests = style.min_guests < style.max_guests ? `${style.min_guests}-${style.max_guests}` : style.max_guests;
          return (
            <li key={i}>{ style.style } <FontAwesomeIcon icon={faUser} /> { guests }</li>
          );
        });
  
        const priceItems = space.pricings.map((pricing, i) => {
          let base = `$${ pricing.cost_min }`;
          if (pricing.cost_min < pricing.cost_max) base += ` - $${ pricing.cost_max }`;
          if (pricing.unit) base += ` per ${ pricing.unit }`;  
          if (pricing.day === "NA") pricing.day = "";
          if (pricing.time === "NA") pricing.time = "";
          if (pricing.day || pricing.time)
            base += ` (${ pricing.time }${ pricing.day && pricing.time ? ", " : ""}${ pricing.day })`;
  
          return (
            <li key={i}>{ base }</li>
          );
        });
  
        const minimumItems = space.minimums.map((minimum, i) => {
          let cost = `$${minimum.cost_max}`;
          if(minimum.cost_min < minimum.cost_max) cost = `$${minimum.cost_min}-` + cost;
          cost += ` for ${ minimum.item }`;
          if(minimum.day === "NA") minimum.day = "";
          if(minimum.time === "NA") minimum.time = "";
          if(minimum.day || minimum.time)
            cost += ` (${ minimum.time }${ minimum.day && minimum.time ? " on " : ""}${ minimum.day })`;
  
          return (
            <li key={i}>{ cost }</li>
          );
        });
  
        const photoItems = space.photos.map((photo, i) => {
          return (
            <div key={i}>
              <img src={photo.photo} alt={space.name} />
            </div>
          );
        });
  
        const amenities = [{ 
            key: "av_assistance",
            name: "AV Assistance",
            }, {
            key: "full_bar",
            name: "Full Bar",
            }, {
            key: "mics",
            name: "Microphones",
            }, {
            key: "onsite_coordinator",
            name: "Onsite Coordinator",
            }, {
            key: "outdoor_area",
            name: "Outdoor Area",
            }, {
            key: "private",
            name: "Private",
            }, {
            key: "projector",
            name: "Projector",
            }, {
            key: "reception_room",
            name: "Reception Room",
            }, {
            key: "semi_private",
            name: "Semi Private",
            }, {
            key: "tv",
            name: "TV",
            }, {
            key: "wheelchair_accessible",
            name: "Wheelchair Accessible",
            }, {
            key: "wifi",
            name: "Wifi"}
        ];
  
        const amenitySuccessItems = [], amenityDangerItems = [];
        
        amenities.forEach((amenity) => {
          if(space[amenity.key]) {
            amenitySuccessItems.push(
              <li key={amenity.key} style={{ listStyleType: "none" }}>
                <span className="text-success mr-2"><FontAwesomeIcon icon={faCheck} /></span>
                { amenity.name }
              </li>
            );
          } else {
            amenityDangerItems.push(
              <li key={amenity.key} style={{ listStyleType: "none" }}>
                <span className="text-danger mr-2"><FontAwesomeIcon icon={faTimes} /></span>
                { amenity.name }
              </li>
            );
          }
        });
  
        const foodItems = space.food_options.map((food_option, i) => {
          return (
            <li key={i}>{ food_option.food_option }</li>
          );
        });
  
        const alcoholItems = space.alcohol_options.map((alcohol_option, i) => {
          return (
            <li key={i}>{ alcohol_option.alcohol_option }</li>
          );
        });
  
        return (
          <Container className="mt-5" fluid>
            <Row>
              <Col md="7">
                <Row>
                  <Col md="12" className="mt-3">
                    <h1>{ space.name }</h1>
                    <h3>{ space.venue.name }</h3>
                    <p>{ space.address }</p>
                  </Col>
                </Row>
                {/*
                <Row>
                  <Col md="6" className="mt-4">
                    <Card className="h-100">
                      <CardHeader>Prices</CardHeader>
                      <CardBody>
                        { priceItems.length > 0 && <ul>
                          { priceItems }
                        </ul> }
                        { priceItems.length === 0 && <p> Check <span style={{ color: "#00c4cc" }}>{ space.name }'s</span> availability to get a quote for your event. </p> }
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6" className="mt-4">
                    <Card className="h-100">
                      <CardHeader>Minimum Fees</CardHeader>
                      <CardBody>
                        { minimumItems.length > 0 && <ul>
                          { minimumItems }
                        </ul> }
                        { minimumItems.length === 0 && <p> Check <span style={{ color: "#00c4cc" }}>{ space.name }'s</span> availability to inquire about their minimum fees. </p> }
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                */}
                <Row>
                  <Col md="4" className="mt-4">
                    <Card className="h-100">
                      <CardHeader>Styles</CardHeader>
                      <CardBody>
                      { styleItems.length > 0 && <ul>
                        { styleItems }
                      </ul> }
                      { styleItems.length === 0 && <p>No layouts available</p> }
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="8" className="mt-4">
                    <Card className="h-100">
                      <CardHeader>Amenities</CardHeader>
                      <CardBody>
                        <Container fluid>
                          <Row>
                            <Col md="6" className="p-0">
                              <ul style={{ paddingInlineStart: "0px" }}>{amenitySuccessItems}</ul>
                            </Col>
                            <Col md="6" className="p-0">
                              <ul style={{ paddingInlineStart: "0px" }}>{amenityDangerItems}</ul>
                            </Col>
                          </Row>
                        </Container>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" lg="4" className="mt-4">
                    <Card className="h-100">
                      <CardHeader>Parking Options</CardHeader>
                      <CardBody>
                        { space.parking_options && <p>{ space.parking_options }</p> }
                        { !space.parking_options && <p>No parking options available</p> }
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6" lg="4" className="mt-4">
                    <Card className="h-100">
                      <CardHeader>Food Options</CardHeader>
                      <CardBody>
                        { foodItems.length > 0 && <ul>
                          { foodItems }
                        </ul> }
                        { foodItems.length === 0 && <p>No food options available</p> }
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6" lg="4" className="mt-4">
                    <Card className="h-100">
                      <CardHeader>Alcohol Options</CardHeader>
                      <CardBody>
                        { alcoholItems.length > 0 && <ul>
                          { alcoholItems }
                        </ul> }
                        { alcoholItems.length === 0 && <p>No alcohol options available</p> }
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
  
  
              <Col md="5" className="mt-3">
                { photoItems.length > 0 && <Row>
                  <Col md="12" className="individual-space-main-carousel">
                    <Carousel showArrows={true} infiniteLoop onClickItem={() => setSpaceCarouselModal(true)}>{ photoItems }</Carousel>
                  </Col>
                </Row> }
                <Row>
                  <Col md="12" className="mt-2">{button}</Col>
                </Row>
                <Row>
                  <Col md="12" className="mt-2"><p className="side-note">Get a response within 48 hours</p></Col>
                </Row>
              </Col>
            </Row>
            <EventFormModal
              open={eventFormModal}
              space={space}
              user={user}
              eventFormValues={eventFormValues}
              toggle={handleEventFormToggle} />
            <IndividualSpaceCarouselModal
              open={spaceCarouselModal}
              spaceId={space.id}
              toggle={() => setSpaceCarouselModal(!spaceCarouselModal)} />
          </Container>
        );
      } else {
        return (
          <Container>
            <Row>
              <Col md="12" className="mt-5">
                <h1>This place does not exist.</h1>
              </Col>
            </Row>
          </Container>
        );
      }
}

const mapStateToProps = (state) => {
  return {
    spaces: state.spaces,
    user: state.user,
    eventFormValues: state.events.eventForm,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSpaces: () => dispatch({type: "GET_SPACES"}),
    navigateTo: (route) => {
      dispatch(push(route));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Space);