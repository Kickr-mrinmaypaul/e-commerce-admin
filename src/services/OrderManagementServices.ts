import { API_ENDPINTS } from "@/utils/networkConfig";
import api from "@/utils/apiRequest";

const OrderManagementServices = {

    getAllOrders:(page: number)=> api.get(`${API_ENDPINTS.orderManagement.allOrders}?page=${page}`),
    toatlSales:()=> api.get(API_ENDPINTS.orderManagement.totalSales),
    bestSellingProducts:()=> api.get(API_ENDPINTS.orderManagement.bestSellingProducts),

}

export default OrderManagementServices;