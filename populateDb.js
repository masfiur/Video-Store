import fs from 'fs';
import fetch from 'node-fetch';

const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzAyNmQyM2VjOTNlYzZjMzg5OTAwZTEwNWFlNWU0MSIsIm5iZiI6MTc0MTA2MzMyMS4wNDYwMDAyLCJzdWIiOiI2N2M2ODQ5OTA5Y2U0ZjM1MTQ5MDc2MzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.coZ9nC9DjxS7s_5CTyz9NhewfKTOC3ohkfCFYlS89vw';

const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: AUTH_TOKEN,
  },
};

// Fetch genres
const fetchGenres = async () => {
  const url = `${BASE_URL}/genre/movie/list?language=en-US`;
  const response = await fetch(url, options);
  const data = await response.json();
  const movieGenres = data.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  const tvResponse = await fetch(`${BASE_URL}/genre/tv/list?language=en-US`, options);
  const tvData = await tvResponse.json();
  const tvGenres = tvData.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  return { movieGenres, tvGenres };
};

// Fetch trending movies
const fetchMovies = async () => {
  const url = `${BASE_URL}/trending/movie/day?language=en-US`;
  const response = await fetch(url, options);
  const data = await response.json();
  return data.results;
};

// Fetch trending TV shows
const fetchTVShows = async () => {
  const url = `${BASE_URL}/trending/tv/day?language=en-US`;
  const response = await fetch(url, options);
  const data = await response.json();
  return data.results;
};

// Function to populate db.json
const populateDb = async () => {
  try {
    const { movieGenres, tvGenres } = await fetchGenres();
    const movies = await fetchMovies();
    const tvShows = await fetchTVShows();

    const dbData = {
      movies: movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        description: movie.overview,
        rating: movie.vote_average,
        genres: movie.genre_ids.map(genreId => movieGenres[genreId]).join(', '),
      })),
      tvShows: tvShows.map(tv => ({
        id: tv.id,
        title: tv.name,
        image: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
        description: tv.overview,
        rating: tv.vote_average,
        genres: tv.genre_ids.map(genreId => tvGenres[genreId]).join(', '),
      })),
    };

    fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2), 'utf-8');
    console.log('✅ db.json has been populated successfully!');
  } catch (error) {
    console.error('❌ Error populating db.json:', error);
  }
};

// Run script
populateDb();
