import axios from "axios";
import authHeader from './auth-header';

const TRANSFER_API_BASE_URL = "http://localhost:8080/transfers";

class TransferService{
    saveTransfer(transfer, ticketId, userId){
        return axios.post(TRANSFER_API_BASE_URL+ "/user/" + userId + "/ticket/" + ticketId, transfer, { headers: authHeader() });
    }
    getTransfers(){
        return axios.get(TRANSFER_API_BASE_URL, { headers: authHeader() })
    }
    deleteTransfer(transferId){
        return axios.delete(TRANSFER_API_BASE_URL + "/" + transferId, { headers: authHeader() });
    }
}
export default new TransferService();