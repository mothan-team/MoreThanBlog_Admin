import { combineReducers } from "redux";
import authReducer from "./Auth/auth.reducer";
import blogReducer from "./Blog/blog.reducer";
import counterReducer from "./Counter/counter.reducer";
import categoryReducer from "./Category/category.reducer";
import userReducer from "./User/user.reducer";
import passwordReducer from "./Password/password.reducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  blog: blogReducer,
  category: categoryReducer,
  user: userReducer,
  password: passwordReducer
});

export default rootReducer;
