import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TVShowDetails.css";

const TVShowDetails = () => {
  const { id } = useParams(); // Get TV show ID from URL
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching TV show with ID:", id);

    fetch("http://localhost:8001/tvshows")
      .then((response) => response.json())
      .then((data) => {
        const foundTvShow = data.find((tv) => tv.id.toString() === id);
        setTvShow(foundTvShow || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching TV show details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!tvShow) {
    return <p>TV Show not found.</p>;
  }

  return (
    <div className="tvshow-details">
      <h1 className="tvshow-title">{tvShow.title}</h1>
      <div className="posters">
        <img src={tvShow.poster} alt="Poster" className="tvshow-poster" />
      </div>
      <p className="synopsis">{tvShow.synopsis}</p>
      <div className="prices">
        <div className="price-item">
          <span className="price-label">Rent:</span>
          <span className="price-value">${tvShow.rentPrice || "N/A"}</span>
        </div>
        <div className="price-item">
          <span className="price-label">Buy:</span>
          <span className="price-value">${tvShow.purchasePrice || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetails;
