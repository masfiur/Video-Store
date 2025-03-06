import React, { useState, useEffect } from "react";
import "./Hero.css";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [avgMovieRating, setAvgMovieRating] = useState(0);
  const [avgTvRating, setAvgTvRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movies and TV shows
        const moviesResponse = await fetch("https://video-store-api.vercel.app/movies");
        const tvShowsResponse = await fetch("https://video-store-api.vercel.app/tvShows");
        
        const moviesData = await moviesResponse.json();
        const tvShowsData = await tvShowsResponse.json();
        
        // Sort by rating (descending) and get top 2 of each
        const topMovies = moviesData
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 2);
          
        const topTvShows = tvShowsData
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 2);
        
        // Calculate average ratings
        const movieRatingSum = topMovies.reduce((sum, movie) => sum + movie.rating, 0);
        const tvRatingSum = topTvShows.reduce((sum, show) => sum + show.rating, 0);
        
        setAvgMovieRating((movieRatingSum / topMovies.length).toFixed(1));
        setAvgTvRating((tvRatingSum / topTvShows.length).toFixed(1));
        
        // Combine and format slides using the correct image property
        const combinedSlides = [
          ...topMovies.map(movie => ({
            id: movie.id,
            title: movie.title,
            image: movie.image, // Use image instead of posterUrl
            alt: movie.title,
            type: "Movie",
            rating: movie.rating
          })),
          ...topTvShows.map(show => ({
            id: `tv-${show.id}`,
            title: show.title, // Use title property for TV shows as well
            image: show.image, // Use image instead of posterUrl
            alt: show.title,
            type: "TV Show",
            rating: show.rating
          }))
        ];
        
        setSlides(combinedSlides);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to default slides if API fails
        setSlides([
          {
            id: 1,
            title: "Spider-Man: No Way Home",
            image: "https://wallpapers.com/images/featured/spider-man-no-way-home-pictures-l3ztimmzaeeqfgir.jpg",
            alt: "Spider-Man: No Way Home",
            type: "Movie",
            rating: 8.5
          },
          {
            id: 2,
            title: "Dune",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYzJ7C5OCf9kVTPeeOxhIzpdCUTH1hGZdoKQ&s",
            alt: "Dune",
            type: "Movie",
            rating: 8.3
          },
        ]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [slides]);

  if (slides.length === 0) {
    return <div className="hero loading">Loading...</div>;
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{slides[currentSlide].title}</h1>
        <div className="hero-details">
          <span className="hero-type">{slides[currentSlide].type}</span>
          <span className="hero-rating">Rating: {slides[currentSlide].rating}/10</span>
        </div>
        <div className="hero-averages">
          <div className="avg-movie">Top Movies Avg: {avgMovieRating}/10</div>
          <div className="avg-tv">Top TV Shows Avg: {avgTvRating}/10</div>
        </div>
      </div>
      <div className="hero-slide">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].alt}
          className="hero-image"
        />
      </div>
      <div className="hero-controls">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;