import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import TicketService from '../services/TicketService';
import TicketToTransfer from './TicketToTransfer';
import SidebarD from '../sidebar/sidebarD';
import DropdownMenu from '../logout/DropdownMenu';

const TicketListD = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState(''); 

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await TicketService.getTickets();
                const tickets = response.data;
                const reversed = [...tickets].reverse();
                setTickets(reversed);
            
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        };
        fetchData();
      }, []);
    


  return (
    <div className='flex bg-gray-100'>
    <SidebarD/>
    <div className="absolute top-10 right-5 h-16 ">
        <DropdownMenu/>
    </div>
    <div className='container mx-auto my-8 mt-32 mr-5 ml-5'>
        <div className='h-12'>
            <button 
            onClick={() => navigate("/addTicket")}
            className='rounded-2xl bg-white border-black border-2 border-gray-400 px-2 py-1 font-semibold text-lg text-gray-500'>
                Ajouter Ticket
            </button>
        </div>
        <div className='flex shadow border-b'>
            <table className='min-w-full'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='text-left font-medium text-gray-600 -tracking-wider px-5'>
                            titre
                        </th>
                        <th className='text-left font-medium text-gray-600 -tracking-wider px-5'>
                            description
                        </th>
                        <th className='text-left font-medium text-gray-600 -tracking-wider px-5'>
                            category
                        </th>
                        <th className='text-left font-medium text-gray-600 -tracking-wider px-5'>
                            Date
                        </th>
                        <th className='text-left font-medium text-gray-600 -tracking-wider px-5'>
                            status
                        </th>
                        <th className='text-center font-medium text-gray-600 -tracking-wider px-5'>
                            Traîter
                        </th>
                        <th className='text-center font-medium text-gray-600 -tracking-wider px-5'>
                            Transférer
                        </th>
                    </tr>
                </thead>
                {!loading && (
                <tbody className='bg-white '>
                    {tickets.map((ticket) => (
                        <TicketToTransfer
                        ticketToTransfer={ticket} 
                        key={ticket.ticketId}></TicketToTransfer>
                    ))}
                </tbody>
                )}
            </table>
        </div>
    </div>
    </div>
  );
}

export default TicketListD