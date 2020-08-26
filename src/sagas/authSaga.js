import {call, put, takeLatest, takeEvery, all} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import {toastr} from 'react-redux-toastr';

import {AuthService} from '../services';
import {handleErrorSaga, handleApiErrorSaga} from './errorSaga';

/**
 * Workers
 */
function* authorize({ payload: {values, setSubmitting, resetForm} }) {
    const {email, password} = values;

    try {
        const response = yield call(AuthService.login, {email, password});
        const {key} = yield response.data;

        yield put({type: 'AUTH_SUCCESS', payload: {token: key}});
        toastr.success('Login Success');
        yield put({type: 'FETCH_USER'});

        setSubmitting(false);
        resetForm();
    } catch (error) {
        setSubmitting(false);
        resetForm();

        if (error.response && error.response.status) {
            if (error.response.status === 401 || error.response.status === 400) {
                if (error.response.data.error && error.response.data.error.code) {
                    toastr.error(error.response.data.error.code, error.response.data.error.message, {timeOut: 10000});
                } else {
                    toastr.error("Authentication Error", "There was a problem with authentication.", {timeOut: 10000});
                }
            } else {
                yield call(handleApiErrorSaga, error);
            }
        } else {
            yield call(handleErrorSaga, error);
        }
    }
}

function* handleSignOut() {
    yield put(push('/'));
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

function* authSaga() {
    yield all([
        call(listenForSignInRequest),
        call(listenForSignOut)
    ]);
}

export default authSaga;
