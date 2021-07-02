import * as React from "react";
import * as ReactDOM from "react-dom";
import { useSlate, useSlateStatic } from "slate-react";
import { Button } from "antd";
import { BoldOutlined, ItalicOutlined, LinkOutlined, UnderlineOutlined } from "@ant-design/icons";
import { Transforms, Editor, Text } from "slate";
import styles from "./HoveringToolbar.module.css";
import { insertLink, isLinkActive, removeLink } from "../../utils";

export const Portal = ({ children }) => {
  return typeof document === "object" ? ReactDOM.createPortal(children, document.body) : null;
};

export const HoveringToolbar = () => {
  const editor = useSlate();
  const { selection } = editor;
  const ref = React.useRef(null);

  React.useEffect(() => {
    const toolTipElement = ref.current;
    const domSelection = window.getSelection();
    if (!selection || !domSelection || domSelection.type !== "Range") {
      toolTipElement.removeAttribute("style");
      return;
    }

    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    toolTipElement.style.opacity = "1";
    toolTipElement.style.top = `${rect.top + window.pageYOffset - toolTipElement.offsetHeight}px`;
    toolTipElement.style.left = `${
      rect.left + window.pageXOffset - toolTipElement.offsetWidth / 2 + rect.width / 2
    }px`;
  });
  return (
    <Portal>
      <div ref={ref} className={styles.toolTip} style={{}}>
        <FormatButton format="bold" icon={<BoldOutlined style={{ color: "white" }} />} />
        <FormatButton format="italic" icon={<ItalicOutlined style={{ color: "white" }} />} />
        <FormatButton format="underline" icon={<UnderlineOutlined style={{ color: "white" }} />} />
        <Button
          type={isLinkActive(editor) ? "primary" : "text"}
          onClick={() => {
            const isActive = isLinkActive(editor);
            if (isActive) {
              removeLink(editor);
            } else {
              const url = window.prompt("Enter the URL of the link: ");
              insertLink(editor, url);
            }
          }}
        >
          <LinkOutlined style={{ color: "white" }} />
        </Button>
      </div>
    </Portal>
  );
};

const FormatButton = ({ format, icon }) => {
  const editor = useSlateStatic();
  const isActive = isFormatActive(editor, format);
  return (
    <Button
      size="medium"
      type={isActive ? "primary" : "text"}
      icon={icon}
      onMouseDown={event => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
    />
  );
};

const toggleFormat = (editor, format) => {
  const [match] = Editor.nodes(editor, { match: node => node[format] === true, universal: true });
  const isActive = !!match;
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: n => Text.isText(n), split: true }
  );
};

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n[format] === true,
    mode: "all",
  });
  return !!match;
};
