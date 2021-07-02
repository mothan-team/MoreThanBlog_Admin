import * as React from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { renderElement, renderLeaf, serialize } from "./utils";
import { withImages } from "./plugings/withImages";
import { withLinks } from "./plugings/withLinks";
import initialValue from "./initialValue";
import { Toolbar } from "./components/Toolbar";
import { HoveringToolbar } from "./components/HoveringToolbar";
import { withKeyCommands } from "./plugings/withKeyCommands";

const Editor = () => {
  const editor = React.useMemo(
    () => withReact(withKeyCommands(withLinks(withImages(createEditor())))),
    []
  );
  const [value, setValue] = React.useState(initialValue);
  const renderElementMemo = React.useCallback(renderElement, []);

  const handleExportHtml = () => {
    const html = serialize({ children: value });
    console.log(html);
  };

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        setValue(newValue);
      }}
    >
      <HoveringToolbar />
      <Toolbar />
      <button onClick={handleExportHtml}>Export HTML</button>
      <Editable renderElement={renderElementMemo} renderLeaf={renderLeaf} />
    </Slate>
  );
};

export default Editor;
