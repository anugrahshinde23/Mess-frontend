import React, { useEffect, useState } from 'react'
import { oneTimeOrderApi } from '../../services/order.services'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const PlaceOrderModal = ({onClose, messId, oneTimePrice}) => {

  const navigate = useNavigate()

  const [selectedMeal, setSelectedMeal] = useState("breakfast")

  const [order, setOrder] = useState(null)

  const [payment, setPayment] = useState([])
  
  
   const handleGetPaymentHistoryUser = async () => {
      try {
          const res = await getPaymentHistoryForUserApi()
          console.log(res);
          setPayment(res.paymentData)
          toast.success(res.message)
      } catch (error) {
          toast.error(error.response?.data?.message)
      }
   }
  
   useEffect(() => {
     handleGetPaymentHistoryUser()
   }, [])

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await oneTimeOrderApi({
        messId,
        mealType: selectedMeal
      });
  
      toast.success(res.message);
  
      // ✅ decision based on API response
      if (res.orderData) {
        navigate("/pay", {
          state: { orderId: res.orderData._id,
            amount : oneTimePrice,
            mealType : selectedMeal,
            messId : messId
           }
        });
      } else {
        onClose();
      }
  
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };


  if(payment.filter((p) => p.status === "PENDING")){
    <button className='text-sm py-1 bg-indigo-500 text-white font-bold hover:bg-indigo-400 cursor-pointer' onClick={() => {
    navigate('/pay')
    }}>
      Pay
    </button>
  }
  


  return (
    <>
    
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-25  " ></div>

      {/* Modal content */}
      <div className="relative bg-white w-1/4 p-10 rounded-cl shadow-lg border border-indigo-500">
        <div className="flex justify-between">
          <p className="text-3xl font-bold text-indigo-500">Place Order</p>
          <p
            className="text-gray-500 font-bold cursor-pointer"
           onClick={onClose}
          >
            X
          </p>

          
        </div>

<div className='flex gap-2 flex-col'>
  <select value={selectedMeal} name="" id="" onChange={(e) => setSelectedMeal(e.target.value)} className='border mt-5'>
    <option value="breakfast">Breakfast</option>
    <option value="lunch">Lunch</option>
    <option value="dinner">Dinner</option>
  </select>

  <button className='text-sm py-1 bg-indigo-500 text-white font-bold hover:bg-indigo-400 cursor-pointer' onClick={(e) => {
    handlePlaceOrder(e)
  }}>
    Order
  </button>
</div>


       
      </div>
    </div>
    
    </>
  )
}

export default PlaceOrderModal