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
    <div className="p-5 bg-indigo-300 rounded-lg flex-1 flex flex-col gap-5 ">
      <div className="flex justify-between w-full items-center ">
      <p className="text-xl font-bold mb-2">{title}</p>
      <p className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
        {section.startTime} - {section.endTime}
      </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
        {section.items.map((item) => (
          <div
            key={item}
           className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group"
          >
            {foodImages[item] ? (
             <img
             src={foodImages[item]}
             alt={item}
             className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
           />
            ) : (
              <div className="w-full h-28 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <p className="text-center font-semibold p-2">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="mx-15 mb-10 flex flex-col gap-5 ">
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
            <div className="flex flex-col items-center p-10 gap-20" >
            <div className="flex justify-end  w-full" >
                <p className=" text-xl sm:text-2xl font-bold text-zinc-400">Day: {menu?.menuData?.day}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-5 w-full">
            {renderFoodSection("Breakfast", menu.menuData.breakfast)}
            {renderFoodSection("Lunch", menu.menuData.lunch)}
            {renderFoodSection("Dinner", menu.menuData.dinner)}
          </div>
           
           
          </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5 gap-5">
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
