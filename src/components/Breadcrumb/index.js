import React from "react";
import { Breadcrumb as AntdBreadcrumb } from "antd";
import "./index.less";
import { Link } from "react-router-dom";

// TODO: should render the breadcrumb based on the url instead of hard-coded

const Breadcrumb = () => {
  return (
    <AntdBreadcrumb style={{ margin: "16px 0" }}>
      <AntdBreadcrumb.Item>
        <Link to="/">Home</Link>
      </AntdBreadcrumb.Item>
      <AntdBreadcrumb.Item>
        <Link to="/">Dashboard</Link>
      </AntdBreadcrumb.Item>
    </AntdBreadcrumb>
  );
};

export default Breadcrumb;
