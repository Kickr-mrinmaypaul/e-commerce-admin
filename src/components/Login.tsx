'use client'

import React from 'react'
import { useForm } from "react-hook-form"
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import LoginServices from '@/services/LoginServices'




export interface LoginFormType {
    email: string,
    password: string
}

export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormType>();
    const router = useRouter();

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
                router.push("/");
            }
            console.log("Login resp:", response)
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col items-center space-y-2'>
                <Input
                placeholder='email' 
                {...register("email", {required: "Email is required"})}
                
                type="text" />
                {errors?.email && (<p>{errors?.email?.message}</p>)}

                <Input
                placeholder='password'
                {...register("password", {required: "password is required"})}
                
                type="text" />
                {errors?.password && (<p>{errors?.password?.message}</p>)}

                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}
