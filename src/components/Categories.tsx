'use client';

import React, { useEffect, useState } from 'react'
import ProductServices from '@/services/ProductServices';
import Link from 'next/link';
import { Button } from './ui/button';
import { FaPlus } from 'react-icons/fa6';
import PaginationBtn from './button/PaginationBtn';
import { Loader2 } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form"

export default function Categories() {
  const[loading, setLoading] = useState(false);
  const[page, setPage] = useState(1);
  const[totalPages, setTotalPages] = useState(1);
  const[categories, setCategories] = useState([]);
  const[openCategoryModal, setOpenCategoryModal] = useState(false);

  const {register, handleSubmit, formState: {errors}} = useForm();

  const fetchCategories = async (currentPage = 1)=>{
    try {
      setLoading(true);
      const response = await ProductServices.getAllCategories(currentPage);
      setCategories(response?.data?.data)
      setPage(response?.data?.pagination?.page)
      setTotalPages(response?.data?.pagination?.totalPages);
      console.log("get categories resp:", response);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchCategories(page);
  },[page])



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
            <span className='text-[13px] text-[#000000] font-bold mt-[5px]'>Categories</span>
            <p className='text-[11px] text-[#6A717F]'>Organize your products into categories...</p>
        </div>
        <div className='mt-[19px]'>

          <Link href={'/categories/add-categories'}>
            <Button
          className='h-[28px] w-[101px]  gap-1 items-center rounded-sm text-[12px] text-[#ffffff] bg-[#003BFF] hover:bg-[#1346f0] cursor-pointer'
          >   
            <FaPlus className='p-0.5'/>
            Add Category
            
          </Button>
          </Link>
        </div>
      </div>
        <div className='w-[80%] grid grid-cols-2 gap-y-[29px] mt-[59px]'>
          {categories.map((item)=>(
            <div
            className='flex flex-col w-[95%] h-[224px] gap-x-[18px] bg-[#EAF8E7]  p-[7px]'
            key={item._id}
            >
              <div className='flex flex-row justify-end gap-2'>
                <button className='cursor-pointer'><img src="/icon/edit.png" alt="edit" /></button>
                <button className='cursor-pointer'><img src="/icon/delete.png" alt="delete" /></button>
              </div>
              <div>
                <span className='text-[#023337] text-[24px] font-semibold'>{item?.subName}</span>
                <span></span>
              </div>
            </div>
          ))}
        </div>
        <div className='w-full flex  justify-center items-center'>
            <PaginationBtn
                page={page}
                totalPages={totalPages}
                onPrev={() => setPage(prev => Math.max(prev - 1, 1))}
                onNext={() => setPage(prev => Math.min(prev + 1, totalPages))}
            />
        </div>
        {/* {openCategoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            
            <div className="bg-white w-[602px] rounded-2xl p-6 shadow-lg flex flex-col gap-4 border border-[#949494]">
              <div className='flex flex-row justify-between items-center mb-[29px]'>
                <span className="text-[24px] text-[#000000] font-semibold text-center">
                  Add New Category
                </span>
                <button
                onClick={()=> setOpenCategoryModal(false)}
                className='h-[32px] cursor-pointer'
                ><RxCross2/></button>
              </div>

              <div className="flex flex-col gap-1">
                <Label className='text-[20px] text-[#000000]'>Category Name</Label>
                <Input 
                className='mt-[17px]'
                placeholder="Enter Category Name " />
              </div>

              <div className="flex flex-col gap-1 mt-[19px]">
                <Label className='text-[20px] text-[#000000]'>Description</Label>
                <Input 
                className='mt-[17px]'
                placeholder="Enter Description " />
              </div>
              <div className='w-full'>
                <Button

                className='w-full bg-[#003BFF] hover:bg-[#003BFF] cursor-pointer text-[#ffffff] text-[15px]' 
                >Add Category</Button>
              </div>
            </div>

          </div>
        )} */}
    </div>
  )
}
