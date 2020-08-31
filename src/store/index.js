import {createStore, applyMiddleware, compose} from 'redux';
import {save, load, combineLoads} from 'redux-localstorage-simple';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';

import createRootReducer from '../reducers';
import rootSaga from '../sagas';

export const history = createBrowserHistory();
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    createRootReducer(history),
    combineLoads(load({
        states: ['auth', 'user', 'spaces'],
        namespace: 'plafora'
    })),
    compose(applyMiddleware(
        routerMiddleware(history), 
        logger, 
        sagaMiddleware,
        save({
            states: ['auth', 'user', 'spaces'],
            namespace: 'plafora',
            debounce: 2000
        })
    ))
);

sagaMiddleware.run(rootSaga);

export default store;
