import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Menu Section */}
      <div className="footer-menu">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/movies">Movies</a></li>
          <li><a href="/tv-shows">TV Shows</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </div>

      {/* Social Media Links Section */}
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>

      {/* Additional Information Section */}
      <div className="footer-info">
        <p>&copy; 2025 Movie & TV Digital Shop. All Rights Reserved.</p>
        <p>Contact us at: <a href="mailto:support@digitalshop.com">support@digitalshop.com</a></p>
      </div>
    </footer>
  );
};

export default Footer;
