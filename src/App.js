
import './App.css';

import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './routes/Home.js';
import Login from './components/user/Login.js';
import Signup from './components/user/Signup.js';
import Keyword from './routes/Keyword.js';

import Favorites from './routes/Favorites.js';
import Trend from './routes/Trend.js';

export default function App() {

  const fakeAuthentication = {
    isAuthenticated: false, // Change this to true if the user is authenticated
  };
  
  const PrivateRoute = ({ element, ...rest }) => {
    return fakeAuthentication.isAuthenticated ? (
      <Route {...rest} element={element} />
    ) : (
      <Navigate to="/login" />
    );
  };


  return (
    <div>
      <HashRouter>
      
      <Routes>
        <Route path="/" exact = {true} element={<Home />} />
        <Route path="/keyword" element={<Keyword/>} />
        <Route path="/trend" element={<Trend/>} />
        <Route
            path="/favorites"
            element={<PrivateRoute element={<Favorites />} />}
          />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        

      </Routes>
    </HashRouter>
    
    </div>
  
  );
}


