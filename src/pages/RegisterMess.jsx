import React, { useState } from "react";
import registerMessBg from "../assests/images/registerMessBg.jpg";
import { useNavigate } from "react-router-dom";
import { createMessApi } from "../services/mess.services";
import { toast } from "react-toastify";

const RegisterMess = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [pincode, setPincode] = useState("")
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleMessCreate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await createMessApi({ name, contact, address, description, pincode });

      console.log(res);

      toast.success(res.message);
      

      setTimeout(() => {
        navigate("/owner-dashboard");
      }, 1500);
    } catch (error) {
      toast.error("Failed to create Mess");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* name, address, description , contact */}

      <div className=" relative w-full h-screen  ">
        <div className="absolute  w-4/5 bg-white h-4/5 sm:h-4/5 shadow-2xl shadow-black/60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   ">
          <div className="w-full relative">
            <img
              className="  h-40 w-full object-cover"
              src={registerMessBg}
              alt=""
            />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-white font-medium">
              Mess Mate
            </p>
          </div>
          <div className="w-full flex flex-col gap-3 sm:gap-10 justify-center items-center  h-80 sm:h-115">
            <div className="flex sm:flex-row flex-col gap-3 justify-center ">
              <input
                className="border p-2 sm:p-3 border-gray-400"
                type="text"
                name="name"
                placeholder="Enter mess name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="border p-2 sm:p-3 border-gray-400"
                type="text"
                name="contact"
                placeholder="Enter mess contact"
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="flex flex-col  w-full items-center gap-3">
              <input
                className="border p-2 sm:p-3 w-1/2 sm:w-1/3 border-gray-400 "
                type="text"
                name="address"
                placeholder="Enter mess address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className="border p-2 sm:p-3 w-1/2 sm:w-1/3 border-gray-400"
                type="text"
                name="description"
                placeholder="Enter mess description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                className="border p-2 sm:p-3 w-1/2 sm:w-1/3 border-gray-400"
                type="Number"
                name="pincode"
                placeholder="Enter Pincode"
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            <div className="bg-indigo-500 p-2 sm:p-3 hover:bg-indigo-400 cursor-pointer">
              <button className="text-sm font-bold text-white cursor-pointer" onClick={handleMessCreate}>
                {Loading ? "Creating Mess..." : "Register Mess"}
              </button>
            </div>
          </div>
        </div>
        <div className="">

          <img
            className="h-60 w-full object-cover 
    shadow-lg shadow-black/20 "
            src={registerMessBg}
            alt=""
          />
        </div>
        <div className=""></div>
      </div>
    </>
  );
};

export default RegisterMess;
