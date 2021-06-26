import { put, takeEvery, all, call } from "redux-saga/effects";
import { callApi } from "../../utils/request";
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "./auth.types";

function* loginAsync({ payload }) {
  try {
    const { request, history } = payload;
    const { data } = yield call(callApi, "/user/login", "POST", request);
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("userId", data.userId);
    yield put({ type: LOGIN_SUCCESS, payload: data });
    history.push("/admin");
  } catch (error) {
    yield put({ type: LOGIN_FAIL, payload: error });
  }
}

export default function* loginSagas() {
  yield all([yield takeEvery(LOGIN, loginAsync)]);
}
