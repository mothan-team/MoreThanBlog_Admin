import React, { useState } from "react";
import { Layout } from "antd";
import Breadcrumb from "../../components/Breadcrumb";
import SideMenu from "../../components/SideMenu";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "./index.less";

const { Content, Footer, Sider } = Layout;

const PrimaryLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Link to="/">
          <div className="logo" />
        </Link>
        <SideMenu />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb />
          <div className="site-layout-background" style={{ padding: 24 }}>
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>From Mỏ than team with love 💛</Footer>
      </Layout>
    </Layout>
  );
};

export default PrimaryLayout;
