import React from 'react';
import { Layout, Button } from 'antd';
import { useNavigate } from 'react-router-dom'
const { Header, Content } = Layout;

const Login = () => {

  const navigate = useNavigate();
  const handleLogin = () => {
    console.log('Login button clicked');
  };

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <Layout>
      <Header className="login-navbar">
        <a href="#opengenics" style={{ fontSize: "30px", color: "pink" }} >OpenGenics</a>
        <div className="navbar-buttons">
          <a style={{ color: "violet" }} href="#features" className="navbar-button">
            Features
          </a>
          <a style={{ color: "violet" }} href="#advantages" className="navbar-button">
            Advantages and Use Cases
          </a>
        </div>
        <Button style={{color: "pink" }} type="primary" onClick={handleLogin} className="login-button">
          Login
        </Button>
        <Button style={{color: "pink" }} type="primary" onClick={handleRegister} className="login-button">
          Register
        </Button>
      </Header>
      <Content>
      <img id="opengenics" src="/images/img1.png" alt="Feature 1" />
        <div id="features" >
          <img src="/images/img2.png" alt="Feature 2" />
          <img src="/images/img3.png" alt="Advantage 1" />
        </div>
        <div id="advantages">
          <img src="/images/img4.png" alt="Advantage 2" />
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
