import React, { useEffect, useState } from "react";
import {
  addPlanToMessApi,
  getAllPlansApi,
  removePlanFromMessApi,
} from "../../services/plan.services";
import { toast } from "react-toastify";
import PlanPriceModal from "./PlanPriceModal";
import { MdCheckBoxOutlineBlank, MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";


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
      const res = await removePlanFromMessApi(planId);
      console.log(res);
      toast.success(res.message);
      handleGetMessData();
    } catch (error) {
      toast.error("Failed to remove plan from mess");
    }
  };

  useEffect(() => {
    handleGetAllPlans();
    handleGetMessData();
  }, []);

  if(!messData) {
    return <div className='flex justify-center items-center h-full'>
    <p className='text-2xl font-bold text-zinc-500'>Mess is deactivated cannot access Plan</p>
  </div>
  }

  return (
    <>
      <div className="grid grid-cols-1 items-center h-full sm:grid-cols-2 lg:grid-cols-4  gap-10 px-15 py-10  ">
        {plans?.plansData.map((plan) => (
          <div
            key={plan._id}
            className="border-2 bg-white flex flex-col gap-10 rounded-2xl border-indigo-400 p-10"
          >
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bold">
                {plan.type.replace("_", " ")}
              </p>
              <p className="text-sm text-zinc-400">
                {plan.type === "ONE_TIME"
                  ? "For one time order"
                  : plan.type === "MONTHLY"
                  ? "For monthly subscription"
                  : plan.type === "WEEKLY"
                  ? "For weekly subscription"
                  : plan.type === "ONE_DAY"
                  ? "For one full day"
                  : null}
              </p>
              {isPlanAdded(plan._id) ? (
                <p className="text-xl font-semibold">
                  Rs.{" "}
                  {
                    messData?.messData?.plan?.find((p) => p.plan === plan._id)
                      ?.price
                  }
                </p>
              ) : (
                <p className="text-xl font-semibold">Not decided</p>
              )}
            </div>
            <div className="text-zinc-300 border-2  text-2xl"></div>

            <div className="flex flex-col gap-2 justify-between">
              <p className="font-medium ">What you get</p>
              <div>
                <div className=" text-zinc-400 flex items-center ">
                <MdCheckCircleOutline/>
                  <p>{plan.durationInDays} duration.</p>
                  </div>

                {plan?.mealsIncluded?.map((meal) => (
                  <div  className="flex items-center text-zinc-400">
                    <MdCheckCircleOutline/>
                    <p>
                    {meal}
                    </p>
                    
                    
                    </div>
                ))}
              </div>
            </div>

            <div>
              <button
                className={`p-2 rounded w-full text-white cursor-pointer text-sm font-bold
    ${
      isPlanAdded(plan._id)
        ? "bg-red-500 hover:bg-red-400"
        : "bg-indigo-500 hover:bg-indigo-400"
    }
  `}
                onClick={() => {
                  if (isPlanAdded(plan._id)) {
                    handelRemovePlanFromMess(plan._id);
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
