import React from "react";
import { Breadcrumb as AntdBreadcrumb } from "antd";
import { Link } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import "./index.less";

const Breadcrumb = ({ breadcrumbs }) => {
  return (
    <AntdBreadcrumb style={{ margin: "16px 0" }}>
      {breadcrumbs.map(({ breadcrumb }) => (
        <AntdBreadcrumb.Item key={breadcrumb.key}>
          <Link to={breadcrumb.key}>{breadcrumb}</Link>
        </AntdBreadcrumb.Item>
      ))}
    </AntdBreadcrumb>
  );
};

export default withBreadcrumbs()(Breadcrumb);
