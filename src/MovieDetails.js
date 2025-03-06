import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from the same API as in Movies.js
    fetch(`https://video-store-api.vercel.app/movies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-details">
      <h1 className="movie-title">{movie.title}</h1>
      <div className="posters">
        <img src={movie.image} alt={movie.title} className="large-poster" />
      </div>
      <p className="synopsis">{movie.description || "No description available."}</p>
      <div className="prices">
        <div className="price-item">
          <span className="price-label">Rent:</span>
          <span className="price-value">${movie.rentPrice || "3.99"}</span>
        </div>
        <div className="price-item">
          <span className="price-label">Buy:</span>
          <span className="price-value">${movie.purchasePrice || "14.99"}</span>
        </div>
      </div>
      {movie.director && (
        <div className="movie-info">
          <p><strong>Director:</strong> {movie.director}</p>
        </div>
      )}
      {movie.year && (
        <div className="movie-info">
          <p><strong>Year:</strong> {movie.year}</p>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;