import { put, takeEvery, all, call } from "redux-saga/effects";
import { callApi } from "../../utils/request";
import {
    SET_PASS,
    SET_PASS_SUCCESS,
    SET_PASS_FAIL,
    GENERATE_OTP,
    GENERATE_OTP_SUCCESS,
    GENERATE_OTP_FAIL,
    VERIFY_OTP,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAIL
} from "./password.types";

function* setpassAsync({ payload }) {
    try {
        const { request } = payload;
        yield call(callApi, "/user/reset-password", "POST", request);
        yield put({ type: SET_PASS_SUCCESS });
    } catch (error) {
        yield put({ type: SET_PASS_FAIL, payload: error });
    }
}

function* generatePassAsync({ payload }) {
    try {
        const { request } = payload;
        yield call(callApi, "/user/otp/generate", "POST", request);
        yield put({ type: GENERATE_OTP_SUCCESS });
    } catch (error) {
        yield put({ type: GENERATE_OTP_FAIL, payload: error });
    }
}

function* verifyPassAsync({ payload }) {
    try {
        const { request } = payload;
        yield call(callApi, "/user/otp/verify", "POST", request);
        yield put({ type: VERIFY_OTP_SUCCESS });
    } catch (error) {
        yield put({ type: VERIFY_OTP_FAIL, payload: error });
    }
}

export default function* passwordSagas() {
    yield all([yield takeEvery(SET_PASS, setpassAsync)]);
    yield all([yield takeEvery(GENERATE_OTP, generatePassAsync)]);
    yield all([yield takeEvery(VERIFY_OTP, verifyPassAsync)]);
}
