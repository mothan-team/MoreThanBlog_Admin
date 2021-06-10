import { Button } from "antd";
import { useSlateStatic } from "slate-react";
import { toggleHeading, insertImage } from "../../utils";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  FileImageFilled,
  FontSizeOutlined,
} from "@ant-design/icons";

export const Toolbar = () => {
  const editor = useSlateStatic();
  return (
    <>
      <Button
        onClick={e => {
          e.preventDefault();
          const url = window.prompt("Enter the URL of the image: ");
          insertImage(editor, url);
        }}
      >
        <FileImageFilled />
      </Button>

      <Button onClick={() => toggleHeading(editor)}>
        <FontSizeOutlined />
      </Button>


      <Button>
        <AlignLeftOutlined />
      </Button>

      <Button>
        <AlignCenterOutlined />
      </Button>

      <Button>
        <AlignRightOutlined />
      </Button>
    </>
  );
};
