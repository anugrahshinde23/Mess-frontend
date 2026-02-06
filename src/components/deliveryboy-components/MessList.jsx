import React, { useEffect, useState } from "react";
import { getMessByPincodeApi, joinMessApi } from "../../services/deliveryBoyServices";
import { toast } from "react-toastify";

        

const MessList = () => {
  const [messes, setMesses] = useState([]);

  const handleJoinMess = async (messId) => {
    try {
        const res = await joinMessApi(messId)
        console.log(res);
        toast.success(res.message)
    } catch (error) {
        toast.error(error.response?.data?.message)        
    }
  }

  const handleGetMessByPincode = async () => {
    try {
      const res = await getMessByPincodeApi();
      console.log(res);
      setMesses(res.messData);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    handleGetMessByPincode();
  }, []);

  return (
    <>
    
      <div>
        <p className="text-3xl font-semibold text-indigo-500 mx-26 mt-10">Messes Near You</p>
      </div>

      <div className="grid grid-cols-3 gap-10  mt-10 mx-26">
        {messes.map((m) => (
          <div className="bg-indigo-200 p-10 rounded-2xl" key={m._id}>
            <div className="flex justify-between items-center ">
              <p className="text-xl font-semibold">{m.name}</p>
              <p className="text-sm text-teal-500 font-bold">{m.owner.name}</p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="font-semibold">Address</p>
              <p className="font-bold text-sm">{m.address}</p>
            </div>
            <div className="">
              <button className="rounded-2xl text-sm font-bold cursor-pointer bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-1 mt-7" onClick={() => {
                handleJoinMess(m._id)
              }}>
                Join Mess
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MessList;
