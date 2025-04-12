import React, { createContext, useState, useEffect, useContext } from "react";

const MoviesContext = createContext();
const TVShowsContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch("https://video-store-api.vercel.app/movies")
    fetch("https://movieapi-fal9.onrender.com/api/movies/all")
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

export const TVShowsProvider = ({ children }) => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch("https://video-store-api.vercel.app/tvShows")
    fetch("https://movieapi-fal9.onrender.com/api/tvshows/all")
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

export const useMovies = () => useContext(MoviesContext);
export const useTVShows = () => useContext(TVShowsContext);
