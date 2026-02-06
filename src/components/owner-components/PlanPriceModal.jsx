import React from 'react'

const PlanPriceModal = ({onClose, setPrice, handleAddPlanToMess}) => {
  return (
    <>
    
    
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      {/* Background */}
      <div
        className="absolute inset-0 bg-black opacity-25"
        
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-1/3 p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <p className="text-2xl font-bold text-indigo-500">Add Plan </p>
          <button
            className="text-gray-500 font-bold"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className=' flex justify-between items-center mt-10'>
            <p className='text-2xl'>Enter Price</p>
            <input type="text" className='border p-2' name='price ' onChange={(e) => setPrice(e.target.value)}/>
            <button className='bg-indigo-500 px-4 text-sm py-3 font-bold text-white hover:bg-indigo-400 cursor-pointer rounded-full' onClick={handleAddPlanToMess}>Add</button>
        </div>
       
      </div>
    </div>
    
    </>
  )
}

export default PlanPriceModal