import React, { useState } from 'react'
import { createSubscriptionApi } from '../../services/subscription.services'
import { toast } from 'react-toastify'

const SelectDateModal = ({messId, planId, onClose}) => {


  const [selectedStartDate, setSelectedStartDate] = useState(null)


  
  return (
  <>
  
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-25  " ></div>

      {/* Modal content */}
      <div className="relative bg-white w-1/4 p-10 rounded-cl shadow-lg border border-indigo-500">
        <div className="flex justify-between">
          <p className="text-3xl font-bold text-indigo-500">Select Start Date</p>
          <p
            className="text-gray-500 font-bold cursor-pointer"
           onClick={onClose}
          >
            X
          </p>

          
        </div>


        <div className='flex flex-col items-center justify-center gap-5 mt-5'>
            <input type="date" name='startDate' className='border p-2 w-full' onChange={(e) => setSelectedStartDate(e.target.value)} />
            <button className='text-sm text-white bg-indigo-500 p-2 w-full hover:bg-indigo-400 cursor-pointer font-bold ' onClick={handleCreateSubscription} >Subscribe</button>
        </div>
          
       
      </div>
    </div>
  
  </>
  )
}

export default SelectDateModal