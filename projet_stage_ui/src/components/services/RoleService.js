import axios from "axios";
import authHeader from './auth-header';
//import Select from 'react-select' 

const ROLE_API_BASE_URL = "http://localhost:8080/roles";

class RoleService {
    saveRole(roleDto){
        return axios.post(ROLE_API_BASE_URL, roleDto, { headers: authHeader() });
    }

    getRoles(){
        return axios.get(ROLE_API_BASE_URL, { headers: authHeader() })
    }

    deleteRole(userId){
        return axios.delete(ROLE_API_BASE_URL + "/" + userId, { headers: authHeader() });
    }
    
    getRoleById(id) {
        return axios.get(ROLE_API_BASE_URL + "/" + id, { headers: authHeader() });
    }

    updateRole(roleDto, id){
        return axios.put(ROLE_API_BASE_URL + "/" + id, roleDto, { headers: authHeader() });
    }

    addUserToRole(roleId, userId){
        return axios.post(ROLE_API_BASE_URL + "/" + roleId + "/users/" + userId + "/add", { headers: authHeader() })
    }

    removeItemFromCart(roleId, userId){
        return axios.delete(ROLE_API_BASE_URL + "/" + roleId + "/users/" + userId + "/remove", { headers: authHeader() })
    }
}

export default new RoleService();