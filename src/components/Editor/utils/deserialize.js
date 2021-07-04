import { jsx } from "slate-hyperscript";
import { H1, IMAGE, LINK, PARAGRAPH } from "../elements/types";

export const deserialize = element => {
  if (!element)
    return [
      {
        type: PARAGRAPH,
        children: [{ text: "" }],
      },
    ];

  if (element.nodeType === 3) {
    return element.textContent;
  } else if (element.nodeType !== 1) {
    return null;
  }

  let children = Array.from(element.childNodes).map(deserialize);

  if (children.length === 0) {
    children = [{ text: "" }];
  }

  switch (element.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "H1":
      return jsx("element", { type: H1 }, children);
    case "IMG":
      return jsx(
        "element",
        { type: IMAGE, src: element.getAttribute("src"), alt: element.getAttribute("alt") },
        children
      );
    case "P":
      return jsx("element", { type: PARAGRAPH }, children);
    case "A":
      return jsx("element", { type: LINK, href: element.getAttribute("href") }, children);
    case "STRONG":
      return deserializeInlineElement("bold");
    case "I":
      return deserializeInlineElement("italic");
    case "U":
      return deserializeInlineElement("underline");
    default:
      return element.textContent;
  }

  /**
   * Slate deserializes from bottom to top.
   * Inline element should have one children - text or another inline element.
   * If first child is text => get the text
   * If first child is another inline element => merge the child with the attribute
   * @param {*} attribute e.g bold, italic, underline
   * @returns slate element.
   */
  function deserializeInlineElement(attribute) {
    if (!Array.isArray(children) || children.length !== 1)
      throw new Error("Why are you get error here???");
    const child = children[0];
    const isChildText = typeof child === "string";
    const result = { [attribute]: true, text: element.textContent };
    return isChildText ? result : { ...result, ...child };
  }
};
