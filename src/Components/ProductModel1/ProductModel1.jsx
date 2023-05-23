import React from 'react'
import './ProductModel1.scss';
import {$,} from 'jquery'
const ProductModel1 = () => {
    
  return (
    <>
<div className="shop-card">
  <div className="title">
    Nike Metcon 2
  </div>
  <div className="desc">
    Men's training shoe
  </div>
  <div className="slider">
    <figure data-color="#E24938, #A30F22">
      <img src="http://www.supah.it/dribbble/012/1.jpg" />
    </figure>
    {/* <figure data-color="#6CD96A, #00986F">
      <img src="http://www.supah.it/dribbble/012/2.jpg" />
    </figure>
    <figure data-color="#4795D1, #006EB8">
      <img src="http://www.supah.it/dribbble/012/3.jpg" />
    </figure>
    <figure data-color="#292a2f, #131519">
      <img src="http://www.supah.it/dribbble/012/4.jpg" />
    </figure> */}
  </div>

  <div className="cta">
    <div className="price">$130</div>
    <button className="btn">Add to cart<span className="bg"></span></button>
  </div>
</div>
<div className="bg"></div>



<a className="the-most" target="_blank" href="https://codepen.io/2016/popular/pens/">
  <img src="https://raw.githubusercontent.com/supahfunk/supah-codepen/master/themost-2016.png"/>
</a>
    </>
  )
}

export default ProductModel1