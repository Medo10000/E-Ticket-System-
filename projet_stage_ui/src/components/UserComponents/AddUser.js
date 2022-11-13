import React, { useState, useEffect } from 'react'
import { useParams, useNavigate} from "react-router-dom"
import userService from '../services/UserService';
import roleService from '../services/RoleService';
import SidebarA from '../sidebar/sidebarA';


const AddUser = () => {

    
    const [user, setUser] = useState({
        userId:Number,
        username:"",
        password:"",
        nom:"",
        prenom:"",
        email:"",
        numero:""
    });

    const navigaye = useNavigate();

const handleChange = (e) => {
    const value = e.target.value;
    setUser({...user, [e.target.name]: value});
};

    const [loading, setLoading] = useState(true);

    let { roleId } = useParams();

    const [roles, setRoles] = useState({
        roleId: parseInt(roleId),
        titre: ""
    }); 
    
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await roleService.getRoles();
                const roles = response.data;
                console.log(roles);
                setRoles(roles);
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        };
        fetchData();
    }, []);

      
    /*const rolesArray = [
        {id:"1", titre:"admin"},
        {id:"2", titre:"client"},
        {id:"3", titre:"developper"},
    ];*/

    const saveUser = (e) => {
        e.preventDefault();
        console.log("roleId:", roleId)
        userService.saveUser(user, roleId)
        .then((response) => {
            console.log(response);
            navigaye("/userList")
        }).catch((error) => {
            console.log(error.response.data.errors);
        })
    };


    const handleRolesChange = (e) => {
        const selectedRole = e.target.value;
        roleId=selectedRole
        console.log(roleId)
    }

  return (
    <div className='flex bg-gray-100'>
    <SidebarA/>
    <div className='flex max-w-2xl shadow border-b m-auto bg-gray-100 justify-between justify-items-center'>
        <div className='px-8 py-8'>
            <div className='font-semibold text-2xl tracking-wider text-gray-500'>
                <h1>Ajouter un nouveau utilisateur</h1>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='text-gray-500 text-xl font-bold w-10'>Username</label>
                <input type="text" name='username' value={user.username} onChange={(e) => handleChange(e)} className='h-10 w-96 border mt-2 px-2 mx-14'/>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='text-gray-500 text-xl font-bold w-10'>Password</label>
                <input type="password" name='password' value={user.password} onChange={(e) => handleChange(e)} className='h-10 w-96 border mt-2 px-2 mx-16'/>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='text-gray-500 text-xl font-bold w-10'>Nom</label>
                <input type="text" name='nom' value={user.nom} onChange={(e) => handleChange(e)} className='h-10 w-96 border mt-2 px-2 ml-28 mx-14'/>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='text-gray-500 text-xl font-bold '>Prénom</label>
                <input type="text" name='prenom' value={user.prenom} onChange={(e) => handleChange(e)} className='h-10 w-96 border mt-2 ml-20 px-2 mx-8'/>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='text-gray-500 text-xl font-bold w-10'>Email</label>
                <input type="email" name='email' value={user.email} onChange={(e) => handleChange(e)} className='h-10 w-96 border mt-2 ml-24 px-2 mx-14'/>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='text-gray-500 text-xl font-bold w-10'>Numéro</label>
                <input type="text" name='numero' value={user.numero} onChange={(e) => handleChange(e)} className='h-10 w-96 border mt-2 ml-20 px-2 mx-8'/>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='custom-select text-gray-500 text-xl font-bold'>Rôle</label>
                {!loading && 
                <select
            type="text"
            id="roles"
            name="role"
            value={roleId}
            onChange={(e) => handleRolesChange(e)}
            size="1"
            className="h-10 w-96 border mt-2 px-2 mx-16 ml-28"
          >
            <option value=''>--Choisir une option--</option>
            {roles.map((role, index)=> (
                <option value={role.id} role={role} key={index}>{role.name}</option>
            ))
            }
            {/*<option value={roleId="2"} key="2">Client</option>
            <option value={roleId="4"} key="3">Développeur</option>*/}
          </select>
          }
            </div>
            <div className='items-center justify-center h-14 w-full my-4 mt-10'>
                <button onClick={saveUser} className='block mx-auto bg-blue-500 hover:bg-blue-900 text-white font-semibold py-1 px-6'>Ajouter</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AddUser