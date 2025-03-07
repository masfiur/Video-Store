import React, { useState, useEffect } from "react";
import FeaturedMedia from "./FeaturedMedia"; // Import reusable component

const FeaturedTVShows = () => {
  const [featuredTVShows, setFeaturedTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch TV shows from your API using Promise chaining
    fetch("https://video-store-api.vercel.app/tvShows")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Select 4-6 TV shows to feature
        const randomTVShows = data
          .sort(() => 0.5 - Math.random()) // Shuffle the array
          .slice(0, 4);  // Take the first 6 items
        
        setFeaturedTVShows(randomTVShows);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching featured TV shows:", err);
      });
  }, []);

  if (loading) return <div className="loading">Loading featured TV shows...</div>;
  if (error) return <div className="error">Error loading TV shows: {error}</div>;

  return <FeaturedMedia title="Featured TV Shows" mediaList={featuredTVShows} />;
};

export default FeaturedTVShows;