import { all } from "redux-saga/effects";
import loginSagas from "./Auth/auth.sagas";
import counterSagas from "./Counter/counter.sagas";

export default function* rootSaga() {
  yield all([
    counterSagas(),
    loginSagas(),
    // anotherSagas(),
  ]);
}
