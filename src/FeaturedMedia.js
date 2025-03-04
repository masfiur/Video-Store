import React from "react";
import "./FeaturedMedia.css"; // Common CSS file for styling

const FeaturedMedia = ({ title, mediaList }) => {
  return (
    <section className="featured-media">
      <h2>{title}</h2>
      <div className="media-grid">
        {mediaList.map((item) => (
          <div key={item.id} className="media-card">
            <img src={item.image} alt={item.title} className="media-image" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMedia;
