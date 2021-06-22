import { combineReducers } from "redux";
import authReducer from "./Auth/auth.reducer";
import blogReducer from "./Blog/blog.reducer";
import counterReducer from "./Counter/counter.reducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  blog: blogReducer,
});

export default rootReducer;
