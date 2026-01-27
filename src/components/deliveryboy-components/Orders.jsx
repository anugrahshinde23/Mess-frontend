import React, { useEffect, useState } from 'react'
import { getOrderReqApi } from '../../services/order.services'
import { toast } from 'react-toastify'

const Orders = ({dBoy}) => {


  const dBoyId = dBoy?._id

  const [orderReq, setOrderReq] = useState([])


  const handleOrderReq = async () => {


    if(!dBoyId){
      alert("No dBoyid")
      return 
    }

    try {
      const res = await getOrderReqApi(dBoyId)
      console.log(res);
      setOrderReq(res.reqData)
      // toast.success(res.message)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  useEffect(() => {
    handleOrderReq()
     const interval = setInterval(() => {
    handleOrderReq();
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
    <div className=' m-5 px-10 py-5 rounded-2xl flex justify-between items-center'>
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
        </tr>
        
      ))}
    </tbody>
    
  </table>
  )}
 
 </div>



    </>
  )
}

export default Orders