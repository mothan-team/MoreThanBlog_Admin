import { LINK } from "../elements/types";

export const withLinks = editor => {
  const { isInline } = editor;

  editor.isInline = element => (element.type === LINK ? true : isInline(element));

  return editor;
};
