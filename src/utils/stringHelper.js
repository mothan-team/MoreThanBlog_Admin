export const cutTail = (text, length) =>
  (text || "").length <= length ? text : text.slice(0, length) + " ...";
