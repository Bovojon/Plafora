import React from 'react';
import {connect} from 'react-redux';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { FormGroup, Label, Input, Button, Row, Col } from "reactstrap";

import ErrorSpan from './ErrorSpan';
import FormikDateTime from './FormikDateTime';

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warning: false,
            formPage: 1
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
        const {formPage} = this.state;
        const {useLocalStorage, spaceId, userId, eventFormValues, venueName} = this.props;

        return (
            <>
                {/* Form Navigation */}
                <div className="step-indicator">
                    <p
                        className={formPage >= 1 ? "step completed" : "step"}
                        onClick={() => this.setState({ formPage: 1 })}>
                        1. Basics
                    </p>
                    <p
                        className={formPage >= 2 ? "step completed" : "step"}
                        onClick={() => this.setState({ formPage: 2 })}>
                        2. Catering
                    </p>
                    <p
                        className={formPage >= 3 ? "step completed" : "step"}
                        onClick={() => this.setState({ formPage: 3 })}>
                        3. Amenities
                    </p>
                    { 
                        !useLocalStorage && <p
                        className={formPage >= 4 ? "step completed" : "step"}
                        onClick={() => this.setState({ formPage: 4 })}>
                        4. Message
                    </p> 
                    }
                </div>
                {/* Form */}
                <Formik
                    validateOnBlur={false}
                    initialValues={ eventFormValues ? eventFormValues : {
                        title: '',
                        min_budget: '',
                        max_budget: '',
                        min_guests: '',
                        max_guests: '',
                        start_date_time: '',
                        end_date_time: '',
                        style: 'Banquet',
                        style_other: '',
                        atmosphere: 'Formal',
                        atmosphere_other: '',
                        food_options: 'Buffet',
                        food_options_other: '',
                        alcohol_options: 'On-site catering',
                        alcohol_options_other: '',
                        av: '3',
                        av_assistance: '3',
                        private: '3',
                        onsite_coordinator: '3',
                        wheelchair_accessible: '3',
                        full_bar: '3',
                        message: ''
                    }}
                    onSubmit={(values, {setSubmitting, resetForm, initialValues, setErrors, isTouched}) => {
                        const resetThisForm = () => resetForm(initialValues);
                        if (useLocalStorage) {
                            this.props.saveEvent(values, setSubmitting, resetThisForm, setErrors, isTouched)
                        }
                        else {
                            this.props.submitEvent(values, setSubmitting, resetThisForm, setErrors, isTouched, spaceId, userId)
                        }
                    }}
                    render= {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue, submitForm}) => (
                        <Form onSubmit={handleSubmit} className="w-100">
                            { /* First Group */ }
                            { 
                                formPage === 1 && 
                                <>
                                    <h4>Basics</h4>
                                    <FormGroup>
                                        <Label for="title">Event Title <span className="text-danger">*</span></Label>
                                        <Field 
                                            type="text" 
                                            name="title" 
                                            render={ ({field}) => (<Input {...field} type="text" placeholder="e.g. Quarterly Team Outing" /> )} 
                                        />
                                        <ErrorMessage name="title" component={ErrorSpan} />
                                    </FormGroup>
                                    <Row form>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="min_guests">Min Guests <span className="text-danger">*</span></Label>
                                                <Field
                                                    type="number"
                                                    name="min_guests"
                                                    render={ ({field}) => (<Input {...field} type="number" placeholder="0" />)} 
                                                />
                                                <ErrorMessage name="min_guests" component={ErrorSpan} />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="max_guests">Max Guests <span className="text-danger">*</span></Label>
                                                <Field
                                                    type="number"
                                                    name="max_guests"
                                                    render={ ({field}) => ( <Input {...field} type="number" placeholder="99999" /> )} 
                                                />
                                                <ErrorMessage name="max_guests" component={ErrorSpan} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="min_budget">Min Budget <span className="text-danger">*</span></Label>
                                                <Field
                                                    type="number"
                                                    name="min_budget"
                                                    render={ ({field}) => ( <Input {...field} type="number" placeholder="0" /> )} 
                                                />
                                                <ErrorMessage name="min_budget" component={ErrorSpan} />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="max_budget">Max Budget <span className="text-danger">*</span></Label>
                                                <Field
                                                    type="number"
                                                    name="max_budget"
                                                    render={ ({field}) => ( <Input {...field} type="number" placeholder="99999" />)} 
                                                />
                                                <ErrorMessage name="max_budget" component={ErrorSpan} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="start_date_time">Start Date and Time <span className="text-danger">*</span></Label>
                                                <Field name="start_date_time" timeFormat={true} component={FormikDateTime} />
                                                <ErrorMessage name="start_date_time" component={ErrorSpan} />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="end_date_time">End Date and Time <span className="text-danger">*</span></Label>
                                                <Field name="end_date_time" timeFormat={true} component={FormikDateTime} />
                                                <ErrorMessage name="end_date_time" component={ErrorSpan} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <Label for="style">Style <span className="text-danger">*</span></Label>
                                        <Field component="select" name="style" className="form-control">
                                            <option>Banquet</option>
                                            <option>Boardroom (Conference Room)</option>
                                            <option>Classroom</option>
                                            <option>Cocktail</option>
                                            <option>Interactive Activity</option>
                                            <option>Theater</option>
                                            <option>Other (add your own)</option>
                                        </Field>
                                        <ErrorMessage name="style" component={ErrorSpan} />
                                    </FormGroup>
                                    { 
                                        values.style === "Other (add your own)" && 
                                        <FormGroup>
                                            <Label for="style_other">Add your event style<span className="text-danger">*</span></Label>
                                            <Field
                                                type="text"
                                                name="style_other"
                                                render={ ({field}) => ( <Input {...field} type="text" placeholder="" /> )} 
                                            />
                                        </FormGroup> 
                                    }
                                    <FormGroup>
                                        <Label for="atmosphere">Atmosphere</Label>
                                        <Field component="select" name="atmosphere" className="form-control">
                                            <option>Formal</option>
                                            <option>Casual</option>
                                            <option>Other (add your own)</option>
                                        </Field>
                                        <ErrorMessage name="atmosphere" component={ErrorSpan} />
                                    </FormGroup>
                                    { 
                                        values.atmosphere === "Other (add your own)" && 
                                        <FormGroup>
                                            <Label for="atmosphere_other">Add your event atmosphere</Label>
                                            <Field
                                                type="text"
                                                name="atmosphere_other"
                                                render={ ({field}) => (<Input {...field} type="text" placeholder="" /> )} 
                                            />
                                        </FormGroup> 
                                    }
                                </> 
                            }
                            { /* Second Group */ }
                            { 
                                formPage === 2 && 
                                <>
                                    <h4>Catering</h4>
                                    <FormGroup>
                                        <Label for="food_options">Food <span className="text-danger">*</span></Label>
                                        <Field component="select" name="food_options" className="form-control">
                                            <option>Buffet</option>
                                            <option>Served dinner</option>
                                            <option>Appetizers</option>
                                            <option>Coffee and tea</option>
                                            <option>Bring your own off-site catering</option>
                                            <option>No food needed</option>
                                            <option>Other (add your own)</option>
                                        </Field>
                                        <ErrorMessage name="food_options" component={ErrorSpan} />
                                    </FormGroup>
                                    { 
                                        values.food_options === "Other (add your own)" && 
                                        <FormGroup>
                                            <Label for="food_options_other">Add your food option</Label>
                                            <Field
                                                type="text"
                                                name="food_options_other"
                                                render={ ({field}) => ( <Input {...field} type="text" placeholder="" />)} 
                                            />
                                        </FormGroup> 
                                    }
                                    <FormGroup>
                                        <Label for="alcohol_options">Alcohol <span className="text-danger">*</span></Label>
                                        <Field component="select" name="alcohol_options" className="form-control">
                                            <option>On-site catering</option>
                                            <option>Outside catering</option>
                                            <option>Flexible catering</option>
                                            <option>No alcohol needed</option>
                                            <option>Other (add your own)</option>
                                        </Field>
                                        <ErrorMessage name="alcohol_options" component={ErrorSpan} />
                                    </FormGroup>
                                    { 
                                        values.alcohol_options === "Other (add your own)" && 
                                        <FormGroup>
                                            <Label for="alcohol_options_other">Add your alcohol option</Label>
                                            <Field
                                                type="text"
                                                name="alcohol_options_other"
                                                render={ ({field}) => ( <Input {...field} type="text" placeholder="" /> )} 
                                            />
                                        </FormGroup> 
                                    }
                                </>
                            }
                            { /* Third Group */ }
                            { 
                                formPage === 3 && 
                                <>
                                    <h4>Amenities</h4>
                                    <FormGroup>
                                        <Label for="av">AV</Label>
                                        <Field component="select" name="av" className="form-control">
                                            <option value="3">Not needed</option>
                                            <option value="1">Must have</option>
                                            <option value="2">Nice to have</option>
                                        </Field>
                                        <ErrorMessage name="av" component={ErrorSpan} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="av_assistance">AV Assistance</Label>
                                        <Field component="select" name="av_assistance" className="form-control">
                                            <option value="3">Not needed</option>
                                            <option value="1">Must have</option>
                                            <option value="2">Nice to have</option>
                                        </Field>
                                        <ErrorMessage name="av_assistance" component={ErrorSpan} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="private">Privacy</Label>
                                        <Field component="select" name="private" className="form-control">
                                            <option value="3">Not needed</option>
                                            <option value="1">Must have</option>
                                            <option value="2">Nice to have</option>
                                        </Field>
                                        <ErrorMessage name="private" component={ErrorSpan} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="onsite_coordinator">Onsite Coordinator</Label>
                                        <Field component="select" name="onsite_coordinator" className="form-control">
                                            <option value="3">Not needed</option>
                                            <option value="1">Must have</option>
                                            <option value="2">Nice to have</option>
                                        </Field>
                                        <ErrorMessage name="onsite_coordinator" component={ErrorSpan} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="wheelchair_accessible">Wheelchair Accessible</Label>
                                        <Field component="select" name="wheelchair_accessible" className="form-control">
                                            <option value="3">Not needed</option>
                                            <option value="1">Must have</option>
                                            <option value="2">Nice to have</option>
                                        </Field>
                                        <ErrorMessage name="wheelchair_accessible" component={ErrorSpan} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="full_bar">Full Bar</Label>
                                        <Field component="select" name="full_bar" className="form-control">
                                            <option value="3">Not needed</option>
                                            <option value="1">Must have</option>
                                            <option value="2">Nice to have</option>
                                        </Field>
                                        <ErrorMessage name="full_bar" component={ErrorSpan} />
                                    </FormGroup>
                                </> 
                            }
                            { /* Fourth Group */ }
                            { 
                                formPage === 4 && !useLocalStorage && 
                                <>
                                    <h4>Message</h4>
                                    <FormGroup>
                                        <Label for="message">Message for { venueName ? venueName : "Venue"}</Label>
                                        <Field
                                            type="textarea"
                                            name="message"
                                            render={ ({field}) => ( <Input {...field} type="textarea" rows="5" placeholder="Share other details about your event" /> )} 
                                        />
                                        <ErrorMessage name="message" component={ErrorSpan} />
                                    </FormGroup>
                                </> 
                            }
                            <div className="d-flex justify-content-between">
                                { formPage === 1 && <div></div> }
                                { 
                                    formPage > 1 && 
                                    <Button onClick={() => this.setState({ formPage: formPage - 1 })} disabled={isSubmitting} color="secondary">
                                        Previous
                                    </Button>}
                                { 
                                    formPage < (useLocalStorage ? 3 : 4) && 
                                    <Button onClick={() => this.setState({ formPage: formPage + 1 })} disabled={isSubmitting} color="secondary">
                                        Next
                                    </Button>
                                }
                                { 
                                    formPage === (useLocalStorage ? 3 : 4) && 
                                    <Button color="info" type="submit"
                                        disabled={isSubmitting}
                                        onClick={() => {
                                            this.setState({ formPage: 1 });
                                            submitForm();
                                        }}>
                                        { useLocalStorage ? "Save" : "Submit" }
                                    </Button> 
                                }
                            </div>
                        </Form>
                    )}
                 />
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitEvent: (values, setSubmitting, resetForm, setErrors, isTouched, spaceId, userId) => (
            dispatch({ 
                type: 'EVENT_REQUEST',
                payload: { values, setSubmitting, resetForm, setErrors, isTouched, spaceId, userId }
             })
        ),
        saveEvent: (values, setSubmitting, resetForm, setErrors, isTouched) => (
            dispatch({
                type: 'SAVE_EVENT_REQUEST',
                payload: { values, setSubmitting, resetForm, setErrors, isTouched }
            })
        )
    }
}

export default connect(null, mapDispatchToProps)(EventForm);