import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FolderOutlined,
  UserOutlined,
  FundProjectionScreenOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, NavLink } from "react-router-dom";
import { green } from "@mui/material/colors";

const { Header, Sider, Content } = Layout;

const SideBar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          className="mt-10"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <NavLink to="/user">Manage user</NavLink>,
            },
            {
              key: "2",
              icon: <FolderOutlined />,
              label: <NavLink to="/job">Manage Job</NavLink>,
            },
            {
              key: "3",
              icon: <FundProjectionScreenOutlined />,
              label: <NavLink to="/job-type">Manage Job Type</NavLink>,
            },
            {
              key: "4",
              icon: <SelectOutlined />,
              label: <NavLink to="/services">Manage Services</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className=""
          style={{ padding: 0, background: colorBgContainer }}
        >
          <div className="ml-5">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: green,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
