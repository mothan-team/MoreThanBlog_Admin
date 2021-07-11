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

const INITIAL_STATE = {
    loading: false,
    error: null,
    isSuccess: false,
    step: 1
};

const passwordReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SET_PASS:
            return {
                ...state,
                loading: true,
            };

        case SET_PASS_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                loading: false,
            };

        case SET_PASS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.message,
            };

        case UPDATE_STEP:
            return {
                ...state,
                step: payload,
                loading: false,
            };

        case GENERATE_OTP:
            return {
                ...state,
                loading: true,
            };

        case GENERATE_OTP_SUCCESS:
            return {
                ...state,
                step: 2,
                loading: false,
            };

        case GENERATE_OTP_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.message,
            };

        case VERIFY_OTP:
            return {
                ...state,
                loading: true,
            };

        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                step: 3,
                loading: false,
            };

        case VERIFY_OTP_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.message,
            };

        case RESET_STATE:
            return {
                ...state,
                loading: false,
                error: null,
                isSuccess: false,
                step: 1
            };

        default:
            return state;
    }
};

export default passwordReducer;
