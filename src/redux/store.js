import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import post from "./module/post";

const rootReducer = combineReducers({
  post,
});

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);

let store = createStore(rootReducer, enhancer);

export default store;
