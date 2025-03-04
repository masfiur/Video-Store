import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TVShowDetails.css";

const TVShowDetails = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "9c026d23ec93ec6c389900e105ae5e41";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((data) => {
        setTvShow({
          title: data.name, // TMDb uses 'name' for TV shows
          poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`, // TV show poster
          synopsis: data.overview,
          rentPrice: "2.99", // Example price (TMDb does not provide pricing)
          purchasePrice: "9.99", // Example price
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching TV show details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!tvShow) return <p>TV Show not found.</p>;

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
          <span className="price-value">${tvShow.rentPrice}</span>
        </div>
        <div className="price-item">
          <span className="price-label">Buy:</span>
          <span className="price-value">${tvShow.purchasePrice}</span>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetails;
