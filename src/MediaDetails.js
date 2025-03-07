import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MediaDetails = ({ mediaType }) => {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Determine API endpoint based on mediaType
    const endpoint = mediaType === "movie"
      ? `https://video-store-api.vercel.app/movies/${id}`
      : `https://video-store-api.vercel.app/tvshows/${id}`;

    // Fetch media details from API
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setMedia(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching ${mediaType} details:`, error);
        setLoading(false);
      });
  }, [id, mediaType]);

  // Convert rating to star icons
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

  // Default prices based on media type
  const defaultRentPrice = mediaType === "movie" ? "3.99" : "2.99";
  const defaultPurchasePrice = mediaType === "movie" ? "14.99" : "9.99";

  // Loading state
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading {mediaType} details...</p>
      </div>
    );
  }

  // Not found state
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
      {/* Bootstrap CSS */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="container mt-4 mb-5">
        <div className="card shadow">
          <div className="row g-0">
            {/* Media Poster */}
            <div className="col-md-4">
              <div className="p-3">
                <img
                  src={media.image}
                  alt={media.title}
                  className="img-fluid rounded"
                />
              </div>
            </div>
            
            {/* Media Details */}
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title mb-3">{media.title}</h1>
                
                {/* Rating */}
                {media.rating && renderStars(media.rating)}
                
                {/* Genres */}
                {media.genres && (
                  <p className="mb-3">
                    <span className="fw-bold">Genres: </span>
                    <span className="badge bg-secondary me-2">
                      {Array.isArray(media.genres) ? media.genres.join("</span> <span class='badge bg-secondary me-2'>") : media.genres}
                    </span>
                  </p>
                )}
                
                {/* Additional Info */}
                <div className="row mb-3">
                  {media.director && (
                    <div className="col-md-6 mb-2">
                      <p className="mb-0"><strong>Director:</strong> {media.director}</p>
                    </div>
                  )}
                  {media.year && (
                    <div className="col-md-6 mb-2">
                      <p className="mb-0"><strong>Year:</strong> {media.year}</p>
                    </div>
                  )}
                </div>
                
                {/* Synopsis */}
                <div className="card mb-4">
                  <div className="card-body bg-light">
                    <h5 className="card-title">Synopsis</h5>
                    <p className="card-text">{media.description || "No description available."}</p>
                  </div>
                </div>
                
                {/* Prices with buttons */}
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

      {/* Bootstrap JS */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
      ></script>
    </>
  );
};

export default MediaDetails;