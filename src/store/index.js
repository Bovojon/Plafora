import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import {createLogger} from 'redux-logger';

import createRootReducer from '../reducers';
import {save, load, combineLoads} from 'redux-localstorage-simple';
import rootSaga from '../sagas';

const logger = createLogger();
export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

/*
- compose() is used to apply multiple store enhancers (e.g. middleware, time 
    travel, persistence). 
- applyMiddleware() is the only enhancer that ships with Redux.
- Redux-LocalStorage-Simple is used to save and load Redux state to and from LocalStorage.
*/
const store = createStore(
    createRootReducer(history),
    combineLoads(load({
        states: ['auth', 'user'],
        namespace: 'plafora'
    })),
    compose(applyMiddleware(
        routerMiddleware(history), 
        logger, 
        sagaMiddleware,
        save({
            states: ['auth', 'user'],
            namespace: 'plafora',
            debounce: 2000
        })
    ))
);

sagaMiddleware.run(rootSaga);

export default store;
