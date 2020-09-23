import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { post_api } from "./middleware/postapi";
import { request_api } from "./middleware/requestapi";
import { post_api_detail } from "./middleware/postapidetail";
import { delete_api } from "./middleware/deleteapi";
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";

const middleware = [thunk, post_api, request_api, post_api_detail, delete_api];

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
