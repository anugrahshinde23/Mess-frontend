import React, { useState } from 'react'
import { createWalletApi } from '../../services/wallet.services'
import { toast } from 'react-toastify'

const WalletModal = ({onClose}) => {



  const [upiId, setUpiId] = useState("")
  const [ifsc, setIfsc] = useState("")
  const [bankAccount, setBankAccount] = useState("")

  const handleCreateWallet = async (e) => {
    e.preventDefault()
    try {
        const res = await createWalletApi({ifsc, upiId, bankAccount})

        console.log(res);
        toast.success(res.message)
        
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
  }



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
    {/* Background */}
    <div
      className="absolute inset-0 bg-black opacity-25"
      onClick={onClose}
    ></div>

    {/* Modal */}
    <div className="relative bg-white w-1/3 p-8 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold text-indigo-500">Create Wallet</p>
        <button
          className="text-gray-500 font-bold"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
  <h2 className="text-xl font-bold mb-4 text-zinc-800">Setup Your Payout Wallet</h2>
  <p className="text-xs text-zinc-500 mb-6">These details will be used by the Admin to send your earnings.</p>

  <form action="" className='flex flex-col gap-4'>
   
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-zinc-700">UPI ID</label>
      <input 
      name='upiId'
      onChange={(e) => setUpiId(e.target.value)}
        type="text" 
        placeholder='e.g. mobile-number@ybl' 
        className='border border-zinc-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all' 
      />
      <span className="text-[10px] text-zinc-400">Example: 9876543210@paytm</span>
    </div>

 
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-zinc-700">Bank Account Number</label>
      <input 
      name='bankAccount'
      onChange={(e) => setBankAccount(e.target.value) }
        type="password"  // Using password type or "text" with confirmation is safer for sensitive numbers
        placeholder='Enter Account Number' 
        className='border border-zinc-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all' 
      />
    </div>


    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-zinc-700">IFSC Code</label>
      <input 
      name='ifsc'
      onChange={(e) => setIfsc(e.target.value)}
        type="text" 
        placeholder='e.g. SBIN0001234' 
        className='border border-zinc-300 p-2.5 rounded uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all' 
      />
      <span className="text-[10px] text-zinc-400">11-digit alphanumeric code on your cheque/passbook</span>
    </div>

    <button onClick={(e) => {
        handleCreateWallet(e)
        onClose()
    }}  className='bg-indigo-600 text-white font-bold p-3 w-full mt-4 hover:bg-indigo-700 active:scale-95 transition-transform cursor-pointer rounded-md text-sm shadow-lg shadow-indigo-200'>
      Create Wallet & Link Bank
    </button>
  </form>
  
  <p className="text-center text-[10px] text-red-400 mt-4 italic">
    * Please double-check details. Admin is not responsible for wrong entries.
  </p>
</div>

    </div>
  </div>
  )
}

export default WalletModal