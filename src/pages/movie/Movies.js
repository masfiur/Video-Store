import React from "react";
import MediaGrid from "../../components/MediaGrid";
import { useMovies } from "../../api/ContextFile";

const Movies = () => {
  const { movies, loading, error } = useMovies();

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div>Error loading movies: {error}</div>;

  return <MediaGrid title="Movies" mediaList={movies} mediaType="movies" />;
};

export default Movies;
