import React, { useState } from "react";
import registerDeliveryBoyBg from "../assests/images/registerMessBg.jpg";
import { registerDeliveryBoyApi } from "../services/deliveryBoyServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeliveryBoyRegisterPage = () => {
  const [pinCodeInput, setPinCodeInput] = useState("");
  const [servicePinCodes, setServicePinCodes] = useState([]);

  const navigate = useNavigate();

  const addPinCode = () => {
    if (!pinCodeInput) return;

    if (pinCodeInput.length !== 6) {
      alert("Enter valid 6 digit pincode");
      return;
    }

    if (servicePinCodes.includes(pinCodeInput)) {
      alert("Pincode already added");
      return;
    }

    setServicePinCodes((prev) => [...prev, pinCodeInput]);
    setPinCodeInput("");
  };

  const handleRegisterDeliveryBoy = async () => {
    try {
      const res = await registerDeliveryBoyApi(servicePinCodes);
      console.log(res);
      navigate('/delivery-boy-dashboard');
      toast.success(res.message);
      
    } catch (error) {
      toast.error(error.response?.data?.message);
      if(error.response?.data?.message === "Already registered as delivery boy"){
        navigate('/delivery-boy-dashboard')
      }
    }
  };

  return (
    <>
      <div className=" relative w-full h-screen  ">
        <div className="absolute  w-4/5 bg-white h-4/5 sm:h-4/5 shadow-2xl shadow-black/60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   ">
          <div className="w-full relative">
            <img
              className="  h-40 w-full object-cover"
              src={registerDeliveryBoyBg}
              alt=""
            />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-white font-medium">
              Mess Mate
            </p>
          </div>

          <div className="flex flex-col  sm:mx-50 gap-5 mt-15 p-10">
            <input
              type="text"
              placeholder="Enter service pincode"
              value={pinCodeInput}
              onChange={(e) => setPinCodeInput(e.target.value)}
              className="border p-2 mx-auto"
            />

            <button
              className="bg-indigo-500 hover:bg-indigo-400 cursor-pointer text-sm text-white mx-auto px-5 py-2"
              onClick={addPinCode}
            >
              Add Pincode
            </button>
          </div>

          <ul className="flex flex-wrap   justify-center items-center mx-50 gap-5">
            {servicePinCodes.map((pin, index) => (
              <li
                key={index}
                className="flex gap-3 items-center justify-center bg-zinc-300 px-5 py-2"
              >
                <p className="text-sm font-bold">{pin}</p>
                <button
                  onClick={() =>
                    setServicePinCodes((prev) => prev.filter((p) => p !== pin))
                  }
                >
                  <p className="text-red-500 text-lg font-bold">x</p>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex  p-2">
            <button
              className="bg-indigo-500 hover:bg-indigo-400 cursor-pointer text-sm text-white mx-auto px-5 py-2"
              onClick={handleRegisterDeliveryBoy}
            >
              Register
            </button>
          </div>
        </div>
        <div className="">
          <img
            className="h-60 w-full object-cover 
        shadow-lg shadow-black/20 "
            src={registerDeliveryBoyBg}
            alt=""
          />
        </div>
        <div className=""></div>
      </div>
    </>
  );
};

export default DeliveryBoyRegisterPage;
