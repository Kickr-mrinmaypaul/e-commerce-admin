'use client'

import React from 'react'
import { useForm } from "react-hook-form"
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import LoginServices from '@/services/LoginServices'
import { Button } from './ui/button'
import { Label } from './ui/label'





export interface LoginFormType {
    email: string,
    password: string
}

export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormType>();
    const router = useRouter();

     const Text = {
        "title": "TOYMYST",
        "message": "Sign in to your account to continue",
    }

    const onSubmit  = async(data: LoginFormType)=>{
        if(!data) return;
        console.log(data);
        try {
            // const response = await api/v1/admin/auth/login
            // const response = await fetch("https://24df64jx-8000.inc1.devtunnels.ms/api/v1/admin/auth/login", {
            //     method: "POST",
            //     headers: {'Content-Type' : 'application/json'},
            //     body: JSON.stringify(data),
            // })
            const response = await LoginServices.login(data);
            if(response?.status){
                localStorage.setItem("authToken", response?.data?.token);
                console.log("token", response?.data?.token)
                router.push("/");
            }
            console.log("Login resp:", response)
        } catch (error) {
            console.error(error);
        }
    }

  return (
    // <div className='min-h-screen flex flex-col items-center justify-center'>
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //         <div className='flex flex-col items-center space-y-2'>
    //             <Input
    //             placeholder='email' 
    //             {...register("email", {required: "Email is required"})}
                
    //             type="text" />
    //             {errors?.email && (<p>{errors?.email?.message}</p>)}

    //             <Input
    //             placeholder='password'
    //             {...register("password", {required: "password is required"})}
                
    //             type="text" />
    //             {errors?.password && (<p>{errors?.password?.message}</p>)}

    //             <button type='submit'>Submit</button>
    //         </div>
    //     </form>
    // </div>
     <div className='min-h-screen h-screen w-full flex items-center justify-center '>
            <div className='w-full md:w-[45%] xl:w-[40%] p-2 flex flex-col justify-center items-center bg-white shadow rounded-md'>
                 <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full flex flex-col items-center justify-center'>
                    <h1 className='text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-black font-bold'>{Text.title}</h1>
                    <span className='text-xs md:text-sm xl:text-lg 2xl:text-xl'>{Text.message}</span>
                </div>
                <div className='flex flex-col w-full p-2 space-y-1 mt-2 md:mt-3'>
                    <div className='w-full  flex flex-col space-y-1'>
                        <Label className='text-xs  md:text-sm lg:text-lg 2xl:text-xl'>Email</Label>
                        <Input 
                        placeholder='Enter your email'
                        type="text"
                        {...register("email", {required: "Email is required"})}
                        />
                        {errors?.email && (<p className='text-xs text-red-500'>{errors?.email?.message}</p>)}
                    </div>
                    <div className='w-full flex flex-col space-y-1 mt-1 md:mt-2'>
                        <div className='flex flex-row items-center justify-between'>
                            <Label className='text-xs  md:text-sm lg:text-lg 2xl:text-xl'>Password</Label>
                            <span className='text-[10px] md:text-xs'>forgot password?</span>
                        </div>
                        <Input 
                        placeholder='Enter your password'
                        type="text" 
                        {...register("password", {required: "password is required"})}
                        />
                        {errors?.password && (<p className='text-xs text-red-500'>{errors?.password?.message}</p>)}
                    </div>
                    <Button
                    className='bg-blue-500 hover:bg-blue-400 text-white cursor-pointer mt-2 md:mt-3 text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl'
                    >Continue</Button>

                    {/* <div className='w-full flex justify-center mt-2'>
                        <span className='flex gap-1 text-xs md:text-sm 2xl:text-md text-gray-500 font-semibold'>Don't have an account? <Link href="/user/sign-up" className="text-blue-500 hover:underline">Sign up</Link></span>
                    </div> */}
                </div>
                </form>
            </div>
        </div>
  )
}
