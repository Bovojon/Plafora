import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {
    TextField,
    FormControl,
    Button,
    Grid,
    Input
} from '@material-ui/core';

class LoginForm extends Component {
    state = {warning: false};

    /**
     * Hide warning when losing focus.
     * @param handleBlur Formik blur event.
     * @param event      Input event.
     */
    onBlur(handleBlur, event) {
        this.setState({warning: false});
        handleBlur(event);
    }

    /**
     * Detect caps lock being on when typing.
     * @param keyEvent On key down event.
     */
    onKeyUp = keyEvent => {
        if(keyEvent.getModifierState("CapsLock")) {
            this.setState({warning: true});
        } else {
            this.setState({warning: false});
        }
    };

    onKeyDown = keyEvent => {
        if (keyEvent.getModifierState("CapsLock")) {
            this.setState({warning: true});
        } else {
            this.setState({warning: false});
        }
    };

    render() {
        return (
            <Fragment>
                <h3>Sign In</h3>
                <Formik 
                    validateOnBlur={false}
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values, {setSubmitting, resetForm, initialValues}) => {
                        const resetThisForm = () => resetForm(initialValues);
                        this.props.login(values, setSubmitting, resetThisForm)
                    }}
                    render = {
                        ({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue}) => (
                            <Form onSubmit={handleSubmit}>
                                <Grid item style={{margin:5}}>
                                    <FormControl>
                                        <Field 
                                            type="email"
                                            name="email"
                                            render={({field}) => (
                                                <TextField mb={2} {...field} label="Email" varient="outlined" />
                                            )}
                                        />
                                        <ErrorMessage name="email" component="div" />
                                    </FormControl>
                                </Grid>

                                <Grid item style={{margin:5}}>
                                    <FormControl>
                                        <Field 
                                            type="password"
                                            name="password"
                                            render={({field}) => (
                                                <TextField m={2} {...field} label="Password" varient="outlined" />
                                            )}
                                        />
                                        <ErrorMessage name="password" component="password" />
                                    </FormControl>
                                </Grid>
                                <Button varient="contained" color="primary" size="large"><Input type="submit" disabled={isSubmitting}>Sign In</Input></Button>
                            </Form>
                        )
                    }
                />
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (values, setSubmitting, resetForm) => dispatch({
            type: 'AUTH_REQUEST', 
            payload: {values, setSubmitting, resetForm}
        })
    }
}

export default connect(null, mapDispatchToProps)(LoginForm);