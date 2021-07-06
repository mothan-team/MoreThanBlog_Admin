import { combineReducers } from "redux";
import authReducer from "./Auth/auth.reducer";
import blogReducer from "./Blog/blog.reducer";
import counterReducer from "./Counter/counter.reducer";
import categoryReducer from "./Category/category.reducer";
import editorReducer from "./Editor/editor.reducer";
import userReducer from "./User/user.reducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  blog: blogReducer,
  category: categoryReducer,
  editor: editorReducer,
  user: userReducer
});

export default rootReducer;
