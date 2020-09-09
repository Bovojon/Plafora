import {put, takeLatest, call} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';

import {AUTH_FAILURE, SESSION_EXPIRED} from '../actions/constants';

function* handleApiErrorSaga(error) {
    let message;

    switch(error.response.status) {
        case 500: {
            console.error(error.response);
            break;
        }
        case 401: {
            message = 'Session has expired or you have been logged out due to inactivity.';
            toastr.error('Authentication Error', "Authentication has expired. Please login again.", {timeOut: 6000});
            yield put({type: SESSION_EXPIRED, payload: message});
            break;
        }
        case 400:
            console.error(error.response);
            if (error.response.data && error.response.data.error) {
                const {code, message} = error.response.data.error;
                toastr.error(code.toString(), message, {timeOut: 4000});
            }
            break;
        case 404:
            console.error(error.response);
            break;
        case 403:
            if (error.response.data && error.response.data.error) {
                const {message} = error.response.data.error;
                toastr.error('Authorization Error', message, { timeOut: 4000 });
            } else {
                toastr.error('Authorization Error', "You are not authorized to complete this action.", { timeOut: 4000 });
            }
            break;
        default:
            message = `Something went wrong. ${error.response.data.error}`;
    }
}

function* handleErrorSaga(error) {
    if(error.response && error.response.status) {
        // API error
        yield call(handleApiErrorSaga, error);
    } else {
        // React app error
       console.error('Error: ', error);
       yield put({type: 'EXCEPTION_ERROR', payload: {error}});
    }
}

/* 
    Worker
*/
function* handleFailedAuth() {
    yield put({type: 'SIGN_OUT'});
}

/* 
    Watcher
*/
function* listenForErrors() {
    yield takeLatest(AUTH_FAILURE, handleFailedAuth);
}

export {
    handleApiErrorSaga,
    handleErrorSaga,
    listenForErrors
}