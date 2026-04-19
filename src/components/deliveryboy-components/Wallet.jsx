import React, { useEffect, useState } from 'react'

import { getUserWalletApi } from '../../services/wallet.services'
import { toast } from 'react-toastify'
import { Landmark, CreditCard, CheckCircle, Wallet as WalletIcon } from 'lucide-react'
import WalletModal from '../owner-components/WalletModal'

const Wallet = () => {

    const [wallet, setWallet] = useState(null)

    const [showWalletModal, setShowWalletModal] = useState(false)


    const onClose = () => {
        setShowWalletModal(false)
    }


    const handleGetWallet = async () => { 
        try {
            const res = await getUserWalletApi()
            console.log(res.walletData);
            
            setWallet(res.walletData)
            toast.success(res.message)
        } catch (error) {
            toast.error(error.resoponse?.data?.message)
        }
    }

    useEffect(() => {
      handleGetWallet() 
    }, [])
    




  if(!wallet){
    return (
        <>
        
        <div className='w-full  h-full flex flex-col  justify-center items-center'>
            <p className='text-2xl font-medium' >You don't have any <span className='text-indigo-500' >Wallet</span></p>
            <p className='text-zinc-600 font-bold'>Create one to get your payments</p>
            <button
            onClick={() => {
                setShowWalletModal(true)
            }}
             className='bg-indigo-500 px-5 py-2 text-white mt-5 rounded text-sm font-bold hover:bg-indigo-400 cursor-pointer'
             >
                Create Wallet
            </button>
        </div>

        {showWalletModal  && <WalletModal onClose={onClose} />}

        </>
    )
  }


  return (
    <>

<div className='flex   h-full shadow-2xl rounded-2xl overflow-hidden border border-zinc-200'>
    {/* Left Side: Image with Overlay */}
    <div className='w-2/3 relative group'>
        <img 
            className='w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700' 
            src="https://plus.unsplash.com/premium_photo-1663931932651-ea743c9a0144?w=500&auto=format&fit=crop&q=60" 
            alt="Wallet" 
        />
        {/* Dark Gradient Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent"></div>
        <div className="absolute bottom-10 left-10 text-white">
            <h2 className="text-3xl font-bold">Secure Digital Ledger</h2>
            <p className="text-indigo-100 opacity-80">Manage your earnings and payouts in one place.</p>
        </div>
    </div>

    {/* Right Side: Content */}
    <div className="p-10 bg-white flex-1 flex flex-col justify-between border-r border-t border-b rounded-r-2xl border-r-indigo-500 border-b-indigo-500 border-t-indigo-500 ">
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">My Wallet</h1>
                    <p className="text-xs text-zinc-400">Manage your linked accounts</p>
                </div>
                {wallet.isActive && (
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Active
                    </span>
                )}
            </div>

            {/* Balance Section */}
            <div className="mb-10">
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-1">Available Balance</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-zinc-400">₹</span>
                    <h2 className="text-5xl font-black text-zinc-900">
                        {wallet.balance.toLocaleString('en-IN')}
                    </h2>
                </div>
                
                <div className="mt-6 flex gap-3">
                    <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
                        Withdraw Funds
                    </button>
                    <button className="flex-1 bg-zinc-50 text-zinc-600 border border-zinc-200 py-3 rounded-xl text-sm font-bold hover:bg-zinc-100 transition-all">
                        History
                    </button>
                </div>
            </div>

            {/* Virtual Card */}
            <div className="relative group overflow-hidden bg-zinc-900 p-6 rounded-2xl shadow-2xl text-white">
                {/* Subtle Card Texture */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-12">
                        <div className="w-10 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md opacity-80"></div> {/* Simulating a Chip */}
                        <Landmark size={24} className="text-zinc-500" />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-1">Bank Account</p>
                            <p className="text-xl font-mono tracking-[0.15em]">
                                •••• •••• {wallet.walletDetails.bankAccount.slice(-4)}
                            </p>
                        </div>

                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-0.5">IFSC</p>
                                <p className="text-xs font-bold tracking-widest">{wallet.walletDetails.ifsc.toUpperCase()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-0.5">UPI ID</p>
                                <p className="text-xs font-bold">{wallet.walletDetails.upiId}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p className="text-center text-[10px] text-zinc-400 leading-relaxed">
            Locked for security. To update details, <br />
            <span className="text-indigo-500 font-semibold cursor-pointer">Contact Admin Support</span>
        </p>
    </div>
</div>
  
    
    </>
 
  )
}

export default Wallet