import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    genres: [], //For the purpous of this exercise will get the genres in component did mount
    data: { title: "", genre: "", stock: "", rate: "" },
    errors: {}
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
  }

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
      .required()
      .label("Genre"),
    stock: Joi.number()
      .min(1)
      .max(100)
      .required()
      .label("Number in Stock"),
    rate: Joi.number()
      .min(1)
      .max(10)
      .required()
      .label("Rate")
  };

  handleGenreSelect = genre => {
    //console.log(genre);
    this.setState({ selectedGenre: genre });
  };

  doSubmit = () => {
    //call the server
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("genre", "Genre")}
          {this.renderInput("stock", "Number in Stock")}
          {this.renderInput("rate", "Rate")}
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
