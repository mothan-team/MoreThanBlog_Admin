import { DefaultElement, HeadingElement, ImageElement, LinkElement } from "../elements";
import { IMAGE, H1, LINK } from "../elements/types";

export const renderElement = props => {
  switch (props.element.type) {
    case H1:
      return <HeadingElement {...props} />;
    case LINK:
      return <LinkElement {...props} />;
    case IMAGE:
      return <ImageElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};
