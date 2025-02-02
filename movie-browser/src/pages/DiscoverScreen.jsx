// import React, { useEffect, useState } from 'react';
// import './DiscoverScreen.css';
// import { Link } from 'react-router-dom';

// function DiscoverScreen() {
//   const [movies, setMovies] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchGenres = async () => {
//       const apiKey = import.meta.env.VITE_API_KEY;
//       const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
//       const data = await response.json();
//       setGenres(data.genres);    
//     };

//     fetchGenres();
//   }, []);

//   useEffect(() => {   
//     const fetchMovies = async () => {
//       const apiKey = import.meta.env.VITE_API_KEY;
//       let url = '';
      
//       if (searchTerm) {
//         // Якщо є пошуковий запит, використовуємо ендпоінт пошуку
//         url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`;
//       } else {
//         // Якщо пошукового запиту немає, використовуємо discover для відображення фільмів (з жанрами)
//         const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
//         url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}${genreQuery}`;
//       }
      
//       const response = await fetch(url);
//       const data = await response.json();
//       setMovies(data.results);
//     };
  
//     fetchMovies();
//   }, [selectedGenre, searchTerm]);
  

//   const handleGenreClick = (genreId) => {
//     setSelectedGenre(genreId);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div className="discover-screen">
//       <div className="search-bar">
//         <input type="text" 
//         placeholder="Search..." 
//         value={searchTerm}
//         onChange={handleSearchChange}
//         />
//       </div>
      
//       <div className="categories">
   
//         {genres.map(genre => (
//           <span
//           key={genre.id}
//           onClick={() => handleGenreClick(genre.id)}
//                     className={`genre-item ${selectedGenre === genre.id ? 'selected' : ''}`}
//           >
//             {genre.name}
//           </span>
//         ))}
       
//       </div>
      
//       <div className="movie-list">
//         {movies.map(movie => (
//           <div className="movie-item" key={movie.id}>
//             <Link to={`/detail/${movie.id}`}>
//             <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
//             <div className="movie-title">{movie.title} {new Date(movie.release_date).getFullYear()}</div>
//             </Link>
            
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DiscoverScreen;

import React, { useEffect, useState } from 'react';
import './DiscoverScreen.css';
import { Link, useSearchParams } from 'react-router-dom';

function DiscoverScreen() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();

  // Читаємо параметр жанру з URL
  useEffect(() => {
    const genreParam = searchParams.get('genre');
    if (genreParam) {
      setSelectedGenre(genreParam);
    }
  }, [searchParams]);

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
      let url = '';
      
      if (searchTerm) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&page=${page}`;
      } else {
        const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}${genreQuery}&page=${page}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      setMovies(prevMovies => page === 1 ? data.results : [...prevMovies, ...data.results]);
      setTotalPages(data.total_pages);
    };

    fetchMovies();
  }, [selectedGenre, searchTerm, page]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setPage(1); // When changing the genre, we reset the page
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // When searching, reset the page
  };

  const loadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
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
              <div className="movie-title">{movie.title} {new Date(movie.release_date).getFullYear()}</div>
            </Link>
          </div>
        ))}
      </div>
      
      {page < totalPages && (
        <button onClick={loadMore} className='more-button'>Load More</button>
      )}
    </div>
  );
}

export default DiscoverScreen;

