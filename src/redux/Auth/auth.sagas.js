import { put, takeEvery, all, call } from "redux-saga/effects";
import { callApi } from "../../utils/request";
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "./auth.types";

function* loginAsync({ payload }) {
  try {
    const { data } = yield call(callApi, "/user/login", "POST", payload);
    console.log(data);
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("userId", data.userId);
    yield put({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: LOGIN_FAIL });
  }
}

export default function* loginSagas() {
  yield all([yield takeEvery(LOGIN, loginAsync)]);
}
