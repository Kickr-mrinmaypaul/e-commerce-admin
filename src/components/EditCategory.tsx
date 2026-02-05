'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import ProductServices from '@/services/ProductServices';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner"
import { useRouter, useParams } from 'next/navigation';

export interface FormType {
    categoryName: string,
    subCategory: string,
    description: string,
    categoryImage?: FileList,
}

export default function EditCategory() {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<FormType>();
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [existingImage, setExistingImage] = useState<string>('');
    const router = useRouter();
    const params = useParams<{ id: string }>()
    const categoryId = params.id; // Get category ID from URL

    // Fetch existing category data
    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                setFetchingData(true);
                const response = await ProductServices.getCategoryById(categoryId);
                
                if (response?.data?.success) {
                    const category = response.data.category;
                    // Pre-fill form fields
                    setValue('categoryName', category.name);
                    setValue('subCategory', category.subName);
                    setValue('description', category.description);
                    setExistingImage(category.categoryImage); // Store existing image URL
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch category data");
            } finally {
                setFetchingData(false);
            }
        };

        if (categoryId) {
            fetchCategoryData();
        }
    }, [categoryId, setValue]);

    const onSubmit = async(data: FormType) => {
        if(!data) return;
        console.log("form data:", data);
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", data.categoryName);
            formData.append("subName", data.subCategory);
            formData.append("description", data.description);

            // Only append image if a new one is selected
            if (data.categoryImage && data.categoryImage.length > 0) {
                formData.append("categoryImage", data.categoryImage[0]);
            }
            
            const response = await ProductServices.updateCategory(categoryId, formData);
            if(response?.data?.success){
                toast.success("Category updated successfully");
                router.push('/categories')
            }
            console.log("Update category response", response);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    if (fetchingData) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        );
    }

    return (
        <div className='flex-1 flex flex-col min-h-0 pl-[15px] pr-[43px]'>
            <span className='text-[14px] text-[#000000] font-bold mt-[5px]'>Edit Category</span>
            <p className='text-[12px] text-[#6A717F]'>Update category information</p>

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
                                    {...register("categoryName", {required: "Category Name is required."})}
                                />
                                {errors?.categoryName && (<p className='text-xs text-red-500'>{errors?.categoryName?.message}</p>)}
                            </div>
                            <div>
                                <Label className='text-[15px] text-[#000000] font-bold mb-[14px]' htmlFor='subCategory'>Sub-Category*</Label>
                                <Input 
                                    id='subCategory'
                                    type='text'
                                    className='bg-[#F3F5F7] mb-[21px]'
                                    placeholder='Enter Sub-Category Name'
                                    {...register("subCategory", {required: "Sub-Category is required."})}
                                />
                                {errors?.subCategory && (<p className='text-xs text-red-500'>{errors?.subCategory?.message}</p>)}
                            </div>
                            <div className='w-full'>
                                <Label className='text-[15px] text-[#000000] font-bold mb-[14px]' htmlFor='description'>Description*</Label>
                                <textarea 
                                    id='description'
                                    rows={4}
                                    className='bg-[#F3F5F7] mb-[21px] w-full placeholder:ml-2 border rounded-sm p-2'
                                    placeholder='Enter Description'
                                    {...register("description", {required: "Description is required."})}
                                />
                                {errors?.description && (<p className='text-xs text-red-500'>{errors?.description?.message}</p>)}
                            </div>
                        </div>
                        <div className='flex-1 flex-col'>
                            <div className='flex flex-col items-center'>
                                <Label htmlFor='categoryImage' className='text-[15px] text-[#000000] font-bold mb-2'>Category Image</Label>
                                
                                {/* Show existing image */}
                                {existingImage && (
                                    <div className='mb-2'>
                                        <img src={existingImage} alt="Category" className='w-[153px] h-[168px] object-cover' />
                                        <p className='text-xs text-gray-500 mt-1'>Current Image</p>
                                    </div>
                                )}
                                
                                <Input
                                    id='categoryImage'
                                    className='bg-[#F3F5F7] w-[153px]'
                                    type='file'
                                    {...register("categoryImage")}
                                />
                                <p className='text-xs text-gray-500 mt-1'>Upload new image (optional)</p>
                                {errors?.categoryImage && (<p className='text-xs text-red-500'>{errors?.categoryImage?.message}</p>)}

                                <Button
                                    type='button'
                                    onClick={() => router.push('/categories')}
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
                            className='w-[45%] bg-[#003BFF] hover:bg-[#003BFF] mt-[10px] h-[26px] rounded-none text-[13px] cursor-pointer'
                        >
                            {loading && <Loader2 className="animate-spin h-4 w-4 text-white" />}
                            {loading ? "Updating..." : "Update"}
                        </Button>

                        <Button
                            type='button'
                            onClick={() => router.push('/categories')}
                            disabled={loading}
                            className='w-[45%] bg-[#ffffff] hover:bg-[#ffffff] mt-[10px] h-[26px] border border-[#000000] rounded-none text-[#000000] text-[13px] cursor-pointer'
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}