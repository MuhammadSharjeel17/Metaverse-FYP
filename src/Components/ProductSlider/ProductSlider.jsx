import React from 'react'
import './ProductSlider.css'
const ProductSlider = () => {
    
      
  return (
   <>
<div className="wrapper">

{/* <!-- Nike 19 --> */}
<div className="card card--19">
  <div className="card__header card__header--19">
    <div className="card__watermark" data-watermark="Air"></div>

    <img src="https://i.ibb.co/q7RKcZk/nike.png" alt="Nike" className="card__logo card__will-animate"/>

    <span className="card__price card__will-animate">$120</span>

    <h1 className="card__title card__will-animate">Air Structure 1</h1>
    <span className="card__subtitle card__will-animate">From the Flymesh upper to the triple-density foam midsole, the Nike Air Zoom Structure 19 Men's Running Shoe offers plenty of support and the response you need for a smooth, stable ride that feels ultra fast.</span>

  </div>

  <div className="card__body">
    <img src="https://i.ibb.co/R0Y8T8r/nike19.png" alt="Nike 19" className="card__image card__will-animate"/>
    <div className="card__wish-list card__wish-list--19 card__will-animate">Wish List</div>

    <span className="card__category card__will-animate">Men's running shoe</span>
  </div>
</div>

{/* <!-- Nike Solstice --> */}
<div className="card card--solstice">
  <div className="card__header card__header--solstice">
    <div className="card__watermark" data-watermark="Classic"></div>

    <img src="https://i.ibb.co/q7RKcZk/nike.png" alt="Nike" className="card__logo card__will-animate"/>

    <span className="card__price card__will-animate">$129</span>

    <h1 className="card__title card__will-animate">Air Solstice QS</h1>
    <span className="card__subtitle card__will-animate">The Nike Air Solstice draws inspiration from the swoosh's classic running shoes of the 1980's updating the style with premium materials and impressive production quality.</span>

  </div>

  <div className="card__body">
    <img src="https://i.ibb.co/ZMVHp6x/nike-air-solstice.png" alt="Nike Solstice" className="card__image card__will-animate"/>
    <div className="card__wish-list card__wish-list--solstice card__will-animate">Wish List</div>

    <span className="card__category card__will-animate">Men's shoe</span>
  </div>
</div>

{/* <!-- Nike Huarache --> */}
<div className="card card--huarache">
  <div className="card__header card__header--huarache">
    <div className="card__watermark" data-watermark="Safari"></div>

    <img src="https://i.ibb.co/q7RKcZk/nike.png" alt="Nike" className="card__logo card__will-animate"/>

    <span className="card__price card__will-animate">$140</span>

    <h1 className="card__title card__will-animate">Air Huarache Utility</h1>
    <span className="card__subtitle card__will-animate">The Nike Air Huarache Utility Men's Shoe toughens up a famous running shoe with a nylon upper, fused mudguard and vibrant detail.</span>

  </div>

  <div className="card__body">
    <img src="https://i.ibb.co/9bc3SYK/nike-safari.png" alt="Nike Huarache" className="card__image card__will-animate"/>
    <div className="card__wish-list card__wish-list--solstice card__will-animate">Wish List</div>

    <span className="card__category card__will-animate">Men's shoe</span>
  </div>
</div>

</div> 
{/* <!-- /wrapper --> */}

<div className="cards-placeholder">
<div className="cards-placeholder__item"></div>
<div className="cards-placeholder__item"></div>
<div className="cards-placeholder__item"></div>
</div>

   </>
  )
}

export default ProductSlider