import axios from "axios";
import authHeader from './auth-header';
//import Select from 'react-select'                                   
                                        

const USER_API_BASE_URL = "http://localhost:8080/users";

class UserService {
    saveUser(user, roleId){
        return axios.post(USER_API_BASE_URL+ "/" + roleId, user, { headers: authHeader() });
    }

    getUsers(){
        return axios.get(USER_API_BASE_URL, { headers: authHeader() })
    }

    getUsersByRole(roleId){
        return axios.get(USER_API_BASE_URL + "/role/" + roleId, { headers: authHeader() })
    }

    deleteUser(userId, roleId){
        return axios.delete(USER_API_BASE_URL + "/" + userId + "/roles/" + roleId, { headers: authHeader() });
    }
    
    getUserById(userId) {
        return axios.get(USER_API_BASE_URL + "/" + userId, { headers: authHeader() });
    }
    
    updateUser(user, userId, roleId){
        return axios.put(USER_API_BASE_URL + "/" + userId + '/roles/' + roleId, user, { headers: authHeader() });
    }
}

export default new UserService();