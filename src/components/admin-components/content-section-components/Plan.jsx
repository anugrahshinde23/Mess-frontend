import React, { useEffect, useState } from 'react'
import { getAllPlansApi } from '../../../services/plan.services'
import { toast } from 'react-toastify'

const Plan = () => {


 const [plans, setPlans] = useState([])

 const handleGetAllPlans = async() => {
  try {
    const res = await getAllPlansApi()
    console.log(res);
    setPlans(res.plansData)
  

  } catch (error) {
    toast.error(error.response?.data?.message)
  }
 }


useEffect(() => {
 handleGetAllPlans()
}, [])



 if(plans.length === 0){
  return (
    <>
    <div className='flex justify-center items-center h-full '>
      <p className='text-white  '>No plans found</p>
    </div>
    </>
  )
 }


  return (
    <>
    
    <div className=' p-20 text-white flex gap-5 h-full '   >
      {plans.map((p) => (
         
         <div className='p-5 bg-black w-full h-full flex flex-col gap-5 border border-zinc-700 rounded-2xl' key={p._id}>
          <div className='flex flex-col'>
          <p className='text-2xl'>{p.type.replace("_", " ")}</p>
          <p className='text-zinc-600 text-sm'>This is one time plan</p>
          </div>

          <div>
            <p className='text-2xl' >{p.durationInDays} Days</p>
          </div>
          <div className='' >
            
            {p.mealsIncluded.map((meal) => (
              <p>{meal}</p>
            ))}
          </div>
         </div>
      
      ))}
      </div>
    
    </>

  )
}

export default Plan