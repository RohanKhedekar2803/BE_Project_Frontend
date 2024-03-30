import './App.css';
import Login from './Components/Login';
import Chat from './Components/Chat';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Challenge from './Components/Challenge';
import CreateChallenge from './Components/CreateChallenge';


function App() {
  return (

<BrowserRouter>

    <Routes>      
       <Route path="/" element={<Login />} />
       <Route path='/chat' element={<Chat />} />
       <Route path='/register' element={<Register />} />
       <Route path='/dashboard' element={<Dashboard />} />
       <Route path='/challenge' element={<Challenge />} />
       <Route path='/createchallenge' element={<CreateChallenge />} />
       <Route path='/allchallenge' element={<Challenge />} />

    </Routes>
</BrowserRouter>
    
  );
}

export default App;
