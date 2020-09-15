# Plafora

Built with React, Redux, Redux-Saga.

## Redux
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
* `connected-react-router` provides Redux bindings for React Router synchronizes router state with redux store through uni-directional flow (history -> store -> router -> components).

### Redux-LocalStorage-Simple 
* Used to save and load Redux state to and from LocalStorage.

### React-Router
* Dynamic pieces of the URL passed to a component can be accessed via `match.params`. Instead, use `useParams` hook.

### Connected-React-Router
* Used to synchronize router state with redux store.
* To navigate with Redux action, use `store.dispatch(push('/path/to/somewhere'))` or `yield put(push('/home))` in a saga.

## JavaScript 
* `Boolean()` converts value passes as param to a bool. Returns `false` if the value is omitted, `0, -0, null, false, NaN, undefined`, or the empty string ("").
* `Object.values(obj)` returns an array of the obj's values.
* `typeof operand` returns a string indicating the type of the unevaluated operand.
* `lodash` library makes it easier to work with arrays, numbers, objects, strings, etc.
* `array.forEach(callbackFunction())`

## Refactoring:
- Convert class components to functions using Hooks.
- Put all action types in actions/constants.js
- Replace `className` with styled components.