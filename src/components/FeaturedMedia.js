import React from "react";

const FeaturedMedia = ({ title, mediaList }) => {
  const renderStars = (rating) => {
    const maxStars = 5;
    const filledStars = Math.round((rating / 10) * maxStars); // Assuming ratings are out of 10
    
    return (
      <div className="d-flex align-items-center">
        {[...Array(maxStars)].map((_, index) => (
          <span 
            key={index} 
            className={`fs-5 ${index < filledStars ? "text-warning" : "text-secondary"}`}
          >
            ★
          </span>
        ))}
        <span className="ms-2 text-muted">{rating}/10</span>
      </div>
    );
  };

  return (
    <>
      
      
      <div className="container mt-4 mb-5">
        <h2 className="mb-4">{title}</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {mediaList.map((item) => (
            <div key={item.id} className="col">
              <div className="card h-100 shadow-sm">
                <div style={{ height: "380px", overflow: "hidden" }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="card-img-top h-100" 
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  {renderStars(item.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </>
  );
};

export default FeaturedMedia;