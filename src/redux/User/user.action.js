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

export const getUsers = (data) => {
    return {
        type: GET_USERS,
        payload: data,
    };
};

export const getUsersSuccess = (data) => {
    return {
        type: GET_USERS_SUCCESS,
        payload: data,
    };
};

export const getUsersFail = (err) => {
    return {
        type: GET_USERS_FAIL,
        payload: err,
    };
};

export const getUser = (data) => {
    return {
        type: GET_USER,
        payload: data,
    };
};

export const getUserSuccess = (data) => {
    return {
        type: GET_USER_SUCCESS,
        payload: data,
    };
};

export const getUserFail = (err) => {
    return {
        type: GET_USER_FAIL,
        payload: err,
    };
};

export const deleteUser = (data) => {
    return {
        type: DELETE_USER,
        payload: data,
    };
};

export const deleteUserSuccess = (data) => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: data,
    };
};

export const deleteUserFail = (err) => {
    return {
        type: DELETE_USER_FAIL,
        payload: err,
    };
};

export const updateUser = (data) => {
    return {
        type: UPDATE_USER,
        payload: data,
    };
};

export const updateUserSuccess = (data) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: data,
    };
};

export const updateUserFail = (err) => {
    return {
        type: UPDATE_USER_FAIL,
        payload: err,
    };
};

export const addUser = (data) => {
    return {
        type: CREATE_USER,
        payload: data,
    };
};

export const addUserSuccess = (data) => {
    return {
        type: CREATE_USER_SUCCESS,
        payload: data,
    };
};

export const addUserFail = (err) => {
    return {
        type: CREATE_USER_FAIL,
        payload: err,
    };
};
