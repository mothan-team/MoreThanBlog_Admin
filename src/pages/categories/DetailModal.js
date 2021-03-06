import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Switch } from 'antd';
import { getTimeFormat } from '../../utils/dateTimeHelper';
import { useSelector } from "react-redux";

const DetailModal = (props) => {
    const { category } = useSelector((state) => state.category);
    const [categoryDetail, setCategoryDetail] = useState(null);

    useEffect(() => {
        setCategoryDetail(category);
    }, [category]);

    useEffect(() => {
        if (props.type === "Add") {
            setCategoryDetail(null);
        }
    }, [props.type]);

    const handleOk = () => {
        props.handleOk(categoryDetail.id, categoryDetail);
    };

    const handleCancel = () => {
        props.handleCancel();
    };

    return (
        <Modal
            title={props.type === "View" ? "View Category" : props.type === "Add" ? "Add Category" : "Edit Category"}
            visible={props.isModalVisible}
            onCancel={handleCancel}
            footer={props.type === "View"
                ? null
                : [
                    <Button onClick={handleCancel}>Cancel</Button>,
                    <Button onClick={handleOk}>Ok</Button>
                ]}>
            <Form
                labelCol={{
                    span: props.type === "View" ? 6 : 4,
                }}
                wrapperCol={{
                    span: props.type === "View" ? 20 : 18,
                }}
                layout="horizontal"
                initialValues={{
                    size: "large",
                }}
                size="large"
            >
                <Form.Item label="Name">
                    <Input
                        value={categoryDetail?.name}
                        hidden={props.type === "View" ? true : false}
                        name="name"
                        rules={[{ required: true, message: "Please input the name of category!" }]}
                        onChange={(ev) => setCategoryDetail({ ...categoryDetail, name: ev.target.value })}
                    />
                    <label hidden={props.type === "View" ? false : true}>{categoryDetail?.name}</label>
                </Form.Item>
                <Form.Item label="Desc">
                    <Input
                        value={categoryDetail?.desc}
                        hidden={props.type === "View" ? true : false}
                        name="desc"
                        rules={[{ required: true, message: "Please input the description of category!" }]}
                        onChange={(ev) => setCategoryDetail({ ...categoryDetail, desc: ev.target.value })}
                    />
                    <label hidden={props.type === "View" ? false : true}>{categoryDetail?.desc}</label>
                </Form.Item>
                <Form.Item label="Created By" hidden={props.type === "View" ? false : true} name="createdBy">
                    <label >{categoryDetail?.createdBy}</label>
                </Form.Item>
                <Form.Item label="Created Time" hidden={props.type === "View" ? false : true} name="createdTime">
                    <label >{getTimeFormat(categoryDetail?.createdTime)}</label>
                </Form.Item>
                <Form.Item label="Last Update Time" hidden={props.type === "View" ? false : true} name="lastUpdatedTime">
                    <label >{getTimeFormat(categoryDetail?.lastUpdatedTime)}</label>
                </Form.Item>
                <Form.Item label="Status">
                    <Switch
                        checked={categoryDetail?.isActive}
                        disabled={props.type === "View" ? true : false}
                        onChange={(ev) => setCategoryDetail({ ...categoryDetail, isActive: !categoryDetail?.isActive })}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DetailModal;