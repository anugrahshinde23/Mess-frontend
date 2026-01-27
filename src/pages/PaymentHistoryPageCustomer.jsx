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
    
    <div className='p-10'>
        <div>
            <p className='text-3xl text-indigo-500 font-bold' >Payments</p>
        </div>
        <table className='w-full mt-10'>
            <thead>
                <tr>
                    <th className='border'>To</th>
                    <th className='border'>Amount</th>
                    <th className='border'>Date</th>
                    <th className='border'>Order</th>
                    <th className='border'>Status</th>
                </tr>
            </thead>
            <tbody>
                {payment.map((p) => (
                    <tr key={p._id} >
                        <td className='border text-center'>{p.mess.name}</td>
                        <td className='border text-center'>{p.amount}</td>
                        <td className='border text-center'>{new Date(p.createdAt).toLocaleDateString()}</td>
                        <td className='border text-center'>{p.order.items.map((i) => (
                            <p>{i},</p>
                        ))}</td>
                        <td className='border text-center'>{p.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    
    </>
  )
}

export default PaymentHistoryPageCustomer