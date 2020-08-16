import React from 'react';
import {connect} from 'react-redux';
import {
    AppBar ,
    Toolbar,
    Typography,
    Button
} from '@material-ui/core';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import AccountNav from './AccountNav';

const useStyles = makeStyles(theme => ({
    '@global': {
        ul: {
          margin: 0,
          padding: 0,
        },
        li: {
          listStyle: 'none',
        },
      },
      appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      toolbar: {
        flexWrap: 'wrap',
      },
      toolbarTitle: {
        flexGrow: 1,
      },
      link: {
        margin: theme.spacing(1, 1.5),
      },
      heroContent: {
        padding: theme.spacing(8, 0, 6),
      },
      cardHeader: {
        backgroundColor: theme.palette.grey[200],
      },
      cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
      },
      footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
        },
      },
}));

const Navbar = (props) => {
    const classes = useStyles();

    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography varient="h6" color="inherit" noWarp className={classes.toolbarTitle}>
                    Plafora
                </Typography>
                {props.auth.token ? 
                    <AccountNav />
                : 
                    <Button href="#" color="primary" varient="outlined" className={classes.link}>
                        Login
                    </Button>
                }
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Navbar);
