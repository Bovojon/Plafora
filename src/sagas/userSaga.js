import {all, call, takeEvery, put} from 'redux-saga/effects';
import {handleErrorSaga} from './errorSaga';
import {UserService} from '../services';

// Worker
function* handleFetchUserSaga() {
    try {
        const response = yield call(UserService.getUser);
        const responseData = yield response.data;
        yield put({type: 'FETCH_USER_SUCCESS', payload: responseData});
    } catch(error) {
        yield call(handleErrorSaga, error);
    }
}

// Watcher
function* listenForFetchUser() {
    yield takeEvery('FETCH_USER', handleFetchUserSaga);
}

function* userSaga() {
    yield all([
        call(listenForFetchUser),
    ])
}

export default userSaga;