// HomePage.js
import React, { useState } from 'react';
import { Layout } from 'antd';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Chat from './Chat'; 
import Dashboard from './Dashboard';
import Challenge from './Challenge';
import ProfilePage from './ProfilePage';

const { Content } = Layout;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleMenuClick = (item) => {
    setSelectedMenuItem(item.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar
        collapsed={collapsed}
        handleMenuClick={handleMenuClick}
        toggleSidebar={toggleSidebar}
        darkTheme={darkTheme}
      />
      <Layout className={darkTheme ? 'dark-theme' : 'light-theme'}>
        <Navbar  toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} darkTheme={darkTheme} />
        <Content style={{ backgroundColor: darkTheme ? "#43244f" : "#ffe0ff", borderRadius: "25px", overflowY: "auto" }}>
          {selectedMenuItem === '1' ? (
            <div style={{ position: 'fixed', left: '200px', width: 'calc(100% - 200px)', height: '100vh', overflowY: 'auto', backgroundColor: darkTheme ? "#43244f" : "#ffe0ff", borderRadius: "25px" }} >
              < Dashboard />

            </div>
          ) : selectedMenuItem === '2' ? (
            <div style={{ position: 'fixed', width: '100%', height: '100vh', overflowY: 'auto', backgroundColor: darkTheme ? "#43244f" : "#ffe0ff", borderRadius: "25px" }} >
            <Challenge /></div>
          ) :  selectedMenuItem === '4' ? (
            <div style={{ position: 'fixed', width: '100%', height: '100vh', overflowY: 'auto', backgroundColor: darkTheme ? "#43244f" : "#ffe0ff", borderRadius: "25px" }} >
            <ProfilePage /></div>
          ) : selectedMenuItem === '3' ? (
            <div style={{ position: 'fixed', width: '100%', height: '100vh', overflowY: 'auto', backgroundColor: darkTheme ? "#43244f" : "#ffe0ff", borderRadius: "25px" }} >
            <Chat /></div>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
