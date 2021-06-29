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

    const handleOk = () => {
        props.handleOk(categoryDetail.id, categoryDetail);
    };

    const handleCancel = () => {
        props.handleCancel();
    };

    return (
        <Modal
            title={!props.isEdit ? "View Category" : "EditCategory"}
            visible={props.isModalVisible}
            onCancel={handleCancel}
            footer={!props.isEdit
                ? null
                : [
                    <Button onClick={handleCancel}>Cancel</Button>,
                    <Button onClick={handleOk}>Ok</Button>
                ]}>
            <Form
                labelCol={{
                    span: !props.isEdit ? 6 : 4,
                }}
                wrapperCol={{
                    span: !props.isEdit ? 20 : 18,
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
                        hidden={!props.isEdit ? true : false}
                        name="name"
                        onChange={(ev) => setCategoryDetail({ ...categoryDetail, name: ev.target.value })}
                    />
                    <label hidden={!props.isEdit ? false : true}>{categoryDetail?.name}</label>
                </Form.Item>
                <Form.Item label="Desc">
                    <Input
                        value={categoryDetail?.desc}
                        hidden={!props.isEdit ? true : false}
                        name="desc"
                        onChange={(ev) => setCategoryDetail({ ...categoryDetail, desc: ev.target.value })}
                    />
                    <label hidden={!props.isEdit ? false : true}>{categoryDetail?.desc}</label>
                </Form.Item>
                <Form.Item label="Created By" hidden={!props.isEdit ? false : true} name="createdBy">
                    <label >{categoryDetail?.createdBy}</label>
                </Form.Item>
                <Form.Item label="Created Time" hidden={!props.isEdit ? false : true} name="createdTime">
                    <label >{getTimeFormat(categoryDetail?.createdTime)}</label>
                </Form.Item>
                <Form.Item label="Last Update Time" hidden={!props.isEdit ? false : true} name="lastUpdatedTime">
                    <label >{getTimeFormat(categoryDetail?.lastUpdatedTime)}</label>
                </Form.Item>
                <Form.Item label="Status">
                    <Switch
                        checked={categoryDetail?.isActive}
                        disabled={!props.isEdit ? true : false}
                        onChange={(ev) => setCategoryDetail({ ...categoryDetail, isActive: ev.target.value })}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DetailModal;