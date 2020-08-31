import React from 'react';
import {connect} from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

import ErrorSpan from './ErrorSpan';

class UserForm extends React.Component {
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
                <h3>Update User Info</h3>
                <Formik 
                    validateOnBlur={false}
                    initialValues={{
                        first_name: this.props.user.first_name,
                        last_name: this.props.user.last_name
                    }}
                    onSubmit={(values, {setSubmitting,resetForm,initialValues,setErrors,isTouched}) => {
                        const resetForm = () => resetForm(initialValues);
                        this.props.updateUser(values, setSubmitting, resetForm, setErrors, isTouched)
                    }}
                    render={({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue}) => (
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="first_name">First name</Label>
                                <Field
                                    type="text"
                                    name="first_name"
                                    render={ ({field}) => ( <Input {...field} type="text" required /> )} 
                                />
                                <ErrorMessage name="first_name" component={ErrorSpan} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="last_name">Last name</Label>
                                <Field
                                    type="text"
                                    name="last_name"
                                    render={ ({field}) => ( <Input {...field} type="text" required /> )} 
                                />
                                <ErrorMessage name="last_name" component={ErrorSpan} />
                            </FormGroup>
                            <Button color="info" type="submit" disabled={isSubmitting}>Update</Button>
                        </Form>
                    )}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (values, setSubmitting, resetForm, setErrors, isTouched) => dispatch({ 
            type: 'UPDATE_USER_REQUEST', 
            payload: { values, setSubmitting, resetForm, setErrors, isTouched 
        }})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);