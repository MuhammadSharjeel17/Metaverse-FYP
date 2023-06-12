import './App.css';
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import { useState } from 'react';
import Login from './Components/SignupAndLogin/Login';
import Firsthomepage from './Components/FirstHomePage/firsthomepage';
import VirtualRealityModel from './Components/VirtualRealityModels/VirtualRealityModel';
import Signup from './Components/SignupAndLogin/Signup';
import Productcard from './Components/ProductCard/productcard';
import Banner from './Components/UsefulComponents/Banner';
import ProductModel from './Components/ProductCard/productcard';
import Homepage from './Components/HomePage/Homepage';
import PaymentGateway from './Components/PaymentGateway/PaymentGateway';
import AddToCart from './Components/AddToCart/AddtoCart';

import AboutUs from './Components/AboutUs/AboutUs';
import ProductCard from './Components/ProductCard1/ProductCard';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import HomeRoute from './Components/ProtectedRoutes/HomeRoutes';
import ProtectedRoutes from './Components/ProtectedRoutes/protectedRoutes';
import CheckoutForm from './Components/StripePayment/StripePayment';
import ThreeModels from './Components/3D-Models/3d-models';
import Home from './Screen/Home';




function App() {
 
  return (
  <>
  <Router>
      <Routes> 
        <Route> 
        <Route element={<HomeRoute/>}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
         <Route path='/' element={<Firsthomepage  />}/>
         </Route>
        <Route path='/product' element={<ProductModel/>} />
       <Route element={<ProtectedRoutes/>}>
        <Route path='/home' element={<Homepage  />} />
        <Route path='/trail-room' element={<Home/>} />
        {/* <Route path='/vr' element={<VirtualRealityModel/>} /> */}
        <Route path='/pay' element={<CheckoutForm/>} />
        {/* <Route path='/home' element={<Banner/>} /> */}
       
        <Route path='/payment' element={<PaymentGateway/>} />
        <Route path='/cart' element={<AddToCart/>} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/productcard' element={<ProductCard/>} />
        <Route path='/3d-card' element={<ThreeModels/>} />
        <Route path='/update/:id' element={<UpdateProfile/>} />
        </Route>
        </Route>
      
</Routes>
     
    </Router>
  </>
  );
}

export default App;
