import {createStore, applyMiddle, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import {createLogger} from 'redux-logger';

import createRootReducer from '../reducers';
import rootSaga from '../sagas';

const logger = createLogger();
export const history = createBrowserHistory;
const sagaMiddleware = createSagaMiddleware();

/*
- compose() is used to apply multiple store enhancers (e.g. middleware, time travel, persistence). 
- applyMiddleware() is the only enhancer that ships with Redux.
*/
const store = createStore(
    createRootReducer(history),
    compose(applyMiddleware(routerMiddleware(history), logger, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
