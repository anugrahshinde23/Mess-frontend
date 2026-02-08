import React from 'react'

const MenuBarModal = ({closeMenuModal, menuArr}) => {
  return (
    <>
    
    <div className="fixed inset-0 z-50 flex justify-end backdrop-blur-sm">
      {/* Background */}
      <div
        className="absolute inset-0 bg-black opacity-25"
        
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-1/2  mr-20 h-2/3  mt-12 p-8 rounded-xl shadow-lg">
        <div className="flex justify-between  items-center mb-6">
          <p className="text-2xl font-bold text-indigo-500">Menu </p>
          <button
            className="text-gray-500 font-bold cursor-pointer"
           onClick={closeMenuModal}
          >
            ✕
          </button>
        </div>

        <ul className='flex flex-col gap-5 '>
            {menuArr.map((m) => {
                return <li className='text-sm font-bold'>{m}</li>
            })}
        </ul>
        
       
      </div>
    </div>
    
    </>
  )
}

export default MenuBarModal