import React from "react";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    history.push("/authenticate/login");
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/">Personal Info</Link>
      </Menu.Item>
      <Menu.Item>
        <span onClick={logout}>Log out</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className={styles.container}>
      <Dropdown overlay={menu} arrow>
        <Avatar icon={<UserOutlined />} className={styles.avatar} />
      </Dropdown>
    </Layout.Header>
  );
};

export default Header;
