import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomeScreen() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        setError(error.message);
      }      
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className="home-screen">
      <h1><span className='orange'>Movie</span>Browser</h1>

      {error && <p className='error-message'>Error: {error}</p>}

      <div className="movie-spotlight">
        <h2>Movie Spotlight</h2>
        {trendingMovies.length > 0 && (
          <div className="spotlight-movie">
            <img src={`https://image.tmdb.org/t/p/w500${trendingMovies[0].backdrop_path}`} alt={trendingMovies[0].title} />
            <div className="spotlight-title">{trendingMovies[0].title}</div>
          </div>
        )}
      </div>

      <div className="trending-section">
        <h3>Trending</h3>
        <div className="trending-movies">
          {trendingMovies.slice(1).map(movie => (
            <div className="trending-movie" key={movie.id}>
              <div className='movie-vote'>{movie.vote_average}</div>
              <Link to={`/detail/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              </Link>
              
              <Link to={`/detail/${movie.id}`} className="movie-title">{movie.title}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

export default HomeScreen;