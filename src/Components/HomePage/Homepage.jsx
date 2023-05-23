import ProductModel from '../ProductCard/productcard';
import Navbar from './Navbar/Navbar';
import './Homepage.css';
import ProductModel1 from '../ProductModel1/ProductModel1';
import ProductSlider from '../ProductSlider/ProductSlider';
import LandingPage from './LandingPage/LandingPage';
const Homepage = () => {
  return (
    <>
   
   <div className='Main-Product-Container'>
    {/* <Navbar/> */}
    <LandingPage/>
   </div>
    </>
  )
}

export default Homepage