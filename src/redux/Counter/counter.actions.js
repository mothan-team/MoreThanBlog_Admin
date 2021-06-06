import {
  INCREMENT,
  DECREMENT,
  INCREMENT_SUCCESS,
  INCREMENT_FAIL,
  DECREMENT_SUCCESS,
  DECREMENT_FAIL,
} from "./counter.types";

export const increaseCounter = () => {
  return {
    type: INCREMENT,
  };
};
export const increaseCounterSuccess = () => {
  return {
    type: INCREMENT_SUCCESS,
  };
};
export const increaseCounterFail = () => {
  return {
    type: INCREMENT_FAIL,
  };
};

export const decreaseCounter = () => {
  return {
    type: DECREMENT,
  };
};

export const decreaseCounterSuccess = () => {
  return {
    type: DECREMENT_SUCCESS,
  };
};

export const decreaseCounterFail = () => {
  return {
    type: DECREMENT_FAIL,
  };
};
