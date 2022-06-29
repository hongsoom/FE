import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import user from "./module/user";
import post from "./module/post";
import comment from "./module/comment";

const rootReducer = combineReducers({
  user: user,
  post: post,
  comment: comment,
});

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);

let store = createStore(rootReducer, enhancer);

export default store;
