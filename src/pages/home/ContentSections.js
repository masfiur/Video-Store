import React from "react";

const ContentSections = () => {
  return (
    <>
      

      <div className="container mt-4 mb-5">
        <section className="mb-5">
          <h2 className="mb-4">Our Services</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Stream Online</h3>
                  <p className="card-text">
                    Enjoy streaming your favorite movies and TV shows from any device
                    with our easy-to-use platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Buy and Own</h3>
                  <p className="card-text">
                    Purchase movies and TV shows to add to your personal collection
                    and watch offline anytime.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Exclusive Offers</h3>
                  <p className="card-text">
                    Get exclusive access to limited-time offers, discounts, and
                    bundles on the latest titles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title mb-3">Why Choose Us</h2>
              <p className="card-text">
                We believe in providing a seamless and enjoyable experience for all
                of our users. Here are a few reasons why you should choose us for your
                movie and TV show needs:
              </p>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item">High-quality content at affordable prices</li>
                <li className="list-group-item">Wide range of movies and TV shows, both new and old</li>
                <li className="list-group-item">Easy-to-navigate platform for a hassle-free experience</li>
                <li className="list-group-item">Customer support available 24/7</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      
    </>
  );
};

export default ContentSections;