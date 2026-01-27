import React, { useEffect, useState } from "react";
import { activateMessApi, deleteMessApi, updateMessApi } from "../../services/mess.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Shop = ({ messData, handleGetMessData , showUpdateModal, setShowUpdateModal}) => {


 

  const navigate = useNavigate()

  const [Loading, setLoading] = useState(false)


  const handleActivateMessAgain = async() => {
    try {
      setLoading(true)

      const res = await activateMessApi()
      toast.success(res.message)
      await handleGetMessData()
 


    } catch (error) {
      toast.error("Failed to Activate Mess")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMess = async() => {
    try {

       setLoading(true)

      const res = await deleteMessApi()
      

      toast.success(res.message)
      await handleGetMessData()
      
    } catch (error) {
      toast.error("Failed to delete Mess")
    } finally {
      setLoading(false)
    }
  }




  useEffect(() => {
    handleGetMessData();
  }, []);

  const isActive = messData?.messData?.isActive

  
if (!messData) return (
  <div className="flex flex-col gap-5 justify-center items-center h-full">
    <p className="text-2xl font-bold text-zinc-500">Your Mess is Temporarily Deactivated Click Below to activate it again.</p>
    <button className="text-white bg-indigo-500 font-bold rounded-full p-2 cursor-pointer hover:bg-indigo-400" onClick={handleActivateMessAgain} >{Loading ? "Activating Mess..." : "Activate Mess"}</button>
  </div>
)


  return (
    <>

      
      <div className="flex justify-between  p-10 h-full ">
      <div className="flex flex-col gap-5  " >
          <p className=" text-4xl sm:text-5xl font-extrabold  " >{messData?.messData?.name}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-500"> Address : {messData?.messData?.address}</p>
          <p className=" text-xl sm:text-2xl font-bold text-gray-500"> Contact : {messData?.messData?.contact}</p>
          <p className=" text-xl sm:text-2xl font-bold text-gray-500"> Description : {messData?.messData?.description}</p>

          <div className="flex gap-5 mt-10">
        <button className="bg-indigo-500 px-5 py-2 text-white font-bold hover:bg-indigo-400 rounded-full cursor-pointer" onClick={() => {
            setShowUpdateModal(true)
        }}>Edit</button>
        <button className="bg-red-500 px-5 py-2 text-white font-bold hover:bg-red-400 rounded-full cursor-pointer" onClick={handleDeleteMess} >
          {Loading ? "Deleting..." : "Delete"}
        </button>
      </div>
          
        </div>

        <div>
         <p className={`${isActive ? 'text-green-500 text-md sm:text-2xl font-bold' : 'text-red-500 text-md sm:text-2xl font-bold'}`}>  {isActive ? 'Active' : "Closed"}</p>
        </div>

        
      
      </div>

     
    </>
  );
};

export default Shop;
