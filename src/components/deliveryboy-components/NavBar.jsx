import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import * as MaterialDesignIcons from "react-icons/md";
import NotificationModal from "../customer-components/NotificationModal";
import {
  getNotifictaionApi,
  markAsReadApi,
} from "../../services/notification.services";
import { toast } from "react-toastify";

const NavBar = ({ logout }) => {
  const [openNotifyModal, setOpenNotifyModal] = useState(false);
  const [notification, setNotifications] = useState([]);

  const closeNotifyModal = () => {
    setOpenNotifyModal(false);
  };

  const handleGetNotification = async () => {
    try {
      const res = await getNotifictaionApi();
      console.log(res);
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

    setInterval(() => {
      handleGetNotification()
    }, 1000);
  }, []);

  const { user } = useAuth();

  return (
    <>
      <div className="flex justify-between items-center px-26 py-10  shadow-2xl">
        <div>
          <p className="text-2xl font-medium text-indigo-500">MessMate</p>
        </div>
        <div className="w-1/3 hidden lg:block ">
          <input className="border w-full p-1" type="text" />
        </div>
        <div className="flex items-center gap-5 ">
          <div className="flex gap-1 items-center">
            <div>
              <MaterialDesignIcons.MdNotifications
                className="relative"
                size={35}
                color="#667eea"
                onClick={() => {
                  setOpenNotifyModal(true);
                }}
              />
               {notification.some(n => n.isRead === false) && (
                <div className='bg-red-500 px-2 py-0.5 absolute rounded-full top-10 text-white text-[10px]'>
                    {notification.length}
                </div>
            )}
            </div>

            {openNotifyModal && (
              <NotificationModal
                closeNotifyModal={closeNotifyModal}
                notifications={notification}
                handleMarkAsRead={handleMarkAsRead}
              />
            )}

            <MaterialDesignIcons.MdPerson size={40} color="#667eea" />
          </div>
          <div className="flex flex-col hidden sm:block">
            <p className="text-sm font-bold">{user.name}</p>
            <p className="text-sm font-bold">{user.phone}</p>
          </div>
          <div>
            <button
              className="bg-red-500 text-white font-bold p-2 rounded-full cursor-pointer hover:bg-red-400"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
