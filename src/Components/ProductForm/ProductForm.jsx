import React from 'react'
import './ProductForm.css';
const ProductForm = () => {
  return (
    <>
   <div className="form-container">
  <h2 className="form-heading">Add Product</h2>
  <form>
    {/* <div className="form-input-container">
      <div className="form-input-image">
        <img id="image-preview" className="image-preview" src="#" alt="Product Image"/>
        <input type="file" id="image-file" className="form-input-image-file" accept="image/*"/>
        <label for="image-file" className="form-input-image-label"><i className="fas fa-camera"></i></label>
      </div>
      <div className="form-input-details">
        <input type="text" id="name" className="form-input" placeholder="Product Name"/>
        <input type="number" id="price-usd" className="form-input" placeholder="Price in USD"/>
        <input type="number" id="price-pkr" className="form-input" placeholder="Price in PKR"/>
        <input type="text" id="seller-name" className="form-input" placeholder="Seller Name"/>
        <input type="text" id="description" className="form-input" placeholder="Description"/>
        <input type="number" id="quantity" className="form-input" placeholder="Quantity"/>
      </div>
    </div> */}
    <button type="submit" className="form-button">Add Product</button>
  </form>
</div>

    </>
  )
}

export default ProductForm