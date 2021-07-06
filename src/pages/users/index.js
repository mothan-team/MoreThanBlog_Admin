import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Input, Spin, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useDebounce } from "../../utils/debounceHelper";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_USER, GET_USERS, UPDATE_USER, GET_USER, CREATE_USER } from "../../redux/User/user.types";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { parse } from "query-string";
import "./index.css";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import DetailModal from "./DetailModal";

const Users = () => {
  let history = useHistory();
  const { page, size, terms } = parse(history.location.search);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(null);
  const [type, setType] = useState("View");
  const [searchTerm, setSearchTerm] = useState(terms || "");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();
  const { total, users, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: GET_USERS,
      payload: { page: page || 1, size: size || 10, terms: searchTerm || "" },
    });
  }, [dispatch, history, page, searchTerm, size]);

  useEffect(
    () => {
      dispatch({
        type: GET_USERS,
        payload: { page: 1, size: size || 10, terms: debouncedSearchTerm || "" },
      });
    },
    [debouncedSearchTerm, dispatch, size] // Only call effect if debounced search term changes
  );

  const onChange = (p, s) => {
    history.push(`/admin/users?page=${p}&size=${s}&terms=${searchTerm}`);
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Blog Count",
      dataIndex: "blogCount",
      key: "blogCount",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={(e) => handleShowDetailModalButton(e, record.id)}>
            <EyeOutlined />
          </Button>
          <Button type="link" onClick={(e) => handleShowEditModalButton(e, record.id)}>
            <EditOutlined />
          </Button>
          <Button type="link" onClick={() => showDeleteConfirm(record.id)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const handleModalOkButton = (id, user) => {
    if (id) {
      dispatch({ type: UPDATE_USER, payload: { id, user } });
    }
    else {
      dispatch({ type: CREATE_USER, payload: { user } });
    }
    setIsDetailModalVisible(false);
  };

  const handleModalCancelButton = () => {
    setIsDetailModalVisible(false);
  };

  const handleShowDetailModalButton = (e, id) => {
    e.preventDefault();
    setType("View");
    dispatch({ type: GET_USER, payload: id });
    setIsDetailModalVisible(true);
  };

  const handleShowCreateModalButton = (e, id) => {
    e.preventDefault();
    setType("Add");
    setIsDetailModalVisible(true);
  };

  const handleShowEditModalButton = (e, id) => {
    e.preventDefault();
    setType("Edit");
    dispatch({ type: GET_USER, payload: id });
    setIsDetailModalVisible(true);
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure delete this user?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch({ type: DELETE_USER, payload: id });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div>
      <Input
        value={searchTerm}
        placeholder="Search"
        className="users-search"
        bordered={false}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type="primary" onClick={handleShowCreateModalButton} style={{ float: "right" }}>
        New User
      </Button>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={users}
          showSizeChanger
          rowKey="id"
          pagination={{ total, onChange, defaultCurrent: +page || 1, defaultPageSize: +size || 10 }}
        />
      </Spin>
      <DetailModal
        isModalVisible={isDetailModalVisible}
        type={type}
        handleOk={handleModalOkButton}
        handleCancel={handleModalCancelButton}
      />
    </div>
  );
};

export default Users;
