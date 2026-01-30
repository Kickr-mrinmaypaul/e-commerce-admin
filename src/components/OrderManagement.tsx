'use client'

import React, { useEffect, useState } from 'react'
import OrderManagementServices from '@/services/OrderManagementServices';
import { Loader2 } from 'lucide-react';
import PaginationBtn from './button/PaginationBtn';


export default function OrderManagement() {
  const [isActive, setIsActive] = useState("All Order");
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const fetchAllOrders = async(currentPage = 1)=>{
    try {
      setLoading(true);
      const response = await OrderManagementServices.getAllOrders(currentPage);
      setAllOrders(response?.data?.transactions);
      setTotalPages(response?.data?.totalPage);
      setPage(response?.data?.page);

      console.log("Get All Orders resp:", response);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

    useEffect(()=>{
      fetchAllOrders(page);
    },[page])

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

    const orders = [
  { "id": 1, "label": "Order" },
  { "id": 2, "label": "Customer" },
  {"id": 3, "label": "Type"},
  { "id": 4, "label": "Items" },
  { "id": 5, "label": "Amount" },
  { "id": 6, "label": "Status" },
  { "id": 7, "label": "Date" }
]

  const DataLabel = [
    { "id": 1, "label": "All Order" , "data": "50000"},
    { "id": 2, "label": "pending" , "data": "50000"},
    { "id": 3, "label": "Processing", "data": "50000" },
    { "id": 4, "label": "Shipped" , "data": "50000"},
    { "id": 5, "label": "Completed" , "data": "50000"},
  ]

    //   const DataLabel = [
    //   { id: 1, label: "All Orders", key: "all" },
    //   { id: 2, label: "Pending", key: "pending" },
    //   { id: 3, label: "Processing", key: "processing" },
    //   { id: 4, label: "Shipped", key: "shipped" },
    //   { id: 5, label: "Completed", key: "completed" },
    // ];

    // const ordersData = allOrders?.data?.transactions || [];

    // const orderStats = {
    //   all: ordersData.length,
    //   pending: ordersData.filter(o => o.orderStatus.toLowerCase() === "pending").length,
    //   processing: ordersData.filter(o => o.orderStatus.toLowerCase() === "processing").length,
    //   shipped: ordersData.filter(o => o.orderStatus.toLowerCase() === "shipped").length,
    //   completed: ordersData.filter(o => o.orderStatus.toLowerCase() === "completed").length,
    // };

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
          onClick={()=> setIsActive(item.label)}
          className={`flex flex-col pl-[5px] pr-[156px] pt-[5px] pb-[10px]  items-start space-y-3 rounded-sm cursor-pointer ${isActive == item.label? 'bg-[#EAF8E7]' : 'bg-[#ffffff]'}`}
          key={item.id}
          >
            <span className='text-[10px] text-[#001409] font-medium'>{item.label}</span>
            <span className='text-[15px] font-bold text-[#023337]'>{item.data}</span>
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
              key={order?._id}
              >
                <td className='py-1 pl-[11px]'>{order?.orderId}</td>
                <td className='py-1 pl-[11px]'>{order?.user}</td>
                <td className='py-1 pl-[11px]'>{order?.paymentMethod}</td>
                <td className='py-1 pl-[11px] text-[#00000061]'>{order?.items?.length} items</td>
                <td className='py-1 pl-[11px]'>₹{order?.totalAmount}</td>
                <td className='py-1 pl-[11px]'>{formatStatus(order?.orderStatus)}</td>
                <td className='py-1 pl-[11px]'>{formatDate(order?.createdAt)}</td>
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
