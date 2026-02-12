import React from 'react'
import { logoutApi } from '../services/auth.services';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
  return (
    <>
    
    <p>Admin dashboard</p>
    <button onClick={handleLogout}>logout</button>
    
    </>
  )
}

export default AdminDashboard