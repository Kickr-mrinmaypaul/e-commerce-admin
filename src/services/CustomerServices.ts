import { API_ENDPINTS } from "@/utils/networkConfig";
import api from "@/utils/apiRequest";

const CustomerServices = {

    getAllUsers:()=> api.get(API_ENDPINTS.customer.users),

}

export default CustomerServices;