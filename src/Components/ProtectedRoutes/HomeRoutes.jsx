import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
function HomeRoute() {
    const item=localStorage.getItem("user");
     if(item){
        return <Navigate to="/home"></Navigate>
     }
     else{
  return <Outlet/>
  
}
}

export default HomeRoute