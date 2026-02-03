'use client';

import React,{ useRef, useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import ProductServices from '@/services/ProductServices';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';



type ImageBoxProps = {
  preview: string | null;
  registerName: string;
};

export default function AddProduct() {

    const router = useRouter();
    const {register, handleSubmit, formState: {errors}, watch, setValue, reset  } = useForm<any>();
    const [categories, setCategories] = useState<any[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [categoryError, setCategoryError] = useState<string | null>(null);
    const [loadingAddProduct, setLoadingAddProduct] = useState(false);

    const mainImageRef = useRef<HTMLInputElement | null>(null);
    const imageFile = watch("productImage");
    const img1 = watch("image1");
    const img2 = watch("image2");
    const img3 = watch("image3");
    const img4 = watch("image4");


    const getPreview = (file?: FileList) => {
        return file && file[0] ? URL.createObjectURL(file[0]) : null;
        };


    const previewMain = getPreview(imageFile);
    const preview1 = getPreview(img1);
    const preview2 = getPreview(img2);
    const preview3 = getPreview(img3);
    const preview4 = getPreview(img4);

     useEffect(() => {
        const fetchCategories = async () => {
            setLoadingCategories(true);
            setCategoryError(null);
            try {
                const response = await ProductServices.getTotalCategory();  // ← Replace with your API
                console.log("category response:", response);
                setCategories(response?.data?.total);  // ← Adjust based on your API response structure
                // If your API returns { categories: [...] }, use: setCategories(data.categories)
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategoryError('Failed to load categories');
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    const onSubmit = async(data : any)=>{
        if(!data) return;
        console.log("data",data);
        const formData = new FormData();
        formData.append("name", data?.productName);
        formData.append("description", data?.description);
        formData.append("price", data?.price)
        formData.append("brand", data?.brand);
        //formData.append("minimumAge", data?.description);
        //formData.append("delivery", data?.price);
        //formData.append("ideaFor", data?.productName);
        formData.append("colour", data?.colour);
        formData.append("stock", data?.stockQuantity)
        formData.append("category", data?.category);

        if (data.productImage?.[0]) {
            formData.append("productImage", data.productImage[0]);
        }
        const extraImages = ["image1", "image2", "image3", "image4"];
        extraImages.forEach((key) => {
            if (data[key]?.[0]) {
            formData.append("productImage", data[key][0]);
            }
        });

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            setLoadingAddProduct(true);
            const response = await ProductServices.addProduct(formData);
            if(response?.data?.data?.success){
                toast.success("Product Added Successfully.");
                reset();
            }
            console.log("add product form resp:", response);
        } catch (error) {
            console.error(error);
        }finally{
            setLoadingAddProduct(false);
        }
    }

    const ImageBox = ({ preview, registerName }: ImageBoxProps) => {
        const inputRef = useRef<HTMLInputElement | null>(null);
        const { ref, ...registerProps } = register(registerName);
        return (

            <div className="flex flex-col items-center">
                <div className="relative h-[108px] w-[116px]">
                {preview ? (
                    <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-sm border"
                    />
                ) : (
                    <div className="h-full w-full bg-[#F3F5F7] flex items-center justify-center text-[10px] text-gray-500 rounded-sm border">
                    Upload Image
                    </div>
                )}

                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    {...registerProps}  // ← CHANGE FROM {...register(registerName)}
                    ref={(e) => {       // ← ADD THESE 4 LINES
                        ref(e);
                        inputRef.current = e;
                    }}

                />
                {errors?.file && (<p className='text-xs text-red-500'>{errors?.file?.message}</p>)}
                </div>

                <Button
                    onClick={() => inputRef.current?.click()}
                    type="button"
                    variant="outline"
                    className="text-[10px] mt-[9px] h-[18px] w-[91px] text-[#464646] border border-[#000000] rounded-none"
                >
                Upload Image
                </Button>
            </div>
        )};


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
                                <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='description'>Description*</Label>
                                <Input
                                className='bg-[#F3F5F7]'
                                placeholder='Enter Description'
                                {...register("description",{required: "Description is Required."})}
                                />
                                {errors?.description && <span className="text-red-500 text-xs">{errors?.description.message}</span>}
                            </div>
                            {/* <div>
                                <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='category'>Category*</Label>
                                <Input
                                className='bg-[#F3F5F7]'
                                placeholder='Enter Category'
                                {...register("category",{required: "category Name is Required."})}
                                />
                            </div> */}

                            <div>
                                <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='category'>Category*</Label>
                                <Select
                                    onValueChange={(value) => setValue("category", value)}
                                    disabled={loadingCategories}
                                >
                                    <SelectTrigger className='bg-[#F3F5F7]'>
                                        <SelectValue placeholder={loadingCategories ? "Loading..." : "Select Category"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoryError ? (
                                            <SelectItem value="error" disabled>{categoryError}</SelectItem>
                                        ) : categories.length > 0 ? (
                                            categories.map((category) => (
                                                <SelectItem key={category._id} value={category._id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="no-categories" disabled>No categories available</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors?.category && <span className="text-red-500 text-xs">{errors?.category.message}</span>}
                            </div>
                        </div>
                        <div className='w-[80%] flex flex-row justify-between'>
                            <div>
                                <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='brand'>Brand*</Label>
                                <Input
                                className='bg-[#F3F5F7]'
                                placeholder='Enter Brand name'
                                {...register("brand",{required: "Brand is Required."})}
                                />
                                {errors?.brand && <span className="text-red-500 text-xs">{errors?.brand.message}</span>}
                            </div>
                            <div>
                                <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='colour'>Colour*</Label>
                                <Input
                                className='bg-[#F3F5F7]'
                                placeholder='Enter Product Colour'
                                {...register("colour",{required: "Product Colour is Required."})}
                                />
                                {errors?.colour && <span className="text-red-500 text-xs">{errors?.colour.message}</span>}
                            </div>
                        </div>
                        <div className='w-[80%] flex flex-row justify-between'>
                            <div>
                                <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='price'>Price*</Label>
                                <Input
                                className='bg-[#F3F5F7]'
                                placeholder='0.00'
                                {...register("price",{required: "Price is Required."})}
                                />
                                {errors?.price && <p className="text-red-500 text-xs">{errors?.price?.message}</p>}
                            </div>
                            {/* <div>
                                <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='discountedPrice'>Discounted Price*</Label>
                                <Input
                                className='bg-[#F3F5F7]'
                                placeholder='0.00'
                                {...register("discountedPrice",{required: "Discounted Price is Required."})}
                                />
                                {errors?.discountedPrice && <p className="text-red-500 text-xs">{errors?.discountedPrice?.message}</p>}
                            </div> */}
                            <div>
                                <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='stockQuantity'>Stock Quantity</Label>
                                <Input
                                className='bg-[#F3F5F7]'
                                placeholder='0'
                                {...register("stockQuantity")}
                                />
                                {errors?.stockQuantity && <p className="text-red-500 text-xs">{errors?.stockQuantity?.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className='w-[40%]'>
                        <div className='flex flex-col items-end pr-[30px]'>
                            <div className='flex flex-col space-y-1'>
                                <Label className='text-[#000000] text-[14px] font-bold mb-[14px]' htmlFor='productImage'>Product Image*</Label>
                                {/* <Input
                                placeholder='Upload Image'
                                className='bg-[#F3F5F7] h-[168px] w-[153px] placeholder:none rounded-sm'
                                type='file'
                                {...register("productImage", {required: "Product image is required."})}
                                /> */}
                                {/* <Input
                                    type="file"
                                    accept="image/*"
                                    className="bg-[#F3F5F7] h-[168px] w-[153px] rounded-sm"
                                    {...register("productImage", {
                                    required: "Product image is required",
                                    })}
                                /> */}
                                <div className="relative h-[168px] w-[153px]">
                                    {previewMain  ? (
                                        <img
                                        src={previewMain}
                                        alt="Preview"
                                        className="h-full w-full object-cover rounded-sm border"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-[#F3F5F7] flex items-center justify-center text-xs text-gray-500 rounded-sm border">
                                        Upload Image
                                        </div>
                                    )}

                                    {/* Invisible input on top */}
                                    <input
                                        ref={mainImageRef}
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        {...register("productImage", {
                                        required: "Product image is required",
                                        })}
                                    />
                                </div>
                                <Button
                                type='button'  
                                onClick={() => mainImageRef.current?.click()}
                                className='rounded-none h-[22px] w-[155px] cursor-pointer bg-[#003BFF] hover:bg-[#003BFF] text-[#ffffff] text-[10px]'
                                >Upload Image</Button>
                                <Button
                                type='button'
                                className='rounded-none cursor-pointer text-[13px] text-[#000000] h-[22px] w-[155px] border border-[#000000]'
                                variant="outline"
                                >Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-2 p-4 bg-[#ffffff] rounded-sm'>
                    {/* <div className='flex flex-row w-[60%] ml-[21px] justify-between'>
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
                    </div> */}

                    <div className='flex flex-row w-[60%] ml-[21px] justify-between'>
                        <ImageBox preview={preview1} registerName="image1" />
                        <ImageBox preview={preview2} registerName="image2" />
                        <ImageBox preview={preview3} registerName="image3" />
                        <ImageBox preview={preview4} registerName="image4" />
                    </div>

                </div>
                <div className='w-full flex flex-row justify-end space-x-2 mt-2'>
                    <Button
                    type="submit"
                    className='flex bg-[#003BFF] hover:bg-[#003BFF] cursor-pointer text-[10px] text-[#ffffff] h-[18px] w-[164px] rounded-none'
                    >
                        {loadingAddProduct ? (<Loader2 className="animate-spin h-4 text-blue-500"/>) : ("Submit") }
                    </Button>

                    <Button
                    onClick={()=> router.push('/')}
                    type='button'
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
