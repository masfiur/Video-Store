import React from "react";
import FeaturedMedia from "../../../components/FeaturedMedia";
import { useMovies } from "../../../api/ContextFile";

const FeaturedMovies = () => {
  const { movies, loading, error } = useMovies();

  if (loading) return <div>Loading featured movies...</div>;
  if (error) return <div>Error loading movies: {error}</div>;

  const featuredMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 4);

  return <FeaturedMedia title="Featured Movies" mediaList={featuredMovies} />;
};

export default FeaturedMovies;
