import {call, put, takeLatest, takeEvery, all} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import {toastr} from 'react-redux-toastr';

import {AuthService} from '../services';
import {handleErrorSaga, handleApiErrorSaga} from './errorSaga';

/**
 * Workers
 */
function* authorize({ payload: { values, setSubmitting, resetForm, setErrors, isTouched, } }) {
    const {email, password} = values;
    try {
        const response = yield call(AuthService.login, {email, password});
        const {key, user} = yield response.data;
        yield put({type: 'AUTH_SUCCESS', payload: {token: key}});
        toastr.success('Login Successful');
        yield put({type: 'SET_USER', payload: {user: user}});
        setSubmitting(false);
        resetForm();
        yield put(push("/"))
    } catch (error) {
        setSubmitting(false);
        if(error.response && error.response.status){
            if(error.response.status === 400){
                if(error.response.data) {
                    if(error.response.data.non_field_errors) {
                        toastr.error(error.response.data.non_field_errors, { timeOut: 10000 });
                    }
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

function* handleSignOut() {
    yield put(push('/'));
}

function* register({payload: {values, setSubmitting, resetForm, setErrors, isTouched}}) {
	const {email, password1, password2} = values;

	try {
		const response = yield call(AuthService.register, {email, password1, password2});
		const {key, user} = yield response.data;
		yield put({type: "AUTH_SUCCESS", payload: {token: key}});
		toastr.success('Registration Successful');
		yield put({type: 'SET_USER', payload: {user: user}});
		setSubmitting(false);
		resetForm();
		yield put(push('/profile'));
	} catch(error) {
		setSubmitting(false);
		if(error.response && error.response.status){
			if(error.response.status === 400){
				if(error.response.data) {
				if(error.response.data.non_field_errors) toastr.error(error.response.data.non_field_errors, { timeOut: 10000 });
				setErrors(error.response.data);
				isTouched = true;
				}
			} else {
				yield call(handleApiErrorSaga, error);
			}
		} else {
			yield call(handleErrorSaga, error);
		}
	}
}

/**
 * Watchers
 */
function* listenForSignInRequest() {
    yield takeLatest('AUTH_REQUEST', authorize);
}

function* listenForSignOut() {
    yield takeEvery('SIGN_OUT', handleSignOut);
}

function* listenForRegistrationRequest() {
	yield takeLatest('REGISTRATION_REQUEST', register);
}

function* authSaga() {
    yield all([
        call(listenForSignInRequest),
		call(listenForSignOut),
		call(listenForRegistrationRequest)
    ]);
}

export default authSaga;
