'use client'

import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import ProductServices from '@/services/ProductServices';
import { Loader2 } from 'lucide-react';


export interface FormType {
    categoryName: string,
    subCategory: string,
    description: string,
    categoryImage: FileList,
}

export default function AddCategories() {

    const {register, handleSubmit, formState: {errors}} = useForm<FormType>();
    const [loading, setLoading] = useState(false);

    const onSubmit  = async(data : FormType)=>{
        if(!data) return;
        console.log("form data:", data);
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", data.categoryName);
            formData.append("subName", data.subCategory);
            formData.append("description", data.description);

            // IMPORTANT: pick the first file
            formData.append("categoryImage", data.categoryImage[0]);
            
            const response = await ProductServices.addCategories(formData);
            console.log("Add categories response", response);
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className='flex-1 flex flex-col min-h-0 pl-[15px] pr-[43px]'>
        <span className='text-[14px] text-[#000000] font-bold mt-[5px]'>Add New Catergory</span>
        <p className='text-[12px] text-[#6A717F]'>Create a new Catergory</p>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col w-[60%] mt-[60px] ml-[30px] bg-[#ffffff] rounded-sm shadow-md py-[12px] px-[15px]'>
                <div className='w-full flex flex-row justify-between'>
                    <div className='w-[70%] flex flex-col'>
                        <div>
                            <Label className='text-[15px] text-[#000000] font-bold mb-[14px]' htmlFor='categoryName'>Category Name*</Label>
                            <Input 
                            id='categoryName'
                            type='text'
                            className='bg-[#F3F5F7] mb-[21px]'
                            placeholder='Enter Category Name'
                            {...register("categoryName", {required: "Category Name is requird."})}
                            />
                            {errors?.categoryName && (<p className='text-sx text-red-500'>{errors?.categoryName?.message}</p>)}
                        </div>
                        <div>
                            <Label className='text-[15px] text-[#000000] font-bold mb-[14px]' htmlFor='subCategory'>Sub-Category*</Label>
                            <Input 
                            id='subCategory'
                            type='text'
                            className='bg-[#F3F5F7]  mb-[21px]'
                            placeholder='Enter Sub-Category Name'
                            {...register("subCategory", {required: "subCategory is requird."})}
                            />
                            {errors?.subCategory && (<p className='text-sx text-red-500'>{errors?.subCategory?.message}</p>)}
                        </div>
                        <div className='w-full'>
                            <Label className='text-[15px] text-[#000000] font-bold mb-[14px]' htmlFor='description'>Description*</Label>
                            <textarea 
                            id='description'
                            rows={4}
                            className='bg-[#F3F5F7]  mb-[21px] w-full placeholder:ml-2 border rounded-sm'
                            placeholder='Enter Discription'
                            {...register("description", {required: "description is requird."})}
                            />
                            {errors?.description && (<p className='text-sx text-red-500'>{errors?.description?.message}</p>)}
                        </div>
                    </div>
                    <div className=' flex-1 flex-col'>
                        <div className='flex flex-col items-center '>
                            <Label htmlFor='categoryImage' className='text-[15px] text-[#000000] font-bold'>Category Image*</Label>
                            <Input
                            id='categoryImage'
                            className='bg-[#F3F5F7] w-[153px] h-[168px] '
                            type='file'
                            {...register("categoryImage", {required: "categoryImage is requird."})}
                            />
                            {errors?.categoryImage && (<p className='text-sx text-red-500'>{errors?.categoryImage?.message}</p>)}

                            <Button
                            type='button'
                            className='bg-[#003BFF] hover:bg-[#003BFF] mt-[10px] w-[153px] h-[26px] rounded-none text-[13px] cursor-pointer'
                            >
                                Upload Image
                            </Button>

                            <Button
                            type='button'
                            className='bg-[#ffffff] hover:bg-[#ffffff] mt-[10px] w-[153px] h-[26px] border border-[#000000] rounded-none text-[#000000] text-[13px] cursor-pointer'
                            >
                                Cancel
                            </Button>

                        </div>
                    </div>
                    
                </div>
                <div className='w-[70%] flex flex-row gap-2'>
                    <Button
                    type='submit'
                    disabled={loading}
                    className='w-[45%] bg-[#003BFF] hover:bg-[#003BFF] mt-[10px]  h-[26px] rounded-none text-[13px] cursor-pointer'
                    >
                        {loading && <Loader2 className="animate-spin h-4 w-4 text-white" />}
                        {loading ? "Submitting..." : "Submit"}
                    </Button>

                    <Button
                    disabled={loading}
                    className='w-[45%] bg-[#ffffff] hover:bg-[#ffffff] mt-[10px] h-[26px] border border-[#000000] rounded-none text-[#000000] text-[13px] cursor-pointer'
                    >Cancel</Button>
                </div>
            </div>
            
        </form>
    </div>
  )
}
