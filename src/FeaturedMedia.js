import React from "react";
import "./FeaturedMedia.css";

const FeaturedMedia = ({ title, mediaList }) => {
  const renderStars = (rating) => {
    const maxStars = 5;
    const filledStars = Math.round((rating / 10) * maxStars); // Assuming ratings are out of 10
    return (
      <div className="rating">
        {[...Array(maxStars)].map((_, index) => (
          <span key={index} className={index < filledStars ? "star filled" : "star"}>
            ★
          </span>
        ))}
        <span className="rating-value">{rating}/10</span>
      </div>
    );
  };

  return (
    <section className="featured-media">
      <h2>{title}</h2>
      <div className="media-grid">
        {mediaList.map((item) => (
          <div key={item.id} className="media-card">
            <img src={item.image} alt={item.title} className="media-image" />
            <h3>{item.title}</h3>
            {renderStars(item.rating)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMedia;
