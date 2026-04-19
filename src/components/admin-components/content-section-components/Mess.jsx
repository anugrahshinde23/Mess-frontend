import React, { useEffect, useState } from 'react'
import { getAllMessesApi } from '../../../services/mess.services'
import { toast } from 'react-toastify'

const Mess = () => {


    const [mess, setMess] = useState([])

    const [loading, setLoading] = useState(false)


 const handleGetMesses = async () => {
    try {
        const res = await getAllMessesApi()
        setMess(res.messData)
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
 }

 useEffect(() => {
  
   handleGetMesses()
 }, [])
 

  return (
    <>
    
    <div className="max-w-6xl mx-auto bg-[#0d0c22] border-b border-gray-100 shadow-sm rounded-xl   overflow-auto">
        
        {/* Header Section */}
        <div className="px-6 py-4 sticky border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Mess List</h2>
          <button 
            onClick={handleGetMesses}
            className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-100 transition"
          >
            {loading ? "Refreshing..." : "Refresh List"}
          </button>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0d0c22] text-white uppercase text-xs font-semibold tracking-wider">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 ">Active</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {mess.length > 0 ? (
                mess.map((p) => (
                  <tr key={p._id} className=" transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{p.name}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      {p.contact}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">
                        {p.address}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {p.deliveryType}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {p.isActive  === true ? (
                        <div className='border border-green-500 p-1 rounded-full text-center text-sm'>Yes</div>
                      ) : (<div className='border border-red-500 p-1 rounded-full text-center text-sm'>No</div>)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-sm transition-all active:scale-95"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-400">
                    No mess found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      
        </div>
      </div>
    
    </>
  )
}

export default Mess