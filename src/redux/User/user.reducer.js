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

const INITIAL_STATE = {
    users: [],
    page: 1,
    size: 10,
    terms: null,
    total: 0,
    loading: false,
    error: null,
    user: null
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                loading: true,
                page: payload.page,
                size: payload.size,
                terms: payload.terms
            };

        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: payload.items,
                total: payload.total,
                loading: false,
            };

        case GET_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.message,
            };

        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((x) => x.id !== payload),
                loading: true,
            };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.message,
            };
        case GET_USER:
            return {
                ...state,
                loading: true,
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                user: payload,
                loading: false,
            };

        case GET_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.message,
            };
        case UPDATE_USER:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case UPDATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.message,
            };
        case CREATE_USER:
            return {
                ...state,
                loading: true,
            };

        case CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case CREATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.message,
            };
        default:
            return state;
    }
};

export default userReducer;
