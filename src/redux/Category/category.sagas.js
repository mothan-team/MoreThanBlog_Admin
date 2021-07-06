import { put, takeEvery, all, call, select } from "redux-saga/effects";
import { callAuthorizationApi } from "../../utils/request";
import {
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORY,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    DELETE_CATEGORY,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    CREATE_CATEGORY,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL
} from "./category.types";

function* getCategoriesAsync({ payload }) {
    try {
        const { page, size, terms } = payload;
        const url = `/categories?Skip=${(page - 1) * size}&Take=${size}&Terms=${terms}`;
        const { data } = yield call(callAuthorizationApi, url, "GET");
        yield put({ type: GET_CATEGORIES_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: GET_CATEGORIES_FAIL, payload: error });
    }
}

function* getCategoryAsync({ payload: id }) {
    try {
        const url = `/categories/${id}`;
        const { data } = yield call(callAuthorizationApi, url, "GET");
        yield put({ type: GET_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: GET_CATEGORY_FAIL, payload: error });
    }
}

function* updateCategoryAsync({ payload }) {
    try {
        const { id, category } = payload;
        const url = `/categories/${id}`;
        const state = yield select();
        yield call(callAuthorizationApi, url, "PUT", category);
        yield put({ type: GET_CATEGORIES, payload: { page: state?.category?.page || 1, size: state?.category?.size || 10, terms: '' } });
        yield put({ type: UPDATE_CATEGORY_SUCCESS });
    } catch (error) {
        yield put({ type: UPDATE_CATEGORY_FAIL, payload: error });
    }
}

function* deleteCategoryAsync({ payload: id }) {
    try {
        const url = `/categories/${id}`;
        yield call(callAuthorizationApi, url, "DELETE");
        yield put({ type: DELETE_CATEGORY_SUCCESS, payload: id });
    } catch (error) {
        yield put({ type: DELETE_CATEGORY_FAIL, payload: error });
    }
}

function* addCategoryAsync({ payload }) {
    try {
        const { category } = payload;
        const url = `/categories`;
        const state = yield select();
        yield call(callAuthorizationApi, url, "POST", category);
        yield put({ type: GET_CATEGORIES, payload: { page: state?.category?.page || 1, size: state?.category?.size || 10, terms: '' } });
        yield put({ type: CREATE_CATEGORY_SUCCESS });
    } catch (error) {
        yield put({ type: CREATE_CATEGORY_FAIL, payload: error });
    }
}

export default function* categorySagas() {
    yield all([
        yield takeEvery(GET_CATEGORIES, getCategoriesAsync),
        yield takeEvery(GET_CATEGORY, getCategoryAsync),
        yield takeEvery(DELETE_CATEGORY, deleteCategoryAsync),
        yield takeEvery(UPDATE_CATEGORY, updateCategoryAsync),
        yield takeEvery(CREATE_CATEGORY, addCategoryAsync),
    ]);
}
