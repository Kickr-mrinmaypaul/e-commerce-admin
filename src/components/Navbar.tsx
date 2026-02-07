import React from 'react'
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

// {title}: {title: string}

export default function Navbar() {

  return (
    <nav className='w-full h-[45px] xl:h-[65px] bg-[#ffffff] flex flex-row items-center justify-between pr-[20.9px]'>
        <div>
            <span className='ml-[15px] text-[18px] text-[#003BFF] font-bold'>Dashboard</span>
        </div>
        <div className='flex flex-row gap-2 items-center'>
            <div className='flex flex-row items-center gap-2 bg-[#F9FAFB] px-3 py-1.5 rounded-full'>
                <CiSearch />
                <input
                className='placeholder:text-[14px] outline-none'
                placeholder='Search data, users, or reports' 
                type="text" />
            </div>
            <div className='flex items-center'>
                <img 
                className='h-[30px] object-contain'
                src={"https://cdn-icons-png.flaticon.com/512/8847/8847419.png"} alt="profile_img" />
            </div>
        </div>
    </nav>
  )
}
