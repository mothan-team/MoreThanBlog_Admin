import React, { useState } from "react";
import { Table, Space } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import DetailModal from "./DetailModal";

const Categories = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a href="/">{text}</a>,
    },
    {
      title: "Desc",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Article Count",
      dataIndex: "activleCount",
      key: "activleCount",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to="" onClick={(e) => handleShowDetailModelButton(e)}><EyeOutlined /></Link>
          <Link to=""><EditOutlined /></Link>
          <Link to=""><DeleteOutlined /></Link>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: ".Net Core",
      desc: ".Net Core Desc",
      activleCount: 10,
    }
  ];
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const handleModalOkButton = () => {
    setIsDetailModalVisible(false);
  }

  const handleModalCancelButton = () => {
    setIsDetailModalVisible(false);
  }

  const handleShowDetailModelButton = (e) => {
    e.preventDefault();
    setIsDetailModalVisible(true);
  }

  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <DetailModal
        isModalVisible={isDetailModalVisible}
        handleOk={handleModalOkButton}
        handleCancel={handleModalCancelButton}
      />
    </div>
  )
};

export default Categories;
