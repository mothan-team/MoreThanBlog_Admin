import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
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
  {path: "/admin/editor", title: "Editor", icon: <UnorderedListOutlined/> }
];

const getSelected = (path) => MenuItems.map((x) => x.path).find((x) => path.includes(x));

const SideMenu = () => {
  const history = useHistory();
  const [selected, setSelected] = useState(getSelected(history.location.pathname));
  useEffect(() => {
    return history.listen((location) => {
      setSelected(getSelected(location.pathname));
    });
  }, [history]);

  return (
    <Menu theme="dark" selectedKeys={[selected]} mode="inline">
      {MenuItems.map((item) => (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link to={item.path}>{item.title}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SideMenu;
