import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { post_api } from "./middleware/postapi";
import { get_api } from "./middleware/getapi";
import { put_api } from "./middleware/putapi";
import userReducer from "./reducers/userReducer";

const middleware = [thunk, post_api, get_api, put_api];

const reducers = combineReducers({
  user: userReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, enhancer);

export default store;
