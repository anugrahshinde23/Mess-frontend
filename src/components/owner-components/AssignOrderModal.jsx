import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { checkDeliveryBoyPinMatchesUsersPinApi } from '../../services/deliveryBoyServices';
import { assignOrderAsSelfPickApi, assignOrderToDboy } from '../../services/order.services';

const AssignOrderModal = ({onClose, userPin, messId, orderId,handleGetOrders, handleGetDeliveryBoyByActiveOrder}) => {


    const [dBoys, setDboys] = useState([])

    

    const handleAssignOrderToDboy = async (dBoyId) => {

        if(!dBoyId || !messId || !orderId){
            alert("dboy, messid and orderid is missing")
            return 
        }


        try {
            const res = await assignOrderToDboy({dBoyId, messId, orderId})
            console.log(res);
            handleCheckDboyPinMatchUserPin()
            handleGetDeliveryBoyByActiveOrder(orderId)
            toast.success(res.message)
            
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally {
            onClose()
        }
    }

     const handleCheckDboyPinMatchUserPin = async () => {

        if(!userPin || !messId){
            alert("no userpin or messid")
            return 
        } 
    
        try {
            const res = await checkDeliveryBoyPinMatchesUsersPinApi(userPin, messId)
            console.log(res);
            setDboys(res.dBoyData)
            toast.success(res.message)
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
      } 

      const handleAssignOrderAsSelfPick = async () => {
        try {
            const res = await assignOrderAsSelfPickApi(orderId)
            console.log(res);
            handleGetOrders()
            toast.success(res.message)
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally {
            onClose()
        }
      }

     
      useEffect(() => {
        handleCheckDboyPinMatchUserPin()
      }, [])
      
      

   
    

  return (
   <>
   
   <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-25  " ></div>

      {/* Modal content */}
      <div className="relative h-120 overflow-auto bg-white w-1/2 p-10 rounded-cl shadow-lg border border-indigo-500">
        <div className="flex justify-between">
          <p className="text-3xl font-bold text-indigo-500">Available Delivery Boys</p>
          <p
            className="text-gray-500 font-bold cursor-pointer"
          onClick={onClose}
          >
            X
          </p>

         
          
        </div>


       {dBoys.length === 0 ? (
        <div className='flex flex-col justify-center items-center gap-3 h-full'>
            <p>No Delivery Boy found</p>
            <button className='bg-indigo-500 hover:bg-indigo-400 cursor-pointer px-5 py-2 rounded-2xl text-sm text-white ' onClick={handleAssignOrderAsSelfPick} >Assign Order As Self-Pick</button>
        </div>
       ) : (
        <div className='mt-5'>
            <div className='flex justify-between bg-zinc-300 p-5 font-bold'>
                <p>Name</p>
                <p>Phone</p>
                <p>Status</p>
                <p>Action</p>
            </div>
            {dBoys.map((d) => (
                <div key={d._id} className='p-3 mt-3 font-semibold  border border-zinc-400  flex justify-between'>
                    <p>{d.user.name}</p>
                    <p>{d.user.phone}</p>
                    <p>{d.availabilityStatus}</p>
                    <button className='cursor-pointer rounded-2xl bg-green-500 text-sm text-white font-bold px-2 py-1 hover:bg-green-400' onClick={()=>{
                        
                        handleAssignOrderToDboy(d._id)
                    }}>Assign</button>
                </div>
            ))}
        </div>
       )}
          
       
      </div>
    </div>
   
   
   </>
  )
}

export default AssignOrderModal