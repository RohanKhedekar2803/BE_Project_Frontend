// HomePage.js
import React, { useState } from 'react';
import { Layout } from 'antd';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Chat from './Chat'; 

const { Content } = Layout;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
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
        <Navbar toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} darkTheme={darkTheme} />
        <Content style={{ backgroundColor: darkTheme ? "#001c36" : "#eeeeee"}}>
          {selectedMenuItem === '1' ? (
            <div>
              <h1 className="text-2xl font-semibold mb-4">Welcome to Your App</h1>
              {/* Add more content as needed */}
            </div>
          ) : selectedMenuItem === '2' ? (
            <Chat />
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
