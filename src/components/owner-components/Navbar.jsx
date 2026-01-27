import React, { useEffect, useState } from 'react'
import * as MaterialDesignIcons from 'react-icons/md'
import { useAuth } from '../../context/AuthContext'
import { getNotifictaionApi, markAsReadApi } from '../../services/notification.services'
import { toast } from 'react-toastify'
import NotificationModal from '../customer-components/NotificationModal'

const Navbar = () => {

    const [openNotifyModal, setOpenNotifyModal] = useState(false)
    const [notifications, setNotifications] = useState([])

    const closeNotifyModal = () => {
        setOpenNotifyModal(false)
    }

    const handleMarkARead = async (notificationId) => {
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


    useEffect(() => {
    handleGetNotification()
    }, [])
    

const { user } = useAuth()

  return (
    <>
    <div className='flex justify-between bg-zinc-200 px-10 py-5 m-4 rounded-2xl items-center' >
        <div>
            <p className='text-2xl font-medium text-indigo-500'>MessMate</p>
        </div>
        <div className='w-1/3 hidden lg:block '>
            <input className='border w-full p-1' type="text" />
        </div>
        <div className='flex items-center gap-5 '>
            <div className='flex gap-1 items-center' >
            <div>
            <MaterialDesignIcons.MdNotifications className='relative' size={35} color='#667eea' onClick={() => {
                setOpenNotifyModal(true)

            }}/>
            {notifications.some(n => n.isRead === false) && (
                <div className='bg-red-500 px-2 py-0.5 absolute rounded-full top-10 text-white text-[10px]'>
                    {notifications.length}
                </div>
            )}
            </div>

            {openNotifyModal && <NotificationModal closeNotifyModal={closeNotifyModal} notifications={notifications} handleMarkARead={handleMarkARead} />}
            <MaterialDesignIcons.MdPerson  size={40} color='#667eea'/>
            </div>
            <div className='flex flex-col hidden sm:block'>
                <p className='text-sm font-bold' >{user.name}</p>
                <p className='text-sm font-bold'>{user.phone}</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar