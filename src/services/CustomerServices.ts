import { API_ENDPINTS } from "@/utils/networkConfig";
import api from "@/utils/apiRequest";

const CustomerServices = {

    getAllUsers:()=> api.get(API_ENDPINTS.customer.users),
    getAllUserPurchaedProducts: (page: number)=> api.get(`${API_ENDPINTS.customer.userPurchasedProducts}?page=${page}`),
    getAllUserOrderProducts: (page: number)=> api.get(`${API_ENDPINTS.customer.userOrderProducts}?page=${page}`),
    getTotalUserCount: ()=> api.get(API_ENDPINTS.customer.countTotalUser),
}

export default CustomerServices;