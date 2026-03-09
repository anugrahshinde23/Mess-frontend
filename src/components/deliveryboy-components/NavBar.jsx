import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import * as MaterialDesignIcons from "react-icons/md";
import NotificationModal from "../customer-components/NotificationModal";
import {
  getNotifictaionApi,
  markAsReadApi,
} from "../../services/notification.services";
import { toast } from "react-toastify";

const NavBar = ( ) => {
  const [openNotifyModal, setOpenNotifyModal] = useState(false);
  const [notification, setNotifications] = useState([]);

  const closeNotifyModal = () => {
    setOpenNotifyModal(false);
  };

  const handleGetNotification = async () => {
    try {
      const res = await getNotifictaionApi();
      // console.log(res);
      setNotifications(res.notificationData);
      // toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const res = await markAsReadApi(notificationId);
      console.log(res);
      handleGetNotification();
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    handleGetNotification();

    const intervalId = setInterval(() => {
      handleGetNotification();
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, []);

  const { user } = useAuth();

  return (
<>
  <div className="w-full bg-white shadow-md px-6 sm:px-12 lg:px-20 py-4 flex items-center justify-between">

    {/* LOGO */}
    <div>
      <p className="text-2xl font-bold text-indigo-600 tracking-wide">
        MessMate
      </p>
    </div>


    {/* SEARCH BAR */}
    <div className="w-1/3 hidden lg:block">
      <input
        type="text"
        placeholder="Search mess or food..."
        className="w-full border border-zinc-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>


    {/* RIGHT SECTION */}
    <div className="flex items-center gap-6">

      {/* NOTIFICATION */}
      <div className="relative cursor-pointer">

        <MaterialDesignIcons.MdNotifications
          size={28}
          color="#6366f1"
          onClick={() => setOpenNotifyModal(true)}
        />

        {notification.some((n) => n.isRead === false) && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {notification.length}
          </div>
        )}

      </div>


      {/* PROFILE */}
      <div className="flex items-center gap-3 cursor-pointer">

        <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
          {user?.name?.[0]}
        </div>

        <div className="hidden sm:flex flex-col leading-tight">
          <p className="text-sm font-semibold text-zinc-800">
            {user.name}
          </p>
          <p className="text-xs text-zinc-500">
            {user.phone}
          </p>
        </div>

      </div>


    </div>


    {/* NOTIFICATION MODAL */}
    {openNotifyModal && (
      <NotificationModal
        closeNotifyModal={closeNotifyModal}
        notifications={notification}
        handleMarkAsRead={handleMarkAsRead}
      />
    )}

  </div>
</>
  );
};

export default NavBar;
