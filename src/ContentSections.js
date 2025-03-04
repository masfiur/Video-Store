import React from "react";
import "./ContentSections.css";

const ContentSections = () => {
  return (
    <div className="content-sections">
      

      {/* Our Services Section */}
      <section className="content-section our-services">
        <h2>Our Services</h2>
        <div className="services-list">
          <div className="service-item">
            <h3>Stream Online</h3>
            <p>
              Enjoy streaming your favorite movies and TV shows from any device
              with our easy-to-use platform.
            </p>
          </div>
          <div className="service-item">
            <h3>Buy and Own</h3>
            <p>
              Purchase movies and TV shows to add to your personal collection
              and watch offline anytime.
            </p>
          </div>
          <div className="service-item">
            <h3>Exclusive Offers</h3>
            <p>
              Get exclusive access to limited-time offers, discounts, and
              bundles on the latest titles.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="content-section why-choose-us">
        <h2>Why Choose Us</h2>
        <p>
          We believe in providing a seamless and enjoyable experience for all
          of our users. Here are a few reasons why you should choose us for your
          movie and TV show needs:
        </p>
        <ul>
          <li>High-quality content at affordable prices</li>
          <li>Wide range of movies and TV shows, both new and old</li>
          <li>Easy-to-navigate platform for a hassle-free experience</li>
          <li>Customer support available 24/7</li>
        </ul>
       
      </section>
    </div>
  );
};

export default ContentSections;
