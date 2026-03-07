import React from 'react'

const Dashboard = ({subscriptions, order}) => {



  return (
    <>
    
    
    <div className='p-10  '>
        <div className='flex  flex-col gap-5'>
        <p className='text-3xl text-indigo-500 font-bold'>Overview</p>
        <div className='grid grid-cols-4   gap-5'>
            <div  className='bg-indigo-300 flex flex-col gap-3 rounded-lg p-5'>
                <p className='text-sm font-bold '>Total Subscription</p>
               <p className='text-4xl font-medium '>{subscriptions.length}</p>
            </div>
            <div className='bg-indigo-300 flex flex-col gap-3 rounded-lg p-5'>
                <p className='text-sm font-bold '>Total Orders</p>
                <p className='text-4xl font-medium '>{order.length}</p>
            </div>
            <div className='bg-indigo-300 rounded-lg p-5'>
                <p>Total D-Boys</p>
            </div>
            <div className='bg-indigo-300 rounded-lg p-5'>
                <p>Todays Revenue</p>
            </div>
        </div>
        </div>
    </div>
    
    
    
    </>
  )
}

export default Dashboard