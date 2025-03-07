import React, { useState, useEffect } from "react";
import { useMovies, useTVShows } from "../../api/ContextFile";

const HeroSection = () => {
  const { movies, loading: moviesLoading } = useMovies();
  const { tvShows, loading: tvShowsLoading } = useTVShows();
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const loading = moviesLoading || tvShowsLoading;

  useEffect(() => {
    if (!movies.length && !tvShows.length) return;

    // Sort movies and TV shows by rating (descending) and get top 2 from each
    const topMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 2);
    const topTvShows = [...tvShows].sort((a, b) => b.rating - a.rating).slice(0, 2);

    // Combine and set slides
    const combinedSlides = [
      ...topMovies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        image: movie.image,
        alt: movie.title,
        type: "Movie",
      })),
      ...topTvShows.map((show) => ({
        id: `tv-${show.id}`,
        title: show.title,
        image: show.image,
        alt: show.title,
        type: "TV Show",
      })),
    ];

    setSlides(combinedSlides);
  }, [movies, tvShows]);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides]);

  if (loading) {
    return (
      <div className="container mt-4 mb-5">
        <div className="bg-light p-5 rounded text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading featured content...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-4 mb-5">
        <div id="heroCarousel" className="carousel slide shadow" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={index}
                className={index === activeIndex ? "active" : ""}
                aria-current={index === activeIndex ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
                onClick={() => setActiveIndex(index)}
              ></button>
            ))}
          </div>

          <div className="carousel-inner rounded">
            {slides.map((slide, index) => (
              <div key={slide.id} className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
                <div className="position-relative" style={{ height: "400px", overflow: "hidden" }}>
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-100 h-100"
                    style={{ objectFit: "contain", objectPosition: "center" }}
                  />
                  <div className="position-absolute bottom-0 w-100 text-white p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
                    <h3>{slide.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
