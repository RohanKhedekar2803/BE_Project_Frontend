import './App.css';
// import Login from './Components/Login';
import Chat from './Components/Chat';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
<<<<<<< HEAD
import HomePage from './Components/HomePage';
import Login from './Components/LoginPage';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
=======
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';

>>>>>>> pranit2

function App() {
  return (

<BrowserRouter>

    <Routes>      
       <Route path="/" element={<Login />} />
<<<<<<< HEAD
       <Route path='/home' element={<HomePage />} />
=======
       <Route path='/chat' element={<Chat />} />
>>>>>>> pranit2
       <Route path='/register' element={<Register />} />
       <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
</BrowserRouter>
    
  );
}

export default App;
