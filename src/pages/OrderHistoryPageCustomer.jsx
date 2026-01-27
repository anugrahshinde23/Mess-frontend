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
      toast.error("Failed to cancel order")
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
            <thead>
              <tr>
                <th className="border p-2">Meal Type</th>
                <th className="border p-2">Items</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory
    .filter((o) => o.status.toLowerCase() === selectedOrder).map((o) => (
                <tr key={o._id}>
                  <td className="border p-2 text-center">{o.mealType}</td>
                  <td className="border p-2 text-center">{o.items.length}</td>
                  <td className="border p-2 text-center">{o.orderDate}</td>
                  <td className="border p-2 text-center">{o.status}</td>
                  <td className="border p-2 text-center">
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
