import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Hero from "./home/Hero";
import FeaturedMovies from "./home/featuredsection/FeaturedMovies";
import FeaturedTVShows from "./home/featuredsection/FeaturedTVShows";
import ContentSections from "./home/ContentSections";
import Footer from "./Footer";
import Movies from "./movie/Movies";
import TVShows from "./tvshow/TVShows";
import MovieDetails from "./movie/MovieDetails";
import TVShowDetails from "./tvshow/TVShowDetails";
import { MoviesProvider, TVShowsProvider } from "../api/ContextFile"; 

const Home = () => (
  <div>
    <Hero />
    <FeaturedMovies />
    <FeaturedTVShows />
    <ContentSections />
  </div>
);

function App() {
  return (
    <MoviesProvider>
      <TVShowsProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/movies" component={Movies} />
            <Route path="/movies/:id" component={MovieDetails} />
            <Route exact path="/tv-shows" component={TVShows} />
            <Route path="/tv-shows/:id" component={TVShowDetails} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
          <Footer />
        </Router>
      </TVShowsProvider>
    </MoviesProvider>
  );
}

export default App;
