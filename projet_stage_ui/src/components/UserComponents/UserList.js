import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import UserService from '../services/UserService';
import User from './User';
import SidebarA from '../sidebar/sidebarA';
import DropdownMenu from '../logout/DropdownMenu';

const UserList = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(''); 

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await UserService.getUsers();
                const users = response.data;
                const reversed = [...users].reverse();
                setUsers(reversed);
            
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        };
        fetchData();
      }, []);
    
    const deleteUser = (u, userId, roleId) => {
        u.preventDefault();
        UserService.deleteUser(userId, roleId)
        .then((res) => {
            if(users){
                setUsers((prevElement)=>{
                    return prevElement.filter((user) => user.userId !== userId);
                });
            }
        });
    };


  return (
    <>
    <div className='flex bg-gray-100'>
    <SidebarA/>
    <div className="absolute top-10 right-5 h-16 ">
        <DropdownMenu/>
    </div>
    <div className='container mx-auto my-8 mt-32 mr-5 ml-5'>
        <div className='h-12'>
            <button 
            onClick={() => navigate("/addUser")}
            className='rounded-2xl bg-white border-black border-2 border-gray-400 px-2 py-1 font-semibold text-lg text-gray-500'>
                Ajouter Utilisateur
            </button>
        </div>
        <div className='flex shadow border-b w-auto'>
            <table className='min-w-full'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='text-left font-medium text-gray-500 -tracking-wider px-5'>
                            Nom
                        </th>
                        <th className='text-left font-medium text-gray-500 -tracking-wider px-5'>
                            Prénom
                        </th>
                        <th className='text-left font-medium text-gray-500 -tracking-wider px-5'>
                            Email
                        </th>
                        <th className='text-left font-medium text-gray-500 -tracking-wider px-5'>
                            Numéro
                        </th>
                        <th className='text-left font-medium text-gray-500 -tracking-wider px-5'>
                            Rôle
                        </th>
                        <th className='text-center font-medium text-gray-500 -tracking-wider px-5'>
                            Actions
                        </th>
                    </tr>
                </thead>
                {!loading && (
                <tbody className='bg-white '>
                    {users.map((user) => (
                        <User 
                        user={user} 
                        deleteUser={deleteUser} 
                        key={user.userId}></User>
                    ))}
                </tbody>
                )}
            </table>
        </div>
    </div>
    </div>
    </>
  );
}

export default UserList