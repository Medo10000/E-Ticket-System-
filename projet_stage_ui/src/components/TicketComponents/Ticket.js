import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Ticket = ({ ticket, deleteTicket, user }) => {
  const navigate = useNavigate();

  
  const editTicket = (e, ticketId) => {
    e.preventDefault();
    const _currentUser = AuthService.getCurrentUser();
    if(_currentUser.roles[0] === 'ROLE_USER'){
      navigate(`/editTicketC/${ticketId}`);
      window.location.reload();
    }else if(_currentUser.roles[0] === 'ROLE_DEV'){
      navigate(`/editTicket/${ticketId}`);
      window.location.reload();
    }else if(_currentUser.roles[0] === 'ROLE_ADMIN'){
      navigate(`/editTicket/${ticketId}`);
      window.location.reload();
  }
    
  };


  return (
    <tr key={ticket.ticketId}>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticket.titre}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticket.description}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticket.category}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticket.localDate}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticket.status}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticket.plainUserDto.userId}</div>
      </td>
      <td className="text-center px-5 py-2 whitespace-nowrap font-medium text-sm">
        <a
           onClick={(e, ticketId) => editTicket(e, ticket.ticketId)}
          className="text-gray-600 hover:bg-yellow-500 bg-yellow-400 px-2 py-1 rounded-xl hover: cursor-pointer"
        >
          modifier
        </a>
        <a
          onClick={(u, ticketId) => deleteTicket(u, ticket.ticketId, ticket.plainUserDto.userId)}
          className="text-gray-700 hover:bg-red-500 bg-red-400 px-2 py-1 rounded-xl hover: cursor-pointer"
        >
          supprimer
        </a>
      </td>
    </tr>
  );
};

export default Ticket;
