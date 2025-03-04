import React, { useState, useEffect } from "react";
import "./Hero.css";

const Hero = () => {
  const slides = [
    {
      id: 1,
      title: "Spider-Man: No Way Home",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DJfVOs4VSpmA&psig=AOvVaw32NWZdOjoANDwSbtsHPigT&ust=1741081468911000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjsz4fQ7YsDFQAAAAAdAAAAABAJ", // Replace with the image URL of Spider-Man
      alt: "Spider-Man: No Way Home",
    },
    {
      id: 2,
      title: "Squid Game",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FDune_%25282021_film%2529&psig=AOvVaw011PaC88pgnc4UDqcsxkaq&ust=1741081563793000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCN4LPQ7YsDFQAAAAAdAAAAABAE", // Replace with the image URL of Squid Game
      alt: "Squid Game",
    },
    {
      id: 3,
      title: "Dune",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYzJ7C5OCf9kVTPeeOxhIzpdCUTH1hGZdoKQ&s", // Replace with the image URL of Dune
      alt: "Dune",
    },
    {
      id: 4,
      title: "Loki",
      image: "https://wallpapers.com/images/featured/spider-man-no-way-home-pictures-l3ztimmzaeeqfgir.jpg", // Replace with the image URL of Loki
      alt: "Loki",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{slides[currentSlide].title}</h1>
      </div>
      <div className="hero-slide">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].alt}
          className="hero-image"
        />
      </div>
    </section>
  );
};

export default Hero;
