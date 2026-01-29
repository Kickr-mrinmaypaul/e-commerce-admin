'use client'

import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { HiDotsVertical } from "react-icons/hi";
import DetailsButton from '@/components/button/DetailsButton';
import SimpleAreaChart from './SimpleAreaChart';
import Link from 'next/link';
import FilterButton from './button/FilterButton';
import Button from './button/Button';
import OrderManagementServices from '@/services/OrderManagementServices';


type DashboardStats = {
  totalSales: number;
  totalOrders: number;
  pendingCancel: number;
};


export default function Dashboard() {
    const [isActive, setIsActive] = useState("This week");
    const [transactionData, setTransactionData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingToalSales, setLoadingTotalSales] = useState(false);
    const [stats, setStats] = useState<DashboardStats>({totalSales: 0, totalOrders: 0,pendingCancel: 0,})
    const [loadingBestSelling, setLoadingBestSelling] = useState(false);
    const [bestSelling, setBestSelling] = useState([])


    const fetchTransaction = async()=>{
        try {
            setLoading(true);
            const response = await OrderManagementServices.getAllOrders();
            const transactions = response?.data?.transactions || [];
            console.log("Dahboard transaction data:", response);
            setTransactionData(transactions.slice(0, 4));
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchTransaction();
    },[])

    // const fetchDahboardData = async()=>{
    //     try {
    //         setLoadingTotalSales(true);
    //         const [salesRes, orderRes] = await Promise.all([
    //             OrderManagementServices.toatlSales(),

    //         ])
            
    //     } catch (error) {
    //         console.error(error);
    //     }finally{
    //         setLoadingTotalSales(false);
    //     }
    // }

    // useEffect(()=>{
    //     fetchDahboardData();
    // },[])

    const fetchBestSellingProducts = async()=>{
        try {
            setLoadingBestSelling(true);
            const response = await OrderManagementServices.bestSellingProducts();
            console.log("Best Selling products:", response);
            const data = response?.data?.data || []
            setBestSelling(data.slice(0,4))
        } catch (error) {
            console.error(error);
        }finally{
            setLoadingBestSelling(false);
        }
    }

    useEffect(()=>{
        fetchBestSellingProducts();
    },[])

    const formatStatus = (status?: string) => {
      if (!status) return "";
      return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    };

    const formatDate = (date?: string) => {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };


    const progressDiv = [
        {id: 1, title: "Total Sales", days: "Last 7 days"},
        {id: 2, title: "Total Orders", days: "Last 7 days"},
        {id: 3, title: "Pending & Cancle", days: "Last 7 days"}
    ] 

    const btn = [
        {id: 1, title: "This week"},
        {id: 2, title: "Last week"}
    ]

    const chartLabel = [
        {id: 1, title: "Customer"},
        {id: 2, title: "Total Products"},
        {id: 3, title: "Stock Products"},
        {id: 4, title: "Out of Stock"},
        {id: 5, title: "Revenue"},
    ]

    const topProducts = [
        {id: 1, imgurl: "/globe.svg", title: "test1", amount: "15000"},
        {id: 2, imgurl: "/globe.svg", title: "test2", amount: "15000"},
        {id: 3, imgurl: "/globe.svg", title: "test3", amount: "15000"},
        {id: 4, imgurl: "/globe.svg", title: "test4", amount: "15000"},
    ]

    const transactionLabel = [
        {id: 1, title: "Id"},
        {id: 2,  title: "Id Customer"},
        {id: 3,  title: "Order date"},
        {id: 4,  title: "Status"},
        {id: 5,  title: "Amount"},
    ]
    
    const ordersData = [
  {
    id: "ORD-1001",
    customer: "Rahul Sharma",
    orderDate: "2025-01-12",
    status: "Completed",
    amount: "₹2,499",
  },
  {
    id: "ORD-1002",
    customer: "Ananya Verma",
    orderDate: "2025-01-13",
    status: "Pending",
    amount: "₹1,299",
  },
  {
    id: "ORD-1003",
    customer: "Amit Patel",
    orderDate: "2025-01-14",
    status: "Cancelled",
    amount: "₹3,799",
  },
  {
    id: "ORD-1004",
    customer: "Sneha Gupta",
    orderDate: "2025-01-15",
    status: "Processing",
    amount: "₹899",
  },
];

const bestSellingProductLebel = [
    {id: 1, title: "PRODUCT"},
    {id: 2, title: "TOTAL ORDER"},
    {id: 3, title: "STATUS"},
    {id: 4, title: "PRICE"},
]

const bestSellingData = [
    {id: 1, imgUrl: "/globe.svg", totalOrder: "101", status: "Stock", price: "12000"},
    {id: 2, imgUrl: "/globe.svg", totalOrder: "189", status: "Out of Stock", price: "12000"},
    {id: 3, imgUrl: "/globe.svg", totalOrder: "111", status: "Stock", price: "12000"},
    {id: 4, imgUrl: "/globe.svg", totalOrder: "131", status: "Stock", price: "12000"},
]

  return (
    <div className='flex-1 flex flex-col min-h-0 '>
        {/* progress div sales and order*/}

        <section className='flex-1 p-4 mt-[20px]'>
            <div className='grid grid-cols-3 gap-[50px] pr-[111px]'>
                {progressDiv.map((item)=>(
                    <div 
                    className='bg-[#FFFFFF] border border-[#00000033] rounded-sm shadow  p-[9.34px]'
                    key={item.id}>
                        <div className='flex flex-row items-center justify-between mb-[29px]'>
                            <div>
                                <span className='text-[#23272E] text-[15px] font-bold'>{item.title}</span>
                                <p className='text-[#6A717F] text-[10px]'>{item.days}</p>
                            </div>
                            <span className='h-[18px] text-[#6A717F] cursor-pointer'><HiDotsVertical /></span>
                        </div>
                        <div>
                            <div>
                                <span className='text-[16px] text-[#023337] font-bold'>50000</span>
                                <p className='text-[10px] text-[#6A717F]'>Previous 7 days</p>
                            </div>
                        </div>
                        <div className='flex justify-end items-center'>
                            <DetailsButton title='Details'/>
            
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Area chart*/}
        <section className='flex-1 p-4'>
            <div className='w-full flex flex-row gap-[26px]'>
                <div className='w-[70%] flex flex-col bg-[#ffffff] border-[#00000033] shadow-md py-[18px] px-[9px] rounded-sm'>
                    <div className='flex flex-col'>
                        <div className='flex flex-row items-center justify-between mb-[29px]'>
                            <span className='text-[14px] text-[#23272E] font-bold'>Report for this week</span>
                            <div className='flex flex-row items-center space-x-2'>
                                <div className='flex flex-row bg-[#E7E8F8] px-[7px] py-[5px] rounded-md space-x-[8px] text-[12px] '>
                                    {btn.map((item)=>(
                                        <button 
                                        onClick={()=> setIsActive(item.title)}
                                        className={`cursor-pointer ${isActive == item.title ? "bg-[#ffffff] text-[#003CFF] py-[2px] px-[5px] rounded-md font-medium" : ""}`}
                                        key={item.title}>{item.title}</button>
                                    ))}
                                </div>
                                <div>
                                    <button className='cursor-pointer'><HiDotsVertical /></button>
                                </div>
                            </div>
                            
                        </div>
                        <div>
                        {/* API Data  customer , total product, stock product...*/}
                        </div>
                    </div>
                    <SimpleAreaChart/>
                </div>
                <div className='w-[30%] flex flex-col py-[9.34px] px-[7.47px] bg-[#ffffff] border-[#00000033] shadow-md rounded-sm'>
                    <div className='flex flex-row justify-between'>
                        <span className='text-[#23272E] text-[15px] font-bold'>Top Products</span>
                        <Link href={'#'} className='text-[14px] text-[#003BFF]'>All Product</Link>
                    </div>
                    <div className='flex flex-row items-center gap-2 bg-[#F9FAFB] px-3 py-0.5 mt-[5.61px] rounded-md'>
                        <CiSearch />
                        <input
                        className='placeholder:text-[14px] outline-none '
                        placeholder='Search' 
                        type="text" />
                    </div>
                    <div className='flex flex-col mt-[7.47px]'>
                        {bestSelling.map((item)=>(
                            <div
                            className='flex flex-row items-center justify-between'
                            key={item?.productId}
                            >
                                <div className='w-[135px] h-[53.74px] flex flex-row items-center border-b border-[#D1D1D1]'>
                                    <img 
                                    className='object-contain w-[36px] h-[50px]'
                                    src={item?.image[0]} 
                                    alt={item?.name} />
                                    <span className='ml-[7.4px] text-[11px] text-[#023337] font-medium line-clamp-1'>{item?.name}</span>
                                    {/* <span className='text-[11px] text-[#8B909A]'>item {item?.productId}</span> */}
                                </div>
                                <span>₹{item?.finalPrice}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

            {/*Transiction*/}

        <section className='flex-1 p-4 '>
            <div className='w-full flex flex-row gap-[26px]'>
                <div className='w-[70%] h-[261px] px-[9px] py-[11px] bg-[#FFFFFF] border-[#00000033] rounded-sm shadow-md'>
                    <div className='w-full pr-[22px] flex flex-row items-center justify-between'>
                        <span className='text-[14px] font-bold text[#23272E]'>Transaction</span>
                        <FilterButton title='Filter'/>
                    </div>
                    <div className='w-full'>
                        <table className='w-full border-separate border-spacing-y-3'>
                            <thead>
                                <tr className='text-start'>
                                    {transactionLabel.map((item)=>(
                                        <th 
                                        className='text-start pl-[11px]'
                                        key={item.id}>
                                            {item.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='w-full'>
                                
                                {transactionData.map((item)=>(
                                    <tr
                                    className='text-[13px] font-medium text-[#000000]' 
                                    key={item._id}>
                                        <td className='py-0.5 pl-[11px]'>{item._id}</td>
                                        <td className='py-0.5 pl-[11px]'>{item.user}</td>
                                        <td className='py-0.5 pl-[11px]'>{formatDate(item?.createdAt)}</td>
                                        <td className='py-0.5 pl-[11px]'>{formatStatus(item?.orderStatus)}</td>
                                        <td className='py-0.5 pl-[11px]'>₹{item?.totalAmount}</td>
                                    </tr>
                                ))}
                                
                            </tbody>
                            
                        </table>
                        <div
                        className='w-full flex justify-end pr-[34px]'
                        >
                            <DetailsButton title='Details'/>
                        </div>
                    </div>
                </div>
                <div className='w-[30%] flex flex-col py-[9.34px] px-[7.47px] bg-[#ffffff] border-[#00000033] shadow-md rounded-sm'>
                    <div className='flex flex-row justify-between'>
                        <span className='text-[#23272E] text-[15px] font-bold'>New Arrivals</span>
                        <Link href={'#'} className='text-[14px] text-[#003BFF]'>All Product</Link>
                    </div>
                    <div className='flex flex-row items-center gap-2 bg-[#F9FAFB] px-3 py-0.5 mt-[5.61px] rounded-md'>
                        <CiSearch />
                        <input
                        className='placeholder:text-[14px] outline-none '
                        placeholder='Search' 
                        type="text" />
                    </div>
                    <div className='flex flex-col mt-[7.47px]'>
                        {topProducts.map((item)=>(
                            <div
                            className='flex flex-row items-center justify-between'
                            key={item.id}
                            >
                                <div className='w-[135px] h-[53.74px] flex flex-row items-center border-b border-[#D1D1D1]'>
                                    <img 
                                    className='object-contain w-[36px] h-[50px]'
                                    src={item.imgurl} 
                                    alt={item.title} />
                                    <span className='ml-[7.4px]'>{item.title}</span>
                                </div>
                                <span>₹{item.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

             {/*Best selling products*/}           
        <section className='flex-1 p-4'>
            <div className='w-full flex flex-row gap-[52px]'>
                <div className='w-[65%] bg-[#ffffff] pl-[15px] '>
                    <div className='w-full flex flex-row items-center justify-between pt-[8px] pr-[9px]'>
                        <span className='text-[14px] font-bold text[#23272E]'>Best Selling Products</span>
                        <FilterButton title='Filter'/>
                    </div>
                    <div className='w-full mt-[16px]'>
                        <table className='w-full border-collapse'>
                            <thead >
                                <tr className='bg-[#EAF8E7] items-start text-[11px] text-[#6A717F] h-[28.41px] rounded-sm'>
                                    {bestSellingProductLebel.map((item)=>(
                                        <th
                                        className='text-start pl-[9px] '
                                        key={item.id}
                                        >
                                            {item.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                
                                {bestSelling.map((item)=>(
                                    <tr key={item?.productId}>
                                        <td className="px-3 py-4">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={item?.image[0]}
                                                    alt={item?.name}
                                                    className="h-[67px] w-[52px] object-contain"
                                                />
                                                <span className="text-[14px] text-[#023337] font-semibold">
                                                    {item?.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td>{item?.totalSold}</td>
                                        <td
                                        className={item.status === "Stock" ? "text-green-500" : "text-red-500"}
                                        ><li>{item.status}</li></td>
                                        <td>₹{item.finalPrice}</td>
                                    </tr>
                                ))}
                                
                            </tbody>
                            
                        </table>
                        <div
                        className='w-full flex justify-end pr-[34px]'
                        >
                            <DetailsButton title='Details'/>
                        </div>
                    </div>
                </div>
                <div className='w-[30%] bg-[#ffffff] p-4 rounded-sm shadow-md'>
                    <div className='flex flex-col'>
                        <div className='flex flex-row justify-between items-center'>
                            <h2 className='text-[15px] text-[#000000] font-bold'>Add New Product</h2>
                            <button className='text-[10px] font-medium text-[#003BFF]'>Add New</button>
                        </div>
                        <span className='text-[10px] text-[#6A717F] '>Categories</span>
                    </div>
                    <div className='flex flex-col mt-[30px]'>
                        {topProducts.map((item)=>(
                            <div
                            className='flex flex-row space-x-2 mb-2 items-center shadow-sm pl-1 py-1'
                            key={item.id}
                            >
                                <img 
                                className='w-[22px] h-[28px] object-contain'
                                src={item.imgurl} alt={item.title} />
                                <span className='text-[10px] text-[#000000]'>{item.title}</span>
                            </div>
                        ))}        
                    </div>
                    <span className='flex items-center justify-center text-[12px] text-[#6467F2] font-medium cursor-pointer'>See more</span>
                    <div className='mt-[23px]'>
                        <span className='text-[10px] text-[#6A717F] font-medium'>Product</span>
                        <div>
                            {topProducts.map((item)=>(
                            <div
                            className='flex flex-row space-x-2 mb-2 items-center shadow-sm pl-1 py-1'
                            key={item.id}
                            >
                                <img 
                                className='w-[22px] h-[28px] object-contain'
                                src={item.imgurl} alt={item.title} />
                                <div className='flex flex-col'>
                                    <span className='text-[12px] text-[#000000]'>{item.title}</span>
                                    <span className='text-[10px] font-bold text-[#003BFF]'>{item.amount}</span>
                                </div>
                                <Button 
                                className='ml-auto'
                                icon={"/icon/circle-plus.png"}
                                title='Add'/>
                            </div>
                        ))} 
                        </div>
                        <span className='flex items-center justify-center text-[12px] text-[#6467F2] font-medium cursor-pointer'>See more</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
