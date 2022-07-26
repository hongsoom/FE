import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import comment from "./module/comment";

const rootReducer = combineReducers({
  comment,
});

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);

let store = createStore(rootReducer, enhancer);

export default store;
