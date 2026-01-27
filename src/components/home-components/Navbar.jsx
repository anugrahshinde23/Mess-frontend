import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {

    const navigate = useNavigate()

   const handleLoginAndRegisterButton = async () => {
    navigate('/auth')
   }

   const { user } = useAuth()


  return (
    <>
    
     <div className='flex justify-between items-center  px-10 py-5 sm:py-7 sm:px-20 '>
        <div className=''>
            <p className='lg:text-2xl  text-xl font-bold text-indigo-500 ' >MessMate</p>
        </div>

        <div className='border hidden md:block border-indigo-500 md:px-5 md:py-1 lg:px-10 lg:py-3 rounded-full hover:bg-indigo-500 hover:text-white hover:border-white' >
            <ul className='flex md:gap-7 lg:gap-15 md:text-[11px] lg:text-sm font-bold ' >
                <li className='cursor-pointer' >About Us</li>
                <li className='cursor-pointer'>Contact Us</li>
                <li className='cursor-pointer' >How it works?</li>
            </ul>
        </div>

        {!user ? 
        
        <div className='flex gap-2 sm:gap-5'>
        <div className='bg-indigo-500 px-2 md:px-3  lg:px-4 lg:py-1 rounded-full hover:bg-indigo-400'  >
            <button className='text-white cursor-pointer text-[11px] sm:text-sm  font-bold' onClick={handleLoginAndRegisterButton}>
                Login
            </button>
        </div >
        <div className='border border-indigo-500 px-2 md:px-3 lg:px-4 lg:py-1 rounded-full hover:bg-indigo-500' >
            <button className='text-indigo-500 font-bold text-[11px] sm:text-sm hover:text-white cursor-pointer ' onClick={handleLoginAndRegisterButton} >
                Register
            </button>
        </div>
    </div>
    
    : <div className=' bg-indigo-500 px-3 py-2  cursor-pointer rounded-full hover:bg-indigo-400' onClick={() => {
        if(user.role === "MESS_OWNER"){
            navigate('/owner-dashboard')
        }else if( user.role === "CUSTOMER")
        navigate('/customer-home')
        else if (user.role === "DELIVERY_BOY")
            navigate('/delivery-boy-dashboard')
    }}>
        <p className='text-sm text-white font-bold cursor-pointer'>{user.name}</p>
    </div> } 
     </div>
    
    </>
  )
}

export default Navbar