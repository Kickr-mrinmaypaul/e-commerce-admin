'use client'

import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react';
import PaginationBtn from './button/PaginationBtn';
import CustomerServices from '@/services/CustomerServices';
import OrderManagementServices from '@/services/OrderManagementServices';


export default function CustomerManagement() {
  const [isActive, setIsActive] = useState("Total Costumers");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState({totalUser: 0, totalRevenue: 0});
  const [loadingData, setLoadingData] = useState(false);

  const fetchAllUsers = async(currentPage = 1)=>{
    try {
      setLoading(true);
      const response = await CustomerServices.getAllUserOrderProducts(currentPage);
      setAllUsers(response?.data?.data);
      setTotalPages(response?.data?.totalPage);
      console.log("Get All Users resp:", response);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

    useEffect(()=>{
      console.log("Page hit:", page);
      fetchAllUsers(page);
    },[page])

      const formatStatus = (status?: string) => {
      if (!status) return "";
      return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    };


    const fetchData = async()=>{
      try {
        setLoadingData(true);
        const [totalUserResp, totalRevenueResp] = await Promise.all([
          CustomerServices.getTotalUserCount(),
          OrderManagementServices.toatlSales(),
        ])
        setData({
          totalUser: totalUserResp?.data?.data,
          totalRevenue: totalRevenueResp?.data?.totalPrice,
        })
        console.log("Total user resp:", totalUserResp);
        console.log("Total revenue resp:", totalRevenueResp);
      } catch (error) {
        console.error(error);
      }finally{
        setLoadingData(false);
      }
    }

    useEffect(()=>{
      fetchData();
    },[]);

    const formatDate = (date?: string) => {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };

    const orders = [
  { "id": 1, "label": "CUSTOMERS " },
  { "id": 2, "label": "ORDERS" },
  { "id": 3, "label": "TOTAL SPENT" },
  { "id": 4, "label": "STATUS" },
  { "id": 5, "label": "JOINED" },
]

  const DataLabel = [
    { "id": 1, "label": "Total Costumers" , "data": "50000"},
    { "id": 2, "label": "Active costumers" , "data": "50000"},
    { "id": 3, "label": "Total Revenue", "data": "50000" },
    { "id": 4, "label": "Avg Order Value" , "data": "50000"},
  ]

  

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
      <span className='text-[13px] text-[#000000] font-bold mt-[5px]'>Costumer Management</span>
      <div className='flex flex-row justify-between mt-[14px]'>
        {DataLabel.map((item)=>(
          <div
          onClick={()=> setIsActive(item.label)}
          className={`flex flex-col pl-[5px] pr-[156px] pt-[5px] pb-[10px]  items-start space-y-3 rounded-sm cursor-pointer ${isActive == item.label? 'bg-[#EAF8E7]' : 'bg-[#ffffff]'}`}
          key={item.id}
          >
            <span className='text-[10px] text-[#001409] font-medium'>{item.label}</span>
            <span className='text-[15px] font-bold text-[#023337]'>
              {loadingData ? 'Loading...' : (
                item.id == 1 ? `${data.totalUser}` || 0 : 
                item.id == 2 ? `${data.totalRevenue}` || 0 :
                item.id == 3 ? `${data.totalRevenue}` || 0 :
                item.id == 4 ? `${data.totalRevenue}` || 0 : 0
              )}
            </span>
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
            {allUsers.map((user)=>(
              <tr
              className='text-[13px] font-medium text-[#000000] '
              key={user?._id}
              >
                <td className='py-1 pl-[11px]'>
                  <div className='flex flex-col gap-1'>
                    <span>{user?.name}</span>
                    <span>{user?.email}</span>
                  </div>
                  
                </td>
                <td className='py-1 pl-[11px]'>{user?.totalOrders}</td>
                <td className='py-1 pl-[11px]'>₹{user?.totalAmountSpend}</td>
                <td className='py-1 pl-[11px]'>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-1 w-1 rounded-full ${
                        user?.isActive ? "bg-green-500" : "bg-red-400"
                      }`}
                    ></span>
                    <span>
                      {user?.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td className='py-1 pl-[11px]'>{formatDate(user?.joined)}</td>
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
