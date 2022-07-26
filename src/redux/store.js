import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import user from "./module/user";

const rootReducer = combineReducers({
  user: user,
});

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);

let store = createStore(rootReducer, enhancer);

export default store;
