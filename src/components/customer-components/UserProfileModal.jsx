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
      <div
        className="absolute inset-0 bg-black opacity-25"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-1/4 p-10 rounded-tl-xl rounded-bl-xl shadow-lg border border-indigo-500">
        <div className="flex justify-between">
          <p className="text-3xl font-bold text-indigo-500">Profile</p>
          <p className="cursor-pointer font-bold" onClick={onClose}>
            X
          </p>
        </div>

        <div className="mt-5">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-sm">{user.phone}</p>
        </div>

        <div
          className="mt-20 bg-red-500 text-white text-center p-2 cursor-pointer font-bold"
          onClick={handleLogout}
        >
          Logout
        </div>

        {/* -------- Subscription -------- */}
        <div className="mt-6">
          <p className="text-2xl font-bold text-indigo-500">
            Subscription Detail
          </p>

          {currentSubscription ? (
            <div className="border p-4 mt-2">
              <p>Status: {currentSubscription.status}</p>
              <p>Start: {formatDate(currentSubscription.startDate)}</p>
              <p>End: {formatDate(currentSubscription.endDate)}</p>

              {timeLeft ? (
                <p className="text-green-600 font-bold mt-2">
                  ⏳{" "}
                  {currentSubscription.status === "PENDING"
                    ? "Starts in"
                    : "Ends in"}{" "}
                  {timeLeft.days}d {timeLeft.hours}h{" "}
                  {timeLeft.minutes}m {timeLeft.seconds}s
                </p>
              ) : (
                <p className="text-red-500 font-bold">
                  ❌ Subscription expired
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">
              No active or upcoming subscription
            </p>
          )}
        </div>

        {/* -------- NAV BUTTONS -------- */}
        <div
          className="mt-8 bg-indigo-500 p-2 cursor-pointer text-center text-white font-bold"
          onClick={() => navigate("/order-history-customer")}
        >
          Orders
        </div>

        <div
          className="mt-4 bg-indigo-500 p-2 cursor-pointer text-center text-white font-bold"
          onClick={() => navigate("/payment-history-customer")}
        >
          Payments
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
