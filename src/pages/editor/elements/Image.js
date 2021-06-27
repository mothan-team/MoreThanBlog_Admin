import { useFocused, useSelected } from "slate-react";
import { Image } from "antd";

export const ImageElement = props => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div
      {...props.attributes}
      style={{ border: selected && focused ? "#1890ff 4px solid" : undefined }}
    >
      <div contentEditable={false}>
        <Image src={props.element.src} alt={props.element.alt} />
      </div>
      {props.children}
    </div>
  );
};
