import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = () => {
  const navigate = useNavigate();
  return (
   <>
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow fixed-top">
      <div className="container-fluid">
        <button className="navbar-toggler buttons" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav fs-5 fw-bold me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link px-3 btns" aria-current="page" onClick={() => window.scrollTo(0, 0)}>
                <h5>Home</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 btns" onClick={() => window.scrollTo(0, 0)}>
                <h5>Features</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 btns" onClick={() => window.scrollTo(900, 900)}>
                <h5>About Us</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3 btns" onClick={() => window.scrollTo(1950, 1950)}>
                <h5>Contact Us</h5>
              </Link>
            </li>
          </ul>
          <div className="d-flex justify-content-end">
            <button className="btn buttons btnss textColor btn-lg rounded-pill mx-2 shadow" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn buttons btn-outline-success btn-lg rounded-pill mx-2 shadow" onClick={() => navigate("/register")}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </nav>
   </>
  )
}

export default Navbar
