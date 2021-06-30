import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSlateStatic } from "slate-react";
import { Button } from "antd";
import { FontSizeOutlined } from "@ant-design/icons";

import { uploadImage, deleteCurrentImage } from "../../../../redux/Editor/editor.actions";
import { toggleHeading, insertImage, serialize } from "../../utils";
import { deserialize } from "../../utils/deserialize";

export const Toolbar = ({ value }) => {
  const editor = useSlateStatic();
  const dispatch = useDispatch();
  const { currentImage } = useSelector(state => state.editor);

  const handleFileChosen = e => {
    const data = new FormData();
    data.append("File", e.target.files[0]);
    data.append("Folder", "cover");
    dispatch(uploadImage(data));
  };

  // Insert image to the editor
  useEffect(() => {
    if (currentImage) {
      insertImage(editor, `https://api.morethanblog.tk${currentImage.slug}`);
      dispatch(deleteCurrentImage());
    }
  }, [currentImage, dispatch, editor]);

  const handleExportHtml = () => {
    const html = serialize({ children: value });
    const document = new DOMParser().parseFromString(html, "text/html");
    const json = deserialize(document.body);
    console.log({ value, json });
  };

  return (
    <>
      <Button onClick={() => toggleHeading(editor)}>
        <FontSizeOutlined />
      </Button>

      <input type="file" accept="image/*" onChange={handleFileChosen} />

      <button onClick={() => handleExportHtml(editor.value)}>Export HTML</button>
    </>
  );
};
