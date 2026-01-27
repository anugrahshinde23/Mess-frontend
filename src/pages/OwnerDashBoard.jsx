import React, { useState } from 'react'
import { logoutApi } from '../services/auth.services'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getMessApi } from '../services/mess.services'
import { getUserApi } from '../services/user.service'
import Navbar from '../components/owner-components/Navbar'
import SideBar from '../components/owner-components/SideBar'
import HeroSection from '../components/owner-components/HeroSection'
import UpdateModal from '../components/owner-components/UpdateModal'

const OwnerDashBoard = () => {

  const [activeTab, setActiveTab] = useState("tab1")

  const [messData, setMessData] = useState(null)

  const [showUpdateModal,setShowUpdateModal] = useState(false)
  

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


  // const handleGetUserData = async () => {
  //   try {
  //     const res = await getUserApi()

  //     console.log(res);
  //     setUserData(res.data)
  //   } catch (error) {
  //     toast.error("Failed to fetch the user")
  //   }
  // }

  const handleGetMessData = async() => {
    try {
      const res = await getMessApi()
      setMessData(res)
      console.log(res);
      
    } catch (error) {
      toast.error("Failed to fetch the data")
    }
  }

  const onClose = () => {
    setShowUpdateModal(false)
  }


  return (
    <>
    <Navbar />
    <div className='flex flex-col  sm:flex-row ' >
    <SideBar activeTab={activeTab} setActiveTab={setActiveTab}  />
    <HeroSection activeTab={activeTab} messData={messData} handleGetMessData={handleGetMessData} showUpdateModal={showUpdateModal} setShowUpdateModal={setShowUpdateModal} handleLogout={handleLogout} />
    </div>
    <UpdateModal showUpdateModal={showUpdateModal} onClose={onClose} setShowUpdateModal={setShowUpdateModal} messData={messData} handleGetMessData={handleGetMessData} />
    </>
  )
}

export default OwnerDashBoard