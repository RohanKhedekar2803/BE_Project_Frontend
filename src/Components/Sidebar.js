import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { logout , reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import {  useDispatch } from 'react-redux'
import {
  MessageOutlined,
  LogoutOutlined,
  BellOutlined,
  CodeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed, handleMenuClick, toggleSidebar, darkTheme }) => {
  const siderClass = darkTheme ? 'dark-theme' : 'light-theme';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
}

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={siderClass}
      style={{ backgroundColor: darkTheme ? "#2a1433" : "#fff"}}
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
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<CodeOutlined />}>
          Challenges
        </Menu.Item>
        <Menu.Item key="3" icon={<MessageOutlined />}>
        Chats
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
        Profile
        </Menu.Item>
        {/* <Menu.Item key="5" icon={<BellOutlined />}>
        Reports
        </Menu.Item> */}
        <Menu.Item key="6" onClick={() => {
            const confirmLogout = window.confirm("Are you sure you want to logout?");
            if (confirmLogout) {
                onLogout(); // Call your logout function here
            }
        }} icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
