import React from 'react'
import { Link } from 'react-router-dom'

export default function Logout({setHasToken}) {

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem("ACCESS_TOKEN");
        setHasToken(null)
        alert("로그아웃 성공")
        
        
      };
  return (
        <Link to="/" onClick={handleLogout}>로그아웃</Link>
  )
}
