import React from 'react'
import { CiSearch } from "react-icons/ci";



export default function Navbar({title}: {title: string}) {
  return (
    <nav className='w-full h-[45px] bg-[#ffffff] flex flex-row items-center justify-between pr-[20.9px]'>
        <div>
            <span className='ml-[15px] text-[15px] text-[#003BFF] font-bold'>{title}</span>
        </div>
        <div className='flex flex-row gap-2 items-center'>
            <div className='flex flex-row items-center gap-2 bg-[#F9FAFB] px-3 py-0.5 rounded-full'>
                <CiSearch />
                <input
                className='placeholder:text-[14px] outline-none'
                placeholder='Search data, users, or reports' 
                type="text" />
            </div>
            <div className='flex items-center'>
                <img 
                className='h-[18.68px] object-contain'
                src={"/globe.svg"} alt="profile_img" />
            </div>
        </div>
    </nav>
  )
}
