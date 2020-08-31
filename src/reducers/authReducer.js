import {combineReducers} from 'redux';
import {
    AUTH_FAILURE,
    AUTH_SUCCESS,
    SIGN_OUT
} from '../actions';

const tokenReducer = (state=null, action) => {
    switch(action.type) {
        case AUTH_SUCCESS: {
            const {token} = action.payload;
            return token;
        }
        case AUTH_FAILURE: {
            return null;
        }
        case SIGN_OUT: {
            return null
        }
        default:
            return state;
    }
};

const authReducer = combineReducers({
    token: tokenReducer
})

export default authReducer;