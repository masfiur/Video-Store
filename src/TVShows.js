import React, { useEffect, useState } from "react";
import MediaGrid from "./MediaGrid";

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const API_KEY = "9c026d23ec93ec6c389900e105ae5e41";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => response.json())
      .then((data) => {
        // TMDb API provides TV show data in the `results` array
        const formattedTvShows = data.results.map((tvShow) => ({
          id: tvShow.id,
          title: tvShow.name, // TMDb uses 'name' for TV shows
          image: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`, // TV Show poster
        }));
        setTvShows(formattedTvShows);
      })
      .catch((error) => console.error("Error fetching TV shows:", error));
  }, []);

  return <MediaGrid title="Popular TV Shows" mediaList={tvShows} mediaType="tv-shows" />;
};

export default TVShows;
