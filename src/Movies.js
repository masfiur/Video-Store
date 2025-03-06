import React, { useEffect, useState } from "react";
import MediaGrid from "./MediaGrid";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://video-store-api.vercel.app/movies") // Fetching from Vercel API
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return <MediaGrid title="Movies" mediaList={movies} mediaType="movies" />;
};

export default Movies;
