import React from 'react'
import { Link } from 'react-router-dom'

export default function Logout({setHasToken}) {

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem("ACCESS_TOKEN");
        setHasToken(null)
        
        
      };
  return (
        <Link to="/" onClick={handleLogout}>로그아웃</Link>
  )
}
