import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
      
      <footer className="bg-dark text-white py-5 mt-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12 text-center">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-4">
                  <Link to="/" className="text-white text-decoration-none hover-opacity">
                    Home
                  </Link>
                </li>
                <li className="list-inline-item me-4">
                  <Link to="/movies" className="text-white text-decoration-none hover-opacity">
                    Movies
                  </Link>
                </li>
                <li className="list-inline-item me-4">
                  <Link to="/tv-shows" className="text-white text-decoration-none hover-opacity">
                    TV Shows
                  </Link>
                </li>
                <li className="list-inline-item me-4">
                  <Link to="/login" className="text-white text-decoration-none hover-opacity">
                    Login
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/register" className="text-white text-decoration-none hover-opacity">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="row mb-4">
            <div className="col-md-12 text-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <i className="fab fa-facebook-f fa-lg"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <i className="fab fa-linkedin-in fa-lg"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <i className="fab fa-youtube fa-lg"></i>
              </a>
            </div>
          </div>
          
          <hr className="my-4" />
          
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="mb-1">&copy; 2025 Movie & TV Digital Shop. All Rights Reserved.</p>
              <p className="mb-0">
                Contact us at: <a href="mailto:support@digitalshop.com" className="text-white text-decoration-underline">support@digitalshop.com</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      <style>
        {`
          footer a:hover {
            opacity: 0.8;
            transition: opacity 0.2s ease;
          }
          footer .fa-lg {
            font-size: 1.5em;
          }
        `}
      </style>
      
     
    </>
  );
};

export default Footer;