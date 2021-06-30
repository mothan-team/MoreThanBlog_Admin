import * as React from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { renderElement, renderLeaf } from "./utils";
import { withImages } from "./plugings/withImages";
import { withLinks } from "./plugings/withLinks";
import { Toolbar } from "./components/Toolbar";
import { HoveringToolbar } from "./components/HoveringToolbar";
import { withKeyCommands } from "./plugings/withKeyCommands";
import intialValue from "./initialValue";
import { withLayout } from "./plugings/withLayout";
import { withHistory } from "slate-history";

const Editor = () => {
  const [value, setValue] = React.useState(intialValue);
  const renderElementMemo = React.useCallback(renderElement, []);

  const editor = React.useMemo(
    () =>
      withKeyCommands(withLayout(withLinks(withImages(withHistory(withReact(createEditor())))))),
    []
  );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        setValue(newValue);
      }}
    >
      <HoveringToolbar />
      <Toolbar value={value} />

      <Editable renderElement={renderElementMemo} renderLeaf={renderLeaf} />
    </Slate>
  );
};

export { Editor };
