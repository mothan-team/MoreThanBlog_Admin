import * as React from "react";
export * from "./Heading";
export * from "./Image";
export * from "./Link";

export const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>;
};
