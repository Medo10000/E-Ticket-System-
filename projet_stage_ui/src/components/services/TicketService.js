import axios from "axios";
import authHeader from './auth-header';
//import Select from 'react-select'                                   
                                        

const TICKET_API_BASE_URL = "http://localhost:8080/tickets";

class TicketService {
    saveTicket(ticket, userId){
        return axios.post(TICKET_API_BASE_URL+ "/user/" + userId, ticket, { headers: authHeader() });
    }

    getTickets(){
        return axios.get(TICKET_API_BASE_URL, { headers: authHeader() })
    }

    deleteTicket(ticketId, userId){
        return axios.delete(TICKET_API_BASE_URL + "/" + ticketId + "/users/" + userId, { headers: authHeader() });
    }
    
    getTicketById(ticketId) {
        return axios.get(TICKET_API_BASE_URL + "/" + ticketId, { headers: authHeader() });
    }
    
    updateTicket(ticket, ticketId, userId){
        return axios.put(TICKET_API_BASE_URL + "/" + ticketId + '/users/' + userId, ticket, { headers: authHeader() });
    }
    
    fetchTicketsByUser(userId){
        return axios.get(TICKET_API_BASE_URL + "/user" + "/" + userId, { headers: authHeader() });
    }
}

export default new TicketService();