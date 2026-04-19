import React, { useEffect, useState } from 'react'
import { getPaymentHistoryForUserApi } from '../services/payment.services'
import { toast } from 'react-toastify'

const PaymentHistoryPageCustomer = () => {

    const [payment, setPayment] = useState([])


 const handleGetPaymentHistoryUser = async () => {
    try {
        const res = await getPaymentHistoryForUserApi()
        console.log(res);
        setPayment(res.paymentData)
        toast.success(res.message)
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
 }

 useEffect(() => {
   handleGetPaymentHistoryUser()
 }, [])
 


  return (
    <>
    
    <div className="p-10 bg-gray-50 min-h-screen">
        {/* Header */}
    <div className="flex justify-between items-center mb-16">
      <h1 className="text-3xl font-bold text-indigo-600">Payment History</h1>
    </div>
  <div id='customer-payment-history-page' className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
    
    

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        
        <thead>
          <tr className="bg-indigo-50 text-indigo-600 text-sm uppercase">
            <th className="p-3 text-left">Mess</th>
            <th className="p-3 text-center">Amount</th>
            <th className="p-3 text-center">Date</th>
            <th className="p-3 text-center">Items</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">UTR</th>
          </tr>
        </thead>

        <tbody>
          {payment.map((p) => (
            <tr
              key={p._id}
              className=" hover:bg-gray-50 transition"
            >
              
              {/* Mess */}
              <td className="p-3 font-medium text-gray-700">
                {p.mess.name}
              </td>

              {/* Amount */}
              <td className="p-3 text-center font-semibold">
                ₹{p.amount}
              </td>

              {/* Date */}
              <td className="p-3 text-center text-gray-500">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>

              {/* Items */}
              <td className="p-3 text-center">
                <div className="flex flex-wrap gap-1 justify-center">
                  {p.order.items.map((i, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-sm px-2 py-1 rounded-lg"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </td>

              {/* Status */}
              <td className="p-3 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    p.status === "PAID"
                      ? "bg-green-100 text-green-600"
                      : p.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {p.status}
                </span>
              </td>

              {/* UTR */}
              <td className="p-3 text-center text-xs text-gray-500">
                {p.utrNumber}
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>

  </div>
</div>
    
    </>
  )
}

export default PaymentHistoryPageCustomer