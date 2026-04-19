import React, { useEffect, useState } from 'react'
import { fetchPendingPaymentsApi, verifyPaymentApi } from '../../../services/payment.services' // Added verify API
import { toast } from 'react-toastify'

const Payment = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)

  const handleGetPayments = async () => {
    setLoading(true)
    try {
      const res = await fetchPendingPaymentsApi()
      setPayments(res.paymentData)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch")
    } finally {
      setLoading(false)
    }
  }


  const handleVerifyPayment = async (paymentId) => {
    try {
        const res = await verifyPaymentApi(paymentId)
        console.log(res);
        toast.success(res.message)
        handleGetPayments()
    } catch (error) {
        toast(error.response?.data?.message)
    }
  }



  useEffect(() => {
    handleGetPayments()
  }, [])

  return (
    
      <div className="max-w-6xl mx-auto bg-[#0d0c22] border-b border-gray-100 shadow-sm rounded-xl   overflow-auto">
        
        {/* Header Section */}
        <div className="px-6 py-4 sticky border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Pending Verifications</h2>
          <button 
            onClick={handleGetPayments}
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
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">UTR Number</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.length > 0 ? (
                payments.map((p) => (
                  <tr key={p._id} className=" transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{p.user?.name}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      ₹{p.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">
                        {p.utrNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {p.paymentMethod.replace('_', " ")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${p.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() =>  handleVerifyPayment(p._id)}
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
                    No pending payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      
        </div>
      </div>
 
  )
}

export default Payment