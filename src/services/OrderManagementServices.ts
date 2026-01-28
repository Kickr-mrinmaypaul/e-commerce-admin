import { API_ENDPINTS } from "@/utils/networkConfig";
import api from "@/utils/apiRequest";

const OrderManagementServices = {

    getAllOrders:()=> api.get(API_ENDPINTS.orderManagement.allOrders),

}

export default OrderManagementServices;