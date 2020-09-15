import {all, call, takeEvery, put} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { toastr } from 'react-redux-toastr';

import { handleErrorSaga, handleApiErrorSaga } from './errorSaga';
import { UserService } from '../services';

function* udpateUser({ payload: { values, setSubmitting, resetForm, setErrors, isTouched } }) {
    const form_first_name = values.first_name;
    const form_last_name = values.last_name;

    try {
        const response = yield call(UserService.updateUser, {
            first_name: form_first_name,
            last_name: form_last_name
        });
        const { first_name, last_name } = yield response.data;
        yield put({ type: 'UPDATE_USER_SUCCESS', payload: { first_name, last_name } });
        toastr.success("Update successful");
        setSubmitting(false);
        resetForm();
        yield put(push("/"))
    } catch (error) {
        setSubmitting(false);
        if (error.response && error.response.status) {
            if (error.response.status === 400) {
              if (error.response.data) {
                if (error.response.data.detail) toastr.error(error.response.data.detail, { timeOut: 10000 });
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

function* listenForUpdateUserRequest() {
    yield takeLatest('UPDATE_USER_REQUEST', udpateUser);
}

function* userSaga() {
    yield all([
        call(listenForUpdateUserRequest),
    ]);
}

export default userSaga;