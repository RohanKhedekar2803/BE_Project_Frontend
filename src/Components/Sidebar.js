import React from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  MessageOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed, handleMenuClick, toggleSidebar, darkTheme }) => {
  const siderClass = darkTheme ? 'dark-theme' : 'light-theme';

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={siderClass}
      style={{ backgroundColor: darkTheme ? "#001529" : "#fff"}}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => toggleSidebar()}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
          color: darkTheme ? "#fff" : "#001529"
        }}
      />
      <Menu
        theme={darkTheme ? 'dark' : 'light'}
        mode="inline"
        defaultSelectedKeys={['1']}
        onClick={handleMenuClick}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="2" icon={<MessageOutlined />}>
          Community
        </Menu.Item>
        <Menu.Item key="3" icon={<BellOutlined />}>
          Notifications
        </Menu.Item>
        <Menu.Item key="4" icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
