import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const apiKey = "f4cc1001";

  useEffect(() => {
    async function fetchMovie() {
      const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovie(data);
    }

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Link
        to="/"
        state={{ query: location.state ? location.state.query : "" }}
      >
        <button className="movie__info--btn">
          <strong>Back to Search</strong>
        </button>
      </Link>
      <div className="movie__container">
        <div className="movie__info--img--container">
          <img src={movie.Poster} alt={movie.Title} className="movie__img" />
        </div>
        <div className="movie__info--container">
          <h2 className="movie__title--text">{movie.Title}</h2>
          <p className="movie__info--item">
            <strong>Year:</strong> {movie.Year}
          </p>
          <p className="movie__info--item">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="movie__info--item">
            <strong>Director:</strong> {movie.Director}
          </p>
          <p className="movie__info--item">
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p className="movie__info--item">
            <strong>Runtime:</strong> {movie.Runtime}
          </p>
          <p className="movie__info--item">
            <strong>Language:</strong> {movie.Language}
          </p>
          <p className="movie__info--item">
            <strong>Country:</strong> {movie.Country}
          </p>
          <p className="movie__info--item">
            <strong>IMDB Rating:</strong> {movie.imdbRating}
          </p>
          <p className="movie__info--item">
            <strong>Awards:</strong> {movie.Awards}
          </p>
          <p className="movie__info--item">
            <strong>Plot Summary</strong>
          </p>
          <p className="movie__info--item">{movie.Plot}</p>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
