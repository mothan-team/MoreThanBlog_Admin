import { Editor, Transforms } from "slate";
import { H1, PARAGRAPH } from "../elements/types";

export const toggleHeading = editor => {
  const [match] = Editor.nodes(editor, { match: node => node.type === H1 });
  const isHeadingActive = !!match;
  Transforms.setNodes(
    editor,
    { type: isHeadingActive ? PARAGRAPH : H1 },
    { match: node => Editor.isBlock(editor, node) }
  );
};

export const isHeadingActive = editor => {
  const [match] = Editor.nodes(editor, { match: node => node.type === H1 });
  return !!match;
};
