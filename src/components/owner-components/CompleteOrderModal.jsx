import React, { useState } from 'react'
import { completeOrderApi } from '../../services/order.services'
import { toast } from 'react-toastify'

const CompleteOrderModal = ({onCloseCompleteOrderModal, orderId}) => {

  
    const [code, setCode] = useState("")

    const handleCompleteOrder = async () => {

        if(!code || !orderId){
            alert("no code or orderid")
        }
        try {
            const res = await completeOrderApi({code, orderId})
            console.log(res);
            toast.success(res.message)
            
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally{
            onCloseCompleteOrderModal()
        }
    }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ">
    {/* Background overlay */}
    <div className="absolute inset-0 bg-black opacity-25  " ></div>

    {/* Modal content */}
    <div className="relative h-120 overflow-auto bg-white w-1/2 p-10 rounded-cl shadow-lg border border-indigo-500">
      <div className="flex justify-between">
        <p className="text-3xl font-bold text-indigo-500">Complete Order</p>
        <p
          className="text-gray-500 font-bold cursor-pointer"
       onClick={onCloseCompleteOrderModal}
        >
          X
        </p>

        
       
        
      </div>


<div className='flex flex-col mt-10 justify-center gap-10 items-center '>
<div className='flex flex-col gap-5'>
<p className='text-xl font-bold text-gray-500 '>Enter the order code</p>
<input type="text"  className='border p-2 border-indigo-500' onChange={(e) => setCode(e.target.value)}/>
</div>
    <button className='p-2 bg-indigo-500 text-white hover:bg-indigo-400 cursor-pointer font-bold text-sm' onClick={handleCompleteOrder} >Complete</button>
</div>

     
    </div>
  </div>
 
 
  )
}

export default CompleteOrderModal