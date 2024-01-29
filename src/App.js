import './App.css';
// import Login from './Components/Login';
import Chat from './Components/Chat';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/LoginPage';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';

function App() {
  return (

<BrowserRouter>

    <Routes>      
       <Route path="/" element={<Login />} />
       <Route path='/home' element={<HomePage />} />
       <Route path='/register' element={<Register />} />
       <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
</BrowserRouter>
    
  );
}

export default App;
