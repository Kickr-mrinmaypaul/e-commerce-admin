'use client'

import React, { useEffect, useState } from 'react'
import OrderManagementServices from '@/services/OrderManagementServices';
import { Loader2 } from 'lucide-react';
import PaginationBtn from './button/PaginationBtn';
import { CiSearch } from 'react-icons/ci';
import FilterButton from './button/FilterButton';

export default function Transaction() {
  const [isActive, setIsActive] = useState("All Order");
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [transactionData, setTransactionData] = useState<any[]>([]);
  const [transactionFilters, setTransactionFilters] = useState<string>('');

  const transactionFilterLabel = [
  { label: "Completed", value: "paid" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Failed", value: "Failed" },

];


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let response;

        if (transactionFilters) {
          response = await OrderManagementServices.getFilteredTransaction(
            transactionFilters,
            page
          );
          setAllOrders(response?.data?.transactions || []);
          setTotalPages(response?.data?.totalPage || 1);
          console.log("Filtered transaction resp:", response);
        }

        else {
          response = await OrderManagementServices.getAllOrders(page);
          setAllOrders(response?.data?.transactions || []);
          setTotalPages(response?.data?.totalPage || 1);
          console.log("Total transaction response:", response);
        }

        console.log("Transactions resp:", response);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [page, transactionFilters]);


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
  { "id": 1, "label": "TRANSACTION" },
  { "id": 2, "label": "TYPE" },
  { "id": 3, "label": "STATUS" },
  { "id": 4, "label": "AMOUNT" },
  { "id": 5, "label": "DATE" },
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
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-col'>
          <span className='text-[13px] text-[#000000] font-bold mt-[5px]'>Transactions</span>
          <p className='text-[11px] text-[#6A717F]'>Track all financial transactions</p>
        </div>
        <div className='flex flex-row items-center gap-2'>
          <div className='flex flex-row items-center gap-2 bg-[#F9FAFB] px-3 py-0.5 rounded-md'>
              <CiSearch />
              <input
              className='placeholder:text-[14px] outline-none'
              placeholder='Search Transcation by id...' 
              type="text" />
          </div>
          <FilterButton
            options={transactionFilterLabel}
            value={transactionFilters}
            onSelect={(value)=>{
              setPage(1);
              setTransactionFilters(value);
            }}
          />
        </div>
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
                <td className='py-1 pl-[11px] text-[#7C7C7C]'>{order?.paymentMethod}</td>
                <td className={`py-1 pl-[11px]`} >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-1 w-1 rounded-full ${
                        order?.paymentStatus === "PAID"
                          ? "bg-green-500"
                          : order?.paymentStatus === "PENDING"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span>{formatStatus(order?.paymentStatus)}</span>
                  </div>
                {/* <li>{formatStatus(order?.paymentStatus)}</li> */}
                </td>
                <td className='py-1 pl-[11px]'>₹{order?.totalAmount}</td>
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
