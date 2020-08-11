const { Component } = require("react")

import React {Component, Fragment} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';

import {
    TextField,
    FormControl,
    Button,
    Grid
} from '@material-ui/core';

class RegistrationForm extends Component {
    state={warning: false};

    /**
     * Hide warning when losing focus.
     * @param handleBlur Formik blur event.
     * @param event      Input event.
     */
    onBlur(handleBlur, event) {
        this.setState({ warning: false });
        handleBlur(event);
    }

    /**
     * Detect caps lock being on when typing.
     * @param keyEvent On key down event.
     */
    onKeyUp = keyEvent => {
        if (keyEvent.getModifierState("CapsLock")) {
        this.setState({ warning: true });
        } else {
        this.setState({ warning: false });
        }
    };

    /**
     * Detect caps lock being on when typing.
     * @param keyEvent On key down event.
     */
    onKeyDown = keyEvent => {
        if (keyEvent.getModifierState("CapsLock")) {
        this.setState({ warning: true });
        } else {
        this.setState({ warning: false });
        }
    };

    render() {
        return (
            <Fragment>
                <h3>Sign Up</h3>
                <Formik
                    validateOnBlur={false}
                    initialValues={{email:'', password1:'', password2:''}}
                    onSubmit={(values, {setSubstring, restForm, initialValues}) => {
                        const resetThisForm = () => resetForm(initialValues);
                        this.props.submitLogin(values, setSubstring, resetThisForm)
                    }}
                    render = {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue}) => (
                        <Form>
                            <Grid item xs={12} style={{ margin: 5 }}>
                                <FormControl>
                                    <Field
                                        type="email"
                                        name="email"
                                        render={ ({field}) => (
                                            <TextField {...field} label="Email" variant="outlined" />
                                        )}
                                    />
                                    <ErrorMessage name="email" component="div" />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} style={{ margin: 5 }}>
                                <FormControl>
                                    <Field
                                        type="password1"
                                        name="password1"
                                        render={ ({field}) => (
                                            <TextField {...field} label="Password" variant="outlined" />
                                        )}
                                    />
                                    <ErrorMessage name="password1" component="password1" />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} style={{ margin: 5 }}>
                                <FormControl>
                                    <Field
                                        type="password2"
                                        name="password2"
                                        render={ ({field}) => (
                                            <TextField m={2} {...field} label="Confirm Password" variant="outlined" />
                                        )}
                                    />
                                    <ErrorMessage name="password2" component="password2" />
                                </FormControl>
                            </Grid>

                            <Button varient="contained" color="primary" size="large" disabled={isSubmitting}>Sign Up</Button>

                        </Form>
                    )}
                />
            </Fragment>
        )
    }
}

export default RegistrationForm;