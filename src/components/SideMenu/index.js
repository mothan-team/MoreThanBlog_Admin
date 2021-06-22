import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  UserOutlined,
  PieChartOutlined,
  UnorderedListOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import "./index.less";

const MenuItems = [
  { path: "/admin/dashboard", title: "Dashboard", icon: <PieChartOutlined /> },
  { path: "/admin/users", title: "Users", icon: <UserOutlined /> },
  { path: "/admin/categories", title: "Categories", icon: <UnorderedListOutlined /> },
  { path: "/admin/blogs", title: "Blogs", icon: <ContainerOutlined /> },
];

const SideMenu = () => {
  const location = useLocation();
  const selectedItem =
    MenuItems.map((x) => x.path).find((x) => location.pathname.includes(x)) || "/admin";
  return (
    <Menu theme="dark" defaultSelectedKeys={[selectedItem]} mode="inline">
      {MenuItems.map((item) => (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link to={item.path}>{item.title}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SideMenu;
