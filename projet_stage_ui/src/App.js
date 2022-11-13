import React, { Component , Fragment}from "react";
import logo from './logo.svg';
import './App.css';
import Login from './components/login/login';
import Home from './components/home';
import TestAdminPage from './components/testadminpage.component';
import TestClientPage from './components/testclientpage.component';
import TestDevPage from './components/testdevpage.component';
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./components/context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Example from "./components/navbar/example";
import UserList from "./components/UserComponents/UserList";
import AddUser from "./components/UserComponents/AddUser";
import UpdateUser from "./components/UserComponents/UpdateUser";
import TicketList from "./components/TicketComponents/TicketList";
import TicketListA from "./components/TicketComponents/TicketListA";
import TicketListC from "./components/TicketComponents/TicketListC";
import TicketListD from "./components/TicketComponents/TicketListD";
import AddTicket from "./components/TicketComponents/AddTicket";
import AddTicketA from "./components/TicketComponents/AddTicketA";
import UpdateTicket from "./components/TicketComponents/UpdateTicket";
import UpdateTicketC from "./components/TicketComponents/UpdateTicketC";
import TraitementTicket from "./components/TicketComponents/TraitementTicket";
import TransferListA from "./components/TicketComponents/TransferListA";
import Homee from "./components/pages/dashboard/home";
import TestDash from "./components/testdashboard";
import {Helmet} from "react-helmet";

const App = () => {
  return (
    <>
    

    
    <AuthProvider>
      <Fragment>
      <Routes> 
          <Route path='/dash' element={<TestDash/>}/>
          <Route path='/homee' element={<Homee/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/example' element={<Example/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/testadminpage" element={<TestAdminPage />} />
          <Route path="/testclientpage" element={<TestClientPage />} />
          <Route path="/testdevpage" element={<TestDevPage />} />
          {/*Gestion user*/} 
            <Route path='/userList' element={<UserList/>} />
            <Route path='/addUser' element={<AddUser/>}/>
            <Route path='/addUser/:roleId' element={<AddUser/>}/>
            <Route path='/editUser/:userId' element={<UpdateUser/>}/>
            <Route path='/editUser/:userId/roles/:roleId' element={<UpdateUser/>}/>
            {/*Gestion ticket*/}
            <Route path='/ticketList' element={<TicketList/>}/>
            <Route path='/ticketListC' element={<TicketListC/>}/>
            <Route path='/ticketListC/user/:userId' element={<TicketListC/>}/>
            <Route path='/addTicket' element={<AddTicket/>}/>
            <Route path='/addTicketA' element={<AddTicketA/>}/>
            <Route path='/addTicket/:userId' element={<AddTicket/>}/>
            <Route path='/editTicket/:ticketId' element={<UpdateTicket/>}/>
            <Route path='/editTicketC/:ticketId' element={<UpdateTicketC/>}/>
            <Route path='/editTicket/:ticketId/users/:userId' element={<UpdateTicket/>}/>
            <Route path='/traitementTicket/:ticketId' element={<TraitementTicket/>}/>
            <Route path='/ticketListD' element={<TicketListD/>}/>
            <Route path='/ticketListA' element={<TicketListA/>}/>
            <Route path='/transferListA' element={<TransferListA/>}/>
        </Routes>
      </Fragment>
    </AuthProvider>
    </>
  );
};
export default App;
