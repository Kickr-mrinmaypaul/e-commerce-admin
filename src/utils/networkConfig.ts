

export const baseURL ="https://24df64jx-8000.inc1.devtunnels.ms/api/v1";
//export const baseURL = "https://toyzbackend.kickrtechnology.in/api/v1";

export const API_ENDPINTS = {
    login: "/admin/auth/login",
    

    orderManagement:{
        allOrders: "/admin/user/total-transaction",  // get all transaction details
        totalSales: "/admin/user/count-buyPrice",     // get total sales     
        totalOrders: "/admin/user/",
        bestSellingProducts: "/admin/user/best-selling-products",
        getAllOrdersbyUser: "/admin/user/count-buyProducts",
        pendingOrders: "/admin/user/totalOrder-pending",
        canceledOrders: "/admin/user/totalOrder-cancelled",
        completeOrder: "/admin/user/total-order",
        completeDelivery: "/admin/notification/purchased-all",
        canceledOrderList: "admin/notification/cancel-order",
        areaChart: "/admin/user/order-graph",
    },
    product:{
        products: "/admin/product/all",    // get all products
        categories: "/admin/category/all",
        addCategories: "/admin/category/add",
        pendingProductsList: "/admin/notification/pending-all",
        getTotalCategory: "/admin/category/total",
        addProduct: "/admin/product/add",
        editCategories: "/admin/category/edit-category",
        deleteCategories: "/admin/category/delete",
        addBanner: "/admin/banner/add",
    },
    customer:{
        users: "/admin/user/all",    // get all users
        userPurchasedProducts: "/admin/user/count-money-order",
        userOrderProducts: "/admin/user/money-spend",
        countTotalUser: "/admin/user/count-user"
    }

}