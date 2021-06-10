import { IMAGE } from "../elements/types";
import { Transforms } from "slate";

export const insertImage = (editor, url) => {
  if (!url) return;
  const text = { text: "" };
  const image = { type: IMAGE, url, children: [text] };
  Transforms.insertNodes(editor, image);
};
