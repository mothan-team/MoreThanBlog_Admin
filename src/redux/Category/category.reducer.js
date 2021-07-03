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

const INITIAL_STATE = {
    categories: [],
    page: 1,
    size: 10,
    terms: null,
    total: 0,
    loading: false,
    error: null,
    category: null
};

const categoryReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_CATEGORIES:
            return {
                ...state,
                loading: true,
                page: payload.page,
                size: payload.size,
                terms: payload.terms
            };

        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload.items,
                total: payload.total,
                loading: false,
            };

        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.message,
            };

        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter((x) => x.id !== payload),
                loading: true,
            };

        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.message,
            };
        case GET_CATEGORY:
            return {
                ...state,
                loading: true,
            };

        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                category: payload,
                loading: false,
            };

        case GET_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.message,
            };
        case UPDATE_CATEGORY:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case UPDATE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.message,
            };
        default:
            return state;
    }
};

export default categoryReducer;
