import React from 'react'
import './Navbar.scss';
const Navbar = () => {
   const navbarMenu = document.getElementById("menu");
   const burgerMenu = document.getElementById("burger");
   const bgOverlay = document.querySelector(".overlay");
   
   if (burgerMenu && bgOverlay) {
      burgerMenu.addEventListener("click", () => {
         navbarMenu.classList.add("is-active");
         bgOverlay.classList.toggle("is-active");
      });
   
      bgOverlay.addEventListener("click", () => {
         navbarMenu.classList.remove("is-active");
         bgOverlay.classList.toggle("is-active");
      });
   }
   
   // Close Navbar Menu on Links Click
   document.querySelectorAll(".menu-link").forEach((link) => {
      link.addEventListener("click", () => {
         navbarMenu.classList.remove("is-active");
         bgOverlay.classList.remove("is-active");
      });
   });
   
   // Open and Close Search Bar Toggle
   const searchBlock = document.querySelector(".search-block");
   const searchToggle = document.querySelector(".search-toggle");
   const searchCancel = document.querySelector(".search-cancel");
   
   if (searchToggle && searchCancel) {
      searchToggle.addEventListener("click", () => {
         searchBlock.classList.add("is-active");
      });
   
      searchCancel.addEventListener("click", () => {
         searchBlock.classList.remove("is-active");
      });
   }
  return (
    <>
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor02">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <a className="nav-link active" href="#">Home
            <span className="visually-hidden">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">About</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Separated link</a>
          </div>
        </li>
      </ul>
     
       
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
    
    </div>
  </div>
</nav>
    </>
  )
}



export default Navbar