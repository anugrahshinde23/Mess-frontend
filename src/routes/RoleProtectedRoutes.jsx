import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';


const RoleProtectedRoutes = ({allowedRoles, children}) => {

  const { user } = useAuth()

  console.log("User from roleprotected route : ", user);
  

 

  if(!user){
   return <Navigate to='/auth' replace />
  }

  if(!allowedRoles.includes(user.role)){
    return <Navigate to='/' replace />
  }

  return children
}

export default RoleProtectedRoutes