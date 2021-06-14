import React from "react";
import { Menu } from "antd";
import { UserOutlined, PieChartOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./index.less";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link to="/admin/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to="/admin/users">Users</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<UnorderedListOutlined />}>
        <Link to="/admin/categories">Categories</Link>
      </Menu.Item>
    </Menu>
  );
};

export default SideMenu;
