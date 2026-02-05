import { API_ENDPINTS } from "@/utils/networkConfig";
import api from "@/utils/apiRequest";


const OrderManagementServices = {

    getAllOrders:(page: number)=> api.get(`${API_ENDPINTS.orderManagement.allOrders}?page=${page}`),
    toatlSales:()=> api.get(API_ENDPINTS.orderManagement.totalSales),
    bestSellingProducts:()=> api.get(API_ENDPINTS.orderManagement.bestSellingProducts),
    getAllOrdersData: ()=> api.get(API_ENDPINTS.orderManagement.getAllOrdersbyUser),
    getPendingOrders: ()=> api.get(API_ENDPINTS.orderManagement.pendingOrders),
    getCanceledOrders: ()=> api.get(API_ENDPINTS.orderManagement.canceledOrders),
    getCompletedOrder: ()=> api.get(API_ENDPINTS.orderManagement.completeOrder),
    getCompleteOrderDelivery: (page: number)=> api.get(`${API_ENDPINTS.orderManagement.completeDelivery}?page=${page}`),
}

export default OrderManagementServices;