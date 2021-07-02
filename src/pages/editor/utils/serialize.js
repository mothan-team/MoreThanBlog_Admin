import escapeHtml from "escape-html";
import { Text } from "slate";
import { H1, IMAGE, LINK, PARAGRAPH } from "../elements/types";

export const serialize = node => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    return string;
  }

  const children = node.children.map(n => serialize(n)).join("");

  switch (node.type) {
    case PARAGRAPH:
      return `<p>${children}</p>`;
    case H1:
      return `<h1>${children}</h1>`;
    case LINK:
      return `<a href="${escapeHtml(node.to)}">${children}</a>`;
    case IMAGE:
      return `<img src="${node.src}" alt="${node.alt}" />`;
    default:
      return children;
  }
};
