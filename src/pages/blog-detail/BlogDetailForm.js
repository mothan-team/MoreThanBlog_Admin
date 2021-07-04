import { Button, Col, Form, Image, Input, Row, Upload } from "antd";
import { uploadImage } from "../../utils/request";

const BlogDetailForm = ({ blogData, setBlogData, onUpdateBlogInfo }) => {
  const [form] = Form.useForm();

  return (
    <Row gutter={16}>
      <Col span={16}>
        <Form
          form={form}
          onValuesChange={(changedValues, allValues) => {
            onUpdateBlogInfo(allValues);
          }}
          name="basic"
          initialValues={{ ...blogData }}
          labelCol={{ span: 4 }}
          colon={false}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="desc"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Col>
      <Col span={8}>
        <Image
          style={{ maxHeight: 400, objectFit: "cover" }}
          src={
            blogData.mainImage?.slug
              ? `https://api.morethanblog.tk${blogData.mainImage?.slug}`
              : blogData.mainImage?.preview
          }
        />
        <Upload
          showUploadList={false}
          beforeUpload={file => {
            uploadImage(file).then(({ data: mainImage }) => {
              const { id: mainImageId } = mainImage;
              onUpdateBlogInfo({ mainImageId, mainImage });
            });

            return false;
          }}
        >
          <Button>Upload</Button>
        </Upload>
      </Col>
    </Row>
  );
};

export { BlogDetailForm };
