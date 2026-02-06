import React, { useEffect, useState } from 'react'
import { approveRequestApi, getDeliveryBoyRequestApi, rejectRequestApi } from '../../services/deliveryBoyServices'
import { toast } from 'react-toastify'


const DeliveryBoy = ({messData, handleGetMessData}) => {


   


    useEffect(() => {
      handleGetMessData()
    }, [])
    

    const messId = messData?.messData?._id
   
    

  const [deliveryBoyRequest, setDeliveryBoyRequest] = useState([])

  const handleGetDeliveryBoyRequest = async() => {

    if (!messId) return 


    try {
        const res = await getDeliveryBoyRequestApi(messId.toString())
        console.log(res);
       
        setDeliveryBoyRequest(res.reqData)
        toast.success(res.message)
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
  }

  const handleApproveRequest = async (reqId) => {
    try {
        const res = await approveRequestApi(reqId)
        console.log(res);
        handleGetDeliveryBoyRequest()
        toast.success(res.message)
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}

const handleRejectRequest = async (reqId) => {
    try {
        const res = await rejectRequestApi(reqId)
        console.log(res);
        handleGetDeliveryBoyRequest()
        toast.success(res.message)
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}

  useEffect(() => {
    if(messId)
    handleGetDeliveryBoyRequest()
  }, [messId])


  const dBoyStatus = [
    {id: "PENDING", label : "Pending"},
    {id: "APPROVED", label : "Approved"},
    {id: "REJECTED", label : "Rejected"}
  ]

  const [dBoyTab, setDboyTab] = useState("PENDING")


  return (
    <>
    
    <div className='p-10'>
        <p className='text-3xl text-indigo-500 font-bold'>Delivery Boy</p>

        <div className='p-5 border border-indigo-500 mt-10 flex items-center justify-between px-20'>
            {dBoyStatus.map((d) => (
                <div key={d.id} className={`cursor-pointer px-4 py-2 rounded-lg text-sm ${dBoyTab === d.id ? "bg-indigo-500 text-white font-bold" : "text-gray-600 hover:bg-gray-200"}`} onClick={() => {
                    setDboyTab(d.id)
                }}>
                    {d.label}
                </div>
            ))}
        </div>

        <table className='w-full mt-5'>
            <thead>
                <tr>
                    <th className='border p-2'>Name</th>
                    <th className='border p-2'>Phone</th>
                    <th className='border p-2'>Address</th>
                    <th className='border p-2'>Pincode</th>
                    <th className='border p-2'>Status</th>
                    {dBoyTab === "PENDING" && (
                        <th className='border p-2'>Action</th>
                    )}
                    
                </tr>
            </thead>
            <tbody>
                {deliveryBoyRequest.filter((d) => d.status === dBoyTab).map((d) => (
                    <tr key={d._id}>
                        <td className='border p-2 text-center'>{d.deliveryBoy.user.name}</td>
                        <td className='border p-2 text-center'>{d.deliveryBoy.user.phone}</td>
                        <td className='border p-2 text-center'>{d.deliveryBoy.user.address}</td>
                        <td className='border p-2 text-center'>{d.deliveryBoy.user.pincode}</td>
                        <td className='border p-2 text-center'>{d.deliveryBoy.availabilityStatus}</td>
                        {dBoyTab === "PENDING" && (
                            <td className='border p-2 text-center '>
                            <button className='bg-green-500 hover:bg-green-400 cursor-pointer text-sm font-bold text-white px-2 py-1 mr-2' onClick={() => {
                                handleApproveRequest(d._id)
                            }}>
                                Approve
                            </button>
                            <button className='bg-red-500 hover:bg-red-400 cursor-pointer text-sm font-bold text-white px-2 py-1 ml-2' onClick={() => {
                                handleRejectRequest(d._id)
                            }}>
                                Reject
                            </button>
                        </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    
    </>
  )
}

export default DeliveryBoy