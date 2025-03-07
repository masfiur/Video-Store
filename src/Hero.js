import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movies and TV shows
        const moviesResponse = await fetch("https://video-store-api.vercel.app/movies");
        const tvShowsResponse = await fetch("https://video-store-api.vercel.app/tvShows");
        
        const moviesData = await moviesResponse.json();
        const tvShowsData = await tvShowsResponse.json();
        
        // Sort by rating (descending) and get top 2 of each
        const topMovies = moviesData
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 2);
          
        const topTvShows = tvShowsData
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 2);
        
        // Combine slides
        const combinedSlides = [
          ...topMovies.map(movie => ({
            id: movie.id,
            title: movie.title,
            image: movie.image,
            alt: movie.title,
            type: "Movie"
          })),
          ...topTvShows.map(show => ({
            id: `tv-${show.id}`,
            title: show.title,
            image: show.image,
            alt: show.title,
            type: "TV Show"
          }))
        ];
        
        setSlides(combinedSlides);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback slides
        setSlides([
          {
            id: 1,
            title: "Spider-Man: No Way Home",
            image: "https://wallpapers.com/images/featured/spider-man-no-way-home-pictures-l3ztimmzaeeqfgir.jpg",
            alt: "Spider-Man: No Way Home",
            type: "Movie"
          },
          {
            id: 2,
            title: "Dune",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYzJ7C5OCf9kVTPeeOxhIzpdCUTH1hGZdoKQ&s",
            alt: "Dune",
            type: "Movie"
          }
        ]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [slides]);

  if (loading) {
    return (
      <div className="container mt-4 mb-5">
        <div className="bg-light p-5 rounded text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading featured content...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Bootstrap CSS */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
      />

      <div className="container mt-4 mb-5">
        <div id="heroCarousel" className="carousel slide shadow" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button 
                key={index} 
                type="button" 
                data-bs-target="#heroCarousel" 
                data-bs-slide-to={index} 
                className={index === activeIndex ? "active" : ""}
                aria-current={index === activeIndex ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
                onClick={() => setActiveIndex(index)}
              ></button>
            ))}
          </div>
          
          <div className="carousel-inner rounded">
            {slides.map((slide, index) => (
              <div key={slide.id} className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
                <div className="position-relative" style={{ height: "400px", overflow: "hidden" }}>
                  <img 
                    src={slide.image} 
                    alt={slide.alt} 
                    className="w-100 h-100" 
                    style={{ objectFit: "contain", objectPosition: "center" }} 
                  />
                  <div className="position-absolute bottom-0 w-100 text-white p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
                    <h3>{slide.title}</h3>


                  </div>
                </div>
              </div>
            ))}
          </div>
          
         
        </div>
      </div>

      {/* Bootstrap JS */}
      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
      ></script>
    </>
  );
};

export default HeroSection;
