import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import TransferService from '../services/TransferService';
import Transfer from './Transfer';
import SidebarA from '../sidebar/sidebarA';
import DropdownMenu from '../logout/DropdownMenu';

const TransferListA = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [transfers, setTransfers] = useState(''); 

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await TransferService.getTransfers();
                const transfers = response.data;
                const reversed = [...transfers].reverse();
                setTransfers(reversed);
            
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        };
        fetchData();
      }, []);
    
    const deleteTransfer = (u, transferId, userId) => {
        u.preventDefault();
        TransferService.deleteTransfer(transferId, userId)
        .then((res) => {
            if(transfers){
                setTransfers((prevElement)=>{
                    return prevElement.filter((transfer) => transfer.transferId !== transferId);
                });
            }
        });
    };


  return (
    <div className='flex bg-gray-100'>
    <SidebarA/>
    <div className="absolute top-10 right-5 h-16 ">
        <DropdownMenu/>
    </div>
    <div className='container mx-auto my-8 mt-32 mr-5 ml-5'>
        <div className='flex shadow border-b'>
            <table className='min-w-full'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='text-left font-medium text-gray-500 -tracking-wider px-5'>
                            id
                        </th>
                        <th className='text-left font-medium text-gray-500 -tracking-wider px-5'>
                            emetteur
                        </th>
                        <th className='text-left font-medium text-gray-500 -tracking-wider px-5'>
                            recepteur
                        </th>
                        <th className='text-left font-medium text-gray-500 -tracking-wider px-5'>
                            Date
                        </th>
                        <th className='text-center font-medium text-gray-500 -tracking-wider px-5'>
                            Valider
                        </th>
                    </tr>
                </thead>
                {!loading && (
                <tbody className='bg-white '>
                    {transfers.map((transfer) => (
                        <Transfer 
                        transfer={transfer} 
                        key={transfer.transferId}></Transfer>
                    ))}
                </tbody>
                )}
            </table>
        </div>
    </div>
    </div>
  );
}

export default TransferListA