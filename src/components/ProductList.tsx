'use client'

import React, { useEffect, useState } from 'react'
import OrderManagementServices from '@/services/OrderManagementServices';
import { Loader2 } from 'lucide-react';
import PaginationBtn from './button/PaginationBtn';
import { Button } from './ui/button';
import { FaPlus } from "react-icons/fa6";
import ProductServices from '@/services/ProductServices';

export default function ProductList() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  const fetchAllProducts = async(currentPage = 1)=>{
    try {
      setLoading(true);
      const response = await ProductServices.getAllProducts(currentPage);
      setAllProducts(response?.data?.data);
      setTotalPages(response?.data?.totalPage);
      setPage(response?.data?.pageNo);
      console.log("Get All Products resp:", response);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

    useEffect(()=>{
      fetchAllProducts(page);
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
  { "id": 1, "label": "PRODUCT" },
  { "id": 2, "label": "SKU" },
  { "id": 3, "label": "CATEGORY" },
  { "id": 4, "label": "PRICE" },
  { "id": 5, "label": "STOCK" },
  { "id": 6, "label": "STATUS" }
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
      <div className='w-full flex flex-row items-center justify-between'>
        <div className='flex flex-col'>
            <span className='text-[13px] text-[#000000] font-bold mt-[5px]'>Product List</span>
            <p className='text-[11px] text-[#6A717F]'>View and manage all products</p>
        </div>
        <div>
            <Button
            className='h-[28px] w-[101px] gap-1 items-center rounded-sm text-[13px] text-[#ffffff] bg-[#003BFF] hover:bg-[#1346f0] cursor-pointer'
            >   
                <FaPlus className='p-0.5'/>
                Add Product
                
            </Button>
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
            {allProducts.map((product)=>(
              <tr
              className='text-[13px] font-medium text-[#000000] '
              key={product?._id}
              >
                <td className='py-1 pl-[11px]'>
                    <div className="flex items-center gap-2">
                        <img
                            src={product?.productImage[0]}
                            alt={product?.name}
                            className="h-[63px] w-[82px] object-contain"
                        />
                        <span className="truncate max-w-[160px] text-[18px] text-[#023337] font-semibold">
                            {product?.name}
                        </span>
                    </div>

                </td>
                <td className='py-1 pl-[11px] text-[#00000061]'>{product?.stock}</td>
                <td className='py-1 pl-[11px] '>{product?.category?.name}</td>
                <td className='py-1 pl-[11px]'>₹{product?.finalPrice}</td>
                <td className='py-1 pl-[11px] text-[#00000061]'>{product?.stock}</td>
                <td className='py-1 pl-[11px]'>{formatDate(product?.createdAt)}</td>
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
