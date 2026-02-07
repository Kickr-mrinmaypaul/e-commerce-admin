import { API_ENDPINTS } from "@/utils/networkConfig";
import api from "@/utils/apiRequest";


const OrderManagementServices = {

    getAllOrders:(page: number)=> api.get(`${API_ENDPINTS.orderManagement.allOrders}?page=${page}`),
    toatlSales:()=> api.get(API_ENDPINTS.orderManagement.totalSales),
    bestSellingProducts:()=> api.get(API_ENDPINTS.orderManagement.bestSellingProducts),
    getAllOrdersData: ()=> api.get(API_ENDPINTS.orderManagement.getAllOrdersbyUser),
    getPendingOrders: ()=> api.get(API_ENDPINTS.orderManagement.pendingOrders),
    getCanceledOrders: ()=> api.get(API_ENDPINTS.orderManagement.canceledOrders),
    getCanceledOrderList: (page: number)=> api.get(`${API_ENDPINTS.orderManagement.canceledOrderList}?page=${page}`),
    getCompletedOrder: ()=> api.get(API_ENDPINTS.orderManagement.completeOrder),
    getCompleteOrderDelivery: (page: number)=> api.get(`${API_ENDPINTS.orderManagement.completeDelivery}?page=${page}`),
    areaChartGraph: ()=> api.get(`${API_ENDPINTS.orderManagement.areaChart}`),
    getFilteredTransaction:(filter: string, page: number)=> api.get(`${API_ENDPINTS.orderManagement.allOrders}?page=${page}&status=${filter}`),
}

export default OrderManagementServices;