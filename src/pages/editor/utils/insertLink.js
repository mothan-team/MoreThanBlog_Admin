import { Editor, Element, Path, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { LINK, PARAGRAPH } from "../elements/types";

/**
 * Reference: https://dev.to/koralarts/slatejs-adding-images-and-links-2g93
 */
export const insertLink = (editor, href) => {
  if (!href) return;
  const { selection } = editor;
  const link = {
    type: LINK,
    children: [{ text: "Link element" }],
    href,
  };
  ReactEditor.focus(editor);

  if (!!selection) {
    const [parentNode, parentPath] = Editor.parent(editor, selection.focus.path);
    // Remove the Link node if we're inserting a new link inside another link.
    if (parentNode.type === LINK) {
      removeLink(editor);
    }

    // Insert new link after the void node.
    if (editor.isVoid(parentNode)) {
      Transforms.insertNodes(
        editor,
        {
          type: PARAGRAPH,
          children: [link],
        },
        { at: Path.next(parentPath), select: true }
      );
    }
    // Insert new link in last known location
    else if (selection.isCollapsed) {
      Transforms.insertNodes(editor, link, { select: true });
    }
    // Wrap the current selected range of text into a link.
    else {
      Transforms.wrapNodes(editor, link, { split: true });
      // Remove the highlight and move the cursor to the end of the hightlight.
      Transforms.collapse(editor, { edge: "end" });
    }
  } else {
    // If no selection, create a paragraph node with link inside it.
    Transforms.insertNodes(editor, {
      type: PARAGRAPH,
      children: [link],
    });
  }
};

export const removeLink = editor => {
  Transforms.unwrapNodes(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === LINK,
  });
};

export const isLinkActive = editor => {
  const { selection } = editor;
  if (!selection) return false;
  const [match] = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === LINK,
  });
  return !!match;
};
