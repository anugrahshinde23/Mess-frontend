import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessByIdApi } from "../services/mess.services";
import { toast } from "react-toastify";
import { getAllMessPlansApi } from "../services/plan.services";
import { getTodaysMenuByIdApi } from "../services/menu.services";
import Navbar from "../components/customer-components/Navbar";
import * as MaterialDesignIcons from "react-icons/md";
import {
  createSubscriptionApi,
  getUserSubscriptionApi,
} from "../services/subscription.services";
import PlaceOrderModal from "../components/customer-components/PlaceOrderModal";

const MessDetailPage = () => {
  const { messId } = useParams();

  const [mess, setMess] = useState(null);

  const [subscription, setSubscription] = useState([]);

  const [oneTimePrice, setOneTimePrice] = useState(null)

  const currentMessSubscription = subscription.find(
    (s) =>
      s.mess.toString() === messId &&
      ["PENDING", "ACTIVE"].includes(s.status)
  );

  const [showOrderModal, setShowOrderModal] = useState(false)
  

  const handleOneTimeOrder = async () => {
    setShowOrderModal(true)
  }

  const onClose = () => {
    setShowOrderModal(false)
  }

  const handleCreateSubscription = async (planId) => {
    try {
      const res = await createSubscriptionApi({ messId, planId });
      console.log(res);
      toast.success(res.message);
      handleGetUserSubscription();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const handleGetUserSubscription = async () => {
    try {
      const res = await getUserSubscriptionApi();
      console.log(res);
      setSubscription(res.subscriptionData);
      toast.success(res.message);
    } catch (error) {
      toast.error("Failed to fetch Subscription");
    }
  };

  const handleGetMessById = async () => {
    try {
      const res = await getMessByIdApi(messId);
      console.log(res);
      setMess(res);
      toast.success(res.message);
    } catch (error) {
      toast.error("Failed to fetch Mess");
    }
  };

  const [plans, setPlans] = useState(null);

  const handleGetAllMessPlans = async () => {
    try {
      const res = await getAllMessPlansApi(messId);
      console.log(res);
      setPlans(res);
      // toast.success(res.message)
    } catch (error) {
      toast.error("Failed to fetch Plans");
    }
  };

  const [menu, setMenu] = useState(null);

  const handleGetTodaysMenuById = async () => {
    try {
      const res = await getTodaysMenuByIdApi(messId);
      console.log(res);
      setMenu(res);
      toast.success(res.message);
    } catch (error) {
      toast.error("Failed to fetch Menu");
    }
  };

  useEffect(() => {
    handleGetMessById();
    handleGetAllMessPlans();
    handleGetTodaysMenuById();
    handleGetUserSubscription();
  }, []);

  return (
    <>
      <Navbar />

      <div className="mx-15 flex flex-col gap-5 ">
        <div className="p-10 border mt-5">
          <div className="flex flex-col gap-2">
            <p className="text-4xl font-semibold">{mess?.messData?.name}</p>
            <p className="text-md text-zinc-500 font-bold ">
              {mess?.messData?.description}
            </p>
          </div>

          <div className="flex gap-2 items-center mt-4">
            <MaterialDesignIcons.MdLocationOn color="#6366f1" />
            <p className="text-sm font-bold">{mess?.messData?.address}</p>
          </div>

          <div className="flex gap-2 items-center mt-2">
            <MaterialDesignIcons.MdPhone color="#6366f1" />
            <p className="text-sm font-bold">{mess?.messData?.contact}</p>
          </div>
        </div>

        <div className="p-10 border">
          <div>
            <p className="text-4xl font-semibold">Todays Menu</p>
          </div>

          {menu ? (
            <div>Menu is available</div>
          ) : (
            <div>
              <p>No Menu Set For Today</p>
            </div>
          )}
        </div>

        <div className="p-10 border">
          <div>
            <p className="text-4xl font-semibold">Plans</p>
          </div>
          {plans ? (
            <div className="grid grid-cols-4 mt-5 gap-5">
              {plans?.plansData?.map((p) => (
                <div key={p?.plan?._id} className="border p-5">
                  <p className="text-2xl font-bold">{p?.plan?.type}</p>
                  <div className="flex  mt-2 justify-between">
                    <p className="text-sm font-bold">Duration</p>
                    <p className="text-sm">{p?.plan?.durationInDays}</p>
                  </div>

                  <div className="flex justify-between mt-5">
                    <p className="text-sm font-bold">Meals</p>
                    <div className="text-sm">
                      {p?.plan?.mealsIncluded.map((m) => (
                        <p>{m}</p>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-5">
                    <p className="text-sm font-bold">Price</p>
                    <p className="text-sm">Rs.{p?.price}</p>
                  </div>

                  <div className="flex justify-center mt-5">
                    <button
                      disabled={
                        p?.plan?.type !== "ONE_TIME" && Boolean(currentMessSubscription)
                      }
                      className="text-sm bg-indigo-500 w-full py-2 font-bold rounded-full text-white disabled:bg-gray-500 cursor-pointer hover:bg-indigo-400"
                      onClick={() => {
                        if(p?.plan?.type === "ONE_TIME"){
                          setOneTimePrice(p?.price)
                          handleOneTimeOrder()
                        }else{
                        handleCreateSubscription(p?.plan?._id);
                        }
                      }}
                    >
                      {p?.plan?.type === "ONE_TIME"
                        ? "Order"
                        : currentMessSubscription
                        ? currentMessSubscription.status === "PENDING"
                          ? "Pending Approval"
                          : currentMessSubscription.status === "ACTIVE"
                          ? "Active"
                          : "Subscribe"
                        : "Subscribe"}
                    </button>
                    {showOrderModal && <PlaceOrderModal onClose={onClose} messId={messId} oneTimePrice={oneTimePrice} /> }
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>No Plans Available for this mess</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessDetailPage;
