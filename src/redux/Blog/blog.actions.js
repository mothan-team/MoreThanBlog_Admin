import { GET_BLOGS, GET_BLOGS_SUCCESS, GET_BLOGS_FAIL } from "./blog.types";

export const getBlogs = (data) => {
  return {
    type: GET_BLOGS,
    payload: data,
  };
};

export const getBlogsSuccess = (data) => {
  return {
    type: GET_BLOGS_SUCCESS,
    payload: data,
  };
};

export const getBlogsFail = (err) => {
  return {
    type: GET_BLOGS_FAIL,
    payload: err,
  };
};
