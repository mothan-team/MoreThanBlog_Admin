import {
  GET_BLOGS,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAIL,
  DELETE_BLOG,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
} from "./blog.types";

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

export const deleteBlog = (data) => {
  return {
    type: DELETE_BLOG,
    payload: data,
  };
};

export const deleteBlogSuccess = (data) => {
  return {
    type: DELETE_BLOG_SUCCESS,
    payload: data,
  };
};

export const deleteBlogFail = (err) => {
  return {
    type: DELETE_BLOG_FAIL,
    payload: err,
  };
};
