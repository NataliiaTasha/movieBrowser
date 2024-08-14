// src/pages/DetailScreen.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetailScreen() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Функція для отримання деталей фільму з TMDb API
    const fetchMovieDetails = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
      const data = await response.json();
      setMovieDetails(data);
    };

    fetchMovieDetails();
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

            <h4>Related Movies</h4>
            {/* Add logic for fetching related movies using TMDb API */}
          </div>
        </>
      )}
    </div>
  );
}

export default DetailScreen;

