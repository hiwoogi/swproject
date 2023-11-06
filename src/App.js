
import './App.css';

import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Keyword from './routes/Keyword.js';

export default function App() {
  return (
    <div>
      <HashRouter>
      
      <Routes>
        <Route path="/" exact = {true} element={<Home />} />
        <Route path="/keyword" element={<Keyword/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>

      </Routes>
    </HashRouter>
    
    </div>
  
  );
}


