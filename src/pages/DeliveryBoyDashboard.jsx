import React, { useEffect, useState } from 'react'
import NavBar from '../components/deliveryboy-components/NavBar'
import { getDeliveryBoyInfoApi } from '../services/deliveryBoyServices'
import { toast } from 'react-toastify'
import MessList from '../components/deliveryboy-components/MessList'
import { logoutApi } from '../services/auth.services'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/deliveryboy-components/TopBar'

const DeliveryBoyDashboard = () => {


 const { logout } = useAuth()

  const [dBoy, setDboy] = useState(null)

  const navigate = useNavigate()

  const handleGetDeliveryBoy = async () => {
    try {
      const res = await getDeliveryBoyInfoApi()
      console.log(res);
      setDboy(res.deliveryBoyData)
      toast.success(res.message)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

   const handleLogout = async() => {
     try {
         const res = await logoutApi()
  
         console.log(res);
        
        //  toast.success(res.message)
  
         logout()
         
         setTimeout(() => {
             navigate('/')
         }, 1500);
     } catch (err) {
         toast.error("Failed to logout")
     }
    }

  

  useEffect(() => {
    handleGetDeliveryBoy()
  }, [])
  


  return (
    <>
       <NavBar logout={handleLogout} />
       <MessList dBoy={dBoy}/>
       <TopBar dBoy={dBoy}/>
       
    </>
  )
}

export default DeliveryBoyDashboard