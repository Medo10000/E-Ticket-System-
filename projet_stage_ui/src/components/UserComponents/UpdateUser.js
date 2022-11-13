import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import RoleService from "../services/RoleService";
import SidebarA from '../sidebar/sidebarA';
import AuthService from "../services/auth.service";

const UpdateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate()
  const [user, setUser] = useState({
    userId: parseInt(userId),
    nom: "",
    prenom: "",
    email: "",
    numero: "",
    plainRoleDto: {
      id: Number,
      titre: ""
    }
  });

  
  
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const [loading, setLoading] = useState(true);

  let {roleId} = useParams();
  const [roles, setRoles] = useState({
    id: parseInt(roleId),
    titre: ""
}); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UserService.getUserById(user.userId);
        console.log('userId: ' + user.userId);
        setUser(response.data);
        const response2 = await RoleService.getRoles();
        const roles = response2.data;
        console.log(roles);
        setRoles(roles);
      } catch (error) {
        console.log(error.response.data.errors);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  
  const updateUser = (e) => {
    e.preventDefault();
    console.log('userId: '+userId+ ' ' + 'roleId :'+roleId);
    UserService.updateUser(user, userId, roleId)
      .then((response) => {
        navigate("/userList");
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };


  const handleRolesChange = (e) => {
    const selectedRole = e.target.value;
    roleId=selectedRole;
    console.log(roleId);
  }

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

  return (
    <div className='flex bg-gray-100'>
    <SidebarA/>
    <div className="flex max-w-2xl shadow border-b m-auto bg-gray-100">
      <div className="px-8 py-8">
        <div className="font-semibold text-2xl tracking-wider text-gray-500">
          <h1>Modifier un utilisateur</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="text-gray-500 text-xl font-bold">Nom</label>
          <input
            type="text"
            name="nom"
            value={user.nom}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 mx-14"
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="text-gray-500 text-xl font-bold ">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={user.prenom}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 mx-8"
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="text-gray-500 text-xl font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 mx-14"
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="text-gray-500 text-xl font-bold">Numéro</label>
          <input
            type="text"
            name="numero"
            value={user.numero}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 mx-8"
          />
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="text-gray-500 text-xl font-bold">Rôle</label>
          {!loading &&
          <select
            type="text"
            id="roles"
            name="role"
            value={roleId}
            onChange={(e) => handleRolesChange(e)}
            size="1"
            className="h-10 w-96 border mt-2 px-2 mx-16"
          >
            <option value={roleId=user.plainRoleDto.id} defaultValue hidden>{user.plainRoleDto.titre}</option>
            {roles.map((role, index)=> (
              <option value={role.id} role={role} key={index}>{role.name}</option>
            ))
            }
          </select>
          }
        </div>
        <div className="items-center justify-center grid grid-cols-2 gap-4 h-14 w-full my-4">
          <button
            onClick={updateUser}
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

export default UpdateUser;
