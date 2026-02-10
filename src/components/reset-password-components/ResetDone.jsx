import React from 'react'
import * as MaterialDesignIcons from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ResetDone = () => {

  const navigate = useNavigate()

  return (
    <>
    
    <div className='flex flex-col items-center'>
        <div className='flex flex-col items-center gap-5'>
            <div className='bg-indigo-500 w-fit p-2 rounded-2xl'>
                <MaterialDesignIcons.MdDone size={30} color='white'/>
            </div>
            <p className='text-2xl font-bold'>All done!</p>
            <p className='text-gray-400'>Your password has been reset</p>
        </div>
        <button className='bg-indigo-500 hover:bg-indigo-400 cursor-pointer text-sm text-white px-5 py-2 mt-50 rounded-2xl font-bold' onClick={() => {
            navigate('/auth')
        }}>
            Go back to login
        </button>
    </div>
    
    </>
  )
}

export default ResetDone