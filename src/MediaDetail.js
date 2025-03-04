import React from "react";
import { useParams } from "react-router-dom";
import "./MediaDetail.css"; // Add custom styles

const movieList = [
  { title: "Inception", image: "https://via.placeholder.com/300", description: "A mind-bending thriller directed by Christopher Nolan." },
  { title: "Interstellar", image: "https://via.placeholder.com/300", description: "A science fiction journey through space and time." },
  { title: "The Dark Knight", image: "https://via.placeholder.com/300", description: "The Joker wreaks havoc on Gotham City, testing Batman's morals." },
  { title: "Avatar", image: "https://via.placeholder.com/300", description: "A visually stunning sci-fi adventure by James Cameron." },
  { title: "Titanic", image: "https://via.placeholder.com/300", description: "A tragic love story set against the sinking of the Titanic." },
  { title: "Joker", image: "https://via.placeholder.com/300", description: "The origin story of the iconic comic book villain, the Joker." },
];

const tvShowList = [
  { title: "Breaking Bad", image: "https://via.placeholder.com/300", description: "A high school chemistry teacher turns to cooking methamphetamine." },
  { title: "Game of Thrones", image: "https://via.placeholder.com/300", description: "Noble families vie for control of the Iron Throne in Westeros." },
  { title: "Stranger Things", image: "https://via.placeholder.com/300", description: "A group of kids uncover a supernatural secret in their small town." },
  { title: "The Crown", image: "https://via.placeholder.com/300", description: "A historical drama about the reign of Queen Elizabeth II." },
  { title: "The Witcher", image: "https://via.placeholder.com/300", description: "A monster hunter, Geralt, navigates a world full of dangerous creatures." },
  { title: "The Mandalorian", image: "https://via.placeholder.com/300", description: "A bounty hunter in the Star Wars universe embarks on adventures." },
];

const MediaDetail = () => {
  const { type, id } = useParams();
  const mediaList = type === "movies" ? movieList : tvShowList;
  const media = mediaList[id];

  if (!media) return <h2>Media Not Found</h2>;

  return (
    <div className="media-detail-container">
      <div className="media-detail-card">
        <img className="media-detail-image" src={media.image} alt={media.title} />
        <div className="media-detail-info">
          <h1 className="media-detail-title">{media.title}</h1>
          <p className="media-detail-description">{media.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MediaDetail;
