import React, { Component } from "react";
import MovieTable from "./movieTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import Genre from "./common/genre";

import { NavLink } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";

import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    numberPerPage: 4,
    currentGenre: "",
    sortColumn: { name: "title", dir: "asc" },
    value: "",
  };
  async componentDidMount() {
    console.log("componentDidMount");
    const { data: movies } = await getMovies();
    this.setState({ movies });
  }

  handleLike = (movie) => {
    //copy movies
    const movies = [...this.state.movies];

    //get index of this movie
    const index = movies.indexOf(movie);

    //make a copy of this movie
    movies[index] = { ...movies[index] };

    //change like into unlike
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };
  handleDelete = async (movie) => {
    //copy movies
    const ifDelete = await deleteMovie(movie._id);
    if (ifDelete) {
      const movies = this.state.movies.filter((m) => m._id !== movie._id);
      this.setState({ movies });
    }
  };

  handleClick = (page) => {
    this.setState({ currentPage: page });
  };

  refreshPignation = () => {
    this.setState({ currentPage: 1 });
  };

  handleGenre = (g) => {
    this.refreshPignation();
    this.setState({ currentGenre: g });
  };

  handleSort = (newC) => {
    this.setState({ sortColumn: newC });
  };

  onChange = (event) => {
    const value = event.currentTarget.value;
    this.setState({ value });
  };

  filterByGenre = (movies, currentGenre) => {
    if (!currentGenre | (currentGenre === "All")) {
      var movies_in_genre = movies;
    } else {
      movies_in_genre = movies.filter((m) => m.genre.name === currentGenre);
    }
    return movies_in_genre;
  };

  filterMovies = (movies, currentPage, currentGenre, sortColumn, value) => {
    let filtered = movies;
    if (value) {
      filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
    }

    const movies_in_genre = this.filterByGenre(filtered, currentGenre);
    const sortedMovies = _.orderBy(
      movies_in_genre,
      sortColumn.name,
      sortColumn.dir
    );

    const count = sortedMovies.length;

    const firstMovieIndex = (currentPage - 1) * 4;
    const lastMovieIndex = firstMovieIndex + 3;
    const movies_filtered = sortedMovies.slice(
      firstMovieIndex,
      lastMovieIndex + 1
    );

    return { count, movies_filtered: movies_filtered };
  };

  render() {
    const {
      movies,
      currentPage,
      numberPerPage,
      currentGenre,
      sortColumn,
      value,
    } = this.state;

    // since we use render to pass component, we can access history, match and location
    const { user } = this.props;

    const { count, movies_filtered } = this.filterMovies(
      movies,
      currentPage,
      currentGenre,
      sortColumn,
      value
    );

    return (
      <div className="row">
        <div className="col">
          <Genre
            data={movies}
            handleGenre={this.handleGenre}
            currentGenre={currentGenre}
          />
        </div>

        <div className="col">
          <SearchBox
            value={value}
            style={{ margin: 15 }}
            onChange={this.onChange}
          />
          {user && (
            <NavLink
              className="btn btn-primary"
              style={{ marginTop: 15, marginBottom: 15 }}
              to="/movies/new"
            >
              Add new movie
            </NavLink>
          )}

          <MovieTable
            movies={movies_filtered}
            handleLike={this.handleLike}
            handleDelete={this.handleDelete}
            sortColumn={sortColumn}
            handleSort={this.handleSort}
          />

          <Pagination
            count={count}
            handlePageClick={this.handleClick}
            currentPage={currentPage}
            numberPerPage={numberPerPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
