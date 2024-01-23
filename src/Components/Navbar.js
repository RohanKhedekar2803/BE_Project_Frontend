import React from 'react';
import { Layout, Button, Switch } from 'antd';

const { Header } = Layout;

const Navbar = ({ toggleTheme, darkTheme }) => {
  return (
    <Header  className={darkTheme ? 'dark-theme header'  : 'light-theme header'} >
      <span  style={{ fontSize: '40px'}}>OpenGenics</span>
      <div >
        <Switch
          checkedChildren="Dark"
          unCheckedChildren="Light"
          defaultChecked={darkTheme}
          onChange={toggleTheme}
          style={{ backgroundColor: 'gray'}}
        />
      </div>
    </Header>
  );
};

export default Navbar;
