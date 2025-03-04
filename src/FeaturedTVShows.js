import React from "react";
import FeaturedMedia from "./FeaturedMedia"; // Import reusable component

const tvShows = [
  {
    id: 1,
    title: "Stranger Things",
    image: "https://example.com/strangerthings-poster.jpg",
    description: "A group of kids in the 80s face supernatural occurrences.",
  },
  {
    id: 2,
    title: "The Witcher",
    image: "https://example.com/witcher-poster.jpg",
    description: "Geralt of Rivia battles monsters in a dark fantasy world.",
  },
  {
    id: 3,
    title: "Money Heist",
    image: "https://example.com/moneyheist-poster.jpg",
    description: "A criminal mastermind leads a heist on the Royal Mint of Spain.",
  },
  {
    id: 4,
    title: "Breaking Bad",
    image: "https://example.com/breakingbad-poster.jpg",
    description: "A high school teacher turns to cooking meth to secure his family's future.",
  },
];

const FeaturedTVShows = () => <FeaturedMedia title="Featured TV Shows" mediaList={tvShows} />;

export default FeaturedTVShows;
