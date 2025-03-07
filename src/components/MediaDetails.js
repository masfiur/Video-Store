import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MediaDetails = ({ mediaType }) => {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset state when mediaType or id changes
    setLoading(true);
    setMedia(null);
    setError(null);
    
    // Determine API endpoint based on mediaType
    const endpoint = mediaType === "movie"
      ? `https://video-store-api.vercel.app/movies/${id}`
      : `https://video-store-api.vercel.app/tvshows/${id}`;

    // Fetch media details from API
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${mediaType} (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        setMedia(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching ${mediaType} details:`, error);
        setError(error.message);
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
            aria-hidden="true"
          >
            ★
          </span>
        ))}
        <span className="ms-2 text-muted" aria-label={`Rating: ${media.rating} out of 10`}>
          {media.rating}/10
        </span>
      </div>
    );
  };

  // Format genres as badges
  const renderGenres = (genres) => {
    if (!genres) return null;
    
    const genreArray = Array.isArray(genres) ? genres : genres.split(',').map(g => g.trim());
    
    return (
      <div className="mb-3">
        <span className="fw-bold">Genres: </span>
        {genreArray.map((genre, index) => (
          <span key={index} className="badge bg-secondary me-2 mb-1">{genre}</span>
        ))}
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

  // Error state
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-between">
            <Link to="/" className="btn btn-outline-primary">Go Home</Link>
            <Link to={`/${mediaType === "movie" ? "movies" : "tv-shows"}`} className="btn btn-primary">
              Back to {mediaType === "movie" ? "Movies" : "TV Shows"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Not found state
  if (!media) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Not Found</h4>
          <p>{mediaType === "movie" ? "Movie" : "TV Show"} not found.</p>
          <hr />
          <div className="d-flex justify-content-between">
            <Link to="/" className="btn btn-outline-primary">Go Home</Link>
            <Link to={`/${mediaType === "movie" ? "movies" : "tv-shows"}`} className="btn btn-primary">
              Back to {mediaType === "movie" ? "Movies" : "TV Shows"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item">
            <Link to={`/${mediaType === "movie" ? "movies" : "tv-shows"}`}>
              {mediaType === "movie" ? "Movies" : "TV Shows"}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{media.title}</li>
        </ol>
      </nav>

      <div className="card shadow">
        <div className="row g-0">
          {/* Media Poster */}
          <div className="col-md-4">
            <div className="p-3">
              <img
                src={media.image}
                alt={`Poster for ${media.title}`}
                className="img-fluid rounded shadow"
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
              {renderGenres(media.genres)}
              
              {/* Additional Info */}
              <div className="row mb-3">
                {media.director && (
                  <div className="col-md-6 mb-2">
                    <p className="mb-0"><strong>Director:</strong> {media.director}</p>
                  </div>
                )}
                {media.creator && (
                  <div className="col-md-6 mb-2">
                    <p className="mb-0"><strong>Creator:</strong> {media.creator}</p>
                  </div>
                )}
                {media.year && (
                  <div className="col-md-6 mb-2">
                    <p className="mb-0"><strong>Year:</strong> {media.year}</p>
                  </div>
                )}
                {media.runtime && (
                  <div className="col-md-6 mb-2">
                    <p className="mb-0"><strong>Runtime:</strong> {media.runtime} min</p>
                  </div>
                )}
                {media.seasons && (
                  <div className="col-md-6 mb-2">
                    <p className="mb-0"><strong>Seasons:</strong> {media.seasons}</p>
                  </div>
                )}
                {media.episodes && (
                  <div className="col-md-6 mb-2">
                    <p className="mb-0"><strong>Episodes:</strong> {media.episodes}</p>
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
                  <i className="bi bi-cart-plus me-2"></i>
                  Rent for ${media.rentPrice || defaultRentPrice}
                </button>
                <button className="btn btn-primary btn-lg px-4">
                  <i className="bi bi-bag-fill me-2"></i>
                  Buy for ${media.purchasePrice || defaultPurchasePrice}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related content section (placeholder) */}
      <div className="mt-5">
        <h3>You might also like</h3>
        <div className="alert alert-info">
          Related {mediaType === "movie" ? "movies" : "TV shows"} would appear here.
        </div>
      </div>
    </div>
  );
};

export default MediaDetails;