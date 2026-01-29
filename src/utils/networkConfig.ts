

export const baseURL ="https://24df64jx-8000.inc1.devtunnels.ms/api/v1";


export const API_ENDPINTS = {
    login: "/admin/auth/login",

    orderManagement:{
        allOrders: "/admin/user/total-transaction",  // get all transaction details
        totalSales: "/admin/user/count-buyPrice",     // get total sales     
        bestSellingProducts: "/admin/user/best-selling-products",
    },
    product:{
        products: "/admin/product/all"    // get all products
    },
    customer:{
        users: "/admin/user/all"    // get all users
    }

}