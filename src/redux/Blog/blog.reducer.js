import { GET_BLOGS, GET_BLOGS_FAIL, GET_BLOGS_SUCCESS } from "./blog.types";

const INITIAL_STATE = {
  blogs: [],
  page: 1,
  size: 10,
  total: 0,
  loading: false,
  error: null,
};

const blogReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_BLOGS:
      return {
        ...state,
        loading: true,
      };

    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: payload.items,
        total: payload.total,
        loading: false,
      };

    case GET_BLOGS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };

    default:
      return state;
  }
};

export default blogReducer;
