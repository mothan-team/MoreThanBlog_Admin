import { all, call, put, takeEvery } from "redux-saga/effects";
import { callAuthorizationApi } from "../../utils/request";
import { uploadImageFail, uploadImageSuccess } from "./editor.actions";
import { UPLOAD_IMAGE } from "./editor.types";

function* uploadImageAsync({ payload }) {
  try {
    const url = `/files`;
    const { data } = yield call(callAuthorizationApi, url, "POST", payload, {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    });
    yield put(uploadImageSuccess(data));
  } catch (error) {
    yield put(uploadImageFail(error));
  }
}

export default function* editorSagas() {
  yield all([yield takeEvery(UPLOAD_IMAGE, uploadImageAsync)]);
}
