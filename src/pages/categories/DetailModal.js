import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const DetailModal = (props) => {
    const handleOk = () => {
        props.handleOk();
    };

    const handleCancel = () => {
        props.handleCancel();
    };

    return (
        <Modal title="Basic Modal" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
};

export default DetailModal;