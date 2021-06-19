import { combineReducers } from "redux";
import authReducer from "./Auth/auth.reducer";
import counterReducer from "./Counter/counter.reducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
});

export default rootReducer;
