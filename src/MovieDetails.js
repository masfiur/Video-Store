import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "9c026d23ec93ec6c389900e105ae5e41";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((data) => {
        setMovie({
          title: data.title,
          smallPoster: `https://image.tmdb.org/t/p/w200${data.poster_path}`, // Small poster
          largePoster: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`, // Large poster
          synopsis: data.overview,
          rentPrice: "3.99", // Example price (TMDb does not provide pricing)
          purchasePrice: "14.99", // Example price
        });
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
