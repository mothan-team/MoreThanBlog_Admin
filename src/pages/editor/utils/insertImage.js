import { IMAGE } from "../elements/types";
import { Editor, Node, Path, Transforms } from "slate";
import { ReactEditor } from "slate-react";

/**
 * Reference: https://dev.to/koralarts/slatejs-adding-images-and-links-2g93
 */
export const insertImage = (editor, src) => {
  if (!src) return;
  const text = { text: "" };
  const image = { type: IMAGE, src, children: [text] };
  const { selection } = editor;
  ReactEditor.focus(editor);
  if (!!selection) {
    const [parentNode, parentPath] = Editor.parent(editor, selection.focus?.path);
    // If the Editor is focused on an empty Node or void Node (eg. image node), we'll replace the empty Node node with the image.
    if (editor.isVoid(parentNode) || !Node.string(parentNode).length) {
      Transforms.removeNodes(editor, { at: parentPath });
      Transforms.insertNodes(editor, image, { at: parentPath, select: true });
    } else {
      // If the Editor is focused on a non-empty Node, we'll add the image after the Node.
      Transforms.insertNodes(editor, image, {
        at: Path.next(parentPath),
        select: true,
      });
    }
  } else {
    // If the Editor isn't focused, we'll add the image at the end of the Editor.
    Transforms.insertNodes(editor, image, { select: true });
  }
};
