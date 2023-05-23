import React from 'react'
import { useNavigate } from 'react-router-dom'
import './firsthomepage.css'

import { Link } from 'react-router-dom'
import ContactUs from '../UsefulComponents/ContactUs'
import Navbar from '../UsefulComponents/Navbar'
import Banner from '../UsefulComponents/Banner'
import AboutUs from './AboutUs'
const Firsthomepage = () => {
const navigate = useNavigate();

  return (
   <>
  <div>
  <Navbar/>
  </div>
   <div className="background-Container ">
   <div className="d-flex flex-column justify-content-center w-full h-full">
 
{/* <div className="d-flex flex-column justify-content-center mt-5 align-items-center">
    
     <img  src="./logo-Meta.webp" border-radius="50%" className="Image-size"  alt="Logo"/>
    <h1 className="fw-light fs-1 text-danger m-0">WELCOME TO METAVERSE SHOPPING MALL</h1>
    <div className="btn-group mx-5 my-5">
        <Link to="/vr" className="btn btn-outline-light " aria-current="page" >EXPLORE META</Link>   
    </div>
    <a  className="text-decoration-none">
        <h5 className="fw-light text-white  m-0">— Powered by Meta —</h5>
    </a>
   
</div> */}
</div>
</div>
<div>
<AboutUs/>
</div>
<div className="my-5">
    <h3 className='text-center'>Contact Us</h3>
    <h3 className='text-center my-3'>Feel free to Send a Message and Share Your Thoughts About Meta</h3>
    <ContactUs  />

</div>

   </>
  )
}

export default Firsthomepage