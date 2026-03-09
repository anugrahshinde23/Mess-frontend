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
    
    <div className="max-w-7xl mx-auto lg:px-12 mt-12">

  {/* SECTION TITLE */}
  <p className="text-3xl font-bold text-indigo-600 mb-10">
    Messes Near You
  </p>

  {/* GRID */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

    {messes.map((m) => (

      <div
        key={m._id}
        className="bg-white border border-zinc-300 rounded-xl shadow-sm hover:shadow-lg transition p-6 flex flex-col justify-between"
      >

        {/* TOP SECTION */}
        <div className="flex justify-between items-start">

          <div>
            <p className="text-lg font-semibold text-zinc-800">
              {m.name}
            </p>

            <p className="text-xs text-zinc-500 mt-1">
              Owner: {m.owner.name}
            </p>
          </div>

          <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-semibold">
            Available
          </span>

        </div>


        {/* ADDRESS */}
        <div className="mt-4 flex items-start gap-2 text-sm text-zinc-600">

          <span>📍</span>

          <p className="leading-snug">
            {m.address}
          </p>

        </div>


        {/* BUTTON */}
        <button
          onClick={() => handleJoinMess(m._id)}
          className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2 rounded-lg transition"
        >
          Join Mess
        </button>

      </div>

    ))}

  </div>

</div>
    </>
  );
};

export default MessList;
