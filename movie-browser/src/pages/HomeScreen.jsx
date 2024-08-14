import React, { useEffect, useState} from 'react';

function HomeScreen() {
 const [trendingMovies, setTrendingMovies] = useState([]);

 useEffect(() => {
    const fetchTrendingMovies = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch (`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);

  const data = await response.json();
  setTrendingMovies(data.results);
  };

  fetchTrendingMovies();
 }, []);

 return (
  <div className="home-screen">
    <h1><span className='orange'>movie</span>Browser</h1>
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
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div className="movie-title">{movie.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

 );
}

export default HomeScreen;