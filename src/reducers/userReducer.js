import {SIGN_OUT} from '../actions';

const userReducer = (state={}, action) => {
    switch(action.type) {
        case "SET_USER":
            return {...state, ...action.payload.user}
        case "UPDATE_USER_SUCCESS":
            return {
                ...state,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name
            }
        case SIGN_OUT:
            return null;
        default:
            return state;
    }
}

export default userReducer;