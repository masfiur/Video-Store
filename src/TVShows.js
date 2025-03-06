import React, { useEffect, useState } from "react";
import MediaGrid from "./MediaGrid";

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8002/tvShows") // Fetching from json-server
      .then((response) => response.json())
      .then((data) => setTvShows(data))
      .catch((error) => console.error("Error fetching TV shows:", error));
  }, []);

  return <MediaGrid title="TV Shows" mediaList={tvShows} mediaType="tv-shows" />;
};

export default TVShows;
