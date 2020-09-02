import React, {useState} from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import { 
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

const AccountNav = (props) => {
    const handleLogout = () => {
        props.logout();
    }

    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                {props.user ? 
                    (props.user.first_name ? 
                        `${props.user.first_name} ${props.user.last_name}`
                        :
                        props.user.email
                    )
                    :
                    ""
                }
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem onClick={() => props.navigateTo("/profile")}>
                    Profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout}>
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (route) => {
            dispatch(push(route));
        },
        logout: () => dispatch({ type: 'SIGN_OUT' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountNav);