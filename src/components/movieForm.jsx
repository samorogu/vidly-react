import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    genres: [], //For the purpous of this exercise will get the genres in component did mount
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(10)
      .required()
      .label("Daily Rental Rate")
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id; //we get the id of the movie selected
      if (movieId === "new") return; //we return an empty form to fill

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) }); //we show the current movie details
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
      //if (!movie) return this.props.history.replace("/not-found"); //if  we put push it will return the last page with an invalide id
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  //we use a method because the object is slighly different

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id, // the movies are high arc
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  handleGenreSelect = genre => {
    //console.log(genre);
    this.setState({ selectedGenre: genre });
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies"); //finally we redirect the user to movies
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

// export default MovieForm;

//  MovieForm = ({ match, history }) => {
//   return (
//     <div>
//       <h1>Movie Form {match.params.id} </h1>
//       <button className="bt bt-primary" onClick={() => history.push("/movies")}>
//         Save
//       </button>
//     </div>
//   );
// };

export default MovieForm;
