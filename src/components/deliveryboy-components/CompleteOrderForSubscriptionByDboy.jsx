import React, { useState } from "react"
import { completeSubsOrderApi } from "../../services/order.services"
import { toast } from "react-toastify"

const CompleteOrderForSubscriptionByDboy = ({
  onCloseSubsOrderModal,
  orderId,
  dBoyId,
}) => {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCompleteOrder = async () => {
    if (!orderId || !code || !dBoyId) {
      toast.error("Missing required data")
      return
    }

    try {
      setLoading(true)
      const res = await completeSubsOrderApi({ code, dBoyId, orderId })
      toast.success(res.message)
      onCloseSubsOrderModal()
    } catch (error) {
      toast.error(error.response?.data?.message || "Error completing order")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="absolute inset-0 bg-black opacity-25"></div>

      <div className="relative bg-white w-1/2 p-10 rounded shadow-lg border border-indigo-500">
        <div className="flex justify-between">
          <p className="text-3xl font-bold text-indigo-500">Complete Order</p>
          <p
            className="text-gray-500 font-bold cursor-pointer"
            onClick={onCloseSubsOrderModal}
          >
            X
          </p>
        </div>

        <div className="flex flex-col mt-10 gap-10 items-center">
          <div className="flex flex-col gap-5">
            <p className="text-xl font-bold text-gray-500">
              Enter the order code
            </p>
            <input
              type="text"
              value={code}
              className="border p-2 border-indigo-500"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="p-2 bg-indigo-500 text-white hover:bg-indigo-400 disabled:opacity-50"
            onClick={handleCompleteOrder}
          >
            {loading ? "Completing..." : "Complete"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompleteOrderForSubscriptionByDboy
