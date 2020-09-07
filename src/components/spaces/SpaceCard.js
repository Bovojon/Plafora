import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const SpaceCard = ({space, setSelectedSpace, navigateTo}) => {
    const handleImageClick = (e) => {
        setSelectedSpace(space.id);
    }

    const handleSeeMoreClick = (e) => {
        e.preventDefault();
        navigateTo(`/place/${space.id}`);
    }

    const backgroundPhoto = space.photos && space.photos.length > 0 ? space.photos[0].photo : null;

    let spaceStyle = "";
    if(space.styles.length > 0) {
        const guests = space.styles[0].min_guests < space.styles[0].max_guests ? `${space.styles[0].min_guests}-${space.styles[0].max_guests}` : space.styles[0].max_guests;
        spaceStyle = <h6>{ space.styles[0].style } <FontAwesomeIcon icon={faUser} /> { guests }</h6>;
    }

    let spacePrice = "";
    if(space.pricings.length > 0) {
        const pricing = space.pricings[0];
        let base = `$${ pricing.cost_min }`;
        if(pricing.cost_min < pricing.cost_max) base += ` - $${ pricing.cost_max }`;
        if(pricing.unit) base += ` per ${ pricing.unit }`;

        if(pricing.day === "NA") pricing.day = "";
        if(pricing.time === "NA") pricing.time = "";
        if(pricing.day || pricing.time)
        base += ` (${ pricing.time }${ pricing.day && pricing.time ? ", " : ""}${ pricing.day })`;

        spacePrice = <h6>{ base }</h6>;
    } else if(space.minimums.length > 0) {
        const minimum = space.minimums[0];
        let cost = `$${minimum.cost_max}`;
        if(minimum.cost_min < minimum.cost_max) cost = `$${minimum.cost_min}-` + cost;
        cost += ` for ${ minimum.item }`;
        if(minimum.day === "NA") minimum.day = "";
        if(minimum.time === "NA") minimum.time = "";
        if(minimum.day || minimum.time)
        cost += ` (${ minimum.time }${ minimum.day && minimum.time ? " on " : ""}${ minimum.day })`;

        spacePrice = <h6>{ cost }</h6>;
    }

    return (
        <Col lg="4" md="6" className="mb-3">
            <div className="space-listing-item-container">
                <div className="space-listing-item" onClick={handleImageClick}>
                    { backgroundPhoto && <img
                        src={backgroundPhoto}
                        className="space-listing-image"
                        alt={space.name} /> }
                    <div className="space-listing-content" onClick={handleSeeMoreClick} style={{ cursor: "pointer" }}>
                        <h5 className="text-white mb-0">{ space.name }</h5>
                        <h6 className="text-white-50 mb-0">{ space.venue.name }</h6>
                    </div>
                </div>
                <div onClick={handleSeeMoreClick} style={{ cursor: "pointer" }}>
                    <h6>{ space.address }</h6>
                    { spaceStyle }
                    {/*
                    { spacePrice }
                    */} 
                    <a href="#!">See More...</a>
                </div>
            </div>
        </Col>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (route) => {
            dispatch(push(route));
        }
    }
}

export default connect(null, mapDispatchToProps)(SpaceCard);