import React from "react";
import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import TicketService from "../services/TicketService"; 
import UserService from "../services/UserService";
import TransferService from "../services/TransferService";
import AuthService from "../services/auth.service";

const TicketToTransfer = ({ticketToTransfer}) => {
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
        const response2 = await UserService.getUsersByRole(2);
        const users = response2.data;
        console.log(users);//}
        setUsers(users);
    
      } catch (error) {
        console.log(error.response.data.errors);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const [ticket, setTicket] = useState(); 
    const fetchTicket = (e) => {
      e.preventDefault();
      try{
        const response = TicketService.getTicketById(ticketToTransfer.ticketId);
        console.log("ticketToTransferId: "+ticketToTransfer.ticketId)
        setTicket(response.data);
      } catch(error) {
        console.log(error.response.data.errors);
      };
    };

    const [transfer, setTransfer] = useState({
            transferId: Number,
            localDate: [],
            plainRecepteurDto: {
                userId: Number,
                nom: "",
                prenom: "",
                email: "",
                numero: ""
            },
            ticketDto: {
                ticketId: Number(ticketToTransfer.ticketId),
                titre: "",
                description: "",
                category: "",
                localDate: [],
                status: "",
                plainUserDto: {
                    userId: Number,
                    nom: "",
                    prenom: "",
                    email: "",
                    numero: ""
                }
            }
    });

  const transferTicket = (e) => {
    e.preventDefault();
    console.log('ticketId: '+ticketToTransfer.ticketId+ ' ' + 'userId :'+userId);
    TransferService.saveTransfer(transfer, ticketToTransfer.ticketId, userId)
      .then((response) => {
        navigate("/ticketListD");
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };


  const handleUsersChange = (e) => {
    const selectedUser = e.target.value;
    userId=selectedUser;
    console.log('userId :'+userId);
    //fetchTicket(e);
    transferTicket(e);
  }

  const editTicket = (e, ticketId) => {
    e.preventDefault();
    navigate(`/traitementTicket/${ticketId}`);
  };

  return (
    <tr key={ticketToTransfer.ticketId}>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticketToTransfer.titre}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticketToTransfer.description}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticketToTransfer.category}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticketToTransfer.localDate}</div>
      </td>
      <td className="text-left px-5 py-2 whitespace-nowrap font-medium text-sm">
        <div className="text-gray-600">{ticketToTransfer.status}</div>
      </td>
      <td className="text-center px-5 py-2 whitespace-nowrap font-medium text-sm">
        <a
           onClick={(e, ticketId) => editTicket(e, ticketToTransfer.ticketId)}
          className="text-gray-600 hover:bg-yellow-500 bg-yellow-400 px-2 py-1 rounded-xl hover: cursor-pointer"
        >
          traiter
        </a>
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
            //onClick={fetchTicket}
          >
            <option value={ticketToTransfer.plainUserDto.userId} defaultValue hidden>{ticketToTransfer.plainUserDto.nom}</option>
            {users.map((user, index)=> (
              <option value={userId=user.userId} user={user} key={index}>{user.nom}</option>
            ))
            }
          </select>
          }
        </td>
    </tr>
  );
};

export default TicketToTransfer;
