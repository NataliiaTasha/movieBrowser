import React, { useEffect, useState } from 'react';
import './DiscoverScreen.css';
import { Link } from 'react-router-dom';

function DiscoverScreen() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
      const data = await response.json();
      setGenres(data.genres);    
    };

    fetchGenres();
  }, []);

  useEffect(() => {   
    const fetchMovies = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
      const searchQuery = searchTerm ? `&query=${encodeURIComponent(searchTerm)}` : '';

      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}${genreQuery}${searchQuery}`);
      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, [selectedGenre, searchTerm]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="discover-screen">
      <div className="search-bar">
        <input type="text" 
        placeholder="Search..." 
        value={searchTerm}
        onChange={handleSearchChange}
        />
      </div>
      
      <div className="categories">
   
        {genres.map(genre => (
          <span
          key={genre.id}
          onClick={() => handleGenreClick(genre.id)}
                    className={`genre-item ${selectedGenre === genre.id ? 'selected' : ''}`}
          >
            {genre.name}
          </span>
        ))}
       
      </div>
      
      <div className="movie-list">
        {movies.map(movie => (
          <div className="movie-item" key={movie.id}>
            <Link to={`/detail/${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            </Link>
            <Link to={`/detail/${movie.id}`}>
            <div className="discover-movie-title">{movie.title} {new Date(movie.release_date).getFullYear()}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscoverScreen;

