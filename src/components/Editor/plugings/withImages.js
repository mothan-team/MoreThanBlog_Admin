import { IMAGE } from "../elements/types";

export const withImages = editor => {
  const { isVoid } = editor;

  editor.isVoid = element => {
    return element.type === IMAGE ? true : isVoid(element);
  };

  return editor;
};
