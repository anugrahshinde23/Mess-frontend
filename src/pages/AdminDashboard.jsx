import React, { useState } from 'react'
import { logoutApi } from '../services/auth.services';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/admin-components/SideBar';
import ContentSection from '../components/admin-components/ContentSection';

const AdminDashboard = () => {

  const {logout} = useAuth()

  const navigate = useNavigate()


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

       const [tab,setTab] = useState("dashboard")
  return (
    <>
    
    <div className='flex h-screen gap-10 p-7 bg-[#0d0c22]'>
      <SideBar tab={tab} setTab={setTab}/>
      <ContentSection tab={tab} handleLogout={handleLogout} />
    </div>
    
    </>
  )
}

export default AdminDashboard