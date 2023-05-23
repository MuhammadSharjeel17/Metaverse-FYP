import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoutes() {
 

    const item=(localStorage.getItem("user"));
     if(!item){
        return <Navigate to="/"></Navigate>
     }
     else{
  return <Outlet/>
  
}
}

export default ProtectedRoutes