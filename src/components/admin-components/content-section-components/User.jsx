import React, { useEffect, useState } from 'react'
import { getAllUsersApi } from '../../../services/user.service'
import { toast } from 'react-toastify'

const User = () => {

 const [users, setUsers] = useState([])

 const [loading, setLoading] = useState(false)

 const handleGetAllUsers = async () => {
    try {
        const res = await getAllUsersApi()
        console.log(res);
        setUsers(res.userData)
        toast.success(res.message)
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
 }


useEffect(() => {
handleGetAllUsers()
}, [])


  return (
    <>
    
    <div className="max-w-6xl mx-auto bg-[#0d0c22] border-b border-gray-100 shadow-sm rounded-xl   overflow-auto">
        
        {/* Header Section */}
        <div className="px-6 py-4 sticky border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">User List</h2>
          <button 
            onClick={handleGetAllUsers}
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
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 ">Active</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {users.length > 0 ? (
                users.map((p) => (
                  <tr key={p._id} className=" transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{p.name}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      {p.phone}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">
                        {p.address}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {p.role.replace("_", " ")}
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
                    No users found.
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

export default User