import React, { createContext, useState, useEffect, useContext } from "react";

// Create a Context for Movies
const MoviesContext = createContext();
// Create a Context for TV Shows
const TVShowsContext = createContext();

// MoviesProvider
export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch movies using Promise chaining
    fetch("https://video-store-api.vercel.app/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching movies:", err);
      });
  }, []);

  return (
    <MoviesContext.Provider value={{ movies, loading, error }}>
      {children}
    </MoviesContext.Provider>
  );
};

// TVShowsProvider
export const TVShowsProvider = ({ children }) => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch TV shows using Promise chaining
    fetch("https://video-store-api.vercel.app/tvShows")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTvShows(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching TV shows:", err);
      });
  }, []);

  return (
    <TVShowsContext.Provider value={{ tvShows, loading, error }}>
      {children}
    </TVShowsContext.Provider>
  );
};

// Custom Hooks to use the contexts
export const useMovies = () => useContext(MoviesContext);
export const useTVShows = () => useContext(TVShowsContext);
