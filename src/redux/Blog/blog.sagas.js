import { put, takeEvery, all, call } from "redux-saga/effects";
import { callAuthorizationApi } from "../../utils/request";
import {
  CREATE_BLOG,
  CREATE_BLOG_FAIL,
  CREATE_BLOG_SUCCESS,
  DELETE_BLOG,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_SUCCESS,
  GET_BLOGS,
  GET_BLOGS_FAIL,
  GET_BLOGS_SUCCESS,
} from "./blog.types";

function* getBlogsAsync({ payload }) {
  try {
    const { page, size } = payload;
    const url = `/blogs?Skip=${(page - 1) * size}&Take=${size}`;
    const { data } = yield call(callAuthorizationApi, url, "GET");
    yield put({ type: GET_BLOGS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: GET_BLOGS_FAIL, payload: error });
  }
}

function* deleteBlogAsync({ payload: id }) {
  try {
    const url = `/blogs/${id}`;
    yield call(callAuthorizationApi, url, "DELETE");
    yield put({ type: DELETE_BLOG_SUCCESS, payload: id });
  } catch (error) {
    yield put({ type: DELETE_BLOG_FAIL, payload: error });
  }
}

function* createBlogAsync({ payload }) {
  try {
    const url = `/blogs`;
    const { data } = yield call(callAuthorizationApi, url, "POST", payload);
    yield put({ type: CREATE_BLOG_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: CREATE_BLOG_FAIL, payload: error });
  }
}

export default function* blogSagas() {
  yield all([
    yield takeEvery(GET_BLOGS, getBlogsAsync),
    yield takeEvery(DELETE_BLOG, deleteBlogAsync),
    yield takeEvery(CREATE_BLOG, createBlogAsync),
  ]);
}
