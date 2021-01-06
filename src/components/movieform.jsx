import React from "react";
import Joi from "joi";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    error: {},
    genres: [],
  };

  schema = {
    _id: Joi.string(),
    genreId: Joi.string().required(),
    title: Joi.string().required().min(3),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required().min(0).max(10),
  };

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    const movieId = this.props.match.params.id;

    if (movieId === "new") {
      // const data = { ...this.state.data };
      // data._id = mongoose.Types.ObjectId().toHexString();
      // this.setState({ data });

      return;
    }

    const { data: movie } = await getMovie(movieId);
    if (!movie) return this.props.history.replace("../notfound");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  handleServer = async () => {
    const { data } = await saveMovie(this.state.data);
    this.setState({ data });
    this.props.history.push("/movies");
  };

  getGenre(options, value) {
    const genre = options.find((g) => g._id === value);
    if (genre) {
      return genre.name;
    } else {
      return "";
    }
  }

  render() {
    console.log(this.state.data);
    const name = this.state.data.title || "Add New Movie";

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>{name}</h2>

        {this.renderInput("title", "Title", "text")}
        {this.renderSelect("genreId", "Genre", this.state.genres, () =>
          this.getGenre(this.state.genres, this.state.data.genreId)
        )}
        {this.renderInput("numberInStock", "Number In Stock", "number")}
        {this.renderInput("dailyRentalRate", "Daily Rental Rate", "number")}

        {this.renderButton("Submit")}
      </form>
    );
  }
}

export default MovieForm;
