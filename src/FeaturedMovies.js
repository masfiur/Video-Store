import React from "react";
import FeaturedMedia from "./FeaturedMedia"; // Import reusable component

const movies = [
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    image: "https://example.com/spiderman-poster.jpg",
    description: "Peter Parker faces the multiverse and new challenges.",
  },
  {
    id: 2,
    title: "Dune",
    image: "https://example.com/dune-poster.jpg",
    description: "A young man embarks on an epic journey on the desert planet Arrakis.",
  },
  {
    id: 3,
    title: "The Matrix Resurrections",
    image: "https://example.com/matrix-poster.jpg",
    description: "Neo returns to the Matrix for a new mission.",
  },
  {
    id: 4,
    title: "Loki",
    image: "https://example.com/loki-poster.jpg",
    description: "The God of Mischief explores alternate realities and time travel.",
  },
];

const FeaturedMovies = () => <FeaturedMedia title="Featured Movies" mediaList={movies} />;

export default FeaturedMovies;
