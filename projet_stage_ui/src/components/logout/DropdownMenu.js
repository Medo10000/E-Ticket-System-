import React, { useState, useRef, useEffect } from 'react';
import "../logout/logout.css";
import {useAuth} from "../context/AuthContext";
import { AiOutlineUser } from "react-icons/ai";
import AuthService from '../services/auth.service'; 


export default function DropdownMenu  ()  {

  const { userLogout } = useAuth();

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  

  const logout = () => {
    console.log('logged out');
    userLogout();
  }

  const [user, setUser] = useState("");
  useEffect(() => {
    const _currentUser = AuthService.getCurrentUser()
    console.log(_currentUser)
    console.log(_currentUser.username)
    setUser(_currentUser.username)
  });
  

  return (
    <>
    <div className="menu-container mb-24 ">
      <button onClick={onClick} className="menu-trigger">
        <span>{user}</span>
        <AiOutlineUser/>
      </button>
      <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <ul>
          <li><a href="/login" onClick={logout}>Logout</a></li>
        </ul>
      </nav>
      
    </div>

    </>
  );
};
