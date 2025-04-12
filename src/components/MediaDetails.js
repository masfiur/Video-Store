import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovies, useTVShows } from "../api/ContextFile";

const MediaDetails = ({ mediaType }) => {
  const { id } = useParams();
  const { movies, loading: moviesLoading } = useMovies();
  const { tvShows, loading: tvShowsLoading } = useTVShows();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mediaType === "movie" && !moviesLoading) {
      const foundMovie = movies.find(movie => movie.id.toString() === id);
      setMedia(foundMovie || null);
      setLoading(false);
    } else if (mediaType === "tvshow" && !tvShowsLoading) {
      const foundTVShow = tvShows.find(show => show.id.toString() === id);
      setMedia(foundTVShow || null);
      setLoading(false);
    }
  }, [id, mediaType, movies, tvShows, moviesLoading, tvShowsLoading]);


  //Render Ratings
  const renderStars = (rating) => {
    const maxStars = 5;
    const filledStars = Math.round((rating / 10) * maxStars);
    return (
      <div className="d-flex align-items-center mb-3">
        {[...Array(maxStars)].map((_, index) => (
          <span 
            key={index} 
            className={`fs-4 ${index < filledStars ? "text-warning" : "text-secondary"}`}
          >
            ★
          </span>
        ))}
        <span className="ms-2 text-muted">{media.rating}/10</span>
      </div>
    );
  };

  const defaultRentPrice = mediaType === "movie" ? "3.99" : "2.99";
  const defaultPurchasePrice = mediaType === "movie" ? "14.99" : "9.99";

  if (loading || (mediaType === "movie" && moviesLoading) || (mediaType === "tvshow" && tvShowsLoading)) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading {mediaType} details...</p>
      </div>
    );
  }

  if (!media) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          {mediaType === "movie" ? "Movie" : "TV Show"} not found.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-4 mb-5">
        <div className="card shadow">
          <div className="row g-0">
            <div className="col-md-4">
              <div className="p-3">
                <img src={media.image || '/images/placeholder.jpg'}
                  alt={media.title}
                  className="img-fluid rounded"
                  onError={(e) => {e.target.src = '/images/placeholder.jpg'}}
                />
              </div>
            </div>
            
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title mb-3">{media.title}</h1>
                
                {media.rating && renderStars(media.rating)}
                
                {media.genres && (
                  <p className="mb-3">
                    <span className="fw-bold">Genres: </span>
                    <span className="badge bg-secondary me-2">{media.genres}</span>
                  </p>
                )}
                
                <div className="card mb-4">
                  <div className="card-body bg-light">
                    <h5 className="card-title">Synopsis</h5>
                    <p className="card-text">{media.description || "No description available."}</p>
                  </div>
                </div>
                
                <div className="d-grid gap-2 d-md-flex">
                  <button className="btn btn-outline-primary btn-lg px-4">
                    Rent for ${media.rentPrice || defaultRentPrice}
                  </button>
                  <button className="btn btn-primary btn-lg px-4">
                    Buy for ${media.purchasePrice || defaultPurchasePrice}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaDetails;