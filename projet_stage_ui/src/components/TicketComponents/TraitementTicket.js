import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import RoleService from "../services/RoleService";
import TicketService from "../services/TicketService";
import SidebarD from "../sidebar/sidebarD";
import DropdownMenu from "../logout/DropdownMenu";
import AuthService from "../services/auth.service";

const TraitementTicket = () => {

  const { ticketId } = useParams();

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  const [ticket, setTicket] = useState({
    ticketId: Number,
    titre: "",
    description: "",
    category: "",
    localDate: new Date(),
    status: "",
    plainUserDto: {
        userId: Number,
        username: "",
        password: "",
        nom: "",
        prenom: "",
        email: "",
        numero: ""
    }
  });

  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await TicketService.getTicketById(ticketId);
        setTicket(response.data);
        console.log(ticket);
      }catch (error) {
        console.log(error.response.data.errors);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  
  const updateTicket = (e) => {
    e.preventDefault();
    let userId = ticket.plainUserDto.userId;
    console.log('ticketId: '+ticketId+ ' ' + 'userId :'+userId);
    TicketService.updateTicket(ticket, ticketId, userId)
      .then((response) => {
        const _currentUser = AuthService.getCurrentUser();
        if(_currentUser.roles[0] === 'ROLE_USER'){
          navigate("/ticketListC");
          window.location.reload();
        }else if(_currentUser.roles[0] === 'ROLE_DEV'){
          navigate("/ticketListD");
          window.location.reload();
        }else if(_currentUser.roles[0] === 'ROLE_ADMIN'){
          navigate("/ticketListA");
          window.location.reload();
      }
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  const naviguer = () => {
    const _currentUser = AuthService.getCurrentUser();
        if(_currentUser.roles[0] === 'ROLE_USER'){
          navigate("/ticketListC");
          window.location.reload();
        }else if(_currentUser.roles[0] === 'ROLE_DEV'){
          navigate("/ticketListD");
          window.location.reload();
        }else if(_currentUser.roles[0] === 'ROLE_ADMIN'){
          navigate("/ticketListA");
          window.location.reload();
      }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setTicket({ ...ticket, [e.target.name]: value });
  };
  

  return (
    <div className='flex bg-gray-100'>
    <SidebarD/>
    <div className="absolute top-10 right-10 h-16 ">
        <DropdownMenu/>
    </div>
    <div className="flex max-w-2xl shadow border-b m-auto bg-gray-100">
      <div className="px-8 py-8">
        <div className="font-semibold text-2xl tracking-wider text-gray-500">
          <h1>Traîter un ticket</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="text-gray-600 text-xl font-bold">Titre</label>
          <input
            type="text"
            name="titre"
            value={ticket.titre}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 mx-14 ml-24"
          />
        </div>
        <div className='items-center justify-center h-14 w-full my-4'>
                <label className='text-gray-600 text-xl font-bold absolute '>Description</label>
                {/*<input type="textarea" name='description' value={ticket.description} onChange={(e) => handleChange(e)} className='h-32 w-96 border mt-2 px-2 mx-8'/>*/}
                <textarea name='description' value={ticket.description} onChange={(e) => handleChange(e)} rows={5} cols={5} className='w-96 border mx-36 px-2 '/>
        </div>
        <div className="items-center justify-center h-14 w-full my-4 mt-20">
          <label className="text-gray-600 text-xl font-bold">Catégorie</label>
          <select
            type="text"
            id="category"
            name="category"
            value={ticket.category}
            onChange={(e) => handleChange(e)}
            size="1"
            className="h-10 w-96 border mt-2 px-2 mx-16 ml-12"
          >
              <option  hidden>-- Choisir une catégorie --</option>
              <option value={"Incident"}>Incident</option>
              <option value={"Problème"}>Problème</option>
              <option value={"Renseignement"}>Renseignement</option>
              <option value={"Réclamation"}>Réclamation</option>
          </select>
        </div>
        {/*<div className="items-center justify-center h-14 w-full my-4">
          <label className="text-gray-600 text-xl font-bold">Date</label>
          <input
            type="text"
            name="localDate"
            value={ticket.localDate}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 mx-8 ml-24"
          />
        </div>*/}
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="text-gray-600 text-xl font-bold">Statut</label>
          <select
            type="text"
            id="status"
            name="status"
            value={ticket.status}
            onChange={(e) => handleChange(e)}
            size="1"
            className="h-10 w-96 border mt-2 px-2 mx-16 ml-20"
          >
              <option  hidden>-- Choisir un statut --</option>
              <option value={"Nouveau"}>Nouveau</option>
              <option value={"En cours"}>En cours</option>
              <option value={"Résolu"}>Résolu</option>
              <option value={"Clôturé"}>Clôturé</option>
          </select>
        </div>
        <div className="items-center justify-center grid grid-cols-2 gap-4 h-14 w-full my-4">
          <button
            onClick={updateTicket}
            className=" bg-blue-500 hover:bg-blue-900 text-white font-semibold py-1 px-6"
          >
            Modifier
          </button>
          <button onClick={naviguer} 
          className=" bg-blue-500 hover:bg-blue-900 text-white font-semibold py-1 px-6">
            Annuler
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TraitementTicket;
