import React from "react";
import { useNavigate } from "react-router-dom";

const User = ({ user, deleteUser }) => {
  const navigate = useNavigate();

  
  const editUser = (e, userId) => {
    e.preventDefault();
    navigate(`/editUser/${userId}`);
  };

  return (
    <tr key={user.userId}>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-500">{user.nom}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-500">{user.prenom}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-500">{user.email}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-500">{user.numero}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-500">{user.plainRoleDto.titre}</div>
      </td>
      <td className="text-center px-5 py-2 whitespace-nowrap font-medium text-sm">
        <a
           onClick={(e, userId) => editUser(e, user.userId)}
          className="text-gray-500 hover:bg-yellow-500 bg-yellow-400 px-2 py-1 rounded-xl hover: cursor-pointer"
        >
          modifier
        </a>
        <a
          onClick={(u, userId) => deleteUser(u, user.userId, user.plainRoleDto.id)}
          className="text-gray-500 hover:bg-red-500 bg-red-400 px-2 py-1 rounded-xl hover: cursor-pointer"
        >
          supprimer
        </a>
      </td>
    </tr>
  );
};

export default User;
