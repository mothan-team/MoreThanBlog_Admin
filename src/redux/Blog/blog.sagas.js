import { put, takeEvery, all, call } from "redux-saga/effects";
import { callAuthorizationApi } from "../../utils/request";
import { GET_BLOGS, GET_BLOGS_FAIL, GET_BLOGS_SUCCESS } from "./blog.types";

function* getBlogsAsync({ payload }) {
  try {
    const { page, size } = payload;
    const { data } = yield call(callAuthorizationApi, "/blogs", "GET", {
      Skip: (page - 1) * size,
      Take: size,
    });
    yield put({ type: GET_BLOGS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: GET_BLOGS_FAIL, payload: error });
  }
}

export default function* blogSagas() {
  yield all([yield takeEvery(GET_BLOGS, getBlogsAsync)]);
}
