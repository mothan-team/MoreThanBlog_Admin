import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "./auth.types";

const INITIAL_STATE = {
  userId: null,
  token: null,
  loading: false,
  error: null,
};

const authReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        userId: payload.userId,
        token: payload.accessToken,
        loading: false,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload.message,
      };

    default:
      return state;
  }
};

export default authReducer;
