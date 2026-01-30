import { API_ENDPINTS } from "@/utils/networkConfig";
import api from "@/utils/apiRequest";
import {FormType} from '@/components/AddCategories'

const ProductServices = {

    getAllProducts:(page: number)=> api.get(`${API_ENDPINTS.product.products}?pages=${page}`),
    getAllCategories:(page: number)=> api.get(`${API_ENDPINTS.product.categories}?pages=${page}`),
    addCategories:(formData: FormData)=> api.post(API_ENDPINTS.product.addCategories, formData),
}

export default ProductServices;