import React, { useEffect, useState } from 'react'
import { getOrderReqApi, getSubscriptionOrdersApi } from '../../services/order.services'
import { toast } from 'react-toastify'
import { approveOrderRequestApi, rejectOrderRequestApi } from '../../services/deliveryBoyServices'
import CompleteOrderByDboyModal from './CompleteOrderByDboyModal'
import CompleteOrderForSubscriptionByDboy from './CompleteOrderForSubscriptionByDboy'

const Orders = ({dBoy}) => {


  const dBoyId = dBoy?._id

  const [orderId, setOrderId] = useState("")

  const [subsOrderId, setSubsOrderId] = useState("")

  const [subsOrders, setSubsOrders] = useState([])

  const [orderStatus, setOrderStatus] = useState("")

  const [orderReq, setOrderReq] = useState([])

  const [openCompleteSubsOrderModal, setOpenSubsOrderModal] = useState(false)

  const [openCompleteOrderModal, setOpenCompleteOrderModal] = useState(false)


  const onCloseSubsOrderModal = () =>{
    setOpenSubsOrderModal(false)
  }

  const onCloseCompleteOrderModal = () => {
    setOpenCompleteOrderModal(false)
  }


  const handleGetSubscriptionOrders = async () => {
    if(!dBoyId){
      alert("No dBoyId")
      return
    }

    try {
      const res = await getSubscriptionOrdersApi(dBoyId)
      // console.log(res);
      // toast.success(res.message)
      setSubsOrders(res.orderData)

    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }


  const handleOrderReq = async () => {


    if(!dBoyId){
      alert("No dBoyid")
      return 
    }

    try {
      const res = await getOrderReqApi(dBoyId)
      // console.log(res);
      setOrderReq(res.reqData)
      // toast.success(res.message)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const handleApproveOrderRequest = async (orderReqId, orderId) => {
    try {
      const res = await approveOrderRequestApi({orderReqId, dBoyId, orderId})
      console.log(res);
      handleOrderReq()
      toast.success(res.message)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const handleRejectOrderRequest = async (orderReqId) => {
    try {
      const res = await rejectOrderRequestApi({orderReqId, dBoyId , orderId})
      console.log(res);
      handleOrderReq()
      toast.success(res.message)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  useEffect(() => {
    handleOrderReq()
    handleGetSubscriptionOrders()
     const interval = setInterval(() => {
    handleOrderReq();
    handleGetSubscriptionOrders()
  }, 5000); 

  // Jab component band ho to interval ko clear karna zaroori hai
  return () => clearInterval(interval);
  }, [dBoyId])
  


  const [status, setStatus] = useState("PENDING")

 const orderReqStatus = [
    {id:"PENDING", label : "Pending"},
    {id:"ACCEPTED", label : "Accepted"},
    {id:"REJECTED", label : "Rejected"},
    {id:"EXPIRED", label : "Expired"}
 ]


  return (
    <>
    <p className='text-2xl font-bold text-indigo-500 m-10'>Normal Orders</p>
    <div className=' m-5 px-5 sm:px-10 py-5 rounded-2xl flex  justify-between items-center'>
      
      {orderReqStatus.map((o) => (
        <div key={o.id} className={`${status === o.id ? "bg-indigo-500 p-2 text-white font-bold rounded-2xl text-sm cursor-pointer" : "hover:bg-zinc-300 text-sm p-2 rounded-2xl cursor-pointer"}`}  onClick={() => {
          setStatus(o.id)
        }}>
          {o.label}
        </div>
      ))}
    </div>


 <div className='mx-5'>
  
  {orderReq.length === 0 ? (
<div className='h-full flex justify-center items-center '>

  <p>Nothing to Show</p>
</div>
  ) : (
    
    <table className='w-full '>
    <thead >
      <tr>
        <th className='p-2 border'>From</th>
        <th className='p-2 border'>Meal</th>
        <th className='p-2 border'>Items</th>
        <th className='p-2 border'>Payment</th>
        <th className='p-2 border'>To</th>
        <th className='p-2 border'>Destination</th>
        <th className='p-2 border'>Customer Phone</th>
        {status === "PENDING" && (
          <th className='p-2 border'>Action</th>
        )}
        {status === "ACCEPTED" &&   (
          <th className='p-2 border'>Mark Complete</th>
        )}
        
      </tr>
    </thead>
    <tbody >
      {orderReq.filter((o) => o.status === status).map((o) => (
       
         <tr key={o._id}>
          <td className='p-2 border text-center'>{o.mess.name}</td>
          <td className='p-2 border text-center'>{o.order.mealType}</td>
          <td className='p-2 border text-center'>{o.order.items}</td>
          <td className='p-2 border text-center'>{o.order.payment.status}</td>
          <td className='p-2 border text-center'>{o.order.user.name}</td>
          <td className='p-2 border text-center'>{o.order.user.address}</td>
          <td className='p-2 border text-center'>{o.order.user.phone}</td>

          {status === "PENDING" && (
            <td className='p-2  text-center flex flex-col gap-1 border-b border-r'>
            <button className='rounded-2xl bg-green-500 hover:bg-green-400 cursor-pointer text-white text-sm font-bold px-2 py-1' onClick={() => {
              handleApproveOrderRequest(o._id, o.order._id)
            }}>Accept</button>
            <button className='rounded-2xl bg-red-500 hover:bg-red-400 cursor-pointer text-white text-sm font-bold px-2 py-1' onClick={() => {
              handleRejectOrderRequest(o._id, o.order._id)
            }}>Reject</button>
          </td>
          )}

          {status === "ACCEPTED" && o.order.status !== "COMPLETED" ? (
            <td className='flex justify-center items-center p-2 border-b border-r'>
              <button className='text-sm bg-green-500 hover:bg-green-400 font-bold text-white   px-2 py-1 cursor-pointer' onClick={() => {
                setOpenCompleteOrderModal(true)
                setOrderId(o.order._id)
                setOrderStatus(o.order.status)
              }}>Complete</button>
            </td>
          ) : (
            <div className='flex justify-center items-center p-2 border-b border-r'>
              <p>Completed</p>
            </div>
          )}
         
        </tr>
       
       
        
      ))}
    </tbody>
    
  </table>
  )}

  <hr className='border w-full my-10 text-indigo-500'></hr>

  <div className='mt-10'>
    <p className='text-indigo-500 text-2xl font-bold m-5'>
      Subscription Orders
    </p>

   {subsOrders.length === 0 ? (
    <div className='text-center '>
      <p>Nothing to show</p>
    </div>
   ) : (
     <table className='w-full'>
     <thead>
       <tr>
         <th className='p-2 border'>From</th>
         <th className='p-2 border'>Meal</th>
         <th className='p-2 border'>Items</th>
         <th className='p-2 border'>To</th>
         <th className='p-2 border'>Destination</th>
         <th className='p-2 border'>Customer Phone</th>
         <th className='p-2 border'>Action</th>
       </tr>
     </thead>
     <tbody>
      {subsOrders.filter((o) => o.status === "PLACED").map((o) => (
       <tr key={o._id}>
         <td className='p-2 border text-center'>{o?.mess?.name}</td>
         <td className='p-2 border text-center'>{o?.mealType}</td>
         <td className='p-2 border text-center'>{o?.items}</td>
         <td className='p-2 border text-center'>{o?.user?.name}</td>
         <td className='p-2 border text-center'>{o?.user?.address}</td>
         <td className='p-2 border text-center'>{o?.user?.phone}</td>
         <td className='p-2 border text-center'>
           <button className='bg-green-500 hover:bg-green-400 cursor-pointer font-bold text-white text-sm px-2 py-1 ' onClick={() => {
             setOpenSubsOrderModal(true)
             setSubsOrderId(o._id)
           }}>Mark Complete</button>
         </td>
       </tr>
      ))}
     </tbody>
   </table>
   )}

  </div>
  
 
 </div>

 {openCompleteSubsOrderModal && <CompleteOrderForSubscriptionByDboy onCloseSubsOrderModal={onCloseSubsOrderModal} orderId={subsOrderId} dBoyId={dBoyId}/>}

 {openCompleteOrderModal && <CompleteOrderByDboyModal onCloseCompleteOrderModal={onCloseCompleteOrderModal} orderId={orderId} dBoyId={dBoyId}/>}



    </>
  )
}

export default Orders