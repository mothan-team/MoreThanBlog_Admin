import escapeHtml from "escape-html";
import { Text } from "slate";
import { H1, IMAGE, LINK, PARAGRAPH } from "../elements/types";

export const serialize = node => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<i>${string}</i>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    return string;
  }

  const children = node.children.map(n => serialize(n)).join("");

  switch (node.type) {
    case PARAGRAPH:
      return `<p class='blog_paragraph'>${children}</p>`;
    case H1:
      return `<h1 class='blog_heading'>${children}</h1>`;
    case LINK:
      return `<a class='blog_link' href="${escapeHtml(node.href)}">${children}</a>`;
    case IMAGE:
      return `<img class='blog_image' src="${node.src}" alt="${node.alt}" />`;
    default:
      return children;
  }
};
