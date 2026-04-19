import React, { useState } from "react";
import TodayDate from "../../utils/TodayDate";
import { useAuth } from "../../context/AuthContext";
import * as MaterialDesignIcons from 'react-icons/md'

const SideBar = ({tab, setTab}) => {


  const { user } = useAuth()

  

  const items = [
    {"id" : "dashboard" , "label" : "Dashboard"},
    {"id" : "mess" , "label" : "Mess"},
    {"id" : "verity" , "label" : "Verity AI"},
    {"id" : "payment" , "label" : "Payment"},
    {"id" : "user" , "label" : "User"},
    {"id" : "plan" , "label" : "Plan"},
    {"id" : "settings" , "label" : "Settings"},
  ]


  return (
    <>
      <div className="flex flex-col gap-10 w-70">
        <div className=" ">
          <p className="text-2xl text-white ">MessMate</p>
        </div>
        <div className="bg-[#171717] flex flex-col gap-2 p-5 rounded-2xl">
          <div className=" flex justify-between items-center">
            <img
              className="rounded-2xl w-15 h-15 object-cover"
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
            <button
              className="px-2 py-1 rounded-xl text-white text-sm font-bold 
  bg-linear-to-r from-indigo-500 to-indigo-700
  hover:from-indigo-600 hover:to-indigo-800
  transition duration-300"
            >
              Dark
            </button>
          </div>
          <div>
          <TodayDate/>
          </div>
          <div>
          
            <p className="text-white text-2xl font-bold">Welcome back,</p>
            <p className="text-white font-bold text-2xl">{user.name.split(" ")[0]}</p>
          </div>
          
        </div>
        <div className="bg-[#171717] p-5 rounded-2xl flex flex-col gap-2 ">
           
          {items.map((i) => (
            <div  className={`text-white flex items-center gap-2 text-sm p-2 cursor-pointer ${tab === i.id ? `bg-zinc-800 rounded` : `hover:bg-indigo-700 rounded`} `}
            onClick={() => {
                setTab(i.id)
            }}
            key={i.id}
            
            >
                {i.id ===  "dashboard" ? <MaterialDesignIcons.MdDashboard /> : i.id === "mess" ? <MaterialDesignIcons.MdShop /> : i.id === "payment" ? <MaterialDesignIcons.MdPayment/> : i.id === "user" ? <MaterialDesignIcons.MdPerson/> : i.id === "plan" ? <MaterialDesignIcons.MdPlayLesson/> : i.id === "settings" ? <MaterialDesignIcons.MdSettings /> : i.id === "verity" ? <MaterialDesignIcons.MdStar /> : null}
                <p>{i.label}</p>
            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default SideBar;
