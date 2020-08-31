import {combineReducers} from 'redux';

const eventFromReducer = (state=null, action) => {
    switch(action.type) {
        case "SAVE_EVENT_REQUEST": {
            const {values} = action.payload;
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