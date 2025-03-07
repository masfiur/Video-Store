import React from "react";
import MediaGrid from "../../components/MediaGrid";
import { useTVShows } from "../../api/ContextFile";

const TVShows = () => {
  const { tvShows, loading, error } = useTVShows();

  if (loading) return <div>Loading TV shows...</div>;
  if (error) return <div>Error loading TV shows: {error}</div>;

  return <MediaGrid title="TV Shows" mediaList={tvShows} mediaType="tv-shows" />;
};

export default TVShows;
