import React from "react";
import orderFood from '../../assests/images/order-food.png'
import payment from '../../assests/images/payment.png'
import plan from '../../assests/images/plan.png'
import tracking from '../../assests/images/tracking.png'

const OurServices = () => {
  return (
    <>
      <div className="sm:ml-15 my-20 flex flex-row sm:flex-col gap-10 mx-5 sm:gap-5 w-full sm:w-1/2">
        <p className="text-indigo-500 text-3xl sm:text-5xl font-bold ">Our Services</p>
        <p className="text-zinc-500 text-sm font-medium">
          Mess Mate is a multi-mess website offers a comprehensive suite of
          services for customers, mess/restaurant operators, delivery personnel,
          and administrators to manage the entire food ordering and delivery
          lifecycle
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:mx-15  mb-15">
        <div className="shadow-indigo-500 shadow-2xl  flex flex-col gap-4 w-80 p-6 rounded-2xl bg-white 
      transition-all duration-300 ease-out
      hover:-translate-y-3 hover:scale-105
      hover:shadow-2xl hover:shadow-black/40
      cursor-pointer hover:bg-indigo-500">
        <div>
        <img className="w-12 h-12 object-cover" src={orderFood} alt="" />
        </div>
          <p className="text-xl font-medium">Online Ordering</p>
          <p className="text-sm  ">
            Customers can browse menus from multiple messes/restaurants in one
            place, customize meals, and place orders via a website or mobile app
          </p>
        </div>

        <div className=" shadow-indigo-500 shadow-2xl  flex flex-col gap-4 w-80 p-6 rounded-2xl bg-white 
      transition-all duration-300 ease-out
      hover:-translate-y-3 hover:scale-105
      hover:shadow-2xl hover:shadow-black/40
      cursor-pointer hover:bg-indigo-500">
         <div>
        <img className="w-12 h-12 object-cover" src={plan} alt="" />
        </div>
          <p className="text-xl font-medium">Flexible Plans</p>
          <p className="text-sm">
            The ability to choose from daily orders, weekly, or monthly
            subscription plans, along with options to pause or reschedule meals.
          </p>
        </div>

        <div className="shadow-indigo-500 shadow-2xl  flex flex-col gap-4 w-80 p-6 rounded-2xl bg-white 
      transition-all duration-300 ease-out
      hover:-translate-y-3 hover:scale-105
      hover:shadow-2xl hover:shadow-black/40
      cursor-pointer hover:bg-indigo-500">
         <div>
        <img className="w-12 h-12 object-cover" src={payment} alt="" />
        </div>
          <p className="text-xl font-medium"> Payments Options</p>
          <p className="text-sm">
            Multiple secure payment gateways (credit/debit cards, digital
            wallets, UPI, cash on delivery) for seamless transactions.
          </p>
        </div>

        <div className="shadow-indigo-500 shadow-2xl  flex flex-col gap-4 w-80 p-6 rounded-2xl bg-white 
      transition-all duration-300 ease-out
      hover:-translate-y-3 hover:scale-105
      hover:shadow-2xl hover:shadow-black/40
      cursor-pointer hover:bg-indigo-500">
         <div>
        <img className="w-12 h-12 object-cover" src={tracking} alt="" />
        </div>
          <p className="text-xl font-medium">Real-Time Tracking</p>
          <p className="text-sm">
            Live GPS tracking of orders from preparation to delivery, with
            automated status updates via push notifications, SMS, or email
          </p>
        </div>
      </div>
    </>
  );
};

export default OurServices;
