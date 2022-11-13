import React, { useState, useEffect } from 'react'
import { useParams, useNavigate} from "react-router-dom"
import userService from "../services/UserService";
import roleService from '../services/RoleService';
import TicketService from '../services/TicketService';
import SidebarA from '../sidebar/sidebarA';
import AuthService from '../services/auth.service';
import DropdownMenu from '../logout/DropdownMenu';


const AddTicketA = () => {

    
    const [ticket, setTicket] = useState({
        titre:"",
        description:""
    });

    const navigaye = useNavigate();

    const saveTicket = (e) => {
        e.preventDefault();
        const _currentUser = AuthService.getCurrentUser();
        const userId = _currentUser.id;
        console.log("userId:", userId)
        TicketService.saveTicket(ticket, userId)
        .then((response) => {
            console.log(response);
            if(_currentUser.roles[0] === 'ROLE_USER'){
                navigaye("/ticketListC");
                window.location.reload();
            }else if(_currentUser.roles[0] === 'ROLE_DEV'){
                navigaye("/ticketListD");
                window.location.reload();
            }else if(_currentUser.roles[0] === 'ROLE_ADMIN'){
                navigaye("/ticketListA");
                window.location.reload();
            }
                
        }).catch((error) => {
            console.log(error.response.data.errors);
        })
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setTicket({...ticket, [e.target.name]: value});
    };

    

  return (
    <div className='flex bg-gray-200'>
    <SidebarA/>
    <div className="absolute top-10 right-10 h-16 ">
        <DropdownMenu/>
    </div>
    <div className='max-w-2xl shadow border-b m-auto bg-gray-200'>
        <div className='px-8 py-8'>
            <div className='font-semibold text-2xl tracking-wider text-gray-800'>
                <h1>Ajouter un nouveau ticket</h1>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='text-gray-800 text-xl font-bold'>Titre</label>
                <input type="text" name='titre' value={ticket.titre} onChange={(e) => handleChange(e)} className='h-10 w-96 border mt-2 ml-24 px-2 mx-1.5'/>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='text-gray-800 text-xl font-bold absolute '>Description</label>
                {/*<input type="textarea" name='description' value={ticket.description} onChange={(e) => handleChange(e)} className='h-32 w-96 border mt-2 px-2 mx-8'/>*/}
                <textarea name='description' value={ticket.description} onChange={(e) => handleChange(e)} rows={5} cols={5}className='w-96 border  mx-36 px-2 '/>
            </div>
            
            <div className='items-center justify-center h-14 w-full my-4 mt-32'>
                <button onClick={saveTicket} className='block mx-auto bg-blue-500 hover:bg-blue-900 text-white font-semibold py-1 px-6'>Ajouter</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AddTicketA