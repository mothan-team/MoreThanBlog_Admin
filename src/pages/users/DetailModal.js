import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Switch } from 'antd';
import { getTimeFormat } from '../../utils/dateTimeHelper';
import { useSelector } from "react-redux";

const DetailModal = (props) => {
    const { user } = useSelector((state) => state.user);
    const [userDetail, setUserDetail] = useState(null);

    useEffect(() => {
        setUserDetail(user);
    }, [user]);

    useEffect(() => {
        if (props.type === "Add") {
            setUserDetail(null);
        }
    }, [props.type]);

    const handleOk = () => {
        props.handleOk(userDetail.id, userDetail);
    };

    const handleCancel = () => {
        props.handleCancel();
    };

    return (
        <Modal
            title={props.type === "View" ? "View User" : props.type === "Add" ? "Add User" : "Edit User"}
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
                <Form.Item label="First Name">
                    <Input
                        value={userDetail?.firstName}
                        hidden={props.type === "View" ? true : false}
                        name="firstName"
                        onChange={(ev) => setUserDetail({ ...userDetail, firstName: ev.target.value })}
                    />
                    <label hidden={props.type === "View" ? false : true}>{userDetail?.firstName}</label>
                </Form.Item>
                <Form.Item label="Last Name">
                    <Input
                        value={userDetail?.lastName}
                        hidden={props.type === "View" ? true : false}
                        name="lastName"
                        onChange={(ev) => setUserDetail({ ...userDetail, lastName: ev.target.value })}
                    />
                    <label hidden={props.type === "View" ? false : true}>{userDetail?.lastName}</label>
                </Form.Item>
                <Form.Item label="Email">
                    <Input
                        value={userDetail?.email}
                        hidden={props.type === "View" ? true : false}
                        name="email"
                        onChange={(ev) => setUserDetail({ ...userDetail, email: ev.target.value })}
                    />
                    <label hidden={props.type === "View" ? false : true}>{userDetail?.email}</label>
                </Form.Item>
                <Form.Item label="Created By" hidden={props.type === "View" ? false : true} name="createdBy">
                    <label >{userDetail?.createdBy}</label>
                </Form.Item>
                <Form.Item label="Created Time" hidden={props.type === "View" ? false : true} name="createdTime">
                    <label >{getTimeFormat(userDetail?.createdTime)}</label>
                </Form.Item>
                <Form.Item label="Last Update Time" hidden={props.type === "View" ? false : true} name="lastUpdatedTime">
                    <label >{getTimeFormat(userDetail?.lastUpdatedTime)}</label>
                </Form.Item>
                <Form.Item label="Status">
                    <Switch
                        checked={userDetail?.isActive}
                        disabled={props.type === "View" ? true : false}
                        onChange={(ev) => setUserDetail({ ...userDetail, isActive: !userDetail?.isActive })}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DetailModal;