import React, { useEffect, useState } from "react";
import { addPlanToMessApi, getAllPlansApi, removePlanFromMessApi } from "../../services/plan.services";
import { toast } from "react-toastify";
import PlanPriceModal from "./PlanPriceModal";

const Plan = ({ messData, handleGetMessData }) => {
  const [isActive, setIsActive] = useState(false);

  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const handleShowPlanPriceModal = () => {
    if (isActive === true) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const onClose = () => {
    setIsActive(false);
  };

  const [plans, setPlans] = useState(null);

  const [price, setPrice] = useState("");

  const [Loading, setLoading] = useState(false);

  const handleAddPlanToMess = async (e) => {
    e.preventDefault();

    console.log("plan id is : ", selectedPlanId);

    try {
      setLoading(true);

      const res = await addPlanToMessApi({ planId: selectedPlanId, price });

      handleGetMessData();
      console.log(res);
      toast.success(res.message);
    } catch (error) {
      toast.error("Failed to add plan to mess");
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllPlans = async () => {
    try {
      const res = await getAllPlansApi();
      console.log(res);
      setPlans(res);
      toast.success(res.message);
    } catch (error) {
      toast.error("Failed to fetch Plans");
    }
  };

  const isPlanAdded = (planId) => {
    return messData?.messData?.plan?.some((p) => p.plan === planId);
  };
  

  const handelRemovePlanFromMess = async (planId) => {
    try {
        const res = await removePlanFromMessApi(planId)
        console.log(res);
        toast.success(res.message)
        handleGetMessData()
        
    } catch (error) {
        toast.error("Failed to remove plan from mess")
    }
  }

  useEffect(() => {
    handleGetAllPlans();
    handleGetMessData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-10 p-20 h-full ">
        {plans?.plansData.map((plan) => (
          <div key={plan._id} className="border border-zinc-400 p-10">
            
            <p className="text-3xl text-center font-bold">{plan.type}</p>
            <div className="flex justify-between mt-5">
              <p className="text-xl font-semibold ">Duration:</p>
              <p className="text-xl ">{plan.durationInDays}</p>
            </div>

            <div className="flex justify-between  mt-10">
              <p className="text-xl font-semibold ">Meals:</p>
              <div className="flex flex-col gap-2">
                {plan?.mealsIncluded?.map((meal) => (
                  <p className="">{meal}</p>
                ))}
              </div>
            </div>

            {isPlanAdded(plan._id) && (
  <p className="text-xl font-semibold">
    Price:{" "}
    {
      messData?.messData?.plan
        ?.find(p => p.plan === plan._id)
        ?.price
    }
  </p>
)}


            <div className=" text-center mt-30">
              <button
                className={`p-2 rounded-2xl text-white cursor-pointer text-sm font-bold
    ${
      isPlanAdded(plan._id)
        ? "bg-red-500 hover:bg-red-400"
        : "bg-indigo-500 hover:bg-indigo-400"
    }
  `}
                onClick={() => {
                  if (isPlanAdded(plan._id)) {
                    handelRemovePlanFromMess(plan._id)
                    
                  } else {
                    setSelectedPlanId(plan._id);
                    setIsActive(true);
                  }
                }}
              >
                {isPlanAdded(plan._id) ? "Remove Plan" : "Add Plan"}
              </button>

              {isActive && (
                <PlanPriceModal
                  setPrice={setPrice}
                  onClose={onClose}
                  handleAddPlanToMess={handleAddPlanToMess}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Plan;
