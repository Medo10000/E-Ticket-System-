import React from "react";
import { useNavigate } from "react-router-dom";
import TicketService from "../services/TicketService";
import TransferService from "../services/TransferService";


const Transfer = ({ transfer }) => {
  const navigate = useNavigate();

  
  

  const updateTicket = (e) => {
    e.preventDefault();
    console.log('ticketId: ' + transfer.ticketDto.ticketId+ ' ' + 'userId :'+ transfer.plainRecepteurDto.userId);
    TicketService.updateTicket(transfer.ticketDto, transfer.ticketDto.ticketId, transfer.plainRecepteurDto.userId)
      .then(() => {
        TransferService.deleteTransfer(transfer.transferId);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  return (
    <tr key={transfer.transferId}>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{transfer.transferId}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{transfer.ticketDto.plainUserDto.nom}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{transfer.plainRecepteurDto.nom}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{transfer.localDate}</div>
      </td>
      <td className="text-center px-5 py-2 whitespace-nowrap font-medium text-sm">
        <a
           onClick={(e, transferId) => updateTicket(e, transfer.ticketDto, transfer.ticketDto.ticketId, transfer.plainRecepteurDto.userId)}
          className="text-gray-600 hover:bg-yellow-500 bg-yellow-400 px-2 py-1 rounded-xl hover: cursor-pointer"
        >
          valider
        </a>
      </td>
    </tr>
  );
};

export default Transfer;
