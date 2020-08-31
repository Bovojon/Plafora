import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { FormGroup, Label, Input, Button } from "reactstrap";

import ErrorSpan from './ErrorSpan';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warning: false
        }
    }

    onBlur(handleBlur, event) {
        this.setState({ warning: false });
        handleBlur(event);
    }

    onKeyUp = keyEvent => {
        if (keyEvent.getModifierState("CapsLock")) {
        this.setState({ warning: true });
        } else {
        this.setState({ warning: false });
        }
    };

    onKeyDown = keyEvent => {
        if (keyEvent.getModifierState("CapsLock")) {
        this.setState({ warning: true });
        } else {
        this.setState({ warning: false });
        }
    };

    render() {
        return (
            <>
                <h3>Sign Up</h3>
                <Formik
                    validateOnBlur={false}
                    initialValues={{email:'', password1:'', password2:''}}
                    onSubmit={(values, {setSubstring, resetForm, initialValues, isError, isTouched}) => {
                        const resetThisForm = () => resetForm(initialValues);
                        this.props.register(values, setSubstring, resetThisForm, isError, isTouched)
                    }}
                    render = {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue}) => (
                        <Form className="w-100">
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Field
                                    type="email"
                                    name="email"
                                    render={ ({field}) => ( <Input  {...field} type="email" placeholder="Email" />)} 
                                />
                                <ErrorMessage name="email" component={ErrorSpan} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password1">Password</Label>
                                <Field
                                    type="password"
                                    name="password1"
                                    render={ ({field}) => ( <Input {...field} type="password" placeholder="Password" /> )} 
                                />
                                <ErrorMessage name="password1" component={ErrorSpan} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password2">Confirm Password</Label>
                                <Field
                                    type="password"
                                    name="password2"
                                    render={ ({field}) => ( <Input {...field} type="password" placeholder="Confirm Password" /> )} 
                                />
                                <ErrorMessage name="password2" component={ErrorSpan} />
                            </FormGroup>
                            <Button color="info" type="submit" disabled={isSubmitting}>Sign Up</Button>
                        </Form>
                    )}
                />
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (values, setSubmitting, resetForm, setErrors, isTouched) => dispatch({
            type: "REGISTRATION_REQUEST",
            payload: { values, setSubmitting, resetForm, setErrors, isTouched }
        })
    }
}

export default connect(null, mapDispatchToProps)(RegistrationForm);