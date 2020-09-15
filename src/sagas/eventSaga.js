import {call, takeLatest, all, put} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import {toastr} from 'react-redux-toastr';
import {handleErrorSaga, handleApiErrorSaga} from './errorSaga';
import moment from 'moment';

import {EventService, InquiryService} from '../services';

/**
 * Workers
 */
function* submitEvent({payload: {values, setSubmitting, resetForm, setErrors, isTouched, spaceId, userId}}) {
    let {
        title, min_guests, max_guests, min_budget,max_budget,start_date_time, end_date_time, 
        style, style_other, atmosphere, atmosphere_other, food_options, food_options_other, 
        alcohol_options, alcohol_options_other, av, av_assistance, onsite_coordinator, 
        wheelchair_accessible, full_bar, message
    } = values;
    
    let private_details = values.private;
    
    av = [av];
    av_assistance = [av_assistance];
    private_details = [private_details];
    onsite_coordinator = [onsite_coordinator];
    wheelchair_accessible = [wheelchair_accessible];
    full_bar = [full_bar];

    if (style === "Other") style = style_other;
    if(atmosphere === "Other") atmosphere = atmosphere_other;
    if(food_options === "Other") food_options = food_options_other;
    if(alcohol_options === "Other") alcohol_options = alcohol_options_other;

    start_date_time = moment(start_date_time).format('YYYY-MM-DD HH:mm:ss');
    end_date_time = moment(end_date_time).format('YYYY-MM-DD HH:mm:ss');

    try {
        const response = yield call(EventService.submitEvent, {
            title,  min_guests,  max_guests,  min_budget, max_budget, 
            start_date_time,  end_date_time,  style, atmosphere, food_options, 
            alcohol_options, av, av_assistance, private: private_details, 
            onsite_coordinator, wheelchair_accessible, full_bar, users: [userId]
        });
        const responseData = yield response.data;

        if(responseData.id) {
            yield call(InquiryService.requestReservation, {
                inquirer: userId,
                space: spaceId,
                event: responseData.id,
                status: [4],
                message: message
            });
        } else {
            throw new Error("Event id is missing.")
        }

        toastr.success("Event submitted successfully.");
        setSubmitting(false);
        resetForm();
        yield put(push(`/request/${spaceId}/confirmation`));
    } catch(error) {
        setSubmitting(false);
        if (error.response && error.response.status) {
            if (error.response.status === 400) {
              if (error.response.data) {
                if (error.response.data.non_field_errors) toastr.error(error.response.data.non_field_errors, { timeOut: 10000 });
                setErrors(error.response.data);
                isTouched = true;
              }
            } else {
              yield call(handleApiErrorSaga,error);
            }
        } else {
            yield call(handleErrorSaga,error);
        }
    }
}

function* saveEvent({ payload: { values, setSubmitting, resetForm, setErrors, isTouched } }) {
    toastr.success("Event saved.");
    setSubmitting(false);
    resetForm();
    yield put(push("/places"));
}

/**
 * Watchers
 */
function* listenForEventRequest() {
    yield takeLatest("EVENT_REQUEST", submitEvent);
}

function* listenForSaveEventRequest() {
    yield takeLatest("SAVE_EVENT_REQUEST", saveEvent);
}

function* eventSaga() {
    yield all([
        call(listenForEventRequest),
        call(listenForSaveEventRequest)
    ]);
}

export default eventSaga;