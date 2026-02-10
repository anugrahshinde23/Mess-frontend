import React, { useState } from "react";
import * as MaterialDesignIcons from "react-icons/md";
import { sendOtpApi } from "../../services/auth.services";
import { toast } from "react-toastify";

const SendOTP = ({setTab, setPhoneNumber}) => {
  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false)

  const handleSendOTP = async () => {
    if (!phone) {
      alert("required fields");
      return;
    }

    try {
        setLoading(true)
      const res = await sendOtpApi({ phone });
      console.log(res);
      setOtp(res?.otp);
      toast.success(res.message);
      setTimeout(() => {
        setTab("tab2")
      }, 10000);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }finally {
        setLoading(false)
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10 w-1/6">
        <div className=" flex flex-col items-center  gap-5">
        <div className="bg-indigo-500 p-2   rounded-2xl w-fit">
          <MaterialDesignIcons.MdFingerprint color="white" size={30} />
        </div>
        <p className="text-2xl font-bold ">Forgot Password ? </p>
        <p className=" text-gray-400 ">Enter phone for instruction</p>
        
        </div>
        <div className="flex flex-col gap-5  ">
        <input
          type="text"
          placeholder="Enter phone"
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
          className=" border-b pb-2 outline-0"
          required
          
        />

        {otp !== "" ? <p className="font-bold">Your OTP please note it down : <span className="font-bold text-green-500">{otp}</span></p> : <p className="text-gray-400 font-bold">No OTP found</p>}

        <button
          className="text-sm  mt-50 font-bold text-white bg-indigo-500 hover:bg-indigo-400 cursor-pointer px-5 py-2 rounded-2xl "
          onClick={() => {
            handleSendOTP()
            setPhoneNumber(phone)
          }}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
        
        </div>
        
      </div>
    </>
  );
};

export default SendOTP;
