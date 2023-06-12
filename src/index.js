import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProductModel from './Components/ProductCard/productcard';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import ProductCard from './Components/ProductCard1/ProductCard';
// import PlotsForm from './Components/Admin/ProductForm/AdminProductForm';
import * as serviceWorker from './serviceWorker';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
{/* <ProductModel/> */}
{/* <UpdateProfile/> */}
{/* <ProductCard/> */}
{/* <PlotsForm/> */}
<App/>
  </React.StrictMode>
);
serviceWorker.register();