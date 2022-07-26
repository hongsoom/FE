import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import post from "./module/post";
import user from "./module/user";
import comment from "./module/comment";

const rootReducer = combineReducers({
  user,
  post,
  comment,
});

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);

let store = createStore(rootReducer, enhancer);

export default store;
