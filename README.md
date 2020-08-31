# Plafora

Built with React, Redux, Redux-Saga.

### Redux App Data Flow
1. Redux store runs the root reducer function and saves the returned value as the initial state.
2. UI components subscribe to store.
3. When an Event occurs, the Event Handler dispatches an action to the store.
4. The store runs the root reducer function with the state and current action, and saves the returned value as new state.
5. The store notifies components that are subscribed to it that the state has changed.
6. Each component checks if the parts of the state that it needs have changed and accordingly re-renders with the new data.

### Redux enhancers
* `compose()` is used to apply multiple store enhancers (e.g. middleware, time 
    travel, persistence). 
* `applyMiddleware()` is the only enhancer that ships with Redux.

### Redux-LocalStorage-Simple 
* Used to save and load Redux state to and from LocalStorage.

### JavaScript 
* Use `Boolean()` to convert values.
