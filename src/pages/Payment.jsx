import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createPaymentApi } from "../services/payment.services";
import { toast } from "react-toastify";
import { QRCodeSVG } from "qrcode.react"; // Install this: npm install qrcode.react

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [utrNumber, setUtrNumber] = useState("");

  const { messId, orderId, amount, mealType } = location.state || {};

  // 1. Define Admin UPI Details
  const adminUpiId = "9545548755@axl"; // Change this to your real Admin UPI ID
  
  // 2. Create the UPI Deep Link
  // This is what opens the UPI apps automatically
  const upiLink = `upi://pay?pa=${adminUpiId}&pn=MessMate&am=${amount}&cu=INR&tn=Order_${orderId}`;

  useEffect(() => {
    if (!messId || !orderId || !amount || !mealType) {
      navigate("/");
    }
  }, [messId, orderId, amount, mealType, navigate]);

  const handleCreatePayment = async () => {
    if (utrNumber.length < 12) {
      return toast.error("Please enter a valid 12-digit UTR number");
    }
    try {
      const res = await createPaymentApi({ messId, orderId, amount, utrNumber });
      toast.success("Payment submitted for Admin approval!");
      navigate('/customer-home');
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  if (!messId || !orderId || !amount || !mealType) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Navbar Style Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Secured by</span>
          <span className="text-2xl text-indigo-600 font-bold tracking-tight">MessMate</span>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Amount to Pay</p>
          <p className="text-2xl font-black text-gray-800">₹{amount}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Side: Order Summary */}
        <div className="w-full lg:w-1/2 p-10 bg-gray-50 flex flex-col justify-center border-r border-gray-200">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Order Summary</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                <span className="text-gray-500 font-medium">Meal Plan</span>
                <span className="font-bold text-gray-800">{mealType.toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                <span className="text-gray-500 font-medium">Order ID</span>
                <span className="font-mono text-sm text-indigo-600">{orderId}</span>
              </div>
              <div className="pt-6 border-t border-gray-200 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total Payable</span>
                <span className="text-3xl font-black text-indigo-600">₹{amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Payment Action */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col items-center justify-center bg-white">
          <div className="max-w-md w-full text-center">
            
            {/* QR CODE SECTION */}
            <div className="mb-8 flex flex-col items-center">
              <div className="p-4 bg-white border-4 border-indigo-50 shadow-xl rounded-3xl mb-4">
                <QRCodeSVG value={upiLink} size={200} />
              </div>
              <p className="text-sm text-gray-500 mb-4 font-medium">Scan with GPay, PhonePe, or Paytm</p>
              
              {/* DEEP LINK BUTTON */}
              <a 
                href={upiLink}
                className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-6 py-3 rounded-full font-bold text-sm hover:bg-indigo-100 transition-all active:scale-95"
              >
                Open UPI App Automatically
              </a>
            </div>

            <div className="space-y-4 text-left">
               <div>
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Step 1: Pay Amount</label>
                 <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-sm text-gray-600">
                    Pay ₹{amount} to <span className="font-bold text-gray-800">{adminUpiId}</span>
                 </div>
               </div>

               <div>
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Step 2: Enter UTR Number</label>
                 <input
                   type="text"
                   placeholder="12 Digit Transaction ID"
                   className="w-full border border-gray-200 px-5 py-4 rounded-2xl focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-center font-mono text-xl"
                   value={utrNumber}
                   onChange={(e) => setUtrNumber(e.target.value)}
                 />
               </div>

               <button 
                 onClick={handleCreatePayment}
                 className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all transform active:scale-[0.98]"
               >
                 I HAVE PAID ₹{amount}
               </button>
            </div>

            <p className="mt-8 text-[11px] text-gray-400">
              Payments are verified manually by Admin. Usually takes 5-10 mins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;