import { API_ENDPINTS } from "@/utils/networkConfig";
import api from "@/utils/apiRequest";

const ProductServices = {

    getAllProducts:(page: number)=> api.get(`${API_ENDPINTS.product.products}?pages=${page}`),

}

export default ProductServices;