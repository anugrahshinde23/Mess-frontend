import React, { useEffect, useState } from 'react'
import { getAllMessPlansApi } from '../../services/plan.services'
import { toast } from 'react-toastify'

const PlanListingModal = ({handlePlanListingModalClosing, messId}) => {


  const [selectedPlanId, setSelectedPlanId] = useState(null)

  const [plans, setPlans] = useState(null)

  const handleGetAllMessPlans = async () => {
    try {
        const res = await getAllMessPlansApi(messId)
        console.log(res);
        setPlans(res)
        // toast.success(res.message)
        
    } catch (error) {
        toast.error("Failed to fetch Plans")
    }
  }

  useEffect(() => {
    handleGetAllMessPlans()
  }, [])
  



  return (
    <>
    
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm ">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-25  " ></div>

      {/* Modal content */}
      <div className="relative bg-white w-3/4 sm:w-1/4 p-10 rounded-xl shadow-lg border border-indigo-500">
        <div className="flex justify-between">
          <p className="text-3xl font-bold text-indigo-500">Plans</p>
          <p
            className="text-gray-500 font-bold cursor-pointer"
           onClick={handlePlanListingModalClosing}
          >
            X
          </p>

         

          
        </div>


        <div className=' mt-5 grid grid-cols-2 gap-2 '>
            {plans?.plansData?.map((p)=>(
                <div className='border p-5'>
                  
                    <p className='text-center'> {p?.plan?.type}</p>

                    <div className='flex justify-between mt-3'>
                        <p>Duration:</p>
                        <p>{p?.plan?.durationInDays}days</p>
                    </div>
                    <div className='flex justify-between mt-3 '>
                        <p>Meals:</p>
                        <div className='flex flex-col'>
                        {p?.plan?.mealsIncluded.map((meal) => (
                            <p>{meal}</p>
                        ))}
                        </div>
                    </div>

                    <div className='flex justify-between mt-3'>
                        <p>Price:</p>
                        <p>Rs.{p?.price}</p>
                        
                    </div>
                    <div className='text-center'>
                        <button className='bg-indigo-500 text-white text-sm font-bold px-3 py-2 rounded-3xl hover:bg-indigo-400 cursor-pointer mt-5' onClick={
                          () => {
                            setSelectedPlanId(p?._id)
                          }
                        }>{p?.plan?.type === 'ONE_TIME' ? 'Order' : "Subscribe"}</button>
                    </div>
                </div>

                
            ))}
          </div>
       
      </div>
    </div>
    
    </>
  )
}

export default PlanListingModal