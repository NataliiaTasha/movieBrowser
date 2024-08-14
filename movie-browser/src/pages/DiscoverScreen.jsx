// src/pages/DiscoverScreen.js
import React, { useEffect, useState } from 'react';

function DiscoverScreen() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
   
    const fetchMovies = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=28`);
      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className="discover-screen">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      
      <div className="categories">
        <span>Action</span>
        <span>Comedy</span>
        <span>Drama</span>
        {/* Add more categories */}
      </div>
      
      <div className="movie-list">
        {movies.map(movie => (
          <div className="movie-item" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="movie-title">{movie.title} ({new Date(movie.release_date).getFullYear()})</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscoverScreen;

