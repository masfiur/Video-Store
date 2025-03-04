import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Hero from "./Hero";
import FeaturedMovies from "./FeaturedMovies";
import FeaturedTVShows from "./FeaturedTVShows";
import ContentSections from "./ContentSections";
import Footer from "./Footer";
import Movies from "./Movies";
import TVShows from "./TVShows";
import MovieDetails from "./MovieDetails";
import TVShowDetails from "./TVShowDetails";

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
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />

        {/* Movie Routes */}
        <Route exact path="/movies" component={Movies} />
        <Route path="/movies/:id" component={MovieDetails} />

        {/* TV Show Routes */}
        <Route exact path="/tv-shows" component={TVShows} />
        <Route path="/tv-shows/:id" component={TVShowDetails} />

        {/* Authentication Routes */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
