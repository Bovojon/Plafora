import { call, all, takeEvery, put } from 'redux-saga/effects';

import { SpaceService } from '../services';
import { handleErrorSaga } from './errorSaga';

/**
 * Worker
 */
function* getSpaces() {
    try {
        const response = yield call(SpaceService.getSpaces);
        const spaces = yield response.data;
        yield put({ type: "SPACES_SUCCESS", payload: { spaces } });
    } catch (error) {
        yield call(handleErrorSaga, error);
    }
}

/**
 * Watcher
 */
function* listenForGetSpaces() {
    yield takeEvery("GET_SPACES", getSpaces);
}

function* spaceSaga() {
    yield all([
        call(listenForGetSpaces)
    ]);
}

export default spaceSaga;