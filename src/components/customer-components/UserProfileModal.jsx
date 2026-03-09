import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserSubscriptionApi } from "../../services/subscription.services";
import { toast } from "react-toastify";
import { calculateTimeLeft } from "../../utils/countdown";
import { getOrderHistoryApi } from "../../services/order.services";
import { useNavigate } from "react-router-dom";

const UserProfileModal = ({ onClose, handleLogout }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [subscription, setSubscription] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);

  /* ------------------ CURRENT SUBSCRIPTION ------------------ */
  const currentSubscription = subscription
    .filter(
      (s) => s.status === "ACTIVE" || s.status === "PENDING"
    )
    .sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    )[0];

  /* ------------------ FORMAT DATE ------------------ */
  const formatDate = (date) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleDateString("en-IN");
  };

  /* ------------------ TIMER LOGIC (FIXED) ------------------ */
  useEffect(() => {
    if (!currentSubscription) return;

    const interval = setInterval(() => {
      let targetDate;

      if (currentSubscription.status === "PENDING") {
        targetDate = currentSubscription.startDate;
      }

      if (currentSubscription.status === "ACTIVE") {
        targetDate = currentSubscription.endDate;
      }

      const t = calculateTimeLeft(targetDate);
      setTimeLeft(t);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSubscription]);

  /* ------------------ API CALLS ------------------ */
  const handleGetUserSubscription = async () => {
    try {
      const res = await getUserSubscriptionApi();
      setSubscription(res.subscriptionData);
    } catch (error) {
      toast.error("Failed to fetch subscription");
    }
  };

  const handleGetOrderHistory = async () => {
    try {
      const res = await getOrderHistoryApi();
      setOrderHistory(res.orderHistory);
    } catch (error) {
      toast.error("Failed to fetch order history");
    }
  };

  useEffect(() => {
    handleGetUserSubscription();
    handleGetOrderHistory();
  }, []);

  /* ------------------ UI ------------------ */
  return (
    <div className="fixed inset-0 z-50 flex justify-end backdrop-blur-sm">
  
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      ></div>
  
      {/* Modal */}
      <div className="relative bg-white w-full sm:w-[380px] h-full p-6 shadow-2xl border-l border-zinc-200 flex flex-col">
  
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-2xl font-bold text-indigo-600">
            Profile
          </h2>
  
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-black text-lg font-bold"
          >
            ✕
          </button>
        </div>
  
        {/* User Info */}
        <div className="mt-6 bg-indigo-50 rounded-xl p-4 flex flex-col gap-1">
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-zinc-600">{user.phone}</p>
        </div>
  
  
        {/* Subscription Section */}
        <div className="mt-8">
  
          <h3 className="text-lg font-semibold text-zinc-700 mb-2">
            Subscription
          </h3>
  
          {currentSubscription ? (
            <div className="border rounded-xl p-4 flex flex-col gap-2 bg-white shadow-sm">
  
              <p className="text-sm">
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-indigo-600 font-semibold">
                  {currentSubscription.status}
                </span>
              </p>
  
              <p className="text-sm">
                <span className="font-semibold">Start:</span>{" "}
                {formatDate(currentSubscription.startDate)}
              </p>
  
              <p className="text-sm">
                <span className="font-semibold">End:</span>{" "}
                {formatDate(currentSubscription.endDate)}
              </p>
  
              {timeLeft ? (
                <div className="mt-3">
  
                  <p className="font-semibold text-center text-zinc-600 mb-2">
                    {currentSubscription.status === "PENDING"
                      ? "Starts In"
                      : "Ends In"}
                  </p>
  
                  <div className="grid grid-cols-4 gap-2 text-center">
  
                    <div className="bg-indigo-600 text-white rounded-lg p-2">
                      <p className="text-lg font-bold">{timeLeft.days}</p>
                      <p className="text-xs">Days</p>
                    </div>
  
                    <div className="bg-indigo-600 text-white rounded-lg p-2">
                      <p className="text-lg font-bold">{timeLeft.hours}</p>
                      <p className="text-xs">Hours</p>
                    </div>
  
                    <div className="bg-indigo-600 text-white rounded-lg p-2">
                      <p className="text-lg font-bold">{timeLeft.minutes}</p>
                      <p className="text-xs">Min</p>
                    </div>
  
                    <div className="bg-indigo-600 text-white rounded-lg p-2">
                      <p className="text-lg font-bold">{timeLeft.seconds}</p>
                      <p className="text-xs">Sec</p>
                    </div>
  
                  </div>
                </div>
              ) : (
                <p className="text-red-500 font-semibold mt-2 text-center">
                  Subscription expired
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">
              No active or upcoming subscription
            </p>
          )}
        </div>
  
  
        {/* Navigation Buttons */}
        <div className="mt-8 flex flex-col gap-3">
  
          <button
            onClick={() => navigate("/order-history-customer")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-semibold transition"
          >
            View Orders
          </button>
  
          <button
            onClick={() => navigate("/payment-history-customer")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-semibold transition"
          >
            Payment History
          </button>
  
        </div>
  
  
        {/* Logout */}
        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-400 text-white py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
  
      </div>
    </div>
  );
};

export default UserProfileModal;
