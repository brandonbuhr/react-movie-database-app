import React from "react";
import MovieLogo from "../assets/moviecenter.png";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
        <div className="nav__container">
          <Link to="/">
            <h1 className="movie-center-title">Movie Center</h1>
          </Link>
          <ul className="nav__links">
            <li>
              <a className="nav__link" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
