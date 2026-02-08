import React from 'react'

const NotificationModal = ({closeNotifyModal, notifications, handleMarkAsRead}) => {
  return (
    <>
     <div className="fixed inset-0 z-50 flex justify-end backdrop-blur-sm">
      {/* Background */}
      <div
        className="absolute inset-0 bg-black opacity-25"
        
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-2/3 sm:w-1/4 mr-25 sm:mr-45 h-2/3 mt-20 p-8 rounded-xl shadow-lg">
        <div className="flex justify-between  items-center mb-6">
          <p className="text-2xl font-bold text-indigo-500">Notifications </p>
          <button
            className="text-gray-500 font-bold cursor-pointer"
            onClick={closeNotifyModal}
          >
            ✕
          </button>
        </div>

{notifications.length !== 0 ? (
  <div className='flex flex-col gap-3 overflow-auto'>
  {notifications.map((n) => (
      
        <div key={n._id} className={` ${n.isRead ? " border-2 border-gray-500" : "border-2 border-indigo-500"}  px-5 py-2 flex flex-col gap-1`}  onClick={() => {
          handleMarkAsRead(n._id)
      }}>
          <p className='text-md font-bold'>{n.title}</p>
          <p className='text-sm text-gray-400'>{n.message}</p>
      </div>
     
  ))}
  </div>
) : (
  <div className=' h-full flex justify-center items-center'>
    <p className='text-2xl text-zinc-400 font-semibold'>No Notifications</p>
  </div>
)}

        
       
      </div>
    </div>
    </>
  )
}

export default NotificationModal