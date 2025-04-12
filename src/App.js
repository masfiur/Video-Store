import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Hero from "./pages/home/Hero";
import FeaturedMovies from "./pages/home/featuredsection/FeaturedMovies";
import FeaturedTVShows from "./pages/home/featuredsection/FeaturedTVShows";
import ContentSections from "./pages/home/ContentSections";
import Footer from "./Footer";
import Movies from "./pages/movie/Movies";
import TVShows from "./pages/tvshow/TVShows";
import MovieDetails from "./pages/movie/MovieDetails";
import TVShowDetails from "./pages/tvshow/TVShowDetails";
import { MoviesProvider, TVShowsProvider } from "./api/ContextFile"; 

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
            <ProtectedRoute path="/dashboard" component={Dashboard} />
          </Switch>
          <Footer />
        </Router>
      </TVShowsProvider>
    </MoviesProvider>
  );
}

export default App;