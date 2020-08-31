import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { FormGroup, Label, Input, Button } from "reactstrap";

import ErrorSpan from './ErrorSpan';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warning: false
        }
    }

    onBlur(handleBlur, event) {
        this.setState({warning: false});
        handleBlur(event);
    }

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
            <>
                <h3>Sign In</h3>
                <Formik 
                    validateOnBlur={false}
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values, {setSubmitting, resetForm, initialValues}) => {
                        const resetThisForm = () => resetForm(initialValues);
                        this.props.login(values, setSubmitting, resetThisForm, setErrors, isTouched)
                    }}
                    render = {
                        ({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue}) => (
                            <Form onSubmit={handleSubmit} className="w-100">
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Field
                                        type="email"
                                        name="email"
                                        render={ ({field}) => ( <Input  {...field} type="email" placeholder="Email" /> )} 
                                    />
                                    <ErrorMessage name="email" component={ErrorSpan} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Field
                                        type="password"
                                        name="password"
                                        render={ ({field}) => ( <Input  {...field} type="password" placeholder="Password" />)} 
                                    />
                                    <ErrorMessage name="password" component={ErrorSpan} />
                                </FormGroup>
                                <Button color="info" type="submit" disabled={isSubmitting}>
                                    Sign In
                                </Button>
                            </Form>
                        )
                    }
                />
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (values, setSubmitting, resetForm, setErrors, isTouched) => dispatch({
            type: 'AUTH_REQUEST', 
            payload: { values, setSubmitting, resetForm, setErrors, isTouched }
        })
    }
}

export default connect(null, mapDispatchToProps)(LoginForm);