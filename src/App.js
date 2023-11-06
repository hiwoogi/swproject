
import './App.css';

import KeywordSearch from './components/KeywordSearch.js';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home.js';

export default function App() {
  return (
    <div>
      <HashRouter>
      
      <Routes>
        <Route path="/" exact = {true} element={<Home />} />
        <Route path="/keyword" element={<KeywordSearch />} />
    
      </Routes>
    </HashRouter>
    
    </div>
  
  );
}


