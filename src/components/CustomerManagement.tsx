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
  const [activeStatus, setActiveStatus] = useState("total");


  // const fetchAllUsers = async(currentPage = 1)=>{
  //   try {
  //     setLoading(true);
  //     const response = await CustomerServices.getAllUserOrderProducts(currentPage);
  //     setAllUsers(response?.data?.data);
  //     setTotalPages(response?.data?.totalPage);
  //     console.log("Get All Users resp:", response);
  //   } catch (error) {
  //     console.error(error);
  //   }finally{
  //     setLoading(false);
  //   }
  // }

  //   useEffect(()=>{
  //     console.log("Page hit:", page);
  //     fetchAllUsers(page);
  //   },[page])

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


    const normalizeOrders = (orders: any[]) => {
      return orders.map(o => ({
        id: o._id || o.id,
        orderId: o.orderId || "-",
        name: o.name,
        email: o.email,
        orders: o.totalOrders,
        moneySpend: o.totalAmountSpend,
        isActive: o.isActive ?? false,
        joined: o.createdAt || o.joined,
      }));
    };


      const fetchCustomerByStatus = async(status: string, currentPage = 1) =>{
        try {
          setLoading(true);
          let response;

          switch(status){
            case "total":
              response = await CustomerServices.getAllUserOrderProducts(currentPage);
              break;

            case "active":
              response = await CustomerServices.getAllUserPurchaedProducts(currentPage);
              break;

            case "revenue":
              response = await CustomerServices.getAllUserPurchaedProducts(currentPage);
              break;

            case "avg":
              response = await CustomerServices.getAllUserPurchaedProducts(currentPage);
              break;
          }


          const rawOrders =
          response?.data?.transactions ||
          response?.data?.data ||
          [];

          const formatted = normalizeOrders(rawOrders);

          console.log("Status change data:", response);
          
          setAllUsers(formatted);
          // setTotalPages(response?.data?.totalPage || 1);
          setTotalPages(response?.data?.totalPage);
          console.log("Get All Users resp:", response);
          setPage(response?.data?.page || currentPage);

        } catch (error) {
          console.error(error);
        }finally{
          setLoading(false);
      }
    }

  useEffect(() => {
  fetchCustomerByStatus(activeStatus, page);
}, [activeStatus, page]);

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
    { id:1, key:"total", label:"Total Costumers" },
    { id:2, key:"active", label:"Active costumers" },
    { id:3, key:"revenue", label:"Total Revenue" },
    { id:4, key:"avg", label:"Avg Order Value" },
  ];


  

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
          onClick={() => {
            setActiveStatus(item.key);
            setIsActive(item.label);
          }}
         
          className={`flex flex-col pl-[10px] pr-[156px] pt-[5px] pb-[10px]  items-start space-y-3 rounded-sm cursor-pointer ${isActive == item.label? 'bg-[#EAF8E7]' : 'bg-[#ffffff]'}`}
          key={item.id}
          >
            <span className='text-[15px] text-[#001409] font-medium'>{item.label}</span>
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
              key={user?.id}
              >
                <td className='py-1 pl-[11px]'>
                  <div className='flex flex-col gap-1'>
                    <span>{user?.name}</span>
                    <span>{user?.email}</span>
                  </div>
                  
                </td>
                <td className='py-1 pl-[11px]'>{user?.orders}</td>
                <td className='py-1 pl-[11px]'>₹{user?.moneySpend}</td>
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
