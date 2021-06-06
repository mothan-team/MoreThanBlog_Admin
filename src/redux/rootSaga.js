import { all } from "redux-saga/effects";
import counterSagas from "./Counter/counter.sagas";

export default function* rootSaga() {
  yield all([
    counterSagas(),
    // anotherSagas(),
  ]);
}
