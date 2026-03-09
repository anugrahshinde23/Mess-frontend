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


const UNSPLASH_API_KEY="DiPvtvT3QnhYWI7JQPKGCaVwX5arg3Ya-QL2CG-iibc"

const MessDetailPage = () => {
  const { messId } = useParams();

  const [mess, setMess] = useState(null);

  const [subscription, setSubscription] = useState([]);

  const [oneTimePrice, setOneTimePrice] = useState(null)

  const [menu, setMenu] = useState(null);

  const currentMessSubscription = subscription.find(
    (s) =>
      s.mess.toString() === messId &&
      ["PENDING", "ACTIVE"].includes(s.status)
  );

  const [showOrderModal, setShowOrderModal] = useState(false)
  



  const [foodImages, setFoodImages] = useState({})

  const fetchFoodImage = async (foodName) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${foodName}&per_page=1`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
          },
        }
      );
  
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.small;
      }
  
      return null;
    } catch (error) {
      console.error("Error fetching image for", foodName, error);
      return null;
    }
  };

  // Fetch images for all food items
  const fetchAllFoodImages = async (menuData) => {
    const allItems = [
      ...menuData.breakfast.items,
      ...menuData.lunch.items,
      ...menuData.dinner.items,
    ];
    const uniqueItems = [...new Set(allItems)];
    const images = {};
    await Promise.all(
      uniqueItems.map(async (item) => {
        const url = await fetchFoodImage(item);
        if (url) images[item] = url;
      })
    );
    setFoodImages(images);
  };




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

  useEffect(() => {
    if (menu?.menuData) fetchAllFoodImages(menu.menuData);
  }, [menu]);

  const renderFoodSection = (title, section) => (
    <div className="bg-white border border-zinc-300 rounded-xl shadow-md p-6 flex flex-col gap-6">
  
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold text-indigo-600">
          {title}
        </p>
  
        <p className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
          {section.startTime} - {section.endTime}
        </p>
      </div>
  
      <div className="grid grid-cols-2 gap-4">
  
        {section.items.map((item) => (
  
          <div
            key={item}
            className="rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
          >
  
            {foodImages[item] ? (
              <img
                src={foodImages[item]}
                alt={item}
                className="w-full h-32 object-cover"
              />
            ) : (
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
  
            <p className="text-center text-sm font-semibold p-2">
              {item}
            </p>
  
          </div>
  
        ))}
  
      </div>
    </div>
  );

  return (
    <>
      <Navbar />




  <div className="max-w-7xl mx-auto  pb-16 flex flex-col gap-16">

    {/* ---------- MESS HEADER ---------- */}

    <div className="bg-white border border-zinc-300 shadow-md rounded-xl p-8 mt-6 flex flex-col gap-4">

      <p className="text-4xl font-bold text-zinc-800">
        {mess?.messData?.name}
      </p>

      <p className="text-zinc-500 max-w-2xl">
        {mess?.messData?.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-6 text-sm mt-3">

        <div className="flex items-center gap-2 text-zinc-700">
          <MaterialDesignIcons.MdLocationOn size={20} color="#6366f1" />
          {mess?.messData?.address}
        </div>

        <div className="flex items-center gap-2 text-zinc-700">
          <MaterialDesignIcons.MdPhone size={20} color="#6366f1" />
          {mess?.messData?.contact}
        </div>

      </div>
    </div>





    {/* ---------- TODAY MENU ---------- */}

    <div className="flex flex-col gap-8">

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Today's Menu</h2>
        <p className="text-lg font-semibold text-indigo-600">
          {menu?.menuData?.day}
        </p>
      </div>

      {menu ? (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {renderFoodSection("Breakfast", menu.menuData.breakfast)}
          {renderFoodSection("Lunch", menu.menuData.lunch)}
          {renderFoodSection("Dinner", menu.menuData.dinner)}

        </div>

      ) : (
        <p className="text-zinc-500">No Menu Set For Today</p>
      )}

    </div>





    {/* ---------- PLANS ---------- */}

    <div className="flex flex-col gap-8">

      <h2 className="text-3xl font-bold">Subscription Plans</h2>

      {plans ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {plans?.plansData?.map((p) => (

            <div
              key={p?.plan?._id}
              className="bg-white border border-zinc-200 rounded-xl p-6 shadow-md hover:shadow-lg transition flex flex-col justify-between"
            >

              {/* Plan Name */}
              <p className="text-2xl font-bold text-indigo-600">
                {p?.plan?.type}
              </p>


              {/* Plan Details */}
              <div className="flex flex-col gap-3 mt-4 text-sm">

                <div className="flex justify-between">
                  <p className="font-semibold">Duration</p>
                  <p>{p?.plan?.durationInDays} days</p>
                </div>

                <div className="flex justify-between">
                  <p className="font-semibold">Meals</p>

                  <div className="text-right">
                    {p?.plan?.mealsIncluded.map((m) => (
                      <p key={m}>{m}</p>
                    ))}
                  </div>
                </div>

              </div>


              {/* Price */}
              <div className="mt-6 text-center">
                <p className="text-3xl font-bold text-zinc-800">
                  ₹{p?.price}
                </p>
              </div>


              {/* Button */}
              <button
                disabled={
                  p?.plan?.type !== "ONE_TIME" &&
                  Boolean(currentMessSubscription)
                }
                className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-semibold disabled:bg-gray-400"
                onClick={() => {

                  if (p?.plan?.type === "ONE_TIME") {
                    setOneTimePrice(p?.price)
                    handleOneTimeOrder()
                  } else {
                    handleCreateSubscription(p?.plan?._id)
                  }

                }}
              >
                {p?.plan?.type === "ONE_TIME"
                  ? "Order Now"
                  : currentMessSubscription
                  ? currentMessSubscription.status === "PENDING"
                    ? "Pending Approval"
                    : currentMessSubscription.status === "ACTIVE"
                    ? "Active"
                    : "Subscribe"
                  : "Subscribe"}
              </button>

              {showOrderModal && (
                <PlaceOrderModal
                  onClose={onClose}
                  messId={messId}
                  oneTimePrice={oneTimePrice}
                />
              )}

            </div>

          ))}

        </div>

      ) : (
        <p className="text-zinc-500">No Plans Available</p>
      )}

    </div>

  </div>
</>

  );
};

export default MessDetailPage;
