import React from "react";
import { Link } from "react-router-dom";
import "./MediaGrid.css";

const MediaGrid = ({ title, mediaList, mediaType }) => {
  return (
    <div className="media-container">
      <h1>{title}</h1>
      <div className="media-grid">
        {mediaList.map((item) => (
          <Link to={`/${mediaType}/${item.id}`} key={item.id} className="media-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MediaGrid;
