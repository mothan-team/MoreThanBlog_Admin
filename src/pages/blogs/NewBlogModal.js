import { Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { UploadImage } from "../../components/UploadImage";

export const NewBlogModal = ({ visible, onCancel, onSubmit }) => {
  const [preview, setPreview] = useState({ image: null, visible: false, title: null });
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreview({
      image: file.url || file.preview,
      visible: true,
      title: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        onOk={() => {
          form.setFieldsValue({ mainImageId: image?.id || undefined });
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onSubmit(values);
            })
            .catch(info => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title of blog!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="desc"
            label="Description"
            rules={[{ required: true, message: "Please input the description of blog!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="mainImageId"
            label="Main image"
            valuePropName={null}
            rules={[{ required: true, message: "Please upload!" }]}
          >
            <UploadImage
              onReceiveData={data => {
                setImage(data);
              }}
              listType="picture-card"
              showUploadList
              maxCount={1}
              onPreview={handlePreview}
              onRemove={() => {
                setImage(null);
              }}
            >
              Upload
            </UploadImage>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={preview.visible}
        title={preview.title}
        footer={null}
        onCancel={() => {
          setPreview({ image: null, visible: false, title: null });
        }}
      >
        <img alt="example" style={{ width: "100%" }} src={preview.image} />
      </Modal>
    </>
  );
};
