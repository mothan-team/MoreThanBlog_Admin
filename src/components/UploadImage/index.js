import { Upload } from "antd";
import { uploadImage } from "../../utils/request";

export const UploadImage = ({ children, onReceiveData, ...antdUploadProps }) => {
  return (
    <Upload
      showUploadList={false}
      beforeUpload={file => {
        uploadImage(file).then(({ data }) => {
          onReceiveData(data);
        });
        return false;
      }}
      {...antdUploadProps}
    >
      {children}
    </Upload>
  );
};
