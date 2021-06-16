import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "./auth.types";

export const login = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};
export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};
export const loginFail = (err) => {
  return {
    type: LOGIN_FAIL,
    payload: err,
  };
};
