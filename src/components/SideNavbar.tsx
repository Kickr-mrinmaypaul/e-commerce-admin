"use client"

import React, { useState } from 'react'
import Dashboard from '@/components/Dashboard';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function SideNavbar() {
    const [isActive , setIsActive] = useState("Dashboard");
    const router = useRouter();

    const sideMenuButton = [
        {id: 1 , name: "Dashboard", icon: "/icon/dashboard_icon.png", route: "/"},
        {id: 2, name: "Order Management", icon: "/icon/Order_icon.png", route: "/"},
        {id: 3, name: "Customers", icon: "/icon/customer_icon.png", route: "/"},
        {id: 4, name: "Categories", icon: "/icon/categories_icon.png", route: "/"},
        {id: 5, name: "Transactions", icon: "/icon/transaction_icon.png", route: "/"}
    ];

    const productItems = [
        {id: 6 , name: "Add Products", icon: "/icon/circle-plus.png", route: "/"},
        {id: 7 , name: "Product List", icon: "/icon/product-list-icon.png", route: "/"},
        {id: 8, name: "Log In", icon: "/icon/circle-plus.png", route: "/login"}
    ]

  return (
<div className='flex flex-row min-h-screen'>
    <aside className='w-[158px] bg-[#ffffff] border-r border-[#0000001F]'>
        <nav className='w-full flex flex-col'>
            <div className='w-[121.45px] h-[41.68px] mt-[6.31px] ml-[5.25px] p-[9.34px] items-center'>
                <h1 
                style={{ fontFamily: "Glitten", textTransform: "uppercase" }} 
                className='text-[20px] py-[9.34px] pl-[9.34px] text-[#000000] font-semibold'>TOYMYST</h1>
            </div>
            <div className='w-[121.45px] ml-[5px] flex justify-center mt-[9.34px] items-center'>
                <span className='text-[14px] text-[#6A717F] pl-[11.21px]'>Main menu</span>
            </div>
            <div className='w-full mt-4'>
                <ul className='flex flex-col ml-[6px] items-start  text-[14px] text-[#6A717F] space-y-[12.25px]'>
                    {sideMenuButton.map((menu)=>(
                    <div 
                    key={menu.id}
                    className={`w-full px-1 py-[4.3px] rounded-sm ${isActive == menu.name ? "bg-[#003BFF] text-[#ffffff]" : "text-[#6A717F]  "} `}>
                        <li
                        onClick={()=> {
                            setIsActive(menu.name);
                            router.push(menu.route);
                        }}
                        className={`w-full flex flex-row gap-2 items-center cursor-pointer`}
                        key={menu.id}>
                            <img 
                            className="h-3"
                            alt={menu.name}
                            src={menu.icon}/>
                            {menu.name}
                        </li>
                    </div> 
                    ))}
                    
                </ul>
            </div>

            <div className='mt-[35.12px] w-full '>
                <span className='w-full ml-[11.21px] items-start text-[#6A717F] text-[14px]'>Product</span>
                <div className='mt-[10.89px]'>
                    <ul className='w-[143px] ml-[6px] flex flex-col items-start text-[14px] text-[#6A717F] space-y-[12.25px]'>
                        {productItems.map((item)=>(
                            <li
                            onClick={()=> {
                                    setIsActive(item.name);
                                    router.push(item.route)
                                }
                            }
                            className={`w-full flex flex-row gap-2 items-center cursor-pointer px-1 py-[4.3px] rounded-sm ${isActive == item.name ? "bg-[#003BFF] text-[#ffffff]" : "text-[#6A717F]  "} `}
                            key={item.id}
                            >   
                                <img 
                                className='h-3 text-white'
                                src={item.icon} alt={item.name} />
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    </aside>
    <div className='flex-1 min-w-0'>
        <Navbar title={isActive}/>
        <Dashboard/>
    </div>
</div>
  )
}
