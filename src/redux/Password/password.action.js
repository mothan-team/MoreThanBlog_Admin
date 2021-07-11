import {
    SET_PASS,
    SET_PASS_SUCCESS,
    SET_PASS_FAIL,
    UPDATE_STEP,
    GENERATE_OTP,
    GENERATE_OTP_SUCCESS,
    GENERATE_OTP_FAIL,
    VERIFY_OTP,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAIL,
    RESET_STATE
} from "./password.types";

export const setPass = (data) => {
    return {
        type: SET_PASS,
        payload: data,
    };
};
export const setPassSuccess = (data) => {
    return {
        type: SET_PASS_SUCCESS,
        payload: data,
    };
};
export const setPassFail = (err) => {
    return {
        type: SET_PASS_FAIL,
        payload: err,
    };
};
export const updateStep = (data) => {
    return {
        type: UPDATE_STEP,
        payload: data,
    };
};
export const generateOtp = (data) => {
    return {
        type: GENERATE_OTP,
        payload: data,
    };
};
export const generateOtpSuccess = (data) => {
    return {
        type: GENERATE_OTP_SUCCESS,
        payload: data,
    };
};
export const generateOtpFail = (err) => {
    return {
        type: GENERATE_OTP_FAIL,
        payload: err,
    };
};
export const verifyOtp = (data) => {
    return {
        type: VERIFY_OTP,
        payload: data,
    };
};
export const verifyOtpSuccess = (data) => {
    return {
        type: VERIFY_OTP_SUCCESS,
        payload: data,
    };
};
export const verifyOtpFail = (err) => {
    return {
        type: VERIFY_OTP_FAIL,
        payload: err,
    };
};
export const resetState = (data) => {
    return {
        type: RESET_STATE,
        payload: data,
    };
};