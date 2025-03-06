import React, { useEffect, useState } from "react";
import MediaGrid from "./MediaGrid";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || 'https://video-store-7yfjdfoz2-masfiurs-projects.vercel.app';  // Your Vercel URL

  useEffect(() => {
    fetch(`${API_URL}/movies`)  // Fetching from production API
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return <MediaGrid title="Movies" mediaList={movies} mediaType="movies" />;
};

export default Movies;
