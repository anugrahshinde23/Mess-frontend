import React, { useEffect, useState } from "react";
import { getAllMessesApi } from "../../services/mess.services";
import { toast } from "react-toastify";
import * as MaterialDesignIcons from "react-icons/md";
import PlanListingModal from "./PlanListingModal";
import { useNavigate } from "react-router-dom";

const MessListingSection = () => {
  const [allMesses, setAllMesses] = useState(null);
const [selectedMessId, setSelectedMessId] = useState(null)

const navigate = useNavigate()
 

  const handlePlanListingModalClosing = async () => {
    setSelectedMessId(null)
  }

  const handleGetAllMesses = async () => {
    try {
      const res = await getAllMessesApi();
      console.log(res);
      setAllMesses(res);
      toast.success(res.message);
    } catch (error) {
      toast.error("Failed to fetch Messes");
    }
  };

  useEffect(() => {
    handleGetAllMesses();
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 m-15 gap-15">
        {allMesses?.messData.map((items) => (
          <div className="border border-zinc-400 rounded-4xl p-5" key={items._id}>
            <div className="flex justify-between">
              <p className="text-2xl font-semibold">{items.name}</p>
              {items.isActive ? (
                <MaterialDesignIcons.MdCircle color="green" />
              ) : (
                <MaterialDesignIcons.MdCircle color="red" />
              )}{" "}
            </div>
            <p className="text-sm">{items.description}</p>

            <div className=" flex justify-between mt-5" >
                <p className="font-bold">Address: </p>
                <p>{items.address}</p>
            </div>
            <div className=" flex justify-between " >
                <p className="font-bold">Contact: </p>
                <p>{items.contact}</p>
            </div>
            <div className=" flex justify-between " >
                <p className="font-bold">Type: </p>
                <p>{items.deliveryType === "DELIVERY" ? "Delivery" : "Self-Pickup"}</p>
            </div>

            <div className="text-sm flex items-center justify-between gap-1  text-zinc-500 font-bold text-end mt-5 hover:text-zinc-400 cursor-pointer">
              <button className="text-sm bg-indigo-500 px-2 py-1 text-white hover:bg-indigo-400 cursor-pointer rounded-full" onClick={() => {
                
                navigate(`/mess-detail/${items._id}`)
                
              }}>Explore</button>
              <div className="flex items-center gap-1.5">
              <p onClick={() => {
                
                setSelectedMessId(items._id)
              }}>See Plans</p>
              {selectedMessId && (<PlanListingModal handlePlanListingModalClosing={handlePlanListingModalClosing} messId={selectedMessId}/>)}
              <MaterialDesignIcons.MdOutlineArrowForwardIos />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MessListingSection;
