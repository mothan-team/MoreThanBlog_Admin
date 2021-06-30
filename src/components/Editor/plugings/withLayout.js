import { Transforms } from "slate";
import { PARAGRAPH } from "../elements/types";

/**
 * Reference: https://github.com/ianstormtaylor/slate/blob/main/site/examples/forced-layout.tsx
 */
export const withLayout = editor => {
  const { normalizeNode } = editor;
  editor.normalizeNode = entry => {
    const [, path] = entry;

    if (path.length === 0) {
      if (editor.children.length < 1) {
        const paragraph = { type: PARAGRAPH, children: [{ text: "" }] };
        Transforms.insertNodes(editor, paragraph, { at: path.concat(0), select: true });
        return;
      }
    }

    return normalizeNode(entry);
  };

  return editor;
};
