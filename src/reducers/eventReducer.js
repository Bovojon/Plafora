import {combineReducers} from 'redux';

const eventFromReducer = (state=null, {type, payload}) => {
    switch(type) {
        case "SAVE_EVENT_REQUEST": {
            const {values} = payload;
            return values;
        }
        case "EVENT_REQUEST": {
            return null;
        }
        default:
            return state;
    }
};

const eventReducer = combineReducers({
    eventForm: eventFromReducer
})

export default eventReducer;