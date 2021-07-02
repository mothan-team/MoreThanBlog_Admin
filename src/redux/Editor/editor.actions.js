import {
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_SUCCESS,
  DELETE_CURRENT_IMAGE,
} from "./editor.types";

export const uploadImage = data => ({
  type: UPLOAD_IMAGE,
  payload: data,
});

export const uploadImageSuccess = data => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: data,
});

export const uploadImageFail = error => ({
  type: UPLOAD_IMAGE_FAIL,
  payload: error,
});

export const deleteCurrentImage = () => ({ type: DELETE_CURRENT_IMAGE });
