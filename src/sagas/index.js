import {all} from 'redux-saga/effects';

import authSaga from './authSaga';
import eventSaga from './eventSaga';
import spaceSaga from './spaceSaga';
import userSaga from './userSaga';

function* rootSaga() {
    yield all([
        authSaga(),
        eventSaga(),
        spaceSaga(),
        userSaga(),
    ])
}

export default rootSaga;
