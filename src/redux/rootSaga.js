import { all } from "redux-saga/effects";
import loginSagas from "./Auth/auth.sagas";
import blogSagas from "./Blog/blog.sagas";
import counterSagas from "./Counter/counter.sagas";
import categorySagas from "./Category/category.sagas";

export default function* rootSaga() {
  yield all([
    counterSagas(),
    loginSagas(),
    blogSagas(),
    categorySagas()
    // anotherSagas(),
  ]);
}
