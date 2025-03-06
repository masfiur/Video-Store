import React, { useEffect, useState } from "react";
import MediaGrid from "./MediaGrid";

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    fetch("https://video-store-api.vercel.app/tvShows") // Fetching from json-server
      .then((response) => response.json())
      .then((data) => setTvShows(data))
      .catch((error) => console.error("Error fetching TV shows:", error));
  }, []);

  return <MediaGrid title="TV Shows" mediaList={tvShows} mediaType="tv-shows" />;
};

export default TVShows;
