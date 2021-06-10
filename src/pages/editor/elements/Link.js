import * as React from "react";

import { useFocused, useSelected } from "slate-react";
import { Popover } from "antd";
import { SelectOutlined } from "@ant-design/icons";

export const LinkElement = props => {
  const selected = useSelected();
  const focused = useFocused();
  const [visible, setVisible] = React.useState(selected && focused);

  const handleVisibleChange = visible => {
    setVisible(visible);
  };

  return (
    <Popover
      visible={visible}
      placement="bottom"
      onVisibleChange={handleVisibleChange}
      content={
        <a href={props.element.href} rel="noreferrer" target="_blank">
          <SelectOutlined /> {props.element.href}
        </a>
      }
    >
      <a {...props.attributes} href={props.element.href} rel="noreferrer" target="_blank">
        {props.children}
      </a>
    </Popover>
  );
};
