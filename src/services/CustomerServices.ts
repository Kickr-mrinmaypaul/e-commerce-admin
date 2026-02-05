import { API_ENDPINTS } from "@/utils/networkConfig";
import api from "@/utils/apiRequest";

const CustomerServices = {

    getAllUsers:()=> api.get(API_ENDPINTS.customer.users),
    getAllUserOrderProducts: (page: number)=> api.get(`${API_ENDPINTS.customer.userOrderProducts}?page=${page}`),
    getTotalUserCount: ()=> api.get(API_ENDPINTS.customer.countTotalUser),
}

export default CustomerServices;