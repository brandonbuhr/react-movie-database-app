import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
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
    return <div>Loading...</div>;
  }

  return (
    <>
        <Link to="/">
          <button className="movie__info--btn">Back to Search</button>
        </Link>
    <div className="movie__container">

    <div className="movie__info--img--container">

        <img src={movie.Poster} alt={movie.Title} className="movie__img" />
    </div>
      <div className="movie__info--container">

        <h1 className="movie__title--text">{movie.Title}</h1>
        <p>{movie.Plot}</p>
      </div>
    </div>
    </>
  );
};

export default MovieInfo;
