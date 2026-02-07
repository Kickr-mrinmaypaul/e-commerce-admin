'use client'

import React, { useEffect, useState } from 'react'
import OrderManagementServices from '@/services/OrderManagementServices';
import { Loader2 } from 'lucide-react';
import PaginationBtn from './button/PaginationBtn';
import ProductServices from '@/services/ProductServices';

type DashboardStats = {
  totalOrders: number;
  pending: number;
  canceled: number;
  complete: number;
};

export default function OrderManagement() {
  const [isActive, setIsActive] = useState("All Order");
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState();
  const [stats, setStats] = useState<DashboardStats>({totalOrders: 0, pending: 0, canceled: 0, complete: 0});
  const [loadingToalSales, setLoadingTotalSales] = useState(false);
  const [activeStatus, setActiveStatus] = useState<string>("all");

  const statusColor: Record<string, string> = {
  DELIVERED: "bg-green-500",
  SHIPPED: "bg-yellow-500",
  PENDING: "bg-blue-500",
  PROCESSING: "bg-purple-500",
  CANCELLED: "bg-red-500",
};

  const orders = [
  { "id": 1, "label": "Order" },
  { "id": 2, "label": "Customer" },
  {"id": 3, "label": "Payment Status"},
  { "id": 4, "label": "Items" },
  { "id": 5, "label": "Amount" },
  { "id": 6, "label": "Order Status" },
  { "id": 7, "label": "Date" }
]

  const DataLabel = [
  { id: 1, label: "All Order", key: "all" },
  { id: 2, label: "Pending", key: "pending" },
  // { id: 3, label: "Processing", key: "processing" },
  { id: 4, label: "Canceled", key: "canceled" },
  { id: 5, label: "Completed", key: "completed" },
];


  const normalizeOrders = (orders: any[]) => {
  return orders.map((o) => ({
    id: o._id || o.id,

    orderId: o.orderId || o.transactionId || "-",

    customer:
      o.user?.email ||
      o.userEmail ||
      o.customerEmail ||
      "-",

    type:
      o.paymentMethod ||
      o.paymentStatus ||
      "-",

    items: o.items?.length ||o.quantity || 0,

    amount: o.totalAmount || o.amount || 0,

    status: o.orderStatus || o.status || "-",

    date: o.createdAt || o.purchasedAt || o.date,
  }));
};


  const fetchOrdersByStatus = async(status: string, currentPage = 1) =>{
    try {
      setLoading(true);
      let response;

      switch(status){
        case "all":
          response = await OrderManagementServices.getAllOrders(currentPage);
          break;
        case "pending":
          response = await ProductServices.getPendingProducts(currentPage);
          break;
        case "canceled":
          response = await OrderManagementServices.getCanceledOrderList(currentPage);
          break;  
        case "completed":
          response = await OrderManagementServices.getCompleteOrderDelivery(currentPage);
          break;

        default:
        response = await OrderManagementServices.getAllOrders(currentPage);
        break;

      }

       const rawOrders =
      response?.data?.transactions ||
      response?.data?.data ||
      [];

      const formatted = normalizeOrders(rawOrders);

      console.log("Status change data:", response);
      // setAllOrders(response?.data?.transactions || response?.data?.data);
      // setTotalPages(response?.data?.totalPage || 1);
      // setPage(response?.data?.page || currentPage);
      setAllOrders(formatted);
      setTotalPages(response?.data?.totalPage || 1);
      setPage(response?.data?.page || currentPage);

      
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
  fetchOrdersByStatus(activeStatus, page);
}, [activeStatus, page]);

  // const fetchAllOrders = async(currentPage = 1)=>{
  //   try {
  //     setLoading(true);
  //     const response = await OrderManagementServices.getAllOrders(currentPage);
  //     setAllOrders(response?.data?.transactions);
  //     setTotalPages(response?.data?.totalPage);
  //     setPage(response?.data?.page);

  //     console.log("Get All Orders resp:", response);
  //   } catch (error) {
  //     console.error(error);
  //   }finally{
  //     setLoading(false);
  //   }
  // }

  //   useEffect(()=>{
  //     fetchAllOrders(page);
  //   },[page])

      const formatStatus = (status?: string) => {
      if (!status) return "";
      return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    };

    const formatDate = (date?: string) => {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };


    const fetchTotalOrders = async ()=>{
      try {
        const response = await OrderManagementServices.getAllOrdersData();
        console.log("total orders data:", response);
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(()=>{
      fetchTotalOrders();
    },[])

    const fetchDahboardData = async()=>{
        try {
            setLoadingTotalSales(true);
            const [orders, pending, canceled, complete] = await Promise.all([
                OrderManagementServices.getAllOrdersData(),
                OrderManagementServices.getPendingOrders(),
                OrderManagementServices.getCanceledOrders(),
                OrderManagementServices.getCompletedOrder(),
            ])
            console.log('Total Orders:', orders);
            console.log("Total pending:", pending);
            console.log("Total canceled:", canceled);
            setStats({
                totalOrders: orders?.data?.data?.totalOrders,
                pending: pending?.data?.total,
                canceled: canceled?.data?.total,
                complete: complete?.data?.totalOrder,
            })
        } catch (error) {
            console.error(error);
        }finally{
            setLoadingTotalSales(false);
        }
    }

    useEffect(()=>{
        fetchDahboardData();
    },[])


  if(loading){
    return(
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500"/>
        <h3 className="text-sm font-semibold text-blue-500">Loading...</h3>
      </div>
    )
  }

  return (
    <div className='flex-1 flex flex-col min-h-0 pl-[15px] pr-[43px]'>
      <span className='text-[13px] text-[#000000] font-bold mt-[5px]'>Order Management</span>
      <div className='flex flex-row justify-between mt-[14px]'>
        {DataLabel.map((item)=>(
          <div
          onClick={()=> {
            setActiveStatus(item.key)
            setPage(1);
          }}
          className={`flex flex-col pl-[10px] pr-[156px] pt-[5px] pb-[10px]  items-start space-y-3 rounded-sm cursor-pointer ${activeStatus === item.key ? 'bg-[#EAF8E7]' : 'bg-[#ffffff]'}`}
          key={item.id}
          >
            <span className='text-[15px] text-[#001409] font-medium'>{item.label}</span>
            <span className='text-[15px] font-bold text-[#023337]'>{loadingToalSales ? "Loading..." : 
              (item.id === 1 ? `${stats?.totalOrders}` :
              item.id === 2 ? `${stats?.pending}` :
              item.id === 3 ? `${stats?.canceled}`:
              item.id === 4 ? `${stats?.canceled}`:
              item.id === 5 ? `${stats?.complete}`:
              0)}</span>
            {/* <span className='text-[15px] font-bold text-[#023337]'>{orderStats[item.key]}</span> */}

          </div>
        ))}
      </div>
      <div className='w-full bg-[#ffffff] mt-[13px] p-4 rounded-sm'>
        <table className='w-full border-separate border-spacing-y-3 '>
          <thead>
            <tr
            className='shadow-sm'
            >
              {orders.map((col)=>(
                <th
                className='pl-[11px] text-start text-[16px] text-[#7C7C7C] font-medium py-1'
                key={col.id}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order)=>(
              <tr
              className='shadow-sm text-[13px] font-medium text-[#000000] '
              key={order?.id}
              >
                <td className='py-1 pl-[11px]'>{order?.orderId }</td>
                <td className='py-1 pl-[11px]'>{order?.customer}</td>
                <td className='py-1 pl-[11px]'>{order?.type}</td>
                <td className='py-1 pl-[11px] text-[#00000061]'>{order.items} items</td>
                <td className='py-1 pl-[11px]'>₹{order?.amount}</td>
                <td className='py-1 pl-[11px]'>
                  <div className="flex items-center gap-2">
                    {/* <span
                      className={`inline-block h-1 w-1 rounded-full ${
                        order?.status === "DELIVERED"
                          ? "bg-green-500"
                          : order?.status === "SHIPPED"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    /> */}
                    <span
                      className={`inline-block h-1 w-1 rounded-full ${
                        statusColor[order?.status] || "bg-gray-400"
                      }`}
                    />
                    <span>{formatStatus(order?.status)}</span>
                  </div>
                </td>
                <td className='py-1 pl-[11px]'>{formatDate(order.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='w-full flex  justify-center items-center'>
            <PaginationBtn
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage(prev => Math.max(prev - 1, 1))}
            onNext={() => setPage(prev => Math.min(prev + 1, totalPages))}
          />
        </div>
      </div>
    </div>
  )
}
