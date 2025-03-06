import React, { useEffect, useState } from "react";
import MediaGrid from "./MediaGrid";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Updated to fetch data from your Vercel-deployed JSON server API
    fetch("https://json-server-api-rho.vercel.app/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data)) // Set the movies data
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return <MediaGrid title="Movies" mediaList={movies} mediaType="movies" />;
};

export default Movies;
