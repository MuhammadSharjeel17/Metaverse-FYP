import React from 'react'
import './LandingPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
import axios from 'axios';
const LandingPage = () => {
    let token = localStorage.getItem('user');
    const decoded = jwt_decode(token);
    console.log(token)
    const [showDropdown, setShowDropdown] = useState(false);
    const [userDetails, setUserDetails] = useState();
    const [productsDetails, setProductsDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [shoppingList, setShoppingList] = useState([]);
// Add to cart

    // Initialize quantity state
const [quantity, setQuantity] = useState(1);

// Handle quantity input change

    const navigate = useNavigate();
    useEffect(() => {
      const fetchUserDetails = async () => {

        setLoading(true);
        try {
          
          console.log(decoded)
          const response = await axios.get(`http://localhost:8080/api/user/getuser/${decoded.id}`)
          setUserDetails(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserDetails();

      const fetchProductsDetails = async () => {

      
        try {
          
          console.log(decoded)
          const response = await axios.get(`http://localhost:8080/api/product/getimageproduct`)
          setProductsDetails(response.data.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchProductsDetails();
    }, []); 
    if (loading) {
      return <p className="loading">Loading user details...</p>;
    }
  
    if (!userDetails) {
      return <p>Unable to fetch user details</p>;
    }
  console.log(productsDetails)
  
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLogout = () => {
    // Handle logout logic\
    localStorage.clear();
 return navigate('/');
  };
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
};

// Decrement quantity
const decrementQuantity = () => {
    if (quantity > 1) {
        setQuantity(quantity - 1);
    }
};

// Increment quantity
const incrementQuantity = (element) => {
    const maxQuantity = parseInt(element.quantity);
    if (quantity < maxQuantity) {
        setQuantity(quantity + 1);
    }
};
const showModal = () => {
    const modal = new Modal(document.getElementById('shoppingListModal'));
    modal.show();
  };
const makePostRequest = () => {
   
   
    console.log(decoded.id)
    let id = decoded.id;
    axios.get(`http://localhost:8080/api/cart/get-cart/${id}`)
      .then(response => {
        const shoppingListData = response.data.data; // Assuming the API response is an array of shopping items
        setShoppingList(shoppingListData);
        showModal();
      })
      .catch(error => {
        console.log(error);
      });
  };
 console.log("shoppingList",shoppingList)
  
// Add to cart

const addToCart =async (data) => {
    try{
        console.log(decoded)
         await axios.post(`http://localhost:8080/api/cart/add-to-cart`, {
            UserId: decoded.id,
            title: data.title,
            quantity: data.quantity,
            image: data.image,
            price: data.price

        }).then((response)=>{
            console.log(response);
            setCartCount(cartCount + 1);
           alert('Added to Cart');
        })
        

         
    }
    catch(error){
        console.log("Error adding to cart",error)
    }
   
};
  return (
    <>
    <nav className="navbar d-flex justify-content-between">
  <div className="navbar-container">
    <ul className="menu-items">
      <li><Link to="#home">Home</Link></li>
      <li><Link to="#sellers">Shop</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/payment">Payment</Link></li>
    </ul>
  </div>
  <div className="dropdown d-flex">
    <Link
      className="nav-link dropdown-toggle d-flex align-items-center me-5"
      id="userDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded={showDropdown}
      onClick={handleDropdownToggle}
    >
      <div className="rounded-circle d-flex align-items-center justify-content-center overflow-hidden me-2" style={{ height: "50px", width: "50px" }}>
        <img
          src={`http://localhost:8080/ImageUploads/${userDetails.data.image}`}
          alt=""
          height="100%"
          style={{
            display: "block",
            margin: "auto",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "blankimage.webp"; // replace with your default image
            e.target.style.objectFit = "cover"; // optional: adjust the image size and position
          }}
        />
      </div>
      <span className="text-nowrap">{userDetails.data.Name}</span>
    </Link>
   
    <div
      className={`dropdown-menu dropdown-menu-end ${showDropdown ? "show" : ""}`}
      aria-labelledby="userDropdown"
    >
      <Link
        to={`/update/${decoded.id}`}
        className="dropdown-item d-flex align-items-center"
      >
        <span className="me-2">
          <i className="fas fa-user-edit"></i>
        </span>
        Update
      </Link>
      <button
        onClick={handleLogout}
        className="dropdown-item d-flex align-items-center"
      >
        <span className="me-2">
          <i className="fas fa-sign-out-alt"></i>
        </span>
        Logout
      </button>
    </div>
    <div className="add-to-cart mr-4 rounded">
    <button onClick={makePostRequest}>
    
        <i className="bx bx-cart"></i>
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
    </button>
</div>
  </div>
</nav>


    <div>
        <button
        style={{
            backgroundColor: '#0077FF',
            color: '#FFFFFF',
            padding: '0.5rem 1rem',
            margin:'15px',
            borderRadius: '0.25rem',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={()=>navigate('/productcard')}>View 3DProducts</button>

<button
        style={{
            backgroundColor: '#0077FF',
            color: '#FFFFFF',
            padding: '0.5rem 1rem',
            margin:'15px',
            borderRadius: '0.25rem',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={()=>navigate('/productcard')}>View 3DModels</button>      
     </div>
    <section id="home">
        <div className="home_page ">
            <div className="home_img ">
                {/* <img src="https://i.postimg.cc/t403yfn9/home2.jpg" alt="img"/> */}
                <img src="https://i.postimg.cc/t403yfn9/home2.jpg" alt="img"/>
            </div>
            <div className="home_txt ">
                <p className="collectio ">SUMMER COLLECTION</p>
                <h2>FALL - WINTER<br/>Collection 2023</h2>
                <div className="home_label ">
                    <p>A specialist label creating luxury essentials. Ethically crafted<br/>with an unwavering commitment to exceptional quality.</p>
                </div>
                <button><Link to="#sellers">SHOP NOW</Link><i className='bx bx-right-arrow-alt'></i></button>
                <div className="home_social_icons">
                    <Link to="#"><i className='bx bxl-facebook'></i></Link>
                    <Link to="#"><i className='bx bxl-twitter'></i></Link>
                    <Link to="#"><i className='bx bxl-pinterest'></i></Link>
                    <Link to="#"><i className='bx bxl-instagram'></i></Link>
                </div>
            </div>
        </div>
    </section>
     
    <section id="collection">
        <div className="collections container">
            <div className="content">
                <img src="https://i.postimg.cc/Xqmwr12c/clothing.webp" alt="img" />
                <div className="img-content">
                    <p>Clothing Collections</p>
                    <button><Link to="#sellers">SHOP NOW</Link></button>
                </div>
            </div>
            <div className="content2">
                <img src="https://i.postimg.cc/8CmBZH5N/shoes.webp" alt="img" />
                <div className="img-content2">
                    <p>Shoes Spring</p>
                    <button><Link to="#sellers">SHOP NOW</Link></button>
                </div>
            </div>
            <div className="content3">
                <img src="https://i.postimg.cc/MHv7KJYp/access.webp" alt="img" />
                <div className="img-content3">
                    <p>Accessories</p>
                    <button><Link to="#sellers">SHOP NOW</Link></button>
                </div>
            </div>
        </div>
    </section>
    <section id="sellers">
        <div className="seller container">
            <h2>Top Sales</h2>
            <div className="best-seller">
                <div className="best-p1">
                    <img src="https://i.postimg.cc/8CmBZH5N/shoes.webp" alt="img"/>
                    <div className="best-p1-txt">
                        <div className="name-of-p">
                            <p>PS England Shoes</p>
                        </div>
                        <div className="rating">
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bx-star'></i>
                            <i className='bx bx-star'></i>
                        </div>
                        <div className="price">
                           
                            <div className="colors">
                                <i className='bx bxs-circle red'></i>
                                <i className='bx bxs-circle blue'></i>
                                <i className='bx bxs-circle white'></i>
                            </div>
                        </div>
                        <div className="buy-now">
                            <button><Link to="/payment">Buy  Now</Link></button>
                        </div>
                        {/* <!-- <div className="add-cart">
                            <button>Add To Cart</button>
                        </div> --> */}
                    </div>
                </div>
                <div className="best-p1">
                    <img src="https://i.postimg.cc/76X9ZV8m/Screenshot_from_2022-06-03_18-45-12.png" alt="img"/>
                    <div className="best-p1-txt">
                        <div className="name-of-p">
                            <p>PS England Jacket</p>
                        </div>
                        <div className="rating">
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bx-star'></i>
                            <i className='bx bx-star'></i>
                            <i className='bx bx-star'></i>
                        </div>
                        <div className="price">
                        <span>$ 27.24</span>
                            <span>PKR 7000 </span>
                            <div className="colors">
                                <i className='bx bxs-circle green'></i>
                                <i className='bx bxs-circle grey'></i>
                                <i className='bx bxs-circle brown'></i>
                            </div>
                        </div>
                        <div className="buy-now">
                            <button><Link to="/payment">Buy  Now</Link></button>
                        </div>
                    </div>
                </div>
                <div className="best-p1">
                    <img src="https://i.postimg.cc/j2FhzSjf/bs2.png" alt="img"/>
                    <div className="best-p1-txt">
                        <div className="name-of-p">
                            <p>PS England Shirt</p>
                        </div>
                        <div className="rating">
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bx-star'></i>
                        </div>
                        <div className="price">
                            <span>$ 27.24</span>
                            <span>PKR 7000 </span>
                            <div className="colors">
                                <i className='bx bxs-circle brown'></i>
                                <i className='bx bxs-circle green'></i>
                                <i className='bx bxs-circle blue'></i>
                            </div>
                        </div>
                        <div className="buy-now">
                            <button><Link to="/payment">Buy  Now</Link></button>
                        </div>
                    </div>
                </div>
                <div className="best-p1">
                    <img src="https://i.postimg.cc/QtjSDzPF/bs3.png" alt="img"/>
                    <div className="best-p1-txt">
                        <div className="name-of-p">
                            <p>PS England Shoes</p>
                        </div>
                        <div className="rating">
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                        </div>
                        <div className="price">
                        <span>$ 27.24</span>
                            <span>PKR 7000 </span>
                            <div className="colors">
                                <i className='bx bxs-circle red'></i>
                                <i className='bx bxs-circle grey'></i>
                                <i className='bx bxs-circle blue'></i>
                            </div>
                        </div>
                        <div className="buy-now">
                            <button><Link to="/payment">Buy  Now</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="seller container">
            <h2>New Arrivals</h2>
            <div className="best-seller">
                <div className="best-p1">
                    <img src="https://i.postimg.cc/fbnB2yfj/na1.png" alt="img"/>
                    <div className="best-p1-txt">
                        <div className="name-of-p">
                            <p>PS England T-Shirt</p>
                        </div>
                        <div className="rating">
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                        </div>
                        <div className="price">
                        <span>$ 27.24</span>
                            <span>PKR 7000 </span>
                            <div className="colors">
                                <i className='bx bxs-circle blank'></i>
                                <i className='bx bxs-circle blue'></i>
                                <i className='bx bxs-circle brown'></i>
                            </div>
                        </div>
                        <div className="buy-now">
                            <button><Link to="/payment">Buy  Now</Link></button>
                        </div>
                    </div>
                </div>
                <div className="best-p1">
                    <img src="https://i.postimg.cc/zD02zJq8/na2.png" alt="img"/>
                    <div className="best-p1-txt">
                        <div className="name-of-p">
                            <p>PS England Bag</p>
                        </div>
                        <div className="rating">
                            <i className='bx bxs-star'></i>
                            <i className='bx bx-star'></i>
                            <i className='bx bx-star'></i>
                            <i className='bx bx-star'></i>
                            <i className='bx bx-star'></i>
                        </div>
                        <div className="price">
                        <span>$ 27.24</span>
                            <span>PKR 7000 </span>
                            <div className="colors">
                                <i className='bx bxs-circle brown'></i>
                                <i className='bx bxs-circle red'></i>
                                <i className='bx bxs-circle green'></i>
                            </div>
                        </div>
                        <div className="buy-now">
                            <button><Link to="/payment">Buy  Now</Link></button>
                        </div>
                    </div>
                </div>
                {productsDetails.map((element,index)=>{
                 
              return( 
                <div className="best-p1" id={index}>
    <img src={"http://localhost:8080/ImageUploads/"+ element.image} alt="img" />
    <div className="best-p1-txt">
        <div className="name-of-p">
            <p>{element.title}</p>
        </div>
        <div className="rating">
            <i className='bx bxs-star'></i>
            <i className='bx bxs-star'></i>
            <i className='bx bxs-star'></i>
            <i className='bx bxs-star'></i>
            <i className='bx bxs-star'></i>
        </div>
        <div className="price">
            <span>$ {element.priceinDollars}</span>
            <span>PKR {element.priceinPkr}</span>
            <div className="colors">
                <i className='bx bxs-circle grey'></i>
                <i className='bx bxs-circle blank'></i>
                <i className='bx bxs-circle blank'></i>
            </div>
        </div>
        <div className="quantity-container">
            <div className="quantity-selectors">
                <button onClick={decrementQuantity}>-</button>
                <input type="number" min="1" max={element.quantity} value={quantity} onChange={handleQuantityChange} />
                <button onClick={() => incrementQuantity(element)}>+</button>
            </div>
            <div className="add-to-cart">
                <button onClick={()=>addToCart(element)}>
                    <i className="bx bx-cart"></i> Add to Cart
                </button>
            </div>
        </div>
        <div className="buy-now">
            <button><Link to="/payment">Buy Now</Link></button>
        </div>
    </div>
</div>
              )
 })}

                <div className="best-p1">
                    <img src="https://i.postimg.cc/FszW12Kc/na4.png" alt="img"/>
                    <div className="best-p1-txt">
                        <div className="name-of-p">
                            <p>PS England Shoes</p>
                        </div>
                        <div className="rating">
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                        </div>
                        <div className="price">
                        <span>$ 27.24</span>
                            <span>PKR 7000 </span>
                            <div className="colors">
                                <i className='bx bxs-circle grey'></i>
                                <i className='bx bxs-circle red'></i>
                                <i className='bx bxs-circle blue'></i>
                            </div>
                        </div>
                        <div className="buy-now">
                            <button><Link to="/payment">Buy  Now</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="seller container">
            <h2>Hot Sales</h2>
            <div className="best-seller">
                <div className="best-p1">
                    <img src="https://i.postimg.cc/jS7pSQLf/na4.png" alt="img"/>
                    <div className="best-p1-txt">
                        <div className="name-of-p">
                            <p>PS England Shoes</p>
                        </div>
                        <div className="rating">
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                        </div>
                        <div className="price">
                        <span>$ 27.24</span>
                            <span>PKR 7000 </span>
                            <div className="colors">
                                <i className='bx bxs-circle grey'></i>
                                <i className='bx bxs-circle black'></i>
                                <i className='bx bxs-circle blue'></i>
                            </div>
                        </div>
                        <div className="buy-now">
                            <button><Link to="/payment">Buy  Now</Link></button>
                        </div>
                    </div>
                </div>
                <div className="best-p1">
                    <img src="https://i.postimg.cc/fbnB2yfj/na1.png" alt="img"/>
                    <div className="best-p1-txt">
                        <div className="name-of-p">
                            <p>PS England T-Shirt</p>
                        </div>
                        <div className="rating">
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                        </div>
                        <div className="price">
                        <span>$ 27.24</span>
                            <span>PKR 7000 </span>
                            <div className="colors">
                                <i className='bx bxs-circle blank'></i>
                                <i className='bx bxs-circle blue'></i>
                                <i className='bx bxs-circle brown'></i>
                            </div>
                        </div>
                        <div className="buy-now">
                            <button><Link to="/payment">Buy  Now</Link></button>
                        </div>
                    </div>
                </div>
                <div className="best-p1">
                    <img src="https://i.postimg.cc/RhVP7YQk/hs1.png" alt="img"/>
                    <div className="best-p1-txt">
                        <div className="name-of-p">
                            <p>PS England T-Shirt</p>
                        </div>
                        <div className="rating">
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                            <i className='bx bxs-star'></i>
                        </div>
                        <div className="price">
                        <span>$ 27.24</span>
                            <span>PKR 7000 </span>
                            <div className="colors">
                                <i className='bx bxs-circle blank'></i>
                                <i className='bx bxs-circle red'></i>
                                <i className='bx bxs-circle blue'></i>
                            </div>
                        </div>
                        <div className="buy-now">
                            <button><Link to="/payment">Buy  Now</Link></button>
                        </div>
                    </div>
                </div>
                <div className="best-p1">
                    <img src="https://i.postimg.cc/zD02zJq8/na2.png" alt="img"/>
                    <div className="best-p1-txt">
                        <div className="name-of-p">
                            <p>PS England Bag</p>
                        </div>
                        <div className="rating">
                            <i className='bx bxs-star'></i>
                            <i className='bx bx-star'></i>
                            <i className='bx bx-star'></i>
                            <i className='bx bx-star'></i>
                            <i className='bx bx-star'></i>
                        </div>
                        <div className="price">
                        <span>$ 27.24</span>
                            <span>PKR 7000 </span>
                            <div className="colors">
                                <i className='bx bxs-circle blank'></i>
                                <i className='bx bxs-circle grey'></i>
                                <i className='bx bxs-circle brown'></i>
                            </div>
                        </div>
                        <div className="buy-now">
                            <button><Link to="/payment">Buy  Now</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="news">
        <div className="news-heading">
            <p>LATEST NEWS</p>
            <h2>Fashion New Trends</h2>
        </div>
        <div className="l-news container">
            <div className="l-news1">
                <div className="news1-img">
                    <img src="https://i.postimg.cc/2y6wbZCm/news1.jpg" alt="img"/>
                </div>
                <div className="news1-conte">
                    <div className="date-news1">
                        <p><i className='bx bxs-calendar'></i> 12 February 2022</p>
                        <h4>What Curling Irons Are The Best Ones</h4>
                        <Link to="https://www.vogue.com/article/best-curling-irons" target="_blank">read more</Link>
                    </div>
                </div>
            </div>
            <div className="l-news2">
                <div className="news2-img">
                    <img src="https://i.postimg.cc/9MXPK7RT/news2.jpg" alt="img"/>
                </div>
                <div className="news2-conte">
                    <div className="date-news2">
                        <p><i className='bx bxs-calendar'></i> 17 February 2022</p>
                        <h4>The Health Benefits Of Sunglasses</h4>
                        <Link to="https://www.rivieraopticare.com/blog/314864-the-health-benefits-of-wearing-sunglasses_2/" target="_blank">read more</Link>
                    </div>
                </div>
            </div>
            <div className="l-news3">
                <div className="news3-img">
                    <img src="https://i.postimg.cc/x1KKdRLM/news3.jpg" alt="img"/>
                </div>
                <div className="news3-conte">
                    <div className="date-news3">
                        <p><i className='bx bxs-calendar'></i> 26 February 202</p>
                        <h4>Eternity Bands Do Last Forever</h4>
                        <Link to="https://www.briangavindiamonds.com/news/eternity-bands-symbolize-love-that-lasts-forever/" target="_blank">read more</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <footer>
        <div className="footer-container container">
            <div className="content_1">
                {/* <img src="logo-Meta.png" alt="logo"/> */}
                <h1>Metaverse</h1>
                <p>The customer is at the heart of our<br/>unique business model, which includes<br/>design.</p>
                <img src="https://i.postimg.cc/Nj9dgJ98/cards.png" alt="cards"/>
            </div>
            <div className="content_2">
                <h4>SHOPPING</h4>
                <Link to="#sellers">Clothing Store</Link>
                <Link to="#sellers">Trending Shoes</Link>
                <Link to="#sellers">Accessories</Link>
                <Link to="#sellers">Sale</Link>
            </div>
            <div className="content_3">
                <h4>SHOPPING</h4>
                <Link to="./contact.html">Contact Us</Link>
                <Link to="https://payment-method-sb.netlify.app/" target="_blank">Payment Method</Link>
                <Link to="https://delivery-status-sb.netlify.app/" target="_blank">Delivery</Link>
                <Link to="https://codepen.io/sandeshbodake/full/Jexxrv" target="_blank">Return and Exchange</Link>
            </div>
            <div className="content_4">
                <h4>NEWLETTER</h4>
                <p>Be the first to know about new<br/>arrivals, look books, sales & promos!</p>
                <div className="f-mail">
                    <input type="email" placeholder="Your Email"/>
                    <i className='bx bx-envelope'></i>
                </div>
                <hr/>
            </div>
        </div>
        <div className="f-design">
            <div className="f-design-txt container">
                <p>Design and Code by Metaverse Shopping Team</p>
            </div>
        </div>
    </footer>
    <div className="modal fade" id="shoppingListModal" tabIndex="-1" aria-labelledby="shoppingListModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="shoppingListModalLabel">Shopping List</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ul id="shoppingList">
                {shoppingList.map(item => (
                  <li >
                    <div className="d-flex justify-content-between text-primary fs-6">
                      <div>
                        <img src={"http://localhost:8080/ImageUploads/"+item.image} alt={item.title} className="img-thumbnail" style={{ width: "100px" }} />
                      </div>
                      <div className="mr-3">
                        <p className="text-primary ">Title: {item.title}</p>
                        <p className="text-primary">Quantity: {item.quantity}</p> 
                     <p className="text-primary">Price: {item.price}</p>
                      </div>
                      <i class="icon-remove"></i>
                    </div>
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
            <div className="buy-now">
                            <button className="buy-now"><Link to="/payment">Buy  Now</Link></button>
                        </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
             
          </div>
        </div>
      </div>

    </>
  )
}

    
export default LandingPage