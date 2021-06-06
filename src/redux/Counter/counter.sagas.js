import { put, takeEvery, all } from "redux-saga/effects";
import { DECREMENT, DECREMENT_SUCCESS, INCREMENT, INCREMENT_SUCCESS } from "./counter.types";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: INCREMENT_SUCCESS });
}

function* decrementAsync() {
  yield delay(1000);
  yield put({ type: DECREMENT_SUCCESS });
}

export default function* counterSagas() {
  yield all([
    yield takeEvery(INCREMENT, incrementAsync),
    yield takeEvery(DECREMENT, decrementAsync),
  ]);
}
