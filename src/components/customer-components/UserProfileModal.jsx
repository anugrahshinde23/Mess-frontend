import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserSubscriptionApi } from "../../services/subscription.services";
import { toast } from "react-toastify";
import { calculateTimeLeft } from "../../utils/countdown";
import { getOrderHistoryApi } from "../../services/order.services";
import { useNavigate } from "react-router-dom";

const UserProfileModal = ({ onClose, handleLogout }) => {

  const navigate = useNavigate()

  const { user } = useAuth();

  const [subscription, setSubscription] = useState([]);

  const [orderHistory, setOrderHistory] = useState([])

  const [timeLeft, setTimeLeft] = useState(null);

  const activeSubscription = subscription
    .filter((s) => s.status === "ACTIVE")
    .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))[0];

  const formatDate = (date) => {
    if (!date) return "Not started yet";
    return new Date(date).toLocaleDateString("en-IN");
  };

  useEffect(() => {
    if (!activeSubscription?.endDate) return;

    const interval = setInterval(() => {
      const t = calculateTimeLeft(activeSubscription.endDate);
      setTimeLeft(t);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSubscription]);



  const handleGetOrderHistory = async () => {
    try {
      const res = await getOrderHistoryApi()
      console.log(res);
      setOrderHistory(res.orderHistory)
      toast.success(res.message)
      
    } catch (error) {
      toast.error(err.response?.data?.message);
    }
  }

  const handleGetUserSubscription = async () => {
    try {
      const res = await getUserSubscriptionApi();
      console.log(res);
      setSubscription(res.subscriptionData);
      toast.success(res.message);
    } catch (error) {
      toast.error("Failed to fetch Subscription");
    }
  };

  useEffect(() => {
    handleGetUserSubscription();
    handleGetOrderHistory()
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end backdrop-blur-sm ">
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black opacity-25  "
          onClick={onClose}
        ></div>

        {/* Modal content */}
        <div className="relative bg-white w-1/4 p-10 rounded-tl-xl rounded-bl-xl shadow-lg border border-indigo-500">
          <div className="flex justify-between">
            <p className="text-3xl font-bold text-indigo-500">Profile</p>
            <p
              className="text-gray-500 font-bold cursor-pointer"
              onClick={onClose}
            >
              X
            </p>
          </div>
          <div className="mt-5">
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-sm">{user.phone}</p>
          </div>

          <div
            className="mt-20 border p-2 text-center bg-red-500 text-white cursor-pointer hover:bg-red-400 font-bold"
            onClick={handleLogout}
          >
            Logout
          </div>

          <div className="mt-5">
            <p className="text-3xl font-bold text-indigo-500">
              Subscription Detail
            </p>
            {subscription?.map((s) => (
              <div className="border p-5">
                <p>{s.status}</p>
                <p>Start: {formatDate(s.startDate)}</p>
                <p>End: {formatDate(s.endDate)}</p>

                {activeSubscription ? (
                  timeLeft ? (
                    <p className="text-green-600 font-bold">
                      ⏳ {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
                      {timeLeft.seconds}s left
                    </p>
                  ) : (
                    <p className="text-red-500 font-bold">❌ Plan expired</p>
                  )
                ) : (
                  <p className="text-gray-500">No active plan</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 bg-indigo-500 p-2 hover:bg-indigo-400 cursor-pointer" onClick={() => {
            navigate('/order-history-customer')
          }}>
            <p className="text-white font-bold text-center cursor-pointer" >Orders</p>
          </div>

          <div className="mt-10 bg-indigo-500 p-2 hover:bg-indigo-400 cursor-pointer" onClick={() => {
            navigate('/payment-history-customer')
          }}>
            <p className="text-white font-bold text-center cursor-pointer" >Payments</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileModal;
