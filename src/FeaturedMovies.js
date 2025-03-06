import React, { useState, useEffect } from "react";
import FeaturedMedia from "./FeaturedMedia"; // Import reusable component

const FeaturedMovies = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        // Fetch movies from your API
        const response = await fetch("https://video-store-api.vercel.app/movies");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Select 4-6 movies to feature (you can customize this selection logic)
        // This example selects 6 random popular movies
        const randomMovies = data
          .sort(() => 0.5 - Math.random()) // Shuffle the array
          .slice(0, 6);  // Take the first 6 items
        
        setFeaturedMovies(randomMovies);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching featured movies:", err);
      }
    };

    fetchFeaturedMovies();
  }, []);

  if (loading) return <div className="loading">Loading featured movies...</div>;
  if (error) return <div className="error">Error loading movies: {error}</div>;

  return <FeaturedMedia title="Featured Movies" mediaList={featuredMovies} />;
};

export default FeaturedMovies;