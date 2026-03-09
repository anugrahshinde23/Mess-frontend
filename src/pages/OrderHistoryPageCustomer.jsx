import React, { useEffect, useState } from "react";
import { cancelOrderApi, getOrderHistoryApi } from "../services/order.services";
import { toast } from "react-toastify";


const OrderHistoryPageCustomer = () => {


  const [selectedOrder, setSelectedOrder] = useState("placed")

  const [orderHistory, setOrderHistory] = useState([])

  const handleCancelOrder = async (orderId) => {
    try {
      const res = await cancelOrderApi(orderId)
      console.log(res);
      handleGetOrderHistory()
      toast.success(res.message)
      
    } catch (error) {

      if(error.response?.data?.message === "Order has not yet assigned")
        toast.info(error.response?.data?.message)
      else 
        toast.error(error.response?.data?.message)
    }
  }

  const handleGetOrderHistory = async () => {
    try {
      const res = await getOrderHistoryApi()
      console.log(res);
      setOrderHistory(res.orderHistory)
      toast.success(res.message)
    } catch (error) {
      toast.error("Failed to fetch")
    }
  }

  useEffect(() => {
    handleGetOrderHistory()
  }, [])
  

  const orderStatus = [
    {
      id: "placed",
      label: "Placed",
    },
    { id: "completed", label: "Completed" },
    {
      id: "cancelled",
      label: "Cancelled",
    },
  ];

  return (
    <>
      <div className="p-10">
        <div>
          <p className="text-4xl font-bold text-indigo-500">Orders</p>
        </div>
        <div className="border border-indigo-500 px-20 py-5  flex justify-between mt-10 cursor-pointer" >
          {orderStatus.map((o)=>(
            <div key={o.id} className={`${selectedOrder === o.id ?'bg-indigo-500 px-3 py-2 text-white rounded-2xl text-sm font-bold cursor-pointer' : "hover:bg-zinc-400  px-3 py-2 text-sm font-bold rounded-2xl cursor-pointer" }`} onClick={() => {
              setSelectedOrder(o.id)
            }}>
              {o.label}
            </div>
          ))}
        </div>

        
          <table className=" w-full mt-10  ">
            <thead className="bg-indigo-200 ">
              <tr>
                <th className=" p-2">Meal Type</th>
                <th className=" p-2">Items</th>
                <th className=" p-2">Date</th>
                <th className=" p-2">Status</th> 
                <th className=" p-2">Shipping</th>
                <th className=" p-2">Code</th>
                <th className=" p-2">Action</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {orderHistory
    .filter((o) => o.status.toLowerCase() === selectedOrder).map((o) => (
                <tr key={o._id}>
                  <td className="rounded-l-2xl p-2 text-center">{o.mealType}</td>
                  <td className=" p-2 text-center"> <div className="flex flex-wrap gap-1 justify-center">
 {o?.items?.map((item,i)=>(
   <span key={i} className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded">
     {item}
   </span>
 ))}
</div></td>
                  <td className="p-2 text-center">
  {new Date(o.orderDate).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })}
</td>
                  <td className=" p-2 text-center">{o.status}</td>
                  <td className=" p-2 text-center">{o.orderShippingType}</td>
                  <td className=" p-2 text-center">{o.orderCompleteCode}</td>
                  <td className="rounded-r-2xl p-2 text-center">
                    {selectedOrder === "placed" && (
                      <button className="bg-red-500 px-2 py-1 text-white font-bold text-sm cursor-pointer rounded-2xl hover:bg-red-400" onClick={() => {
                        handleCancelOrder(o._id)
                       }}>Cancel</button>
                    )}
                  </td>
                </tr>
              ))}

             
            </tbody>
          </table>
        </div>
      
    </>
  );
};

export default OrderHistoryPageCustomer;
