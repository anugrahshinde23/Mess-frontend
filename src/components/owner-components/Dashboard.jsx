import React, { useEffect, useState } from 'react'
import { getTotalSubscriptionApi } from '../../services/subscription.services'
import { toast } from 'react-toastify'
import { getDeliveryBoysApi } from '../../services/deliveryBoyServices'
import { LineChart,BarChart,Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PieChart, Pie } from "recharts";

const Dashboard = ({subscriptions, order, messData}) => {


    const [subscription, setSubscription] = useState([])

    const [dBoy, setDboy] = useState([])

const handleGetTotalSubscription = async () => {
    try {
        const res = await getTotalSubscriptionApi()
        console.log(res);
        setSubscription(res.subData)
        toast.success(res.message)
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message)
    }
}

const handleGetDboys = async() => {
    try {
        const res = await getDeliveryBoysApi()
        console.log("Hello",res);
        setDboy(res.dboyData)
        toast.success(res.message)
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message)
    }
}

const revenueData=[
    { date: "2026-03-01", revenue: 1200 },
    { date: "2026-03-02", revenue: 1500 },
    { date: "2026-03-03", revenue: 900 }
   ]

   const ordersData = [
    { date: "2026-03-01", orders: 10 },
    { date: "2026-03-02", orders: 15 },
    { date: "2026-03-03", orders: 8 }
   ]

   const mealData = [
    { name: "Breakfast", value: 20 },
    { name: "Lunch", value: 50 },
    { name: "Dinner", value: 30 }
   ]

useEffect(() => {

handleGetTotalSubscription()
handleGetDboys()
console.log(messData?.messData?.isActive)
 
}, [])


if (!messData){

  return <div className='flex justify-center items-center h-full'>
    <p className='text-2xl font-bold text-zinc-500'>Mess is deactivated cannot access Dashboard</p>
  </div>
}


  return (
    <>
    
    
    <div className='p-10  '>
        <div className='flex  flex-col gap-5'>
        <p className='text-3xl text-indigo-500 font-bold'>Overview</p>
        <div className='grid grid-cols-5   gap-5'>
            <div  className='bg-indigo-200 flex shadow-sm flex-col gap-3 rounded-lg p-5'>
                <p className='text-sm font-bold '>Total Subscription</p>
               <p className='text-4xl font-medium '>{subscription.length}</p>
            </div>
            <div className='bg-indigo-200 flex shadow-sm flex-col gap-3 rounded-lg p-5'>
                <p className='text-sm font-bold '>Total Orders</p>
                <p className='text-4xl font-medium '>{order.length}</p>
            </div>
            <div className='bg-indigo-200 flex shadow-sm flex-col gap-3 rounded-lg p-5'>
                <p className='text-sm font-bold'>Total D-Boys</p>
                <p  className='text-4xl font-medium '>{dBoy.length}</p>
            </div>
            <div className='bg-indigo-200 shadow-sm rounded-lg p-5'>
                <p className='text-sm font-bold'>Todays Revenue</p>
                <p  className='text-4xl font-medium '>{revenueData.length}</p>
            </div>
            <div className='bg-indigo-200 shadow-sm rounded-lg p-5'>
                <p className='text-sm font-bold'>Active Plan</p>
                <p className='text-4xl font-medium '>{messData?.messData?.plan.length}</p>
            </div>
        </div>
        <div className="mt-10 space-y-8">

{/* Revenue Chart */}
<div className="bg-indigo-200 shadow-md rounded-xl p-6">
  <p className="text-lg font-semibold mb-4">Revenue Trend</p>

  <LineChart width={900} height={300} data={revenueData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="revenue" stroke="#6366f1" />
  </LineChart>
</div>


{/* Two Charts */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  <div className="bg-indigo-200 shadow-md rounded-xl p-6">
    <p className="text-lg font-semibold mb-4">Orders Per Day</p>

    <BarChart width={400} height={250} data={ordersData}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="orders" fill="#6366f1" />
    </BarChart>
  </div>

  <div className="bg-indigo-200 shadow-md rounded-xl p-6">
    <p className="text-lg font-semibold mb-4">Meal Distribution</p>

    <PieChart width={400} height={250}>
      <Pie
        data={mealData}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
        fill="#6366f1"
      />
      <Tooltip />
    </PieChart>
  </div>

</div>

</div>
        </div>

    </div>
    
    
    
    </>
  )
}

export default Dashboard