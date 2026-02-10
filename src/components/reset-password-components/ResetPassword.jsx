import React, { useState } from 'react'
import * as MaterialDesignIcons from "react-icons/md";
import { resetPassApi } from '../../services/auth.services';
import { toast } from 'react-toastify';

const ResetPassword = ({phoneNumber, setTab}) => {

  const [show, setShow] = useState(false)
  const [newPassword, setPass] = useState("")
  const [cPass, setCpass] = useState("")
  const [loading, setLoading] = useState(false)

  const handleShowPass = () => {
    if(show === false){
      setShow(true)
    }else if (show === true) {
      setShow(false)
    }
  }

  const handleResetPassword = async () => {
    if(!phoneNumber || !newPassword){
      alert("Required fields")
      return 
    }

    if(newPassword !== cPass){
      alert("Password and confirm password must be same")
      return
    }

    try {
      setLoading(true)
      const res = await resetPassApi({phone : phoneNumber, newPassword})
      console.log(res.message);
      setTimeout(() => {
        setTab("tab4")
      }, 2000);
      toast.success(res.message)
    } catch (error) {
      toast.error(error.response?.data?.message)
    } finally {
      setLoading(false)
    }

  }

  

  return (
   <>
   <div>
    <div className='flex flex-col items-center gap-5'>
      <div className='bg-indigo-500 p-2 w-fit rounded-2xl'>
        <MaterialDesignIcons.MdPassword size={30} color='white'/>
      </div>
      <p className='text-2xl font-bold'>Set new password</p>
      <p className='text-gray-400'>Must be atleast 8 characters</p>

    </div>
    <div className='flex flex-col gap-5 mt-10'>
      <input type={show === true ? "password" : "text"} placeholder='New password' className=' border-b outline-0 pb-2' onChange={(e) => setPass(e.target.value)}/>
      <input type={show === true ? "password" : "text"} placeholder='Confirm password' className=' border-b outline-0 pb-2' onChange={(e) => setCpass(e.target.value)}/>
      <div className='flex justify-end'>
        <p className='text-sm font-bold cursor-pointer' onClick={() => {
          handleShowPass()
        }}>{show  === true ? "Show" : "Hide"}</p>
      </div>
      <button className='text-sm mt-50 font-bold text-white bg-indigo-500 hover:bg-indigo-400 px-5 py-2 rounded-2xl cursor-pointer' onClick={handleResetPassword}>
      {loading ? "Reseting..." : "Reset Password"}
    </button>
    </div>

    

   </div>
   </>
  )
}

export default ResetPassword