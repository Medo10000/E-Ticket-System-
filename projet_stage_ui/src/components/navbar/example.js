import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useAuth } from '../context/AuthContext'
import { render } from "@testing-library/react";
 
export default function Example() {
  const { getUser, userIsAuthenticated, userLogout } = useAuth()

  const logout = () => {
    userLogout()
  }

  const enterMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "none" } : { "display": "block" }
  }

  const logoutMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "block" } : { "display": "none" }
  }

  const adminPageStyle = () => {
    const user = getUser()
    return user && user.role === 'ROLE_ADMIN' ? { "display": "block" } : { "display": "none" }
  }

  const userPageStyle = () => {
    const user = getUser()
    return user && user.role === 'ROLE_USER' ? { "display": "block" } : { "display": "none" }
  }

  const devPageStyle = () => {
    const user = getUser()
    return user && user.role === 'ROLE_DEV' ? { "display": "block" } : { "display": "none" }
  }

  const getUserName = () => {
    const user = getUser()
    return user ? user.name : ''
  }
 
 
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="text-lg p-1 mx-6 font-normal"
      >
        <a href="/" className="flex items-center">
          Acceuil
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="text-lg p-1 mx-6 font-normal"
      >
        <a href="#" className="flex items-center">
          Services
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="text-lg p-1 mx-6 font-normal"
      >
        <a href="#" className="flex items-center">
          A propos de nous
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="text-lg p-1 mx-10 font-normal"
      >
        <a href="#" className="flex items-center">
          Contact
        </a>
      </Typography>
    </ul>
  );
 
  
    let _login, _logout;
    _login = <Link to="/login" style={enterMenuStyle()} variant="gradient" size="sm" className="text-lg bg-blue-500 text-white lg:inline-block px-8 py-1 rounded-2xl">Login</Link>;
    _logout = <Link to="/" style={logoutMenuStyle()} onClick={logout} variant="gradient" size="sm" className="text-lg bg-blue-500 text-fuchsia-50 lg:inline-block px-8 py-1 rounded-2xl">Logout</Link>;
    
  
  return (
    <Navbar className="mx-auto min-w-full py-2 px-4 lg:px-8 lg:py-4 bg-gray-50">
      <div className="container mx-auto flex items-center justify-between text-gray-900">
        <Link to={"/"}>
          <img className="w-24" src={require('../../components/assets/Capturelogo.PNG')} />
        </Link>
        <div className="text-lg lg:block" style={enterMenuStyle()}>{navList}</div>
        {_login}
        {_logout}
      </div>
    </Navbar>
  );
}
