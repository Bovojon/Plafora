import React, {useState} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const AccountNav = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        props.logout();
        handleClose();
    }

    return (
        <>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {props.user.username}
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch({ type: 'SIGN_OUT' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountNav);