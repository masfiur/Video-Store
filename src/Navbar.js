import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "./images/mt.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Bootstrap CSS */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
      />

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
          <img 
              src={img}
              alt="MT Shop Logo" 
              style={{ height: "40px" }} // You can adjust the height of the logo here
            />
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-controls="navbarNav" 
            aria-expanded={menuOpen ? "true" : "false"} 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies">Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tv-shows">TV Shows</Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Log In</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-primary ms-2" to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Bootstrap JS */}
      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
      ></script>
    </>
  );
};

export default Navbar;