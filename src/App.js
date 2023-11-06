
import './App.css';

import KeywordSearch from './components/KeywordSearch.js';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';

export default function App() {
  return (
    <div>
      <HashRouter>
      
      <Routes>
        <Route path="/" exact = {true} element={<Home />} />
        <Route path="/keyword" element={<KeywordSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>

      </Routes>
    </HashRouter>
    
    </div>
  
  );
}


