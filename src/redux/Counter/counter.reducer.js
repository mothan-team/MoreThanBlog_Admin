import {
  DECREMENT,
  DECREMENT_FAIL,
  DECREMENT_SUCCESS,
  INCREMENT,
  INCREMENT_FAIL,
  INCREMENT_SUCCESS,
} from "./counter.types";

const INITIAL_STATE = {
  count: 0,
  loading: false,
};

const counterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        loading: true,
      };

    case INCREMENT_SUCCESS:
      return {
        ...state,
        count: state.count + 1,
        loading: false,
      };

    case INCREMENT_FAIL:
      return {
        ...state,
        loading: false,
      };

    case DECREMENT:
      return {
        ...state,
        loading: true,
      };

    case DECREMENT_SUCCESS:
      return {
        ...state,
        count: state.count - 1,
        loading: false,
      };

    case DECREMENT_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default counterReducer;
