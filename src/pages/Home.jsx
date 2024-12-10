import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = "f4cc1001";

  useEffect(() => {
    const storedQuery = sessionStorage.getItem("query");
    const storedMovies = JSON.parse(sessionStorage.getItem("movies"));
    if (storedQuery && storedMovies) {
      setQuery(storedQuery);
      setMovies(storedMovies);
    } else {
      searchMovies();
    }
  }, []);

  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    searchMovies();
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      searchMovies();
    }
  };

  const handleFilterChange = (event) => {
    searchMovies(event.target.value);
  };

  async function searchMovies(filter) {
    setLoading(true);
    setMovies([]);

    const searchQuery = query || "all";
    const url = `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "True") {
      const moviesData = await Promise.all(
        data.Search.map(async (movie) => {
          const movieUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;
          const movieRes = await fetch(movieUrl);
          const movieData = await movieRes.json();
          return movieData;
        })
      );

      let sortedMovies = moviesData;
      if (filter === "RATING") {
        sortedMovies.sort((a, b) => b.imdbRating - a.imdbRating);
      } else if (filter === "RELEASE_DATE") {
        sortedMovies.sort((a, b) => a.Year - b.Year);
      } else if (filter === "RUNTIME") {
        sortedMovies.sort((a, b) => parseInt(a.Runtime) - parseInt(b.Runtime));
      } else if (filter === "ALPHABETICAL") {
        sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
      }

      setMovies(sortedMovies);
      sessionStorage.setItem("query", query);
      sessionStorage.setItem("movies", JSON.stringify(sortedMovies));
    } else {
      setMovies([]);
    }
    setLoading(false);
  }

  return (
    <>
      <section id="landing">
        <header>
          <div className="header__container">
            <div className="header__description">
              <h1>Find all of your favorite movies at Movie Center</h1>
              <div className="search__box">
                <input
                  type="text"
                  className="search__bar"
                  id="Input"
                  value={query}
                  onChange={handleSearchInputChange}
                  onKeyUp={handleSearchKeyPress}
                  placeholder="Search for a movie..."
                />
                <button
                  className="search__btn"
                  type="button"
                  onClick={handleSearchButtonClick}
                >
                  Search
                </button>
                <select
                  className="sort"
                  id="filter"
                  onChange={handleFilterChange}
                >
                  <option value="" disabled selected>
                    Sort
                  </option>
                  <option value="ALPHABETICAL">A-Z</option>
                  <option value="RATING">Rating: High-Low</option>
                  <option value="RELEASE_DATE">Release Date: Oldest-Newest</option>
                  <option value="RUNTIME">Runtime: Low-High</option>
                </select>
              </div>
            </div>
            <div className="movies__container">
              <div
                className="loading"
                id="loading"
                style={{ display: loading ? "block" : "none" }}
              >
                <FontAwesomeIcon icon={faSpinner} spin />
              </div>
              <div className="movies__list">
                {movies.length > 0
                  ? movies.map((movie) => (
                      <div className="movie" key={movie.imdbID}>
                        <Link to={`/movie/${movie.imdbID}`}>
                          <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="movie__poster"
                          />
                          <h1 className="movie__title">{movie.Title}</h1>
                          <div className="small__description">
                            <p>{movie.Year}</p>
                            <p>Runtime: {movie.Runtime}</p>
                            <p>Rating: {movie.imdbRating}/10</p>
                          </div>
                        </Link>
                      </div>
                    ))
                  : !loading && <h3>No movies found</h3>}
              </div>
            </div>
          </div>
        </header>
      </section>
    </>
  );
};

export default Home;
