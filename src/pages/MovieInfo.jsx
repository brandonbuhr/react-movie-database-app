import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
      <p>{movie.Plot}</p>

    </div>
  );
};

export default MovieInfo;
