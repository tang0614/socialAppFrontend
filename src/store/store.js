import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { post_api } from "./middleware/postapi";
import { post_detail_api } from "./middleware/postDetailApi";
import { get_api } from "./middleware/getapi";
import { put_api } from "./middleware/putapi";

import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";

const middleware = [thunk, post_api, get_api, put_api, post_detail_api];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
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
