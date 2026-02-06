import React from 'react'
import { useAuth } from '../context/AuthContext'
import { logoutApi } from '../services/auth.services'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/customer-components/Navbar'
import MessListingSection from '../components/customer-components/MessListingSection'
import UserProfileModal from '../components/customer-components/UserProfileModal'


const CustomerHome = () => {

    const navigate = useNavigate()

   const { logout } = useAuth()

   const handleLogout = async() => {
    try {
        const res = await logoutApi()

        console.log(res);

        toast.success(res.message)

        logout()
        
        setTimeout(() => {
            navigate('/')
        }, 1500);
    } catch (err) {
        toast.error("Failed to logout")
    }
   }

  return (
    <>
    <Navbar handleLogout={handleLogout}/>
    <MessListingSection />
    
    </>

   
  )
}

export default CustomerHome