import React, { useEffect } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createPaymentApi } from "../services/payment.services";
import { toast } from "react-toastify";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth()
  

  const { messId ,orderId, amount, mealType } = location.state || {};

  useEffect(() => {
    if ( !messId || !orderId || !amount || !mealType) {
      navigate("/");
    }
  }, [ messId, orderId, amount,mealType, navigate]);

  if (!messId || !orderId || !amount || !mealType) return null;


  const handleCreatePayment = async() => {
    try {
      const res = await createPaymentApi({messId,orderId, amount})
      console.log(res);
      toast.success(res.message)
      navigate('/customer-home')
    } catch (err) {
      toast.error(err.response?.data?.message)
    }
  }
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="p-10 shadow-md">
          <div className="flex gap-2 ">
            <p className="font-normal flex items-end text-lg  ">Secured by</p>
            <p className="text-3xl text-indigo-500 font-semibold">MessMate</p>
          </div>
        </div>
        <div className="flex flex-1 w-full py-25 ">
          <div className="border-r-3 border-gray-300 w-1/2 px-20 py-10   ">
            <div className=" w-full h-full flex flex-col justify-center gap-7 ">
              <p className="text-3xl font-bold">Payment details</p>
              <div className="flex justify-between">
                <p className="text-2xl font-semibold">Meal </p>
                <p className="text-xl">
                  {" "}
                  {mealType.toUpperCase()}/Rs.{amount}
                </p>
              </div>
              <div className="flex justify-between border-t-2  border-gray-300 pt-5">
                <p className="text-2xl font-semibold">Total</p>
                <p className="text-3xl">Rs.{amount}</p>
              </div>
            </div>
          </div>

          <div className=" w-1/2 px-20">
          <div className="flex flex-col  gap-10">
            <input type="text" className="border relative border-gray-300  px-5 py-4 rounded-2xl" value={user.name}/>
            <input type="text" className="border  border-gray-300 px-5 py-4 rounded-2xl" value={orderId}/>
            <input type="text" className="border border-gray-300  px-5 py-4 rounded-2xl" value={amount}/>
          </div>
          <div className="mt-10 text-center">
          <p>By clicking the 'Pay' button you confirm that you have read the service </p>
          <p>information and accept the <span className="text-indigo-500" >Data Protection Agreement</span> and <span className="text-indigo-500" >Distance Sales </span></p>
          <p className="text-indigo-500" >Agreement</p>
          </div>

          <div className="mt-5 ">
            <button className="bg-indigo-500 w-full px-5 py-4 rounded-2xl text-white hover:bg-indigo-400 cursor-pointer font-bold" onClick={handleCreatePayment}>Pay {amount} Rs.</button>
          </div>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
