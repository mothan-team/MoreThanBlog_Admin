import { useFocused, useSelected } from "slate-react";

export const ImageElement = props => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div
      {...props.attributes}
      style={{ border: selected && focused ? "#1890ff 4px solid" : undefined }}
    >
      <div contentEditable={false}>
        <img
          src={props.element.src}
          alt={props.element.alt}
          style={{ maxWidth: "100%" }}
          draggable={false}
        />
      </div>
      {props.children}
    </div>
  );
};
