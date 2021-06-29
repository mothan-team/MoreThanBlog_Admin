import { DELETE_CURRENT_IMAGE, UPLOAD_IMAGE_FAIL, UPLOAD_IMAGE_SUCCESS } from "./editor.types";

const initialState = {
  currentImage: null,
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_SUCCESS:
      return { ...state, currentImage: action.payload };
    case UPLOAD_IMAGE_FAIL:
      return state;
    case DELETE_CURRENT_IMAGE:
      return { ...state, currentImage: null };
    default:
      return state;
  }
};

export default editorReducer;
