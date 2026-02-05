import { API_ENDPINTS } from "@/utils/networkConfig";
import api from "@/utils/apiRequest";
import {FormType} from '@/components/AddCategories'

const ProductServices = {

    getAllProducts:(page: number)=> api.get(`${API_ENDPINTS.product.products}?page=${page}`),
    getAllCategories:(page: number)=> api.get(`${API_ENDPINTS.product.categories}?page=${page}`),
    addCategories:(formData: FormData)=> api.post(API_ENDPINTS.product.addCategories, formData),
    getPendingProducts: (page: number)=> api.get(`${API_ENDPINTS.product.pendingProductsList}?page=${page}`), 
    getTotalCategory: ()=> api.get(API_ENDPINTS.product.getTotalCategory),
    addProduct: (data: FormData)=> api.post(API_ENDPINTS.product.addProduct, data),
    editCategories: (id: string)=> api.put(`${API_ENDPINTS.product.editCategories}/${id}`),
    deleteCategories: (id: string) => api.delete(`${API_ENDPINTS.product.deleteCategories}/${id}`),
    searchProducts: (search: string)=> api.get(`${API_ENDPINTS.product.products}?search=${search}`),
    getCategoryById: (id: string)=> api.get(`${API_ENDPINTS.product.categories}/${id}`),
    editCategory: ()=> api.post(``),
}

export default ProductServices;