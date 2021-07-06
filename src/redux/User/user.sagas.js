import { put, takeEvery, all, call, select } from "redux-saga/effects";
import { callAuthorizationApi } from "../../utils/request";
import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL
} from "./user.types";

function* getUsersAsync({ payload }) {
    try {
        const { page, size, terms } = payload;
        const url = `/user?Skip=${(page - 1) * size}&Take=${size}&Terms=${terms}`;
        const { data } = yield call(callAuthorizationApi, url, "GET");
        yield put({ type: GET_USERS_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: GET_USERS_FAIL, payload: error });
    }
}

function* getUserAsync({ payload: id }) {
    try {
        const url = `/user/${id}`;
        const { data } = yield call(callAuthorizationApi, url, "GET");
        yield put({ type: GET_USER_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: GET_USER_FAIL, payload: error });
    }
}

function* updateUserAsync({ payload }) {
    try {
        const { id, user } = payload;
        const url = `/user/${id}`;
        const state = yield select();
        yield call(callAuthorizationApi, url, "PUT", user);
        yield put({ type: GET_USERS, payload: { page: state?.user?.page || 1, size: state?.user?.size || 10, terms: '' } });
        yield put({ type: UPDATE_USER_SUCCESS });
    } catch (error) {
        yield put({ type: UPDATE_USER_FAIL, payload: error });
    }
}

function* deleteUserAsync({ payload: id }) {
    try {
        const url = `/user/${id}`;
        yield call(callAuthorizationApi, url, "DELETE");
        yield put({ type: DELETE_USER_SUCCESS, payload: id });
    } catch (error) {
        yield put({ type: DELETE_USER_FAIL, payload: error });
    }
}

function* addUserAsync({ payload }) {
    try {
        const { user } = payload;
        const url = `/user/create`;
        const state = yield select();
        yield call(callAuthorizationApi, url, "POST", user);
        yield put({ type: GET_USERS, payload: { page: state?.user?.page || 1, size: state?.user?.size || 10, terms: '' } });
        yield put({ type: CREATE_USER_SUCCESS });
    } catch (error) {
        yield put({ type: CREATE_USER_FAIL, payload: error });
    }
}

export default function* userSagas() {
    yield all([
        yield takeEvery(GET_USERS, getUsersAsync),
        yield takeEvery(GET_USER, getUserAsync),
        yield takeEvery(DELETE_USER, deleteUserAsync),
        yield takeEvery(UPDATE_USER, updateUserAsync),
        yield takeEvery(CREATE_USER, addUserAsync),
    ]);
}