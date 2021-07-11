import * as React from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { renderElement, renderLeaf, serialize } from "./utils";
import { withImages } from "./plugings/withImages";
import { withLinks } from "./plugings/withLinks";
import { Toolbar } from "./components/Toolbar";
import { HoveringToolbar } from "./components/HoveringToolbar";
import { withKeyCommands } from "./plugings/withKeyCommands";
import { withLayout } from "./plugings/withLayout";
import { withHistory } from "slate-history";
import { deserialize } from "./utils/deserialize";
import equal from "fast-deep-equal";

const Editor = ({ value, onUpdateBlogContent }) => {
  const document = new DOMParser().parseFromString(value ?? "", "text/html");
  const editorValue = deserialize(document.body);
  const renderElementMemo = React.useCallback(renderElement, []);

  const editor = React.useMemo(
    () =>
      withKeyCommands(withLayout(withLinks(withImages(withHistory(withReact(createEditor())))))),
    []
  );

  return (
    <Slate
      editor={editor}
      value={editorValue}
      onChange={newValue => {
        // Prevent calling callback when unnecessary
        if (equal(newValue, editorValue)) return;
        const html = serialize({ children: newValue });
        onUpdateBlogContent(html);
      }}
    >
      <HoveringToolbar />
      <Toolbar />
      <Editable renderElement={renderElementMemo} renderLeaf={renderLeaf} />
    </Slate>
  );
};

export { Editor };
