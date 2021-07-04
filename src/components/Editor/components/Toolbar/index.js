import { useSlate } from "slate-react";
import { Button, Space, Upload, Affix } from "antd";
import { FontSizeOutlined, CloudUploadOutlined } from "@ant-design/icons";

import { toggleHeading, insertImage, isHeadingActive } from "../../utils";
import { uploadImage } from "../../../../utils/request";

export const Toolbar = () => {
  const editor = useSlate();

  return (
    <Affix>
      <Space
        size="small"
        style={{
          padding: "20px 0",
          marginBottom: 20,
          backgroundColor: "white",
          width: "100%",
          borderBottom: "1px solid #d9d9d9",
        }}
      >
        <Button
          type={isHeadingActive(editor) ? "primary" : "ghost"}
          icon={<FontSizeOutlined />}
          onClick={() => toggleHeading(editor)}
        ></Button>

        <Upload
          showUploadList={false}
          beforeUpload={file => {
            uploadImage(file).then(({ data }) => {
              const src = `https://api.morethanblog.tk${data.slug}`;
              insertImage(editor, src);
            });
            return false;
          }}
        >
          <Button icon={<CloudUploadOutlined />} />
        </Upload>
      </Space>
    </Affix>
  );
};
