import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "../common/like";
import Table from "../common/table";

class MoviesTable extends Component {
  //it doesn't need to be within a state because it won't change in lifecycle hooks
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => {
        //if (!this.props.user) return <p>{movie.title}</p>;
        return <Link to={`/movies/${movie._id}`}>{movie.title} </Link>;
      }
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => {
        if (this.props.user)
          return (
            <Like
              liked={movie.liked}
              onClick={() => this.props.onLike(movie)}
            />
          );
      }
    },
    {
      key: "delete",
      content: movie => {
        if (this.props.user && this.props.user.isAdmin)
          return (
            <button
              onClick={() => this.props.onDelete(movie)}
              className="btn btn-danger btn-sm ml-2"
            >
              Delete
            </button>
          );
        return null;
      }
    }
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
