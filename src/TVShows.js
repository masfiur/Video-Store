import React, { useEffect, useState } from "react";
import MediaGrid from "./MediaGrid";

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/tvshows")
      .then((response) => response.json())
      .then((data) => setTvShows(data))
      .catch((error) => console.error("Error fetching TV shows:", error));
  }, []);

  return <MediaGrid title="TV Shows" mediaList={tvShows} mediaType="tv-shows" />;
};

export default TVShows;
