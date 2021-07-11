import { all } from "redux-saga/effects";
import loginSagas from "./Auth/auth.sagas";
import blogSagas from "./Blog/blog.sagas";
import counterSagas from "./Counter/counter.sagas";
import categorySagas from "./Category/category.sagas";
import editorSagas from "./Editor/editor.sagas";
import userSagas from "./User/user.sagas";
import passwordSagas from "./Password/password.sagas";

export default function* rootSaga() {
  yield all([
    counterSagas(),
    loginSagas(),
    blogSagas(),
    categorySagas(),
    editorSagas(),
    userSagas(),
    passwordSagas(),
    // anotherSagas(),
  ]);
}
