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
    UPDATE_CATEGORY_FAIL
} from "./category.types";

export const getCategories = (data) => {
    return {
        type: GET_CATEGORIES,
        payload: data,
    };
};

export const getCategoriesSuccess = (data) => {
    return {
        type: GET_CATEGORIES_SUCCESS,
        payload: data,
    };
};

export const getCategoriesFail = (err) => {
    return {
        type: GET_CATEGORIES_FAIL,
        payload: err,
    };
};

export const getCategory = (data) => {
    return {
        type: GET_CATEGORY,
        payload: data,
    };
};

export const getCategorySuccess = (data) => {
    return {
        type: GET_CATEGORY_SUCCESS,
        payload: data,
    };
};

export const getCategoryFail = (err) => {
    return {
        type: GET_CATEGORY_FAIL,
        payload: err,
    };
};

export const deleteCategory = (data) => {
    return {
        type: DELETE_CATEGORY,
        payload: data,
    };
};

export const deleteCategorySuccess = (data) => {
    return {
        type: DELETE_CATEGORY_SUCCESS,
        payload: data,
    };
};

export const deleteCategoryFail = (err) => {
    return {
        type: DELETE_CATEGORY_FAIL,
        payload: err,
    };
};

export const updateCategory = (data) => {
    return {
        type: UPDATE_CATEGORY,
        payload: data,
    };
};

export const updateCategorySuccess = (data) => {
    return {
        type: UPDATE_CATEGORY_SUCCESS,
        payload: data,
    };
};

export const updateCategoryFail = (err) => {
    return {
        type: UPDATE_CATEGORY_FAIL,
        payload: err,
    };
};
