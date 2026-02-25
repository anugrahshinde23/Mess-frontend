import React from 'react'

const Dashboard = () => {



  return (
    <>
    
    
    <div className='p-10  '>
        <div className='flex  flex-col gap-5'>
        <p className='text-3xl text-indigo-500 font-bold'>Overview</p>
        <div className='grid grid-cols-4   gap-5'>
            <div  className='bg-indigo-300 rounded-lg p-5'>
                <p>Total Subscription</p>
               
            </div>
            <div className='bg-indigo-300 rounded-lg p-5'>
                <p>Total Orders</p>
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