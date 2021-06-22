import React, { useEffect } from "react";
import { Table, Space, Spin } from "antd";
import "./index.less";
import { useDispatch, useSelector } from "react-redux";
import { GET_BLOGS } from "../../redux/Blog/blog.types";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    render: (text, record) => <a href={`/admin/blogs/${record.id}`}>{text}</a>,
  },
  {
    title: "Description",
    dataIndex: "desc",
  },
  {
    title: "Content",
    dataIndex: "content",
  },
  {
    title: "Read",
    dataIndex: "readTime",
  },
  {
    title: "Categories",
    dataIndex: "categories",
    key: "id",
    render: (categories) => {
      return (
        <div>
          {categories.map((x) => (
            <a key={x.id} href={`/admin/blogs/${x.id}`}>
              {x.name}
            </a>
          ))}
        </div>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a href={`/admin/blogs/${record.id}`}>Edit</a>
        <a href="/">Delete</a>
      </Space>
    ),
  },
];

const Blogs = () => {
  const loading = useSelector((state) => state.blog.loading);
  const blogs = useSelector((state) => state.blog.blogs);
  const page = useSelector((state) => state.blog.page);
  const size = useSelector((state) => state.blog.size);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_BLOGS, payload: { page, size } });
  }, [dispatch, page, size]);

  return (
    <Spin spinning={loading}>
      <Table columns={columns} dataSource={blogs} rowKey="id" />
    </Spin>
  );
};

export default Blogs;
