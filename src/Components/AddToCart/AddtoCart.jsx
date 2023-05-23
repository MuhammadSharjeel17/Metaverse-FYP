import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartItemCount }) {
  return (
    <nav className="navbar d-flex justify-content-between">
      <div className="navbar-container">
        <ul className="menu-items">
          <li>
            <Link to="#home">Home</Link>
          </li>
          <li>
            <Link to="#sellers">Shop</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      <div className="cart-icon">
        <Link to="/cart">
          <i className="fas fa-shopping-cart"></i>
          {cartItemCount > 0 && <span className="cart-item-count">{cartItemCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

function AddToCart() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((cartItem) => cartItem.id !== itemId));
  };

  const increaseQuantity = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) => {
        if (cartItem.id === itemId && cartItem.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      })
    );
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <Navbar cartItemCount={cartItemCount} />

      <div className="seller container">
        <h2>New Arrivals</h2>
        <div className="best-seller">
          <div className="best-p1">
            <img src="https://i.postimg.cc/fbnB2yfj/na1.png" alt="img" />
            <div className="best-p1-txt">
              <div className="name-of-p">
                <p>PS England T-Shirt</p>
              </div>
              <div className="rating">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
              </div>
              <div className="price">
                <span>$ 27.24</span>
                <span>PKR 7000 </span>
                <div className="colors">
                  <i className="bx bxs-circle blank"></i>
                  <i className="bx bxs-circle blue"></i>
                  <i className="bx bxs-circle brown"></i>
                </div>
              </div>
              <div className="buy-now">
                <button onClick={() => addToCart({ id: 1, name: "PS England T-Shirt" })}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          {/* Add other product cards here */}
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
