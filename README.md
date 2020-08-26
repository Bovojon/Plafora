# Plafora

Built with React, Redux, Redux-Saga.

### Redux App Data Flow
* Redux store runs the root reducer function and saves returned value as initial state.
* UI components subscribe to store.
* When an Event occurs, the Event Handler dispatches an action to the store.
* The store runs the root reducer function with the state and current action, and saves the returned value as new state.
* The store notifies components that are subscribed to it that the state has changed.
* Each component checks if the parts of the state that they need have changed, and re-renders with new data.

### JavaScript 
* Use `Boolean()` to convert values.