import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {reducer as toastrReducer} from 'react-redux-toastr';

import userReducer from './userReducer';
import authReducer from './authReducer';
import spaceReducer from './spaceReducer';
import eventReducer from './eventReducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    toastr: toastrReducer,
    auth: authReducer,
    user: userReducer,
    spaces: spaceReducer,
    events: eventReducer
});
