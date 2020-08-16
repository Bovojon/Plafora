const userReducer = (state={}, action) => {
    switch(action.type) {
        case 'FETCH_USER_SUCCESS':
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export default userReducer;