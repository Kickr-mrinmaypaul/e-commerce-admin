'use client';

import React from 'react'
import { useForm } from "react-hook-form"
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';



export default function AddProduct() {

    const {register, handleSubmit, formState: {errors}} = useForm<any>();

    const onSubmit = async(data)=>{
        if(!data) return;
        console.log(data);
    }

  return (
    <div className='flex-1 flex flex-col min-h-0 pl-[15px] pr-[43px]'>
        <span className='text-[13px] text-[#000000] font-bold mt-[5px]'>Add New Products</span>
        <p className='text-[11px] text-[#6A717F]'>Create a new product listing</p>
        
        
        <form className='mt-[8px] mr-[213px]' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full flex flex-col '>
                <div className='w-full flex flex-row  p-4 bg-[#ffffff] rounded-sm'>
                    <div className='w-[60%] flex flex-col space-y-[21px]'>
                        <div className='w-[80%]'>
                            <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='productName'>Product Name*</Label>
                            <Input
                            className='bg-[#F3F5F7]'
                            placeholder='Enter product name'
                            {...register("productName",{required: "Product Name is Required."})}
                            />
                        </div> 
                        <div className='w-[80%] flex flex-row justify-between'>
                            <div>
                                <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='sku'>SKU*</Label>
                                <Input
                                className='bg-[#F3F5F7]'
                                placeholder='Enter SKU'
                                {...register("sku",{required: "SKU is Required."})}
                                />
                            </div>
                            <div>
                                <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='category'>Category*</Label>
                                <Input
                                className='bg-[#F3F5F7]'
                                placeholder='Enter Category'
                                {...register("category",{required: "category Name is Required."})}
                                />
                            </div>
                        </div>
                        <div className='w-full flex flex-row justify-between'>
                            <div>
                                <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='price'>Price*</Label>
                                <Input
                                className='bg-[#F3F5F7]'
                                placeholder='0.00'
                                {...register("category",{required: "Price is Required."})}
                                />
                            </div>
                            <div>
                                <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='discountedPrice'>Discounted Price*</Label>
                                <Input
                                className='bg-[#F3F5F7]'
                                placeholder='0.00'
                                {...register("discountedPrice",{required: "Discounted Price is Required."})}
                                />
                            </div>
                            <div>
                                <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='stockQuantity'>Stock Quantity</Label>
                                <Input
                                className='bg-[#F3F5F7]'
                                placeholder='0'
                                {...register("stockQuantity")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-[40%]'>
                        <div className='flex flex-col items-end pr-[30px]'>
                            <div className='flex flex-col space-y-1'>
                            <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='productImage'>Product Image*</Label>
                            <Input
                            placeholder='Upload Image'
                            className='bg-[#F3F5F7] h-[168px] w-[153px] placeholder:none rounded-sm'
                            type='file'
                            {...register("productImage", {required: "Product image is required."})}
                            />
                            <Button
                            className='rounded-none h-[22px] w-[155px] cursor-pointer bg-[#003BFF] hover:bg-[#003BFF] text-[#ffffff] text-[10px]'
                            >Upload Image</Button>
                            <Button
                            className='rounded-none cursor-pointer text-[13px] text-[#000000] h-[22px] w-[155px] border border-[#000000]'
                            variant="outline"
                            >Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-2 p-4 bg-[#ffffff] rounded-sm'>
                    <div className='flex flex-row w-[60%] ml-[21px] justify-between'>
                        <div className='flex flex-col items-center'>
                            <Input
                            
                            className='bg-[#F3F5F7] w-[116px] h-[108px]'
                            type='file'
                            {...register("image1")}
                            />
                            <Button
                            className='text-[10px] mt-[9px] h-[18px] w-[91px] text-[#464646] rounded-xs  border border-[#000000]'
                            variant="outline"
                            >
                                Upload Image
                            </Button>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Input
                            className='bg-[#F3F5F7] w-[116px] h-[108px]'
                            type='file'
                            {...register("image2")}
                            />
                            <Button
                            className='text-[10px] mt-[9px] h-[18px] w-[91px] text-[#464646] rounded-xs  border border-[#000000]'
                            variant="outline"
                            >
                                Upload Image
                            </Button>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Input
                            className='bg-[#F3F5F7] w-[116px] h-[108px]'
                            type='file'
                            {...register("image3")}
                            />
                            <Button
                            className='text-[10px] mt-[9px] h-[18px] w-[91px] text-[#464646] rounded-xs  border border-[#000000]'
                            variant="outline"
                            >
                                Upload Image
                            </Button>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Input
                            className='bg-[#F3F5F7] w-[116px] h-[108px]'
                            type='file'
                            {...register("image4")}
                            />

                            <Button
                            className='text-[10px] mt-[9px] h-[18px] w-[91px] text-[#464646] rounded-xs border border-[#000000]'
                            variant="outline"
                            >
                                Upload Image
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-row justify-end space-x-2 mt-2'>
                    <Button
                    className='flex bg-[#003BFF] text-[10px] text-[#ffffff] h-[18px] w-[164px] rounded-none'
                    >
                        Submit
                    </Button>

                    <Button
                    variant="outline"
                    className='flex bg-[#ffffff] text-[10px] text-[#000000] border border-[#000000] h-[18px] w-[164px] rounded-none'
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </form>
        
    </div>
  )
}
