import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { approvedByOwnerApi, getSubscriptionByStatusApi, rejectedByOwnerApi } from "../../services/subscription.services";
import { getOrdersApi } from "../../services/order.services";
import AssignOrderModal from "./AssignOrderModal";

const Orders = ({handleGetMessData, messData}) => {
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [subscriptions, setSubscriptions] = useState([]);
  const [orderTab, setOrderTab] = useState("placed")
  const [order, setOrders ] = useState([])
  const [openAssignOrderModal, setOpenAssignOrderModal] = useState(false)
  const [orderId, setOrderId] = useState("")

  const onClose =  () => {
    setOpenAssignOrderModal(false)
  }

  const orderTabs = [
    {
      id : "placed",
      label : "Pending"
    },
    {
      id : "complete",
      label : "Complete"
    },
    {
      id : "cancelled",
      label : "Canceled"
    }
  ]

  const statusTab = [
    { id: "ACTIVE", label: "Active" },
    { id: "PENDING", label: "Pending" },
    { id: "REJECTED", label: "Rejected" },
    { id: "EXPIRED", label: "Expired" },
  ];

  

  const handleGetOrders = async () => {
    try {
      const res = await getOrdersApi()
      console.log(res);
      handleGetMessData()
      setOrders(res.orderData)
      toast.success(res.message)
    } catch (error) {
      toast.error("Failed to fetch Orders")
    }
  }

  useEffect(() => {
   handleGetOrders()
   handleGetMessData()
  }, [])

  
 const messId = messData?.messData?._id
 

  const [userPin, setUserPin] = useState("")
  
  

 

  const fetchSubscriptions = async (status) => {
    try {
      const res = await getSubscriptionByStatusApi(status);
      console.log(res);
      
      setSubscriptions(res.subsData);
    } catch (err) {
      toast.error("Failed to fetch subscriptions");
    }
  };

  useEffect(() => {
    fetchSubscriptions(activeTab);
  }, [activeTab]);

  const handleApprove = async (id) => {
    await approvedByOwnerApi(id);
    toast.success("Approved");
    fetchSubscriptions(activeTab);
  };

  const handleReject = async (id) => {
    await rejectedByOwnerApi(id);
    toast.success("Rejected");
    fetchSubscriptions(activeTab);
  };

  return (
    <div className="p-10">
      <p className="text-3xl font-bold text-indigo-500 mb-5">Subscriptions</p>

      <div className="flex gap-3 border  border-indigo-500 rounded-2xl p-3 justify-between">
        {statusTab.map((s) => (
          <p
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className={`cursor-pointer px-4 py-2 rounded-lg text-sm
              ${
                activeTab === s.id
                  ? "bg-indigo-500 text-white font-bold"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
          >
            {s.label}
          </p>
        ))}
      </div>

      {subscriptions.length === 0 ? (
         <div className="flex justify-center items-center text-2xl font-bold ">
          <p className={`${activeTab === "ACTIVE" ? "text-green-500  " : activeTab === "REJECTED" ? "text-red-500" : activeTab === "EXPIRED" ? "text-zinc-500" : "text-indigo-500"}`} >{activeTab}</p>
          <p className="mt-5 font-bold text-2xl text-zinc-500 w-full  text-center">  subscriptions will be displayed here</p>
         </div>
        
      ) : (
        <table className="w-full border mt-5">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Plan</th>
              <th className="border p-2">Start</th>
              <th className="border p-2">End</th>
              {activeTab === "PENDING" && (
                <th className="border p-2">Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((s) => (
              <tr key={s._id}>
                <td className="border p-2">{s.user.name}</td>
                <td className="border p-2">{s.user.phone}</td>
                <td className="border p-2">{s.plan.type}</td>
                <td className="border p-2">
                  {s.startDate
                    ? new Date(s.startDate).toDateString()
                    : "-"}
                </td>
                <td className="border p-2">
                  {s.endDate ? new Date(s.endDate).toDateString() : "-"}
                </td>

                {activeTab === "PENDING" && (
                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => handleApprove(s._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(s._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div>
        <div>
          <p className="text-3xl font-bold text-indigo-500  mt-10">Orders</p>
        </div>
        <div className="border border-indigo-500 px-20 py-5  flex justify-between mt-5 cursor-pointer">
          {orderTabs.map((o) => (
            <div key={o.id} className={`cursor-pointer px-4 py-2 rounded-lg text-sm ${orderTab === o.id ? "bg-indigo-500 text-white font-bold" : "text-gray-600 hover:bg-gray-200"}`} onClick={()=> {
              setOrderTab(o.id)
            }}>
              {o.label}
            </div>
          ))}
        </div>
        <table className="w-full mt-5 ">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Meal Type</th>
              <th className="border p-2">Items</th>
              <th className="border p-2">Order Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Destination</th>
              
            </tr>  
          </thead>
          <tbody>
            {order.filter((o) => o.status.toLowerCase() === orderTab).map((o) => (
              <tr key={o._id} className=" group relative transition-all duration-300 border-b
            cursor-pointer">
                <td className="border p-2 transition-all duration-300 text-center group-hover:blur-sm group-hover:border-none ">{o.user.name}</td>
                <td className="border p-2 transition-all duration-300 text-center group-hover:blur-sm group-hover:border-none">{o.mealType}</td>
                <td className="border p-2 transition-all duration-300 text-center group-hover:blur-sm group-hover:border-none">{o.items.map((i) => (
                  <p>{i},</p>
                ))}</td>
                <td className="border p-2 transition-all duration-300 text-center group-hover:blur-sm group-hover:border-none">{new Date(o.orderDate).toDateString()}</td>
                <td className="border p-2 transition-all duration-300 text-center group-hover:blur-sm group-hover:border-none">{o.status}</td>
                <td className="border p-2 transition-all duration-300 text-center group-hover:blur-sm group-hover:border-none">{o.payment.status}</td>
                <td className="border p-2 transition-all duration-300 text-center group-hover:blur-sm group-hover:border-none">{o.user.address}</td>
                <td className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-bold text-lg text-indigo-500  px-3 py-1 " onClick={( )=> {
                setOpenAssignOrderModal(true)
                setUserPin(o.user.pincode)
                setOrderId(o._id)
              }}>
                Assign Order
              </span>
            </td>
              </tr>
              
            ))}

            {openAssignOrderModal && <AssignOrderModal onClose={onClose} userPin={userPin} messId={messId} orderId={orderId}/>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
