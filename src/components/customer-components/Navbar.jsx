import React, { useEffect, useState } from 'react'
import * as MaterialDesignIcons from 'react-icons/md'
import UserProfileModal from './UserProfileModal'
import NotificationModal from './NotificationModal'
import { getNotifictaionApi, markAsReadApi } from '../../services/notification.services'
import { toast } from 'react-toastify'
import MenuBarModal from './MenuBarModal'


const Navbar = ({handleLogout}) => {

  const [notifyModal, setNotifyModal] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [MenuOpen, setMenuOpen] = useState(false)


  const menu = [
    "Home",
    "Contact Us",
    "Messes"
  ]

  const closeMenuModal = () => {
    setMenuOpen(false)
  }


  const closeNotifyModal = () => {
    setNotifyModal(false)
  }

  const handleMarkAsRead = async (notificationId) => {
    try {
      const res = await markAsReadApi(notificationId)
      console.log(res);
      handleGetNotification()
      toast.success(res.message)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const handleGetNotification = async () => {
    try {
      const res = await getNotifictaionApi()
      console.log(res);
      setNotifications(res.notificationData)
      toast.success(res.message)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }


  const [isActive, setIsActive] = useState(false)

  const handleProfileIsActive = () => {
    if(isActive === true){
      setIsActive(false)
    }else{
      setIsActive(true)
    }
  }

  const onClose = () => {
    setIsActive(false)
  }

  useEffect(() => {
    handleGetNotification()
  }, [])
  


  return (
    <>
    
    
    <div className='flex justify-between px-1 sm:px-15 py-5 sm:py-10  border-b border-indigo-500 mx-15 items-center'>
        <div>
            <p className='text-2xl font-bold text-indigo-500 '>MessMate</p>
        </div>

        <div className='hidden sm:flex gap-20 text-sm font-bold'>
            {menu.map((m) => (
              <p>{m}</p>
            ))}
        </div>

        <div className='flex gap-2 items-center'>
          
         <div>
         <MaterialDesignIcons.MdOutlineNotifications  className='relative cursor-pointer' size={25} onClick={
            () => {
              setNotifyModal(true)
              
            }
          }/>
        {notifications.some(n => n.isRead === false) && (
  <div className="p-1 bg-green-500 rounded-full absolute top-11 right-45"></div>
)}
         </div>
            <MaterialDesignIcons.MdPersonOutline className='cursor-pointer' onClick={handleProfileIsActive} size={30}/>
            <MaterialDesignIcons.MdOutlineMenu className='cursor-pointer sm:hidden' onClick={() => {
              setMenuOpen(true)
            }} size={30}/>

            {isActive && <UserProfileModal onClose={onClose} handleLogout={handleLogout} />}
            {notifyModal && <NotificationModal handleMarkAsRead={handleMarkAsRead} notifications={notifications} closeNotifyModal={closeNotifyModal}/>}
            {MenuOpen && <MenuBarModal closeMenuModal={closeMenuModal} menuArr={menu}/>}
        </div>
        
    </div>

   
    
    </>
  )
}

export default Navbar