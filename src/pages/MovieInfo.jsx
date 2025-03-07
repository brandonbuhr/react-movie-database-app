import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;

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
            <strong className="movie__info--item--title">Year:</strong>{" "}
            {movie.Year}
          </p>
          <p className="movie__info--item">
            <strong className="movie__info--item--title">Genre:</strong>{" "}
            {movie.Genre}
          </p>
          <p className="movie__info--item">
            <strong className="movie__info--item--title">Director:</strong>{" "}
            {movie.Director}
          </p>
          <p className="movie__info--item">
            <strong className="movie__info--item--title">Actors:</strong>{" "}
            {movie.Actors}
          </p>
          <p className="movie__info--item">
            <strong className="movie__info--item--title">Runtime:</strong>{" "}
            {movie.Runtime}
          </p>
          <p className="movie__info--item">
            <strong className="movie__info--item--title">Language:</strong>{" "}
            {movie.Language}
          </p>
          <p className="movie__info--item">
            <strong className="movie__info--item--title">Country:</strong>{" "}
            {movie.Country}
          </p>
          <p className="movie__info--item">
            <strong className="movie__info--item--title">IMDB Rating:</strong>{" "}
            {movie.imdbRating}
          </p>
          <p className="movie__info--item">
            <strong className="movie__info--item--title">Awards:</strong>{" "}
            {movie.Awards}
          </p>
          <p className="movie__info--item">
            <strong className="movie__info--item--title">Plot Summary</strong>
          </p>
          <p className="movie__info--item">{movie.Plot}</p>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
