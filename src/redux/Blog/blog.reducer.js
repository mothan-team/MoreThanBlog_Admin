import {
  CREATE_BLOG,
  CREATE_BLOG_FAIL,
  CREATE_BLOG_SUCCESS,
  DELETE_BLOG,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_SUCCESS,
  GET_BLOGS,
  GET_BLOGS_FAIL,
  GET_BLOGS_SUCCESS,
} from "./blog.types";

const INITIAL_STATE = {
  blogs: [],
  currentBlogId: null,
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
        page: payload.page,
        size: payload.size,
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

    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter(x => x.id !== payload),
        loading: true,
      };

    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };

    case CREATE_BLOG:
      return {
        ...state,
        loading: true,
      };

    case CREATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        currentBlogId: payload,
      };

    case CREATE_BLOG_FAIL:
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
