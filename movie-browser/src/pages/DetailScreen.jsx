
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 

function DetailScreen() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchMovieDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        setError(error.message);
      }
      
    };

    const fetchRelatedMovies = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRelatedMovies(data.results);
        
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovieDetails();
    fetchRelatedMovies();
  }, [id]);

  return (
    <div className="detail-screen">
      {movieDetails && (
        <>
          <div className="movie-header">
            <img src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`} alt={movieDetails.title} />
            <div className="movie-info">
              <h2>{movieDetails.title}</h2>
              <p>{movieDetails.runtime} minutes | {movieDetails.vote_average} (IMDb)</p>
            </div>
          </div>

          <div className="movie-details">
            <h4>Release date</h4>
            <p>{new Date(movieDetails.release_date).toLocaleDateString()}</p>

            <h4>Genre</h4>
            <p>{movieDetails.genres.map(genre => genre.name).join(', ')}</p>

            <h4>Synopsis</h4>
            <p>{movieDetails.overview}</p> 
          </div>
          <div className='related-movies'>
          <h4>Related Movies</h4>
          <div className='related-movies-list'>
            {relatedMovies.map(movie => (
              <div className='related-movie' key={movie.id}>
                <Link to={`/detail/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
              </Link>
              
              <Link to={`/detail/${movie.id}`} className="related-movie-title">{movie.title}</Link>
              </div>
            ))}
          </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailScreen;

