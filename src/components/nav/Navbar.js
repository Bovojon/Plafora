import React, {useState} from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import AccountNav from './AccountNav';

const MainNavbar = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const { auth: { token } } = props;

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const handleBrandClick = (event) => {
		event.preventDefault();
		props.navigateTo("/");
	}
	
	const handleLoginClick = (e) => {
		e.preventDefault();
		props.navigateTo("/login");
	}

	const handleSpacesClick = (e) => {
		e.preventDefault();
		props.navigateTo("/places");
	}

    return (
		<Navbar color="info" dark expand="md" fixed="top">
			<NavbarBrand href="#" onClick={handleBrandClick}>
				Plafora
			</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav navbar>
					<NavLink href="#!" onClick={handleSpacesClick}>Places</NavLink>
				</Nav>
				<Nav className="ml-auto" navbar>
					{token && <AccountNav />}
					{!token && <NavItem>
						<NavLink href="#" onClick={handleLoginClick}>Login</NavLink>
					</NavItem>}
				</Nav>
			</Collapse>
		</Navbar>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		navigateTo: (route) => {
			dispatch(push(route));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);
