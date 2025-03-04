import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching movie with ID:", id);
    fetch(`http://localhost:8001/movies`)
      .then((response) => response.json())
      .then((data) => {
        const foundMovie = data.find((m) => m.id.toString() === id);
        setMovie(foundMovie || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div className="movie-details">
      <h1 className="movie-title">{movie.title}</h1>
      <div className="posters">
        <img src={movie.smallPoster} alt="Small Poster" className="small-poster" />
        <img src={movie.largePoster} alt="Large Poster" className="large-poster" />
      </div>
      <p className="synopsis">{movie.synopsis}</p>
      <div className="prices">
        <div className="price-item">
          <span className="price-label">Rent:</span>
          <span className="price-value">${movie.rentPrice}</span>
        </div>
        <div className="price-item">
          <span className="price-label">Buy:</span>
          <span className="price-value">${movie.purchasePrice}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
