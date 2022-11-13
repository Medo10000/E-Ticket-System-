import React from "react";
import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import TicketService from "../services/TicketService"; 
import UserService from "../services/UserService";

const TicketToAssign = ({ticketToAssign}) => {
  //const { ticketId } = useParams();

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);

  let {userId} = useParams();

  const [users, setUsers] = useState({
    userId: parseInt(userId),
    nom: "",
    prenom:"",
    email:"",
    numero:"",
    role: {
        roleId: Number,
        titre: ""
    },
    ticketsDto: [
        {
          ticketId: Number,
          titre: "",
          description: "",
          category: "",
          status:"",
          plainUserDto: {
            userId: Number,
            nom: "",
            prenom: "",
            email: "",
            numero: ""
          },
          localDate: [],
        }]
}); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response2 = await UserService.getUsers();
        const users = response2.data;
        //if(response2.data.user.plainRoleDto.titre==="developper"){
          console.log(users);//}
        setUsers(users);
      } catch (error) {
        console.log(error.response.data.errors);
      }
      setLoading(false);
    };
    fetchData();
  }, []);


  const updateTicket = (e) => {
    e.preventDefault();
    console.log('ticketId: '+ticketToAssign.ticketId+ ' ' + 'userId :'+userId);
    TicketService.updateTicket(ticketToAssign, ticketToAssign.ticketId, userId)
      .then((response) => {
        navigate("/ticketListA");
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };


  const handleUsersChange = (e) => {
    const selectedUser = e.target.value;
    userId=selectedUser;
    console.log(userId);
    updateTicket(e);
  }

  return (
    <tr key={ticketToAssign.ticketId}>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticketToAssign.titre}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticketToAssign.description}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticketToAssign.category}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticketToAssign.localDate}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticketToAssign.status}</div>
      </td>
      <td className="text-center px-5 py-2 whitespace-nowrap font-medium text-sm">
          {!loading &&
          <select
            type="text"
            id="users"
            name="user"
            value={userId}
            onChange={(e) => handleUsersChange(e)}
            size="1"
            className="h-6 w-50 border mt-2 px-2 mx-16"
          >
            <option value={userId=ticketToAssign.plainUserDto.userId} defaultValue hidden >{ticketToAssign.plainUserDto.nom}</option>
            {users.map((user, index)=> (
              <option value={user.userId} user={user} key={index}>{user.nom}</option>
            ))
            }
          </select>
          }
        </td>
    </tr>
  );
};

export default TicketToAssign;
