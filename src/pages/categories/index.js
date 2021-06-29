import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Input, Spin } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import DetailModal from "./DetailModal";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  GET_CATEGORY,
} from "../../redux/Category/category.types";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { parse } from "query-string";
import { cutTail } from "../../utils/stringHelper";
import "./index.css";
import { useDebounce } from "../../utils/debounceHelper";

const Categories = () => {
  let history = useHistory();
  const { page, size, terms } = parse(history.location.search);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState(terms || "");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();
  const { total, categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    // console.log("term ", terms);
    // console.log("page ", page);
    dispatch({
      type: GET_CATEGORIES,
      payload: { page: page || 1, size: size || 10, terms: searchTerm || "" },
    });
  }, [dispatch, history, page, searchTerm, size]);

  useEffect(
    () => {
      dispatch({
        type: GET_CATEGORIES,
        payload: { page: 1, size: size || 10, terms: debouncedSearchTerm || "" },
      });
    },
    [debouncedSearchTerm, dispatch, size] // Only call effect if debounced search term changes
  );

  const onChange = (p, s) => {
    history.push(`/admin/categories?page=${p}&size=${s}&terms=${searchTerm}`);
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

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
      render: (text) => cutTail(text, 75),
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
          <Link to="" onClick={(e) => handleShowDetailModalButton(e, record.id)}>
            <EyeOutlined />
          </Link>
          <Link to="" onClick={(e) => handleShowEditModalButton(e, record.id)}>
            <EditOutlined />
          </Link>
          <Link to="" onClick={() => showDeleteConfirm(record.id)}>
            <DeleteOutlined />
          </Link>
        </Space>
      ),
    },
  ];

  const handleModalOkButton = (id, category) => {
    dispatch({ type: UPDATE_CATEGORY, payload: { id, category } });
    setIsDetailModalVisible(false);
  };

  const handleModalCancelButton = () => {
    setIsDetailModalVisible(false);
  };

  const handleShowDetailModalButton = (e, id) => {
    e.preventDefault();
    setIsEdit(false);
    dispatch({ type: GET_CATEGORY, payload: id });
    setIsDetailModalVisible(true);
  };

  const handleShowEditModalButton = (e, id) => {
    e.preventDefault();
    setIsEdit(true);
    dispatch({ type: GET_CATEGORY, payload: id });
    setIsDetailModalVisible(true);
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure delete this category?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch({ type: DELETE_CATEGORY, payload: id });
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
        className="categories-search"
        bordered={false}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={categories}
          showSizeChanger
          rowKey="id"
          pagination={{ total, onChange, defaultCurrent: +page || 1, defaultPageSize: +size || 10 }}
        />
      </Spin>
      <DetailModal
        isModalVisible={isDetailModalVisible}
        isEdit={isEdit}
        handleOk={handleModalOkButton}
        handleCancel={handleModalCancelButton}
      />
    </div>
  );
};

export default Categories;
