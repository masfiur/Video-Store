import React, { useEffect, useState } from "react";
import MediaGrid from "./MediaGrid";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const API_KEY = "9c026d23ec93ec6c389900e105ae5e41";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => response.json())
      .then((data) => {
        // TMDb API provides movie data in the `results` array
        const formattedMovies = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // TMDb image URL
        }));
        setMovies(formattedMovies);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return <MediaGrid title="Popular Movies" mediaList={movies} mediaType="movies" />;
};

export default Movies;
