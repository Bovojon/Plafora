const spaceReducer = (state=[], action) => {
    switch(action.type) {
        case "SPACES_SUCCESS":
            return Object.values(action.payload.spaces)
        default:
            return state;
    }
}

export default spaceReducer;