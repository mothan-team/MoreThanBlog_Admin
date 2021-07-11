import React, { useEffect, useState } from "react";
import { Table, Space, Spin, Button, Modal, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_BLOG, GET_BLOGS } from "../../redux/Blog/blog.types";
import { Link, useHistory } from "react-router-dom";
import { parse } from "query-string";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { cutTail } from "../../utils/stringHelper";
import "./index.less";
import { createBlog } from "../../redux/Blog/blog.actions";
import { NewBlogModal } from "./NewBlogModal";

const Blogs = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { total, blogs, loading, currentBlogId } = useSelector(state => state.blog);
  const { page, size } = parse(history.location.search);
  const [isNewBlogModalVisible, setIsNewBlogModalVisible] = useState(false);

  useEffect(() => {
    dispatch({ type: GET_BLOGS, payload: { page: page || 1, size: size || 10 } });
  }, [dispatch, history, page, size]);

  // Navigate to blog detail page
  useEffect(() => {
    if (currentBlogId) {
      history.push(`/admin/blogs/${currentBlogId}`);
    }
  }, [currentBlogId, history]);

  const onChange = (p, s) => {
    history.push(`/admin/blogs?page=${p}&size=${s}`);
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => <Link to={`/admin/blogs/${record.id}`}>{text}</Link>,
    },
    {
      title: "Description",
      dataIndex: "desc",
      render: text => cutTail(text, 75),
    },
    {
      title: "Content",
      dataIndex: "content",
      render: text => cutTail(text, 200),
    },
    {
      title: "Read",
      dataIndex: "readTime",
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "id",
      render: categories => {
        return (
          <div>
            {categories.map(x => (
              <Link key={x.id} to={`/admin/categories/${x.id}`}>
                <Tag color="#2db7f5">{x.name}</Tag>
              </Link>
            ))}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <Link to={`/admin/blogs/${record.id}`}>Edit</Link>
          <Button type="link" danger size="small" onClick={() => showDeleteConfirm(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = id => {
    Modal.confirm({
      title: "Are you sure delete this blog?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch({ type: DELETE_BLOG, payload: id });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onOpenNewBlogModal = () => {
    setIsNewBlogModalVisible(true);
  };

  const onCloseNewBlogModal = () => {
    setIsNewBlogModalVisible(false);
  };

  const onCreateBlog = blogValues => {
    dispatch(createBlog({ ...blogValues, status: "draft" }));
    onCloseNewBlogModal();
  };

  return (
    <>
      <Button type="primary" onClick={onOpenNewBlogModal} style={{ marginBottom: 16 }}>
        New blog
      </Button>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={blogs}
          showSizeChanger
          rowKey="id"
          pagination={{ total, onChange, defaultCurrent: +page || 1, defaultPageSize: +size || 10 }}
        />
      </Spin>
      <NewBlogModal
        visible={isNewBlogModalVisible}
        onCancel={onCloseNewBlogModal}
        onSubmit={onCreateBlog}
      />
    </>
  );
};

export default Blogs;
