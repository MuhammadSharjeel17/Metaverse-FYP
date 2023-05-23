import React, { useEffect,useState } from 'react';
import './ProductCard1.css';
import axios from 'axios';
const ProductCard = () => {
  const [productData,setProductData] = useState();
  async function get3DModels (){
   try {
    const data = await fetch("http://localhost:8080/api/product/getproducts");
const response = await data.json();
console.log(response);
if(response.status === true){
  setProductData(response.data);
}
   }
    catch (error) {
    console.log(error);
   }
  }
 useEffect(()=>{
 get3DModels();
 },[])
  console.log(productData)
  return (
   <>
   
    <section id="sellers">
        <div className="container ">
           
            <section id="seller">
            <h2>Top Shoes</h2>
    <div className="best-seller p-5 row">
  {productData ? (
    productData.filter((x)=>x.category=="shoes").map((element, index) => (
      <div className="col-md-4  mb-4" key={index}>
        <div className="best-p1 shadow" id={index}>
          <div className="sketchfab-embed-wrapper">
            <iframe
              title="Adidas Sport Shoes LowPoly Freebie"
              src={element.image}
            ></iframe>
          </div>
          <div className="best-p1-txt">
            <div className="name-of-p">
              <h3>{element.title}</h3>
            </div>
            <div className="rating">
              <i className='bx bxs-star'></i>
              <i className='bx bxs-star'></i>
              <i className='bx bxs-star'></i>
              <i className='bx bx-star'></i>
              <i className='bx bx-star'></i>
            </div>
            <div className="price d-flex justify-content-between">
              <div className="colors">
                <b>Available Colors:</b>
                <i className='bx bxs-circle red'></i>
                <i className='bx bxs-circle blue'></i>
                <i className='bx bxs-circle white'></i>
              </div>
              <div className="colors mr-3">
                <b>Quantitiy: {element.quantity}</b>
              </div>
            </div>
            <div>
              <p>
                {element.description}
              </p>
            </div>
            <div className="buy-now">
              <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div>Loading....</div>
  )}
</div>
    </section>
        </div>
       
        <section id="sellers">
        <div className="container ">
           
            <section id="seller">
            <h2>Top for Men</h2>
    <div className="best-seller p-5 row">
  {productData ? (
    productData.filter((x)=>x.category == "men").map((element, index) => (
      <div className="col-md-4  mb-4" key={index}>
        <div className="best-p1 shadow" id={index}>
          <div className="sketchfab-embed-wrapper">
            <iframe
              title="Adidas Sport Shoes LowPoly Freebie"
              src={element.image}
            ></iframe>
          </div>
          <div className="best-p1-txt">
            <div className="name-of-p">
              <h3>{element.title}</h3>
            </div>
            <div className="rating">
              <i className='bx bxs-star'></i>
              <i className='bx bxs-star'></i>
              <i className='bx bxs-star'></i>
              <i className='bx bx-star'></i>
              <i className='bx bx-star'></i>
            </div>
            <div className="price d-flex justify-content-between">
              <div className="colors">
                <b>Available Colors:</b>
                <i className='bx bxs-circle red'></i>
                <i className='bx bxs-circle blue'></i>
                <i className='bx bxs-circle white'></i>
              </div>
              <div className="colors mr-3">
                <b>Quantitiy: {element.quantity}</b>
              </div>
            </div>
            <div>
              <p>
                {element.description}
              </p>
            </div>
            <div className="buy-now">
              <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div>Loading....</div>
  )}
</div>
    </section>

    
        </div>
       
        
          
    </section>  
          
    </section>


    <section id="sellers">
        <div className="container ">
           
            <section id="seller">
            <h2>Top for Bags</h2>
    <div className="best-seller p-5 row">
  {productData ? (
    productData.filter((x)=>x.category == "bags").map((element, index) => (
      <div className="col-md-4  mb-4" key={index}>
        <div className="best-p1 shadow" id={index}>
          <div className="sketchfab-embed-wrapper">
            <iframe
              title="Adidas Sport Shoes LowPoly Freebie"
              src={element.image}
            ></iframe>
          </div>
          <div className="best-p1-txt">
            <div className="name-of-p">
              <h3>{element.title}</h3>
            </div>
            <div className="rating">
              <i className='bx bxs-star'></i>
              <i className='bx bxs-star'></i>
              <i className='bx bxs-star'></i>
              <i className='bx bx-star'></i>
              <i className='bx bx-star'></i>
            </div>
            <div className="price d-flex justify-content-between">
              <div className="colors">
                <b>Available Colors:</b>
                <i className='bx bxs-circle red'></i>
                <i className='bx bxs-circle blue'></i>
                <i className='bx bxs-circle white'></i>
              </div>
              <div className="colors mr-3">
                <b>Quantitiy: {element.quantity}</b>
              </div>
            </div>
            <div>
              <p>
                {element.description}
              </p>
            </div>
            <div className="buy-now">
              <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div>Loading....</div>
  )}
</div>
    </section>

    
        </div>
       
        
          
    </section>  

    <section id="sellers">
        <div className="container ">
           
            <section id="seller">
            <h2>Top for Women</h2>
    <div className="best-seller p-5 row">
  {productData ? (
    productData.filter((x)=>x.category == "women").map((element, index) => (
      <div className="col-md-4  mb-4" key={index}>
        <div className="best-p1 shadow" id={index}>
          <div className="sketchfab-embed-wrapper">
            <iframe
              title="Adidas Sport Shoes LowPoly Freebie"
              src={element.image}
            ></iframe>
          </div>
          <div className="best-p1-txt">
            <div className="name-of-p">
              <h3>{element.title}</h3>
            </div>
            <div className="rating">
              <i className='bx bxs-star'></i>
              <i className='bx bxs-star'></i>
              <i className='bx bxs-star'></i>
              <i className='bx bx-star'></i>
              <i className='bx bx-star'></i>
            </div>
            <div className="price d-flex justify-content-between">
              <div className="colors">
                <b>Available Colors:</b>
                <i className='bx bxs-circle red'></i>
                <i className='bx bxs-circle blue'></i>
                <i className='bx bxs-circle white'></i>
              </div>
              <div className="colors mr-3">
                <b>Quantitiy: {element.quantity}</b>
              </div>
            </div>
            <div>
              <p>
                {element.description}
              </p>
            </div>
            <div className="buy-now">
              <button><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy  Now</a></button>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div>Loading....</div>
  )}
</div>
    </section>

    
        </div>
       
        
          
    </section>  
          
  
          
   
   

   </>
  )
}

export default ProductCard