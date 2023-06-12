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
      <div class="col-md-4 mb-4" key={index}>
  <div class="shadow" id={index}>
    <div class="sketchfab-embed-wrapper">
      <iframe
        title="Adidas Sport Shoes LowPoly Freebie"
        src={element.image}
      ></iframe>
    </div>
    <div class="best-p1-txt">
      <div class="name-of-p">
        <h3 class="truncate-text">{element.title}</h3>
      </div>
      <div class="rating">
        <i class='bx bxs-star'></i>
        <i class='bx bxs-star'></i>
        <i class='bx bxs-star'></i>
        <i class='bx bx-star'></i>
        <i class='bx bx-star'></i>
      </div>
      <div class="price d-flex justify-content-between">
        <div class="colors">
          <b>Available Colors:</b>
          <i class='bx bxs-circle red'></i>
          <i class='bx bxs-circle blue'></i>
          <i class='bx bxs-circle white'></i>
        </div>
        <div class="colors mr-3">
          <b>Quantity: {element.quantity}</b>
        </div>
      </div>
      <div>
        <p class="justify-text">{element.description}</p>
      </div>
      <div class="buy-now">
        <button class="btn btn-primary"><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy Now</a></button>
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
      <div class="col-md-4 mb-4" key={index}>
      <div class="shadow" id={index}>
        <div class="sketchfab-embed-wrapper">
          <iframe
            title="Adidas Sport Shoes LowPoly Freebie"
            src={element.image}
          ></iframe>
        </div>
        <div class="best-p1-txt">
          <div class="name-of-p">
            <h3 class="truncate-text">{element.title}</h3>
          </div>
          <div class="rating">
            <i class='bx bxs-star'></i>
            <i class='bx bxs-star'></i>
            <i class='bx bxs-star'></i>
            <i class='bx bx-star'></i>
            <i class='bx bx-star'></i>
          </div>
          <div class="price d-flex justify-content-between">
            <div class="colors">
              <b>Available Colors:</b>
              <i class='bx bxs-circle red'></i>
              <i class='bx bxs-circle blue'></i>
              <i class='bx bxs-circle white'></i>
            </div>
            <div class="colors mr-3">
              <b>Quantity: {element.quantity}</b>
            </div>
          </div>
          <div>
            <p class="justify-text">{element.description}</p>
          </div>
          <div class="buy-now">
            <button class="btn btn-primary"><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy Now</a></button>
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
      <div class="col-md-4 mb-4" key={index}>
      <div class="shadow" id={index}>
        <div class="sketchfab-embed-wrapper">
          <iframe
            title="Adidas Sport Shoes LowPoly Freebie"
            src={element.image}
          ></iframe>
        </div>
        <div class="best-p1-txt">
          <div class="name-of-p">
            <h3 class="truncate-text">{element.title}</h3>
          </div>
          <div class="rating">
            <i class='bx bxs-star'></i>
            <i class='bx bxs-star'></i>
            <i class='bx bxs-star'></i>
            <i class='bx bx-star'></i>
            <i class='bx bx-star'></i>
          </div>
          <div class="price d-flex justify-content-between">
            <div class="colors">
              <b>Available Colors:</b>
              <i class='bx bxs-circle red'></i>
              <i class='bx bxs-circle blue'></i>
              <i class='bx bxs-circle white'></i>
            </div>
            <div class="colors mr-3">
              <b>Quantity: {element.quantity}</b>
            </div>
          </div>
          <div>
            <p class="justify-text">{element.description}</p>
          </div>
          <div class="buy-now">
            <button class="btn btn-primary"><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy Now</a></button>
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
      <div class="col-md-4 mb-4" key={index}>
      <div class="shadow" id={index}>
        <div class="sketchfab-embed-wrapper">
          <iframe
            title="Adidas Sport Shoes LowPoly Freebie"
            src={element.image}
          ></iframe>
        </div>
        <div class="best-p1-txt">
          <div class="name-of-p">
            <h3 class="truncate-text">{element.title}</h3>
          </div>
          <div class="rating">
            <i class='bx bxs-star'></i>
            <i class='bx bxs-star'></i>
            <i class='bx bxs-star'></i>
            <i class='bx bx-star'></i>
            <i class='bx bx-star'></i>
          </div>
          <div class="price d-flex justify-content-between">
            <div class="colors">
              <b>Available Colors:</b>
              <i class='bx bxs-circle red'></i>
              <i class='bx bxs-circle blue'></i>
              <i class='bx bxs-circle white'></i>
            </div>
            <div class="colors mr-3">
              <b>Quantity: {element.quantity}</b>
            </div>
          </div>
          <div>
            <p class="justify-text">{element.description}</p>
          </div>
          <div class="buy-now">
            <button class="btn btn-primary"><a href="https://codepen.io/sanketbodke/full/mdprZOq">Buy Now</a></button>
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