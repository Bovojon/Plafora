import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {reducer as toastrReducer} from 'react-redux-toastr';

import authReducer from './authReducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    toastr: toastrReducer
});