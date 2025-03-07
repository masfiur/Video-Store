import React from "react";
import FeaturedMedia from "../../../components/FeaturedMedia";
import { useTVShows } from "../../../api/ContextFile";

const FeaturedTVShows = () => {
  const { tvShows, loading, error } = useTVShows();

  if (loading) return <div className="loading">Loading featured TV shows...</div>;
  if (error) return <div className="error">Error loading TV shows: {error}</div>;

  const featuredTVShows = tvShows.sort(() => 0.5 - Math.random()).slice(0, 4);

  return <FeaturedMedia title="Featured TV Shows" mediaList={featuredTVShows} />;
};

export default FeaturedTVShows;
